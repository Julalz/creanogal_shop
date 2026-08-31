import { NextResponse } from "next/server";
import { fulfillPaidCheckoutSessionById } from "@/lib/stripe-order";
import { isStripeConfigured } from "@/lib/stripe";

export const runtime = "nodejs";

/** Respaldo: envía emails de confirmación tras pago (p. ej. si el webhook falla en local). */
export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ ok: false, error: "Stripe no configurado." }, { status: 500 });
  }

  let body: { sessionId?: string };

  try {
    body = (await request.json()) as { sessionId?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Petición inválida." }, { status: 400 });
  }

  const sessionId = body.sessionId?.trim();
  if (!sessionId) {
    return NextResponse.json({ ok: false, error: "Sesión no indicada." }, { status: 400 });
  }

  console.info(`[stripe/confirm-order] Solicitud confirmación emails — sesión ${sessionId}`);

  try {
    const result = await fulfillPaidCheckoutSessionById(sessionId);

    if (!result.ok) {
      console.error(`[stripe/confirm-order] ❌ ${result.error}`);
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
    }

    if (result.alreadySent) {
      console.info(`[stripe/confirm-order] ℹ️ Emails ya enviados previamente (${sessionId})`);
    }

    return NextResponse.json({
      ok: true,
      emailSent: result.emailSent,
      alreadySent: result.alreadySent,
      emails: result.emails
        ? {
            admin: result.emails.admin.to,
            customer: result.emails.customer?.to ?? null,
          }
        : null,
    });
  } catch (error) {
    console.error("[stripe/confirm-order] ❌ Error inesperado:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "No se pudo confirmar el pedido.",
      },
      { status: 500 },
    );
  }
}
