import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

/** Tarjeta de testimonio. */
export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-xl border border-stone/40 bg-cream p-7 shadow-soft",
        className
      )}
    >
      <Quote className="h-7 w-7 text-green-olive/40" aria-hidden />
      <div className="mt-3 flex gap-0.5" aria-label={`${testimonial.rating} de 5 estrellas`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < testimonial.rating ? "fill-terracotta text-terracotta" : "text-stone"
            )}
            aria-hidden
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-charcoal">
        <p className="leading-relaxed">“{testimonial.quote}”</p>
      </blockquote>
      <figcaption className="mt-6 border-t border-stone/40 pt-4">
        <p className="font-display text-lg text-green-deep">{testimonial.client_name}</p>
        <p className="text-sm text-charcoal-muted">{testimonial.project_type}</p>
      </figcaption>
    </figure>
  );
}
