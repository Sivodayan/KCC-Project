export function utf8ToBase64(str) {
  try {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
      })
    );
  } catch (err) {
    console.error('Base64 encoding failure:', err);
    throw new Error('UTF-8 Base64 encoding failed: ' + err.message);
  }
}

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
    console.error('Base64 decoding failure:', err);
    return atob(str);
  }
}

export async function verifyGitHubToken(token) {
  if (!token || !token.trim()) {
    throw new Error('Personal Access Token is required.');
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
      throw new Error('Invalid or expired GitHub Personal Access Token.');
    }
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || `Authentication failed with status ${response.status}`);
  }

  const userData = await response.json();
  return {
    login: userData.login,
    name: userData.name || userData.login,
    avatarUrl: userData.avatar_url,
    htmlUrl: userData.html_url
  };
}

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
    return { exists: false, sha: null, content: null };
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to query repository contents (${res.status})`);
  }

  const data = await res.json();
  let decodedContent = null;
  if (data.content) {
    try {
      const cleanedContent = data.content.replace(/\s/g, '');
      decodedContent = base64ToUtf8(cleanedContent);
    } catch (e) {
      console.warn('Unable to decode remote content:', e);
    }
  }

  return {
    exists: true,
    sha: data.sha,
    content: decodedContent,
    downloadUrl: data.download_url
  };
}

export async function checkGitHubProxyStatus() {
  try {
    const res = await fetch('/api/github', {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    });
    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    if (res.ok && isJson) {
      const data = await res.json().catch(() => ({}));
      const configured = Boolean(data?.configured || data?.hasToken);
      return {
        ready: configured,
        isProxyActive: true,
        configured,
        raw: data
      };
    }

    if (isJson) {
      const data = await res.json().catch(() => ({}));
      return {
        ready: false,
        isProxyActive: true,
        configured: false,
        reason: data?.error || `HTTP ${res.status}`
      };
    }

    return {
      ready: false,
      isProxyActive: false,
      configured: false,
      reason: 'Server returned HTML instead of JSON (/api/github Function not active yet)'
    };
  } catch (err) {
    return {
      ready: false,
      isProxyActive: false,
      configured: false,
      reason: err.message || 'Network error reaching /api/github'
    };
  }
}

export async function commitFileToGitHub({
  owner = 'Sivodayan',
  repo = 'KCC-Project',
  path = 'src/data/siteContent.json',
  branch = 'main',
  token,
  contentString,
  commitMessage
}) {
  const msg = commitMessage?.trim() || `Update website content via KCC Admin Panel [${new Date().toISOString()}]`;

  const cleanToken = (
    token ||
    import.meta.env.VITE_GITHUB_TOKEN ||
    import.meta.env.GITHUB_TOKEN ||
    ''
  ).trim();

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (cleanToken) {
      headers.Authorization = `Bearer ${cleanToken}`;
    }
    const proxyRes = await fetch('/api/github', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        owner,
        repo,
        path,
        branch,
        contentString,
        commitMessage: msg,
        token: cleanToken || undefined
      })
    });

    const isJson = proxyRes.headers.get('content-type')?.includes('application/json');

    if (isJson) {
      const data = await proxyRes.json().catch(() => ({}));
      if (proxyRes.ok) {
        return data;
      }
      if (cleanToken) {
        console.warn('Proxy commit returned error, attempting direct GitHub commit:', data.error);
      } else {
        throw new Error(data.error || `Server commit failed (${proxyRes.status})`);
      }
    }
  } catch (err) {
    if (!cleanToken) {
      throw err;
    }
    console.warn('Proxy call failed, attempting direct GitHub commit fallback:', err);
  }

  if (!cleanToken) {
    throw new Error('GitHub publishing is not configured. Please set GITHUB_TOKEN in Cloudflare or enter a token in the modal.');
  }

  const fileInfo = await fetchFileFromGitHub({
    owner,
    repo,
    path,
    branch,
    token: cleanToken
  });

  const encodedContent = utf8ToBase64(contentString);

  const payload = {
    message: msg,
    content: encodedContent,
    branch
  };

  if (fileInfo.exists && fileInfo.sha) {
    payload.sha = fileInfo.sha;
  }

  const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const putRes = await fetch(putUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${cleanToken}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!putRes.ok) {
    const errJson = await putRes.json().catch(() => ({}));
    if (putRes.status === 409) {
      throw new Error(
        'Branch conflict (409): Target file was modified concurrently. Please refresh and retry.'
      );
    }
    if (putRes.status === 404) {
      throw new Error(
        `Repository "${owner}/${repo}" or branch "${branch}" was not found, or the provided token lacks write access.`
      );
    }
    throw new Error(errJson.message || `GitHub commit request failed (${putRes.status})`);
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
