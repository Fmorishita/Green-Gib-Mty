import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Figure } from "@/components/ui/figure";
import { CheckoutPanel } from "@/components/courses/checkout-panel";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getCourseBySlug, formatDuration } from "@/lib/data/courses";
import { getCurrentUser } from "@/lib/auth/session";
import { getMyCourses } from "@/lib/courses/access";
import { whatsappGeneral } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";

/** El checkout refleja el estado de la sesión: nunca se prerenderiza. */
export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const course = getCourseBySlug(params.slug);
  return pageMetadata({
    title: course ? `Comprar ${course.title}` : "Comprar curso",
    path: `/cursos/${params.slug}/comprar`,
  });
}

export default async function ComprarCursoPage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();

  const user = await getCurrentUser();
  const mine = user ? await getMyCourses() : [];
  const enrollment = mine.find((e) => e.course.slug === course.slug);

  return (
    <section className="py-section">
      <Container size="narrow">
        <Breadcrumbs
          className="mb-8"
          items={[
            { name: "Inicio", path: "/" },
            { name: "Cursos", path: "/cursos" },
            { name: course.title, path: `/cursos/${course.slug}` },
            { name: "Comprar", path: `/cursos/${course.slug}/comprar` },
          ]}
        />

        <div className="mb-10 flex items-start gap-5">
          <Figure
            src={course.cover}
            alt={course.title}
            variant="green"
            sizes="120px"
            className="hidden h-24 w-32 flex-shrink-0 rounded-lg sm:block"
          />
          <div>
            <p className="text-eyebrow font-semibold uppercase text-green-olive">Inscripción</p>
            <h1 className="mt-2 font-display text-display-sm font-medium text-green-deep">
              {course.title}
            </h1>
            <p className="mt-1 text-sm text-charcoal-muted">
              {course.lessonCount} lecciones · {formatDuration(course.durationMinutes)} · {course.level}
            </p>
          </div>
        </div>

        <CheckoutPanel
          course={course}
          isLoggedIn={Boolean(user)}
          alreadyActive={enrollment?.status === "active"}
          alreadyPending={enrollment?.status === "pending_payment"}
          whatsappHref={whatsappGeneral()}
        />
      </Container>
    </section>
  );
}
