import type { Metadata } from "next";
import { ProductGrid } from "@/components/product/ProductGrid";
import { QUOOKER_CATALOG, QUOOKER_CUBE_ACCESSORIES } from "@/lib/quooker-products";
import "./productos.css";

export const metadata: Metadata = {
  title: "Tienda Quooker | Creanogal · Las Palmas",
  description:
    "Compra grifos Quooker y accesorios CUBE. Distribuidor oficial en Las Palmas con asesoramiento e instalación.",
};

export default function ProductosPage() {
  return (
    <div className="productos-page">
      <div className="container productos-page__inner">
        <header className="productos-page__header">
          <span className="label-caps">Tienda online</span>
          <h1 className="productos-page__title heading-serif">Productos Quooker</h1>
          <p className="productos-page__intro">
            Grifos con agua hirviendo instantánea y accesorios CUBE. Añade al carrito y finaliza
            tu pedido; te confirmamos acabados e instalación antes del pago.
          </p>
        </header>

        <section aria-labelledby="quooker-grifos-title">
          <h2 id="quooker-grifos-title" className="productos-page__section-title heading-serif">
            Grifos Quooker
          </h2>
          <ProductGrid products={QUOOKER_CATALOG} />
        </section>

        <section aria-labelledby="quooker-cube-title">
          <h2 id="quooker-cube-title" className="productos-page__section-title heading-serif">
            Accesorios CUBE
          </h2>
          <ProductGrid products={QUOOKER_CUBE_ACCESSORIES} className="product-grid--cube" />
        </section>
      </div>
    </div>
  );
}
