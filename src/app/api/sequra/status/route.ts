import { NextResponse } from "next/server";
import { getSequraOrderStatus } from "@/lib/sequra-order";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const merchantOrderRef = searchParams.get("order_ref_1")?.trim();

  if (!merchantOrderRef) {
    return NextResponse.json({ ok: false, error: "Falta order_ref_1." }, { status: 400 });
  }

  const status = await getSequraOrderStatus(merchantOrderRef);
  if (!status) {
    return NextResponse.json({ ok: false, error: "Pedido no encontrado." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, ...status });
}
