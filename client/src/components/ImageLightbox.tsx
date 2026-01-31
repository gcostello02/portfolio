import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type ProjectMedia } from "@/lib/content";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  media: ProjectMedia[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export function ImageLightbox({
  isOpen,
  onClose,
  media,
  currentIndex,
  onIndexChange,
}: ImageLightboxProps) {
  const handlePrevious = useCallback(() => {
    onIndexChange(currentIndex > 0 ? currentIndex - 1 : media.length - 1);
  }, [currentIndex, media.length, onIndexChange]);

  const handleNext = useCallback(() => {
    onIndexChange(currentIndex < media.length - 1 ? currentIndex + 1 : 0);
  }, [currentIndex, media.length, onIndexChange]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
      }
    },
    [isOpen, onClose, handlePrevious, handleNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const currentMedia = media[currentIndex];

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  const renderMedia = () => {
    if (!currentMedia) return null;

    switch (currentMedia.type) {
      case "video":
        return (
          <video
            src={currentMedia.url}
            controls
            autoPlay
            className="max-w-full max-h-[85vh] rounded-lg"
            data-testid="video-lightbox-player"
          />
        );
      case "youtube":
        return (
          <iframe
            src={getYouTubeEmbedUrl(currentMedia.url)}
            className="w-[80vw] h-[45vw] max-w-[1200px] max-h-[675px] rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            data-testid="youtube-lightbox-player"
          />
        );
      case "iframe":
        return (
          <iframe
            src={currentMedia.url}
            className="w-[90vw] h-[80vh] max-w-[1400px] rounded-lg bg-white"
            data-testid="iframe-lightbox-player"
          />
        );
      case "image":
      default:
        return (
          <img
            src={currentMedia.url}
            alt={currentMedia.caption || `Media ${currentIndex + 1}`}
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
            data-testid="image-lightbox-display"
          />
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          data-testid="image-lightbox"
        >
          <motion.div
            className="absolute inset-0 bg-black/90"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            onClick={onClose}
            data-testid="button-lightbox-close"
          >
            <X className="h-6 w-6" />
          </Button>

          {media.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 z-10 text-white hover:bg-white/20"
                onClick={handlePrevious}
                data-testid="button-lightbox-previous"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 z-10 text-white hover:bg-white/20"
                onClick={handleNext}
                data-testid="button-lightbox-next"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}

          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderMedia()}
            {currentMedia?.caption && (
              <p className="mt-3 text-white/80 text-sm text-center max-w-lg">
                {currentMedia.caption}
              </p>
            )}
          </motion.div>

          {media.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {media.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-white"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  onClick={() => onIndexChange(index)}
                  data-testid={`button-lightbox-dot-${index}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
