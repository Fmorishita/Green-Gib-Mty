import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refresca la sesión de Supabase en cada request y protege el panel privado.
 *
 * Si Supabase no está configurado, deja pasar todo: el sitio de marketing
 * debe seguir funcionando aunque la plataforma de cursos no esté activa.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return response;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // getUser() revalida el token contra Supabase. No usar getSession() aquí:
  // lee la cookie sin verificarla, así que no sirve para proteger rutas.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (!user && pathname.startsWith("/mi-cuenta")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/acceso";
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Ya autenticado: las pantallas de acceso no tienen sentido.
  if (user && (pathname === "/acceso" || pathname === "/acceso/registro")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/mi-cuenta";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
