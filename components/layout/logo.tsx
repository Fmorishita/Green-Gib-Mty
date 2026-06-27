import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
}

const LEAF = "#6FB23E"; // verde hoja brillante de la marca

/** Isotipo de Green Gib: skyline (arquitectura) + hojas a dos verdes. */
export function BrandMark({ light = false, className }: { light?: boolean; className?: string }) {
  const dark = light ? "#F6F2E9" : "#1E4D2B";
  const gray = light ? "rgba(246,242,233,0.5)" : "#9AA08F";
  return (
    <svg viewBox="0 0 40 44" className={className} fill="none" role="img" aria-hidden>
      {/* Skyline / arquitectura */}
      <g fill={gray}>
        <rect x="12.6" y="8" width="2.4" height="15" rx="1.2" />
        <rect x="16.9" y="3.5" width="2.6" height="19.5" rx="1.3" />
        <rect x="21.3" y="11" width="2.4" height="12" rx="1.2" />
      </g>
      {/* Hoja oscura (izquierda) */}
      <path d="M19 41C11 34 11 21 18 12c3 6 3 19 1 29Z" fill={dark} />
      {/* Hoja brillante (derecha) */}
      <path d="M19 41c1-11 5-21 11-27 3 10 0 22-11 27Z" fill={LEAF} />
      {/* Vena */}
      <path
        d="M19 41c3-9 7-18 11-25"
        stroke={light ? "#1E4D2B" : "#F6F2E9"}
        strokeOpacity="0.45"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Logo de marca: isotipo + wordmark "Green Gib" a dos tonos. */
export function Logo({ className, light = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Green Gib — Inicio"
      className={cn("group inline-flex items-center gap-2", className)}
    >
      <BrandMark light={light} className="h-9 w-auto" />
      <span className="font-display text-xl font-semibold leading-none tracking-tight">
        <span className={light ? "text-cream" : "text-green-deep"}>Green </span>
        <span style={{ color: LEAF }}>Gib</span>
      </span>
    </Link>
  );
}
