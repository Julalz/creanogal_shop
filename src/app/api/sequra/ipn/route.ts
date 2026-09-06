import { NextResponse } from "next/server";
import { handleSequraIpn, type SequraIpnPayload } from "@/lib/sequra-order";

function parseIpnBody(raw: string): SequraIpnPayload {
  const params = new URLSearchParams(raw);
  return {
    order_ref: params.get("order_ref") ?? undefined,
    order_ref_1: params.get("order_ref_1") ?? undefined,
    product_code: params.get("product_code") ?? undefined,
    sq_state: params.get("sq_state") ?? undefined,
    token: params.get("token") ?? undefined,
  };
}

export async function POST(request: Request) {
  const raw = await request.text();
  const payload = parseIpnBody(raw);

  console.info("[sequra/ipn] Recibido:", payload.order_ref_1 ?? payload.order_ref, payload.sq_state);

  const result = await handleSequraIpn(payload);
  return new NextResponse(null, { status: result.status });
}
