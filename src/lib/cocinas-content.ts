export const COCINAS_HERO = {
  label: "Cocinas a medida en Las Palmas",
  title: "Cocinas que se viven",
  titleHighlight: "cada día",
  intro:
    "Diseñamos y fabricamos cocinas a medida que combinan funcionalidad, materiales premium y un acabado impecable. Tu espacio, tu estilo.",
  primaryCta: { label: "Pide presupuesto", href: "/contacto" },
  secondaryCta: { label: "Ver proyectos", href: "/proyectos" },
} as const;

export type KitchenSlide = {
  id: string;
  label: string;
  title: string;
  text: string;
  imageUrl: string;
  imageAlt: string;
};

export const COCINAS_SLIDES: KitchenSlide[] = [
  {
    id: "moderna",
    label: "Estilo contemporáneo",
    title: "Líneas puras, máxima funcionalidad",
    text: "Frentes sin tiradores, electrodomésticos integrados y superficies continuas para una cocina serena y elegante.",
    imageUrl: "/images/cocinas/xzx.jpeg",
    imageAlt: "Cocina moderna a medida con acabados premium",
  },
  {
    id: "isla",
    label: "Cocinas con isla",
    title: "El centro de tu hogar",
    text: "Islas multifuncionales que invitan a cocinar, compartir y reunirse. Espacio de trabajo y vida en una sola pieza.",
    imageUrl: "/images/banners/hero-grifo.jpeg",
    imageAlt: "Cocina con isla central y grifo de diseño",
  },
  {
    id: "detalle",
    label: "Detalle y acabado",
    title: "La diferencia está en los detalles",
    text: "Maderas nobles, herrajes de alta gama y grifería premium. Cada elemento elegido para durar y emocionar.",
    imageUrl: "/images/banners/hero2-grifo.jpeg",
    imageAlt: "Detalle de grifería premium en cocina a medida",
  },
  {
    id: "proyecto-2",
    label: "Proyecto a medida",
    title: "Espacios pensados para tu día a día",
    text: "Distribuciones inteligentes que aprovechan cada rincón, con almacenaje a medida y materiales que duran.",
    imageUrl: "/images/cocinas/cocina-2.jpeg",
    imageAlt: "Cocina a medida fabricada por Creanogal",
  },
  {
    id: "proyecto-3",
    label: "Acabado premium",
    title: "Calidad que se nota en cada detalle",
    text: "Encimeras, frentes y herrajes seleccionados para un resultado elegante, funcional y duradero.",
    imageUrl: "/images/cocinas/cocina-3.jpeg",
    imageAlt: "Detalle de cocina a medida con acabado premium",
  },
];

export const COCINAS_FEATURES = [
  {
    number: "01",
    title: "Diseño 3D personalizado",
    text: "Visualiza tu cocina antes de fabricarla con un proyecto a medida adaptado a tu espacio.",
  },
  {
    number: "02",
    title: "Materiales premium",
    text: "Trabajamos con las mejores maderas, encimeras y herrajes del mercado.",
  },
  {
    number: "03",
    title: "Fabricación propia",
    text: "Controlamos cada fase: del diseño al montaje, sin intermediarios.",
  },
  {
    number: "04",
    title: "Instalación garantizada",
    text: "Equipo propio de instaladores en Las Palmas con acabado impecable.",
  },
] as const;

export const COCINAS_CTA = {
  title: "Hagamos realidad la cocina que imaginas",
  subtitle:
    "Cuéntanos tu proyecto y te asesoramos sin compromiso. Presupuesto a medida en Las Palmas.",
  buttonLabel: "Pide tu presupuesto",
  href: "/contacto",
} as const;
