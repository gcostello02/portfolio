import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export function TopoBackground() {
  const { prefersReducedMotion } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 50, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  const backgroundX = useTransform(springX, [0, 1], [-20, 20]);
  const backgroundY = useTransform(springY, [0, 1], [-20, 20]);
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    }
  };
  
  const generateTopoLines = () => {
    const lines = [];
    const lineCount = 12;
    
    for (let i = 0; i < lineCount; i++) {
      const yBase = 15 + (i * 7);
      const amplitude = 8 + Math.sin(i * 0.5) * 4;
      const frequency = 0.8 + (i % 3) * 0.2;
      const phase = i * 30;
      
      let pathD = `M -5 ${yBase}`;
      
      for (let x = 0; x <= 110; x += 5) {
        const wave1 = Math.sin((x + phase) * frequency * 0.02) * amplitude;
        const wave2 = Math.sin((x + phase * 1.5) * frequency * 0.035) * (amplitude * 0.5);
        const y = yBase + wave1 + wave2;
        pathD += ` L ${x} ${y}`;
      }
      
      lines.push(
        <path
          key={`topo-${i}`}
          d={pathD}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.3}
          className="text-muted-foreground/20 dark:text-muted-foreground/15"
          strokeLinecap="round"
        />
      );
    }
    
    return lines;
  };
  
  const mountainSilhouette = `
    M 0 100 
    L 0 85
    Q 5 82, 10 78
    L 18 70
    Q 22 68, 25 72
    L 30 68
    Q 33 65, 38 67
    L 45 55
    Q 50 48, 55 52
    L 60 45
    Q 65 40, 70 44
    L 78 35
    Q 82 30, 88 36
    L 95 30
    Q 100 25, 105 32
    L 110 100
    Z
  `;
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      data-testid="topo-background"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30 dark:to-muted/20" />
      
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={
          prefersReducedMotion 
            ? {} 
            : { x: backgroundX, y: backgroundY }
        }
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
          style={{ minHeight: "100vh" }}
        >
          <defs>
            <linearGradient id="topoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.03" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
            </linearGradient>
            
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          <rect width="100" height="100" fill="url(#topoGradient)" />
          
          <g className="opacity-60 dark:opacity-40">
            {generateTopoLines()}
          </g>
        </svg>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMax slice"
          className="absolute bottom-0 w-full h-full"
        >
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          <path
            d={mountainSilhouette}
            fill="url(#mountainGradient)"
            className="dark:opacity-60"
          />
          
          <path
            d={`
              M 0 100
              L 0 90
              Q 8 87, 15 82
              L 25 75
              Q 30 72, 35 76
              L 42 70
              Q 48 65, 55 68
              L 65 58
              Q 72 52, 80 56
              L 90 48
              Q 95 45, 100 50
              L 100 100
              Z
            `}
            fill="hsl(var(--muted))"
            className="opacity-50 dark:opacity-30"
          />
        </svg>
      </div>
      
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, hsl(var(--primary) / 0.08) 0%, transparent 50%),
                         radial-gradient(ellipse at 70% 60%, hsl(var(--secondary) / 0.06) 0%, transparent 40%),
                         radial-gradient(ellipse at 90% 80%, hsl(var(--accent) / 0.05) 0%, transparent 35%)`
          }}
        />
      </motion.div>
    </div>
  );
}
