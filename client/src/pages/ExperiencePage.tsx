import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mountain, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { useTrailProgress } from "@/hooks/use-trail-progress";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const heroVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } },
};

export default function ExperiencePage() {
  const { markVisited } = useTrailProgress();

  useEffect(() => {
    markVisited("experience");
    document.title = "Experience - Grant Costello | Blue Ridge Trails";
  }, [markVisited]);

  return (
    <motion.div
      className="min-h-screen bg-background"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      data-testid="experience-page"
    >
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10">
            <Mountain className="h-32 w-32 text-primary" />
          </div>
          <div className="absolute bottom-10 right-10">
            <Mountain className="h-24 w-24 text-secondary" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6"
              data-testid="button-back-trail"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Trail Map
            </Button>
          </Link>
          
          <motion.div
            variants={heroVariants}
            initial="initial"
            animate="animate"
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">Career Trail</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Experience
            </h1>
            <p className="text-lg text-muted-foreground">
              Traverse the professional path - from internships to current role. 
              See the elevation gained through each position.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <ExperienceSection />
      </section>
    </motion.div>
  );
}
