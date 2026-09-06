import { NextResponse } from "next/server";
import { sendOrderNotifications } from "@/lib/order-email";
import { getSequraOrderStatus } from "@/lib/sequra-order";
import { getSequraOrderByMerchantRef, updateSequraOrder } from "@/lib/sequra-store";

type ConfirmPayload = {
  merchantOrderRef?: string;
};

export async function POST(request: Request) {
  let body: ConfirmPayload;
  try {
    body = (await request.json()) as ConfirmPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Petición inválida." }, { status: 400 });
  }

  const merchantOrderRef = body.merchantOrderRef?.trim();
  if (!merchantOrderRef) {
    return NextResponse.json({ ok: false, error: "Falta la referencia del pedido." }, { status: 400 });
  }

  const status = await getSequraOrderStatus(merchantOrderRef);
  if (!status?.paid) {
    return NextResponse.json(
      { ok: false, error: "La financiación SeQura aún no está confirmada." },
      { status: 409 },
    );
  }

  if (status.emailSent) {
    return NextResponse.json({ ok: true, emailSent: false, alreadySent: true });
  }

  const record = await getSequraOrderByMerchantRef(merchantOrderRef);
  if (!record) {
    return NextResponse.json({ ok: false, error: "Pedido no encontrado." }, { status: 404 });
  }

  try {
    const emails = await sendOrderNotifications({
      ...record.order,
      paymentStatus: "paid",
      paymentProvider: "sequra",
    });
    await updateSequraOrder(merchantOrderRef, { emailSent: true });
    return NextResponse.json({ ok: true, emailSent: true, alreadySent: false, emails });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Error al enviar emails.",
      },
      { status: 500 },
    );
  }
}
