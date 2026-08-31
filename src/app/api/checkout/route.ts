import { NextResponse } from "next/server";
import { sendOrderNotifications } from "@/lib/order-email";
import { parseOrderCustomer, parseOrderItems, validateOrderCustomer } from "@/lib/order-validation";

type CheckoutPayload = {
  customer?: Parameters<typeof parseOrderCustomer>[0];
  items?: unknown;
  subtotal?: number;
};

/** Reserva de pedido sin pago online (fallback si Stripe no está activo). */
export async function POST(request: Request) {
  let body: CheckoutPayload;

  try {
    body = (await request.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Petición inválida." }, { status: 400 });
  }

  const customer = parseOrderCustomer(body.customer);
  const items = parseOrderItems(body.items);
  const subtotal = typeof body.subtotal === "number" ? body.subtotal : 0;

  const validationError = validateOrderCustomer(customer);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  }

  if (items.length === 0) {
    return NextResponse.json({ ok: false, error: "El carrito está vacío." }, { status: 400 });
  }

  try {
    await sendOrderNotifications({
      customer,
      items,
      subtotal,
      paymentStatus: "pending",
    });
  } catch (error) {
    console.error("[checkout]", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar el pedido. Inténtalo más tarde." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
