"use server";

import { leadSchema, type LeadInput } from "@/lib/validations/lead";
import { createClient } from "@/lib/supabase/server";

export interface LeadActionResult {
  ok: boolean;
  error?: string;
  /** True si el lead se persistió en Supabase; false si solo hubo fallback. */
  persisted?: boolean;
  fieldErrors?: Partial<Record<keyof LeadInput, string>>;
}

/**
 * Server Action: valida y guarda un lead.
 *
 * - Valida con Zod.
 * - Si Supabase está configurado, inserta en la tabla `leads`.
 * - Si no, registra el lead en el log del servidor (fallback documentado en
 *   el README) y devuelve ok:true para no romper la experiencia del usuario.
 */
export async function submitLead(input: LeadInput): Promise<LeadActionResult> {
  // Honeypot: un humano nunca ve este campo. Si viene lleno, es un bot.
  // Devolvemos ok para no darle señal de que fue detectado.
  if (input.company && input.company.trim() !== "") {
    return { ok: true, persisted: false };
  }

  const parsed = leadSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof LeadInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof LeadInput;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Revisa los campos marcados.", fieldErrors };
  }

  const data = parsed.data;
  const supabase = createClient();

  // Fallback: sin Supabase configurado, no rompemos el flujo del usuario.
  if (!supabase) {
    // eslint-disable-next-line no-console
    console.warn(
      "[leads] Supabase no configurado. Lead recibido (no persistido):",
      JSON.stringify({ ...data, message: data.message ? "[...]" : undefined })
    );
    return { ok: true, persisted: false };
  }

  const { error } = await supabase.from("leads").insert({
    name: data.name,
    phone: data.phone,
    email: data.email || null,
    project_type: data.project_type || null,
    budget_range: data.budget_range || null,
    location: data.location || null,
    message: data.message || null,
    source: data.source || "website",
    status: "new",
  });

  if (error) {
    // eslint-disable-next-line no-console
    console.error("[leads] Error al guardar en Supabase:", error.message);
    return {
      ok: false,
      error: "No pudimos guardar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.",
    };
  }

  return { ok: true, persisted: true };
}
