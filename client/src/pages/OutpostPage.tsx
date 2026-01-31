import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Tent, ExternalLink, Play } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getApps, type App } from "@/lib/content";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const heroVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } },
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.2 + i * 0.1 },
  }),
};

function getIconComponent(iconName: string): React.ComponentType<{ className?: string }> {
  const pascalCase = iconName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  return icons[pascalCase] || LucideIcons.Box;
}

function getModeConfig(mode: App["mode"]) {
  switch (mode) {
    case "internal":
      return { label: "Internal", variant: "default" as const, color: "bg-primary/10 text-primary" };
    case "external":
      return { label: "External", variant: "default" as const, color: "bg-accent/10 text-accent-foreground" };
    case "iframe":
      return { label: "Embedded", variant: "secondary" as const, color: "bg-secondary/10 text-secondary" };
  }
}

function AppCard({ app, index }: { app: App; index: number }) {
  const [, setLocation] = useLocation();
  const IconComponent = getIconComponent(app.icon);
  const modeConfig = getModeConfig(app.mode);

  const handleLaunch = () => {
    if (app.mode === "external" && app.url) {
      window.open(app.url, "_blank", "noopener,noreferrer");
    } else {
      setLocation(`/apps/${app.slug}`);
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      custom={index}
    >
      <Card className="h-full hover-elevate transition-all duration-300" data-testid={`card-app-${app.slug}`}>
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
              <IconComponent className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-lg">{app.name}</CardTitle>
              <CardDescription className="mt-1">{app.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-3">
          <Badge variant={modeConfig.variant} className={modeConfig.color}>
            {modeConfig.label}
          </Badge>
          <Button
            size="sm"
            onClick={handleLaunch}
            data-testid={`button-launch-${app.slug}`}
          >
            {app.mode === "external" ? (
              <>
                <ExternalLink className="h-4 w-4 mr-1.5" />
                Open
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-1.5" />
                Launch
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="p-4 rounded-full bg-muted/50 w-fit mx-auto mb-6">
        <Tent className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Camp is Being Set Up
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        New mini-apps and side projects are in the works. Check back soon for interactive tools and experiments.
      </p>
      <Badge variant="secondary" className="mt-4">
        Coming Soon
      </Badge>
    </motion.div>
  );
}

export default function OutpostPage() {
  const apps = getApps();

  useEffect(() => {
    document.title = "The Outpost - Grant Costello | Blue Ridge Trails";
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-background"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      data-testid="outpost-page"
    >
      <section className="relative py-20 bg-gradient-to-br from-accent/5 via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10">
            <Tent className="h-32 w-32 text-accent" />
          </div>
          <div className="absolute bottom-10 right-10">
            <Tent className="h-24 w-24 text-primary" />
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
              <div className="p-2 rounded-lg bg-accent/10">
                <Tent className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium text-accent-foreground">Trail Shelter</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              The Outpost
            </h1>
            <p className="text-lg text-muted-foreground">
              A waypoint for mini-apps, experiments, and side projects. 
              Stop by and explore what's brewing at camp.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {apps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app, index) => (
              <AppCard key={app.id} app={app} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
    </motion.div>
  );
}
