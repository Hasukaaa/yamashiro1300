const http = require('http');
const { validateInstagramUrl, getOembedWithCache } = require('./instagramOembed');

const PORT = process.env.PORT || 8787;
const ACCESS_TOKEN = process.env.INSTAGRAM_OEMBED_ACCESS_TOKEN;

function sendJson(res, status, payload, headers = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    ...headers
  });
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname !== '/api/instagram/oembed') {
    sendJson(res, 404, { error: 'not_found' });
    return;
  }

  if (!ACCESS_TOKEN) {
    sendJson(res, 500, { error: 'missing_instagram_oembed_access_token' });
    return;
  }

  const validation = validateInstagramUrl(url.searchParams.get('url'));
  if (!validation.ok) {
    sendJson(res, 400, { error: validation.error });
    return;
  }

  try {
    const result = await getOembedWithCache(validation.url, ACCESS_TOKEN);
    if (result.error) {
      if (result.status === 429) {
        const retryAfter = '60';
        sendJson(
          res,
          429,
          { error: 'rate_limited', details: result.error },
          { 'Retry-After': retryAfter }
        );
        return;
      }
      sendJson(res, 502, { error: 'upstream_error', details: result.error });
      return;
    }
    sendJson(res, 200, result.data);
  } catch (error) {
    sendJson(res, 502, { error: 'upstream_error', details: error.message });
  }
});

server.listen(PORT, () => {
  console.log(`oEmbed server listening on http://localhost:${PORT}`);
});
