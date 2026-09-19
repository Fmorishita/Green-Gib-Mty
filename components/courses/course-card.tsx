import Link from "next/link";
import { Clock, PlayCircle, BarChart3 } from "lucide-react";
import { Figure } from "@/components/ui/figure";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { formatDuration } from "@/lib/data/courses";
import type { Course } from "@/types";

/** Tarjeta de curso para el catálogo público. */
export function CourseCard({ course, priority }: { course: Course; priority?: boolean }) {
  return (
    <Link
      href={`/cursos/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-stone/40 bg-cream transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep/60 focus-visible:ring-offset-2"
    >
      <div className="relative overflow-hidden">
        <Figure
          src={course.cover}
          alt={course.title}
          variant="green"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="aspect-[16/10] w-full transition-transform duration-500 ease-smooth group-hover:scale-105"
        />
        {course.compareAtPrice && (
          <span className="absolute left-4 top-4 rounded-full bg-terracotta px-3 py-1 text-xs font-semibold text-cream">
            Precio de lanzamiento
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Badge variant="olive" className="w-fit">
          {course.level}
        </Badge>
        <h3 className="mt-3 font-display text-xl leading-snug text-green-deep">{course.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-muted">{course.subtitle}</p>

        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-charcoal-light">
          <li className="inline-flex items-center gap-1.5">
            <PlayCircle className="h-3.5 w-3.5 text-green-olive" aria-hidden />
            {course.lessonCount} lecciones
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-green-olive" aria-hidden />
            {formatDuration(course.durationMinutes)}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5 text-green-olive" aria-hidden />
            {course.level}
          </li>
        </ul>

        <div className="mt-5 flex items-baseline gap-2 border-t border-stone/40 pt-4">
          <span className="font-display text-2xl text-green-deep">{formatPrice(course.price)}</span>
          {course.compareAtPrice && (
            <span className="text-sm text-charcoal-light line-through">
              {formatPrice(course.compareAtPrice)}
            </span>
          )}
          <span className="ml-auto text-xs font-medium text-green-olive">Acceso permanente</span>
        </div>
      </div>
    </Link>
  );
}
