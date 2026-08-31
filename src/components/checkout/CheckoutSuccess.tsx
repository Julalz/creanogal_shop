"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import "./checkout.css";

type VerifyState = "loading" | "paid" | "pending" | "error";

type EmailStatus =
  | { type: "sent"; admin: string; customer: string | null }
  | { type: "already" }
  | { type: "failed"; message: string }
  | null;

export function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const [state, setState] = useState<VerifyState>("loading");
  const [emailStatus, setEmailStatus] = useState<EmailStatus>(null);

  useEffect(() => {
    if (!sessionId) {
      setState("error");
      return;
    }

    let cancelled = false;

    async function verify() {
      try {
        const response = await fetch(
          `/api/stripe/session?session_id=${encodeURIComponent(sessionId!)}`,
        );
        const data = (await response.json()) as { ok?: boolean; paid?: boolean };

        if (cancelled) return;

        if (!response.ok || !data.ok) {
          setState("error");
          return;
        }

        if (data.paid) {
          clearCart();

          try {
            const confirmResponse = await fetch("/api/stripe/confirm-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId: sessionId! }),
            });
            const confirmData = (await confirmResponse.json()) as {
              ok?: boolean;
              emailSent?: boolean;
              alreadySent?: boolean;
              emails?: { admin: string; customer: string | null };
              error?: string;
            };

            if (cancelled) return;

            if (confirmResponse.ok && confirmData.ok) {
              if (confirmData.emailSent && confirmData.emails) {
                setEmailStatus({
                  type: "sent",
                  admin: confirmData.emails.admin,
                  customer: confirmData.emails.customer,
                });
              } else if (confirmData.alreadySent) {
                setEmailStatus({ type: "already" });
              }
            } else {
              setEmailStatus({
                type: "failed",
                message: confirmData.error ?? "No se pudo enviar el email de confirmación.",
              });
            }
          } catch {
            if (!cancelled) {
              setEmailStatus({
                type: "failed",
                message: "Error de conexión al enviar la confirmación por email.",
              });
            }
          }

          setState("paid");
        } else {
          setState("pending");
        }
      } catch {
        if (!cancelled) setState("error");
      }
    }

    verify();

    return () => {
      cancelled = true;
    };
  }, [sessionId, clearCart]);

  if (state === "loading") {
    return (
      <div className="checkout-page">
        <div className="container checkout-page__inner">
          <div className="checkout-page__success">
            <p>Confirmando tu pago…</p>
          </div>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="checkout-page">
        <div className="container checkout-page__inner">
          <div className="checkout-page__success">
            <span className="label-caps">Atención</span>
            <h1 className="checkout-page__title heading-serif">No pudimos verificar el pago</h1>
            <p>
              Si el cargo aparece en tu cuenta, contáctanos y te ayudamos con el pedido.
            </p>
            <Link href="/contacto" className="btn btn--gold">
              Contactar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container checkout-page__inner">
        <div className="checkout-page__success">
          <span className="label-caps">{state === "paid" ? "Pago confirmado" : "Pedido recibido"}</span>
          <h1 className="checkout-page__title heading-serif">Gracias por tu pedido</h1>
          <p>
            {state === "paid"
              ? "Tu pago se ha procesado correctamente. Nos pondremos en contacto para acabados e instalación."
              : "Estamos confirmando tu pago. Te avisaremos en cuanto esté verificado."}
          </p>

          {emailStatus?.type === "sent" && (
            <p className="checkout-page__email-status checkout-page__email-status--ok" role="status">
              Email de confirmación enviado
              {emailStatus.customer ? ` a ${emailStatus.customer}` : ""}.
              Revisa también la carpeta de spam.
            </p>
          )}

          {emailStatus?.type === "already" && (
            <p className="checkout-page__email-status checkout-page__email-status--info" role="status">
              El email de confirmación ya se había enviado con este pedido.
            </p>
          )}

          {emailStatus?.type === "failed" && (
            <p className="checkout-page__email-status checkout-page__email-status--error" role="alert">
              {emailStatus.message} El pedido sí está pagado; contáctanos si no recibes noticias.
            </p>
          )}

          <Link href="/productos" className="btn btn--gold">
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
