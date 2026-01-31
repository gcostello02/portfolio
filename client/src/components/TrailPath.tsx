import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTheme } from "./ThemeProvider";

interface TrailPoint {
  x: number;
  y: number;
}

const TRAIL_POINTS: TrailPoint[] = [
  { x: 15, y: 75 },
  { x: 25, y: 55 },
  { x: 50, y: 45 },
  { x: 65, y: 55 },
  { x: 75, y: 40 },
  { x: 85, y: 25 },
];

function generateSmoothPath(points: TrailPoint[]): string {
  if (points.length < 2) return "";
  
  let path = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const prev = points[i - 1] || current;
    const afterNext = points[i + 2] || next;
    
    const cp1x = current.x + (next.x - prev.x) * 0.2;
    const cp1y = current.y + (next.y - prev.y) * 0.2;
    const cp2x = next.x - (afterNext.x - current.x) * 0.2;
    const cp2y = next.y - (afterNext.y - current.y) * 0.2;
    
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }
  
  return path;
}

export function TrailPath() {
  const { prefersReducedMotion } = useTheme();
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const controls = useAnimation();
  
  const trailPath = generateSmoothPath(TRAIL_POINTS);
  
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, []);
  
  useEffect(() => {
    if (pathLength > 0 && !prefersReducedMotion) {
      controls.start({
        strokeDashoffset: 0,
        transition: {
          duration: 2.5,
          ease: "easeInOut",
          delay: 0.5,
        },
      });
    }
  }, [pathLength, controls, prefersReducedMotion]);
  
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ minHeight: "100vh" }}
      data-testid="trail-path"
    >
      <defs>
        <filter id="trailGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feFlood floodColor="hsl(var(--primary))" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <linearGradient id="trailGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--secondary))" />
          <stop offset="50%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
      
      <path
        d={trailPath}
        fill="none"
        stroke="hsl(var(--muted-foreground) / 0.15)"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 2"
      />
      
      <motion.path
        ref={pathRef}
        d={trailPath}
        fill="none"
        stroke="url(#trailGradient)"
        strokeWidth="0.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#trailGlow)"
        initial={
          prefersReducedMotion
            ? { strokeDashoffset: 0 }
            : { strokeDashoffset: pathLength }
        }
        animate={prefersReducedMotion ? {} : controls}
        style={{
          strokeDasharray: pathLength,
        }}
      />
      
      {!prefersReducedMotion && pathLength > 0 && (
        <motion.circle
          r="0.6"
          fill="hsl(var(--primary))"
          filter="url(#trailGlow)"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            offsetDistance: ["0%", "100%"],
          }}
          transition={{
            duration: 2.5,
            delay: 0.5,
            ease: "easeInOut",
            times: [0, 0.05, 0.95, 1],
          }}
          style={{
            offsetPath: `path("${trailPath}")`,
          }}
        />
      )}
    </svg>
  );
}

export { TRAIL_POINTS };
