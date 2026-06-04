export type Proyecto = {
  slug: string;
  folder: string;
  title: string;
  category: string;
  location: string;
  year: string;
  summary: string;
  description: string;
  images: string[];
};

function imagesFor(folder: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/images/proyectos/${folder}/${i + 1}.jpeg`);
}

export const PROYECTOS: Proyecto[] = [
  {
    slug: "reforma-de-local",
    folder: "1",
    title: "Reforma de local",
    category: "Reforma de local",
    location: "Las Palmas de Gran Canaria",
    year: "2026",
    summary: "Acondicionamiento integral de un local comercial con carpintería a medida y acabados premium.",
    description:
      "Reforma integral de un local comercial combinando diseño contemporáneo y carpintería a medida. Optimizamos la distribución, renovamos los acabados y fabricamos el mobiliario para lograr un espacio funcional, atractivo y preparado para el negocio.",
    images: imagesFor("1", 3),
  },
  {
    slug: "cocina-a-medida",
    folder: "2",
    title: "Cocina a medida",
    category: "Cocinas",
    location: "Las Palmas de Gran Canaria",
    year: "2026",
    summary: "Cocina contemporánea con frentes a medida, isla y materiales de primera.",
    description:
      "Proyecto de cocina diseñado y fabricado a medida. Frentes sin tiradores, encimera premium y un almacenaje pensado al detalle para aprovechar cada centímetro sin renunciar a la elegancia.",
    images: imagesFor("2", 3),
  },
  {
    slug: "carpinteria-y-mobiliario",
    folder: "3",
    title: "Carpintería y mobiliario",
    category: "Carpintería",
    location: "Las Palmas de Gran Canaria",
    year: "2026",
    summary: "Mobiliario y revestimientos en madera noble fabricados en taller propio.",
    description:
      "Diseño y fabricación de carpintería y mobiliario a medida. Trabajamos maderas nobles y herrajes de alta gama para crear piezas únicas, integradas en el espacio y pensadas para durar.",
    images: imagesFor("3", 3),
  },
];

export function getProyecto(slug: string): Proyecto | undefined {
  return PROYECTOS.find((p) => p.slug === slug);
}
