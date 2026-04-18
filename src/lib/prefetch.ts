import { browser } from "$app/environment";

const CACHE_KEY = "prefetch_cache_timestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000;

const PREFETCH_ROUTES = [
  "/education",
  "/experience",
  "/projects",
  "/interests",
  "/contact",
];

function cacheValid(): boolean {
  const ts = localStorage.getItem(CACHE_KEY);
  if (!ts) return false;
  return Date.now() - parseInt(ts, 10) < CACHE_DURATION;
}

function prefetchRoute(path: string) {
  if (document.querySelector(`link[rel="prefetch"][href="${path}"]`)) return;
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = path;
  link.as = "document";
  document.head.appendChild(link);
}

export function scheduleRoutePrefetch() {
  if (!browser) return () => {};

  const timeouts: number[] = [];

  const run = () => {
    if (cacheValid()) return;
    const t0 = window.setTimeout(() => {
      PREFETCH_ROUTES.forEach((route, i) => {
        const id = window.setTimeout(() => prefetchRoute(route), i * 100);
        timeouts.push(id);
      });
      localStorage.setItem(CACHE_KEY, Date.now().toString());
    }, 1000);
    timeouts.push(t0);
  };

  if (document.readyState === "complete") run();
  else window.addEventListener("load", run);

  return () => timeouts.forEach((id) => clearTimeout(id));
}
