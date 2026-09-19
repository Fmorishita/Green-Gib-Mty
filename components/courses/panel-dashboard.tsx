import Link from "next/link";
import { PlayCircle, Clock, Hourglass, ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Figure } from "@/components/ui/figure";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/courses/progress-bar";
import { buttonVariants } from "@/components/ui/button";
import { formatDuration, getCourseLessons } from "@/lib/data/courses";
import { cn } from "@/lib/utils";
import type { EnrolledCourse } from "@/lib/courses/access";

/** Cuerpo del panel: se usa tanto en /mi-cuenta como en la vista previa pública. */
export function PanelDashboard({
  courses,
  userName,
}: {
  courses: EnrolledCourse[];
  userName: string | null;
}) {
  const active = courses.filter((c) => c.status === "active");
  const pending = courses.filter((c) => c.status === "pending_payment");

  return (
    <Container className="py-12">
      <div className="mb-10">
        <h1 className="font-display text-display-md font-medium text-green-deep">
          {userName ? `Hola, ${userName.split(" ")[0]}` : "Mis cursos"}
        </h1>
        <p className="mt-2 text-charcoal-muted">
          {active.length > 0
            ? "Continúa donde te quedaste."
            : "Aquí van a aparecer los cursos que compres."}
        </p>
      </div>

      {/* Pendientes de pago */}
      {pending.length > 0 && (
        <div className="mb-10 space-y-4">
          {pending.map(({ course }) => (
            <div
              key={course.slug}
              className="flex flex-col gap-4 rounded-xl border border-terracotta/30 bg-terracotta/5 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <Hourglass className="mt-0.5 h-5 w-5 flex-shrink-0 text-terracotta" aria-hidden />
                <div>
                  <p className="font-medium text-charcoal">{course.title}</p>
                  <p className="text-sm text-charcoal-muted">
                    Inscripción registrada. Se activa en cuanto confirmemos tu pago.
                  </p>
                </div>
              </div>
              <Link
                href={`/cursos/${course.slug}/comprar`}
                className={cn(buttonVariants({ variant: "terracotta", size: "sm" }), "flex-shrink-0")}
              >
                Completar pago
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Cursos activos */}
      {active.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {active.map(({ course, completedLessons, progressPercent }) => {
            const flat = getCourseLessons(course);
            const nextLesson = flat.find((l) => !completedLessons.includes(l.slug)) ?? flat[0];
            const isDone = progressPercent >= 100;

            return (
              <div
                key={course.slug}
                className="flex flex-col overflow-hidden rounded-xl border border-stone/40 bg-cream sm:flex-row"
              >
                <Figure
                  src={course.cover}
                  alt={course.title}
                  variant="green"
                  sizes="(max-width: 640px) 100vw, 220px"
                  className="h-40 w-full flex-shrink-0 sm:h-auto sm:w-48"
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-display text-lg leading-snug text-green-deep">
                      {course.title}
                    </h2>
                    {isDone && <Badge variant="olive">Completado</Badge>}
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-charcoal-muted">
                      <span>
                        {completedLessons.length} de {course.lessonCount} lecciones
                      </span>
                      <span className="font-semibold tabular-nums text-green-deep">
                        {progressPercent}%
                      </span>
                    </div>
                    <ProgressBar percent={progressPercent} className="mt-2" />
                  </div>

                  <div className="mt-auto pt-5">
                    {!isDone && nextLesson && (
                      <p className="mb-3 text-xs text-charcoal-light">
                        <span className="font-medium text-charcoal">Sigue:</span> {nextLesson.title}
                        <span className="ml-1.5 inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden />
                          {formatDuration(nextLesson.durationMinutes)}
                        </span>
                      </p>
                    )}
                    <Link
                      href={
                        nextLesson
                          ? `/mi-cuenta/${course.slug}/${nextLesson.slug}`
                          : `/mi-cuenta/${course.slug}`
                      }
                      className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
                    >
                      <PlayCircle className="h-4 w-4" aria-hidden />
                      {completedLessons.length === 0 ? "Empezar curso" : isDone ? "Repasar" : "Continuar"}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        pending.length === 0 && (
          <div className="rounded-2xl border border-dashed border-stone bg-cream-dark/40 p-12 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-stone-dark" aria-hidden />
            <h2 className="mt-4 font-display text-xl text-green-deep">
              Todavía no tienes cursos
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-charcoal-muted">
              Explora el catálogo y elige el que necesites. Una vez que compres, aparece aquí
              con acceso permanente.
            </p>
            <Link
              href="/cursos"
              className={cn(buttonVariants({ variant: "primary" }), "mt-6")}
            >
              Ver catálogo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        )
      )}
    </Container>
  );
}
