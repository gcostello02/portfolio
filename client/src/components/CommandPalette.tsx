import { useEffect, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Briefcase,
  FolderGit2,
  Wrench,
  Heart,
  Mail,
  Search,
  FileText,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useTheme } from "./ThemeProvider";
import { getExperience, getProjects, getSkills } from "@/lib/content";

const NAVIGATION_ITEMS = [
  { id: "home", label: "Home", path: "/", icon: Home },
  { id: "experience", label: "Experience", path: "/experience", icon: Briefcase },
  { id: "projects", label: "Projects", path: "/projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", path: "/skills", icon: Wrench },
  { id: "interests", label: "Interests", path: "/interests", icon: Heart },
  { id: "contact", label: "Contact", path: "/contact", icon: Mail },
];

interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandPalette({ open: controlledOpen, onOpenChange }: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { prefersReducedMotion } = useTheme();

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const handleSelect = useCallback(
    (path: string) => {
      setOpen(false);
      setLocation(path);
    },
    [setOpen, setLocation]
  );

  const experience = getExperience();
  const projects = getProjects();
  const skills = getSkills();

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, projects, experience..." data-testid="input-command-search" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {NAVIGATION_ITEMS.map((item) => (
            <CommandItem
              key={item.id}
              value={`nav-${item.label}`}
              onSelect={() => handleSelect(item.path)}
              data-testid={`command-item-nav-${item.id}`}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Experience">
          {experience.map((exp) => (
            <CommandItem
              key={exp.id}
              value={`exp-${exp.company}-${exp.role}`}
              onSelect={() => handleSelect(`/experience#${exp.id}`)}
              data-testid={`command-item-exp-${exp.id}`}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span>{exp.role}</span>
                <span className="text-xs text-muted-foreground">{exp.company}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {projects.map((project) => (
            <CommandItem
              key={project.id}
              value={`proj-${project.title}`}
              onSelect={() => handleSelect(`/projects#${project.id}`)}
              data-testid={`command-item-proj-${project.id}`}
            >
              <FolderGit2 className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span>{project.title}</span>
                <span className="text-xs text-muted-foreground">
                  {project.technologies.slice(0, 3).join(", ")}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Skills">
          {skills.categories.map((category) => (
            <CommandItem
              key={category.name}
              value={`skill-${category.name}`}
              onSelect={() => handleSelect(`/skills#${category.name.toLowerCase().replace(/\s+/g, "-")}`)}
              data-testid={`command-item-skill-${category.name}`}
            >
              <Wrench className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span>{category.name}</span>
                <span className="text-xs text-muted-foreground">
                  {category.skills.slice(0, 4).map((s) => s.name).join(", ")}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          <CommandItem
            value="resume"
            onSelect={() => {
              setOpen(false);
              window.open("/resume.pdf", "_blank");
            }}
            data-testid="command-item-resume"
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>View Resume</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function CommandPaletteTrigger({ onClick }: { onClick: () => void }) {
  const isMac = typeof navigator !== "undefined" && navigator.platform.toUpperCase().indexOf("MAC") >= 0;

  return (
    <button
      onClick={onClick}
      className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground border rounded-md hover-elevate transition-colors"
      data-testid="button-command-trigger"
      aria-label="Open command palette"
    >
      <Search className="h-3.5 w-3.5" />
      <span>Search...</span>
      <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
        {isMac ? "⌘" : "Ctrl"}K
      </kbd>
    </button>
  );
}
