import type { Metadata } from "next";
import { PanelDashboard } from "@/components/courses/panel-dashboard";
import { getCurrentUser } from "@/lib/auth/session";
import { getMyCourses } from "@/lib/courses/access";
import { claimPaidOrders } from "@/lib/actions/orders";

export const metadata: Metadata = {
  title: "Mis cursos | Green Gib",
  robots: { index: false, follow: false },
};

export default async function MiCuentaPage() {
  // Como se paga antes de tener cuenta, al entrar hay que convertir en
  // inscripciones las órdenes ya pagadas de este correo. Es idempotente.
  await claimPaidOrders();

  const [user, courses] = await Promise.all([getCurrentUser(), getMyCourses()]);
  return <PanelDashboard courses={courses} userName={user?.fullName ?? null} />;
}
