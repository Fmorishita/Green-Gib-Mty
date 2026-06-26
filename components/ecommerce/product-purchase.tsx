"use client";

import { useState } from "react";
import { Minus, Plus, MessageCircle } from "lucide-react";
import type { Product } from "@/types";
import { AddToCartButton } from "@/components/ecommerce/add-to-cart-button";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { whatsappProduct } from "@/lib/whatsapp";

interface ProductPurchaseProps {
  product: Product;
}

/** Selector de cantidad + agregar al carrito + comprar por WhatsApp. */
export function ProductPurchase({ product }: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState(1);
  const soldOut = product.stock <= 0;

  return (
    <div className="space-y-5">
      {!soldOut && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-charcoal">Cantidad</span>
          <div className="flex items-center rounded-full border border-stone/50">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2.5 text-charcoal transition-colors hover:text-green-deep"
              aria-label="Disminuir cantidad"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-[2.5rem] text-center font-medium" aria-live="polite">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              className="p-2.5 text-charcoal transition-colors hover:text-green-deep"
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <AddToCartButton
          product={product}
          quantity={quantity}
          size="lg"
          className="flex-1"
        />
        <WhatsAppLink
          href={whatsappProduct(product.name)}
          size="lg"
          context={`producto-${product.slug}`}
          className="flex-1"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Comprar por WhatsApp
        </WhatsAppLink>
      </div>
    </div>
  );
}
