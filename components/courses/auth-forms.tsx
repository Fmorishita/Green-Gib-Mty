"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Loader2, LogIn, UserPlus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";
import { signIn, signUp, requestPasswordReset } from "@/lib/actions/auth";

type Errors = Record<string, string>;

function FormError({ message }: { message: string }) {
  return (
    <div
      className="flex items-start gap-2 rounded-md bg-terracotta/10 px-4 py-3 text-sm text-terracotta-dark"
      role="alert"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
      {message}
    </div>
  );
}

function FormSuccess({ message }: { message: string }) {
  return (
    <div
      className="flex items-start gap-2 rounded-md bg-green-olive/12 px-4 py-3 text-sm text-green-olive-dark"
      role="status"
    >
      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
      {message}
    </div>
  );
}

/** Inicio de sesión. */
export function SignInForm({ redirectTo }: { redirectTo?: string }) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setErrors({});
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await signIn(
        { email: String(fd.get("email") ?? ""), password: String(fd.get("password") ?? "") },
        redirectTo
      );
      // Si todo sale bien, la Server Action redirige y no llegamos aquí.
      if (result && !result.ok) {
        if (result.fieldErrors) setErrors(result.fieldErrors);
        setFormError(result.error ?? "No pudimos iniciar sesión.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <h1 className="font-display text-display-sm font-medium text-green-deep">
          Entra a tus cursos
        </h1>
        <p className="mt-2 text-charcoal-muted">
          Usa el correo con el que compraste.
        </p>
      </div>

      <Field label="Correo electrónico" htmlFor="email" required error={errors.email}>
        <Input id="email" name="email" type="email" autoComplete="email" placeholder="tucorreo@ejemplo.com" required />
      </Field>

      <Field label="Contraseña" htmlFor="password" required error={errors.password}>
        <Input id="password" name="password" type="password" autoComplete="current-password" placeholder="••••••••" required />
      </Field>

      <div className="flex justify-end">
        <Link href="/acceso/recuperar" className="text-sm text-green-deep underline underline-offset-4 hover:text-green-olive">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      {formError && <FormError message={formError} />}

      <Button type="submit" size="lg" disabled={isPending} className="w-full">
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Entrando…
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4" aria-hidden /> Entrar
          </>
        )}
      </Button>

      <p className="text-center text-sm text-charcoal-muted">
        ¿Todavía no tienes cuenta?{" "}
        <Link
          href={redirectTo ? `/acceso/registro?redirect=${encodeURIComponent(redirectTo)}` : "/acceso/registro"}
          className="font-medium text-green-deep underline underline-offset-4"
        >
          Créala aquí
        </Link>
      </p>
    </form>
  );
}

/** Registro de cuenta nueva. */
export function SignUpForm({ redirectTo }: { redirectTo?: string }) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setMessage(null);
    setErrors({});
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await signUp(
        {
          full_name: String(fd.get("full_name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          password: String(fd.get("password") ?? ""),
        },
        redirectTo
      );
      if (result && !result.ok) {
        if (result.fieldErrors) setErrors(result.fieldErrors);
        setFormError(result.error ?? "No pudimos crear tu cuenta.");
        return;
      }
      if (result?.message) setMessage(result.message);
    });
  };

  if (message) {
    return (
      <div className="space-y-5">
        <h1 className="font-display text-display-sm font-medium text-green-deep">
          Revisa tu correo
        </h1>
        <FormSuccess message={message} />
        <Link
          href="/acceso"
          className="inline-block text-sm font-medium text-green-deep underline underline-offset-4"
        >
          Volver a iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <h1 className="font-display text-display-sm font-medium text-green-deep">
          Crea tu cuenta
        </h1>
        <p className="mt-2 text-charcoal-muted">
          Con esta cuenta entras a todos los cursos que compres.
        </p>
      </div>

      <Field label="Nombre completo" htmlFor="full_name" required error={errors.full_name}>
        <Input id="full_name" name="full_name" autoComplete="name" placeholder="Tu nombre" required />
      </Field>

      <Field label="Correo electrónico" htmlFor="email" required error={errors.email}>
        <Input id="email" name="email" type="email" autoComplete="email" placeholder="tucorreo@ejemplo.com" required />
      </Field>

      <Field label="Teléfono (opcional)" htmlFor="phone" error={errors.phone}>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="81 0000 0000" />
      </Field>

      <Field label="Contraseña" htmlFor="password" required error={errors.password}>
        <Input id="password" name="password" type="password" autoComplete="new-password" placeholder="Mínimo 8 caracteres" required />
      </Field>

      {formError && <FormError message={formError} />}

      <Button type="submit" size="lg" disabled={isPending} className="w-full">
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Creando cuenta…
          </>
        ) : (
          <>
            <UserPlus className="h-4 w-4" aria-hidden /> Crear mi cuenta
          </>
        )}
      </Button>

      <p className="text-center text-sm text-charcoal-muted">
        ¿Ya tienes cuenta?{" "}
        <Link
          href={redirectTo ? `/acceso?redirect=${encodeURIComponent(redirectTo)}` : "/acceso"}
          className="font-medium text-green-deep underline underline-offset-4"
        >
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}

/** Recuperación de contraseña. */
export function ResetForm() {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setMessage(null);
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await requestPasswordReset(String(fd.get("email") ?? ""));
      if (!result.ok) {
        setFormError(result.error ?? "No pudimos procesar la solicitud.");
        return;
      }
      setMessage(result.message ?? "Listo.");
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <h1 className="font-display text-display-sm font-medium text-green-deep">
          Recupera tu contraseña
        </h1>
        <p className="mt-2 text-charcoal-muted">
          Te enviamos un enlace para crear una nueva.
        </p>
      </div>

      <Field label="Correo electrónico" htmlFor="email" required>
        <Input id="email" name="email" type="email" autoComplete="email" placeholder="tucorreo@ejemplo.com" required />
      </Field>

      {formError && <FormError message={formError} />}
      {message && <FormSuccess message={message} />}

      <Button type="submit" size="lg" disabled={isPending} className="w-full">
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Enviando…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden /> Enviar instrucciones
          </>
        )}
      </Button>

      <p className="text-center text-sm text-charcoal-muted">
        <Link href="/acceso" className="font-medium text-green-deep underline underline-offset-4">
          Volver a iniciar sesión
        </Link>
      </p>
    </form>
  );
}
