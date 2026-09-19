"use server";

import { createClient } from "@/lib/supabase/server";
import { getCourseBySlug } from "@/lib/data/courses";
import { orderSchema, type OrderInput } from "@/lib/validations/order";

export interface OrderResult {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  /** Correo con el que quedó registrada la compra. */
  email?: string;
}

/**
 * Registra una compra SIN requerir cuenta.
 *
 * El alumno paga primero y crea su cuenta después: la orden queda ligada al
 * correo y se convierte en inscripción activa cuando esa persona se registra
 * con ese mismo correo (ver claim_paid_orders en supabase/courses.sql).
 *
 * La orden se crea siempre como `pending_payment`; marcarla como pagada es
 * tarea de dirección o del webhook de la pasarela, y la política RLS impide
 * que el cliente la cree ya pagada.
 */
export async function createOrder(input: OrderInput): Promise<OrderResult> {
  // Honeypot: un humano no ve este campo.
  if (input.company && input.company.trim() !== "") {
    return { ok: true, email: input.email };
  }

  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Revisa los campos marcados.", fieldErrors };
  }

  const course = getCourseBySlug(parsed.data.course_slug);
  if (!course) return { ok: false, error: "El curso no existe." };

  const supabase = createClient();
  if (!supabase) {
    return {
      ok: false,
      error: "La plataforma no está disponible por el momento. Escríbenos por WhatsApp.",
    };
  }

  const { data: courseRow } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", parsed.data.course_slug)
    .maybeSingle();

  if (!courseRow) {
    return {
      ok: false,
      error: "El catálogo aún no está publicado. Escríbenos por WhatsApp y te damos acceso.",
    };
  }

  const { error } = await supabase.from("course_orders").insert({
    course_id: courseRow.id,
    full_name: parsed.data.full_name,
    email: parsed.data.email.toLowerCase(),
    phone: parsed.data.phone || null,
    amount: course.price,
    status: "pending_payment",
  });

  if (error) {
    return { ok: false, error: "No pudimos registrar tu compra. Intenta de nuevo." };
  }

  return { ok: true, email: parsed.data.email };
}

/**
 * Convierte en inscripciones las órdenes ya pagadas del correo del usuario.
 * Se llama al entrar al panel. Es idempotente.
 */
export async function claimPaidOrders(): Promise<number> {
  const supabase = createClient();
  if (!supabase) return 0;

  const { data, error } = await supabase.rpc("claim_paid_orders");
  if (error) return 0;
  return typeof data === "number" ? data : 0;
}
