export const REFORMAS_IMAGES = [
  "/images/reformas/reforma-1.jpeg",
  "/images/reformas/reforma-2.jpeg",
  "/images/reformas/reforma-3.jpeg",
  "/images/reformas/reforma-4.jpeg",
] as const;

export const REFORMAS_HERO = {
  label: "Reformas integrales",
  title: "Transformamos tu espacio",
  titleHighlight: "de principio a fin",
  intro:
    "Reformas integrales llave en mano en Las Palmas. Diseño, obra y carpintería a medida coordinados por un único equipo. Tú solo te preocupas de disfrutar el resultado.",
  primaryCta: { label: "Pide presupuesto", href: "/contacto" },
  secondaryCta: { label: "Ver proyectos", href: "#proyectos" },
  image: "/images/reformas/reforma-1.jpeg",
} as const;

export const REFORMAS_STATS = [
  { value: "+200", label: "Proyectos finalizados" },
  { value: "15", label: "Años de experiencia" },
  { value: "100%", label: "Llave en mano" },
  { value: "1", label: "Equipo, cero intermediarios" },
] as const;

export const REFORMAS_STEPS = [
  {
    number: "01",
    title: "Asesoramiento",
    text: "Visitamos tu espacio, escuchamos tu idea y definimos el alcance del proyecto sin compromiso.",
  },
  {
    number: "02",
    title: "Diseño y presupuesto",
    text: "Te presentamos la propuesta de diseño con materiales, plazos y un presupuesto cerrado y transparente.",
  },
  {
    number: "03",
    title: "Ejecución de obra",
    text: "Coordinamos todos los gremios y la carpintería a medida con un seguimiento constante.",
  },
  {
    number: "04",
    title: "Entrega",
    text: "Te entregamos el espacio terminado, limpio y listo para disfrutar, con garantía de calidad.",
  },
] as const;

export const REFORMAS_SHOWCASE = {
  label: "Proyectos",
  title: "Reformas que hablan por sí solas",
} as const;

export const REFORMAS_CTA = {
  title: "Demos forma a tu próxima reforma",
  subtitle:
    "Cuéntanos qué quieres cambiar y te preparamos una propuesta a medida, sin compromiso.",
  buttonLabel: "Empezar mi proyecto",
  href: "/contacto",
} as const;
