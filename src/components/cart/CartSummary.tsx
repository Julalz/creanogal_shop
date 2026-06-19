"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/format-price";
import "./cart.css";

type CartSummaryProps = {
  subtotal: number;
  checkoutHref?: string;
  checkoutLabel?: string;
  showNote?: boolean;
};

export function CartSummary({
  subtotal,
  checkoutHref = "/checkout",
  checkoutLabel = "Finalizar compra",
  showNote = true,
}: CartSummaryProps) {
  return (
    <aside className="cart-summary">
      <h2 className="cart-summary__title">Resumen</h2>
      <div className="cart-summary__row">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="cart-summary__row cart-summary__total">
        <span>Total</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      {showNote && (
        <p className="cart-summary__note">
          Envío e instalación se confirman tras revisar el pedido. IVA incluido.
        </p>
      )}
      <Link href={checkoutHref} className="btn btn--gold cart-summary__cta">
        {checkoutLabel}
      </Link>
    </aside>
  );
}
