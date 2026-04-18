# Deploy portfolio to Google Cloud Run.
# Config: set in .env or edit below. Run with -AuthLogin to run gcloud auth login.
param(
  [switch]$AuthLogin
)

$ErrorActionPreference = "Stop"

# Run from repo root
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootDir = Split-Path -Parent $ScriptDir
Set-Location $RootDir

# Load .env if present
if (Test-Path .env) {
  Get-Content .env | ForEach-Object {
    if ($_ -match '^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$' -and $_.Trim() -notmatch '^\s*#') {
      $name = $matches[1].Trim()
      $value = $matches[2].Trim().Trim('"').Trim("'")
      Set-Item -Path "Env:$name" -Value $value
    }
  }
}

# Config: from env or defaults
$PROJECT_ID = if ($env:PROJECT_ID) { $env:PROJECT_ID } else { "gcostello" }
$REGION = if ($env:REGION) { $env:REGION } else { "us-east4" }
$REPO = if ($env:REPO) { $env:REPO } else { "portfolio" }
$IMAGE = if ($env:IMAGE) { $env:IMAGE } else { "portfolio" }
$SERVICE = if ($env:SERVICE) { $env:SERVICE } else { "portfolio" }
$FORMSPREE_ID = if ($env:PUBLIC_FORMSPREE_FORM_ID) { $env:PUBLIC_FORMSPREE_FORM_ID } elseif ($env:VITE_FORMSPREE_FORM_ID) { $env:VITE_FORMSPREE_FORM_ID } else { "" }

if (-not (Get-Command gcloud -ErrorAction SilentlyContinue)) {
  Write-Error "gcloud CLI is not installed"
}

if ($AuthLogin) {
  gcloud auth login
}

gcloud config set project $PROJECT_ID

Write-Host "Enabling required APIs..."
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com --quiet

Write-Host "Creating Artifact Registry repo (if missing)..."
gcloud artifacts repositories describe $REPO --location=$REGION 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
  gcloud artifacts repositories create $REPO `
    --repository-format=docker `
    --location=$REGION `
    --description="Portfolio images"
}

Write-Host "Building and pushing image (Formspree ID: $(if ($FORMSPREE_ID) { 'set' } else { 'not set' }))..."
$substitutions = "_REGION=$REGION,_REPO=$REPO,_IMAGE=$IMAGE"
if ($FORMSPREE_ID) {
  $substitutions += ",_PUBLIC_FORMSPREE_FORM_ID=$FORMSPREE_ID"
}

gcloud builds submit `
  --config=cloudbuild.yaml `
  --substitutions=$substitutions `
  .

Write-Host "Deploying to Cloud Run..."
gcloud run deploy $SERVICE `
  --image "$REGION-docker.pkg.dev/$PROJECT_ID/$REPO/${IMAGE}:latest" `
  --region $REGION `
  --platform managed `
  --allow-unauthenticated `
  --set-env-vars HOST=0.0.0.0

Write-Host "Done. Service URL:"
gcloud run services describe $SERVICE --region $REGION --format="value(status.url)"
