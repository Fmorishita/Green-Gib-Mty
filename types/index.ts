/**
 * Tipos de dominio de Green Gib.
 * Estos tipos reflejan el esquema de Supabase (`supabase/schema.sql`)
 * para que la migración de mock data → base de datos sea trivial.
 */

export type ProjectCategory =
  | "Residencial"
  | "Comercial"
  | "Muros verdes"
  | "Terrazas"
  | "Jardines"
  | "Decoración"
  | "Mantenimiento";

export type ProductCategory =
  | "Plantas"
  | "Macetas"
  | "Decoración exterior"
  | "Accesorios"
  | "Productos para jardín"
  | "Jardineras"
  | "Piezas decorativas"
  | "Kits";

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  benefits: string[];
  forWhom: string[];
  problemsSolved: string[];
  gallery: string[];
  relatedSlugs: string[];
  featured?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  description: string;
  challenge: string;
  solution: string;
  cover_image: string;
  gallery: string[];
  services: string[];
  details: { label: string; value: string }[];
  beforeAfter?: { before: string; after: string };
  featured: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  images: string[];
  stock: number;
  availability: string;
  featured: boolean;
  active: boolean;
  relatedSlugs?: string[];
}

export interface Testimonial {
  id: string;
  client_name: string;
  project_type: string;
  quote: string;
  rating: number;
  image?: string;
  active: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  author: string;
  readingTime: string;
  published: boolean;
  created_at: string;
}

export interface Lead {
  name: string;
  phone: string;
  email?: string;
  project_type?: string;
  budget_range?: string;
  location?: string;
  message?: string;
  source?: string;
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

/* ---------------------------------------------------------------------------
 * Plataforma de cursos
 * ------------------------------------------------------------------------ */

export interface CourseLesson {
  slug: string;
  title: string;
  durationMinutes: number;
  /** Lección abierta: se puede ver sin haber comprado el curso. */
  isPreview?: boolean;
}

export interface CourseModule {
  title: string;
  lessons: CourseLesson[];
}

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: string;
  price: number;
  /** Precio tachado, para mostrar descuento. */
  compareAtPrice?: number;
  durationMinutes: number;
  lessonCount: number;
  cover: string;
  featured: boolean;
  published: boolean;
  outcomes: string[];
  forWhom: string[];
  requirements: string[];
  includes: string[];
  modules: CourseModule[];
}

/** Estado de una inscripción. Sólo `active` da acceso al contenido. */
export type EnrollmentStatus = "pending_payment" | "active" | "expired" | "cancelled";

export interface Enrollment {
  id: string;
  user_id: string;
  course_slug: string;
  status: EnrollmentStatus;
  price_paid: number | null;
  payment_reference: string | null;
  granted_at: string | null;
  created_at: string;
}

export interface LessonProgress {
  lesson_slug: string;
  course_slug: string;
  completed: boolean;
  completed_at: string | null;
  last_position_seconds: number;
}
