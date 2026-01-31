import {
  Home,
  Briefcase,
  FolderGit2,
  Wrench,
  Heart,
  Mail,
  ExternalLink,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AboutSection,
  ProjectsSection,
  ExperienceSection,
  SkillsSection,
  InterestsSection,
  ContactSection,
} from "@/components/sections";
import { Link } from "wouter";

interface TrailCardProps {
  isOpen: boolean;
  onClose: () => void;
  sectionId: string | null;
  onMarkVisited?: (sectionId: string) => void;
}

const SECTION_CONFIG: Record<
  string,
  {
    title: string;
    description: string;
    icon: typeof Home;
    route: string;
    component: () => JSX.Element;
  }
> = {
  home: {
    title: "About",
    description: "Learn more about Grant Costello",
    icon: Home,
    route: "/about",
    component: AboutSection,
  },
  projects: {
    title: "Projects",
    description: "Technical projects and applications",
    icon: FolderGit2,
    route: "/projects",
    component: ProjectsSection,
  },
  experience: {
    title: "Experience",
    description: "Professional work history",
    icon: Briefcase,
    route: "/experience",
    component: ExperienceSection,
  },
  skills: {
    title: "Skills",
    description: "Technical expertise and tools",
    icon: Wrench,
    route: "/skills",
    component: SkillsSection,
  },
  interests: {
    title: "Interests",
    description: "Passions beyond the code",
    icon: Heart,
    route: "/interests",
    component: InterestsSection,
  },
  contact: {
    title: "Contact",
    description: "Get in touch",
    icon: Mail,
    route: "/contact",
    component: ContactSection,
  },
};

export function TrailCard({ isOpen, onClose, sectionId, onMarkVisited }: TrailCardProps) {
  const config = sectionId ? SECTION_CONFIG[sectionId] : null;

  if (!config) {
    return null;
  }

  const Icon = config.icon;
  const SectionComponent = config.component;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        className="w-full sm:max-w-md md:max-w-lg p-0 flex flex-col"
        data-testid={`sheet-trail-${sectionId}`}
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-xl">{config.title}</SheetTitle>
              <SheetDescription className="text-sm">
                {config.description}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          <SectionComponent />
        </ScrollArea>

        <div className="px-6 py-4 border-t shrink-0">
          <Button
            variant="outline"
            className="w-full"
            asChild
            onClick={() => {
              onMarkVisited?.(sectionId!);
              onClose();
            }}
            data-testid={`button-view-full-${sectionId}`}
          >
            <Link href={config.route}>
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full Page
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
