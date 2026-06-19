import type { CartItem } from "@/types/cart";

const STORAGE_KEY = "creanogal-cart";

export function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as CartItem).productId === "string" &&
        typeof (item as CartItem).quantity === "number" &&
        (item as CartItem).quantity > 0,
    );
  } catch {
    return [];
  }
}

export function writeCartToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
