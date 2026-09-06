"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import "./checkout.css";

type VerifyState = "loading" | "paid" | "pending" | "on_hold" | "error";

type EmailStatus =
  | { type: "sent"; admin: string; customer: string | null }
  | { type: "already" }
  | { type: "failed"; message: string }
  | null;

export function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider") ?? "stripe";
  const sessionId = searchParams.get("session_id");
  const sequraOrderRef = searchParams.get("order_ref_1");
  const { clearCart } = useCart();
  const [state, setState] = useState<VerifyState>("loading");
  const [emailStatus, setEmailStatus] = useState<EmailStatus>(null);

  useEffect(() => {
    let cancelled = false;

    async function confirmEmails(
      url: string,
      body: Record<string, string>,
    ): Promise<EmailStatus> {
      try {
        const confirmResponse = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const confirmData = (await confirmResponse.json()) as {
          ok?: boolean;
          emailSent?: boolean;
          alreadySent?: boolean;
          emails?: { admin: string; customer: string | null };
          error?: string;
        };

        if (confirmResponse.ok && confirmData.ok) {
          if (confirmData.emailSent && confirmData.emails) {
            return {
              type: "sent",
              admin: confirmData.emails.admin,
              customer: confirmData.emails.customer,
            };
          }
          if (confirmData.alreadySent) {
            return { type: "already" };
          }
        }

        return {
          type: "failed",
          message: confirmData.error ?? "No se pudo enviar el email de confirmación.",
        };
      } catch {
        return {
          type: "failed",
          message: "Error de conexión al enviar la confirmación por email.",
        };
      }
    }

    async function verifyStripe() {
      if (!sessionId) {
        setState("error");
        return;
      }

      try {
        const response = await fetch(
          `/api/stripe/session?session_id=${encodeURIComponent(sessionId)}`,
        );
        const data = (await response.json()) as { ok?: boolean; paid?: boolean };

        if (cancelled) return;

        if (!response.ok || !data.ok) {
          setState("error");
          return;
        }

        if (data.paid) {
          clearCart();
          const status = await confirmEmails("/api/stripe/confirm-order", { sessionId });
          if (!cancelled) setEmailStatus(status);
          setState("paid");
        } else {
          setState("pending");
        }
      } catch {
        if (!cancelled) setState("error");
      }
    }

    async function verifySequra() {
      if (!sequraOrderRef) {
        setState("error");
        return;
      }

      try {
        const response = await fetch(
          `/api/sequra/status?order_ref_1=${encodeURIComponent(sequraOrderRef)}`,
        );
        const data = (await response.json()) as {
          ok?: boolean;
          paid?: boolean;
          onHold?: boolean;
          emailSent?: boolean;
        };

        if (cancelled) return;

        if (!response.ok || !data.ok) {
          setState("error");
          return;
        }

        if (data.paid) {
          clearCart();
          if (!data.emailSent) {
            const status = await confirmEmails("/api/sequra/confirm-order", {
              merchantOrderRef: sequraOrderRef,
            });
            if (!cancelled) setEmailStatus(status);
          } else if (!cancelled) {
            setEmailStatus({ type: "already" });
          }
          setState("paid");
          return;
        }

        if (data.onHold) {
          setState("on_hold");
          return;
        }

        setState("pending");
      } catch {
        if (!cancelled) setState("error");
      }
    }

    if (provider === "sequra") {
      verifySequra();
    } else {
      verifyStripe();
    }

    return () => {
      cancelled = true;
    };
  }, [provider, sessionId, sequraOrderRef, clearCart]);

  if (state === "loading") {
    return (
      <div className="checkout-page">
        <div className="container checkout-page__inner">
          <div className="checkout-page__success">
            <p>Confirmando tu pedido…</p>
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
            <h1 className="checkout-page__title heading-serif">No pudimos verificar el pedido</h1>
            <p>
              Si el pago o la financiación aparece confirmada, contáctanos y te ayudamos con el
              pedido.
            </p>
            <Link href="/contacto" className="btn btn--gold">
              Contactar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const title =
    state === "paid"
      ? "Gracias por tu pedido"
      : state === "on_hold"
        ? "Pedido en revisión"
        : "Pedido recibido";

  const description =
    state === "paid"
      ? provider === "sequra"
        ? "Tu financiación con SeQura se ha confirmado. Nos pondremos en contacto para acabados e instalación."
        : "Tu pago se ha procesado correctamente. Nos pondremos en contacto para acabados e instalación."
      : state === "on_hold"
        ? "SeQura está revisando tu solicitud de financiación. Te avisaremos en cuanto esté confirmada."
        : "Estamos confirmando tu pedido. Te avisaremos en cuanto esté verificado.";

  return (
    <div className="checkout-page">
      <div className="container checkout-page__inner">
        <div className="checkout-page__success">
          <span className="label-caps">
            {state === "paid" ? "Pedido confirmado" : state === "on_hold" ? "En revisión" : "Pedido recibido"}
          </span>
          <h1 className="checkout-page__title heading-serif">{title}</h1>
          <p>{description}</p>

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
              {emailStatus.message} El pedido sí está registrado; contáctanos si no recibes noticias.
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
