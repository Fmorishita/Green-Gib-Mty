import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Figure } from "@/components/ui/figure";
import { MotionSection } from "@/components/sections/motion-section";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { coverageZones, siteConfig } from "@/lib/data/site";
import { whatsappGeneral } from "@/lib/whatsapp";

/**
 * Zonas de cobertura. Aporta claridad al prospecto y refuerza el SEO local
 * (búsquedas por colonia/municipio en el área metropolitana de Monterrey).
 */
export function CoverageSection() {
  return (
    <section className="bg-green-deep py-section text-cream">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <MotionSection>
            <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-sand">
              <span aria-hidden className="h-px w-8 bg-sand/60" />
              Dónde trabajamos
            </p>
            <h2 className="mt-3 font-display text-display-md font-medium text-cream">
              Paisajismo en {siteConfig.serviceArea}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-cream/80">
              Diseñamos, instalamos y damos mantenimiento en toda el área metropolitana.
              Si tu proyecto está cerca, lo atendemos con la misma supervisión cercana.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {coverageZones.map((zone) => (
                <li
                  key={zone}
                  className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-cream/5 px-3.5 py-1.5 text-sm text-cream/90"
                >
                  <MapPin className="h-3.5 w-3.5 text-sand" aria-hidden />
                  {zone}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-cream/70">
              ¿Tu zona no aparece? Escríbenos: cubrimos municipios cercanos según el proyecto.
            </p>

            <WhatsAppLink
              href={whatsappGeneral()}
              size="lg"
              context="coverage"
              className="mt-6"
            >
              Consultar mi zona
            </WhatsAppLink>
          </MotionSection>

          <MotionSection delay={1}>
            <Figure
              src="Mapa de cobertura Monterrey zona metropolitana"
              alt="Áreas verdes atendidas por Green Gib en Monterrey y su zona metropolitana"
              variant="green"
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="aspect-[4/3] w-full rounded-2xl shadow-card"
            />
          </MotionSection>
        </div>
      </Container>
    </section>
  );
}
