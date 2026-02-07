import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  Server,
  Sparkles,
  Braces,
  FileCode,
  Cloud,
  Container,
  GitBranch,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSkills, type Skill } from "@/lib/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const skillIconMap: Record<string, typeof Code2> = {
  java: Code2,
  python: FileCode,
  html: Globe,
  css: Braces,
  javascript: Sparkles,
  react: Code2,
  angular: Code2,
  django: Server,
  json: Braces,
  csharp: Code2,
  database: Database,
  sql: Database,
  globe: Globe,
  git: GitBranch,
  php: FileCode,
  c: Code2,
  nodejs: Server,
  express: Server,
  mongodb: Database,
  postgresql: Database,
  azure: Cloud,
  api: Server,
  powerbi: BarChart3,
  dotnet: Code2,
  docker: Container,
};

function SkillIcon({ icon, className }: { icon: string; className?: string }) {
  const IconComponent = skillIconMap[icon.toLowerCase()] || Code2;
  return <IconComponent className={className} />;
}

function SkillBadge({
  skill,
  variant,
}: {
  skill: Skill;
  variant: "default" | "outline";
}) {
  return (
    <Badge
      variant={variant}
      className="flex items-center gap-1.5 px-3 py-1"
      data-testid={`badge-skill-${skill.name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <SkillIcon icon={skill.icon} className="h-3.5 w-3.5" />
      {skill.name}
    </Badge>
  );
}

export function SkillsSection() {
  const skills = getSkills();

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-testid="skills-section"
    >

      {skills.categories.map((category) => (
        <motion.div key={category.name} variants={itemVariants}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                {category.name === "Proficient" ? (
                  <Sparkles className="h-4 w-4 text-primary" />
                ) : (
                  <Code2 className="h-4 w-4 text-muted-foreground" />
                )}
                {category.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                {category.description}
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    skill={skill}
                    variant={category.name === "Proficient" ? "default" : "outline"}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {skills.highlights.map((highlight) => (
                <Badge
                  key={highlight}
                  variant="secondary"
                  data-testid={`badge-highlight-${highlight.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {highlight}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
