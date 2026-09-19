"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, ChevronLeft, ChevronRight, Loader2, Download, PlayCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { toggleLessonComplete } from "@/lib/actions/enrollments";
import { formatDuration } from "@/lib/data/courses";
import { cn } from "@/lib/utils";
import type { CourseLesson } from "@/types";

interface LessonPlayerProps {
  courseSlug: string;
  lesson: CourseLesson & { moduleTitle: string };
  videoUrl: string | null;
  initiallyCompleted: boolean;
  previous: CourseLesson | null;
  next: CourseLesson | null;
  index: number;
  total: number;
  resourceUrl?: string | null;
  /** Vista previa pública: los controles no escriben nada. */
  demo?: boolean;
}

/** Reproductor de la lección con navegación y marcado de avance. */
export function LessonPlayer({
  courseSlug,
  lesson,
  videoUrl,
  initiallyCompleted,
  previous,
  next,
  index,
  total,
  resourceUrl,
  demo = false,
}: LessonPlayerProps) {
  const [completed, setCompleted] = useState(initiallyCompleted);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const toggle = () => {
    if (demo) {
      setCompleted((v) => !v);
      return;
    }
    setError(null);
    const nextValue = !completed;
    setCompleted(nextValue); // optimista
    startTransition(async () => {
      const result = await toggleLessonComplete(courseSlug, lesson.slug, nextValue);
      if (!result.ok) {
        setCompleted(!nextValue); // revertir
        setError(result.error ?? "No pudimos guardar tu progreso.");
      }
    });
  };

  return (
    // min-w-0: como hijo de grid, su ancho intrínseco desbordaría en móvil.
    <div className="min-w-0">
      {/* Video */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-charcoal">
        {videoUrl ? (
          <video
            key={videoUrl}
            controls
            controlsList="nodownload"
            playsInline
            className="h-full w-full"
            aria-label={lesson.title}
          >
            <source src={videoUrl} />
            Tu navegador no puede reproducir este video.
          </video>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
            <PlayCircle className="h-14 w-14 text-cream/30" aria-hidden />
            <p className="text-sm font-medium text-cream/80">
              {demo ? "Vista previa del reproductor" : "Este video aún no está disponible"}
            </p>
            <p className="max-w-sm text-xs text-cream/50">
              {demo
                ? "Así se ve el reproductor. Al publicar los videos, aquí aparece la lección."
                : "Estamos terminando de subir esta lección. Las demás ya están disponibles."}
            </p>
          </div>
        )}
      </div>

      {/* Encabezado de la lección */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-olive">
            {lesson.moduleTitle} · Lección {index + 1} de {total}
          </p>
          <h1 className="mt-1.5 font-display text-2xl leading-snug text-green-deep">
            {lesson.title}
          </h1>
          <p className="mt-1 text-sm text-charcoal-light">
            {formatDuration(lesson.durationMinutes)}
          </p>
        </div>

        <Button
          variant={completed ? "secondary" : "primary"}
          onClick={toggle}
          disabled={isPending}
          className="flex-shrink-0"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : completed ? (
            <CheckCircle2 className="h-4 w-4" aria-hidden />
          ) : (
            <Circle className="h-4 w-4" aria-hidden />
          )}
          {completed ? "Lección vista" : "Marcar como vista"}
        </Button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-terracotta-dark" role="alert">
          {error}
        </p>
      )}

      {resourceUrl && (
        <a
          href={resourceUrl}
          className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "mt-5")}
          download
        >
          <Download className="h-4 w-4" aria-hidden />
          Descargar material de esta lección
        </a>
      )}

      {/* Navegación */}
      <div className="mt-8 flex items-center justify-between gap-4 border-t border-stone/40 pt-6">
        {previous ? (
          <Link
            href={`/mi-cuenta/${courseSlug}/${previous.slug}`}
            className="group flex min-w-0 items-center gap-2 text-sm text-charcoal-muted transition-colors hover:text-green-deep"
          >
            <ChevronLeft className="h-4 w-4 flex-shrink-0" aria-hidden />
            <span className="min-w-0">
              <span className="block text-xs text-charcoal-light">Anterior</span>
              <span className="block truncate font-medium">{previous.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/mi-cuenta/${courseSlug}/${next.slug}`}
            className="group flex min-w-0 items-center gap-2 text-right text-sm text-charcoal-muted transition-colors hover:text-green-deep"
          >
            <span className="min-w-0">
              <span className="block text-xs text-charcoal-light">Siguiente</span>
              <span className="block truncate font-medium">{next.title}</span>
            </span>
            <ChevronRight className="h-4 w-4 flex-shrink-0" aria-hidden />
          </Link>
        ) : (
          <Link
            href={`/mi-cuenta/${courseSlug}`}
            className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
          >
            Terminar curso
          </Link>
        )}
      </div>
    </div>
  );
}
