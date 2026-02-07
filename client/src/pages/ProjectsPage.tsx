import { useEffect } from "react";
import { motion } from "framer-motion";
import { Layers, FolderGit2 } from "lucide-react";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { useTrailProgress } from "@/hooks/use-trail-progress";
import { SEO } from "@/components/SEO";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const heroVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } },
};

export default function ProjectsPage() {
  const { markVisited } = useTrailProgress();

  useEffect(() => {
    markVisited("projects");
  }, [markVisited]);

  return (
    <>
      <SEO
        title="Projects"
        description="Explore my portfolio of software projects including web applications, mobile apps, and tools. Each project showcases different technologies and problem-solving approaches."
        path="/projects"
      />
      <motion.div
      className="min-h-screen bg-background"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      data-testid="projects-page"
    >
      <section className="relative py-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10">
            <Layers className="h-32 w-32 text-primary" />
          </div>
          <div className="absolute bottom-10 right-10">
            <Layers className="h-24 w-24 text-secondary" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={heroVariants}
            initial="initial"
            animate="animate"
            className="max-w-2xl lg:max-w-none"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <FolderGit2 className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">Portfolio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Projects
            </h1>
            <p className="text-lg text-muted-foreground lg:whitespace-nowrap">
              Explore the applications and systems I've built. 
              Each project showcases different skills and technologies.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-4">
        <ProjectsSection />
      </section>
    </motion.div>
    </>
  );
}
