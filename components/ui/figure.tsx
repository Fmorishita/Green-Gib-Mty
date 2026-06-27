import Image from "next/image";
import { cn } from "@/lib/utils";
import { isRealImage, placeholderDataUri, resolveImageSrc } from "@/lib/placeholder";

type Variant = "green" | "olive" | "sand" | "terracotta" | "stone" | "cream";

interface FigureProps {
  /** URL real (/images/..., http/https) o label de placeholder de marca. */
  src: string;
  alt: string;
  variant?: Variant;
  priority?: boolean;
  sizes?: string;
  /** Clases del contenedor (define aspect ratio, radio, tamaño). */
  className?: string;
  /** Clases de la imagen. */
  imgClassName?: string;
}

/**
 * Imagen unificada del sitio.
 * - Si `src` tiene una fotografía asignada en `lib/placeholder.ts`, usa esa imagen con next/image.
 * - Si `src` es una URL real, usa next/image.
 * - Si `src` sigue siendo un label sin asset, genera un placeholder SVG de marca como fallback.
 */
export function Figure({
  src,
  alt,
  variant,
  priority,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className,
  imgClassName,
}: FigureProps) {
  const resolvedSrc = resolveImageSrc(src);
  const realImage = isRealImage(src);

  return (
    <div className={cn("relative overflow-hidden bg-cream-dark", className)}>
      {realImage ? (
        <Image
          src={resolvedSrc}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imgClassName)}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={placeholderDataUri({ label: src, variant })}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
        />
      )}
    </div>
  );
}
