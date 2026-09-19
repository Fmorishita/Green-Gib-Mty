import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { PlayCircle, Clock, ListChecks, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Figure } from "@/components/ui/figure";
import { Curriculum } from "@/components/courses/curriculum";
import { ProgressBar } from "@/components/courses/progress-bar";
import { CertificateCard } from "@/components/courses/certificate-card";
import { buttonVariants } from "@/components/ui/button";
import { getCourseBySlug, formatDuration, getCourseLessons } from "@/lib/data/courses";
import { getEnrolledCourse, getMyCourses } from "@/lib/courses/access";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Curso | Green Gib",
  robots: { index: false, follow: false },
};

export default async function CursoPanelPage({ params }: { params: { curso: string } }) {
  const course = getCourseBySlug(params.curso);
  if (!course) notFound();

  const enrolled = await getEnrolledCourse(params.curso);

  // Sin acceso activo: si la inscripción existe pero está pendiente, lo
  // mandamos a completar el pago en lugar de mostrar un 404 confuso.
  if (!enrolled) {
    const mine = await getMyCourses();
    const pending = mine.find((e) => e.course.slug === params.curso);
    redirect(pending ? `/cursos/${params.curso}/comprar` : `/cursos/${params.curso}`);
  }

  const flat = getCourseLessons(course);
  const nextLesson = flat.find((l) => !enrolled.completedLessons.includes(l.slug)) ?? flat[0];
  const isComplete = enrolled.progressPercent >= 100;

  return (
    <Container className="py-10">
      <Link
        href="/mi-cuenta"
        className="inline-flex items-center gap-1.5 text-sm text-charcoal-muted transition-colors hover:text-green-deep"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Mis cursos
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.7fr] lg:gap-12">
        {/* Resumen */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="overflow-hidden rounded-xl border border-stone/40 bg-cream">
            <Figure
              src={course.cover}
              alt={course.title}
              variant="green"
              sizes="(max-width: 1024px) 100vw, 360px"
              className="aspect-[16/10] w-full"
            />
            <div className="p-6">
              <h1 className="font-display text-xl leading-snug text-green-deep">{course.title}</h1>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-charcoal-muted">
                  <span>
                    {enrolled.completedLessons.length} de {course.lessonCount} lecciones
                  </span>
                  <span className="font-semibold tabular-nums text-green-deep">
                    {enrolled.progressPercent}%
                  </span>
                </div>
                <ProgressBar percent={enrolled.progressPercent} className="mt-2" />
              </div>

              <ul className="mt-5 space-y-2 text-sm text-charcoal-muted">
                <li className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-green-olive" aria-hidden />
                  {course.modules.length} módulos
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-olive" aria-hidden />
                  {formatDuration(course.durationMinutes)} de video
                </li>
              </ul>

              {!isComplete && nextLesson && (
                <Link
                  href={`/mi-cuenta/${course.slug}/${nextLesson.slug}`}
                  className={cn(buttonVariants({ variant: "primary" }), "mt-6 w-full")}
                >
                  <PlayCircle className="h-4 w-4" aria-hidden />
                  {enrolled.completedLessons.length === 0 ? "Empezar" : "Continuar"}
                </Link>
              )}
            </div>
          </div>

          {isComplete && (
            <div className="mt-4">
              <CertificateCard courseSlug={course.slug} courseTitle={course.title} />
            </div>
          )}
        </aside>

        {/* Temario */}
        <div>
          <h2 className="font-display text-display-sm font-medium text-green-deep">Contenido</h2>
          <p className="mt-2 text-sm text-charcoal-muted">
            Ve las lecciones en el orden que quieras. Tu avance se guarda automáticamente.
          </p>
          <div className="mt-6">
            <Curriculum
              course={course}
              hasAccess
              completedLessons={enrolled.completedLessons}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
