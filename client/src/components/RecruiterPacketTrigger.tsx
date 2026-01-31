import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTrailProgress } from "@/hooks/use-trail-progress";
import { RecruiterPacket } from "./RecruiterPacket";
import { useTheme } from "./ThemeProvider";

export function RecruiterPacketTrigger() {
  const { prefersReducedMotion } = useTheme();
  const { isUnlocked, getVisitedCount } = useTrailProgress();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const unlocked = isUnlocked();
  const visitedCount = getVisitedCount();
  const stopsNeeded = 3 - visitedCount;

  const handleClick = () => {
    if (unlocked) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="fixed bottom-6 right-6 z-40"
            initial={prefersReducedMotion ? {} : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { delay: 1, type: "spring" }}
          >
            <Button
              size="lg"
              onClick={handleClick}
              disabled={!unlocked}
              className={`
                relative overflow-visible shadow-lg
                ${unlocked 
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-amber-400" 
                  : "bg-muted text-muted-foreground cursor-not-allowed"
                }
              `}
              data-testid="button-recruiter-packet-trigger"
            >
              {unlocked && !prefersReducedMotion && (
                <motion.div
                  className="absolute inset-0 rounded-md bg-amber-400/50"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
              {unlocked ? (
                <Unlock className="h-4 w-4 mr-2" />
              ) : (
                <Lock className="h-4 w-4 mr-2" />
              )}
              <span className="relative z-10">
                {unlocked ? "Recruiter Packet" : "Locked"}
              </span>
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-[200px]">
          {unlocked ? (
            <p>Click to view the recruiter packet with resume, links, and more!</p>
          ) : (
            <p>Visit {stopsNeeded} more trail stop{stopsNeeded !== 1 ? 's' : ''} to unlock the recruiter packet</p>
          )}
        </TooltipContent>
      </Tooltip>

      <RecruiterPacket 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
