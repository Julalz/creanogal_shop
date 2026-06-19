import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { getAllProductSlugs, getProductBySlug } from "@/lib/quooker-catalog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: `${product.title} | Tienda Quooker · Creanogal`,
    description: product.description,
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
