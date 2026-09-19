"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  signInSchema,
  signUpSchema,
  resetSchema,
  type SignInInput,
  type SignUpInput,
} from "@/lib/validations/auth";
import { SITE_URL } from "@/lib/seo";

export interface AuthResult {
  ok: boolean;
  error?: string;
  /** Mensaje de éxito cuando no hay redirección (p. ej. confirmar correo). */
  message?: string;
  fieldErrors?: Record<string, string>;
}

const NOT_CONFIGURED =
  "La plataforma de cursos aún no está activa. Escríbenos por WhatsApp y te damos acceso.";

function collectErrors(issues: { path: (string | number)[]; message: string }[]) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

/** Traduce los errores de Supabase Auth a mensajes en español. */
function translateAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) {
    return "Correo o contraseña incorrectos.";
  }
  if (m.includes("email not confirmed")) {
    return "Todavía no confirmas tu correo. Revisa tu bandeja de entrada.";
  }
  if (m.includes("user already registered") || m.includes("already been registered")) {
    return "Ya existe una cuenta con este correo. Inicia sesión.";
  }
  if (m.includes("rate limit") || m.includes("too many")) {
    return "Demasiados intentos. Espera un momento y vuelve a intentar.";
  }
  if (m.includes("password")) {
    return "La contraseña no cumple los requisitos mínimos.";
  }
  return "No pudimos completar la operación. Intenta de nuevo.";
}

export async function signIn(input: SignInInput, redirectTo?: string): Promise<AuthResult> {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Revisa los campos marcados.", fieldErrors: collectErrors(parsed.error.issues) };
  }

  const supabase = createClient();
  if (!supabase) return { ok: false, error: NOT_CONFIGURED };

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) return { ok: false, error: translateAuthError(error.message) };

  revalidatePath("/", "layout");
  redirect(redirectTo && redirectTo.startsWith("/") ? redirectTo : "/mi-cuenta");
}

export async function signUp(input: SignUpInput, redirectTo?: string): Promise<AuthResult> {
  const parsed = signUpSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Revisa los campos marcados.", fieldErrors: collectErrors(parsed.error.issues) };
  }

  const supabase = createClient();
  if (!supabase) return { ok: false, error: NOT_CONFIGURED };

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.full_name, phone: parsed.data.phone || null },
      emailRedirectTo: `${SITE_URL}/acceso`,
    },
  });

  if (error) return { ok: false, error: translateAuthError(error.message) };

  // Con confirmación de correo activada no hay sesión todavía.
  if (!data.session) {
    return {
      ok: true,
      message:
        "Te enviamos un correo para confirmar tu cuenta. Ábrelo y después inicia sesión aquí.",
    };
  }

  revalidatePath("/", "layout");
  redirect(redirectTo && redirectTo.startsWith("/") ? redirectTo : "/mi-cuenta");
}

export async function signOut(): Promise<void> {
  const supabase = createClient();
  if (supabase) await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function requestPasswordReset(email: string): Promise<AuthResult> {
  const parsed = resetSchema.safeParse({ email });
  if (!parsed.success) {
    return { ok: false, error: "Ingresa un correo válido." };
  }

  const supabase = createClient();
  if (!supabase) return { ok: false, error: NOT_CONFIGURED };

  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${SITE_URL}/acceso`,
  });

  // Respuesta idéntica exista o no la cuenta: no revelamos qué correos
  // están registrados.
  return {
    ok: true,
    message: "Si ese correo tiene una cuenta, te enviamos las instrucciones para recuperarla.",
  };
}
