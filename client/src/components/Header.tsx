import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Menu,
  Github,
  FileText,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import { CommandPalette, CommandPaletteTrigger } from "./CommandPalette";
import { TrailProgress } from "./TrailProgress";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Education", path: "/education" },
  { label: "Experience", path: "/experience" },
  { label: "Projects", path: "/projects" },
  { label: "Skills", path: "/skills" },
  { label: "Interests", path: "/interests" },
  { label: "Contact", path: "/contact" },
];

const GITHUB_ACCOUNTS = [
  {
    id: "personal",
    label: "Personal",
    username: "gcostello02",
    url: "https://github.com/gcostello02",
  },
  {
    id: "work",
    label: "Work (TruePath)",
    username: "gcostello02-tpv",
    url: "https://github.com/gcostello02-tpv",
  },
];

export function Header() {
  const [location] = useLocation();
  const { prefersReducedMotion } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? {} : { y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md"
        data-testid="header"
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-lg hover-elevate rounded-md px-2 py-1 -ml-2"
              data-testid="link-logo"
            >
              <img
                src="/rotunda.png"
                alt="Grant Costello logo"
                className="h-6 w-6"
              />
              <span>Grant Costello</span>
            </Link>

            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => {
                const isActive = location === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground"
                    }`}
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <CommandPaletteTrigger onClick={() => setCommandOpen(true)} />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden sm:flex items-center gap-1"
                    data-testid="button-github-dropdown"
                  >
                    <Github className="h-4 w-4" />
                    <span className="hidden md:inline">GitHub</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>GitHub Accounts</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {GITHUB_ACCOUNTS.map((account) => (
                    <DropdownMenuItem
                      key={account.id}
                      asChild
                      data-testid={`menu-item-github-${account.id}`}
                    >
                      <a
                        href={account.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span>{account.label}</span>
                          <span className="text-xs text-muted-foreground">
                            @{account.username}
                          </span>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="outline"
                size="sm"
                asChild
                className="hidden sm:flex"
                data-testid="button-resume"
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4 mr-1.5" />
                  Resume
                </a>
              </Button>

              <ThemeToggle />

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    data-testid="button-mobile-menu"
                    aria-label="Open navigation menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <img
                        src="/rotunda.png"
                        alt="Grant Costello logo"
                        className="h-5 w-5"
                      />
                      Navigation
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="mt-6 flex flex-col gap-2" aria-label="Mobile navigation">
                    {NAV_LINKS.map((link) => {
                      const isActive = location === link.path;
                      return (
                        <Link
                          key={link.path}
                          href={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`px-4 py-3 text-sm font-medium rounded-md transition-colors hover-elevate ${
                            isActive
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground"
                          }`}
                          data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}

                    <div className="my-4 border-t" />

                    <div className="px-4 py-2">
                      <p className="text-xs font-medium text-muted-foreground mb-3">
                        GitHub
                      </p>
                      {GITHUB_ACCOUNTS.map((account) => (
                        <a
                          key={account.id}
                          href={account.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-2 py-2 text-sm rounded-md hover-elevate"
                          data-testid={`link-mobile-github-${account.id}`}
                        >
                          <div className="flex items-center gap-2">
                            <Github className="h-4 w-4" />
                            <span>{account.label}</span>
                          </div>
                          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                        </a>
                      ))}
                    </div>

                    <div className="my-2 border-t" />

                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-md hover-elevate"
                      data-testid="link-mobile-resume"
                    >
                      <FileText className="h-4 w-4" />
                      View Resume
                    </a>

                    <div className="my-4 border-t" />

                    <div className="px-4">
                      <TrailProgress />
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
