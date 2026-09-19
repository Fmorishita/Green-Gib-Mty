import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Figure } from "@/components/ui/figure";

/**
 * Layout de las pantallas de acceso: sin header ni footer de marketing,
 * para que no haya nada que distraiga del formulario.
 */
export default function AccesoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      {/* Columna del formulario */}
      <div className="flex flex-col px-6 py-10 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between gap-4">
          <Logo />
          <Link
            href="/cursos"
            className="inline-flex items-center gap-1.5 text-sm text-charcoal-muted transition-colors hover:text-green-deep"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Ver cursos
          </Link>
        </div>

        <div className="flex flex-1 items-center py-12">
          <div className="w-full max-w-md">{children}</div>
        </div>

        <p className="text-xs text-charcoal-light">
          © {new Date().getFullYear()} Green Gib. Plataforma de capacitación.
        </p>
      </div>

      {/* Columna visual */}
      <div className="relative hidden lg:block">
        <Figure
          src="Muro verde restaurante acceso"
          alt="Instalación de muro verde por el equipo de Green Gib"
          variant="green"
          priority
          sizes="50vw"
          className="absolute inset-0 h-full w-full"
        />
        <div aria-hidden className="absolute inset-0 bg-green-deep/55" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <p className="max-w-md font-display text-display-sm leading-tight text-cream">
            El método con el que instalamos nuestros propios proyectos, explicado paso a paso.
          </p>
          <p className="mt-4 text-sm text-cream/70">
            Acceso permanente · Material descargable · Certificado verificable
          </p>
        </div>
      </div>
    </div>
  );
}
