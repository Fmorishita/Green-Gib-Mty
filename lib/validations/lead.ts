import { z } from "zod";

/** Esquema de validación de leads (formularios de contacto y cotización). */
export const leadSchema = z.object({
  name: z
    .string({ required_error: "El nombre es obligatorio." })
    .trim()
    .min(2, "Ingresa tu nombre completo."),
  phone: z
    .string({ required_error: "El teléfono es obligatorio." })
    .trim()
    .min(8, "Ingresa un teléfono válido.")
    .regex(/^[0-9+()\s-]+$/, "El teléfono solo puede contener números."),
  email: z
    .string()
    .trim()
    .email("Ingresa un correo válido.")
    .optional()
    .or(z.literal("")),
  project_type: z.string().trim().optional().or(z.literal("")),
  budget_range: z.string().trim().optional().or(z.literal("")),
  location: z.string().trim().optional().or(z.literal("")),
  timeline: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().max(1500, "El mensaje es demasiado largo.").optional().or(z.literal("")),
  source: z.string().trim().optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const PROJECT_TYPES = [
  "Paisajismo residencial",
  "Jardín / Patio",
  "Terraza o rooftop",
  "Muro verde / Jardín vertical",
  "Proyecto comercial",
  "Mantenimiento de áreas verdes",
  "Decoración exterior",
  "Otro",
] as const;

export const BUDGET_RANGES = [
  "Menos de $15,000 MXN",
  "$15,000 – $40,000 MXN",
  "$40,000 – $80,000 MXN",
  "$80,000 – $120,000 MXN",
  "Más de $120,000 MXN",
  "Aún no lo sé",
] as const;

export const TIMELINES = [
  "Lo antes posible",
  "En 1–3 meses",
  "En 3–6 meses",
  "Solo estoy explorando",
] as const;
