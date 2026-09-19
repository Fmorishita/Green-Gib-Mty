import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export interface SessionUser {
  id: string;
  email: string;
  fullName: string | null;
}

/**
 * Usuario autenticado, o null.
 *
 * Usa getUser(), que revalida el token contra Supabase. getSession() sólo lee
 * la cookie y no sirve para decidir accesos.
 *
 * `cache` deduplica la llamada dentro del mismo render.
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const supabase = createClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  return {
    id: user.id,
    email: user.email ?? "",
    fullName:
      (user.user_metadata?.full_name as string | undefined) ??
      (user.user_metadata?.name as string | undefined) ??
      null,
  };
});

/** True si la plataforma de cursos tiene Supabase configurado. */
export function isCoursesPlatformEnabled(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
