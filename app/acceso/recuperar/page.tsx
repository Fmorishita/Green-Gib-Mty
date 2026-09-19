import type { Metadata } from "next";
import { ResetForm } from "@/components/courses/auth-forms";

export const metadata: Metadata = {
  title: "Recuperar contraseña | Green Gib",
  robots: { index: false, follow: false },
};

export default function RecuperarPage() {
  return <ResetForm />;
}
