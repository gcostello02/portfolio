import { motion } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Download,
  ExternalLink,
} from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProfile } from "@/lib/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function AboutSection() {
  const profile = getProfile();

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-testid="about-section"
    >
      <motion.div
        className="flex flex-col items-center text-center"
        variants={itemVariants}
      >
        <Avatar className="h-24 w-24 mb-4 bg-primary">
          <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
            GC
          </AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold text-foreground" data-testid="text-profile-name">
          {profile.name}
        </h2>
        <p className="text-muted-foreground mt-1" data-testid="text-profile-title">
          {profile.title}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {profile.tagline}
        </p>
        <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{profile.location}</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-profile-summary">
              {profile.summary.split("\n")[0]}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Education</h3>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-foreground" data-testid="text-education-school">
                {profile.education.school}
              </p>
              <p className="text-sm text-muted-foreground">
                {profile.education.location}
              </p>
              <div className="space-y-1">
                {profile.education.degrees.map((degree, index) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    {degree.type} in {degree.field}
                    {degree.college && (
                      <span className="block text-xs opacity-75">
                        {degree.college}
                      </span>
                    )}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary">
                  Class of {profile.education.graduationYear}
                </Badge>
                <Badge variant="outline">GPA: {profile.education.gpa}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div className="space-y-3" variants={itemVariants}>
        <h3 className="font-semibold text-foreground">Connect</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            data-testid="link-github-personal"
          >
            <a
              href={`https://github.com/${profile.github.personal}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub className="h-4 w-4 mr-2" />
              Personal GitHub
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            data-testid="link-github-work"
          >
            <a
              href={`https://github.com/${profile.github.work}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub className="h-4 w-4 mr-2" />
              Work GitHub
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            data-testid="link-linkedin"
          >
            <a
              href={`https://${profile.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiLinkedin className="h-4 w-4 mr-2" />
              LinkedIn
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </Button>
        </div>
        <Button className="w-full mt-2" asChild data-testid="button-download-resume">
          <a href="/resume.pdf" download>
            <Download className="h-4 w-4 mr-2" />
            Download Resume
          </a>
        </Button>
      </motion.div>
    </motion.div>
  );
}
