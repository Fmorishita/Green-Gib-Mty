"use client";

import { useRef, useState } from "react";
import { Figure } from "@/components/ui/figure";

interface BeforeAfterProps {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
}

/** Comparador interactivo de antes y después con slider. */
export function BeforeAfter({
  before,
  after,
  beforeAlt = "Antes",
  afterAlt = "Después",
}: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-xl shadow-card"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* Después (capa de fondo, completa) */}
      <Figure
        src={after}
        alt={afterAlt}
        variant="green"
        className="absolute inset-0 h-full w-full"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <span className="absolute right-4 top-4 z-10 rounded-full bg-green-deep/80 px-3 py-1 text-xs font-medium text-cream">
        Después
      </span>

      {/* Antes (capa superior, recortada con clip-path) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Figure
          src={before}
          alt={beforeAlt}
          variant="stone"
          className="absolute inset-0 h-full w-full"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <span className="absolute left-4 top-4 z-10 rounded-full bg-charcoal/70 px-3 py-1 text-xs font-medium text-cream">
          Antes
        </span>
      </div>

      {/* Control deslizable accesible */}
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label="Comparar antes y después"
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
      />
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-cream"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream p-2 shadow-float">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-green-deep">
            <path
              d="M9 7l-5 5 5 5M15 7l5 5-5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
