import { useEffect, useCallback } from "react";

const CACHE_KEY = "prefetch_cache_timestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const PREFETCH_ROUTES = [
  "/education",
  "/experience", 
  "/projects",
  "/skills",
  "/interests",
  "/contact",
];

function isCacheValid(): boolean {
  const timestamp = localStorage.getItem(CACHE_KEY);
  if (!timestamp) return false;
  
  const cacheTime = parseInt(timestamp, 10);
  return Date.now() - cacheTime < CACHE_DURATION;
}

function updateCacheTimestamp(): void {
  localStorage.setItem(CACHE_KEY, Date.now().toString());
}

function prefetchRoute(path: string): void {
  const existingLink = document.querySelector(`link[rel="prefetch"][href="${path}"]`);
  if (existingLink) return;
  
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = path;
  link.as = "document";
  document.head.appendChild(link);
}

export function usePrefetch(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;
    
    const timeoutIds: number[] = [];
    
    const doPrefetch = () => {
      if (isCacheValid()) {
        return;
      }

      const initialDelay = window.setTimeout(() => {
        PREFETCH_ROUTES.forEach((route, index) => {
          const id = window.setTimeout(() => {
            prefetchRoute(route);
          }, index * 100);
          timeoutIds.push(id);
        });
        
        updateCacheTimestamp();
      }, 1000);
      
      timeoutIds.push(initialDelay);
    };
    
    if (document.readyState === "complete") {
      doPrefetch();
    } else {
      window.addEventListener("load", doPrefetch);
      return () => {
        window.removeEventListener("load", doPrefetch);
        timeoutIds.forEach(id => window.clearTimeout(id));
      };
    }
    
    return () => {
      timeoutIds.forEach(id => window.clearTimeout(id));
    };
  }, [enabled]);
}

export function usePrefetchOnHover() {
  const prefetch = useCallback((path: string) => {
    prefetchRoute(path);
  }, []);

  return { prefetch };
}
