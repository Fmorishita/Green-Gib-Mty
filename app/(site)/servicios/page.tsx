import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { ServiceCard } from "@/components/cards/service-card";
import { CTASection } from "@/components/sections/cta-section";
import { ProcessSteps } from "@/components/sections/process-steps";
import { SectionTitle } from "@/components/sections/section-title";
import { MotionStagger, MotionItem } from "@/components/sections/motion-section";
import { buttonVariants } from "@/components/ui/button";
import { services } from "@/lib/data/services";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Servicios de paisajismo en Monterrey",
  description:
    "Paisajismo residencial, diseño de jardines, muros verdes, jardines verticales, decoración exterior, mantenimiento y proyectos comerciales en Monterrey.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Soluciones de paisajismo para cada tipo de espacio"
        description="Diseñamos, ejecutamos y mantenemos. Desde un jardín residencial hasta las áreas verdes de un desarrollo, cubrimos todo el ciclo de tu proyecto."
        image="Servicios de paisajismo Green Gib"
      />

      <section className="py-section">
        <Container>
          <MotionStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <MotionItem key={service.slug} className="h-full">
                <ServiceCard service={service} />
              </MotionItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-cream-dark/50 py-section">
        <Container>
          <SectionTitle
            align="center"
            eyebrow="Cómo trabajamos"
            title="Un proceso claro en cada servicio"
            description="Sin importar el tamaño del proyecto, seguimos un método que te da visibilidad y tranquilidad."
          />
          <div className="mt-12">
            <ProcessSteps />
          </div>
          <div className="mt-10 text-center">
            <Link href="/portafolio" className={cn(buttonVariants({ variant: "secondary" }))}>
              Ver proyectos realizados
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
