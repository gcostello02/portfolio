import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEducation } from "@/lib/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function EducationSection() {
  const education = getEducation();

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-testid="education-section"
    >
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Degrees</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-foreground" data-testid="text-education-school">
                {education.school}
              </p>
              <p className="text-sm text-muted-foreground">
                {education.location}
              </p>
            </div>
            <div className="space-y-3">
              {education.degrees.map((degree, index) => (
                <div key={index} className="border-l-2 border-primary/30 pl-3">
                  <p className="font-medium text-foreground">
                    {degree.type} in {degree.field}
                  </p>
                  {degree.college && (
                    <p className="text-xs text-muted-foreground">
                      {degree.college}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="default">
                Class of {education.graduationYear}
              </Badge>
              <Badge variant="outline">GPA: {education.gpa}</Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Coursework
        </h3>
        <div className="space-y-4">
          {education.courses.map((course, index) => (
            <motion.div key={course.code} variants={itemVariants}>
              <Card className="hover-elevate" data-testid={`card-course-${index}`}>
                <CardContent className="pt-5 pb-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground leading-tight">
                        {course.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {course.code}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Code className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-medium">Skills learned:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {course.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
