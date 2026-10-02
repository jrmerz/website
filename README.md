# justinmerz.net

Personal site, reimagined as an interactive retro terminal. Type commands to
look around; there's also a clickable menu bar if you'd rather not type.

A few things worth knowing before you start poking around:
- `help` lists the commands.
- It's also a filesystem: `ls`, `cd`, `cat`, `pwd` all work.
- There's a hidden Snake game.
- There are a couple of easter eggs. Good luck.

## Local development

```
docker compose up --build
```

Then open http://localhost:8080.

Without Docker:

```
npm install
npm run dev
```

## Deploy (Google Cloud Run)

Deploys to the `justin-merz` GCP project, Cloud Run service `jrmerz-website`,
region `us-west1` by default. One-time setup, then deploy:

```
npm run gcp:setup   # enables Cloud Run / Cloud Build / Artifact Registry APIs
npm run deploy       # builds from source and deploys
```

Override any default with an env var, e.g. `GCP_REGION=us-central1 npm run deploy`.
See `scripts/gcp-setup.sh` and `scripts/deploy.sh`.

## Stack

Vanilla JS (ESM) frontend, hand-rolled terminal emulator, no framework.
Express serves static assets and a `/healthz` endpoint. No database.
