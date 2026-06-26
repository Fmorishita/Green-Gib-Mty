import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Project } from "@/types";
import { Figure } from "@/components/ui/figure";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

/** Tarjeta visual de proyecto para el portafolio. */
export function ProjectCard({ project, priority }: ProjectCardProps) {
  return (
    <Link
      href={`/portafolio/${project.slug}`}
      className="group block overflow-hidden rounded-xl bg-cream shadow-card transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep/60 focus-visible:ring-offset-2"
    >
      <div className="relative overflow-hidden">
        <Figure
          src={project.cover_image}
          alt={project.title}
          variant="green"
          priority={priority}
          className="aspect-[4/3] w-full transition-transform duration-700 ease-smooth group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute left-4 top-4">
          <Badge className="bg-cream/90 text-green-deep backdrop-blur">{project.category}</Badge>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl text-green-deep transition-colors group-hover:text-green-olive-dark">
          {project.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-charcoal-muted">
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          {project.location}
        </p>
      </div>
    </Link>
  );
}
