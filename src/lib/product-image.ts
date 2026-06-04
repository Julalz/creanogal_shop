/** Ruta pública de imágenes de producto (nombre de archivo = título en camelCase). */
export const PRODUCT_IMAGES_DIR = "/images/productos";

/**
 * Convierte el título del producto al nombre de archivo.
 * Ej.: "Flex Round" → "flexRound", "Classic Fusion Square" → "classicFusionSquare"
 */
export function titleToImageFilename(title: string): string {
  const words = title.trim().split(/\s+/);
  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}

export function getProductImageUrl(title: string, extension = "webp"): string {
  return `${PRODUCT_IMAGES_DIR}/${titleToImageFilename(title)}.${extension}`;
}
