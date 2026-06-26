"use client";

import { useEffect, useState } from "react";
import { Figure } from "@/components/ui/figure";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/tracking";

interface ProductGalleryProps {
  images: string[];
  name: string;
  productId: string;
  price: number;
}

/** Galería de producto con miniaturas y tracking de ProductView. */
export function ProductGallery({ images, name, productId, price }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const list = images.length ? images : [name];

  useEffect(() => {
    trackEvent("ProductView", { content_ids: [productId], content_name: name, value: price, currency: "MXN" });
    trackEvent("ViewContent", { content_ids: [productId], content_name: name, value: price, currency: "MXN" });
  }, [productId, name, price]);

  return (
    <div className="space-y-4">
      <Figure
        src={list[active]}
        alt={`${name} — imagen ${active + 1}`}
        variant="sand"
        priority
        className="aspect-square w-full rounded-xl"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      {list.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {list.map((img, i) => (
            <button
              key={`${img}-${i}`}
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "overflow-hidden rounded-lg ring-offset-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep/60",
                i === active ? "ring-2 ring-green-deep" : "opacity-70 hover:opacity-100"
              )}
            >
              <Figure
                src={img}
                alt=""
                variant="sand"
                className="aspect-square w-full"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
