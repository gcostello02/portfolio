import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Calendar, Image as ImageIcon, Play, ArrowLeft, ArrowRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ImageLightbox } from "@/components/ImageLightbox";
import { getProjects, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

function ProjectCard({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const media = project.media || [];
  const imageIndex = media.findIndex((m) => m.type === "image");
  const videoIndex = media.findIndex((m) => m.type === "video" || m.type === "youtube");
  const hasImage = imageIndex >= 0;
  const hasVideo = videoIndex >= 0;
  const hasCode = Boolean(project.githubUrl?.trim());
  const hasLiveSite = Boolean(project.demoUrl?.trim());

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const actionButtons = [
    {
      id: "image",
      label: "Image",
      icon: ImageIcon,
      disabled: !hasImage,
      onClick: () => hasImage && openLightbox(imageIndex),
      "data-testid": `button-project-image-${project.id}`,
    },
    {
      id: "video",
      label: "Video",
      icon: Play,
      disabled: !hasVideo,
      onClick: () => hasVideo && openLightbox(videoIndex),
      "data-testid": `button-project-video-${project.id}`,
    },
    {
      id: "code",
      label: "Code",
      icon: SiGithub,
      disabled: !hasCode,
      href: project.githubUrl?.trim() || undefined,
      "data-testid": `link-project-github-${project.id}`,
    },
    {
      id: "live",
      label: "Live site",
      icon: ExternalLink,
      disabled: !hasLiveSite,
      href: project.demoUrl?.trim() || undefined,
      "data-testid": `link-project-demo-${project.id}`,
    },
  ];

  return (
    <>
      <Card
        className="hover-elevate h-full flex flex-col overflow-hidden"
        data-testid={`card-project-${project.id}`}
      >
        <CardHeader className="pb-4 pt-6 px-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold leading-tight tracking-tight">
                {project.title}
              </CardTitle>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span>{project.dates}</span>
              </div>
            </div>
            {project.featured && (
              <Badge variant="default" className="shrink-0">
                Featured
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-5 px-6 pb-4 pt-0">
          {(project.description || (project.longDescription?.length ?? 0) > 0) && (
            <div className="space-y-2">
              {project.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              )}
              {project.longDescription?.length > 0 && (
                <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-4 leading-relaxed">
                  {project.longDescription.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {project.technologies.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-foreground/80 uppercase tracking-wide">
                Technologies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs font-normal">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 gap-2 mt-auto">
            {actionButtons.map((btn) => {
              const Icon = btn.icon;
              const content = (
                <>
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate text-xs font-medium">{btn.label}</span>
                </>
              );
              if (btn.href) {
                return (
                  <Button
                    key={btn.id}
                    variant="outline"
                    size="sm"
                    className="h-9 min-w-0 flex items-center justify-center gap-1.5 px-2"
                    asChild
                  >
                    <a
                      href={btn.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={btn["data-testid"]}
                    >
                      {content}
                    </a>
                  </Button>
                );
              }
              return (
                <Button
                  key={btn.id}
                  variant="outline"
                  size="sm"
                  className="h-9 min-w-0 flex items-center justify-center gap-1.5 px-2"
                  disabled={btn.disabled}
                  onClick={btn.onClick}
                  data-testid={btn["data-testid"]}
                >
                  {content}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {media.length > 0 && (
        <ImageLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          media={media}
          currentIndex={lightboxIndex}
          onIndexChange={setLightboxIndex}
        />
      )}
    </>
  );
}

type ProjectsSectionProps = {
  variant?: "grid" | "carousel";
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

export function ProjectsSection({
  variant = "grid",
  autoPlay = false,
  autoPlayInterval = 6000,
}: ProjectsSectionProps = {}) {
  const projects = getProjects();
  const prefersReducedMotion = useReducedMotion();
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPaused = isHovered || isFocused;

  const autoPlayEnabled =
    variant === "carousel" &&
    autoPlay &&
    !prefersReducedMotion &&
    projects.length > 1;

  useEffect(() => {
    if (!carouselApi) return;
    setSelectedIndex(carouselApi.selectedScrollSnap());
    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
    const onSelect = () => {
      setSelectedIndex(carouselApi.selectedScrollSnap());
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!autoPlayEnabled || !carouselApi || autoPlayInterval <= 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (isPaused) return;
      carouselApi.scrollNext();
    }, autoPlayInterval);

    return () => window.clearInterval(intervalId);
  }, [autoPlayEnabled, autoPlayInterval, carouselApi, isPaused]);

  const handleBlurCapture = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (nextTarget && event.currentTarget.contains(nextTarget)) {
      return;
    }
    setIsFocused(false);
  };

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-testid="projects-section"
    >
      {variant === "carousel" ? (
        <div className="relative w-full">
          <Carousel
            className="relative w-full"
            opts={{ align: "start", loop: projects.length > 1 }}
            setApi={(api) => setCarouselApi(api ?? null)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocusCapture={() => setIsFocused(true)}
            onBlurCapture={handleBlurCapture}
            data-testid="projects-carousel"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {projects.map((project) => (
                <CarouselItem key={project.id} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/2">
                  <motion.div variants={cardVariants} className="h-full">
                    <ProjectCard project={project} />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {projects.length > 1 && (
            <>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Previous project"
                disabled={!canScrollPrev}
                onClick={() => carouselApi?.scrollPrev()}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border-2 border-border bg-background/95 shadow-lg hover:bg-muted/80 disabled:opacity-40"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Next project"
                disabled={!canScrollNext}
                onClick={() => carouselApi?.scrollNext()}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border-2 border-border bg-background/95 shadow-lg hover:bg-muted/80 disabled:opacity-40"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
              <div className="flex justify-center gap-2 mt-6">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => carouselApi?.scrollTo(index)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-200",
                      index === selectedIndex
                        ? "w-6 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants} className="h-full">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
