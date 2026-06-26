import type { Service } from "@/types";

/** 8 servicios principales de Green Gibb. */
export const services: Service[] = [
  {
    slug: "paisajismo-residencial",
    name: "Paisajismo residencial",
    icon: "Trees",
    shortDescription:
      "Diseño y construcción de jardines residenciales que se convierten en el espacio favorito de tu casa.",
    description:
      "Transformamos jardines, patios y áreas exteriores de tu hogar en espacios funcionales y memorables. Integramos vegetación, iluminación, materiales naturales y zonas de estar para que tu propiedad gane estética, plusvalía y un lugar donde realmente quieras pasar el tiempo.",
    benefits: [
      "Aumenta la plusvalía y el atractivo de tu propiedad",
      "Espacios diseñados para tu estilo de vida, no genéricos",
      "Especies adaptadas al clima de Monterrey",
      "Ejecución limpia, ordenada y en tiempo",
    ],
    forWhom: [
      "Propietarios residenciales premium",
      "Casas en San Pedro, Valle, Cumbres y Carretera Nacional",
      "Quien busca un jardín de bajo mantenimiento y alto impacto",
    ],
    problemsSolved: [
      "Jardines descuidados o sin diseño",
      "Espacios con potencial desaprovechado",
      "Plantas que mueren por mala selección o exposición",
    ],
    gallery: [
      "Jardín residencial San Pedro",
      "Patio interior con vegetación",
      "Entrada principal paisajismo",
    ],
    relatedSlugs: ["diseno-de-jardines", "muros-verdes", "mantenimiento-areas-verdes"],
    featured: true,
  },
  {
    slug: "diseno-de-jardines",
    name: "Diseño de jardines",
    icon: "PencilRuler",
    shortDescription:
      "Concepto, planos y selección de especies para jardines con criterio estético y técnico.",
    description:
      "El diseño es la diferencia entre un jardín que sobrevive y uno que enamora. Desarrollamos el concepto, la paleta vegetal, los materiales y la distribución de cada zona, considerando luz, suelo y la forma en que vas a usar el espacio. Te entregamos una visión clara antes de mover una sola planta.",
    benefits: [
      "Visión clara del resultado antes de construir",
      "Selección técnica de especies y materiales",
      "Composición pensada para todas las estaciones",
      "Optimización de luz, sombra y circulación",
    ],
    forWhom: [
      "Arquitectos y diseñadores que buscan un aliado de paisajismo",
      "Propietarios que quieren un proyecto bien planeado",
      "Desarrollos que necesitan identidad verde",
    ],
    problemsSolved: [
      "Jardines improvisados sin coherencia",
      "Compra de plantas sin saber dónde colocarlas",
      "Falta de criterio estético en exteriores",
    ],
    gallery: [
      "Plano de diseño de jardín",
      "Render de paisajismo",
      "Paleta vegetal Monterrey",
    ],
    relatedSlugs: ["paisajismo-residencial", "proyectos-comerciales", "muros-verdes"],
    featured: true,
  },
  {
    slug: "muros-verdes",
    name: "Muros verdes",
    icon: "Sprout",
    shortDescription:
      "Muros vivos que purifican, aíslan y convierten cualquier pared en una pieza protagonista.",
    description:
      "Un muro verde transforma una pared plana en una superficie viva que llama la atención, regula la temperatura y aporta frescura. Diseñamos sistemas de riego, sustrato y especies para interiores y exteriores, garantizando un muro saludable y de bajo mantenimiento que se ve increíble todo el año.",
    benefits: [
      "Impacto visual inmediato en casa o negocio",
      "Mejora la sensación térmica y reduce ruido",
      "Sistema de riego automatizado",
      "Ideal para fachadas, recepciones y terrazas",
    ],
    forWhom: [
      "Restaurantes, hoteles y oficinas",
      "Casas que buscan una fachada memorable",
      "Espacios comerciales que quieren destacar en redes",
    ],
    problemsSolved: [
      "Paredes frías o vacías sin personalidad",
      "Espacios pequeños sin lugar para jardín en piso",
      "Necesidad de un punto focal de alto impacto",
    ],
    gallery: [
      "Muro verde recepción corporativa",
      "Jardín vertical restaurante",
      "Fachada con muro vivo",
    ],
    relatedSlugs: ["jardines-verticales", "proyectos-comerciales", "decoracion-exterior"],
    featured: true,
  },
  {
    slug: "jardines-verticales",
    name: "Jardines verticales",
    icon: "Layers",
    shortDescription:
      "Soluciones verdes en altura para aprovechar cada metro cuadrado disponible.",
    description:
      "Cuando el espacio en piso es limitado, la solución está en las paredes. Creamos jardines verticales modulares y a medida, con especies seleccionadas por exposición y mantenimiento, perfectos para terrazas, patios interiores, balcones y zonas comerciales donde cada metro cuenta.",
    benefits: [
      "Aprovecha espacios reducidos al máximo",
      "Sistema modular y escalable",
      "Especies por exposición solar",
      "Mantenimiento simplificado",
    ],
    forWhom: [
      "Departamentos y espacios urbanos",
      "Patios interiores y balcones",
      "Negocios con poco espacio horizontal",
    ],
    problemsSolved: [
      "Falta de espacio en piso para vegetación",
      "Patios interiores grises o sin vida",
      "Necesidad de privacidad verde",
    ],
    gallery: [
      "Jardín vertical balcón",
      "Patio interior vertical",
      "Modular verde terraza",
    ],
    relatedSlugs: ["muros-verdes", "terrazas-patios-rooftops", "decoracion-exterior"],
  },
  {
    slug: "decoracion-exterior",
    name: "Decoración exterior",
    icon: "Flower2",
    shortDescription:
      "Macetas, jardineras, iluminación y piezas vivas que dan carácter a tu espacio.",
    description:
      "El paisajismo no termina en las plantas. Curamos macetas, jardineras, iluminación, mobiliario y piezas decorativas que completan la atmósfera de tu exterior. Una decoración bien pensada convierte un buen jardín en un espacio con identidad propia.",
    benefits: [
      "Atmósfera y carácter definidos",
      "Curaduría de piezas y materiales",
      "Iluminación que extiende el uso a la noche",
      "Combinación perfecta con tu arquitectura",
    ],
    forWhom: [
      "Casas y terrazas que ya tienen vegetación",
      "Restaurantes y hoteles que cuidan la experiencia",
      "Quien quiere refrescar su exterior sin obra mayor",
    ],
    problemsSolved: [
      "Espacios verdes sin personalidad",
      "Exteriores que no se usan de noche",
      "Macetas y piezas desordenadas o sin estilo",
    ],
    gallery: [
      "Decoración terraza con macetas",
      "Iluminación exterior jardín",
      "Composición de jardineras",
    ],
    relatedSlugs: ["terrazas-patios-rooftops", "jardineras-macetas", "paisajismo-residencial"],
  },
  {
    slug: "mantenimiento-areas-verdes",
    name: "Mantenimiento de áreas verdes",
    icon: "Scissors",
    shortDescription:
      "Planes de cuidado profesional para que tus espacios verdes luzcan impecables todo el año.",
    description:
      "Un buen jardín necesita cuidado continuo. Ofrecemos planes de mantenimiento periódico con poda, riego, control fitosanitario, fertilización y limpieza, ejecutados por personal capacitado. Mantenemos residencias, corporativos y desarrollos en su mejor versión durante todo el año.",
    benefits: [
      "Espacios siempre presentables",
      "Personal capacitado y confiable",
      "Prevención de plagas y enfermedades",
      "Planes a la medida de cada propiedad",
    ],
    forWhom: [
      "Residencias y fraccionamientos",
      "Corporativos y oficinas",
      "Desarrolladores y administradores de propiedades",
    ],
    problemsSolved: [
      "Jardines que se deterioran por falta de cuidado",
      "Proveedores informales poco confiables",
      "Plantas enfermas o áreas descuidadas",
    ],
    gallery: [
      "Equipo de mantenimiento de jardines",
      "Poda profesional",
      "Área verde corporativa cuidada",
    ],
    relatedSlugs: ["paisajismo-residencial", "proyectos-comerciales", "diseno-de-jardines"],
  },
  {
    slug: "proyectos-comerciales",
    name: "Proyectos comerciales",
    icon: "Building2",
    shortDescription:
      "Paisajismo de gran escala para desarrollos, corporativos y espacios comerciales.",
    description:
      "Acompañamos a desarrolladores, corporativos y espacios comerciales en proyectos de paisajismo de mayor escala. Aportamos capacidad operativa, cumplimiento de tiempos y un diseño que eleva la presentación del desarrollo y la experiencia de quienes lo habitan.",
    benefits: [
      "Capacidad operativa para proyectos grandes",
      "Cumplimiento de tiempos y especificaciones",
      "Imagen que aumenta el valor del desarrollo",
      "Coordinación con obra y arquitectura",
    ],
    forWhom: [
      "Desarrolladores inmobiliarios",
      "Corporativos y parques empresariales",
      "Plazas y espacios comerciales",
    ],
    problemsSolved: [
      "Necesidad de un proveedor confiable a gran escala",
      "Áreas verdes que no comunican el nivel del desarrollo",
      "Falta de coordinación entre paisajismo y obra",
    ],
    gallery: [
      "Paisajismo desarrollo residencial",
      "Áreas verdes corporativas",
      "Acceso comercial con jardinería",
    ],
    relatedSlugs: ["mantenimiento-areas-verdes", "muros-verdes", "diseno-de-jardines"],
  },
  {
    slug: "terrazas-patios-rooftops",
    name: "Terrazas, patios y rooftops",
    icon: "Sun",
    shortDescription:
      "Convertimos azoteas, terrazas y patios en espacios de estar al aire libre.",
    description:
      "Las terrazas y rooftops son metros valiosos que muchas veces se desperdician. Los transformamos en espacios de estar, con vegetación, sombra, pisos, iluminación y mobiliario, listos para disfrutar de día y de noche con la mejor vista de Monterrey.",
    benefits: [
      "Ganas un espacio de estar adicional",
      "Aprovechas vistas y aire libre",
      "Soluciones de sombra y privacidad",
      "Listo para usarse de día y de noche",
    ],
    forWhom: [
      "Departamentos y penthouses",
      "Casas con azotea o patio sin usar",
      "Restaurantes y bares con terraza",
    ],
    problemsSolved: [
      "Azoteas y terrazas desaprovechadas",
      "Falta de sombra o privacidad",
      "Espacios exteriores incómodos para estar",
    ],
    gallery: [
      "Rooftop con jardín y vista",
      "Terraza de estar con vegetación",
      "Patio convertido en estancia",
    ],
    relatedSlugs: ["decoracion-exterior", "jardines-verticales", "paisajismo-residencial"],
    featured: true,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured);
}
