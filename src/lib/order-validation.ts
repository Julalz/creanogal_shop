import type { OrderCustomer, OrderItem } from "@/types/order";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseOrderCustomer(raw: Partial<OrderCustomer> | undefined): OrderCustomer {
  return {
    name: raw?.name?.trim() ?? "",
    email: raw?.email?.trim() ?? "",
    phone: raw?.phone?.trim() ?? "",
    address: raw?.address?.trim() ?? "",
    city: raw?.city?.trim() ?? "",
    postalCode: raw?.postalCode?.trim() ?? "",
    notes: raw?.notes?.trim() ?? "",
  };
}

export function parseOrderItems(raw: unknown): OrderItem[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item) => {
      if (typeof item !== "object" || item === null) return null;
      const record = item as Partial<OrderItem>;
      const productId = record.productId?.trim() ?? "";
      const title = record.title?.trim() ?? "";
      const quantity = Number(record.quantity ?? 0);
      const unitPrice = Number(record.unitPrice ?? 0);
      const lineTotal = Number(record.lineTotal ?? 0);

      if (!productId || !title || quantity <= 0 || unitPrice <= 0 || lineTotal <= 0) {
        return null;
      }

      return { productId, title, quantity, unitPrice, lineTotal };
    })
    .filter((item): item is OrderItem => item !== null);
}

export function validateOrderCustomer(customer: OrderCustomer) {
  if (
    !customer.name ||
    !customer.email ||
    !customer.phone ||
    !customer.address ||
    !customer.city ||
    !customer.postalCode
  ) {
    return "Faltan campos obligatorios.";
  }

  if (!EMAIL_RE.test(customer.email)) {
    return "Email no válido.";
  }

  return null;
}
