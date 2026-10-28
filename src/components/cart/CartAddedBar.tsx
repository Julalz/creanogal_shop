"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./cart-added-bar.css";

type CartAddedBarProps = {
  productTitle: string | null;
  itemCount: number;
  onDismiss: () => void;
};

export function CartAddedBar({ productTitle, itemCount, onDismiss }: CartAddedBarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!productTitle) return;
    const timer = window.setTimeout(onDismiss, 12_000);
    return () => window.clearTimeout(timer);
  }, [productTitle, onDismiss]);

  if (!productTitle || !mounted) return null;

  return createPortal(
    <div className="cart-added-bar" role="status" aria-live="polite">
      <div className="cart-added-bar__inner">
        <div className="cart-added-bar__text">
          <p className="cart-added-bar__title">Añadido al carrito</p>
          <p className="cart-added-bar__product">
            {productTitle}
            {itemCount > 0 && (
              <span className="cart-added-bar__count">
                {" "}
                · {itemCount} {itemCount === 1 ? "artículo" : "artículos"}
              </span>
            )}
          </p>
        </div>
        <div className="cart-added-bar__actions">
          <button type="button" className="btn btn--outline-dark cart-added-bar__btn" onClick={onDismiss}>
            Seguir comprando
          </button>
          <Link href="/carrito" className="btn btn--gold cart-added-bar__btn" onClick={onDismiss}>
            Ir al carrito
          </Link>
        </div>
        <button
          type="button"
          className="cart-added-bar__close"
          onClick={onDismiss}
          aria-label="Cerrar aviso"
        >
          ×
        </button>
      </div>
    </div>,
    document.body,
  );
}
