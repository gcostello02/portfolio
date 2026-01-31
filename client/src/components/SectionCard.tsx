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

export interface SectionCardData {
  id: string;
  label: string;
  sublabel: string;
  iconType: "home" | "projects" | "experience" | "skills" | "interests" | "contact";
}

interface SectionCardProps {
  data: SectionCardData;
  isVisited: boolean;
  onClick: () => void;
  index: number;
}

const iconMap: Record<SectionCardData["iconType"], LucideIcon> = {
  home: Home,
  projects: FolderOpen,
  experience: Briefcase,
  skills: Code,
  interests: Heart,
  contact: Mail,
};

export function SectionCard({ data, isVisited, onClick, index }: SectionCardProps) {
  const { prefersReducedMotion } = useTheme();
  const Icon = iconMap[data.iconType];
  
  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              delay: 0.1 + index * 0.08,
              type: "spring",
              stiffness: 300,
              damping: 25,
            }
      }
      data-testid={`section-card-${data.id}`}
    >
      <motion.button
        onClick={onClick}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
        whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -2 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        aria-label={`${data.label} - ${data.sublabel}${isVisited ? " (visited)" : ""}`}
        data-testid={`button-section-${data.id}`}
      >
        <Card 
          className={`
            relative p-4 cursor-pointer overflow-hidden
            transition-all duration-200
            hover-elevate
            ${isVisited 
              ? "bg-primary/5 border-primary/20" 
              : "bg-card/80 backdrop-blur-sm border-border/50"
            }
          `}
          style={{
            boxShadow: isVisited
              ? "0 4px 20px -4px hsl(var(--primary) / 0.15)"
              : "0 4px 16px -4px hsl(var(--foreground) / 0.08)",
          }}
        >
          <div className="flex items-center gap-4">
            <div 
              className={`
                flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
                transition-colors duration-200
                ${isVisited 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted/80 text-muted-foreground"
                }
              `}
            >
              {isVisited ? (
                <motion.div
                  initial={prefersReducedMotion ? {} : { scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Check className="w-5 h-5" strokeWidth={3} />
                </motion.div>
              ) : (
                <Icon className="w-5 h-5" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className={`text-base font-semibold ${isVisited ? "text-primary" : "text-foreground"}`}>
                {data.label}
              </p>
              <p className="text-sm text-muted-foreground">
                {data.sublabel}
              </p>
            </div>
            
            <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1 ${isVisited ? "text-primary/60" : "text-muted-foreground/40"}`} />
          </div>
        </Card>
      </motion.button>
    </motion.div>
  );
}
