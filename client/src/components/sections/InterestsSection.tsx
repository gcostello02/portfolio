import { motion } from "framer-motion";
import {
  Heart,
  Users,
  TrendingUp,
  Dribbble,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getInterests, type Interest, type InterestHighlight } from "@/lib/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const interestIconMap: Record<string, typeof Heart> = {
  basketball: Dribbble,
  "trending-up": TrendingUp,
  users: Users,
  heart: Heart,
};

function InterestIcon({ icon, className }: { icon: string; className?: string }) {
  const IconComponent = interestIconMap[icon.toLowerCase()] || Heart;
  return <IconComponent className={className} />;
}

function HighlightCard({ highlight }: { highlight: InterestHighlight }) {
  return (
    <div className="border-l-2 border-primary/30 pl-3 py-1">
      <div className="flex items-start justify-between gap-2">
        <h5 className="text-sm font-medium text-foreground">
          {highlight.title}
        </h5>
        <Badge variant="outline" className="shrink-0 text-xs">
          <Calendar className="h-3 w-3 mr-1" />
          {highlight.dates}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        {highlight.description}
      </p>
    </div>
  );
}

function InterestCard({ interest }: { interest: Interest }) {
  const isBasketball = interest.id === "basketball";

  return (
    <Card
      className={isBasketball ? "border-primary/30" : ""}
      data-testid={`card-interest-${interest.id}`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <div
            className={`p-1.5 rounded-md ${
              isBasketball
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <InterestIcon icon={interest.icon} className="h-4 w-4" />
          </div>
          {interest.title}
          {isBasketball && (
            <Badge variant="default" className="ml-auto">
              Featured
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{interest.description}</p>

        {interest.highlights.length > 0 && (
          <div className="space-y-3">
            {interest.highlights.map((highlight, index) => (
              <HighlightCard key={index} highlight={highlight} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function InterestsSection() {
  const interests = getInterests();
  const sortedInterests = [...interests.interests].sort((a, b) => {
    if (a.id === "basketball") return -1;
    if (b.id === "basketball") return 1;
    if (a.id === "teaching") return -1;
    if (b.id === "teaching") return 1;
    return 0;
  });

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-testid="interests-section"
    >

      <div className="grid gap-4">
        {sortedInterests.map((interest) => (
          <motion.div key={interest.id} variants={cardVariants}>
            <InterestCard interest={interest} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
