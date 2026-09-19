import type { Metadata } from "next";
import { SignInForm } from "@/components/courses/auth-forms";

export const metadata: Metadata = {
  title: "Entrar | Green Gib",
  description: "Accede a tus cursos de capacitación de Green Gib.",
  robots: { index: false, follow: false },
};

export default function AccesoPage({ searchParams }: { searchParams: { redirect?: string } }) {
  return <SignInForm redirectTo={searchParams.redirect} />;
}
