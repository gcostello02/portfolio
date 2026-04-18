import { browser } from "$app/environment";
import { get, writable, type Readable } from "svelte/store";

const STORAGE_KEY = "trailProgress";
export const UNLOCK_THRESHOLD = 3;

export const TRAIL_STOPS = [
  { id: "education", label: "Education", path: "/education" },
  { id: "experience", label: "Experience", path: "/experience" },
  { id: "projects", label: "Projects", path: "/projects" },
  { id: "interests", label: "Interests", path: "/interests" },
  { id: "contact", label: "Contact", path: "/contact" },
] as const;

export type TrailStopId = (typeof TRAIL_STOPS)[number]["id"];

interface TrailProgress {
  visited: TrailStopId[];
  lastVisit: string | null;
}

const PROGRESS_UPDATE_EVENT = "trailProgressUpdate";

function loadProgress(): TrailProgress {
  if (!browser) return { visited: [], lastVisit: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as TrailProgress;
  } catch {
    console.warn("Failed to parse trail progress from localStorage");
  }
  return { visited: [], lastVisit: null };
}

function saveProgress(p: TrailProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    console.warn("Failed to save trail progress");
  }
  if (browser) {
    window.dispatchEvent(new CustomEvent(PROGRESS_UPDATE_EVENT));
  }
}

const progress = writable<TrailProgress>(loadProgress());

if (browser) {
  window.addEventListener("storage", () => {
    progress.set(loadProgress());
  });
  window.addEventListener(PROGRESS_UPDATE_EVENT, () => {
    progress.set(loadProgress());
  });
}

export const trailProgress: Readable<TrailProgress> = {
  subscribe: progress.subscribe,
};

export function markVisited(stopId: TrailStopId) {
  progress.update((p) => {
    if (p.visited.includes(stopId)) return p;
    const next: TrailProgress = {
      visited: [...p.visited, stopId],
      lastVisit: new Date().toISOString(),
    };
    saveProgress(next);
    return next;
  });
}

export function isVisited(stopId: TrailStopId): boolean {
  return get(progress).visited.includes(stopId);
}

export function isUnlocked(): boolean {
  return get(progress).visited.length >= UNLOCK_THRESHOLD;
}

export function getVisitedCount(): number {
  return get(progress).visited.length;
}

export function getTotalStops(): number {
  return TRAIL_STOPS.length;
}

export function resetProgress() {
  const empty: TrailProgress = { visited: [], lastVisit: null };
  saveProgress(empty);
  progress.set(empty);
}
