import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { SectionTitle } from "@/components/sections/section-title";
import { MotionStagger, MotionItem } from "@/components/sections/motion-section";
import { investmentTiers } from "@/lib/data/site";
import { cn } from "@/lib/utils";

/**
 * Rangos de inversión orientativos.
 * Da claridad temprana al prospecto (ticket alto) y precalifica el lead.
 */
export function InvestmentSection() {
  return (
    <section id="inversion" className="scroll-mt-20 bg-cream-dark/50 py-section">
      <Container>
        <SectionTitle
          align="center"
          eyebrow="Inversión"
          title="¿Cuánto cuesta transformar tu espacio?"
          description="Cada proyecto es distinto, pero estos rangos te dan una referencia clara antes de conversar. El presupuesto final siempre parte de una valoración del espacio."
        />

        <MotionStagger className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {investmentTiers.map((tier) => (
            <MotionItem key={tier.name} className="h-full">
              <div
                className={cn(
                  "flex h-full flex-col rounded-xl border p-7 transition-shadow duration-300 sm:p-8",
                  tier.highlight
                    ? "border-green-deep/25 bg-cream shadow-soft-lg ring-1 ring-green-deep/10"
                    : "border-stone/40 bg-cream hover:shadow-soft"
                )}
              >
                {tier.highlight ? (
                  <span className="mb-4 w-fit rounded-full bg-terracotta/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-terracotta-dark">
                    El más solicitado
                  </span>
                ) : (
                  // Reserva el alto del badge para alinear los títulos entre tarjetas.
                  <span aria-hidden className="mb-4 hidden h-[26px] lg:block" />
                )}
                <h3 className="font-display text-xl text-green-deep">{tier.name}</h3>
                <p className="mt-2 font-display text-display-sm font-medium text-green-deep">
                  {tier.range}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">
                  {tier.description}
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-stone/40 pt-5">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-olive" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="max-w-2xl text-sm text-charcoal-muted">
            Los rangos son orientativos y varían según superficie, materiales, vegetación y
            condiciones del sitio. Te entregamos un presupuesto cerrado tras la valoración,
            sin costo y sin compromiso.
          </p>
          <Link href="/contacto" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
            Solicitar mi presupuesto
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
