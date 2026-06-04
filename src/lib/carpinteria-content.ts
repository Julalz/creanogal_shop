export const CARPINTERIA_IMAGES = {
  hero: "/images/carpinteria/carpinteria-1.jpeg",
  gallery: [
    "/images/carpinteria/carpinteria-1.jpeg",
    "/images/carpinteria/carpinteria-2.jpeg",
    "/images/carpinteria/carpinteria-3.jpeg",
    "/images/carpinteria/carpinteria-4.jpeg",
  ],
} as const;

export const CARPINTERIA_HERO = {
  label: "Carpintería de autor · Las Palmas",
  title: "El oficio de la madera",
  intro:
    "Diseñamos y fabricamos a medida: armarios, mobiliario, puertas y revestimientos. Cada pieza nace en nuestro taller con materiales nobles y un acabado artesanal.",
  cta: { label: "Pide presupuesto", href: "/contacto" },
} as const;

export const CARPINTERIA_MANIFESTO =
  "Trabajamos la madera como se ha hecho siempre: con tiempo, mimo y precisión. Pero con la mirada puesta en el diseño contemporáneo. El resultado son piezas únicas, hechas para durar y pensadas para tu espacio.";

export type CarpinteriaBlock = {
  id: string;
  label: string;
  title: string;
  text: string;
  image: string;
};

export const CARPINTERIA_BLOCKS: CarpinteriaBlock[] = [
  {
    id: "armarios",
    label: "Armarios y vestidores",
    title: "Almacenaje que aprovecha cada centímetro",
    text: "Diseñamos armarios y vestidores a medida que se integran en tu espacio, con interiores funcionales y acabados a juego con tu hogar.",
    image: "/images/carpinteria/carpinteria-2.jpeg",
  },
  {
    id: "mobiliario",
    label: "Mobiliario a medida",
    title: "Muebles únicos, hechos para ti",
    text: "Mesas, librerías, recibidores o muebles de salón. Creamos piezas exclusivas adaptadas a tus medidas, materiales y estilo.",
    image: "/images/carpinteria/carpinteria-3.jpeg",
  },
];

export const CARPINTERIA_GALLERY_INTRO = {
  label: "Trabajos recientes",
  title: "Algunos de nuestros proyectos",
} as const;

export const CARPINTERIA_CTA = {
  title: "¿Tienes un proyecto en mente?",
  subtitle:
    "Cuéntanos tu idea y la convertimos en una pieza a medida. Asesoramiento y presupuesto sin compromiso en Las Palmas.",
  buttonLabel: "Solicita tu presupuesto",
  href: "/contacto",
} as const;
