import type { Metadata } from "next";
import Link from "next/link";
import { Eye, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PanelDashboard } from "@/components/courses/panel-dashboard";
import { LessonPlayer } from "@/components/courses/lesson-player";
import { Curriculum } from "@/components/courses/curriculum";
import { buttonVariants } from "@/components/ui/button";
import { getPreviewPanelData } from "@/lib/courses/access";
import { getCourseBySlug, getLessonContext } from "@/lib/data/courses";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Así se ve el panel de alumno",
    description: "Vista previa del panel privado donde los alumnos ven sus cursos en video.",
    path: "/cursos/vista-previa",
  }),
  robots: { index: false, follow: true },
};

/**
 * Vista previa pública del panel.
 *
 * Usa los mismos componentes que el panel real pero con datos de ejemplo, para
 * poder enseñar el diseño sin dar credenciales. No consulta Supabase ni expone
 * ningún video: es una maqueta, no un atajo de acceso.
 */
export default function VistaPreviaPage() {
  const demoCourses = getPreviewPanelData();
  const course = getCourseBySlug("instalacion-de-muros-verdes");
  const context = course ? getLessonContext(course, "calculo-de-carga") : null;
  const completed = demoCourses[0]?.completedLessons ?? [];

  return (
    <>
      {/* Aviso */}
      <div className="border-b border-sand bg-sand-light/60">
        <Container className="flex flex-col items-start gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2.5 text-sm text-charcoal">
            <Eye className="h-4 w-4 flex-shrink-0 text-green-olive" aria-hidden />
            <span>
              <strong className="font-semibold">Vista previa con datos de ejemplo.</strong> Así ve
              su panel un alumno después de comprar.
            </span>
          </p>
          <Link href="/cursos" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "flex-shrink-0")}>
            Ver catálogo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Container>
      </div>

      {/* Panel */}
      <div className="bg-cream-dark/30">
        <PanelDashboard courses={demoCourses} userName="Roberto Guzmán" />
      </div>

      {/* Reproductor */}
      {course && context && (
        <section className="border-t border-stone/40 py-section-sm">
          <Container>
            <div className="mb-8">
              <p className="text-eyebrow font-semibold uppercase text-green-olive">
                Dentro de una lección
              </p>
              <h2 className="mt-2 font-display text-display-sm font-medium text-green-deep">
                El reproductor
              </h2>
              <p className="mt-2 max-w-2xl text-charcoal-muted">
                Video, avance guardado automáticamente y el temario siempre a la vista para saltar
                a cualquier lección.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.9fr_1fr] lg:gap-10">
              <LessonPlayer
                courseSlug={course.slug}
                lesson={context.lesson}
                videoUrl={null}
                initiallyCompleted={completed.includes(context.lesson.slug)}
                previous={context.previous}
                next={context.next}
                index={context.index}
                total={context.total}
                demo
              />
              <aside className="min-w-0 lg:max-h-[36rem] lg:overflow-y-auto">
                <Curriculum
                  course={course}
                  hasAccess
                  readOnly
                  compact
                  completedLessons={completed}
                  activeLessonSlug={context.lesson.slug}
                />
              </aside>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
