import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Tag, Target, Lightbulb } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/sections/section-title";
import { ImageGallery } from "@/components/sections/image-gallery";
import { BeforeAfter } from "@/components/sections/before-after";
import { ProjectCard } from "@/components/cards/project-card";
import { CTASection } from "@/components/sections/cta-section";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { Badge } from "@/components/ui/badge";
import { MotionSection } from "@/components/sections/motion-section";
import { projects, getProjectBySlug } from "@/lib/data/projects";
import { whatsappSimilarProject } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return pageMetadata({ title: "Proyecto", path: "/portafolio" });
  return pageMetadata({
    title: project.title,
    description: project.description,
    path: `/portafolio/${project.slug}`,
    image: project.cover_image,
  });
}

export default function ProyectoDetallePage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 3);
  const fallbackRelated =
    related.length > 0 ? related : projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        description={project.description}
        image={project.cover_image}
        variant="green"
      />

      <section className="py-section">
        <Container>
          <Link
            href="/portafolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-green-olive-dark transition-colors hover:text-green-deep"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Volver al portafolio
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-10">
              <MotionSection className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl bg-cream-dark/60 p-7">
                  <Target className="h-6 w-6 text-terracotta" aria-hidden />
                  <h2 className="mt-3 font-display text-xl text-green-deep">El reto</h2>
                  <p className="mt-2 text-charcoal-muted">{project.challenge}</p>
                </div>
                <div className="rounded-xl bg-cream-dark/60 p-7">
                  <Lightbulb className="h-6 w-6 text-green-olive" aria-hidden />
                  <h2 className="mt-3 font-display text-xl text-green-deep">La solución</h2>
                  <p className="mt-2 text-charcoal-muted">{project.solution}</p>
                </div>
              </MotionSection>

              {project.beforeAfter && (
                <MotionSection>
                  <h2 className="font-display text-display-sm font-medium text-green-deep">
                    Antes y después
                  </h2>
                  <div className="mt-6">
                    <BeforeAfter
                      before={project.beforeAfter.before}
                      after={project.beforeAfter.after}
                      beforeAlt={`${project.title} — antes`}
                      afterAlt={`${project.title} — después`}
                    />
                  </div>
                </MotionSection>
              )}

              <MotionSection>
                <h2 className="font-display text-display-sm font-medium text-green-deep">Galería</h2>
                <div className="mt-6">
                  <ImageGallery images={project.gallery} altPrefix={project.title} />
                </div>
              </MotionSection>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
              <div className="rounded-2xl border border-stone/40 bg-cream p-7 shadow-soft">
                <h3 className="font-display text-xl text-green-deep">Detalles del proyecto</h3>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex items-center gap-2 text-charcoal">
                    <MapPin className="h-4 w-4 text-green-olive" aria-hidden />
                    <dt className="sr-only">Ubicación</dt>
                    <dd>{project.location}</dd>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal">
                    <Tag className="h-4 w-4 text-green-olive" aria-hidden />
                    <dt className="sr-only">Categoría</dt>
                    <dd>{project.category}</dd>
                  </div>
                  {project.details.map((d) => (
                    <div key={d.label} className="flex items-center justify-between border-t border-stone/30 pt-3">
                      <dt className="text-charcoal-muted">{d.label}</dt>
                      <dd className="font-medium text-charcoal">{d.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-green-olive">
                    Servicios aplicados
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.services.map((s) => (
                      <Badge key={s} variant="olive">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>

                <WhatsAppLink
                  href={whatsappSimilarProject(project.title)}
                  size="lg"
                  context={`proyecto-${project.slug}`}
                  className="mt-7 w-full"
                >
                  Quiero algo similar
                </WhatsAppLink>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-cream-dark/50 py-section">
        <Container>
          <SectionTitle eyebrow="Más proyectos" title="Sigue explorando" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fallbackRelated.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
