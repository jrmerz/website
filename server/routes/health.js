import { Router } from 'express';

/**
 * Health check router used by Cloud Run startup/liveness probes.
 * @type {import('express').Router}
 */
const router = Router();

router.get('/healthz', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;
