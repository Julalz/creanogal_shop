"use client";

import Link from "next/link";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCart } from "@/hooks/useCart";
import "./cart-page.css";

export function CartPageContent() {
  const { lines, subtotal, isReady } = useCart();

  if (!isReady) {
    return (
      <div className="cart-page">
        <div className="container cart-page__inner">
          <p className="cart-page__loading">Cargando carrito…</p>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="cart-page">
        <div className="container cart-page__inner">
          <header className="cart-page__header">
            <span className="label-caps">Tu pedido</span>
            <h1 className="cart-page__title heading-serif">Carrito de compra</h1>
          </header>
          <div className="cart-page__empty">
            <p>Tu carrito está vacío.</p>
            <Link href="/productos" className="btn btn--gold">
              Ver productos Quooker
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container cart-page__inner">
        <header className="cart-page__header">
          <span className="label-caps">Tu pedido</span>
          <h1 className="cart-page__title heading-serif">Carrito de compra</h1>
          <p className="cart-page__count">
            {lines.length} {lines.length === 1 ? "producto" : "productos"}
          </p>
        </header>

        <div className="cart-page__layout">
          <section className="cart-page__items" aria-label="Productos en el carrito">
            {lines.map((line) => (
              <CartItem key={line.productId} line={line} />
            ))}
          </section>
          <CartSummary subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
