import { Container } from "@/components/ui/container";
import { Figure } from "@/components/ui/figure";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  variant?: "green" | "olive" | "sand" | "terracotta" | "stone";
  align?: "left" | "center";
  size?: "sm" | "md";
}

/** Hero reutilizable para páginas interiores. */
export function PageHero({
  eyebrow,
  title,
  description,
  image = "Texturas naturales Green Gibb",
  variant = "green",
  align = "left",
  size = "md",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-green-deep">
      <div className="absolute inset-0">
        <Figure
          src={image}
          alt=""
          variant={variant}
          priority
          sizes="100vw"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-deep via-green-deep/80 to-green-deep/50" />
      </div>
      <Container
        className={cn(
          "relative flex flex-col justify-end",
          size === "sm" ? "min-h-[42vh] py-20" : "min-h-[52vh] py-24",
          align === "center" && "items-center text-center"
        )}
      >
        <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
          {eyebrow && (
            <p className="animate-fade-up text-eyebrow font-semibold uppercase text-sand">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 animate-fade-up font-display text-display-lg font-medium text-cream [animation-delay:80ms]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-cream/85 [animation-delay:160ms]">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
