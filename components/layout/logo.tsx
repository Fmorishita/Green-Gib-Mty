import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
}

/** Wordmark de Green Gibb con marca de hoja. */
export function Logo({ className, light = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Green Gibb — Inicio"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
          light ? "bg-cream/15 text-cream" : "bg-green-deep text-cream"
        )}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21c0-6 3-10 8-12-1 6-3 9-8 12Z"
            fill="currentColor"
            opacity="0.9"
          />
          <path
            d="M12 21C7 19 5 13 4 6c6 2 8 7 8 15Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-xl font-semibold leading-none tracking-tight",
          light ? "text-cream" : "text-green-deep"
        )}
      >
        Green Gibb
      </span>
    </Link>
  );
}
