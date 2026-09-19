import { redirect } from "next/navigation";
import { PanelHeader } from "@/components/courses/panel-header";
import { getCurrentUser } from "@/lib/auth/session";

/**
 * El panel depende por completo de la sesión, así que nunca debe
 * prerenderizarse: sin esto Next lo marca estático en el build (donde no hay
 * variables de Supabase) y en producción serviría HTML cacheado a todos.
 */
export const dynamic = "force-dynamic";

/**
 * Layout del panel privado.
 *
 * El middleware ya redirige a /acceso, pero se vuelve a comprobar aquí: el
 * middleware no debe ser la única barrera, y este chequeo corre en el servidor
 * en cada render.
 */
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/acceso?redirect=/mi-cuenta");

  return (
    <div className="min-h-screen bg-cream-dark/30">
      <PanelHeader userName={user.fullName} email={user.email} />
      <main id="contenido">{children}</main>
    </div>
  );
}
