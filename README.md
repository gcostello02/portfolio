# Grant Costello Portfolio

A modern, data-driven portfolio site built with **SvelteKit**. Content is edited via JSON files. The app is prerendered for fast loads, uses **long-lived cache headers** for hashed assets, and registers a **service worker** so repeat visits can reuse cached shell and immutable chunks.

## Tech Stack

- SvelteKit 2 + Svelte 5 + TypeScript
- Tailwind CSS
- lucide-svelte
- Zod (contact form validation)
- Node adapter (`@sveltejs/adapter-node`) for production / Docker

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
- **`PORT`**: Server port (Docker uses `8080`).
- **`HOST`**: Bind address (use `0.0.0.0` in containers).

## Deployment (Linux mini PC + Cloudflare Tunnel)

Traffic flows:

```text
Browser → Cloudflare (gcostello.com) → your existing cloudflared → localhost:8080
```

### If you already have a tunnel (e.g. Jellyfin)

You do **not** need a second `cloudflared` or `TUNNEL_TOKEN`. One tunnel can serve many hostnames.

1. **`.env`** — only `PUBLIC_FORMSPREE_FORM_ID` is required.
2. **Start portfolio:**

```bash
docker compose build
docker compose up -d
```

3. **Cloudflare Zero Trust → Networks → Tunnels** → open your existing tunnel → **Public Hostname** → add:
   - `gcostello.com` → HTTP → `http://localhost:8080`

   Match whatever pattern Jellyfin uses (if Jellyfin points at `http://jellyfin:8096`, you may need `http://host.docker.internal:8080` instead — check your Jellyfin hostname config and mirror it).

4. Remove any old DNS record pointing `gcostello.com` at Cloud Run.

### If you need a new dedicated tunnel

```bash
# .env needs TUNNEL_TOKEN and PUBLIC_FORMSPREE_FORM_ID
docker compose --profile tunnel up -d --build
```

Add `gcostello.com` → `http://portfolio:8080` on that tunnel (Compose service name, not `localhost`).

### Updates

```bash
git pull
docker compose build
docker compose up -d
```

### Troubleshooting

- **502 from Cloudflare**: Wrong origin URL on the public hostname — check how Jellyfin is configured and use the same pattern for port `8080`.
- **Contact form broken**: Rebuild after changing `PUBLIC_FORMSPREE_FORM_ID` — it's baked in at build time.
