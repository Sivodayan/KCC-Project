import {
  onRequestGet as githubGet,
  onRequestPost as githubPost,
  onRequestOptions as githubOptions
} from './functions/api/github.js';

import {
  onRequestGet as fbGet,
  onRequestOptions as fbOptions
} from './functions/api/resolve-facebook.js';

const NO_ROBOTS_HEADER = 'noindex, nofollow, noarchive';

function withSecurityHeaders(response) {
  if (!response) return response;
  const headers = new Headers(response.headers);
  headers.set('X-Robots-Tag', NO_ROBOTS_HEADER);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function methodNotAllowed() {
  return withSecurityHeaders(
    new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    })
  );
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Canonical 301 redirects for Search Console query parameter deduplication
    if ((url.pathname === '/' || url.pathname === '') && url.searchParams.has('lang')) {
      const target = new URL(url);
      target.searchParams.delete('lang');
      return Response.redirect(target.toString(), 301);
    }

    if (url.pathname === '/history' && url.searchParams.get('lang') === 'en') {
      const target = new URL(url);
      target.searchParams.delete('lang');
      return Response.redirect(target.toString(), 301);
    }

    // API Dispatcher
    if (url.pathname === '/api/github') {
      const context = { request, env, ctx };
      switch (request.method) {
        case 'OPTIONS':
          return withSecurityHeaders(await githubOptions(context));
        case 'GET':
          return withSecurityHeaders(await githubGet(context));
        case 'POST':
          return withSecurityHeaders(await githubPost(context));
        default:
          return methodNotAllowed();
      }
    }

    if (url.pathname === '/api/resolve-facebook') {
      const context = { request, env, ctx };
      switch (request.method) {
        case 'OPTIONS':
          return withSecurityHeaders(await fbOptions(context));
        case 'GET':
          return withSecurityHeaders(await fbGet(context));
        default:
          return methodNotAllowed();
      }
    }

    // Static asset serving via Cloudflare Workers Assets
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not found', { status: 404 });
  }
};
