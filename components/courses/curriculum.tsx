"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, PlayCircle, Lock, CheckCircle2 } from "lucide-react";
import { formatDuration } from "@/lib/data/courses";
import { cn } from "@/lib/utils";
import type { Course } from "@/types";

interface CurriculumProps {
  course: Course;
  /** Con acceso, cada lección enlaza al reproductor. */
  hasAccess?: boolean;
  completedLessons?: string[];
  /** Lección resaltada (vista del reproductor). */
  activeLessonSlug?: string;
  /** Compacta, para la barra lateral del reproductor. */
  compact?: boolean;
  /** Muestra el contenido desbloqueado pero sin enlazar (vista previa). */
  readOnly?: boolean;
}

/** Temario del curso, con acordeón por módulo. */
export function Curriculum({
  course,
  hasAccess = false,
  completedLessons = [],
  activeLessonSlug,
  compact = false,
  readOnly = false,
}: CurriculumProps) {
  const activeModuleIndex = course.modules.findIndex((m) =>
    m.lessons.some((l) => l.slug === activeLessonSlug)
  );
  const [open, setOpen] = useState<number[]>(
    activeModuleIndex >= 0 ? [activeModuleIndex] : [0]
  );

  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <div className={cn("space-y-3", compact && "space-y-2")}>
      {course.modules.map((module, i) => {
        const isOpen = open.includes(i);
        const moduleMinutes = module.lessons.reduce((s, l) => s + l.durationMinutes, 0);
        const done = module.lessons.filter((l) => completedLessons.includes(l.slug)).length;

        return (
          <div
            key={module.title}
            className={cn(
              "overflow-hidden rounded-xl border border-stone/40 bg-cream",
              compact && "rounded-lg"
            )}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className={cn(
                "flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-cream-dark/50",
                compact && "px-4 py-3"
              )}
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-green-olive">
                  Módulo {i + 1}
                </p>
                <h3
                  className={cn(
                    "mt-0.5 font-display text-green-deep",
                    compact ? "text-base" : "text-lg"
                  )}
                >
                  {module.title}
                </h3>
                <p className="mt-1 text-xs text-charcoal-light">
                  {module.lessons.length} lecciones · {formatDuration(moduleMinutes)}
                  {hasAccess && ` · ${done}/${module.lessons.length} vistas`}
                </p>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 flex-shrink-0 text-green-deep transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
                aria-hidden
              />
            </button>

            {isOpen && (
              <ul className="border-t border-stone/40">
                {module.lessons.map((lesson) => {
                  const isDone = completedLessons.includes(lesson.slug);
                  const isActive = lesson.slug === activeLessonSlug;
                  const unlocked = hasAccess || lesson.isPreview;

                  const inner = (
                    <>
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center">
                        {isDone ? (
                          <CheckCircle2 className="h-5 w-5 text-green-olive" aria-hidden />
                        ) : unlocked ? (
                          <PlayCircle className="h-5 w-5 text-green-deep/60" aria-hidden />
                        ) : (
                          <Lock className="h-4 w-4 text-stone-dark" aria-hidden />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={cn("block text-sm", isActive ? "font-semibold text-green-deep" : "text-charcoal")}>
                          {lesson.title}
                        </span>
                        {lesson.isPreview && !hasAccess && (
                          <span className="mt-0.5 block text-xs font-medium text-terracotta">
                            Lección de muestra · gratis
                          </span>
                        )}
                      </span>
                      <span className="flex-shrink-0 text-xs tabular-nums text-charcoal-light">
                        {formatDuration(lesson.durationMinutes)}
                      </span>
                    </>
                  );

                  const rowClass = cn(
                    "flex w-full items-center gap-3 px-5 py-3 text-left transition-colors",
                    compact && "px-4 py-2.5",
                    isActive && "bg-green-deep/5",
                    unlocked ? "hover:bg-cream-dark/60" : "cursor-default opacity-75"
                  );

                  return (
                    <li key={lesson.slug} className="border-b border-stone/25 last:border-b-0">
                      {hasAccess && !readOnly ? (
                        <Link href={`/mi-cuenta/${course.slug}/${lesson.slug}`} className={rowClass}>
                          {inner}
                        </Link>
                      ) : (
                        <div className={rowClass}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
