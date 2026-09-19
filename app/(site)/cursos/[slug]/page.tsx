import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Clock, PlayCircle, BarChart3, Users, ListChecks, ShieldCheck, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Figure } from "@/components/ui/figure";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Curriculum } from "@/components/courses/curriculum";
import { MotionSection } from "@/components/sections/motion-section";
import { SEOJsonLd } from "@/components/sections/seo-json-ld";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { buttonVariants } from "@/components/ui/button";
import { courses, getCourseBySlug, formatDuration } from "@/lib/data/courses";
import { whatsappGeneral } from "@/lib/whatsapp";
import { pageMetadata, SITE_URL, SITE_NAME } from "@/lib/seo";
import { formatPrice, cn } from "@/lib/utils";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const course = getCourseBySlug(params.slug);
  if (!course) return pageMetadata({ title: "Curso", path: "/cursos" });
  return pageMetadata({
    title: course.title,
    description: course.subtitle,
    path: `/cursos/${course.slug}`,
    image: course.cover,
  });
}

/** JSON-LD Course, para los resultados enriquecidos de formación. */
function courseJsonLd(course: (typeof courses)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: `${SITE_URL}/cursos/${course.slug}`,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    educationalLevel: course.level,
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: "MXN",
      category: "Paid",
      url: `${SITE_URL}/cursos/${course.slug}`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${Math.round(course.durationMinutes / 60)}H`,
    },
  };
}

export default function CursoDetallePage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();

  // Esta página se mantiene estática a propósito: es la que trabaja el SEO.
  // El estado de compra se resuelve en /comprar, que sí es dinámica y
  // redirige al curso si el alumno ya lo tiene.

  return (
    <>
      <SEOJsonLd data={courseJsonLd(course)} />

      {/* Encabezado */}
      <section className="bg-green-deep pb-section-sm pt-12 text-cream">
        <Container>
          <Breadcrumbs
            className="mb-8 [&_a]:text-cream/70 [&_a:hover]:text-cream [&_span]:text-sand"
            items={[
              { name: "Inicio", path: "/" },
              { name: "Cursos", path: "/cursos" },
              { name: course.title, path: `/cursos/${course.slug}` },
            ]}
          />
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <Badge variant="sand" className="w-fit">{course.level}</Badge>
              <h1 className="mt-4 font-display text-display-lg font-medium leading-[1.05] text-cream">
                {course.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/80">
                {course.subtitle}
              </p>
              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/70">
                <li className="inline-flex items-center gap-2">
                  <PlayCircle className="h-4 w-4 text-sand" aria-hidden />
                  {course.lessonCount} lecciones
                </li>
                <li className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-sand" aria-hidden />
                  {formatDuration(course.durationMinutes)} de video
                </li>
                <li className="inline-flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-sand" aria-hidden />
                  {course.level}
                </li>
              </ul>
            </div>

            {/* Tarjeta de compra */}
            <MotionSection className="lg:-mb-28">
              <div className="overflow-hidden rounded-2xl border border-stone/40 bg-cream shadow-float">
                <Figure
                  src={course.cover}
                  alt={course.title}
                  variant="green"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="aspect-[16/10] w-full"
                />
                <div className="p-7">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-display text-display-sm text-green-deep">
                      {formatPrice(course.price)}
                    </span>
                    {course.compareAtPrice && (
                      <span className="text-charcoal-light line-through">
                        {formatPrice(course.compareAtPrice)}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-charcoal-muted">
                    Pago único · Acceso permanente
                  </p>

                  <Link
                    href={`/cursos/${course.slug}/comprar`}
                    className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-6 w-full")}
                  >
                    Comprar el curso
                  </Link>

                  <WhatsAppLink
                    href={whatsappGeneral()}
                    variant="secondary"
                    context={`curso-${course.slug}`}
                    className="mt-3 w-full"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Preguntar antes de comprar
                  </WhatsAppLink>

                  <ul className="mt-6 space-y-2.5 border-t border-stone/40 pt-5">
                    {course.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-olive" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </MotionSection>
          </div>
        </Container>
      </section>

      {/* Contenido */}
      <section className="py-section lg:pt-40">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div className="space-y-12">
              <MotionSection>
                <h2 className="font-display text-display-sm font-medium text-green-deep">
                  De qué trata
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-charcoal-muted">
                  {course.description}
                </p>
              </MotionSection>

              <MotionSection>
                <h2 className="font-display text-display-sm font-medium text-green-deep">
                  Lo que vas a poder hacer
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {course.outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex items-start gap-3 rounded-lg border border-stone/40 bg-cream p-4"
                    >
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-olive" aria-hidden />
                      <span className="text-sm text-charcoal">{o}</span>
                    </li>
                  ))}
                </ul>
              </MotionSection>

              <MotionSection>
                <div className="flex items-center gap-3">
                  <ListChecks className="h-6 w-6 text-green-olive" aria-hidden />
                  <h2 className="font-display text-display-sm font-medium text-green-deep">
                    Temario
                  </h2>
                </div>
                <p className="mt-2 text-sm text-charcoal-muted">
                  {course.modules.length} módulos · {course.lessonCount} lecciones ·{" "}
                  {formatDuration(course.durationMinutes)}. Las lecciones marcadas como muestra se
                  pueden ver sin comprar.
                </p>
                <div className="mt-6">
                  <Curriculum course={course} />
                </div>
              </MotionSection>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
              <div className="rounded-2xl bg-cream-dark/60 p-7">
                <Users className="h-6 w-6 text-green-olive" aria-hidden />
                <h3 className="mt-3 font-display text-xl text-green-deep">Para quién es</h3>
                <ul className="mt-4 space-y-2.5">
                  {course.forWhom.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-charcoal">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-olive" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-cream-dark/60 p-7">
                <ShieldCheck className="h-6 w-6 text-terracotta" aria-hidden />
                <h3 className="mt-3 font-display text-xl text-green-deep">Requisitos</h3>
                <ul className="mt-4 space-y-2.5">
                  {course.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-charcoal">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" aria-hidden />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
