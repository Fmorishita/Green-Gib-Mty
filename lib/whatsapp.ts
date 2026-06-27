import type { CartItem } from "@/types";
import { formatPrice } from "@/lib/utils";

/**
 * Helpers para generar enlaces dinámicos de WhatsApp.
 * El número se toma de NEXT_PUBLIC_WHATSAPP_NUMBER (formato internacional sin "+").
 */

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "528100000000";

function buildLink(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/** Mensaje genérico de contacto. */
export function whatsappGeneral(): string {
  return buildLink(
    "Hola Green Gib, me gustaría platicar sobre un proyecto de paisajismo."
  );
}

/** Caso 1 — Cotización de proyecto. */
export function whatsappQuote(params?: { name?: string; location?: string }): string {
  const name = params?.name?.trim() || "___";
  const location = params?.location?.trim() || "___";
  return buildLink(
    `Hola Green Gib, me interesa cotizar un proyecto de paisajismo. Mi nombre es ${name} y el proyecto está ubicado en ${location}.`
  );
}

/** Caso 2 — Consulta de producto. */
export function whatsappProduct(productName: string): string {
  return buildLink(`Hola Green Gib, me interesa este producto: ${productName}.`);
}

/** Caso 3 — Pedido desde el carrito con resumen. */
export function whatsappCart(items: CartItem[]): string {
  if (items.length === 0) {
    return buildLink("Hola Green Gib, quiero cotizar algunos productos.");
  }
  const lines = items
    .map(
      (item) =>
        `• ${item.quantity}x ${item.name} — ${formatPrice(item.price * item.quantity)}`
    )
    .join("\n");
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return buildLink(
    `Hola Green Gib, quiero cotizar estos productos:\n${lines}\n\nTotal estimado: ${formatPrice(total)}`
  );
}

/** Caso 4 — Quiero un proyecto similar al del portafolio. */
export function whatsappSimilarProject(projectTitle: string): string {
  return buildLink(
    `Hola Green Gib, vi este proyecto en su portafolio: ${projectTitle} y quiero algo similar.`
  );
}

/** Caso 5 — Agendar valoración / lead magnet. */
export function whatsappValuation(): string {
  return buildLink(
    "Hola Green Gib, me gustaría agendar una valoración para mi jardín o espacio exterior."
  );
}
