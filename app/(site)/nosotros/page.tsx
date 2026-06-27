import type { Metadata } from "next";
import { Leaf, Compass, HeartHandshake, Award } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/sections/section-title";
import { ProcessSteps } from "@/components/sections/process-steps";
import { CTASection } from "@/components/sections/cta-section";
import { FounderSection } from "@/components/sections/founder-section";
import { Figure } from "@/components/ui/figure";
import { MotionSection, MotionStagger, MotionItem } from "@/components/sections/motion-section";
import { differentiators } from "@/lib/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nosotros — Fundador, innovación y arquitectura verde",
  description:
    "Green Gib está liderada por Mario Enrique Ávila Quintana, fundador y co-inventor del Jardín Vertical Colapsable (Título de Patente No. 407278, IMPI). Paisajismo, jardines verticales y muros verdes en Monterrey con diseño, instalación y mantenimiento.",
  path: "/nosotros",
  keywords: [
    "Mario Enrique Ávila Quintana",
    "fundador de Green Gib",
    "co-inventor Jardín Vertical Colapsable",
    "patente Jardín Vertical Colapsable",
    "IMPI",
    "arquitectura verde",
    "jardinería en Monterrey",
    "diseño de jardines",
    "jardines verticales",
    "muros verdes",
    "optimización de espacios",
    "instalación de jardines",
    "mantenimiento de áreas verdes",
  ],
});

const values = [
  {
    icon: Compass,
    title: "Diseño con propósito",
    description: "Cada decisión responde a cómo se vivirá el espacio, no a una moda pasajera.",
  },
  {
    icon: Award,
    title: "Calidad sin atajos",
    description: "Materiales nobles, especies adecuadas y una ejecución que se nota en los detalles.",
  },
  {
    icon: HeartHandshake,
    title: "Cercanía real",
    description: "Acompañamos a nuestros clientes antes, durante y después de cada proyecto.",
  },
  {
    icon: Leaf,
    title: "Respeto por lo natural",
    description: "Trabajamos con la naturaleza, eligiendo soluciones eficientes en agua y recursos.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="Somos quienes piensan tu espacio antes de plantarlo"
        description="Green Gib nace de una idea simple: los espacios exteriores merecen el mismo nivel de diseño y cuidado que el interior de una casa o un negocio."
        image="Equipo Green Gib paisajismo"
      />

      {/* Historia + filosofía */}
      <section className="py-section">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <MotionSection>
              <p className="text-eyebrow font-semibold uppercase text-green-olive">Nuestra historia</p>
              <h2 className="mt-3 font-display text-display-md font-medium text-green-deep">
                Diseño, ejecución y mantenimiento, bajo una misma filosofía
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-charcoal-muted">
                <p>
                  Nacimos en Monterrey, una ciudad de clima exigente y estilo de vida intenso.
                  Entendemos que aquí un jardín no solo tiene que verse bien: tiene que resistir
                  el sol, aprovechar el agua y funcionar para quienes lo habitan.
                </p>
                <p>
                  Por eso integramos en un solo equipo el diseño, la ejecución y el mantenimiento.
                  Así garantizamos que lo que imaginamos se construya con fidelidad y se conserve
                  vivo con el tiempo.
                </p>
                <p>
                  Trabajamos de la mano de propietarios, arquitectos y desarrolladores que buscan
                  un aliado serio para sus proyectos exteriores.
                </p>
              </div>
            </MotionSection>
            <MotionSection delay={1} className="grid grid-cols-2 gap-4">
              <Figure
                src="Detalle de plantas y materiales"
                alt="Detalle de vegetación y materiales naturales"
                variant="olive"
                className="aspect-[3/4] rounded-xl"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <Figure
                src="Proyecto de paisajismo terminado"
                alt="Proyecto de paisajismo terminado en Monterrey"
                variant="green"
                className="mt-8 aspect-[3/4] rounded-xl"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </MotionSection>
          </div>
        </Container>
      </section>

      {/* Fundador: perfil + patente */}
      <FounderSection variant="about" />

      {/* Valores */}
      <section className="bg-cream-dark/50 py-section">
        <Container>
          <SectionTitle align="center" eyebrow="Lo que nos mueve" title="Nuestros valores" />
          <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <MotionItem key={value.title} className="rounded-xl border border-stone/40 bg-cream p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-deep/8 text-green-deep">
                  <value.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-lg text-green-deep">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">{value.description}</p>
              </MotionItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      {/* Diferenciadores */}
      <section className="py-section">
        <Container>
          <SectionTitle
            eyebrow="Qué nos diferencia"
            title="No somos un vivero ni una agencia. Somos especialistas en espacios."
          />
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {differentiators.map((item, i) => (
              <div key={item.title} className="flex gap-5">
                <span className="font-display text-display-sm font-medium text-green-olive/40">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl text-green-deep">{item.title}</h3>
                  <p className="mt-1.5 text-charcoal-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Cómo trabajamos */}
      <section className="bg-cream-dark/50 py-section">
        <Container>
          <SectionTitle
            align="center"
            eyebrow="Cómo trabajamos"
            title="Un método que da tranquilidad"
          />
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
