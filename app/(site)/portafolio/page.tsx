import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { CTASection } from "@/components/sections/cta-section";
import { projects, projectCategories } from "@/lib/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Portafolio de proyectos de paisajismo",
  description:
    "Transformaciones de jardines, terrazas, muros verdes y áreas comerciales en Monterrey. Conoce el trabajo de Green Gib.",
  path: "/portafolio",
});

export default function PortafolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portafolio"
        title="Espacios que diseñamos, construimos y transformamos"
        description="Cada proyecto parte de un reto distinto. Esto es lo que logramos cuando el diseño y la ejecución trabajan juntos."
        image="Portafolio de paisajismo Monterrey"
      />

      <section className="py-section">
        <Container>
          <div className="mb-10 max-w-2xl">
            <p className="text-lg leading-relaxed text-charcoal-muted">
              Trabajamos en residencias, comercios y proyectos arquitectónicos de Monterrey y su
              zona metropolitana. Filtra por categoría para explorar el tipo de proyecto que te
              interesa.
            </p>
          </div>
          <PortfolioGrid projects={projects} categories={projectCategories} />
        </Container>
      </section>

      <CTASection
        title="¿Quieres un proyecto así?"
        description="Cuéntanos qué espacio tienes en mente y te ayudamos a llevarlo del potencial al resultado."
        primaryLabel="Cotizar mi proyecto"
      />
    </>
  );
}
