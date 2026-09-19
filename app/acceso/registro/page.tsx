import type { Metadata } from "next";
import { SignUpForm } from "@/components/courses/auth-forms";

export const metadata: Metadata = {
  title: "Crear cuenta | Green Gib",
  description: "Crea tu cuenta para acceder a los cursos de capacitación de Green Gib.",
  robots: { index: false, follow: false },
};

export default function RegistroPage({ searchParams }: { searchParams: { redirect?: string } }) {
  return <SignUpForm redirectTo={searchParams.redirect} />;
}
