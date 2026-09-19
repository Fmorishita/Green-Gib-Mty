import Link from "next/link";
import { ArrowRight, PlayCircle, Clock, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { MotionSection, MotionStagger, MotionItem } from "@/components/sections/motion-section";
import { getFeaturedCourses, formatDuration } from "@/lib/data/courses";
import { formatPrice, cn } from "@/lib/utils";

/**
 * Bloque de cursos en la home.
 *
 * Va dirigido a un público distinto al del resto del sitio —otros
 * profesionales del gremio, no clientes finales—, así que se separa
 * visualmente en lugar de mezclarse con los servicios.
 */
export function CoursesTeaser() {
  const courses = getFeaturedCourses().slice(0, 3);
  if (courses.length === 0) return null;

  return (
    <section className="bg-green-deep py-section text-cream">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <MotionSection>
            <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-sand">
              <span aria-hidden className="h-px w-8 bg-sand/60" />
              ¿Eres del gremio?
            </p>
            <h2 className="mt-3 font-display text-display-md font-medium text-cream">
              Te enseñamos a instalar como lo hacemos nosotros
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/80">
              Abrimos nuestro método a paisajistas, jardineros y constructores. Cursos en video
              con el procedimiento completo: muros verdes, riego eficiente, diseño de jardines y
              mantenimiento profesional.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                "Acceso permanente, con las actualizaciones incluidas",
                "Plantillas de cálculo y listas de materiales descargables",
                "Constancia de finalización para mostrar a tus clientes",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-cream/85">
                  <GraduationCap className="mt-0.5 h-5 w-5 flex-shrink-0 text-sand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/cursos"
              className={cn(buttonVariants({ variant: "outlineLight", size: "lg" }), "mt-8")}
            >
              Ver los cursos
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </MotionSection>

          {/* Cursos destacados */}
          <MotionStagger className="flex flex-col gap-3">
            {courses.map((course) => (
              <MotionItem key={course.slug}>
                <Link
                  href={`/cursos/${course.slug}`}
                  className="group flex items-center gap-5 rounded-xl border border-cream/15 bg-cream/[0.06] p-5 transition-colors duration-300 hover:border-cream/30 hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg leading-snug text-cream">
                      {course.title}
                    </h3>
                    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-cream/60">
                      <li className="inline-flex items-center gap-1.5">
                        <PlayCircle className="h-3.5 w-3.5" aria-hidden />
                        {course.lessonCount} lecciones
                      </li>
                      <li className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" aria-hidden />
                        {formatDuration(course.durationMinutes)}
                      </li>
                    </ul>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="font-display text-xl text-sand">{formatPrice(course.price)}</p>
                    <p className="mt-0.5 text-xs text-cream/50">Pago único</p>
                  </div>
                  <ArrowRight
                    className="h-5 w-5 flex-shrink-0 text-cream/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-sand"
                    aria-hidden
                  />
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </Container>
    </section>
  );
}
