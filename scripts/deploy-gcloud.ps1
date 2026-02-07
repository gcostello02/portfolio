$ErrorActionPreference = "Stop"

param(
  [switch]$AuthLogin
)

# Fill these in
$PROJECT_ID = "gcostello"
$REGION = "us-east4"
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

if ($AuthLogin) {
  gcloud auth login
}

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

$IMAGE_TAG = "$REGION-docker.pkg.dev/$PROJECT_ID/$REPO/${IMAGE}:latest"

gcloud builds submit --tag $IMAGE_TAG

gcloud run deploy $SERVICE `
  --image $IMAGE_TAG `
  --region $REGION `
  --platform managed `
  --allow-unauthenticated `
  --set-env-vars HOST=0.0.0.0
