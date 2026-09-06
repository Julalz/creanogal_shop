import { NextResponse } from "next/server";
import {
  fetchSequraMerchantCredentials,
  getSequraConfigStatus,
  isSequraConfigured,
} from "@/lib/sequra";

export async function GET() {
  if (!isSequraConfigured()) {
    const { missing } = getSequraConfigStatus();
    return NextResponse.json(
      { ok: false, error: `Faltan variables: ${missing.join(", ")}` },
      { status: 500 },
    );
  }

  try {
    const credentials = await fetchSequraMerchantCredentials();
    const primary = credentials[0];

    return NextResponse.json({
      ok: true,
      merchantRef: primary?.ref ?? null,
      assetsKey: primary?.assets_key ?? null,
      country: primary?.country ?? null,
      currency: primary?.currency ?? null,
      hint:
        "Usa merchantRef como SEQURA_MERCHANT_ID en .env (no es el nombre de usuario).",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "No se pudo verificar SeQura.",
      },
      { status: 500 },
    );
  }
}
