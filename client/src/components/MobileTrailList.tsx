import { motion } from "framer-motion";
import { 
  Home, 
  FolderOpen, 
  Briefcase, 
  Code, 
  Heart, 
  Mail,
  Check,
  ChevronRight,
  LucideIcon 
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Card } from "@/components/ui/card";
import type { TrailPinData } from "./TrailPin";

interface MobileTrailListProps {
  stops: TrailPinData[];
  visitedStops: string[];
  onStopClick: (stopId: string) => void;
}

const iconMap: Record<TrailPinData["iconType"], LucideIcon> = {
  home: Home,
  projects: FolderOpen,
  experience: Briefcase,
  skills: Code,
  interests: Heart,
  contact: Mail,
};

export function MobileTrailList({ stops, visitedStops, onStopClick }: MobileTrailListProps) {
  const { prefersReducedMotion } = useTheme();
  
  return (
    <div className="px-4 pb-8" data-testid="mobile-trail-list">
      <div className="max-w-md mx-auto space-y-3">
        {stops.map((stop, index) => {
          const Icon = iconMap[stop.iconType];
          const isVisited = visitedStops.includes(stop.id);
          
          return (
            <motion.div
              key={stop.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { delay: 0.1 + index * 0.08, duration: 0.4 }
              }
            >
              <Card
                className="overflow-visible hover-elevate active-elevate-2 cursor-pointer transition-all duration-200"
                onClick={() => onStopClick(stop.id)}
                data-testid={`mobile-stop-${stop.id}`}
              >
                <div className="flex items-center gap-4 p-4">
                  <div
                    className={`
                      relative flex-shrink-0 w-12 h-12 rounded-full
                      flex items-center justify-center
                      transition-colors duration-300
                      ${isVisited 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                      }
                    `}
                  >
                    {isVisited ? (
                      <motion.div
                        initial={prefersReducedMotion ? {} : { scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Check className="w-5 h-5" strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {stop.label}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {stop.sublabel}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isVisited && (
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        Visited
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
                
                {index < stops.length - 1 && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-px h-3 bg-border" />
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
