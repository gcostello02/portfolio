import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase } from "lucide-react";
import { TopoBackground } from "@/components/TopoBackground";
import { TrailPath, TRAIL_POINTS } from "@/components/TrailPath";
import { TrailPin, type TrailPinData } from "@/components/TrailPin";
import { MobileTrailList } from "@/components/MobileTrailList";
import { TrailProgress, useTrailProgress } from "@/components/TrailProgress";
import { useTheme } from "@/components/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import { getProfile } from "@/lib/content";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { RecruiterPacketTrigger } from "@/components/RecruiterPacketTrigger";

const TRAIL_STOPS: TrailPinData[] = [
  {
    id: "home",
    label: "About",
    sublabel: "Learn about me",
    iconType: "home",
    position: { x: TRAIL_POINTS[0].x, y: TRAIL_POINTS[0].y },
  },
  {
    id: "projects",
    label: "Projects",
    sublabel: "View my work",
    iconType: "projects",
    position: { x: TRAIL_POINTS[1].x, y: TRAIL_POINTS[1].y },
  },
  {
    id: "experience",
    label: "Experience",
    sublabel: "Career history",
    iconType: "experience",
    position: { x: TRAIL_POINTS[2].x, y: TRAIL_POINTS[2].y },
  },
  {
    id: "skills",
    label: "Skills",
    sublabel: "Technical abilities",
    iconType: "skills",
    position: { x: TRAIL_POINTS[3].x, y: TRAIL_POINTS[3].y },
  },
  {
    id: "interests",
    label: "Interests",
    sublabel: "Beyond code",
    iconType: "interests",
    position: { x: TRAIL_POINTS[4].x, y: TRAIL_POINTS[4].y },
  },
  {
    id: "contact",
    label: "Contact",
    sublabel: "Get in touch",
    iconType: "contact",
    position: { x: TRAIL_POINTS[5].x, y: TRAIL_POINTS[5].y },
  },
];

const DRAWER_CONTENT: Record<string, { title: string; description: string; action: string }> = {
  home: {
    title: "About Me",
    description: "Learn about my background, education, and what drives me as a software engineer.",
    action: "Learn More",
  },
  projects: {
    title: "My Projects",
    description: "Explore the applications and systems I've built. Each project showcases different skills and technologies.",
    action: "View Projects",
  },
  experience: {
    title: "Work Experience",
    description: "See my professional journey from internships to my current role as a software engineer.",
    action: "View Experience",
  },
  skills: {
    title: "Technical Skills",
    description: "Languages, frameworks, and tools I've mastered throughout my career.",
    action: "View Skills",
  },
  interests: {
    title: "Beyond Code",
    description: "Discover my passions outside of software development - sports, teaching, and community involvement.",
    action: "View Interests",
  },
  contact: {
    title: "Get in Touch",
    description: "Ready to connect? Let's start a conversation about opportunities.",
    action: "Contact Me",
  },
};

export default function Home() {
  const { prefersReducedMotion } = useTheme();
  const isMobile = useIsMobile();
  const profile = getProfile();
  const { visited, markVisited, isVisited } = useTrailProgress();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  
  const handlePinClick = useCallback((stopId: string) => {
    markVisited(stopId as any);
    setSelectedStop(stopId);
    setDrawerOpen(true);
  }, [markVisited]);
  
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedStop(null), 300);
  }, []);
  
  useEffect(() => {
    markVisited("home");
  }, [markVisited]);
  
  const selectedContent = selectedStop ? DRAWER_CONTENT[selectedStop] : null;
  
  return (
    <div className="relative min-h-screen overflow-hidden" data-testid="home-page">
      <TopoBackground />
      
      <div className="fixed top-20 right-4 z-50 hidden sm:block">
        <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-lg p-3 shadow-lg">
          <TrailProgress />
        </div>
      </div>
      
      <div className="relative z-10">
        <section className="min-h-[40vh] sm:min-h-[35vh] flex flex-col items-center justify-center px-4 pt-8 pb-4 sm:pt-12">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.2, duration: 0.5 }}
            >
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-medium">Software Engineer</span>
            </motion.div>
            
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.3, duration: 0.6 }}
            >
              {profile.name}
            </motion.h1>
            
            <motion.p
              className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-xl mx-auto"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.4, duration: 0.6 }}
            >
              {profile.tagline}
            </motion.p>
            
            <motion.div
              className="flex items-center justify-center gap-4 text-sm text-muted-foreground"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.6, duration: 0.5 }}
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
              <span className="text-border">|</span>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" />
                <span>{profile.title}</span>
              </div>
            </motion.div>
          </motion.div>
        </section>
        
        {isMobile ? (
          <section className="relative py-8">
            <motion.div
              className="text-center mb-6 px-4"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.5, duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Explore My Portfolio
              </h2>
              <p className="text-sm text-muted-foreground">
                Tap each section to discover more
              </p>
            </motion.div>
            
            <div className="pb-4 px-4 mb-4">
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-3 mx-auto max-w-md">
                <TrailProgress />
              </div>
            </div>
            
            <MobileTrailList
              stops={TRAIL_STOPS}
              visitedStops={visited}
              onStopClick={handlePinClick}
            />
          </section>
        ) : (
          <section className="relative h-[60vh] min-h-[500px]">
            <TrailPath />
            
            {TRAIL_STOPS.map((stop, index) => (
              <TrailPin
                key={stop.id}
                data={stop}
                isVisited={isVisited(stop.id as any)}
                onClick={() => handlePinClick(stop.id)}
                index={index}
              />
            ))}
          </section>
        )}
        
        <section className="relative py-16 px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Let's Connect
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {profile.summary.split('\n')[0]}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button 
                size="lg"
                onClick={() => handlePinClick("projects")}
                data-testid="button-view-projects"
              >
                View Projects
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handlePinClick("contact")}
                data-testid="button-contact"
              >
                Get in Touch
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
      
      <RecruiterPacketTrigger />
      
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent data-testid="trail-drawer">
          <div className="mx-auto w-full max-w-lg">
            <DrawerHeader className="text-center">
              <DrawerTitle className="text-2xl">
                {selectedContent?.title}
              </DrawerTitle>
              <DrawerDescription className="text-base mt-2">
                {selectedContent?.description}
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-6 pt-0">
              <div className="flex flex-col gap-3">
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={closeDrawer}
                  data-testid="button-drawer-action"
                >
                  {selectedContent?.action}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full"
                  onClick={closeDrawer}
                  data-testid="button-drawer-close"
                >
                  Keep Browsing
                </Button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
