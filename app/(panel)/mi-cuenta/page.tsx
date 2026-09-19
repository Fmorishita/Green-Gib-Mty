import type { Metadata } from "next";
import { PanelDashboard } from "@/components/courses/panel-dashboard";
import { getCurrentUser } from "@/lib/auth/session";
import { getMyCourses } from "@/lib/courses/access";

export const metadata: Metadata = {
  title: "Mis cursos | Green Gib",
  robots: { index: false, follow: false },
};

export default async function MiCuentaPage() {
  const [user, courses] = await Promise.all([getCurrentUser(), getMyCourses()]);
  return <PanelDashboard courses={courses} userName={user?.fullName ?? null} />;
}
