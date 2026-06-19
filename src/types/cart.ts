import type { Product } from "@/types/product";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};

export type CartLine = CartItem & {
  product: Product;
  lineTotal: number;
};
