import type Stripe from "stripe";
import { sendOrderNotifications, type OrderEmailResult } from "@/lib/order-email";
import { getStripe } from "@/lib/stripe";
import type { OrderItem, OrderPayload } from "@/types/order";

const EMAIL_SENT_FLAG = "confirmationEmailSent";

export function parseItemsFromMetadata(metadata: Stripe.Metadata | null): OrderItem[] {
  if (!metadata?.orderItems) return [];

  try {
    const parsed = JSON.parse(metadata.orderItems) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => {
        if (typeof item !== "object" || item === null) return null;
        const record = item as Partial<OrderItem>;
        const productId = record.productId ?? "";
        const title = record.title ?? "";
        const quantity = Number(record.quantity ?? 0);
        const unitPrice = Number(record.unitPrice ?? 0);
        const lineTotal = Number(record.lineTotal ?? 0);

        if (!productId || !title || quantity <= 0) return null;
        return { productId, title, quantity, unitPrice, lineTotal };
      })
      .filter((item): item is OrderItem => item !== null);
  } catch {
    return [];
  }
}

export function buildOrderFromSession(session: Stripe.Checkout.Session): OrderPayload | null {
  const metadata = session.metadata;
  if (!metadata?.customerName || !metadata.customerEmail) return null;

  const items = parseItemsFromMetadata(metadata);
  if (items.length === 0) return null;

  const subtotalFromItems = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const subtotalFromMetadata = Number(metadata.orderSubtotal ?? 0);
  const subtotal =
    subtotalFromItems || subtotalFromMetadata || (session.amount_total ?? 0) / 100;

  return {
    customer: {
      name: metadata.customerName,
      email: metadata.customerEmail,
      phone: metadata.customerPhone ?? "",
      address: metadata.customerAddress ?? "",
      city: metadata.customerCity ?? "",
      postalCode: metadata.customerPostalCode ?? "",
      notes: metadata.customerNotes || undefined,
    },
    items,
    subtotal,
    paymentStatus: "paid",
    stripeSessionId: session.id,
  };
}

type FulfillSuccess = {
  ok: true;
  emailSent: boolean;
  alreadySent: boolean;
  emails?: OrderEmailResult;
};

type FulfillFailure = {
  ok: false;
  error: string;
};

export async function fulfillPaidCheckoutSession(
  session: Stripe.Checkout.Session,
): Promise<FulfillSuccess | FulfillFailure> {
  console.info(`[stripe-order] Procesando sesión ${session.id} (status: ${session.payment_status})`);

  if (session.payment_status !== "paid") {
    return { ok: false, error: "El pago aún no está confirmado." };
  }

  if (session.metadata?.[EMAIL_SENT_FLAG] === "true") {
    console.info(`[stripe-order] ℹ️ Emails ya enviados para sesión ${session.id}`);
    return { ok: true, emailSent: false, alreadySent: true };
  }

  const order = buildOrderFromSession(session);
  if (!order) {
    console.error(`[stripe-order] ❌ No se pudo reconstruir pedido de sesión ${session.id}`);
    return { ok: false, error: "No se pudo reconstruir el pedido." };
  }

  let emails: OrderEmailResult;
  try {
    emails = await sendOrderNotifications(order);
  } catch (error) {
    logEmailError(error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Error al enviar emails.",
    };
  }

  const stripe = getStripe();
  await stripe.checkout.sessions.update(session.id, {
    metadata: {
      ...session.metadata,
      [EMAIL_SENT_FLAG]: "true",
    },
  });

  console.info(`[stripe-order] ✅ Pedido ${session.id} completado y emails enviados`);
  return { ok: true, emailSent: true, alreadySent: false, emails };
}

function logEmailError(error: unknown) {
  console.error("[stripe-order] ❌ Fallo al enviar emails:", error);
}

export async function fulfillPaidCheckoutSessionById(sessionId: string) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return fulfillPaidCheckoutSession(session);
}
