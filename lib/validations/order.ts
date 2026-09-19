import { z } from "zod";

/** Datos de compra de un curso. Se piden antes de pagar, sin cuenta. */
export const orderSchema = z.object({
  course_slug: z.string().trim().min(1),
  full_name: z
    .string({ required_error: "El nombre es obligatorio." })
    .trim()
    .min(2, "Ingresa tu nombre completo."),
  email: z
    .string({ required_error: "El correo es obligatorio." })
    .trim()
    .email("Ingresa un correo válido."),
  phone: z
    .string()
    .trim()
    .min(8, "Ingresa un teléfono válido.")
    .regex(/^[0-9+()\s-]+$/, "El teléfono solo puede contener números.")
    .optional()
    .or(z.literal("")),
  /** Campo trampa anti-spam. */
  company: z.string().optional().or(z.literal("")),
});

export type OrderInput = z.infer<typeof orderSchema>;
