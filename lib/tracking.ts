/**
 * Helper de tracking para Meta Pixel.
 * No rompe si NEXT_PUBLIC_META_PIXEL_ID no está definido: simplemente no hace nada.
 *
 * Eventos estándar y personalizados preparados para campañas de Meta Ads:
 * Lead, Contact, ViewContent, AddToCart, InitiateCheckout,
 * WhatsAppClick, PortfolioProjectView, ProductView.
 */

export type PixelEvent =
  | "Lead"
  | "Contact"
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "WhatsAppClick"
  | "PortfolioProjectView"
  | "ProductView";

const STANDARD_EVENTS = new Set<PixelEvent>([
  "Lead",
  "Contact",
  "ViewContent",
  "AddToCart",
  "InitiateCheckout",
]);

declare global {
  interface Window {
    fbq?: (
      action: string,
      event: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/** Dispara un evento de conversión. Seguro de llamar aunque no haya pixel. */
export function trackEvent(event: PixelEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!window.fbq || !META_PIXEL_ID) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.debug(`[tracking] ${event}`, params ?? {});
    }
    return;
  }
  const action = STANDARD_EVENTS.has(event) ? "track" : "trackCustom";
  window.fbq(action, event, params);
}
