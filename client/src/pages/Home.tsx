import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { MapPin, Briefcase } from "lucide-react";
import { TopoBackground } from "@/components/TopoBackground";
import { SectionCard, type SectionCardData } from "@/components/SectionCard";
import { useTrailProgress } from "@/components/TrailProgress";
import { useTheme } from "@/components/ThemeProvider";
import { getProfile } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { RecruiterPacketTrigger } from "@/components/RecruiterPacketTrigger";

const SECTIONS: SectionCardData[] = [
  {
    id: "home",
    label: "About",
    sublabel: "Learn about me",
    iconType: "home",
  },
  {
    id: "projects",
    label: "Projects",
    sublabel: "View my work",
    iconType: "projects",
  },
  {
    id: "experience",
    label: "Experience",
    sublabel: "Career history",
    iconType: "experience",
  },
  {
    id: "skills",
    label: "Skills",
    sublabel: "Technical abilities",
    iconType: "skills",
  },
  {
    id: "interests",
    label: "Interests",
    sublabel: "Beyond code",
    iconType: "interests",
  },
  {
    id: "contact",
    label: "Contact",
    sublabel: "Get in touch",
    iconType: "contact",
  },
];

const SECTION_ROUTES: Record<string, string> = {
  home: "/about",
  projects: "/projects",
  experience: "/experience",
  skills: "/skills",
  interests: "/interests",
  contact: "/contact",
};

export default function Home() {
  const { prefersReducedMotion } = useTheme();
  const [, setLocation] = useLocation();
  const profile = getProfile();
  const { markVisited, isVisited } = useTrailProgress();
  
  const handleCardClick = useCallback((stopId: string) => {
    markVisited(stopId as any);
    const route = SECTION_ROUTES[stopId];
    if (route) {
      setLocation(route);
    }
  }, [markVisited, setLocation]);
  
  useEffect(() => {
    markVisited("home");
  }, [markVisited]);
  
  return (
    <div className="relative min-h-screen overflow-hidden" data-testid="home-page">
      <TopoBackground />
      
      
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
        
        <section className="relative py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-8"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.5, duration: 0.4 }}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                Explore My Portfolio
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Click each section to learn more
              </p>
            </motion.div>
            
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {SECTIONS.map((section, index) => (
                <SectionCard
                  key={section.id}
                  data={section}
                  isVisited={isVisited(section.id as any)}
                  onClick={() => handleCardClick(section.id)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        
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
                onClick={() => handleCardClick("projects")}
                data-testid="button-view-projects"
              >
                View Projects
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleCardClick("contact")}
                data-testid="button-contact"
              >
                Get in Touch
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
      
      <RecruiterPacketTrigger />
    </div>
  );
}
