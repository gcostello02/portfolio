#!/usr/bin/env bash
set -euo pipefail

# Run from repo root so .env and cloudbuild.yaml are found
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

# Load .env if present (PROJECT_ID, REGION, VITE_FORMSPREE_FORM_ID, etc.)
if [[ -f .env ]]; then
  set -a
  source .env
  set +a
fi

# Config: from env or defaults (set in .env or export before running)
PROJECT_ID="${PROJECT_ID:-gcostello}"
REGION="${REGION:-us-east4}"
REPO="${REPO:-portfolio}"
IMAGE="${IMAGE:-portfolio}"
SERVICE="${SERVICE:-portfolio}"
FORMSPREE_ID="${VITE_FORMSPREE_FORM_ID:-}"

command -v gcloud >/dev/null 2>&1 || { echo "gcloud CLI is not installed"; exit 1; }

# Optional: require explicit --login to run gcloud auth login (avoids prompt on every deploy)
if [[ "${1:-}" == "--login" ]]; then
  gcloud auth login
  shift
fi

gcloud config set project "$PROJECT_ID"

echo "Enabling required APIs..."
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com --quiet

echo "Creating Artifact Registry repo (if missing)..."
gcloud artifacts repositories describe "$REPO" --location="$REGION" &>/dev/null || \
  gcloud artifacts repositories create "$REPO" \
    --repository-format=docker \
    --location="$REGION" \
    --description="Portfolio images"

echo "Building and pushing image (Formspree ID: ${FORMSPREE_ID:+set})..."
SUBSTITUTIONS="_REGION=$REGION,_REPO=$REPO,_IMAGE=$IMAGE"
[[ -n "$FORMSPREE_ID" ]] && SUBSTITUTIONS="$SUBSTITUTIONS,_VITE_FORMSPREE_FORM_ID=$FORMSPREE_ID"

gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions="$SUBSTITUTIONS" \
  .

echo "Deploying to Cloud Run..."
gcloud run deploy "$SERVICE" \
  --image "$REGION-docker.pkg.dev/$PROJECT_ID/$REPO/$IMAGE:latest" \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars HOST=0.0.0.0

echo "Done. Service URL:"
gcloud run services describe "$SERVICE" --region "$REGION" --format='value(status.url)'
