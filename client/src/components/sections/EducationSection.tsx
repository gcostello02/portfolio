import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Code, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEducation, type Degree } from "@/lib/content";

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

function DegreeColumn({ degree, index }: { degree: Degree; index: number }) {
  return (
    <motion.div variants={itemVariants} className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">{degree.field}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm font-medium text-foreground">{degree.type}</p>
          {degree.college && (
            <p className="text-xs text-muted-foreground mt-1">{degree.college}</p>
          )}
        </CardContent>
      </Card>

      {degree.courses.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            Coursework
          </h4>
          <div className="space-y-3">
            {degree.courses.map((course) => (
              <Card key={course.code} className="hover-elevate" data-testid={`card-course-${course.code}`}>
                <CardContent className="py-3 px-4">
                  <h5 className="font-medium text-sm text-foreground leading-tight">
                    {course.name}
                  </h5>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-2">
                    {course.code}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-1 mb-1.5">
                    <Code className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Skills:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {course.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs py-0">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {degree.courses.length === 0 && (
        <p className="text-sm text-muted-foreground italic">
          Coursework coming soon...
        </p>
      )}
    </motion.div>
  );
}

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
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="py-5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-lg text-foreground" data-testid="text-education-school">
                    {education.school}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{education.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">
                  Class of {education.graduationYear}
                </Badge>
                <Badge variant="outline">GPA: {education.gpa}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.degrees.map((degree, index) => (
          <DegreeColumn key={degree.field} degree={degree} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
