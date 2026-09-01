/** Configuración global del sitio: navegación, contacto, marca. */

export const siteConfig = {
  name: "Green Gib",
  tagline: "Paisajismo premium en Monterrey",
  description:
    "Diseñamos espacios verdes que elevan la forma en que vives, trabajas y convives.",
  city: "Monterrey, Nuevo León",
  serviceArea: "Monterrey y zona metropolitana",
  email: "hola@greengib.mx",
  instagram: "https://www.instagram.com/greengib",
  instagramHandle: "@greengib",
};

export const mainNav = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Portafolio", href: "/portafolio" },
  { label: "Tienda", href: "/tienda" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

export const footerNav = {
  servicios: [
    { label: "Paisajismo residencial", href: "/servicios/paisajismo-residencial" },
    { label: "Muros verdes", href: "/servicios/muros-verdes" },
    { label: "Diseño de jardines", href: "/servicios/diseno-de-jardines" },
    { label: "Terrazas y rooftops", href: "/servicios/terrazas-patios-rooftops" },
    { label: "Mantenimiento", href: "/servicios/mantenimiento-areas-verdes" },
  ],
  explorar: [
    { label: "Portafolio", href: "/portafolio" },
    { label: "Tienda", href: "/tienda" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/contacto" },
  ],
};

/** Pilares de confianza para la barra superior del hero. */
export const trustPillars = [
  "Paisajismo residencial",
  "Proyectos comerciales",
  "Muros verdes",
  "Decoración exterior",
];

/** Pasos del proceso de trabajo. */
export const processSteps = [
  {
    number: "01",
    title: "Valoración y diagnóstico",
    description:
      "Visitamos tu espacio, entendemos cómo lo vives y medimos luz, suelo, clima y flujo. Sin diagnóstico no hay buen diseño.",
  },
  {
    number: "02",
    title: "Diseño y propuesta",
    description:
      "Desarrollamos el concepto, la selección de especies y materiales, y te presentamos la propuesta con alcance y presupuesto claros.",
  },
  {
    number: "03",
    title: "Ejecución profesional",
    description:
      "Nuestro equipo construye con orden, limpieza y cumplimiento de tiempos. Coordinamos cada detalle para que no tengas que preocuparte.",
  },
  {
    number: "04",
    title: "Entrega y mantenimiento",
    description:
      "Entregamos el espacio terminado y te acompañamos con planes de mantenimiento para que se mantenga vivo y en su mejor versión.",
  },
];

/** Diferenciadores de la marca. */
export const differentiators = [
  {
    title: "Diseño con intención",
    description:
      "Cada proyecto parte de cómo quieres habitar el espacio, no de un catálogo genérico de plantas.",
  },
  {
    title: "Ejecución que cumple",
    description:
      "Equipo propio, tiempos claros y obra limpia. Lo que diseñamos es lo que entregamos.",
  },
  {
    title: "Expertos en clima de Monterrey",
    description:
      "Seleccionamos especies y materiales que resisten el calor, el sol y el ritmo de la ciudad.",
  },
  {
    title: "Acompañamiento a largo plazo",
    description:
      "No desaparecemos al terminar. Mantenemos tu espacio vivo con planes de cuidado continuo.",
  },
];

export const faqs = [
  {
    question: "¿En qué zonas de Monterrey trabajan?",
    answer:
      "Damos servicio en todo Monterrey y su zona metropolitana: San Pedro, Valle Oriente, Cumbres, Carretera Nacional, Santiago, Apodaca, Escobedo, García y municipios cercanos.",
  },
  {
    question: "¿Cuánto cuesta un proyecto de paisajismo?",
    answer:
      "Depende del tamaño, el alcance y los materiales. Tenemos proyectos desde $15,000 MXN hasta más de $120,000 MXN. Tras una valoración te entregamos un presupuesto claro y sin sorpresas.",
  },
  {
    question: "¿Hacen el diseño y también la ejecución?",
    answer:
      "Sí. Somos un equipo integral: diseñamos, ejecutamos y damos mantenimiento. Esto evita que tengas que coordinar a varios proveedores y garantiza que el resultado sea fiel al diseño.",
  },
  {
    question: "¿Trabajan con arquitectos y desarrolladores?",
    answer:
      "Constantemente. Colaboramos como aliados de paisajismo en proyectos residenciales y comerciales, respetando el lenguaje arquitectónico y los tiempos de obra.",
  },
  {
    question: "¿Ofrecen mantenimiento después de entregar?",
    answer:
      "Sí. Contamos con planes de mantenimiento periódico para conservar jardines, muros verdes y áreas exteriores en óptimas condiciones durante todo el año.",
  },
  {
    question: "¿Cuánto tarda un proyecto?",
    answer:
      "Un jardín residencial puede tomar de 1 a 4 semanas según el alcance. En la propuesta siempre incluimos un cronograma estimado.",
  },
];

/**
 * Rangos de inversión orientativos.
 * Coinciden con los rangos ya publicados en las FAQ y en el formulario de
 * contacto. Son referencias para orientar, no cotizaciones cerradas.
 */
export const investmentTiers = [
  {
    name: "Intervención puntual",
    range: "Desde $15,000 MXN",
    description:
      "Renovar un área concreta: jardineras, un rincón de estar, decoración exterior o mejorar la entrada.",
    includes: [
      "Diagnóstico del espacio",
      "Selección de vegetación y materiales",
      "Instalación y limpieza de obra",
    ],
    highlight: false,
  },
  {
    name: "Proyecto integral",
    range: "$40,000 – $120,000 MXN",
    description:
      "El rango más común en residencias: rediseño completo de jardín, terraza o patio, de la idea a la entrega.",
    includes: [
      "Diseño y propuesta con alcance claro",
      "Vegetación, materiales e iluminación",
      "Riego eficiente y ejecución supervisada",
      "Acompañamiento post-entrega",
    ],
    highlight: true,
  },
  {
    name: "Comercial y desarrollos",
    range: "Más de $120,000 MXN",
    description:
      "Corporativos, hoteles, restaurantes y desarrollos que requieren capacidad operativa y cumplimiento de tiempos.",
    includes: [
      "Coordinación con obra y arquitectura",
      "Muros verdes y áreas de gran escala",
      "Planes de mantenimiento continuo",
    ],
    highlight: false,
  },
];

/** Zonas de servicio (SEO local + claridad para el prospecto). */
export const coverageZones = [
  "San Pedro Garza García",
  "Valle Oriente",
  "Centrito Valle",
  "Cumbres",
  "Carretera Nacional",
  "Santiago",
  "Apodaca",
  "Escobedo",
  "García",
  "Santa Catarina",
  "Guadalupe",
  "Monterrey Centro",
];
