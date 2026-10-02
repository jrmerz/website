#!/usr/bin/env bash
# Deploys this app to Cloud Run in the "justin-merz" Google Cloud project.
# Builds from source via Cloud Build (no local Docker required).
#
# Override any default with an environment variable, e.g.:
#   GCP_REGION=us-central1 ./scripts/deploy.sh
set -euo pipefail

PROJECT_ID="${GCP_PROJECT_ID:-justin-merz}"
REGION="${GCP_REGION:-us-west1}"
SERVICE_NAME="${SERVICE_NAME:-jrmerz-website}"
ACCOUNT="${GCP_ACCOUNT:-jrmerz@gmail.com}"

cd "$(dirname "${BASH_SOURCE[0]}")/.."

echo "Deploying ${SERVICE_NAME} to project ${PROJECT_ID} (${REGION}) as ${ACCOUNT}..."
gcloud run deploy "${SERVICE_NAME}" \
  --source . \
  --project="${PROJECT_ID}" \
  --region="${REGION}" \
  --account="${ACCOUNT}" \
  --allow-unauthenticated \
  --port=8080

echo "Deployed. Fetching service URL..."
gcloud run services describe "${SERVICE_NAME}" \
  --project="${PROJECT_ID}" \
  --region="${REGION}" \
  --account="${ACCOUNT}" \
  --format="value(status.url)"
