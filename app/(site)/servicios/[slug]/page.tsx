import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle, Target, Users } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/sections/section-title";
import { ServiceCard } from "@/components/cards/service-card";
import { ImageGallery } from "@/components/sections/image-gallery";
import { CTASection } from "@/components/sections/cta-section";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buttonVariants } from "@/components/ui/button";
import { MotionSection } from "@/components/sections/motion-section";
import { SEOJsonLd } from "@/components/sections/seo-json-ld";
import { services, getServiceBySlug } from "@/lib/data/services";
import { whatsappQuote } from "@/lib/whatsapp";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return pageMetadata({ title: "Servicio", path: "/servicios" });
  return pageMetadata({
    title: `${service.name} en Monterrey`,
    description: service.shortDescription,
    path: `/servicios/${service.slug}`,
  });
}

export default function ServicioDetallePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const related = service.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <SEOJsonLd
        data={serviceJsonLd({
          name: service.name,
          description: service.shortDescription,
          image: service.gallery[0] ?? "Servicio Green Gib",
          slug: service.slug,
        })}
      />

      <PageHero
        eyebrow="Servicio"
        title={service.name}
        description={service.description}
        image={service.gallery[0] ?? "Servicio Green Gib"}
        variant="green"
      />

      <section className="py-section">
        <Container>
          <Breadcrumbs
            className="mb-10"
            items={[
              { name: "Inicio", path: "/" },
              { name: "Servicios", path: "/servicios" },
              { name: service.name, path: `/servicios/${service.slug}` },
            ]}
          />
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-12">
              {/* Beneficios */}
              <MotionSection>
                <h2 className="font-display text-display-sm font-medium text-green-deep">Beneficios</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 rounded-lg border border-stone/40 bg-cream p-4">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-olive" aria-hidden />
                      <span className="text-charcoal">{b}</span>
                    </li>
                  ))}
                </ul>
              </MotionSection>

              {/* Para quién + problemas */}
              <div className="grid gap-8 sm:grid-cols-2">
                <MotionSection className="rounded-xl bg-cream-dark/60 p-7">
                  <Users className="h-6 w-6 text-green-olive" aria-hidden />
                  <h3 className="mt-3 font-display text-xl text-green-deep">Para quién es</h3>
                  <ul className="mt-4 space-y-2.5">
                    {service.forWhom.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-charcoal">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-olive" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                </MotionSection>
                <MotionSection delay={1} className="rounded-xl bg-cream-dark/60 p-7">
                  <Target className="h-6 w-6 text-terracotta" aria-hidden />
                  <h3 className="mt-3 font-display text-xl text-green-deep">Problemas que resuelve</h3>
                  <ul className="mt-4 space-y-2.5">
                    {service.problemsSolved.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-charcoal">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </MotionSection>
              </div>

              {/* Galería */}
              <MotionSection>
                <h2 className="font-display text-display-sm font-medium text-green-deep">Galería</h2>
                <div className="mt-6">
                  <ImageGallery images={service.gallery} altPrefix={service.name} />
                </div>
              </MotionSection>
            </div>

            {/* Sidebar CTA */}
            <aside className="lg:sticky lg:top-28 lg:h-fit">
              <div className="rounded-2xl border border-stone/40 bg-cream p-7 shadow-soft">
                <h3 className="font-display text-2xl text-green-deep">
                  ¿Te interesa este servicio?
                </h3>
                <p className="mt-2 text-sm text-charcoal-muted">
                  Cuéntanos sobre tu espacio y te entregamos una propuesta a la medida.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href={`/contacto?servicio=${encodeURIComponent(service.name)}`}
                    className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
                  >
                    Cotizar este servicio
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <WhatsAppLink href={whatsappQuote()} size="lg" context={`servicio-${service.slug}`}>
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Consultar por WhatsApp
                  </WhatsAppLink>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Servicios relacionados */}
      {related.length > 0 && (
        <section className="bg-cream-dark/50 py-section">
          <Container>
            <SectionTitle eyebrow="También te puede interesar" title="Servicios relacionados" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
