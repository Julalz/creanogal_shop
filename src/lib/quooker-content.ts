export type QuookerAdvantage = {
  number: string;
  title: string;
  titleHighlight?: string;
  description: string;
  link?: { label: string; href: string };
};

export type QuookerFaq = {
  question: string;
  answer: string;
};

export const QUOOKER_VENTAJAS_INTRO =
  "Los clásicos hervidores eléctricos o con silbato funcionan bien, pero cuando enumeras todas las ventajas de un grifo Quooker, no hay competencia. Esto es lo que un grifo Quooker aporta a tu hogar.";

export const QUOOKER_ADVANTAGES: QuookerAdvantage[] = [
  {
    number: "1",
    title: "La opción",
    titleHighlight: "más segura",
    description:
      "En materia de seguridad, Quooker ofrece claras ventajas frente al hervidor tradicional gracias a sus múltiples sistemas de seguridad integrados y a estudios independientes que avalan su mayor seguridad.",
    link: { label: "Leer más sobre seguridad", href: "/quooker/seguridad" },
  },
  {
    number: "2",
    title: "Diseñado para",
    titleHighlight: "ahorrar tiempo",
    description:
      "Con Quooker, la espera es cosa del pasado. Siempre tendrás agua hirviendo al instante, filtrada, refrigerada y con gas directamente del grifo.",
  },
  {
    number: "3",
    title: "Ahorra espacio",
    titleHighlight: "en la encimera",
    description: "¿Cocina pequeña? Con Quooker liberas espacio en la encimera.",
  },
  {
    number: "4",
    title: "Una opción versátil",
    titleHighlight: "para el día a día",
    description:
      "Quooker es un electrodoméstico de cocina que puede utilizarse para una gran variedad de tareas diarias.",
    link: { label: "Descubre lo que puede hacer un Quooker", href: "/quooker/usos" },
  },
  {
    number: "5",
    title: "El mejor sabor,",
    titleHighlight: "directamente del grifo",
    description:
      "El sistema Quooker proporciona en cada uso un agua excepcionalmente fresca y de gran sabor.",
  },
];

export const QUOOKER_CUBE_SECTION = {
  label: "Complementos",
  title: "¿Ya tienes un grifo Quooker?",
  titleHighlight: "Actualiza con el CUBE",
};

export const QUOOKER_FAQS: QuookerFaq[] = [
  {
    question: "¿Quién puede instalar mi Quooker?",
    answer:
      "Contamos con un equipo especializado de servicio técnico de Quooker en todo el territorio nacional que puede instalar tu sistema Quooker. Alternativamente, tu fontanero, constructor o incluso tú mismo puedes instalarlo: ¡es sorprendentemente sencillo!",
  },
  {
    question: "¿Cómo puedo crear una cuenta My Quooker?",
    answer: "Puedes crear una cuenta en Mi Quooker en la web oficial de Quooker.",
  },
  {
    question: "¿Cómo obtengo agua hirviendo del grifo?",
    answer:
      "Todos los grifos Quooker dispensan agua hirviendo mediante un sencillo movimiento de presionar y girar el bisel, el anillo situado en la base del caño. Este mecanismo patentado evita que los más pequeños dispensen accidentalmente agua hirviendo.",
  },
];
