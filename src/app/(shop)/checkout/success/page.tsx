import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutSuccess } from "@/components/checkout/CheckoutSuccess";

export const metadata: Metadata = {
  title: "Pedido confirmado | Tienda Quooker · Creanogal",
  description: "Tu pedido Quooker ha sido recibido correctamente.",
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="checkout-page">
          <div className="container checkout-page__inner">
            <p>Confirmando tu pago…</p>
          </div>
        </div>
      }
    >
      <CheckoutSuccess />
    </Suspense>
  );
}
