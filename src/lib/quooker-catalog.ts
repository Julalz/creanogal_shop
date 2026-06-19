import type { Product } from "@/types/product";
import { QUOOKER_CATALOG, QUOOKER_CUBE_ACCESSORIES } from "@/lib/quooker-products";

export const ALL_QUOOKER_PRODUCTS: Product[] = [
  ...QUOOKER_CATALOG,
  ...QUOOKER_CUBE_ACCESSORIES,
];

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_QUOOKER_PRODUCTS.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return ALL_QUOOKER_PRODUCTS.map((p) => p.slug);
}
