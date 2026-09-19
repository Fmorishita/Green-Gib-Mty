import { z } from "zod";

/** Esquemas de autenticación de la plataforma de cursos. */

export const signInSchema = z.object({
  email: z
    .string({ required_error: "El correo es obligatorio." })
    .trim()
    .email("Ingresa un correo válido."),
  password: z
    .string({ required_error: "La contraseña es obligatoria." })
    .min(1, "Ingresa tu contraseña."),
});

export const signUpSchema = z.object({
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
  password: z
    .string({ required_error: "La contraseña es obligatoria." })
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
});

export const resetSchema = z.object({
  email: z.string().trim().email("Ingresa un correo válido."),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ResetInput = z.infer<typeof resetSchema>;
