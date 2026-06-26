import type { Project } from "@/types";

/**
 * 8 proyectos demostrativos.
 * Contenido editable: ilustra el tipo de trabajo y formato del portafolio.
 * Reemplaza con proyectos reales y fotografía propia antes de campañas.
 */
export const projects: Project[] = [
  {
    id: "p1",
    slug: "jardin-residencial-san-pedro",
    title: "Jardín residencial en San Pedro",
    category: "Residencial",
    location: "San Pedro Garza García, N.L.",
    description:
      "Rediseño integral del jardín frontal y posterior de una residencia, integrando zonas de estar, vegetación de bajo mantenimiento e iluminación arquitectónica.",
    challenge:
      "Un jardín amplio pero sin diseño, con pasto en mal estado, poca sombra y un espacio posterior que la familia casi no usaba.",
    solution:
      "Definimos zonas de estar y circulación, incorporamos especies nativas resistentes al calor, un sistema de riego eficiente e iluminación que extiende el uso del jardín a la noche.",
    cover_image: "Jardín residencial San Pedro fachada",
    gallery: [
      "Jardín San Pedro zona de estar",
      "Jardín San Pedro iluminación nocturna",
      "Jardín San Pedro vegetación",
      "Jardín San Pedro andador",
    ],
    services: ["Paisajismo residencial", "Diseño de jardines", "Decoración exterior"],
    details: [
      { label: "Superficie", value: "320 m²" },
      { label: "Duración", value: "3 semanas" },
      { label: "Estilo", value: "Natural contemporáneo" },
    ],
    beforeAfter: {
      before: "Jardín San Pedro antes",
      after: "Jardín San Pedro después",
    },
    featured: true,
  },
  {
    id: "p2",
    slug: "muro-verde-restaurante-valle",
    title: "Muro verde para restaurante en Valle Oriente",
    category: "Muros verdes",
    location: "Valle Oriente, Monterrey",
    description:
      "Muro verde de doble altura en el acceso de un restaurante, diseñado como punto focal y fondo fotográfico para clientes.",
    challenge:
      "El acceso del restaurante era frío y poco memorable. Buscaban un elemento que generara identidad y se volviera 'fotografiable' para redes.",
    solution:
      "Instalamos un muro verde de 5 metros con riego automatizado y una composición de especies de distintas texturas que se mantiene saludable bajo techo.",
    cover_image: "Muro verde restaurante acceso",
    gallery: [
      "Muro verde restaurante detalle",
      "Muro verde restaurante noche",
      "Muro verde restaurante texturas",
    ],
    services: ["Muros verdes", "Decoración exterior"],
    details: [
      { label: "Altura", value: "5 m" },
      { label: "Duración", value: "2 semanas" },
      { label: "Riego", value: "Automatizado" },
    ],
    featured: true,
  },
  {
    id: "p3",
    slug: "rooftop-penthouse-centrito",
    title: "Rooftop de penthouse en Centrito Valle",
    category: "Terrazas",
    location: "Centrito Valle, Monterrey",
    description:
      "Transformación de una azotea vacía en una terraza de estar con jardín, sombra y zona lounge con vista a la ciudad.",
    challenge:
      "Una azotea amplia, completamente desaprovechada y expuesta al sol, sin sombra ni vegetación.",
    solution:
      "Creamos zonas de estar con jardineras perimetrales, pérgola para sombra, piso de madera tecnológica e iluminación cálida para disfrutar la vista de noche.",
    cover_image: "Rooftop penthouse vista ciudad",
    gallery: [
      "Rooftop lounge con vegetación",
      "Rooftop pérgola sombra",
      "Rooftop iluminación nocturna",
      "Rooftop jardineras perimetrales",
    ],
    services: ["Terrazas, patios y rooftops", "Decoración exterior", "Jardineras y macetas"],
    details: [
      { label: "Superficie", value: "140 m²" },
      { label: "Duración", value: "4 semanas" },
      { label: "Vista", value: "Cerro de la Silla" },
    ],
    featured: true,
  },
  {
    id: "p4",
    slug: "areas-verdes-corporativo-apodaca",
    title: "Áreas verdes de corporativo en Apodaca",
    category: "Comercial",
    location: "Apodaca, N.L.",
    description:
      "Diseño y mantenimiento de las áreas verdes de un corporativo, mejorando la imagen del acceso y la experiencia de los colaboradores.",
    challenge:
      "Áreas verdes descuidadas que no comunicaban el nivel de la empresa ni invitaban a usarlas en los descansos.",
    solution:
      "Renovamos jardineras, andadores y accesos, incorporamos vegetación de bajo consumo de agua y establecimos un plan de mantenimiento mensual.",
    cover_image: "Corporativo Apodaca acceso verde",
    gallery: [
      "Corporativo jardineras",
      "Corporativo andador",
      "Corporativo zona de descanso",
    ],
    services: ["Proyectos comerciales", "Mantenimiento de áreas verdes"],
    details: [
      { label: "Superficie", value: "850 m²" },
      { label: "Modalidad", value: "Diseño + mantenimiento" },
      { label: "Frecuencia", value: "Mensual" },
    ],
    featured: false,
  },
  {
    id: "p5",
    slug: "jardin-vertical-oficina-cumbres",
    title: "Jardín vertical en oficina de Cumbres",
    category: "Muros verdes",
    location: "Cumbres, Monterrey",
    description:
      "Jardín vertical interior en la recepción de una oficina, que aporta frescura y mejora la primera impresión de clientes.",
    challenge:
      "Una recepción funcional pero impersonal, que no transmitía la calidez de la marca.",
    solution:
      "Diseñamos un jardín vertical modular con especies de interior de bajo mantenimiento e iluminación específica para su correcto desarrollo.",
    cover_image: "Jardín vertical recepción oficina",
    gallery: [
      "Jardín vertical detalle especies",
      "Jardín vertical recepción amplio",
    ],
    services: ["Jardines verticales", "Muros verdes"],
    details: [
      { label: "Superficie", value: "12 m²" },
      { label: "Tipo", value: "Interior" },
      { label: "Duración", value: "1 semana" },
    ],
    featured: false,
  },
  {
    id: "p6",
    slug: "patio-interior-casa-carretera-nacional",
    title: "Patio interior en Carretera Nacional",
    category: "Jardines",
    location: "Carretera Nacional, Monterrey",
    description:
      "Diseño de un patio interior tipo jardín zen que conecta visualmente con las estancias principales de la casa.",
    challenge:
      "Un patio interior gris y sin uso, visible desde la sala y el comedor, que restaba calidez a la casa.",
    solution:
      "Creamos una composición de piedra natural, vegetación de acento y un punto de agua, convirtiéndolo en un foco visual sereno para toda la planta baja.",
    cover_image: "Patio interior jardín zen",
    gallery: [
      "Patio interior piedra natural",
      "Patio interior vegetación de acento",
      "Patio interior punto de agua",
    ],
    services: ["Diseño de jardines", "Decoración exterior", "Paisajismo residencial"],
    details: [
      { label: "Superficie", value: "28 m²" },
      { label: "Estilo", value: "Zen contemporáneo" },
      { label: "Duración", value: "2 semanas" },
    ],
    featured: true,
  },
  {
    id: "p7",
    slug: "terraza-restaurante-santa-lucia",
    title: "Terraza de restaurante en Santa Lucía",
    category: "Decoración",
    location: "Centro, Monterrey",
    description:
      "Ambientación viva de la terraza de un restaurante con macetas, jardineras y vegetación para crear un ambiente memorable.",
    challenge:
      "Una terraza con buena ubicación pero ambiente plano, que no invitaba a los comensales a quedarse.",
    solution:
      "Curamos jardineras, macetas de distintas alturas y especies aromáticas, sumando iluminación cálida para lograr una atmósfera acogedora de día y de noche.",
    cover_image: "Terraza restaurante ambientación viva",
    gallery: [
      "Terraza restaurante macetas",
      "Terraza restaurante noche",
      "Terraza restaurante vegetación aromática",
    ],
    services: ["Decoración exterior", "Jardineras y macetas decorativas"],
    details: [
      { label: "Superficie", value: "65 m²" },
      { label: "Duración", value: "1 semana" },
      { label: "Enfoque", value: "Ambientación" },
    ],
    featured: false,
  },
  {
    id: "p8",
    slug: "jardin-frontal-desarrollo-garcia",
    title: "Jardín frontal de desarrollo en García",
    category: "Comercial",
    location: "García, N.L.",
    description:
      "Paisajismo del acceso principal de un desarrollo residencial, creando una primera impresión que comunica calidad.",
    challenge:
      "El acceso del desarrollo necesitaba un paisajismo que reflejara el nivel del proyecto y diera la bienvenida a residentes y prospectos.",
    solution:
      "Diseñamos un acceso con vegetación estructurada, iluminación y elementos de piedra que enmarcan la entrada y refuerzan la identidad del desarrollo.",
    cover_image: "Acceso desarrollo García paisajismo",
    gallery: [
      "Desarrollo García vegetación estructurada",
      "Desarrollo García iluminación de acceso",
    ],
    services: ["Proyectos comerciales", "Diseño de jardines", "Mantenimiento de áreas verdes"],
    details: [
      { label: "Superficie", value: "1,200 m²" },
      { label: "Duración", value: "6 semanas" },
      { label: "Tipo", value: "Acceso de desarrollo" },
    ],
    featured: false,
  },
];

export const projectCategories = [
  "Residencial",
  "Comercial",
  "Muros verdes",
  "Terrazas",
  "Jardines",
  "Decoración",
  "Mantenimiento",
] as const;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
