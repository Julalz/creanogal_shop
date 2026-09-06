import { sendOrderNotifications, type OrderEmailResult } from "@/lib/order-email";
import { buildSequraOrderPayload, createIpnToken } from "@/lib/sequra-payload";
import { extractSequraOrderUuid, parseSequraError, resolveSequraMerchantId, sequraRequest } from "@/lib/sequra";
import {
  getSequraOrderByMerchantRef,
  getSequraOrderByUuid,
  saveSequraOrder,
  updateSequraOrder,
  type SequraOrderStatus,
  type SequraStoredOrder,
} from "@/lib/sequra-store";
import type { OrderCustomer, OrderItem, OrderPayload } from "@/types/order";

export type SequraIpnPayload = {
  order_ref?: string;
  order_ref_1?: string;
  product_code?: string;
  sq_state?: string;
  token?: string;
};

export async function startSequraSolicitation(input: {
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  merchantOrderRef: string;
  userAgent?: string;
  clientIp?: string;
}) {
  const merchantId = await resolveSequraMerchantId();
  const body = buildSequraOrderPayload({
    ...input,
    merchantId,
    state: "",
  });

  const response = await sequraRequest("/orders", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (response.status === 409) {
    const data = (await response.json().catch(() => null)) as { errors?: string[] } | null;
    const message = data?.errors?.join(" ") ?? "SeQura rechazó la solicitud.";
    throw new Error(message);
  }

  if (response.status !== 204) {
    const text = await response.text().catch(() => "");
    console.error(`[sequra] POST /orders → ${response.status}`, text.slice(0, 120));
    throw new Error(parseSequraError(text, response.status));
  }

  const orderUrl = response.headers.get("location") ?? response.headers.get("Location");
  if (!orderUrl) {
    throw new Error("SeQura no devolvió la URL del pedido.");
  }

  const sequraOrderUuid = extractSequraOrderUuid(orderUrl);
  if (!sequraOrderUuid) {
    throw new Error("No se pudo leer el identificador del pedido SeQura.");
  }

  const order: OrderPayload = {
    customer: input.customer,
    items: input.items,
    subtotal: input.subtotal,
    paymentStatus: "pending",
    paymentProvider: "sequra",
    merchantOrderRef: input.merchantOrderRef,
    sequraOrderUuid,
  };

  const record: SequraStoredOrder = {
    merchantOrderRef: input.merchantOrderRef,
    sequraOrderUrl: orderUrl,
    sequraOrderUuid,
    order,
    status: "pending",
    emailSent: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await saveSequraOrder(record);

  return {
    merchantOrderRef: input.merchantOrderRef,
    sequraOrderUuid,
    sequraOrderUrl: orderUrl,
  };
}

export async function fetchSequraIdentificationForm(sequraOrderUrl: string) {
  const formUrl = `${sequraOrderUrl.replace(/\/$/, "")}/form_v2?product=pp3`;
  const response = await sequraRequest(formUrl, {
    method: "GET",
    accept: "text/html",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `No se pudo cargar el formulario SeQura (${response.status}).`);
  }

  return response.text();
}

async function updateSequraOrderState(
  record: SequraStoredOrder,
  state: "confirmed" | "on_hold",
) {
  const merchantId = await resolveSequraMerchantId();
  const payload = buildSequraOrderPayload({
    customer: record.order.customer,
    items: record.order.items,
    subtotal: record.order.subtotal,
    merchantOrderRef: record.merchantOrderRef,
    merchantId,
    state,
  });

  const response = await sequraRequest(record.sequraOrderUrl, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (response.status === 409) {
    const data = (await response.json().catch(() => null)) as { errors?: string[] } | null;
    const message = data?.errors?.join(" ") ?? "SeQura no pudo confirmar el pedido.";
    throw new Error(message);
  }

  if (!response.ok && response.status !== 202) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `SeQura respondió con ${response.status} al confirmar.`);
  }
}

type FulfillResult =
  | { ok: true; emailSent: boolean; alreadySent: boolean; emails?: OrderEmailResult }
  | { ok: false; error: string };

export async function fulfillSequraOrder(
  merchantOrderRef: string,
  status: SequraOrderStatus,
  productCode?: string,
): Promise<FulfillResult> {
  const record = await getSequraOrderByMerchantRef(merchantOrderRef);
  if (!record) {
    return { ok: false, error: "Pedido SeQura no encontrado." };
  }

  if (record.emailSent && status === "confirmed") {
    return { ok: true, emailSent: false, alreadySent: true };
  }

  if (status === "confirmed") {
    await updateSequraOrderState(record, "confirmed");
  } else if (status === "on_hold") {
    await updateSequraOrderState(record, "on_hold");
  }

  await updateSequraOrder(merchantOrderRef, {
    status,
    productCode,
    order: {
      ...record.order,
      paymentStatus: status === "confirmed" ? "paid" : "pending",
      paymentProvider: "sequra",
      sequraOrderUuid: record.sequraOrderUuid,
      merchantOrderRef,
    },
  });

  if (status !== "confirmed") {
    return { ok: true, emailSent: false, alreadySent: false };
  }

  const paidOrder: OrderPayload = {
    ...record.order,
    paymentStatus: "paid",
    paymentProvider: "sequra",
    sequraOrderUuid: record.sequraOrderUuid,
    merchantOrderRef,
  };

  try {
    const emails = await sendOrderNotifications(paidOrder);
    await updateSequraOrder(merchantOrderRef, { emailSent: true });
    console.info(`[sequra-order] ✅ Pedido ${merchantOrderRef} confirmado y emails enviados`);
    return { ok: true, emailSent: true, alreadySent: false, emails };
  } catch (error) {
    console.error("[sequra-order] ❌ Fallo al enviar emails:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Error al enviar emails.",
    };
  }
}

function isValidIpnToken(merchantOrderRef: string, token?: string) {
  if (!token) return true;
  return token === createIpnToken(merchantOrderRef);
}

export async function handleSequraIpn(payload: SequraIpnPayload) {
  const merchantOrderRef =
    payload.order_ref_1 ??
    (payload.order_ref ? (await getSequraOrderByUuid(payload.order_ref))?.merchantOrderRef : null);

  if (!merchantOrderRef) {
    console.warn("[sequra-ipn] Pedido no encontrado", payload);
    return { status: 404 as const };
  }

  const record = await getSequraOrderByMerchantRef(merchantOrderRef);
  if (!record) {
    return { status: 404 as const };
  }

  if (!isValidIpnToken(merchantOrderRef, payload.token)) {
    console.warn("[sequra-ipn] Token IPN inválido", merchantOrderRef);
    return { status: 403 as const };
  }

  const sqState = payload.sq_state ?? "";
  console.info(`[sequra-ipn] ${merchantOrderRef} → ${sqState}`);

  if (sqState === "approved") {
    try {
      await fulfillSequraOrder(merchantOrderRef, "confirmed", payload.product_code);
    } catch (error) {
      console.error("[sequra-ipn] Error al confirmar:", error);
    }
    return { status: 200 as const };
  }

  if (sqState === "needs_review") {
    try {
      await fulfillSequraOrder(merchantOrderRef, "on_hold", payload.product_code);
    } catch (error) {
      console.error("[sequra-ipn] Error al poner en espera:", error);
    }
    return { status: 200 as const };
  }

  return { status: 200 as const };
}

export async function getSequraOrderStatus(merchantOrderRef: string) {
  const record = await getSequraOrderByMerchantRef(merchantOrderRef);
  if (!record) return null;

  return {
    merchantOrderRef: record.merchantOrderRef,
    status: record.status,
    emailSent: record.emailSent,
    paid: record.status === "confirmed",
    onHold: record.status === "on_hold",
  };
}
