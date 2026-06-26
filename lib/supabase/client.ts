import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente de Supabase para el navegador (Client Components).
 * Devuelve `null` si las variables de entorno no están configuradas,
 * para que el sitio funcione con mock data sin romperse.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createBrowserClient(url, anonKey);
}
