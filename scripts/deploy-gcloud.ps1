$ErrorActionPreference = "Stop"

# Fill these in
$PROJECT_ID = "YOUR_PROJECT_ID"
$REGION = "us-central1"
$REPO = "portfolio"
$IMAGE = "portfolio"
$SERVICE = "portfolio"

# Optional: set to $true to skip repo creation if it already exists
$SKIP_REPO_CREATE = $false

if ($PROJECT_ID -eq "YOUR_PROJECT_ID") {
  Write-Error "Please set PROJECT_ID in scripts/deploy-gcloud.ps1"
}

if (-not (Get-Command gcloud -ErrorAction SilentlyContinue)) {
  Write-Error "gcloud CLI is not installed"
}

gcloud auth login

gcloud config set project $PROJECT_ID

gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com

if (-not $SKIP_REPO_CREATE) {
  try {
    gcloud artifacts repositories create $REPO `
      --repository-format=docker `
      --location=$REGION `
      --description="Portfolio images"
  } catch {
    # ignore if repo already exists
  }
}

gcloud builds submit --tag "$REGION-docker.pkg.dev/$PROJECT_ID/$REPO/$IMAGE:latest"

gcloud run deploy $SERVICE `
  --image "$REGION-docker.pkg.dev/$PROJECT_ID/$REPO/$IMAGE:latest" `
  --region $REGION `
  --platform managed `
  --allow-unauthenticated `
  --set-env-vars HOST=0.0.0.0
