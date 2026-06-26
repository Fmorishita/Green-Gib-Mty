import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Figure } from "@/components/ui/figure";
import { trustPillars } from "@/lib/data/site";
import { cn } from "@/lib/utils";

/** Hero principal de la Home, con imagen de fondo editorial. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-green-deep">
      {/* Fondo */}
      <div className="absolute inset-0">
        <Figure
          src="Jardín residencial premium Monterrey"
          alt="Jardín residencial premium diseñado por Green Gibb en Monterrey"
          variant="green"
          priority
          sizes="100vw"
          className="h-full w-full"
          imgClassName="animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-deep via-green-deep/70 to-green-deep/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-deep/80 to-transparent" />
      </div>

      <Container className="relative flex min-h-[88vh] flex-col justify-center py-24 lg:min-h-[92vh]">
        <div className="max-w-3xl">
          <p className="animate-fade-up text-eyebrow font-semibold uppercase text-sand [animation-delay:0ms]">
            Paisajismo premium · Monterrey
          </p>
          <h1 className="mt-5 animate-fade-up font-display text-display-xl font-medium text-cream [animation-delay:80ms]">
            Diseñamos espacios verdes que elevan la forma en que vives, trabajas y convives.
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-cream/85 [animation-delay:160ms]">
            Paisajismo, jardines, muros verdes y decoración exterior para residencias,
            empresas y proyectos arquitectónicos en Monterrey.
          </p>
          <div className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row [animation-delay:240ms]">
            <Link href="/contacto" className={cn(buttonVariants({ variant: "terracotta", size: "lg" }))}>
              Cotizar mi proyecto
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/portafolio" className={cn(buttonVariants({ variant: "outlineLight", size: "lg" }))}>
              <Play className="h-4 w-4" aria-hidden />
              Ver portafolio
            </Link>
          </div>
        </div>
      </Container>

      {/* Barra de confianza */}
      <div className="relative border-t border-cream/15 bg-green-deep-800/60 backdrop-blur-sm">
        <Container>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 text-center text-sm text-cream/80">
            {trustPillars.map((pillar, i) => (
              <li key={pillar} className="flex items-center gap-8">
                {i > 0 && <span aria-hidden className="hidden h-1 w-1 rounded-full bg-sand sm:block" />}
                <span>{pillar}</span>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
