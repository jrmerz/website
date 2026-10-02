#!/usr/bin/env bash
# One-time setup for deploying this app to the "justin-merz" Google Cloud
# project. Safe to re-run - API enablement is idempotent.
set -euo pipefail

PROJECT_ID="${GCP_PROJECT_ID:-justin-merz}"
ACCOUNT="${GCP_ACCOUNT:-jrmerz@gmail.com}"

echo "Enabling required APIs on project ${PROJECT_ID} (as ${ACCOUNT})..."
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  --project="${PROJECT_ID}" \
  --account="${ACCOUNT}"

echo "Done. You can now run scripts/deploy.sh"
