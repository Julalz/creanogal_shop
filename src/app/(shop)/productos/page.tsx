import { ProductGrid } from "@/components/product/ProductGrid";
import { SAMPLE_PRODUCTS } from "@/lib/sample-products";
import "./productos.css";

export default function ProductosPage() {
  return (
    <div className="productos-page">
      <div className="container productos-page__inner">
        <header className="productos-page__header">
          <span className="label-caps">Catálogo</span>
          <h1 className="productos-page__title heading-serif">Productos</h1>
        </header>
        <ProductGrid products={SAMPLE_PRODUCTS} />
      </div>
    </div>
  );
}
