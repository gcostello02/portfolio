#!/usr/bin/env bash
set -euo pipefail

# Fill these in
PROJECT_ID="YOUR_PROJECT_ID"
REGION="us-central1"
REPO="portfolio"
IMAGE="portfolio"
SERVICE="portfolio"

# Optional: set to true to skip repo creation if it already exists
SKIP_REPO_CREATE=false

if [[ "$PROJECT_ID" == "YOUR_PROJECT_ID" ]]; then
  echo "Please set PROJECT_ID in scripts/deploy-gcloud.sh"
  exit 1
fi

command -v gcloud >/dev/null 2>&1 || { echo "gcloud CLI is not installed"; exit 1; }

gcloud auth login

gcloud config set project "$PROJECT_ID"

gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com

if [[ "$SKIP_REPO_CREATE" != "true" ]]; then
  gcloud artifacts repositories create "$REPO" \
    --repository-format=docker \
    --location="$REGION" \
    --description="Portfolio images" || true
fi

gcloud builds submit --tag "$REGION-docker.pkg.dev/$PROJECT_ID/$REPO/$IMAGE:latest"

gcloud run deploy "$SERVICE" \
  --image "$REGION-docker.pkg.dev/$PROJECT_ID/$REPO/$IMAGE:latest" \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars HOST=0.0.0.0
