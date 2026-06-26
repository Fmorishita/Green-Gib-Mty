import Link from "next/link";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { siteConfig, footerNav } from "@/lib/data/site";
import { whatsappGeneral } from "@/lib/whatsapp";

/** Footer completo con navegación, contacto y legal. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-green-deep text-cream">
      <Container className="py-section-sm">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              Paisajismo, diseño de jardines, muros verdes y decoración exterior para
              residencias, empresas y proyectos arquitectónicos en {siteConfig.city}.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Green Gibb"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20"
              >
                <Instagram className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={whatsappGeneral()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Green Gibb"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>

          <nav aria-label="Servicios">
            <h3 className="text-eyebrow font-semibold uppercase text-sand">Servicios</h3>
            <ul className="mt-4 space-y-2.5">
              {footerNav.servicios.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explorar">
            <h3 className="text-eyebrow font-semibold uppercase text-sand">Explorar</h3>
            <ul className="mt-4 space-y-2.5">
              {footerNav.explorar.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-eyebrow font-semibold uppercase text-sand">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-sand" aria-hidden />
                {siteConfig.serviceArea}
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-sand" aria-hidden />
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-cream">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Instagram className="mt-0.5 h-4 w-4 flex-shrink-0 text-sand" aria-hidden />
                <a href={siteConfig.instagram} className="transition-colors hover:text-cream">
                  {siteConfig.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/15 pt-6 text-sm text-cream/60 sm:flex-row">
          <p>© {year} Green Gibb. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1.5">
            Diseñado con intención en Monterrey
          </p>
        </div>
      </Container>
    </footer>
  );
}
