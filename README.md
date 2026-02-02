# Grant Costello Portfolio

A modern, data-driven portfolio site built with React + Vite on the client and an Express server. Content is edited via JSON files.

## Tech Stack
- React 18 + Vite
- TypeScript
- Express (Node)
- Tailwind CSS + shadcn/ui
- Framer Motion

## Requirements
- Node.js 20.x recommended
- npm

## Local Development
1) Install deps:
```
npm install
```

2) Start dev server:
```
npm run dev
```

3) Open:
```
http://localhost:5000
```

## Build + Run (Production)
1) Build:
```
npm run build
```

2) Run:
```
npm run start
```

## Content Editing
All content lives in `client/src/content/`:
- `profile.json`
- `education.json`
- `experience.json`
- `projects.json`
- `skills.json`
- `interests.json`
- `apps.json`

## Deployment to Google Cloud (Cloud Run)
This repo includes a Dockerfile and one-command deployment scripts.

### Files
- `Dockerfile`
- `.dockerignore`
- `scripts/deploy-gcloud.sh` (macOS/Linux)
- `scripts/deploy-gcloud.ps1` (Windows PowerShell)

### Steps (edit once, then run one command)
1) Open the script for your OS and fill in these values:
- `PROJECT_ID`
- `REGION`
- `REPO`
- `IMAGE`
- `SERVICE`

2) Run the script.

macOS / Linux:
```
./scripts/deploy-gcloud.sh
```

Windows PowerShell:
```
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-gcloud.ps1
```

### What the script does
- Enables required GCP APIs
- Creates an Artifact Registry repo (if needed)
- Builds and pushes the Docker image with Cloud Build
- Deploys to Cloud Run and sets `HOST=0.0.0.0`

## Environment Variables
- `PORT`: Server port (Cloud Run uses 8080 automatically)
- `HOST`: Bind host (Cloud Run needs `0.0.0.0`)
- `DATABASE_URL`: Only needed if you add real DB usage

## Troubleshooting
- If the dev server fails to bind on macOS with Node 24, use Node 20 or ensure `HOST=127.0.0.1` locally.
- If Cloud Run deploy fails, confirm the project ID and region are correct and that billing is enabled.
