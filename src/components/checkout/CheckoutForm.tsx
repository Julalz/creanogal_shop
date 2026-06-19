"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/format-price";
import { useCart } from "@/hooks/useCart";
import "./checkout.css";

type Status = "idle" | "submitting" | "success" | "error";

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
  const { lines, subtotal, isReady, clearCart } = useCart();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: lines.map((line) => ({
            productId: line.productId,
            title: line.product.title,
            quantity: line.quantity,
            unitPrice: line.product.price,
            lineTotal: line.lineTotal,
          })),
          subtotal,
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "No se pudo enviar el pedido. Inténtalo de nuevo.");
        return;
      }

      clearCart();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Error de conexión. Comprueba tu red e inténtalo de nuevo.");
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

  if (lines.length === 0 && status !== "success") {
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

  if (status === "success") {
    return (
      <div className="checkout-page">
        <div className="container checkout-page__inner">
          <div className="checkout-page__success">
            <span className="label-caps">Pedido recibido</span>
            <h1 className="checkout-page__title heading-serif">Gracias por tu pedido</h1>
            <p>
              Hemos recibido tu solicitud. Te contactaremos en breve para confirmar detalles,
              acabados y opciones de pago (incluido financiación con SeQura cuando esté activa).
            </p>
            <Link href="/productos" className="btn btn--gold">
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container checkout-page__inner">
        <header className="checkout-page__header">
          <span className="label-caps">Finalizar</span>
          <h1 className="checkout-page__title heading-serif">Checkout</h1>
          <p className="checkout-page__intro">
            Completa tus datos. El pago con SeQura se activará próximamente; por ahora
            confirmaremos el pedido contigo por email o teléfono.
          </p>
        </header>

        <div className="checkout-page__layout">
          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
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

            {status === "error" && (
              <p className="checkout-form__error" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="btn btn--gold checkout-form__submit"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Enviando pedido…" : "Confirmar pedido"}
            </button>
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
            <p className="checkout-order__note">IVA incluido. Envío e instalación a confirmar.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
