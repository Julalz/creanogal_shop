import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout | Tienda Quooker · Creanogal",
  description: "Finaliza tu pedido de productos Quooker con Creanogal.",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
