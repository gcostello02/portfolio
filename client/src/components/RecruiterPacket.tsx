import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Download, ExternalLink, Mail, GraduationCap, Briefcase, Code, Users } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProfile } from "@/lib/content";

interface RecruiterPacketProps {
  isOpen: boolean;
  onClose: () => void;
}

function ConfettiParticle({ delay, x }: { delay: number; x: number }) {
  const colors = ["#fbbf24", "#f59e0b", "#d97706", "#92400e"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{ backgroundColor: color, left: `${x}%` }}
      initial={{ y: -20, opacity: 1, scale: 1 }}
      animate={{ 
        y: 300, 
        opacity: 0, 
        scale: 0.5,
        rotate: Math.random() * 360,
        x: (Math.random() - 0.5) * 100
      }}
      transition={{ 
        duration: 2 + Math.random(), 
        delay: delay,
        ease: "easeOut"
      }}
    />
  );
}

export function RecruiterPacket({ isOpen, onClose }: RecruiterPacketProps) {
  const profile = getProfile();
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasShownConfetti, setHasShownConfetti] = useState(false);

  useEffect(() => {
    if (isOpen && !hasShownConfetti) {
      setShowConfetti(true);
      setHasShownConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, hasShownConfetti]);

  const highlights = [
    { icon: GraduationCap, text: "UVA CS & Economics Double Major, 3.3 GPA" },
    { icon: Code, text: "Full-Stack Developer: React, Node, Angular, .NET" },
    { icon: Briefcase, text: "2 SWE Internships + Current Role at TruePath Vision" },
    { icon: Users, text: "TA Experience + Team Player (UVA Women's Basketball)" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="sm:max-w-lg overflow-hidden"
        data-testid="recruiter-packet-modal"
      >
        <AnimatePresence>
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
              {Array.from({ length: 12 }).map((_, i) => (
                <ConfettiParticle 
                  key={i} 
                  delay={i * 0.1} 
                  x={10 + (i * 7)}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <DialogHeader className="text-center pb-2">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex justify-center mb-3"
          >
            <div className="p-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg">
              <Trophy className="h-8 w-8 text-white" />
            </div>
          </motion.div>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
            Recruiter Packet Unlocked
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Thank you for exploring! Here's everything you need.
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-gradient-to-br from-card to-muted/30 border-amber-500/20">
            <div className="text-center mb-3">
              <h3 className="font-semibold text-lg">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.title}</p>
            </div>
            
            <div className="space-y-2">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <item.icon className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <Button 
            size="lg" 
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
            asChild
            data-testid="button-download-resume"
          >
            <a href="/resume.pdf" download>
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </a>
          </Button>

          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              asChild
              data-testid="link-github-personal"
            >
              <a 
                href={`https://github.com/${profile.github.personal}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <SiGithub className="h-4 w-4 mr-1.5" />
                <span className="text-xs">Personal</span>
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              asChild
              data-testid="link-github-work"
            >
              <a 
                href={`https://github.com/${profile.github.work}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <SiGithub className="h-4 w-4 mr-1.5" />
                <span className="text-xs">Work</span>
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              asChild
              data-testid="link-linkedin"
            >
              <a 
                href={`https://${profile.linkedin}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <SiLinkedin className="h-4 w-4 mr-1.5" />
                <span className="text-xs">LinkedIn</span>
              </a>
            </Button>
          </div>

          <Button 
            variant="secondary" 
            className="w-full"
            asChild
            data-testid="button-contact-cta"
          >
            <a href={`mailto:${profile.email}`}>
              <Mail className="h-4 w-4 mr-2" />
              Contact Grant
            </a>
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
