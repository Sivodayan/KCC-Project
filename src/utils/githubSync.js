/**
 * GitHub REST API Client for direct in-browser commits and syncing
 * Allows the KCC Admin Panel to commit updated siteContent.json directly to GitHub
 */

// Helper to safely encode UTF-8 strings (such as Tamil script) to Base64 in browsers
export function utf8ToBase64(str) {
  try {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
      })
    );
  } catch (err) {
    console.error('Base64 encoding error:', err);
    throw new Error('Could not encode content to UTF-8 Base64: ' + err.message);
  }
}

// Helper to decode Base64 back to UTF-8
export function base64ToUtf8(str) {
  try {
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(str), function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  } catch (err) {
    console.error('Base64 decoding error:', err);
    return atob(str);
  }
}

/**
 * Validate a GitHub Personal Access Token and retrieve authenticated user profile
 */
export async function verifyGitHubToken(token) {
  if (!token || !token.trim()) {
    throw new Error('Please enter a GitHub Personal Access Token.');
  }

  const cleanToken = token.trim();
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${cleanToken}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid GitHub token. Please verify that your token is active and not expired.');
    }
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || `GitHub authentication failed (${response.status})`);
  }

  const userData = await response.json();
  return {
    login: userData.login,
    name: userData.name || userData.login,
    avatarUrl: userData.avatar_url,
    htmlUrl: userData.html_url
  };
}

/**
 * Fetch existing file SHA and content from GitHub repository
 */
export async function fetchFileFromGitHub({ owner, repo, path, branch = 'main', token }) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`;
  const headers = {
    Accept: 'application/vnd.github.v3+json'
  };
  if (token) {
    headers.Authorization = `token ${token.trim()}`;
  }

  const res = await fetch(url, { headers });

  if (res.status === 404) {
    // File doesn't exist yet (new file creation)
    return { exists: false, sha: null, content: null };
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to fetch file from repository (${res.status})`);
  }

  const data = await res.json();
  let decodedContent = null;
  if (data.content) {
    try {
      const cleanedContent = data.content.replace(/\s/g, '');
      decodedContent = base64ToUtf8(cleanedContent);
    } catch (e) {
      console.warn('Failed to decode file content:', e);
    }
  }

  return {
    exists: true,
    sha: data.sha,
    content: decodedContent,
    downloadUrl: data.download_url
  };
}

/**
 * Directly commit updated file content to GitHub repository using REST API
 */
export async function commitFileToGitHub({
  owner = 'Sivodayan',
  repo = 'KCC-Project',
  path = 'src/data/siteContent.json',
  branch = 'main',
  token,
  contentString,
  commitMessage
}) {
  if (!token || !token.trim()) {
    throw new Error('GitHub Personal Access Token is required to commit changes.');
  }

  const cleanToken = token.trim();
  const msg = commitMessage?.trim() || `Update website content via KCC Admin Panel [${new Date().toISOString()}]`;

  // 1. Fetch current file SHA if file already exists on branch
  const fileInfo = await fetchFileFromGitHub({
    owner,
    repo,
    path,
    branch,
    token: cleanToken
  });

  // 2. Prepare Base64 encoded payload
  const encodedContent = utf8ToBase64(contentString);

  const payload = {
    message: msg,
    content: encodedContent,
    branch: branch
  };

  if (fileInfo.exists && fileInfo.sha) {
    payload.sha = fileInfo.sha;
  }

  // 3. Put updated file content
  const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const putRes = await fetch(putUrl, {
    method: 'PUT',
    headers: {
      Authorization: `token ${cleanToken}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!putRes.ok) {
    const errJson = await putRes.json().catch(() => ({}));
    if (putRes.status === 409) {
      throw new Error(
        'Conflict (409): The repository file was modified elsewhere. Please refresh or retry.'
      );
    }
    if (putRes.status === 404) {
      throw new Error(
        `Repository "${owner}/${repo}" or branch "${branch}" was not found or your token lacks write permission.`
      );
    }
    throw new Error(errJson.message || `GitHub commit failed (${putRes.status})`);
  }

  const result = await putRes.json();
  const commitSha = result.commit?.sha || '';
  const commitUrl = `https://github.com/${owner}/${repo}/commit/${commitSha}`;

  return {
    success: true,
    commitSha: commitSha.slice(0, 7),
    fullSha: commitSha,
    commitUrl,
    branch,
    timestamp: new Date().toISOString()
  };
}
