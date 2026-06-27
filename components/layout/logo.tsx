import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
}

const LEAF = "#6FB23E"; // verde hoja de la marca

/**
 * Logo de Green Gib (wordmark de texto a dos tonos).
 *
 * Para usar el logo oficial: coloca el archivo en
 * `public/images/brand/logo.png` (o .svg) y reemplaza el wordmark por
 * <Image src="/images/brand/logo.png" .../>.
 */
export function Logo({ className, light = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Green Gib — Inicio"
      className={cn("group inline-flex items-center", className)}
    >
      <span className="font-display text-2xl font-semibold leading-none tracking-tight">
        <span className={light ? "text-cream" : "text-green-deep"}>Green </span>
        <span style={{ color: LEAF }}>Gib</span>
      </span>
    </Link>
  );
}
