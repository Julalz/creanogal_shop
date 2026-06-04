export const NOSOTROS_HERO = {
  label: "Creanogal",
  tagline: "Fabricamos tus ideas",
  intro:
    "Somos Creanogal, una empresa ubicada en Las Palmas con años de experiencia haciendo lo que más nos gusta: transformar ideas en realidad.",
};

export const NOSOTROS_INTRO = [
  "Nos encanta crear espacios únicos, ya sea en tu hogar o negocio, con soluciones de carpintería que combinan calidad, estilo y funcionalidad.",
  "Aquí, cada proyecto es personal, y nos aseguramos de que todo quede justo como lo imaginas, cumpliendo siempre con los plazos acordados.",
] as const;

export type NosotrosBlock = {
  id: string;
  label: string;
  title: string;
  text: string;
  image?: string;
  link: { label: string; href: string };
};

export const NOSOTROS_BLOCKS: NosotrosBlock[] = [
  {
    id: "filosofia",
    label: "Nuestra filosofía",
    title: "Cada detalle cuenta",
    text: "En Creanogal, creemos que cada detalle cuenta. Nos dedicamos a escuchar y entender tus necesidades para ofrecer soluciones a medida que realmente reflejen tu estilo. Nos tomamos muy en serio la calidad, utilizando materiales de primera y técnicas precisas para que cada trabajo hable por sí solo.",
    image: "/images/proyectos/1/1.jpeg",
    link: { label: "Nuestras soluciones para tu hogar", href: "/cocinas" },
  },
  {
    id: "compromiso",
    label: "Nuestro compromiso",
    title: "Cumplimos lo que prometemos",
    text: "No solo se trata de carpintería, se trata de cumplir con lo que prometemos. Respetamos los tiempos de entrega y nos enorgullece ofrecer un servicio cercano y personalizado. Sabemos lo importante que es para ti tu proyecto, y por eso ponemos todo nuestro empeño en que el resultado sea perfecto.",
    image: "/images/proyectos/1/2.jpeg",
    link: { label: "Nuestros proyectos para negocios", href: "/reformas" },
  },
];

export const NOSOTROS_CTA = {
  title: "¿Buscas reformar tu casa?",
  subtitle: "Explora nuestras soluciones para tu hogar",
  href: "/contacto",
  buttonLabel: "Pide presupuesto",
};
