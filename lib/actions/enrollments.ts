"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/session";
import { getCourseBySlug } from "@/lib/data/courses";

export interface EnrollResult {
  ok: boolean;
  error?: string;
  /** Estado resultante de la inscripción. */
  status?: "pending_payment" | "active";
}

/**
 * Registra la intención de compra de un curso.
 *
 * Crea la inscripción en estado `pending_payment`. La activación NO ocurre
 * aquí: corresponde al webhook de la pasarela de pago, que corre con
 * service_role. La política RLS de `enrollments` impide que el cliente se
 * auto-active, así que esta ruta no puede usarse para colarse al contenido.
 *
 * Mientras no haya pasarela contratada, dirección activa manualmente la
 * inscripción desde el panel de Supabase tras confirmar el pago.
 */
export async function requestEnrollment(courseSlug: string): Promise<EnrollResult> {
  const course = getCourseBySlug(courseSlug);
  if (!course) return { ok: false, error: "El curso no existe." };

  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Inicia sesión para continuar con la compra." };

  const supabase = createClient();
  if (!supabase) return { ok: false, error: "La plataforma no está disponible por el momento." };

  const { data: courseRow, error: courseError } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", courseSlug)
    .maybeSingle();

  if (courseError || !courseRow) {
    return {
      ok: false,
      error: "El catálogo aún no está publicado en la base de datos. Escríbenos por WhatsApp.",
    };
  }

  const { data: existing } = await supabase
    .from("enrollments")
    .select("status")
    .eq("user_id", user.id)
    .eq("course_id", courseRow.id)
    .maybeSingle();

  if (existing) {
    return { ok: true, status: existing.status === "active" ? "active" : "pending_payment" };
  }

  const { error } = await supabase.from("enrollments").insert({
    user_id: user.id,
    course_id: courseRow.id,
    status: "pending_payment",
    price_paid: course.price,
  });

  if (error) {
    return { ok: false, error: "No pudimos registrar tu inscripción. Intenta de nuevo." };
  }

  revalidatePath("/mi-cuenta");
  return { ok: true, status: "pending_payment" };
}

/** Marca una lección como vista o no vista. */
export async function toggleLessonComplete(
  courseSlug: string,
  lessonSlug: string,
  completed: boolean
): Promise<{ ok: boolean; error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Sesión expirada." };

  const supabase = createClient();
  if (!supabase) return { ok: false, error: "Plataforma no disponible." };

  const { data: lesson } = await supabase
    .from("course_lessons")
    .select("id, course_id, courses!inner(slug)")
    .eq("slug", lessonSlug)
    .eq("courses.slug", courseSlug)
    .maybeSingle();

  if (!lesson) return { ok: false, error: "Lección no encontrada." };

  // La RLS de lesson_progress vuelve a comprobar la inscripción activa,
  // así que esta escritura no puede usarse sin acceso al curso.
  const { error } = await supabase.from("lesson_progress").upsert(
    {
      user_id: user.id,
      lesson_id: lesson.id,
      course_id: lesson.course_id,
      completed,
      completed_at: completed ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lesson_id" }
  );

  if (error) return { ok: false, error: "No pudimos guardar tu progreso." };

  revalidatePath(`/mi-cuenta/${courseSlug}`);
  return { ok: true };
}
