import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

/** Tarjeta de testimonio con cita amplia y avatar de inicial. */
export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const initial = testimonial.client_name.trim().charAt(0).toUpperCase();
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-xl border border-stone/40 bg-cream p-7 shadow-soft transition-shadow duration-300 hover:shadow-soft-lg sm:p-8",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Quote className="h-7 w-7 text-green-olive/40" aria-hidden />
        <div className="flex gap-0.5" aria-label={`${testimonial.rating} de 5 estrellas`}>
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
      </div>
      <blockquote className="mt-4 flex-1 text-charcoal">
        <p className="text-[1.0625rem] leading-relaxed sm:text-lg">“{testimonial.quote}”</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3.5 border-t border-stone/40 pt-5">
        <span
          aria-hidden
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-green-deep font-display text-lg text-cream"
        >
          {initial}
        </span>
        <div>
          <p className="font-display text-lg leading-tight text-green-deep">
            {testimonial.client_name}
          </p>
          <p className="text-sm text-charcoal-muted">{testimonial.project_type}</p>
        </div>
      </figcaption>
    </figure>
  );
}
