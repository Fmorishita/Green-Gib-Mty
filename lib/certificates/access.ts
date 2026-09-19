import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/session";
import { getCourseBySlug, formatDuration } from "@/lib/data/courses";
import { founder } from "@/lib/data/founder";
import { generateCertificatePdf } from "@/lib/certificates/pdf";

export interface CertificateRecord {
  code: string;
  recipientName: string;
  issuedAt: Date;
}

/**
 * Emite el certificado si el alumno ya completó el 100% del curso
 * (idempotente: si ya existe, sólo lo devuelve). La verificación real de
 * "completó el curso" ocurre dentro de la función de Postgres
 * `issue_certificate_if_completed`, no aquí — así un cliente no puede
 * fabricarse un certificado llamando a la Server Action con datos falsos.
 */
export async function issueCertificateIfCompleted(
  courseSlug: string
): Promise<{ ok: true; certificate: CertificateRecord } | { ok: false; error: string }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Inicia sesión para descargar tu certificado." };

  const supabase = createClient();
  if (!supabase) return { ok: false, error: "La plataforma no está disponible por el momento." };

  const { data, error } = await supabase
    .rpc("issue_certificate_if_completed", { target_course_slug: courseSlug })
    .returns<{ code: string; recipient_name: string; issued_at: string }[]>()
    .single();

  if (error || !data) {
    return {
      ok: false,
      error: "Todavía no has completado todas las lecciones de este curso.",
    };
  }

  return {
    ok: true,
    certificate: {
      code: data.code,
      recipientName: data.recipient_name,
      issuedAt: new Date(data.issued_at),
    },
  };
}

/**
 * Genera el PDF de un certificado ya emitido, verificando que quien lo pide
 * sea su dueño. Se usa desde el Route Handler de descarga.
 */
export async function renderOwnedCertificatePdf(
  code: string
): Promise<{ ok: true; bytes: Uint8Array; fileName: string } | { ok: false; status: number; error: string }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, status: 401, error: "Inicia sesión para descargar este certificado." };

  const supabase = createClient();
  if (!supabase) return { ok: false, status: 503, error: "Plataforma no disponible." };

  // RLS ya limita esta lectura a los certificados del propio usuario, pero
  // filtramos también por user_id explícitamente para que la intención del
  // código sea clara sin depender únicamente de la política de la base.
  const { data: cert } = await supabase
    .from("course_certificates")
    .select("code, recipient_name, issued_at, course_id, courses!inner(slug, title, level, duration_minutes)")
    .eq("code", code.toUpperCase())
    .eq("user_id", user.id)
    .maybeSingle();

  if (!cert) return { ok: false, status: 404, error: "Certificado no encontrado." };

  const course = cert.courses as unknown as {
    slug: string;
    title: string;
    level: string;
    duration_minutes: number;
  };
  // Fuente de verdad del temario/nivel: lib/data/courses.ts (igual que el
  // resto del sitio); de la base sólo usamos lo que identifica al curso.
  const courseData = getCourseBySlug(course.slug);

  const bytes = await generateCertificatePdf({
    recipientName: cert.recipient_name,
    courseTitle: courseData?.title ?? course.title,
    courseLevel: courseData?.level ?? course.level,
    durationLabel: formatDuration(courseData?.durationMinutes ?? course.duration_minutes),
    code: cert.code,
    issuedAt: new Date(cert.issued_at),
    signerName: founder.name,
    signerRole: founder.role,
  });

  const safeSlug = course.slug.replace(/[^a-z0-9-]/gi, "");
  return { ok: true, bytes, fileName: `certificado-green-gib-${safeSlug}.pdf` };
}

/** Para la página pública de verificación. No requiere sesión. */
export async function verifyCertificate(code: string): Promise<{
  valid: boolean;
  recipientName?: string;
  courseTitle?: string;
  issuedAt?: Date;
}> {
  const supabase = createClient();
  if (!supabase) return { valid: false };

  const { data } = await supabase
    .rpc("verify_certificate", { input_code: code })
    .returns<{ code: string; recipient_name: string; course_title: string; issued_at: string }[]>()
    .single();

  if (!data) return { valid: false };

  return {
    valid: true,
    recipientName: data.recipient_name,
    courseTitle: data.course_title,
    issuedAt: new Date(data.issued_at),
  };
}
