import { createHash, randomBytes } from "crypto";
import type { OrderCustomer, OrderItem } from "@/types/order";
import { buildSequraPublicUrl } from "@/lib/sequra";

export type SequraOrderState = "" | "confirmed" | "on_hold";

type BuildPayloadInput = {
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  merchantOrderRef: string;
  merchantId: string;
  state?: SequraOrderState;
  userAgent?: string;
  clientIp?: string;
};

function toCents(amount: number) {
  return Math.round(amount * 100);
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { givenNames: "Cliente", surnames: "Creanogal" };
  if (parts.length === 1) return { givenNames: parts[0], surnames: "-" };
  return { givenNames: parts[0], surnames: parts.slice(1).join(" ") };
}

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, "").replace(/^\+34/, "");
}

export function createMerchantOrderRef() {
  const suffix = randomBytes(3).toString("hex");
  return `CG-${Date.now()}-${suffix}`;
}

export function createIpnToken(merchantOrderRef: string) {
  const secret = process.env.SEQURA_ACCOUNT_SECRET ?? "";
  return createHash("sha256").update(`${merchantOrderRef}:${secret}`).digest("hex");
}

export function buildSequraOrderPayload(input: BuildPayloadInput) {
  const { givenNames, surnames } = splitName(input.customer.name);
  const mobilePhone = normalizePhone(input.customer.phone);
  const orderTotalCents = toCents(input.subtotal);

  const cartItems = input.items.map((item) => {
    const unitCents = toCents(item.unitPrice);
    const lineCents = toCents(item.lineTotal);
    return {
      type: "product" as const,
      reference: item.productId,
      name: item.title,
      description: item.title,
      category: "quooker",
      price_with_tax: unitCents,
      quantity: item.quantity,
      total_with_tax: lineCents,
      downloadable: false,
    };
  });

  const address = {
    given_names: givenNames,
    surnames,
    company: "",
    address_line_1: input.customer.address,
    address_line_2: "",
    postal_code: input.customer.postalCode,
    city: input.customer.city,
    country_code: "ES",
    mobile_phone: mobilePhone,
  };

  const notifyUrl = buildSequraPublicUrl("/api/sequra/ipn");
  const returnUrl = buildSequraPublicUrl(
    `/checkout/success?provider=sequra&order_ref_1=${encodeURIComponent(input.merchantOrderRef)}&payment_method=sq-SQ_PRODUCT_CODE`,
  );
  const abortUrl = buildSequraPublicUrl("/checkout?cancelled=1");

  const order: Record<string, unknown> = {
    merchant: {
      id: input.merchantId,
      notify_url: notifyUrl,
      return_url: returnUrl,
      abort_url: abortUrl,
      notification_parameters: {
        order_ref_1: input.merchantOrderRef,
        token: createIpnToken(input.merchantOrderRef),
      },
    },
    merchant_reference: {
      order_ref_1: input.merchantOrderRef,
    },
    cart: {
      currency: "EUR",
      gift: false,
      order_total_with_tax: orderTotalCents,
      cart_ref: input.merchantOrderRef,
      items: cartItems,
    },
    customer: {
      given_names: givenNames,
      surnames,
      email: input.customer.email,
      logged_in: false,
      language_code: "es-ES",
      ip_number: input.clientIp ?? "127.0.0.1",
      user_agent: input.userAgent ?? "Creanogal/1.0",
    },
    delivery_method: {
      name: "physical",
      home_delivery: true,
    },
    delivery_address: address,
    invoice_address: address,
    platform: {
      name: "creanogal.es",
      version: "1.0",
      plugin_version: "1.0.0",
    },
    gui: {
      layout: "desktop",
    },
  };

  if (input.state) {
    order.state = input.state;
  } else {
    order.state = "";
  }

  return { order };
}
