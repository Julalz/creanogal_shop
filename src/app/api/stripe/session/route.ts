import { NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export async function GET(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ ok: false, error: "Stripe no configurado." }, { status: 500 });
  }

  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ ok: false, error: "Sesión no indicada." }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      ok: true,
      paid: session.payment_status === "paid",
      customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
    });
  } catch (error) {
    console.error("[stripe/session]", error);
    return NextResponse.json({ ok: false, error: "Sesión no válida." }, { status: 404 });
  }
}
