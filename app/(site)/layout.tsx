import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { CartDrawer } from "@/components/ecommerce/cart-drawer";
import { SEOJsonLd } from "@/components/sections/seo-json-ld";
import { localBusinessJsonLd } from "@/lib/seo";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-green-deep focus:px-4 focus:py-2 focus:text-cream"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
      <WhatsAppButton />
      <CartDrawer />
      <SEOJsonLd data={localBusinessJsonLd()} />
    </>
  );
}
