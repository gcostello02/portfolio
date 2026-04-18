import type { Handle } from "@sveltejs/kit";

/**
 * Strong caching for hashed build assets; moderate cache for static files.
 * HTML responses use SvelteKit defaults (typically revalidate / short cache for SSR).
 */
export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  const path = event.url.pathname;

  if (path.startsWith("/_app/immutable/")) {
    response.headers.set(
      "cache-control",
      "public, max-age=31536000, immutable",
    );
  } else if (/\.(png|jpe?g|gif|webp|svg|ico|pdf|woff2?|webm)$/i.test(path)) {
    response.headers.set(
      "cache-control",
      "public, max-age=86400, stale-while-revalidate=604800",
    );
  }

  return response;
};
