import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import "./product.css";

type ProductGridProps = {
  products: Product[];
  className?: string;
};

export function ProductGrid({ products, className = "" }: ProductGridProps) {
  return (
    <ul className={`product-grid ${className}`.trim()}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            title={product.title}
            description={product.description}
            imageUrl={product.imageUrl}
            imageAlt={product.imageAlt}
            price={product.price}
            priceFrom={product.priceFrom}
            finishes={product.finishes}
            infoHref={product.infoHref}
            configureHref={product.configureHref}
          />
        </li>
      ))}
    </ul>
  );
}
