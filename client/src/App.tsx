import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { TrailProgress } from "@/components/TrailProgress";
import { InfoPackTrigger } from "@/components/InfoPackTrigger";
import Home from "@/pages/Home";
import ProjectsPage from "@/pages/ProjectsPage";
import ExperiencePage from "@/pages/ExperiencePage";
import SkillsPage from "@/pages/SkillsPage";
import InterestsPage from "@/pages/InterestsPage";
import ContactPage from "@/pages/ContactPage";
import EducationPage from "@/pages/EducationPage";
import OutpostPage from "@/pages/OutpostPage";
import AppRunner from "@/pages/AppRunner";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/experience" component={ExperiencePage} />
      <Route path="/skills" component={SkillsPage} />
      <Route path="/interests" component={InterestsPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/education" component={EducationPage} />
      <Route path="/outpost" component={OutpostPage} />
      <Route path="/apps/:slug" component={AppRunner} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-16">
              <Router />
            </main>
            <div className="fixed top-20 right-4 z-50">
              <div className="bg-card/90 backdrop-blur-md border border-border/50 rounded-lg p-3 shadow-lg">
                <TrailProgress />
              </div>
            </div>
            <InfoPackTrigger />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
