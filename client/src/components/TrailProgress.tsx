import { motion } from "framer-motion";
import { MapPin, Unlock, Lock, Trophy } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useTrailProgress, TRAIL_STOPS } from "@/hooks/use-trail-progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TrailProgress() {
  const { prefersReducedMotion } = useTheme();
  const { isVisited, getVisitedCount, getTotalStops, isUnlocked } =
    useTrailProgress();

  const visitedCount = getVisitedCount();
  const totalStops = getTotalStops();
  const unlocked = isUnlocked();

  return (
    <div 
      className={`flex flex-col gap-1.5 transition-all duration-300 ${
        unlocked ? "p-1.5 -m-1.5 rounded-lg ring-2 ring-amber-400/50 bg-gradient-to-r from-amber-400/10 to-amber-600/10" : ""
      }`}
      data-testid="trail-progress-widget"
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <MapPin className={`h-4 w-4 ${unlocked ? "text-amber-500" : "text-primary"}`} />
          <span className="text-xs font-medium text-muted-foreground">
            Visited {visitedCount}/{totalStops}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {TRAIL_STOPS.map((stop, index) => {
            const visited = isVisited(stop.id);
            return (
              <Tooltip key={stop.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={prefersReducedMotion ? {} : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { delay: index * 0.05, type: "spring", stiffness: 500 }
                    }
                    className={`h-2.5 w-2.5 rounded-full border transition-colors ${
                      visited
                        ? unlocked 
                          ? "bg-amber-500 border-amber-500"
                          : "bg-primary border-primary"
                        : "bg-muted border-border"
                    }`}
                    data-testid={`trail-dot-${stop.id}`}
                    aria-label={`${stop.label}: ${visited ? "visited" : "not visited"}`}
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  <p>
                    {stop.label}
                    {visited ? " (Visited)" : ""}
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {visitedCount >= 3 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={prefersReducedMotion ? {} : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={prefersReducedMotion ? { duration: 0 } : { type: "spring" }}
                className="ml-1"
                data-testid="trail-unlock-indicator"
              >
                {unlocked ? (
                  <Trophy className="h-3.5 w-3.5 text-amber-500" />
                ) : (
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <p>{unlocked ? "Recruiter Packet Unlocked!" : "Visit 3 stops to unlock"}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      
      {unlocked && (
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-1"
        >
          <Trophy className="h-3 w-3 text-amber-500" />
          <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">
            Packet Unlocked!
          </span>
        </motion.div>
      )}
    </div>
  );
}

export { useTrailProgress };
