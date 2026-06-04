import type { Product } from "@/types/product";
import { PRODUCT_FINISHES } from "@/lib/finishes";
import { getProductImageUrl } from "@/lib/product-image";

function accessory(
  id: string,
  title: string,
  description: string,
  price: number,
  imageUrl: string
): Product {
  return {
    id,
    slug: id,
    title,
    description,
    imageUrl,
    price,
    priceFrom: false,
    finishes: [],
    infoHref: `/productos/${id}`,
    configureHref: `/productos/${id}/configurar`,
  };
}

function product(
  id: string,
  title: string,
  description: string,
  price: number
): Product {
  return {
    id,
    slug: id,
    title,
    description,
    imageUrl: getProductImageUrl(title),
    price,
    priceFrom: true,
    finishes: PRODUCT_FINISHES,
    infoHref: `/productos/${id}`,
    configureHref: `/productos/${id}/configurar`,
  };
}

/** Catálogo basado en [quooker.es — ventajas](https://www.quooker.es/informacion-sobre-quooker/ventajas) */
export const QUOOKER_CATALOG: Product[] = [
  product(
    "flex-round",
    "Flex Round",
    "Nuestro modelo todo en uno más vendido, con una manguera flexible extraíble para rociado direccional.",
    1395
  ),
  product(
    "flex-square",
    "Flex Square",
    "Nuestro modelo todo en uno más vendido, con una manguera flexible extraíble para rociado direccional.",
    1395
  ),
  product(
    "fusion-round",
    "Fusion Round",
    "La versión redondeada del icónico grifo todo en uno de Quooker, con un diseño moderno.",
    1395
  ),
  product(
    "fusion-square",
    "Fusion Square",
    "La versión cuadrada del icónico grifo todo en uno de Quooker, con un diseño moderno.",
    1395
  ),
  product(
    "front",
    "Front",
    "Nuestro modelo más reciente y ergonómico, con controles de agua caliente y fría en la parte frontal.",
    1570
  ),
  product(
    "classic-fusion-round",
    "Classic Fusion Round",
    "La versión redondeada del icónico grifo todo en uno de Quooker, con un diseño clásico y biselado.",
    1395
  ),
  product(
    "classic-fusion-square",
    "Classic Fusion Square",
    "La versión cuadrada del icónico grifo todo en uno de Quooker, con un diseño clásico y biselado.",
    1395
  ),
  product(
    "classic-nordic-round-single",
    "Classic Nordic Round Single Tap",
    "Grifo único nórdico para agua hirviendo instantánea a 100 °C junto al mezclador.",
    1420
  ),
  product(
    "nordic-round-single",
    "Nordic Round Single Tap",
    "Grifo único nórdico para agua hirviendo instantánea a 100 °C junto al mezclador.",
    1420
  ),
  product(
    "nordic-square-single",
    "Nordic Square Single Tap",
    "Grifo único nórdico para agua hirviendo instantánea a 100 °C junto al mezclador.",
    1420
  ),
  product(
    "nordic-round-twintaps",
    "Nordic Round Twintaps",
    "Conjunto a juego: grifo de agua hirviendo y mezclador Quooker coordinados.",
    1735
  ),
  product(
    "nordic-square-twintaps",
    "Nordic Square Twintaps",
    "Conjunto a juego: grifo de agua hirviendo y mezclador Quooker coordinados.",
    1735
  ),
];

/** Accesorios CUBE — imágenes en /public/images/products/ */
export const QUOOKER_CUBE_ACCESSORIES: Product[] = [
  accessory(
    "cube",
    "CUBE",
    "Proporciona agua refrigerada filtrada, con y sin gas",
    1300,
    "/images/products/CUBE.webp"
  ),
  accessory(
    "co2-4-pack",
    "Juego de 4 bombonas de CO₂",
    "Una botella proporciona 60 litros agua con gas",
    60,
    "/images/products/Juego4Bombo.webp"
  ),
  accessory(
    "cube-filter-cartridge",
    "CUBE cartucho de filtración",
    "Filtro especial para la mejor calidad del agua",
    119,
    "/images/products/cubeCartuchoFiltracion.webp"
  ),
];
