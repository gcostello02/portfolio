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
      {/* Dome */}
      <path d="M5 10 C5 6 8 3 12 3 C16 3 19 6 19 10" />
      {/* Dome top ornament */}
      <line x1="12" y1="3" x2="12" y2="1" />
      {/* Roof/entablature */}
      <line x1="4" y1="10" x2="20" y2="10" />
      {/* Columns */}
      <line x1="6" y1="10" x2="6" y2="18" />
      <line x1="10" y1="10" x2="10" y2="18" />
      <line x1="14" y1="10" x2="14" y2="18" />
      <line x1="18" y1="10" x2="18" y2="18" />
      {/* Base/steps */}
      <line x1="3" y1="18" x2="21" y2="18" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}
