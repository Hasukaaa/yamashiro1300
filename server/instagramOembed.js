const { LruCache } = require('./cache');

const INSTAGRAM_HOSTS = new Set(['instagram.com', 'www.instagram.com']);
const OEMBED_ENDPOINT = 'https://graph.facebook.com/v19.0/instagram_oembed';

const cache = new LruCache();

function validateInstagramUrl(rawUrl) {
  if (!rawUrl) {
    return { ok: false, error: 'url is required' };
  }
  let parsedUrl;
  try {
    parsedUrl = new URL(rawUrl);
  } catch (error) {
    return { ok: false, error: 'invalid url format' };
  }
  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    return { ok: false, error: 'invalid url protocol' };
  }
  if (!INSTAGRAM_HOSTS.has(parsedUrl.hostname)) {
    return { ok: false, error: 'only instagram.com urls are allowed' };
  }
  return { ok: true, url: parsedUrl.toString() };
}

function buildOembedUrl(postUrl, accessToken) {
  const endpoint = new URL(OEMBED_ENDPOINT);
  endpoint.searchParams.set('url', postUrl);
  endpoint.searchParams.set('access_token', accessToken);
  return endpoint.toString();
}

async function fetchOembed(postUrl, accessToken) {
  const endpoint = buildOembedUrl(postUrl, accessToken);
  const response = await fetch(endpoint);
  const body = await response.json().catch(() => ({}));
  return { response, body };
}

async function getOembedWithCache(postUrl, accessToken) {
  const cached = cache.get(postUrl);
  if (cached) {
    return { source: 'cache', data: cached };
  }
  const { response, body } = await fetchOembed(postUrl, accessToken);
  if (!response.ok) {
    return { source: 'upstream', error: body, status: response.status };
  }
  const data = {
    html: body.html,
    width: body.width,
    height: body.height,
    provider_name: body.provider_name,
    provider_url: body.provider_url,
    version: body.version,
    type: body.type
  };
  cache.set(postUrl, data);
  return { source: 'upstream', data };
}

module.exports = {
  cache,
  validateInstagramUrl,
  getOembedWithCache
};
