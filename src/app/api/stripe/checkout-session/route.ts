import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site-url";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { parseOrderCustomer, parseOrderItems, validateOrderCustomer } from "@/lib/order-validation";
import type { OrderCustomer } from "@/types/order";

type CheckoutSessionPayload = {
  customer?: Partial<OrderCustomer>;
  items?: unknown;
  subtotal?: number;
  paymentMethod?: "klarna" | "card";
};

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Stripe no está configurado. Añade STRIPE_SECRET_KEY al .env." },
      { status: 500 },
    );
  }

  let body: CheckoutSessionPayload;

  try {
    body = (await request.json()) as CheckoutSessionPayload;
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

  const calculatedSubtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  if (Math.abs(calculatedSubtotal - subtotal) > 0.01) {
    return NextResponse.json(
      { ok: false, error: "El total del pedido no coincide con los productos." },
      { status: 400 },
    );
  }

  const siteUrl = getSiteUrl();
  const paymentMethod = body.paymentMethod === "card" ? "card" : "klarna";
  const paymentMethodTypes = paymentMethod === "card" ? (["card"] as const) : (["klarna"] as const);

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: [...paymentMethodTypes],
      customer_email: customer.email,
      line_items: items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.title,
            metadata: { productId: item.productId },
          },
          unit_amount: Math.round(item.unitPrice * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout?cancelled=1`,
      metadata: {
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        customerAddress: customer.address,
        customerCity: customer.city,
        customerPostalCode: customer.postalCode,
        customerNotes: customer.notes ?? "",
        orderItems: JSON.stringify(items),
        orderSubtotal: String(subtotal),
        paymentMethod,
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { ok: false, error: "No se pudo crear la sesión de pago." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, url: session.url });
  } catch (error) {
    console.error("[stripe/checkout-session]", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo iniciar el pago. Inténtalo de nuevo." },
      { status: 500 },
    );
  }
}
