/**
 * Cloudflare Pages Function: /api/github
 *
 * Secure server-side proxy endpoint for committing website content to GitHub.
 * The GitHub Personal Access Token (GITHUB_TOKEN) is stored strictly as an
 * encrypted secret within Cloudflare Pages environment variables and is NEVER
 * sent to or exposed in the client browser.
 */

/**
 * Safe UTF-8 to Base64 encoder for Cloudflare Workers / Pages Functions V8 runtime.
 * Handles multibyte characters such as Tamil Unicode script without throwing errors.
 *
 * @param {string} str - UTF-8 text to encode.
 * @returns {string} Base64-encoded string.
 */
function utf8ToBase64(str) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Extracts and sanitizes the GitHub token from Cloudflare environment or runtime.
 * Supports multiple casing variations for resilience.
 *
 * @param {Object} context - Cloudflare Pages Function context
 * @returns {string} Clean token or empty string
 */
function getSecretToken(context) {
  const env = context?.env || context || {};
  const val = (
    env.GITHUB_TOKEN ||
    env.github_token ||
    env.GH_TOKEN ||
    env.VITE_GITHUB_TOKEN ||
    (typeof process !== 'undefined' && process.env?.GITHUB_TOKEN) ||
    ''
  );
  return typeof val === 'string' ? val.trim() : '';
}

/**
 * Handle OPTIONS for preflight requests
 */
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}

/**
 * Handle GET to check if GitHub publishing is configured server-side
 */
export async function onRequestGet(context) {
  const env = context?.env || context || {};
  const token = getSecretToken(context);
  const isConfigured = Boolean(token);
  const allKeys = Object.keys(env);
  const nonSensitiveKeys = allKeys.filter(k => k !== 'ASSETS' && !k.toLowerCase().includes('token') && !k.toLowerCase().includes('secret') && !k.toLowerCase().includes('key'));
  const hasTokenKey = Boolean(
    env.GITHUB_TOKEN || env.github_token || env.GH_TOKEN || env.VITE_GITHUB_TOKEN
  );

  return new Response(
    JSON.stringify({
      configured: isConfigured,
      targetRepo: 'Sivodayan/KCC-Project',
      branch: 'main',
      hasToken: isConfigured,
      hasTokenKey,
      tokenLength: token ? token.length : 0,
      totalKeys: allKeys.length,
      sampleKeys: nonSensitiveKeys,
      checkedAt: new Date().toISOString()
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
}

/**
 * Handle POST to perform atomic Git commit
 */
export async function onRequestPost(context) {
  const token = getSecretToken(context);
  if (!token) {
    return new Response(
      JSON.stringify({
        error: 'Cloudflare Pages secret GITHUB_TOKEN is not configured or not yet active in this deployment. Please redeploy in Cloudflare dashboard.'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  let body;
  try {
    body = await context.request.json();
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON request body.' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  const {
    owner = 'Sivodayan',
    repo = 'KCC-Project',
    path = 'src/data/siteContent.json',
    branch = 'main',
    contentString,
    commitMessage
  } = body || {};

  if (!contentString || typeof contentString !== 'string') {
    return new Response(
      JSON.stringify({ error: 'Missing required field: contentString.' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  // Security whitelist: Restrict commits to designated repository and content directory
  if (owner !== 'Sivodayan' || repo !== 'KCC-Project') {
    return new Response(
      JSON.stringify({ error: 'Unauthorized repository target.' }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  if (path !== 'src/data/siteContent.json' && !path.startsWith('src/data/')) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized path. Commits are restricted to src/data/.' }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  const userAgent = 'Cloudflare-Pages-Function-KCC/1.0';
  const defaultCommitMsg = `Update website content via KCC Admin Panel [${new Date().toISOString()}]`;
  const message = commitMessage?.trim() || defaultCommitMsg;

  try {
    // 1. Fetch current file SHA from GitHub to support atomic in-place updates
    const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`;
    const getRes = await fetch(getUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': userAgent
      }
    });

    let currentSha = null;
    if (getRes.ok) {
      const data = await getRes.json();
      currentSha = data.sha;
    } else if (getRes.status !== 404) {
      const err = await getRes.json().catch(() => ({}));
      if (getRes.status === 401) {
        return new Response(
          JSON.stringify({ error: 'GitHub authentication failed: Provided GITHUB_TOKEN is invalid or expired.' }),
          {
            status: 401,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        );
      }
      return new Response(
        JSON.stringify({ error: err.message || `Failed to fetch file metadata from GitHub (${getRes.status})` }),
        {
          status: getRes.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    // 2. Base64 encode UTF-8 content
    const encodedContent = utf8ToBase64(contentString);

    // 3. Commit updated content via GitHub Contents API (PUT)
    const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const payload = {
      message,
      content: encodedContent,
      branch
    };
    if (currentSha) {
      payload.sha = currentSha;
    }

    const putRes = await fetch(putUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': userAgent
      },
      body: JSON.stringify(payload)
    });

    if (!putRes.ok) {
      const errJson = await putRes.json().catch(() => ({}));
      let errMsg = errJson.message || `GitHub commit failed (${putRes.status})`;
      if (putRes.status === 409) {
        errMsg = 'Branch conflict (409): Target file was modified concurrently. Please refresh and retry.';
      } else if (putRes.status === 401) {
        errMsg = 'Unauthorized: Cloudflare GITHUB_TOKEN lacks repo write access or is expired.';
      } else if (putRes.status === 404) {
        errMsg = `Repository ${owner}/${repo} or branch ${branch} not found.`;
      }
      return new Response(
        JSON.stringify({ error: errMsg }),
        {
          status: putRes.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    const result = await putRes.json();
    const commitSha = result.commit?.sha || '';
    const commitUrl = `https://github.com/${owner}/${repo}/commit/${commitSha}`;

    // 4. Return sanitized public data to React frontend (NO secret token returned!)
    return new Response(
      JSON.stringify({
        success: true,
        commitSha: commitSha.slice(0, 7),
        fullSha: commitSha,
        commitUrl,
        branch,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || 'Internal error processing GitHub commit.' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}
