import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Infinity as InfinityIcon,
  FileDown,
  Award,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/sections/section-title";
import { CourseCard } from "@/components/courses/course-card";
import { MotionStagger, MotionItem, MotionSection } from "@/components/sections/motion-section";
import { CTASection } from "@/components/sections/cta-section";
import { buttonVariants } from "@/components/ui/button";
import { getPublishedCourses } from "@/lib/data/courses";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Cursos de capacitación técnica",
  description:
    "Aprende el método de instalación de Green Gib: muros verdes, riego eficiente, diseño de jardines y mantenimiento profesional. Cursos en video con acceso permanente.",
  path: "/cursos",
});

const benefits = [
  { icon: InfinityIcon, title: "Acceso permanente", text: "Compras una vez y el curso queda en tu cuenta para siempre, con las actualizaciones incluidas." },
  { icon: FileDown, title: "Material descargable", text: "Plantillas de cálculo, listas de materiales y protocolos que usamos en obra." },
  { icon: GraduationCap, title: "Método probado", text: "El mismo procedimiento con el que instalamos nuestros propios proyectos." },
  { icon: Award, title: "Certificado", text: "Al terminar recibes un certificado verificable que puedes mostrar a tus clientes." },
];

export default function CursosPage() {
  const courses = getPublishedCourses();

  return (
    <>
      <PageHero
        eyebrow="Capacitación profesional"
        title="Aprende a instalar como lo hacemos nosotros"
        description="Cursos en video para paisajistas, jardineros y constructores que quieren ejecutar muros verdes, riego y jardines con criterio técnico y sin retrabajos."
        image="Muro verde restaurante acceso"
        variant="green"
      />

      {/* Beneficios */}
      <section className="py-section">
        <Container>
          <MotionStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <MotionItem key={b.title} className="rounded-xl border border-stone/40 bg-cream p-7">
                <b.icon className="h-6 w-6 text-green-olive" aria-hidden />
                <h3 className="mt-4 font-display text-lg text-green-deep">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">{b.text}</p>
              </MotionItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      {/* Catálogo */}
      <section className="bg-cream-dark/50 py-section">
        <Container>
          <SectionTitle
            align="center"
            eyebrow="Catálogo"
            title="Elige el curso que necesitas"
            description="Cada curso es independiente y se compra por separado. Puedes empezar por el que más te urja."
          />
          <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, i) => (
              <MotionItem key={course.slug} className="h-full">
                <CourseCard course={course} priority={i === 0} />
              </MotionItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      {/* Cómo funciona */}
      <section className="py-section">
        <Container>
          <SectionTitle
            align="center"
            eyebrow="Cómo funciona"
            title="Primero pagas, después creas tu cuenta"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
            {[
              { n: "01", t: "Pagas el curso", d: "Sin crear cuenta ni llenar registros. Sólo necesitas tu nombre y un correo." },
              { n: "02", t: "Creas tu contraseña", d: "Al confirmarse el pago te enviamos el enlace para activar tu cuenta con ese mismo correo." },
              { n: "03", t: "Entras a tu panel", d: "El curso ya aparece activo. Ves los videos a tu ritmo y descargas el material." },
            ].map((s) => (
              <MotionSection key={s.n}>
                <p className="font-display text-4xl text-green-olive/40">{s.n}</p>
                <h3 className="mt-2 font-display text-xl text-green-deep">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">{s.d}</p>
              </MotionSection>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-charcoal-muted">¿Ya compraste un curso?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/acceso" className={cn(buttonVariants({ variant: "primary" }))}>
                Entrar a mi cuenta
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/cursos/vista-previa" className={cn(buttonVariants({ variant: "secondary" }))}>
                Ver cómo es el panel
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Certificado */}
      <section className="bg-cream-dark/50 py-section">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border border-sand bg-sand-light/40 p-8 text-center sm:p-12">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-deep/10">
              <Award className="h-6 w-6 text-green-deep" aria-hidden />
            </span>
            <h2 className="mt-5 font-display text-display-sm font-medium text-green-deep">
              Terminas el curso y te certificamos
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-charcoal-muted">
              Al completar el 100% de las lecciones descargas tu certificado en PDF, con tu
              nombre y un folio único. Cualquiera puede comprobar que es auténtico desde esta
              misma web, así que sirve para respaldar tu trabajo frente a un cliente.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="/api/certificado-ejemplo"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "primary" }))}
              >
                <FileDown className="h-4 w-4" aria-hidden />
                Ver certificado de ejemplo
              </a>
              <Link
                href="/certificados/verificar"
                className={cn(buttonVariants({ variant: "secondary" }))}
              >
                <ShieldCheck className="h-4 w-4" aria-hidden />
                Verificar un folio
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
