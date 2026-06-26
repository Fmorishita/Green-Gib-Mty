import type { Product } from "@/types";

/** 12 productos demostrativos para la tienda. */
export const products: Product[] = [
  {
    id: "pr1",
    slug: "maceta-terracota-grande",
    name: "Maceta de terracota artesanal grande",
    category: "Macetas",
    description:
      "Maceta de terracota de gran formato, hecha a mano, con acabado natural que envejece con elegancia. Ideal para palmeras, olivos o plantas de acento en terrazas y entradas.",
    price: 2490,
    images: ["Maceta terracota grande", "Maceta terracota detalle"],
    stock: 8,
    availability: "Disponible",
    featured: true,
    active: true,
    relatedSlugs: ["maceta-concreto-minimalista", "jardinera-madera-rectangular"],
  },
  {
    id: "pr2",
    slug: "maceta-concreto-minimalista",
    name: "Maceta de concreto minimalista",
    category: "Macetas",
    description:
      "Maceta de concreto pulido con líneas limpias y estética arquitectónica. Resistente a la intemperie y perfecta para un look contemporáneo.",
    price: 1690,
    images: ["Maceta concreto minimalista", "Maceta concreto set"],
    stock: 15,
    availability: "Disponible",
    featured: true,
    active: true,
    relatedSlugs: ["maceta-terracota-grande", "set-macetas-concreto-trio"],
  },
  {
    id: "pr3",
    slug: "olivo-europeo-mediano",
    name: "Olivo europeo (mediano)",
    category: "Plantas",
    description:
      "Olivo de hoja perenne, símbolo de elegancia mediterránea y muy resistente al clima de Monterrey. Una pieza escultórica viva para patios y terrazas.",
    price: 3200,
    images: ["Olivo europeo mediano", "Olivo follaje detalle"],
    stock: 6,
    availability: "Disponible",
    featured: true,
    active: true,
    relatedSlugs: ["maceta-terracota-grande", "palma-areca-interior"],
  },
  {
    id: "pr4",
    slug: "palma-areca-interior",
    name: "Palma areca para interior",
    category: "Plantas",
    description:
      "Palma de interior que aporta frescura tropical y purifica el aire. Ideal para recibidores, salas y oficinas con buena luz indirecta.",
    price: 1450,
    images: ["Palma areca interior", "Palma areca maceta"],
    stock: 20,
    availability: "Disponible",
    featured: false,
    active: true,
    relatedSlugs: ["olivo-europeo-mediano", "kit-suculentas-exterior"],
  },
  {
    id: "pr5",
    slug: "jardinera-madera-rectangular",
    name: "Jardinera de madera rectangular",
    category: "Jardineras",
    description:
      "Jardinera de madera tratada para exterior, con drenaje integrado. Perfecta para delimitar espacios, crear privacidad verde o cultivar aromáticas.",
    price: 2890,
    images: ["Jardinera madera rectangular", "Jardinera madera con plantas"],
    stock: 10,
    availability: "Disponible",
    featured: true,
    active: true,
    relatedSlugs: ["maceta-concreto-minimalista", "kit-aromaticas-cocina"],
  },
  {
    id: "pr6",
    slug: "panel-jardin-vertical-modular",
    name: "Panel modular para jardín vertical",
    category: "Productos para jardín",
    description:
      "Panel modular con sistema de retención de humedad para crear muros verdes y jardines verticales. Escalable y fácil de instalar.",
    price: 990,
    images: ["Panel jardín vertical modular", "Panel jardín vertical instalado"],
    stock: 40,
    availability: "Disponible",
    featured: false,
    active: true,
    relatedSlugs: ["kit-suculentas-exterior", "sistema-riego-goteo"],
  },
  {
    id: "pr7",
    slug: "set-macetas-concreto-trio",
    name: "Set de 3 macetas de concreto",
    category: "Macetas",
    description:
      "Trío de macetas de concreto en tres alturas, pensadas para componer rincones con profundidad y ritmo. Combinan en cualquier paleta natural.",
    price: 3990,
    images: ["Set tres macetas concreto", "Set macetas composición"],
    stock: 12,
    availability: "Disponible",
    featured: false,
    active: true,
    relatedSlugs: ["maceta-concreto-minimalista", "maceta-terracota-grande"],
  },
  {
    id: "pr8",
    slug: "lampara-solar-exterior",
    name: "Lámpara solar de exterior",
    category: "Accesorios",
    description:
      "Lámpara de exterior con carga solar y luz cálida, sin necesidad de instalación eléctrica. Ilumina andadores, jardineras y zonas de estar.",
    price: 790,
    images: ["Lámpara solar exterior", "Lámpara solar jardín noche"],
    stock: 35,
    availability: "Disponible",
    featured: true,
    active: true,
    relatedSlugs: ["jardinera-madera-rectangular", "set-piezas-decorativas-piedra"],
  },
  {
    id: "pr9",
    slug: "kit-suculentas-exterior",
    name: "Kit de suculentas para exterior",
    category: "Kits",
    description:
      "Selección de 6 suculentas resistentes al sol de Monterrey, listas para componer una jardinera de bajo mantenimiento y alto impacto.",
    price: 690,
    images: ["Kit suculentas exterior", "Suculentas composición"],
    stock: 25,
    availability: "Disponible",
    featured: false,
    active: true,
    relatedSlugs: ["panel-jardin-vertical-modular", "maceta-concreto-minimalista"],
  },
  {
    id: "pr10",
    slug: "set-piezas-decorativas-piedra",
    name: "Set de piezas decorativas de piedra",
    category: "Piezas decorativas",
    description:
      "Conjunto de piezas de piedra natural para acentuar rincones del jardín, caminos o jardineras con un toque escultórico y orgánico.",
    price: 1290,
    images: ["Piezas decorativas piedra", "Piedra natural jardín"],
    stock: 18,
    availability: "Disponible",
    featured: false,
    active: true,
    relatedSlugs: ["lampara-solar-exterior", "maceta-terracota-grande"],
  },
  {
    id: "pr11",
    slug: "sistema-riego-goteo",
    name: "Sistema de riego por goteo",
    category: "Productos para jardín",
    description:
      "Kit de riego por goteo programable para mantener tus plantas hidratadas de forma eficiente, ahorrando agua y tiempo de mantenimiento.",
    price: 1190,
    images: ["Sistema riego goteo", "Riego goteo instalado"],
    stock: 22,
    availability: "Disponible",
    featured: false,
    active: true,
    relatedSlugs: ["panel-jardin-vertical-modular", "kit-aromaticas-cocina"],
  },
  {
    id: "pr12",
    slug: "kit-aromaticas-cocina",
    name: "Kit de hierbas aromáticas",
    category: "Kits",
    description:
      "Albahaca, romero, menta y tomillo en presentación lista para jardinera o cocina. Frescura y aroma a un paso de tu mesa.",
    price: 540,
    images: ["Kit hierbas aromáticas", "Aromáticas jardinera"],
    stock: 30,
    availability: "Disponible",
    featured: true,
    active: true,
    relatedSlugs: ["jardinera-madera-rectangular", "kit-suculentas-exterior"],
  },
];

export const productCategories = [
  "Plantas",
  "Macetas",
  "Decoración exterior",
  "Accesorios",
  "Productos para jardín",
  "Jardineras",
  "Piezas decorativas",
  "Kits",
] as const;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product): Product[] {
  if (!product.relatedSlugs?.length) {
    return products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  }
  return product.relatedSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => Boolean(p));
}
