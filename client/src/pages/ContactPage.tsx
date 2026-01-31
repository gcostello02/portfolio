import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Layers, Mail, Flag } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ContactSection } from "@/components/sections/ContactSection";
import { useTrailProgress } from "@/hooks/use-trail-progress";
import { SEO } from "@/components/SEO";
import { getProfile } from "@/lib/content";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const heroVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } },
};

export default function ContactPage() {
  const { markVisited } = useTrailProgress();
  const profile = getProfile();

  useEffect(() => {
    markVisited("contact");
  }, [markVisited]);

  return (
    <>
      <SEO
        title="Contact"
        description={`Get in touch with ${profile.name}. Connect via email, LinkedIn, or GitHub. Open to discussing opportunities and collaboration.`}
        path="/contact"
      />
      <motion.div
      className="min-h-screen bg-background"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      data-testid="contact-page"
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
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6"
              data-testid="button-back-trail"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
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
                <Flag className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">Connect</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to connect? Let's start a conversation 
              about opportunities and how we can work together.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <p className="text-muted-foreground">
              Whether you have a project in mind, want to discuss opportunities, 
              or just want to say hello - I'd love to hear from you.
            </p>
          </motion.div>
          <ContactSection />
        </div>
      </section>
    </motion.div>
    </>
  );
}
