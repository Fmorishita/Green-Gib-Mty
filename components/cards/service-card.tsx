import Link from "next/link";
import {
  ArrowUpRight,
  Trees,
  PencilRuler,
  Sprout,
  Layers,
  Flower2,
  Scissors,
  Building2,
  Sun,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/types";

const ICONS: Record<string, LucideIcon> = {
  Trees,
  PencilRuler,
  Sprout,
  Layers,
  Flower2,
  Scissors,
  Building2,
  Sun,
};

interface ServiceCardProps {
  service: Service;
}

/** Tarjeta de servicio para grids. */
export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = ICONS[service.icon] ?? Leaf;
  return (
    <Link
      href={`/servicios/${service.slug}`}
      className="group relative flex h-full flex-col rounded-xl border border-stone/40 bg-cream p-7 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-green-deep/20 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep/60 focus-visible:ring-offset-2"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-green-deep/8 text-green-deep transition-colors group-hover:bg-green-deep group-hover:text-cream">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="font-display text-xl text-green-deep">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-muted">
        {service.shortDescription}
      </p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-green-olive-dark transition-colors group-hover:text-terracotta">
        Conocer servicio
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
      </span>
    </Link>
  );
}
