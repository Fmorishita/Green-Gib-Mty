import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Container className="py-6">
        <Logo />
      </Container>
      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
        <p className="text-eyebrow font-semibold uppercase text-green-olive">Error 404</p>
        <h1 className="mt-4 font-display text-display-lg font-medium text-green-deep">
          Esta página se nos perdió entre el follaje
        </h1>
        <p className="mt-4 max-w-md text-lg text-charcoal-muted">
          La página que buscas no existe o cambió de lugar. Volvamos a terreno conocido.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
            Ir al inicio
          </Link>
          <Link href="/portafolio" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
            Ver portafolio
          </Link>
        </div>
      </main>
    </div>
  );
}
