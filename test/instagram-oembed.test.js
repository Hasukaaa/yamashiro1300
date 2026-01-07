const test = require('node:test');
const assert = require('node:assert/strict');

const { LruCache } = require('../server/cache');
const { validateInstagramUrl } = require('../server/instagramOembed');

test('validateInstagramUrl accepts instagram.com URLs', () => {
  const result = validateInstagramUrl('https://www.instagram.com/p/DNHmzzZTAg3/');
  assert.equal(result.ok, true);
  assert.equal(result.url, 'https://www.instagram.com/p/DNHmzzZTAg3/');
});

test('validateInstagramUrl rejects non-instagram URLs', () => {
  const result = validateInstagramUrl('https://example.com/');
  assert.equal(result.ok, false);
});

test('LruCache returns cached value (hit)', () => {
  const cache = new LruCache({ maxEntries: 2, ttlMs: 1000 });
  cache.set('post-url', { html: '<div>cached</div>' });
  const value = cache.get('post-url');
  assert.deepEqual(value, { html: '<div>cached</div>' });
});
