"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Figure } from "@/components/ui/figure";

interface ImageGalleryProps {
  images: string[];
  altPrefix?: string;
}

/** Galería en grid con lightbox accesible y navegación por teclado. */
export function ImageGallery({ images, altPrefix = "Imagen del proyecto" }: ImageGalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? 0 : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, images.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={`${img}-${i}`}
            onClick={() => setActive(i)}
            className="group relative overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep/60 focus-visible:ring-offset-2"
            aria-label={`Ampliar imagen ${i + 1}`}
          >
            <Figure
              src={img}
              alt={`${altPrefix} ${i + 1}`}
              className="aspect-[4/3] w-full transition-transform duration-500 ease-smooth group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Galería de imágenes"
          >
            <button
              className="absolute right-4 top-4 rounded-full bg-cream/10 p-2 text-cream transition-colors hover:bg-cream/20"
              onClick={() => setActive(null)}
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              className="absolute left-4 rounded-full bg-cream/10 p-2 text-cream transition-colors hover:bg-cream/20"
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
              }}
              aria-label="Anterior"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
            <motion.div
              key={active}
              className="relative w-full max-w-4xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Figure
                src={images[active]}
                alt={`${altPrefix} ${active + 1}`}
                className="aspect-[3/2] w-full rounded-lg"
                sizes="100vw"
                priority
              />
            </motion.div>
            <button
              className="absolute right-4 rounded-full bg-cream/10 p-2 text-cream transition-colors hover:bg-cream/20"
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i === null ? 0 : (i + 1) % images.length));
              }}
              aria-label="Siguiente"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
