import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Curriculum } from "@/components/courses/curriculum";
import { LessonPlayer } from "@/components/courses/lesson-player";
import { ProgressBar } from "@/components/courses/progress-bar";
import { getCourseBySlug, getLessonContext } from "@/lib/data/courses";
import { getEnrolledCourse, getLessonVideoUrl } from "@/lib/courses/access";

export const metadata: Metadata = {
  title: "Lección | Green Gib",
  robots: { index: false, follow: false },
};

export default async function LeccionPage({
  params,
}: {
  params: { curso: string; leccion: string };
}) {
  const course = getCourseBySlug(params.curso);
  if (!course) notFound();

  const enrolled = await getEnrolledCourse(params.curso);
  if (!enrolled) redirect(`/cursos/${params.curso}`);

  const context = getLessonContext(course, params.leccion);
  if (!context) notFound();

  // La RLS de lesson_videos vuelve a verificar el acceso del lado de la base.
  const videoUrl = await getLessonVideoUrl(params.curso, params.leccion);

  return (
    <Container className="py-8">
      <Link
        href={`/mi-cuenta/${course.slug}`}
        className="inline-flex items-center gap-1.5 text-sm text-charcoal-muted transition-colors hover:text-green-deep"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {course.title}
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.9fr_1fr] lg:gap-10">
        <div className="min-w-0">
          <LessonPlayer
            courseSlug={course.slug}
            lesson={context.lesson}
            videoUrl={videoUrl}
            initiallyCompleted={enrolled.completedLessons.includes(context.lesson.slug)}
            previous={context.previous}
            next={context.next}
            index={context.index}
            total={context.total}
          />
        </div>

        <aside className="min-w-0 lg:sticky lg:top-24 lg:h-fit lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          <div className="mb-4 rounded-lg border border-stone/40 bg-cream p-4">
            <div className="flex items-center justify-between text-xs text-charcoal-muted">
              <span>Tu avance</span>
              <span className="font-semibold tabular-nums text-green-deep">
                {enrolled.progressPercent}%
              </span>
            </div>
            <ProgressBar percent={enrolled.progressPercent} className="mt-2" />
          </div>
          <Curriculum
            course={course}
            hasAccess
            compact
            completedLessons={enrolled.completedLessons}
            activeLessonSlug={context.lesson.slug}
          />
        </aside>
      </div>
    </Container>
  );
}
