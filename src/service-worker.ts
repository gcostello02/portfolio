/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />
import { build, files, version } from "$service-worker";

const sw = self as unknown as ServiceWorkerGlobalScope;

const ASSETS = `cache${version}`;

sw.addEventListener("install", (event) => {
  async function addFilesToCache() {
    const cache = await caches.open(ASSETS);
    await cache.addAll([...build, ...files]);
  }

  event.waitUntil(addFilesToCache());
});

sw.addEventListener("activate", (event) => {
  async function deleteOldCaches() {
    for (const key of await caches.keys()) {
      if (key !== ASSETS) await caches.delete(key);
    }
  }

  event.waitUntil(deleteOldCaches());
});

sw.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  async function respond() {
    const url = new URL(event.request.url);
    if (url.origin !== location.origin) return fetch(event.request);

    const cache = await caches.open(ASSETS);

    if (url.pathname.startsWith("/_app/immutable/")) {
      const hit = await cache.match(event.request);
      if (hit) return hit;
    }

    return fetch(event.request);
  }

  event.respondWith(respond());
});
