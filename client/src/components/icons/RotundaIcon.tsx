import { type SVGProps } from "react";

export function RotundaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Dome - more rounded neoclassical shape */}
      <path d="M6 11 Q6 5 12 4 Q18 5 18 11" />
      {/* Cupola/lantern on top */}
      <rect x="10" y="2" width="4" height="2" rx="0.5" />
      {/* Dome base band */}
      <path d="M5.5 11 L18.5 11" />
      {/* Triangular pediment */}
      <path d="M4 14 L12 11 L20 14" />
      {/* Entablature */}
      <line x1="4" y1="14" x2="20" y2="14" />
      {/* Six columns */}
      <line x1="5.5" y1="14" x2="5.5" y2="20" />
      <line x1="8.5" y1="14" x2="8.5" y2="20" />
      <line x1="11" y1="14" x2="11" y2="20" />
      <line x1="13" y1="14" x2="13" y2="20" />
      <line x1="15.5" y1="14" x2="15.5" y2="20" />
      <line x1="18.5" y1="14" x2="18.5" y2="20" />
      {/* Base/stylobate */}
      <line x1="4" y1="20" x2="20" y2="20" />
      {/* Steps */}
      <line x1="3" y1="22" x2="21" y2="22" />
    </svg>
  );
}
