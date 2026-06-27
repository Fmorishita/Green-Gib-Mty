import Link from "next/link";
import { ArrowRight, Leaf, CheckCircle2 } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { SectionTitle } from "@/components/sections/section-title";
import { CTASection } from "@/components/sections/cta-section";
import { ProcessSteps } from "@/components/sections/process-steps";
import { BeforeAfter } from "@/components/sections/before-after";
import { MotionSection, MotionStagger, MotionItem } from "@/components/sections/motion-section";
import { ServiceCard } from "@/components/cards/service-card";
import { ProjectCard } from "@/components/cards/project-card";
import { ProductCard } from "@/components/cards/product-card";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { LeadForm } from "@/components/forms/lead-form";
import { FounderSection } from "@/components/sections/founder-section";
import { Figure } from "@/components/ui/figure";
import { getFeaturedServices } from "@/lib/data/services";
import { getFeaturedProjects, projects } from "@/lib/data/projects";
import { getFeaturedProducts } from "@/lib/data/products";
import { getActiveTestimonials } from "@/lib/data/testimonials";
import { differentiators } from "@/lib/data/site";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const featuredServices = getFeaturedServices();
  const featuredProjects = getFeaturedProjects().slice(0, 4);
  const featuredProducts = getFeaturedProducts().slice(0, 4);
  const testimonials = getActiveTestimonials();
  const beforeAfterProject = projects.find((p) => p.beforeAfter);

  return (
    <>
      <Hero />

      {/* Problema */}
      <section className="py-section">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <MotionSection>
              <p className="text-eyebrow font-semibold uppercase text-green-olive">El punto de partida</p>
              <h2 className="mt-3 font-display text-display-md font-medium text-green-deep">
                Muchos espacios tienen potencial. Pocos están diseñados para aprovecharlo.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-charcoal-muted">
                En Green Gib convertimos jardines, terrazas, patios y áreas exteriores en
                espacios funcionales, estéticos y memorables. No llenamos de plantas: diseñamos
                con intención para que cada metro cuente.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  "Diseño que responde a cómo vives tu espacio",
                  "Especies y materiales pensados para el clima de Monterrey",
                  "Ejecución limpia, ordenada y en tiempo",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-charcoal">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-olive" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </MotionSection>
            <MotionSection delay={1} className="grid grid-cols-2 gap-4">
              <Figure
                src="Jardín diseñado con intención"
                alt="Jardín residencial con diseño contemporáneo en Monterrey"
                variant="green"
                className="mt-8 aspect-[3/4] rounded-xl"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <Figure
                src="Terraza con vegetación natural"
                alt="Terraza con vegetación y zona de estar"
                variant="olive"
                className="aspect-[3/4] rounded-xl"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </MotionSection>
          </div>
        </Container>
      </section>

      {/* Servicios destacados */}
      <section className="bg-cream-dark/50 py-section">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow="Lo que hacemos"
              title="Servicios de paisajismo de principio a fin"
              description="Diseñamos, ejecutamos y mantenemos espacios verdes para residencias, empresas y proyectos arquitectónicos."
            />
            <Link
              href="/servicios"
              className={cn(buttonVariants({ variant: "secondary" }), "self-start sm:self-auto")}
            >
              Ver todos los servicios
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service) => (
              <MotionItem key={service.slug} className="h-full">
                <ServiceCard service={service} />
              </MotionItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      {/* Portafolio */}
      <section className="py-section">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow="Portafolio"
              title="Proyectos que hablan por nosotros"
              description="Una muestra de transformaciones en residencias, comercios y espacios arquitectónicos de Monterrey."
            />
            <Link
              href="/portafolio"
              className={cn(buttonVariants({ variant: "secondary" }), "self-start sm:self-auto")}
            >
              Ver portafolio completo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.slice(0, 3).map((project, i) => (
              <MotionItem key={project.id} className="h-full">
                <ProjectCard project={project} priority={i === 0} />
              </MotionItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      {/* Antes y después */}
      {beforeAfterProject?.beforeAfter && (
        <section className="bg-green-deep py-section text-cream">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionTitle
                  light
                  eyebrow="Transformación real"
                  title="El cambio se siente, no solo se ve"
                  description="Pasamos de un espacio sin diseño a un jardín que se convierte en el lugar favorito de la propiedad. Desliza para comparar."
                />
                <Link
                  href="/portafolio"
                  className={cn(buttonVariants({ variant: "outlineLight" }), "mt-8")}
                >
                  Ver más transformaciones
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <MotionSection>
                <BeforeAfter
                  before={beforeAfterProject.beforeAfter.before}
                  after={beforeAfterProject.beforeAfter.after}
                  beforeAlt={`${beforeAfterProject.title} — antes`}
                  afterAlt={`${beforeAfterProject.title} — después`}
                />
              </MotionSection>
            </div>
          </Container>
        </section>
      )}

      {/* Fundador */}
      <FounderSection variant="home" />

      {/* Diferenciadores */}
      <section className="py-section">
        <Container>
          <SectionTitle
            align="center"
            eyebrow="Por qué Green Gib"
            title="Diseño, ejecución y acompañamiento en un solo equipo"
          />
          <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item) => (
              <MotionItem
                key={item.title}
                className="rounded-xl border border-stone/40 bg-cream p-7"
              >
                <Leaf className="h-6 w-6 text-green-olive" aria-hidden />
                <h3 className="mt-4 font-display text-lg text-green-deep">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">{item.description}</p>
              </MotionItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      {/* Productos destacados */}
      <section className="bg-cream-dark/50 py-section">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow="Tienda"
              title="Piezas para llevar lo natural a tu espacio"
              description="Plantas, macetas, jardineras y decoración exterior seleccionadas con criterio."
            />
            <Link
              href="/tienda"
              className={cn(buttonVariants({ variant: "secondary" }), "self-start sm:self-auto")}
            >
              Explorar la tienda
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <MotionStagger className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <MotionItem key={product.id} className="h-full">
                <ProductCard product={product} />
              </MotionItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      {/* Proceso */}
      <section className="py-section">
        <Container>
          <SectionTitle
            align="center"
            eyebrow="Cómo trabajamos"
            title="Un proceso claro, de la idea al espacio terminado"
            description="Sin sorpresas. Cada etapa con su alcance, sus tiempos y su responsable."
          />
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      {/* Testimonios */}
      <section className="bg-cream-dark/50 py-section">
        <Container>
          <SectionTitle
            align="center"
            eyebrow="Lo que dicen nuestros clientes"
            title="Confianza construida proyecto a proyecto"
          />
          <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <MotionItem key={t.id} className="h-full">
                <TestimonialCard testimonial={t} />
              </MotionItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      {/* Lead magnet / valoración */}
      <section className="py-section">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-stone/40 bg-cream shadow-soft">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[280px] lg:min-h-full">
                <Figure
                  src="Valoración de jardín Green Gib"
                  alt="Especialista de Green Gib valorando un jardín en Monterrey"
                  variant="olive"
                  className="absolute inset-0 h-full w-full"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-8 sm:p-12">
                <p className="text-eyebrow font-semibold uppercase text-green-olive">
                  Agenda sin costo
                </p>
                <h2 className="mt-3 font-display text-display-sm font-medium text-green-deep">
                  Agenda una valoración para tu jardín
                </h2>
                <p className="mt-3 text-charcoal-muted">
                  Cuéntanos sobre tu espacio y te contactamos para coordinar una valoración.
                  Sin compromiso, solo claridad sobre lo que podemos lograr juntos.
                </p>
                <div className="mt-7">
                  <LeadForm source="home-valoracion" ctaLabel="Quiero mi valoración" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
