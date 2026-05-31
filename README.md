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
Browser → Cloudflare (gcostello.com) → cloudflared tunnel → Docker portfolio:8080
```

### One-time Cloudflare setup

1. **Zero Trust → Networks → Tunnels → Create a tunnel** → choose **Docker**.
2. Copy the **tunnel token** into `.env`.
3. On the **Public Hostname** tab, add `gcostello.com` → HTTP → `portfolio:8080` (the Compose service name, not `localhost`).
4. Add `www` if needed, or redirect it in Cloudflare.

### Deploy

```bash
git clone https://github.com/gcostello02/portfolio.git
cd portfolio
cp .env.example .env
# edit .env — set TUNNEL_TOKEN and PUBLIC_FORMSPREE_FORM_ID

docker compose build
docker compose up -d
```

Updates:

```bash
git pull
docker compose build
docker compose up -d
```

### Troubleshooting

- **502 from Cloudflare**: Public hostname URL must be `http://portfolio:8080`, not `localhost:8080`.
- **Tunnel won't start**: Check `TUNNEL_TOKEN` in `.env` and run `docker compose logs cloudflared`.
- **Contact form broken**: Rebuild the image after changing `PUBLIC_FORMSPREE_FORM_ID` — it's baked in at build time.
