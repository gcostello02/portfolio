import { useEffect } from "react";
import { motion } from "framer-motion";
import { ContactSection } from "@/components/sections/ContactSection";
import { useTrailProgress } from "@/hooks/use-trail-progress";
import { SEO } from "@/components/SEO";
import { getProfile } from "@/lib/content";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
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
      <section className="container mx-auto px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <ContactSection />
        </div>
      </section>
    </motion.div>
    </>
  );
}
