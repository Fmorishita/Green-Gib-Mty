import type { Course } from "@/types";

/**
 * Catálogo de cursos de capacitación técnica.
 *
 * Green Gib vende aquí su método de instalación a otros profesionales del
 * gremio (paisajistas, jardineros, constructores). Igual que el resto del
 * sitio, estos datos funcionan como fallback cuando Supabase no está
 * configurado; en producción la fuente de verdad son las tablas `courses`,
 * `course_modules` y `course_lessons`.
 *
 * El campo `videoUrl` NO vive aquí a propósito: los videos se resuelven desde
 * la tabla protegida `lesson_videos`, que sólo es legible con una inscripción
 * activa. Ver supabase/courses.sql.
 */
export const courses: Course[] = [
  {
    slug: "instalacion-de-muros-verdes",
    title: "Instalación profesional de muros verdes",
    subtitle: "Del anclaje a la primera poda: el sistema completo, paso a paso.",
    description:
      "El curso más completo del catálogo. Aprendes a dimensionar, anclar, impermeabilizar, sembrar y poner en marcha un muro verde que no se desprenda ni se seque a los tres meses. Incluye los cálculos de carga, el diseño del riego por goteo y el protocolo de mantenimiento que entregamos a nuestros propios clientes.",
    level: "Intermedio",
    price: 4900,
    compareAtPrice: 6500,
    durationMinutes: 312,
    lessonCount: 24,
    cover: "Muro verde restaurante acceso",
    featured: true,
    published: true,
    outcomes: [
      "Calcular la carga real de un muro verde y elegir el anclaje adecuado a cada tipo de pared",
      "Impermeabilizar sin que la humedad migre al muro estructural",
      "Diseñar el riego por goteo con presión y tiempos correctos",
      "Seleccionar especies por orientación, luz y clima",
      "Entregar un protocolo de mantenimiento que el cliente pueda seguir",
    ],
    forWhom: [
      "Paisajistas y jardineros que quieren subir su ticket promedio",
      "Constructores y arquitectos que subcontratan este trabajo y quieren internalizarlo",
      "Equipos de mantenimiento que reciben muros mal instalados y tienen que corregirlos",
    ],
    requirements: [
      "Experiencia básica en instalación o jardinería",
      "Herramienta de obra estándar (taladro rotomartillo, nivel, flexómetro)",
      "No se requiere formación técnica formal",
    ],
    includes: [
      "24 lecciones en video con acceso permanente",
      "Plantilla de cálculo de carga y materiales",
      "Lista de proveedores y especificaciones técnicas",
      "Protocolo de mantenimiento descargable",
      "Certificado de finalización verificable en línea",
    ],
    modules: [
      {
        title: "Fundamentos del sistema",
        lessons: [
          { slug: "bienvenida", title: "Bienvenida y cómo usar el curso", durationMinutes: 6, isPreview: true },
          { slug: "anatomia-muro-verde", title: "Anatomía de un muro verde que sí dura", durationMinutes: 14, isPreview: true },
          { slug: "tipos-de-sistema", title: "Sistemas modulares, de manta y de maceta: cuándo usar cada uno", durationMinutes: 18 },
          { slug: "errores-comunes", title: "Los seis errores que hacen fallar una instalación", durationMinutes: 12 },
        ],
      },
      {
        title: "Diagnóstico y cálculo",
        lessons: [
          { slug: "levantamiento", title: "Levantamiento del muro y toma de medidas", durationMinutes: 16 },
          { slug: "calculo-de-carga", title: "Cálculo de carga: peso seco, peso saturado y factor de seguridad", durationMinutes: 22 },
          { slug: "tipos-de-pared", title: "Block, tablaroca, concreto y muro de carga: qué cambia", durationMinutes: 15 },
          { slug: "orientacion-y-luz", title: "Orientación, horas de sol y su efecto en la selección", durationMinutes: 13 },
        ],
      },
      {
        title: "Anclaje e impermeabilización",
        lessons: [
          { slug: "estructura-portante", title: "Montaje de la estructura portante", durationMinutes: 20 },
          { slug: "anclajes", title: "Selección y colocación de anclajes según sustrato", durationMinutes: 18 },
          { slug: "impermeabilizacion", title: "Impermeabilización: capas, traslapes y puntos críticos", durationMinutes: 24 },
          { slug: "pruebas-de-estanqueidad", title: "Prueba de estanqueidad antes de sembrar", durationMinutes: 11 },
        ],
      },
      {
        title: "Riego",
        lessons: [
          { slug: "diseno-de-riego", title: "Diseño del circuito de riego por goteo", durationMinutes: 21 },
          { slug: "presion-y-caudal", title: "Presión, caudal y compensación por altura", durationMinutes: 17 },
          { slug: "programacion", title: "Programación por temporada y sensores", durationMinutes: 14 },
          { slug: "recirculacion", title: "Sistemas de recirculación y drenaje", durationMinutes: 16 },
        ],
      },
      {
        title: "Vegetación y siembra",
        lessons: [
          { slug: "paleta-vegetal", title: "Armado de la paleta vegetal", durationMinutes: 19 },
          { slug: "sustratos", title: "Sustratos: composición, retención y peso", durationMinutes: 15 },
          { slug: "siembra", title: "Siembra y densidad por metro cuadrado", durationMinutes: 18 },
          { slug: "composicion-visual", title: "Composición visual: bloques, degradados y textura", durationMinutes: 13 },
        ],
      },
      {
        title: "Entrega y mantenimiento",
        lessons: [
          { slug: "puesta-en-marcha", title: "Puesta en marcha y primeras dos semanas", durationMinutes: 16 },
          { slug: "protocolo-mantenimiento", title: "Protocolo de mantenimiento mensual", durationMinutes: 14 },
          { slug: "diagnostico-fallas", title: "Diagnóstico de fallas: amarillamiento, hongos y zonas secas", durationMinutes: 20 },
          { slug: "cotizar-el-servicio", title: "Cómo cotizar el servicio y qué margen dejar", durationMinutes: 20 },
        ],
      },
    ],
  },
  {
    slug: "sistemas-de-riego-eficiente",
    title: "Sistemas de riego eficiente",
    subtitle: "Diseño, instalación y programación de riego que no desperdicia agua.",
    description:
      "El riego mal calculado es la causa número uno de jardines muertos y de clientes molestos. En este curso aprendes a diseñar el circuito completo: sectorización, cálculo de presión y caudal, selección de emisores, programación por temporada y diagnóstico de fallas.",
    level: "Básico a intermedio",
    price: 2490,
    durationMinutes: 168,
    lessonCount: 14,
    cover: "Riego goteo instalado",
    featured: true,
    published: true,
    outcomes: [
      "Sectorizar un jardín según necesidad hídrica real",
      "Calcular presión, caudal y pérdidas de carga",
      "Elegir entre goteo, aspersión y microaspersión con criterio",
      "Programar por temporada en lugar de dejar un horario fijo todo el año",
      "Diagnosticar fugas, zonas secas y presión insuficiente",
    ],
    forWhom: [
      "Jardineros que instalan riego sin formación formal",
      "Paisajistas que subcontratan el riego y quieren supervisarlo bien",
      "Encargados de mantenimiento de fraccionamientos y corporativos",
    ],
    requirements: [
      "Nociones básicas de plomería",
      "Sin requisitos de formación previa",
    ],
    includes: [
      "14 lecciones en video con acceso permanente",
      "Hoja de cálculo de presión y caudal",
      "Checklist de puesta en marcha",
      "Certificado de finalización verificable en línea",
    ],
    modules: [
      {
        title: "Fundamentos",
        lessons: [
          { slug: "bienvenida", title: "Bienvenida y alcance del curso", durationMinutes: 5, isPreview: true },
          { slug: "por-que-falla-el-riego", title: "Por qué falla el riego en la mayoría de los jardines", durationMinutes: 13, isPreview: true },
          { slug: "necesidad-hidrica", title: "Necesidad hídrica por tipo de vegetación", durationMinutes: 15 },
        ],
      },
      {
        title: "Diseño del sistema",
        lessons: [
          { slug: "sectorizacion", title: "Sectorización del jardín", durationMinutes: 17 },
          { slug: "presion-caudal", title: "Cálculo de presión y caudal", durationMinutes: 20 },
          { slug: "perdidas-de-carga", title: "Pérdidas de carga y diámetro de tubería", durationMinutes: 16 },
          { slug: "seleccion-emisores", title: "Goteo, aspersión y microaspersión: cuándo cada una", durationMinutes: 14 },
        ],
      },
      {
        title: "Instalación",
        lessons: [
          { slug: "trazo-y-zanjeo", title: "Trazo y zanjeo", durationMinutes: 12 },
          { slug: "montaje", title: "Montaje de líneas y conexiones", durationMinutes: 15 },
          { slug: "valvulas", title: "Válvulas, filtros y reguladores de presión", durationMinutes: 13 },
        ],
      },
      {
        title: "Programación y mantenimiento",
        lessons: [
          { slug: "programacion-temporada", title: "Programación por temporada", durationMinutes: 14 },
          { slug: "sensores", title: "Sensores de lluvia y humedad", durationMinutes: 10 },
          { slug: "diagnostico", title: "Diagnóstico de fallas frecuentes", durationMinutes: 14 },
          { slug: "cotizar-riego", title: "Cómo cotizar una instalación de riego", durationMinutes: 10 },
        ],
      },
    ],
  },
  {
    slug: "diseno-e-instalacion-de-jardines",
    title: "Diseño e instalación de jardines residenciales",
    subtitle: "Del levantamiento a la entrega, con criterio de diseño y control de obra.",
    description:
      "Un jardín bien ejecutado empieza mucho antes de la primera planta. Este curso cubre el proceso completo: levantamiento del espacio, propuesta de diseño, preparación del suelo, instalación y entrega, con el control de obra que evita retrabajos.",
    level: "Intermedio",
    price: 3900,
    durationMinutes: 240,
    lessonCount: 19,
    cover: "Jardín residencial San Pedro",
    featured: true,
    published: true,
    outcomes: [
      "Levantar un espacio y traducirlo a una propuesta clara",
      "Preparar suelo y drenaje antes de sembrar",
      "Componer con criterio: escala, capas, textura y estacionalidad",
      "Coordinar la obra sin retrabajos ni tiempos muertos",
      "Entregar con protocolo de cuidado y plan de mantenimiento",
    ],
    forWhom: [
      "Jardineros que quieren pasar de mantenimiento a proyectos completos",
      "Diseñadores que necesitan dominar la parte de ejecución",
      "Equipos que ya instalan pero pierden margen por retrabajos",
    ],
    requirements: [
      "Experiencia previa en jardinería o instalación",
      "Sin requisitos de software de diseño",
    ],
    includes: [
      "19 lecciones en video con acceso permanente",
      "Formato de levantamiento en campo",
      "Plantilla de propuesta y presupuesto",
      "Certificado de finalización verificable en línea",
    ],
    modules: [
      {
        title: "Diagnóstico y propuesta",
        lessons: [
          { slug: "bienvenida", title: "Bienvenida y método de trabajo", durationMinutes: 7, isPreview: true },
          { slug: "levantamiento-espacio", title: "Levantamiento del espacio", durationMinutes: 18, isPreview: true },
          { slug: "analisis-suelo-luz", title: "Análisis de suelo, luz y drenaje", durationMinutes: 16 },
          { slug: "briefing-cliente", title: "Cómo entrevistar al cliente para entender el uso", durationMinutes: 14 },
          { slug: "propuesta", title: "Armado de la propuesta y el presupuesto", durationMinutes: 19 },
        ],
      },
      {
        title: "Preparación",
        lessons: [
          { slug: "limpieza-y-trazo", title: "Limpieza, demolición y trazo", durationMinutes: 13 },
          { slug: "mejoramiento-suelo", title: "Mejoramiento de suelo", durationMinutes: 17 },
          { slug: "drenaje", title: "Drenaje y manejo de escurrimientos", durationMinutes: 15 },
          { slug: "instalaciones-ocultas", title: "Instalaciones ocultas: riego e iluminación", durationMinutes: 14 },
        ],
      },
      {
        title: "Composición e instalación",
        lessons: [
          { slug: "escala-y-capas", title: "Escala, capas y punto focal", durationMinutes: 16 },
          { slug: "seleccion-especies", title: "Selección de especies por clima y mantenimiento", durationMinutes: 18 },
          { slug: "siembra-arboles", title: "Siembra de árboles y arbustos", durationMinutes: 15 },
          { slug: "cubresuelos-y-pasto", title: "Cubresuelos, pasto y acabados", durationMinutes: 14 },
          { slug: "materiales-duros", title: "Materiales duros: andadores, bordes y gravas", durationMinutes: 13 },
        ],
      },
      {
        title: "Control de obra y entrega",
        lessons: [
          { slug: "cronograma", title: "Cronograma y secuencia de trabajo", durationMinutes: 12 },
          { slug: "control-calidad", title: "Control de calidad y puntos de revisión", durationMinutes: 11 },
          { slug: "entrega", title: "Entrega y capacitación al cliente", durationMinutes: 10 },
          { slug: "plan-mantenimiento", title: "Plan de mantenimiento post-entrega", durationMinutes: 9 },
          { slug: "margen-y-precio", title: "Cómo no perder margen en un proyecto de jardín", durationMinutes: 19 },
        ],
      },
    ],
  },
  {
    slug: "mantenimiento-profesional-areas-verdes",
    title: "Mantenimiento profesional de áreas verdes",
    subtitle: "El servicio recurrente que estabiliza los ingresos de tu negocio.",
    description:
      "El mantenimiento es el servicio que paga la nómina cada mes. Este curso cubre el protocolo técnico —poda, fertilización, control de plagas, calendario por temporada— y la parte comercial: cómo estructurar planes, cotizarlos y retener al cliente.",
    level: "Básico",
    price: 1890,
    durationMinutes: 126,
    lessonCount: 12,
    cover: "Equipo de mantenimiento de jardines",
    featured: false,
    published: true,
    outcomes: [
      "Armar un calendario de mantenimiento por temporada",
      "Podar correctamente según especie y época",
      "Detectar y tratar plagas comunes antes de que se propaguen",
      "Estructurar planes mensuales y cotizarlos con margen",
      "Documentar cada visita para justificar el servicio ante el cliente",
    ],
    forWhom: [
      "Jardineros que cobran por visita y quieren pasar a planes mensuales",
      "Equipos nuevos de mantenimiento",
      "Administradores de fraccionamientos y plazas comerciales",
    ],
    requirements: ["Sin requisitos previos"],
    includes: [
      "12 lecciones en video con acceso permanente",
      "Calendario de mantenimiento por temporada",
      "Formato de reporte de visita",
      "Certificado de finalización verificable en línea",
    ],
    modules: [
      {
        title: "Protocolo técnico",
        lessons: [
          { slug: "bienvenida", title: "Bienvenida y estructura del servicio", durationMinutes: 6, isPreview: true },
          { slug: "calendario", title: "Calendario de mantenimiento por temporada", durationMinutes: 14, isPreview: true },
          { slug: "poda", title: "Poda por especie y época", durationMinutes: 18 },
          { slug: "fertilizacion", title: "Fertilización: qué, cuándo y cuánto", durationMinutes: 15 },
          { slug: "plagas", title: "Plagas y enfermedades comunes", durationMinutes: 16 },
          { slug: "riego-mantenimiento", title: "Revisión del sistema de riego en cada visita", durationMinutes: 11 },
        ],
      },
      {
        title: "Operación y negocio",
        lessons: [
          { slug: "ruta-y-tiempos", title: "Ruta, tiempos y tamaño de cuadrilla", durationMinutes: 12 },
          { slug: "herramienta", title: "Herramienta, seguridad y cuidado del equipo", durationMinutes: 10 },
          { slug: "reporte-visita", title: "Reporte de visita: cómo documentar el trabajo", durationMinutes: 9 },
          { slug: "estructura-planes", title: "Cómo estructurar planes mensuales", durationMinutes: 13 },
          { slug: "cotizar-mantenimiento", title: "Cotización y margen del servicio recurrente", durationMinutes: 14 },
          { slug: "retencion", title: "Retención: por qué se van los clientes de mantenimiento", durationMinutes: 8 },
        ],
      },
    ],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getPublishedCourses(): Course[] {
  return courses.filter((c) => c.published);
}

export function getFeaturedCourses(): Course[] {
  return courses.filter((c) => c.published && c.featured);
}

/** Aplana los módulos de un curso a una lista ordenada de lecciones. */
export function getCourseLessons(course: Course) {
  return course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleTitle: m.title }))
  );
}

/** Localiza una lección y sus vecinas, para la navegación del reproductor. */
export function getLessonContext(course: Course, lessonSlug: string) {
  const flat = getCourseLessons(course);
  const index = flat.findIndex((l) => l.slug === lessonSlug);
  if (index === -1) return null;
  return {
    lesson: flat[index],
    previous: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
    index,
    total: flat.length,
  };
}

/** Formatea minutos como "5 h 12 min". */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}
