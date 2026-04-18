import { browser } from "$app/environment";
import { derived, get, writable, type Readable } from "svelte/store";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function readStoredTheme(): Theme | null {
  if (!browser) return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  return null;
}

function systemTheme(): Theme {
  if (!browser) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const theme = writable<Theme>(readStoredTheme() ?? systemTheme());

function applyThemeClass(value: Theme) {
  if (!browser) return;
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(value);
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* ignore */
  }
}

if (browser) {
  applyThemeClass(get(theme));
}

theme.subscribe((value) => {
  applyThemeClass(value);
});

export const prefersReducedMotion = writable(false);

if (browser) {
  prefersReducedMotion.set(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  window
    .matchMedia("(prefers-reduced-motion: reduce)")
    .addEventListener("change", (e) => prefersReducedMotion.set(e.matches));
}

if (browser) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!readStoredTheme()) {
      theme.set(e.matches ? "dark" : "light");
    }
  });
}

export function getTheme(): Theme {
  return get(theme);
}

export function setTheme(next: Theme) {
  theme.set(next);
}

export function toggleTheme() {
  theme.update((t) => (t === "light" ? "dark" : "light"));
}

export const themeStore: Readable<Theme> = { subscribe: theme.subscribe };

export const themeLabel: Readable<string> = derived(theme, ($t) =>
  $t === "dark" ? "Light mode" : "Dark mode",
);
