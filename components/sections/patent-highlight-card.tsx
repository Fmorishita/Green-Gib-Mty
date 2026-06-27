import { Award, ArrowUpRight, Sprout } from "lucide-react";
import { patent } from "@/lib/data/founder";
import { cn } from "@/lib/utils";

interface PatentHighlightCardProps {
  /** Tema visual: claro (crema) u oscuro (verde profundo). */
  variant?: "light" | "dark";
  className?: string;
  /** Muestra la lista de datos técnicos (más completa para Nosotros). */
  showDetails?: boolean;
}

/**
 * Card de reconocimiento técnico: Mario figura como inventor listado en el
 * Título de Patente No. 407278 del IMPI. Discreta, no litigiosa.
 */
export function PatentHighlightCard({
  variant = "light",
  className,
  showDetails = true,
}: PatentHighlightCardProps) {
  const dark = variant === "dark";

  const details = [
    { label: "Título de Patente", value: `No. ${patent.number}` },
    { label: "Denominación", value: patent.name },
    { label: "Solicitud", value: patent.application },
    { label: "Expedición", value: patent.issueDate },
    { label: "Institución", value: patent.institution },
    { label: "Enfoque", value: patent.focus },
  ];

  return (
    <div
      className={cn(
        "rounded-2xl border p-7 sm:p-8",
        dark
          ? "border-cream/15 bg-green-deep-800/60 text-cream"
          : "border-stone/40 bg-cream text-charcoal shadow-soft",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl",
            dark ? "bg-cream/10 text-sand" : "bg-green-deep/8 text-green-deep"
          )}
        >
          <Award className="h-5 w-5" aria-hidden />
          <Sprout className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-olive p-0.5 text-cream" aria-hidden />
        </span>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
            dark ? "bg-cream/10 text-sand" : "bg-green-olive/15 text-green-olive-dark"
          )}
        >
          {patent.badge}
        </span>
      </div>

      <p className={cn("mt-5 text-eyebrow font-semibold uppercase", dark ? "text-sand" : "text-green-olive")}>
        Innovación aplicada
      </p>
      <h3 className={cn("mt-2 font-display text-2xl font-medium", dark ? "text-cream" : "text-green-deep")}>
        Co-inventor de {patent.name}
      </h3>
      <p className={cn("mt-3 leading-relaxed", dark ? "text-cream/80" : "text-charcoal-muted")}>
        Mario Enrique Ávila Quintana figura como inventor listado en el Título de Patente
        No. {patent.number} del {patent.institution} para “{patent.name}”, una solución
        diseñada para optimizar espacios mediante un sistema verde capaz de pasar de
        posición vertical a horizontal según el uso del entorno.
      </p>

      {showDetails && (
        <dl
          className={cn(
            "mt-6 grid gap-x-6 gap-y-3 border-t pt-6 text-sm sm:grid-cols-2",
            dark ? "border-cream/15" : "border-stone/40"
          )}
        >
          {details.map((d) => (
            <div key={d.label} className="flex flex-col">
              <dt className={cn("text-xs uppercase tracking-wide", dark ? "text-cream/50" : "text-charcoal-muted")}>
                {d.label}
              </dt>
              <dd className={cn("font-medium", dark ? "text-cream" : "text-charcoal")}>{d.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <a
        href={patent.pdf}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors",
          dark ? "text-sand hover:text-cream" : "text-green-olive-dark hover:text-green-deep"
        )}
      >
        Ver documento de patente
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </a>

      <p className={cn("mt-5 text-xs leading-relaxed", dark ? "text-cream/45" : "text-charcoal-muted/80")}>
        {patent.legalNote}
      </p>
    </div>
  );
}
