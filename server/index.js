import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import healthRouter from './routes/health.js';
import { createNotFoundFallback } from './middleware/notFound.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const app = express();

app.use(healthRouter);
app.use(express.static(publicDir));
app.use(createNotFoundFallback({ publicDir }));

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`jrmerz-website listening on port ${port}`);
});
