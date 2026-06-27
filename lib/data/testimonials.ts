import type { Testimonial } from "@/types";

/**
 * 4 testimonios demostrativos.
 * Contenido editable: reemplaza con testimonios reales y autorizados.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    client_name: "Mariana T.",
    project_type: "Jardín residencial · San Pedro",
    quote:
      "El equipo entendió perfecto lo que buscábamos. Pasamos de un jardín que no usábamos a tener el lugar favorito de la casa. La ejecución fue limpia y respetaron los tiempos.",
    rating: 5,
    image: "Cliente Mariana",
    active: true,
  },
  {
    id: "t2",
    client_name: "Roberto G.",
    project_type: "Muro verde · Restaurante",
    quote:
      "El muro verde se volvió el sello de nuestro restaurante. Los clientes se toman fotos ahí todo el tiempo. Profesionales de principio a fin.",
    rating: 5,
    image: "Cliente Roberto",
    active: true,
  },
  {
    id: "t3",
    client_name: "Arq. Daniela M.",
    project_type: "Aliado de paisajismo",
    quote:
      "Como arquitecta valoro trabajar con alguien que entiende diseño, materiales y ejecución. Green Gib se ha vuelto mi aliado de paisajismo de confianza en mis proyectos.",
    rating: 5,
    image: "Cliente Daniela",
    active: true,
  },
  {
    id: "t4",
    client_name: "Grupo Inmobiliario · García",
    project_type: "Áreas verdes de desarrollo",
    quote:
      "Cumplieron en tiempo y forma con un proyecto de gran escala. La presentación del acceso del desarrollo cambió por completo y eso se nota en la percepción de valor.",
    rating: 5,
    image: "Cliente desarrollo",
    active: true,
  },
];

export function getActiveTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.active);
}
