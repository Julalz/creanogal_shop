import type { Product } from "@/types/product";
import { PRODUCT_FINISHES } from "@/lib/finishes";
import { getProductImageUrl } from "@/lib/product-image";

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "fusion-round",
    slug: "fusion-round",
    title: "Fusion Round",
    description:
      "La versión redondeada del icónico grifo todo en uno de Quooker, con un diseño moderno.",
    imageUrl: getProductImageUrl("Fusion Round"),
    price: 1395,
    priceFrom: true,
    finishes: PRODUCT_FINISHES,
    infoHref: "/productos/fusion-round",
    configureHref: "/productos/fusion-round/configurar",
  },
  {
    id: "fusion-square",
    slug: "fusion-square",
    title: "Fusion Square",
    description:
      "Líneas rectas y estética contemporánea para cocinas minimalistas.",
    imageUrl: getProductImageUrl("Fusion Square"),
    price: 1395,
    priceFrom: true,
    finishes: PRODUCT_FINISHES,
    infoHref: "/productos/fusion-square",
    configureHref: "/productos/fusion-square/configurar",
  },
  {
    id: "flex",
    slug: "flex",
    title: "Flex Round",
    description: "Grifo flexible con caño giratorio y agua hirviendo al instante.",
    imageUrl: getProductImageUrl("Flex Round"),
    price: 1295,
    priceFrom: true,
    finishes: PRODUCT_FINISHES,
    infoHref: "/productos/flex",
    configureHref: "/productos/flex/configurar",
  },
  {
    id: "front",
    slug: "front",
    title: "Front",
    description: "Diseño clásico con palanca frontal, ideal para cocinas tradicionales.",
    imageUrl: getProductImageUrl("Front"),
    price: 1195,
    priceFrom: true,
    finishes: PRODUCT_FINISHES,
    infoHref: "/productos/front",
    configureHref: "/productos/front/configurar",
  },
];
