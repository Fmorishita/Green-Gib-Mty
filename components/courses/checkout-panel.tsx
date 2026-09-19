"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { AlertCircle, Loader2, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { Honeypot } from "@/components/forms/honeypot";
import { createOrder } from "@/lib/actions/orders";
import { trackEvent } from "@/lib/tracking";
import { formatPrice, cn } from "@/lib/utils";
import type { Course } from "@/types";

interface CheckoutPanelProps {
  course: Course;
  /** El visitante ya tiene el curso comprado y activo. */
  alreadyActive: boolean;
  whatsappHref: string;
}

/**
 * Compra del curso.
 *
 * No se pide cuenta: primero se paga y la cuenta se crea después con el mismo
 * correo. La orden queda ligada a ese correo y se convierte en acceso cuando
 * la persona se registra.
 */
export function CheckoutPanel({ course, alreadyActive, whatsappHref }: CheckoutPanelProps) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [orderedEmail, setOrderedEmail] = useState<string | null>(null);

  if (alreadyActive) {
    return (
      <div className="rounded-2xl border border-green-olive/40 bg-green-olive/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-green-olive" aria-hidden />
        <h2 className="mt-4 font-display text-2xl text-green-deep">Ya tienes este curso</h2>
        <p className="mt-2 text-charcoal-muted">Puedes continuar donde lo dejaste.</p>
        <Link
          href={`/mi-cuenta/${course.slug}`}
          className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-6")}
        >
          Ir al curso
        </Link>
      </div>
    );
  }

  // Orden registrada: instrucciones de pago.
  if (orderedEmail) {
    return (
      <div className="rounded-2xl border border-stone/40 bg-cream p-8">
        <CheckCircle2 className="h-9 w-9 text-green-olive" aria-hidden />
        <h2 className="mt-4 font-display text-2xl text-green-deep">
          Compra registrada
        </h2>
        <p className="mt-2 leading-relaxed text-charcoal-muted">
          Apartamos tu lugar en <strong className="text-charcoal">{course.title}</strong> a nombre
          de <strong className="text-charcoal">{orderedEmail}</strong>. Falta completar el pago de{" "}
          {formatPrice(course.price)}.
        </p>

        <div className="mt-6 rounded-xl bg-cream-dark/70 p-5">
          <h3 className="font-display text-lg text-green-deep">Qué sigue</h3>
          <ol className="mt-3 space-y-2.5 text-sm text-charcoal-muted">
            <li>
              <strong className="text-charcoal">1.</strong> Escríbenos por WhatsApp y te damos los
              datos para el pago.
            </li>
            <li>
              <strong className="text-charcoal">2.</strong> Haces la transferencia y nos envías el
              comprobante.
            </li>
            <li>
              <strong className="text-charcoal">3.</strong> Al confirmar el pago te enviamos el
              enlace para crear tu contraseña.
            </li>
            <li>
              <strong className="text-charcoal">4.</strong> Entras con ese correo y el curso ya
              aparece activo en tu panel.
            </li>
          </ol>
        </div>

        <div className="mt-6 rounded-lg border border-sand bg-sand-light/50 px-4 py-3">
          <p className="text-sm text-charcoal">
            <strong>Importante:</strong> crea tu cuenta con este mismo correo. Es lo que conecta tu
            pago con tu acceso.
          </p>
        </div>

        <WhatsAppLink
          href={whatsappHref}
          size="lg"
          context={`checkout-${course.slug}`}
          className="mt-6 w-full"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Continuar por WhatsApp
        </WhatsAppLink>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");

    startTransition(async () => {
      const result = await createOrder({
        course_slug: course.slug,
        full_name: String(fd.get("full_name") ?? ""),
        email,
        phone: String(fd.get("phone") ?? ""),
        company: String(fd.get("company") ?? ""),
      });

      if (!result.ok) {
        if (result.fieldErrors) setErrors(result.fieldErrors);
        setFormError(result.error ?? "No pudimos registrar tu compra.");
        return;
      }

      trackEvent("InitiateCheckout", {
        content_name: course.title,
        value: course.price,
        currency: "MXN",
      });
      setOrderedEmail(result.email ?? email);
    });
  };

  return (
    <div className="rounded-2xl border border-stone/40 bg-cream p-8">
      <h2 className="font-display text-2xl text-green-deep">Compra tu curso</h2>
      <p className="mt-2 text-sm text-charcoal-muted">
        No necesitas crear una cuenta ahora. Tu acceso se genera en cuanto se confirme el pago.
      </p>

      <form onSubmit={handleSubmit} noValidate className="relative mt-7 space-y-5">
        <Honeypot />

        <Field label="Nombre completo" htmlFor="full_name" required error={errors.full_name}>
          <Input id="full_name" name="full_name" autoComplete="name" placeholder="Tu nombre" required />
        </Field>

        <Field label="Correo electrónico" htmlFor="email" required error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="tucorreo@ejemplo.com"
            required
          />
        </Field>
        <p className="-mt-3 text-xs text-charcoal-light">
          Con este correo vas a crear tu cuenta después. Revísalo bien.
        </p>

        <Field label="Teléfono (opcional)" htmlFor="phone" error={errors.phone}>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="81 0000 0000" />
        </Field>

        <dl className="space-y-3 border-y border-stone/40 py-5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-charcoal-muted">Curso</dt>
            <dd className="text-right font-medium text-charcoal">{course.title}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-charcoal-muted">Contenido</dt>
            <dd className="text-right text-charcoal">{course.lessonCount} lecciones</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-charcoal-muted">Acceso</dt>
            <dd className="text-right text-charcoal">Permanente</dd>
          </div>
        </dl>

        <div className="flex items-baseline justify-between">
          <span className="font-display text-lg text-green-deep">Total</span>
          <span className="font-display text-display-sm text-green-deep">
            {formatPrice(course.price)}
          </span>
        </div>

        {formError && (
          <div
            className="flex items-start gap-2 rounded-md bg-terracotta/10 px-4 py-3 text-sm text-terracotta-dark"
            role="alert"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
            {formError}
          </div>
        )}

        <Button type="submit" size="lg" disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Registrando…
            </>
          ) : (
            "Continuar con el pago"
          )}
        </Button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-charcoal-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-green-olive" aria-hidden />
          Tus datos sólo se usan para darte acceso al curso.
        </p>
      </form>
    </div>
  );
}
