import path from 'node:path';

/**
 * Builds a SPA fallback middleware that serves index.html for any unmatched
 * GET request, so deep links / refreshes never hit a bare 404.
 * @param {object} opts
 * @param {string} opts.publicDir - Absolute path to the static assets directory.
 * @returns {import('express').RequestHandler} Express middleware.
 */
export function createNotFoundFallback(opts = {}) {
  const { publicDir } = opts;

  return (req, res) => {
    if (req.method !== 'GET') {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.sendFile(path.join(publicDir, 'index.html'));
  };
}
