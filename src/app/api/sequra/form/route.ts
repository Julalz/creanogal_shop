import { NextResponse } from "next/server";
import { fetchSequraIdentificationForm } from "@/lib/sequra-order";
import { getSequraOrderByMerchantRef } from "@/lib/sequra-store";
import { isSequraConfigured } from "@/lib/sequra";

export async function GET(request: Request) {
  if (!isSequraConfigured()) {
    return NextResponse.json({ ok: false, error: "SeQura no configurado." }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const merchantOrderRef = searchParams.get("ref")?.trim();

  if (!merchantOrderRef) {
    return NextResponse.json({ ok: false, error: "Falta la referencia del pedido." }, { status: 400 });
  }

  const record = await getSequraOrderByMerchantRef(merchantOrderRef);
  if (!record) {
    return NextResponse.json({ ok: false, error: "Pedido no encontrado." }, { status: 404 });
  }

  try {
    const html = await fetchSequraIdentificationForm(record.sequraOrderUrl);
    return NextResponse.json({ ok: true, html });
  } catch (error) {
    console.error("[sequra/form]", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "No se pudo cargar el formulario SeQura.",
      },
      { status: 500 },
    );
  }
}
