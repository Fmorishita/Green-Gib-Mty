import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/session";
import { getCourseBySlug, courses, getCourseLessons } from "@/lib/data/courses";
import type { Course } from "@/types";

export interface EnrolledCourse {
  course: Course;
  status: "pending_payment" | "active" | "expired" | "cancelled";
  completedLessons: string[];
  progressPercent: number;
}

/**
 * Cursos del usuario con su progreso.
 *
 * El catálogo se resuelve desde lib/data/courses (misma fuente que el sitio
 * público); de Supabase sólo salen la inscripción y el progreso, que son los
 * datos que sí dependen del usuario.
 */
export async function getMyCourses(): Promise<EnrolledCourse[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const supabase = createClient();
  if (!supabase) return [];

  const { data: enrollments, error } = await supabase
    .from("enrollments")
    .select("status, course_id, courses!inner(slug)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !enrollments) return [];

  const { data: progress } = await supabase
    .from("lesson_progress")
    .select("completed, course_lessons!inner(slug, course_id)")
    .eq("user_id", user.id)
    .eq("completed", true);

  const completedByCourse = new Map<string, string[]>();
  for (const row of progress ?? []) {
    const lesson = row.course_lessons as unknown as { slug: string; course_id: string };
    const list = completedByCourse.get(lesson.course_id) ?? [];
    list.push(lesson.slug);
    completedByCourse.set(lesson.course_id, list);
  }

  const result: EnrolledCourse[] = [];
  for (const row of enrollments) {
    const slug = (row.courses as unknown as { slug: string }).slug;
    const course = getCourseBySlug(slug);
    if (!course) continue;

    const completedLessons = completedByCourse.get(row.course_id) ?? [];
    const total = course.lessonCount || 1;
    result.push({
      course,
      status: row.status as EnrolledCourse["status"],
      completedLessons,
      progressPercent: Math.round((completedLessons.length / total) * 100),
    });
  }

  return result;
}

/** Devuelve el curso inscrito si el usuario tiene acceso activo; si no, null. */
export async function getEnrolledCourse(slug: string): Promise<EnrolledCourse | null> {
  const mine = await getMyCourses();
  const found = mine.find((e) => e.course.slug === slug);
  if (!found || found.status !== "active") return null;
  return found;
}

/**
 * URL reproducible de una lección.
 *
 * La tabla `lesson_videos` ya está protegida por RLS (sólo lecciones de
 * muestra o con inscripción activa), así que si esta consulta devuelve algo,
 * el usuario tiene derecho a verlo. Cuando la fuente es el bucket privado, se
 * firma una URL temporal en lugar de exponer la ruta.
 */
export async function getLessonVideoUrl(
  courseSlug: string,
  lessonSlug: string
): Promise<string | null> {
  const supabase = createClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("lesson_videos")
    .select("video_url, course_lessons!inner(slug, courses!inner(slug))")
    .eq("course_lessons.slug", lessonSlug)
    .eq("course_lessons.courses.slug", courseSlug)
    .maybeSingle();

  if (!data?.video_url) return null;

  const raw = data.video_url as string;
  if (!raw.startsWith("course-videos/")) return raw;

  const path = raw.replace(/^course-videos\//, "");
  const { data: signed } = await supabase.storage
    .from("course-videos")
    .createSignedUrl(path, 60 * 60);

  return signed?.signedUrl ?? null;
}

/** Datos de ejemplo para la vista previa pública del panel. */
export function getPreviewPanelData(): EnrolledCourse[] {
  const muros = courses.find((c) => c.slug === "instalacion-de-muros-verdes");
  const riego = courses.find((c) => c.slug === "sistemas-de-riego-eficiente");
  const terminado = courses.find((c) => c.slug === "mantenimiento-profesional-areas-verdes");
  const data: EnrolledCourse[] = [];
  if (muros) {
    data.push({
      course: muros,
      status: "active",
      completedLessons: [
        "bienvenida",
        "anatomia-muro-verde",
        "tipos-de-sistema",
        "errores-comunes",
        "levantamiento",
        "calculo-de-carga",
      ],
      progressPercent: 25,
    });
  }
  if (riego) {
    data.push({
      course: riego,
      status: "active",
      completedLessons: ["bienvenida", "por-que-falla-el-riego"],
      progressPercent: 14,
    });
  }
  if (terminado) {
    // Un curso al 100% para que la maqueta muestre también el estado final:
    // insignia de completado y acceso al certificado.
    data.push({
      course: terminado,
      status: "active",
      completedLessons: getCourseLessons(terminado).map((l) => l.slug),
      progressPercent: 100,
    });
  }
  return data;
}
