# Grant Costello Portfolio

A modern, data-driven portfolio site built with **SvelteKit**. Content is edited via JSON files. The app is prerendered for fast loads, uses **long-lived cache headers** for hashed assets, and registers a **service worker** so repeat visits can reuse cached shell and immutable chunks.

## Tech Stack

- SvelteKit 2 + Svelte 5 + TypeScript
- Tailwind CSS
- lucide-svelte
- Zod (contact form validation)
- Node adapter (`@sveltejs/adapter-node`) for production / Cloud Run

## Requirements

- Node.js 20.x recommended
- npm

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open `http://localhost:5173` (or the URL printed in the terminal).

## Build and Run (Production)

```bash
npm run build
npm run start
```

By default the Node server listens on `PORT` (default `3000` for adapter-node) and `HOST` (set `0.0.0.0` for containers).

## Content Editing

All content lives in `src/lib/content/`:

- `profile.json`
- `education.json`
- `experience.json`
- `projects.json`
- `interests.json`

## Environment Variables

- **`PUBLIC_FORMSPREE_FORM_ID`**: Formspree form ID for the contact form (optional). Client-visible env vars use the `PUBLIC_` prefix.
- **`PORT`**: Server port (Cloud Run uses `8080` automatically).
- **`HOST`**: Bind address (use `0.0.0.0` for Cloud Run).

## Deployment to Google Cloud (Cloud Run)

Defaults target GCP project **`gcostello`** and region **`us-east4`**. Override with a `.env` file in the repo root (`PROJECT_ID`, `REGION`, `REPO`, `IMAGE`, `SERVICE`, `PUBLIC_FORMSPREE_FORM_ID`).

Run:

**macOS / Linux**

```bash
./scripts/deploy-gcloud.sh
```

**Windows PowerShell**

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-gcloud.ps1
```

The Docker build passes `PUBLIC_FORMSPREE_FORM_ID` as a build argument so the contact form ID is embedded at build time.

## Troubleshooting

- If Cloud Run deploy fails, confirm the project ID and region and that billing is enabled.
- If `gcloud builds submit` fails with `PERMISSION_DENIED`, grant your user `roles/cloudbuild.builds.editor` and `roles/artifactregistry.writer` in the project.
