import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

/** Encabezado de sección con eyebrow editorial, título display y descripción. */
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light = false,
}: SectionTitleProps) {
  const lineClass = cn("h-px w-8", light ? "bg-sand/60" : "bg-green-olive/50");
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 flex items-center gap-3 text-eyebrow font-semibold uppercase",
            align === "center" && "justify-center",
            light ? "text-sand" : "text-green-olive"
          )}
        >
          <span aria-hidden className={lineClass} />
          {eyebrow}
          {align === "center" && <span aria-hidden className={lineClass} />}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-display-md font-medium",
          light ? "text-cream" : "text-green-deep"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            light ? "text-cream/80" : "text-charcoal-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
