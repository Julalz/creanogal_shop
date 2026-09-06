import { NextResponse } from "next/server";
import { parseOrderCustomer, parseOrderItems, validateOrderCustomer } from "@/lib/order-validation";
import type { OrderCustomer } from "@/types/order";
import { createMerchantOrderRef } from "@/lib/sequra-payload";
import { startSequraSolicitation } from "@/lib/sequra-order";
import { getSequraConfigStatus, isSequraConfigured } from "@/lib/sequra";

type SolicitationPayload = {
  customer?: unknown;
  items?: unknown;
  subtotal?: number;
};

export async function POST(request: Request) {
  if (!isSequraConfigured()) {
    const { missing } = getSequraConfigStatus();
    return NextResponse.json(
      {
        ok: false,
        error: `SeQura no está configurado. Faltan en .env: ${missing.join(", ")}. Guarda el archivo y reinicia npm run dev.`,
      },
      { status: 500 },
    );
  }

  let body: SolicitationPayload;
  try {
    body = (await request.json()) as SolicitationPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Petición inválida." }, { status: 400 });
  }

  const customer = parseOrderCustomer(body.customer as Partial<OrderCustomer> | undefined);
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

  const merchantOrderRef = createMerchantOrderRef();
  const userAgent = request.headers.get("user-agent") ?? undefined;
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? undefined;

  try {
    const result = await startSequraSolicitation({
      customer,
      items,
      subtotal,
      merchantOrderRef,
      userAgent,
      clientIp,
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("[sequra/solicitation]", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "No se pudo iniciar la financiación SeQura.",
      },
      { status: 500 },
    );
  }
}
