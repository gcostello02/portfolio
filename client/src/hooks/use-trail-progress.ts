import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "trailProgress";
const UNLOCK_THRESHOLD = 3;

export const TRAIL_STOPS = [
  { id: "education", label: "Education", path: "/education" },
  { id: "experience", label: "Experience", path: "/experience" },
  { id: "projects", label: "Projects", path: "/projects" },
  { id: "skills", label: "Skills", path: "/skills" },
  { id: "interests", label: "Interests", path: "/interests" },
  { id: "contact", label: "Contact", path: "/contact" },
] as const;

export type TrailStopId = (typeof TRAIL_STOPS)[number]["id"];

interface TrailProgress {
  visited: TrailStopId[];
  lastVisit: string | null;
}

function getStoredProgress(): TrailProgress {
  if (typeof window === "undefined") {
    return { visited: [], lastVisit: null };
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    console.warn("Failed to parse trail progress from localStorage");
  }
  return { visited: [], lastVisit: null };
}

function saveProgress(progress: TrailProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    console.warn("Failed to save trail progress to localStorage");
  }
}

const PROGRESS_UPDATE_EVENT = "trailProgressUpdate";

function dispatchProgressUpdate() {
  window.dispatchEvent(new CustomEvent(PROGRESS_UPDATE_EVENT));
}

export function useTrailProgress() {
  const [progress, setProgress] = useState<TrailProgress>(() =>
    getStoredProgress()
  );

  useEffect(() => {
    const stored = getStoredProgress();
    setProgress(stored);
  }, []);

  useEffect(() => {
    const handleProgressUpdate = () => {
      const stored = getStoredProgress();
      setProgress(stored);
    };

    window.addEventListener(PROGRESS_UPDATE_EVENT, handleProgressUpdate);
    window.addEventListener("storage", handleProgressUpdate);

    return () => {
      window.removeEventListener(PROGRESS_UPDATE_EVENT, handleProgressUpdate);
      window.removeEventListener("storage", handleProgressUpdate);
    };
  }, []);

  const markVisited = useCallback((stopId: TrailStopId) => {
    setProgress((prev) => {
      if (prev.visited.includes(stopId)) {
        return prev;
      }
      const newProgress: TrailProgress = {
        visited: [...prev.visited, stopId],
        lastVisit: new Date().toISOString(),
      };
      saveProgress(newProgress);
      dispatchProgressUpdate();
      return newProgress;
    });
  }, []);

  const getVisited = useCallback((): TrailStopId[] => {
    return progress.visited;
  }, [progress.visited]);

  const isVisited = useCallback(
    (stopId: TrailStopId): boolean => {
      return progress.visited.includes(stopId);
    },
    [progress.visited]
  );

  const isUnlocked = useCallback((): boolean => {
    return progress.visited.length >= UNLOCK_THRESHOLD;
  }, [progress.visited.length]);

  const getVisitedCount = useCallback((): number => {
    return progress.visited.length;
  }, [progress.visited.length]);

  const getTotalStops = useCallback((): number => {
    return TRAIL_STOPS.length;
  }, []);

  const resetProgress = useCallback(() => {
    const newProgress: TrailProgress = { visited: [], lastVisit: null };
    saveProgress(newProgress);
    setProgress(newProgress);
  }, []);

  return {
    visited: progress.visited,
    markVisited,
    getVisited,
    isVisited,
    isUnlocked,
    getVisitedCount,
    getTotalStops,
    resetProgress,
    stops: TRAIL_STOPS,
  };
}
