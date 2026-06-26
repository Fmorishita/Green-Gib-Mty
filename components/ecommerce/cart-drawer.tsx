"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/components/ecommerce/cart-provider";
import { Figure } from "@/components/ui/figure";
import { Button, buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { formatPrice, cn } from "@/lib/utils";
import { whatsappCart } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/tracking";

/** Cajón lateral del carrito con pedido por WhatsApp. */
export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, count } = useCart();

  const handleCheckout = () => {
    trackEvent("InitiateCheckout", { value: subtotal, currency: "MXN", num_items: count });
    trackEvent("WhatsAppClick", { context: "cart-checkout" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-charcoal/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-hidden
          />
          <motion.aside
            className="fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col bg-cream shadow-float"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
          >
            <header className="flex items-center justify-between border-b border-stone/40 px-6 py-5">
              <h2 className="flex items-center gap-2 font-display text-xl text-green-deep">
                <ShoppingBag className="h-5 w-5" aria-hidden />
                Tu carrito
                {count > 0 && <span className="text-base text-charcoal-muted">({count})</span>}
              </h2>
              <button
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="rounded-full p-1.5 text-charcoal transition-colors hover:bg-green-deep/5"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <EmptyState
                  className="mt-8 border-none bg-transparent"
                  icon={<ShoppingBag className="h-6 w-6" />}
                  title="Tu carrito está vacío"
                  description="Explora nuestra tienda y agrega productos para espacios naturales."
                  action={
                    <Link href="/tienda" onClick={closeCart} className={buttonVariants({ variant: "primary" })}>
                      Ir a la tienda
                    </Link>
                  }
                />
              ) : (
                <ul className="divide-y divide-stone/30">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 py-4">
                      <Figure
                        src={item.image}
                        alt={item.name}
                        variant="sand"
                        className="h-20 w-20 flex-shrink-0 rounded-md"
                        sizes="80px"
                      />
                      <div className="flex flex-1 flex-col">
                        <Link
                          href={`/tienda/${item.slug}`}
                          onClick={closeCart}
                          className="font-medium leading-snug text-green-deep hover:underline"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-charcoal-muted">{formatPrice(item.price)}</p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center rounded-full border border-stone/50">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 text-charcoal transition-colors hover:text-green-deep"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-[2rem] text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 text-charcoal transition-colors hover:text-green-deep"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-charcoal-muted transition-colors hover:text-terracotta"
                            aria-label={`Eliminar ${item.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-stone/40 px-6 py-5">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-charcoal-muted">Subtotal estimado</span>
                  <span className="font-display text-xl font-medium text-green-deep">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mb-4 text-xs text-charcoal-muted">
                  Envíos y disponibilidad se confirman por WhatsApp. Aún no procesamos pagos en línea.
                </p>
                <a
                  href={whatsappCart(items)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCheckout}
                  className={cn(buttonVariants({ variant: "whatsapp", size: "lg" }), "w-full")}
                >
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  Pedir por WhatsApp
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeCart}
                  className="mt-2 w-full"
                >
                  Seguir explorando
                </Button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/** Botón de carrito con contador para el header. */
export function CartButton({ light = false }: { light?: boolean }) {
  const { count, openCart } = useCart();
  return (
    <button
      onClick={openCart}
      aria-label={`Abrir carrito${count ? `, ${count} artículos` : ""}`}
      className={cn(
        "relative rounded-full p-2 transition-colors",
        light ? "text-cream hover:bg-cream/10" : "text-green-deep hover:bg-green-deep/5"
      )}
    >
      <ShoppingBag className="h-5 w-5" aria-hidden />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-terracotta px-1 text-[0.65rem] font-semibold text-cream">
          {count}
        </span>
      )}
    </button>
  );
}
