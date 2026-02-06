import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, Image as ImageIcon, Play, Globe } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/ImageLightbox";
import { getProjects, type Project, type ProjectMedia } from "@/lib/content";

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

function MediaThumbnail({ media, onClick }: { media: ProjectMedia; onClick: () => void }) {
  const getThumbnailUrl = () => {
    if (media.thumbnail) return media.thumbnail;
    if (media.type === "image") return media.url;
    if (media.type === "youtube") {
      const videoId = media.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/)?.[1];
      return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
    }
    return null;
  };

  const thumbnailUrl = getThumbnailUrl();

  const getIcon = () => {
    switch (media.type) {
      case "video":
      case "youtube":
        return <Play className="h-5 w-5 text-white drop-shadow-md" />;
      case "iframe":
        return <Globe className="h-5 w-5 text-white drop-shadow-md" />;
      default:
        return null;
    }
  };

  return (
    <button
      className="shrink-0 w-20 h-20 rounded-md overflow-hidden bg-muted hover-elevate relative"
      onClick={onClick}
    >
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          {getIcon() || <ImageIcon className="h-5 w-5 text-muted-foreground" />}
        </div>
      )}
      {media.type !== "image" && thumbnailUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          {getIcon()}
        </div>
      )}
    </button>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const media = project.media || [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Card className="hover-elevate" data-testid={`card-project-${project.id}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg leading-tight">
                {project.title}
              </CardTitle>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
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
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{project.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          {media.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {media.slice(0, 4).map((item, index) => (
                <MediaThumbnail
                  key={index}
                  media={item}
                  onClick={() => openLightbox(index)}
                />
              ))}
              {media.length > 4 && (
                <button
                  className="shrink-0 w-20 h-20 rounded-md bg-muted flex items-center justify-center text-sm text-muted-foreground hover-elevate"
                  onClick={() => openLightbox(4)}
                  data-testid={`button-project-media-more-${project.id}`}
                >
                  <ImageIcon className="h-4 w-4 mr-1" />+{media.length - 4}
                </button>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-project-github-${project.id}`}
                >
                  <SiGithub className="h-4 w-4 mr-1" />
                  Code
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button variant="default" size="sm" asChild>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-project-demo-${project.id}`}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Take a look
                </a>
              </Button>
            )}
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

export function ProjectsSection() {
  const projects = getProjects();

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-testid="projects-section"
    >
      <motion.div variants={cardVariants}>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Projects
        </h3>
        <p className="text-sm text-muted-foreground">
          Technical projects and applications
        </p>
      </motion.div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <motion.div key={project.id} variants={cardVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
