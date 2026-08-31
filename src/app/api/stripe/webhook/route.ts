import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { fulfillPaidCheckoutSession } from "@/lib/stripe-order";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export const runtime = "nodejs";

const FULFILLMENT_EVENTS = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
]);

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Stripe no configurado." }, { status: 500 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[stripe/webhook] STRIPE_WEBHOOK_SECRET no configurado.");
    return NextResponse.json({ error: "Webhook no configurado." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Firma ausente." }, { status: 400 });
  }

  const body = await request.text();
  const stripe = getStripe();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error(
      "[stripe/webhook] Firma inválida. ¿Coincide STRIPE_WEBHOOK_SECRET con el whsec_ del stripe listen?",
      error,
    );
    return NextResponse.json({ error: "Firma inválida." }, { status: 400 });
  }

  if (FULFILLMENT_EVENTS.has(event.type)) {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const result = await fulfillPaidCheckoutSession(session);
      if (!result.ok) {
        console.warn("[stripe/webhook]", event.type, result.error);
      } else if (result.emailSent) {
        console.info("[stripe/webhook] Emails enviados para sesión", session.id);
      }
    } catch (error) {
      console.error("[stripe/webhook] Error enviando email:", error);
      return NextResponse.json({ error: "Error al notificar el pedido." }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
