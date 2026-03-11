import { motion } from "framer-motion";
import { 
  Home, 
  FolderOpen, 
  Briefcase, 
  Heart, 
  Mail,
  Check,
  LucideIcon,
  ChevronRight
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Card } from "@/components/ui/card";

export interface TrailPinData {
  id: string;
  label: string;
  sublabel: string;
  iconType: "home" | "projects" | "experience" | "interests" | "contact";
  position: { x: number; y: number };
}

interface TrailPinProps {
  data: TrailPinData;
  isVisited: boolean;
  onClick: () => void;
  index: number;
}

const iconMap: Record<TrailPinData["iconType"], LucideIcon> = {
  home: Home,
  projects: FolderOpen,
  experience: Briefcase,
  interests: Heart,
  contact: Mail,
};

export function TrailPin({ data, isVisited, onClick, index }: TrailPinProps) {
  const { prefersReducedMotion } = useTheme();
  const Icon = iconMap[data.iconType];
  
  return (
    <motion.div
      className="absolute z-10"
      style={{
        left: `${data.position.x}%`,
        top: `${data.position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              delay: 0.8 + index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 25,
            }
      }
      data-testid={`trail-pin-${data.id}`}
    >
      <motion.button
        onClick={onClick}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
        whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        aria-label={`${data.label} - ${data.sublabel}${isVisited ? " (visited)" : ""}`}
        data-testid={`button-pin-${data.id}`}
      >
        <Card 
          className={`
            relative p-3 min-w-[140px] cursor-pointer
            transition-all duration-200
            hover-elevate
            ${isVisited 
              ? "bg-primary/10 border-primary/30" 
              : "bg-card/95 backdrop-blur-sm border-border/60"
            }
          `}
          style={{
            boxShadow: isVisited
              ? "0 4px 16px -4px hsl(var(--primary) / 0.25)"
              : "0 4px 12px -4px hsl(var(--foreground) / 0.1)",
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className={`
                flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center
                transition-colors duration-200
                ${isVisited 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
                }
              `}
            >
              {isVisited ? (
                <motion.div
                  initial={prefersReducedMotion ? {} : { scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Check className="w-4 h-4" strokeWidth={3} />
                </motion.div>
              ) : (
                <Icon className="w-4 h-4" />
              )}
            </div>
            
            <div className="flex-1 text-left min-w-0">
              <p className={`text-sm font-medium truncate ${isVisited ? "text-primary" : "text-foreground"}`}>
                {data.label}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {data.sublabel}
              </p>
            </div>
            
            <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isVisited ? "text-primary/60" : "text-muted-foreground/50"}`} />
          </div>
        </Card>
      </motion.button>
    </motion.div>
  );
}
