import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata: Metadata = {
  title: "Carrito | Tienda Quooker · Creanogal",
  description: "Revisa los productos Quooker en tu carrito antes de finalizar la compra.",
};

export default function CarritoPage() {
  return <CartPageContent />;
}
