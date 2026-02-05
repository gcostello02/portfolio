import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Construction, AlertTriangle, Loader2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAppBySlug, type App } from "@/lib/content";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

function getIconComponent(iconName: string): React.ComponentType<{ className?: string }> {
  const pascalCase = iconName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  return icons[pascalCase] || LucideIcons.Box;
}

function NotFoundView() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-destructive shrink-0" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Trail Not Found</h1>
              <p className="mt-2 text-muted-foreground">
                This app doesn't exist or may have been moved. Head back to the outpost to find your way.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InternalAppView({ app }: { app: App }) {
  const IconComponent = getIconComponent(app.icon);

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-6">
          <IconComponent className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{app.name}</h2>
        <p className="text-muted-foreground mb-6">{app.description}</p>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Construction className="h-5 w-5" />
          <span>App Coming Soon</span>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          This experience is currently under development. Check back later for updates.
        </p>
      </motion.div>
    </div>
  );
}

function ExternalAppView({ app }: { app: App }) {
  const IconComponent = getIconComponent(app.icon);

  useEffect(() => {
    if (app.url) {
      const timer = setTimeout(() => {
        window.open(app.url!, "_blank", "noopener,noreferrer");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [app.url]);

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        <div className="p-4 rounded-full bg-accent/10 w-fit mx-auto mb-6">
          <IconComponent className="h-12 w-12 text-accent-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{app.name}</h2>
        <p className="text-muted-foreground mb-6">{app.description}</p>
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Redirecting to external site...</span>
        </div>
        {app.url && (
          <Button
            onClick={() => window.open(app.url!, "_blank", "noopener,noreferrer")}
            data-testid="button-open-external"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Now
          </Button>
        )}
      </motion.div>
    </div>
  );
}

function IframeAppView({ app }: { app: App }) {
  const [isLoading, setIsLoading] = useState(true);

  if (!app.url) {
    return <InternalAppView app={app} />;
  }

  return (
    <div className="flex-1 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading {app.name}...</p>
          </div>
        </div>
      )}
      <iframe
        src={app.url}
        className="w-full h-full border-0"
        title={app.name}
        onLoad={() => setIsLoading(false)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        data-testid="iframe-app"
      />
    </div>
  );
}

export default function AppRunner() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const app = slug ? getAppBySlug(slug) : undefined;

  useEffect(() => {
    if (app) {
      document.title = `${app.name} - The Outpost | Blue Ridge Trails`;
    } else {
      document.title = "App Not Found - The Outpost | Blue Ridge Trails";
    }
  }, [app]);

  if (!app) {
    return <NotFoundView />;
  }

  return (
    <motion.div
      className="min-h-screen bg-background flex flex-col"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      data-testid="app-runner-page"
    >
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="font-semibold text-foreground truncate hidden sm:block">
              {app.name}
            </h1>
          </div>
        </div>
      </header>

      {app.mode === "internal" && <InternalAppView app={app} />}
      {app.mode === "external" && <ExternalAppView app={app} />}
      {app.mode === "iframe" && <IframeAppView app={app} />}
    </motion.div>
  );
}
