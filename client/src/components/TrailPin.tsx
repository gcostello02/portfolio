import { motion } from "framer-motion";
import { 
  Home, 
  FolderOpen, 
  Briefcase, 
  Code, 
  Heart, 
  Mail,
  Check,
  LucideIcon 
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface TrailPinData {
  id: string;
  label: string;
  sublabel: string;
  iconType: "home" | "projects" | "experience" | "skills" | "interests" | "contact";
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
  skills: Code,
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
      initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              delay: 0.8 + index * 0.15,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }
      }
      data-testid={`trail-pin-${data.id}`}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            onClick={onClick}
            className="relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
            whileHover={prefersReducedMotion ? {} : { scale: 1.1, y: -4 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            aria-label={`${data.label} - ${data.sublabel}${isVisited ? " (visited)" : ""}`}
            data-testid={`button-pin-${data.id}`}
          >
            <motion.div
              className={`
                relative w-12 h-12 sm:w-14 sm:h-14 rounded-full
                flex items-center justify-center
                transition-colors duration-300
                ${isVisited 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card text-foreground border-2 border-primary/40"
                }
              `}
              style={{
                boxShadow: isVisited
                  ? "0 4px 20px -2px hsl(var(--primary) / 0.4), 0 2px 8px -2px hsl(var(--primary) / 0.3)"
                  : "0 4px 12px -2px hsl(var(--foreground) / 0.1)",
              }}
            >
              {isVisited ? (
                <motion.div
                  initial={prefersReducedMotion ? {} : { scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
                </motion.div>
              ) : (
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
              
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20"
                initial={{ scale: 1, opacity: 0 }}
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: [1, 1.5, 1],
                        opacity: [0, 0.3, 0],
                      }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              />
            </motion.div>
            
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
              <span className="text-xs font-medium text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-border/50">
                {data.label}
              </span>
            </div>
          </motion.button>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="sm:hidden"
          sideOffset={8}
        >
          <div className="text-center">
            <p className="font-medium">{data.label}</p>
            <p className="text-xs text-muted-foreground">{data.sublabel}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </motion.div>
  );
}
