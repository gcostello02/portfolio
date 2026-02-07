import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getExperience, type Experience } from "@/lib/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

function ExperienceCard({ experience, isLast }: { experience: Experience; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const companyInitials = experience.company
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative flex gap-4" data-testid={`card-experience-${experience.id}`}>
      <div className="flex flex-col items-center">
        <Avatar className="h-10 w-10 bg-primary shrink-0">
          <AvatarFallback className="text-xs font-medium bg-primary text-primary-foreground">
            {companyInitials}
          </AvatarFallback>
        </Avatar>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-border mt-2" />
        )}
      </div>

      <Card className="flex-1 mb-4">
        <CardContent className="pt-4 pb-4">
          <div className="space-y-2">
            <div>
              <h4 className="font-semibold text-foreground">{experience.role}</h4>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                <span>{experience.company}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{experience.dates}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{experience.location}</span>
              </div>
            </div>

            {experience.description.length > 0 && (
              <>
                <div
                  className={`space-y-1.5 overflow-hidden transition-all duration-300 ${
                    expanded ? "max-h-96" : "max-h-12"
                  }`}
                >
                  {experience.description.map((item, index) => (
                    <p
                      key={index}
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      • {item}
                    </p>
                  ))}
                </div>
                {experience.description.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-1"
                    onClick={() => setExpanded(!expanded)}
                    data-testid={`button-experience-expand-${experience.id}`}
                  >
                    {expanded ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Show more
                      </>
                    )}
                  </Button>
                )}
              </>
            )}

            {experience.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-2">
                {experience.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ExperienceSection() {
  const experience = getExperience();

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-testid="experience-section"
    >
      
      <div className="pt-2">
        {experience.map((exp, index) => (
          <motion.div key={exp.id} variants={itemVariants}>
            <ExperienceCard
              experience={exp}
              isLast={index === experience.length - 1}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
