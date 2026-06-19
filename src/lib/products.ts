import { ALL_QUOOKER_PRODUCTS, getProductBySlug } from "@/lib/quooker-catalog";

export async function getProducts() {
  return ALL_QUOOKER_PRODUCTS;
}

export async function getProduct(slug: string) {
  return getProductBySlug(slug) ?? null;
}
