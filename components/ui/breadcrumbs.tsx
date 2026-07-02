import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SEOJsonLd } from "@/components/sections/seo-json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

interface Crumb {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

/** Migas de pan visibles + JSON-LD (BreadcrumbList) para SEO. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <>
      <SEOJsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Migas de pan" className={cn(className)}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-charcoal-muted">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className="font-medium text-green-deep">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.path}
                      className="transition-colors hover:text-green-deep"
                    >
                      {item.name}
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5 text-stone" aria-hidden />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
