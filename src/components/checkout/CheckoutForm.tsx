"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/format-price";
import { useCart } from "@/hooks/useCart";
import "./checkout.css";

type PaymentMethod = "klarna" | "card";
type SubmittingMethod = PaymentMethod | null;

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  notes: "",
};

export function CheckoutForm() {
  const searchParams = useSearchParams();
  const cancelled = searchParams.get("cancelled") === "1";
  const formRef = useRef<HTMLFormElement>(null);
  const { lines, subtotal, isReady } = useCart();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState<SubmittingMethod>(null);
  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function startCheckout(paymentMethod: PaymentMethod) {
    const formElement = formRef.current;
    if (!formElement || !formElement.reportValidity()) return;

    setSubmitting(paymentMethod);
    setErrorMessage("");

    const payload = {
      customer: form,
      items: lines.map((line) => ({
        productId: line.productId,
        title: line.product.title,
        quantity: line.quantity,
        unitPrice: line.product.price,
        lineTotal: line.lineTotal,
      })),
      subtotal,
      paymentMethod,
    };

    try {
      const response = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { ok?: boolean; url?: string; error?: string };

      if (!response.ok || !data.ok || !data.url) {
        setErrorMessage(data.error ?? "No se pudo iniciar el pago. Inténtalo de nuevo.");
        setSubmitting(null);
        return;
      }

      window.location.href = data.url;
    } catch {
      setErrorMessage("Error de conexión. Comprueba tu red e inténtalo de nuevo.");
      setSubmitting(null);
    }
  }

  if (!isReady) {
    return (
      <div className="checkout-page">
        <div className="container checkout-page__inner">
          <p>Cargando…</p>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container checkout-page__inner">
          <header className="checkout-page__header">
            <span className="label-caps">Finalizar</span>
            <h1 className="checkout-page__title heading-serif">Checkout</h1>
          </header>
          <div className="checkout-page__empty">
            <p>No hay productos en el carrito.</p>
            <Link href="/productos" className="btn btn--gold">
              Ver productos Quooker
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isBusy = submitting !== null;

  return (
    <div className="checkout-page">
      <div className="container checkout-page__inner">
        <header className="checkout-page__header">
          <span className="label-caps">Finalizar</span>
          <h1 className="checkout-page__title heading-serif">Checkout</h1>
          <p className="checkout-page__intro">
            Completa tus datos y elige tu forma de pago. Financiación con Klarna o pago con tarjeta,
            procesados de forma segura con Stripe.
          </p>
        </header>

        {cancelled && (
          <p className="checkout-form__notice" role="status">
            Has cancelado el pago. Puedes intentarlo de nuevo cuando quieras.
          </p>
        )}

        <div className="checkout-page__layout">
          <form ref={formRef} className="checkout-form" noValidate>
            <fieldset className="checkout-form__section">
              <legend className="checkout-form__legend">Datos de contacto</legend>
              <div className="checkout-form__grid">
                <label className="checkout-form__field checkout-form__field--full">
                  <span>Nombre completo *</span>
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                </label>
                <label className="checkout-form__field">
                  <span>Email *</span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </label>
                <label className="checkout-form__field">
                  <span>Teléfono *</span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </label>
              </div>
            </fieldset>

            <fieldset className="checkout-form__section">
              <legend className="checkout-form__legend">Dirección de envío</legend>
              <div className="checkout-form__grid">
                <label className="checkout-form__field checkout-form__field--full">
                  <span>Dirección *</span>
                  <input
                    type="text"
                    name="address"
                    required
                    autoComplete="street-address"
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                  />
                </label>
                <label className="checkout-form__field">
                  <span>Ciudad *</span>
                  <input
                    type="text"
                    name="city"
                    required
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                  />
                </label>
                <label className="checkout-form__field">
                  <span>Código postal *</span>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    autoComplete="postal-code"
                    value={form.postalCode}
                    onChange={(e) => updateField("postalCode", e.target.value)}
                  />
                </label>
                <label className="checkout-form__field checkout-form__field--full">
                  <span>Notas (opcional)</span>
                  <textarea
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    placeholder="Acabado preferido, instrucciones de entrega…"
                  />
                </label>
              </div>
            </fieldset>
          </form>

          <aside className="checkout-order">
            <h2 className="checkout-order__title">Tu pedido</h2>
            <ul className="checkout-order__list">
              {lines.map((line) => (
                <li key={line.productId} className="checkout-order__item">
                  <span>
                    {line.product.title} × {line.quantity}
                  </span>
                  <span>{formatPrice(line.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="checkout-order__total">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="checkout-order__payment">
              <h3 className="checkout-order__payment-title">Formas de pago</h3>
              <p className="checkout-order__payment-note">
                Elige cómo quieres pagar. Gestionado de forma segura con Stripe.
              </p>

              {errorMessage && (
                <p className="checkout-form__error" role="alert">
                  {errorMessage}
                </p>
              )}

              <div className="checkout-order__payment-actions">
                <button
                  type="button"
                  className="btn btn--gold checkout-order__pay-btn"
                  disabled={isBusy}
                  onClick={() => startCheckout("klarna")}
                >
                  {submitting === "klarna" ? "Redirigiendo…" : "Financiación"}
                </button>
                <button
                  type="button"
                  className="btn btn--outline-dark checkout-order__pay-btn"
                  disabled={isBusy}
                  onClick={() => startCheckout("card")}
                >
                  {submitting === "card" ? "Redirigiendo…" : "Pagar con tarjeta"}
                </button>
              </div>
            </div>

            <p className="checkout-order__note">
              IVA incluido. Envío e instalación a confirmar tras el pedido.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
