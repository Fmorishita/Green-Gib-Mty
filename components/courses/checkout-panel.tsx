"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { AlertCircle, Loader2, CheckCircle2, MessageCircle, Lock } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { requestEnrollment } from "@/lib/actions/enrollments";
import { trackEvent } from "@/lib/tracking";
import { formatPrice, cn } from "@/lib/utils";
import type { Course } from "@/types";

interface CheckoutPanelProps {
  course: Course;
  isLoggedIn: boolean;
  alreadyActive: boolean;
  alreadyPending: boolean;
  whatsappHref: string;
}

/**
 * Paso de compra.
 *
 * Registra la inscripción como pendiente de pago y muestra las instrucciones.
 * La activación la hace dirección al confirmar el pago (o el webhook de la
 * pasarela cuando se contrate): el cliente nunca puede activarse solo.
 */
export function CheckoutPanel({
  course,
  isLoggedIn,
  alreadyActive,
  alreadyPending,
  whatsappHref,
}: CheckoutPanelProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(alreadyPending);

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

  if (!isLoggedIn) {
    return (
      <div className="rounded-2xl border border-stone/40 bg-cream p-8">
        <Lock className="h-8 w-8 text-green-olive" aria-hidden />
        <h2 className="mt-4 font-display text-2xl text-green-deep">
          Primero crea tu cuenta
        </h2>
        <p className="mt-2 leading-relaxed text-charcoal-muted">
          Tu cuenta es la que te va a dar acceso a los videos. Se crea en menos de un minuto y la
          usas para entrar siempre desde cualquier dispositivo.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/acceso/registro?redirect=/cursos/${course.slug}/comprar`}
            className={cn(buttonVariants({ variant: "primary", size: "lg" }), "flex-1")}
          >
            Crear mi cuenta
          </Link>
          <Link
            href={`/acceso?redirect=/cursos/${course.slug}/comprar`}
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "flex-1")}
          >
            Ya tengo cuenta
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-stone/40 bg-cream p-8">
        <CheckCircle2 className="h-9 w-9 text-green-olive" aria-hidden />
        <h2 className="mt-4 font-display text-2xl text-green-deep">
          Inscripción registrada
        </h2>
        <p className="mt-2 leading-relaxed text-charcoal-muted">
          Ya reservamos tu lugar en <strong className="text-charcoal">{course.title}</strong>. Para
          activarlo sólo falta confirmar el pago de {formatPrice(course.price)}.
        </p>

        <div className="mt-6 rounded-xl bg-cream-dark/70 p-5">
          <h3 className="font-display text-lg text-green-deep">Cómo completar el pago</h3>
          <ol className="mt-3 space-y-2 text-sm text-charcoal-muted">
            <li>1. Escríbenos por WhatsApp para recibir los datos de pago.</li>
            <li>2. Realiza la transferencia o el depósito.</li>
            <li>3. Envíanos el comprobante.</li>
            <li>4. Activamos tu acceso y el curso aparece en tu panel.</li>
          </ol>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <WhatsAppLink
            href={whatsappHref}
            size="lg"
            context={`checkout-${course.slug}`}
            className="flex-1"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Enviar comprobante
          </WhatsAppLink>
          <Link
            href="/mi-cuenta"
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "flex-1")}
          >
            Ir a mi panel
          </Link>
        </div>
      </div>
    );
  }

  const confirm = () => {
    setError(null);
    startTransition(async () => {
      const result = await requestEnrollment(course.slug);
      if (!result.ok) {
        setError(result.error ?? "No pudimos registrar tu inscripción.");
        return;
      }
      trackEvent("InitiateCheckout", { content_name: course.title, value: course.price, currency: "MXN" });
      setDone(true);
    });
  };

  return (
    <div className="rounded-2xl border border-stone/40 bg-cream p-8">
      <h2 className="font-display text-2xl text-green-deep">Confirma tu compra</h2>

      <dl className="mt-6 space-y-3 border-y border-stone/40 py-5 text-sm">
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

      <div className="mt-5 flex items-baseline justify-between">
        <span className="font-display text-lg text-green-deep">Total</span>
        <span className="font-display text-display-sm text-green-deep">
          {formatPrice(course.price)}
        </span>
      </div>

      {error && (
        <div className="mt-5 flex items-start gap-2 rounded-md bg-terracotta/10 px-4 py-3 text-sm text-terracotta-dark" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
          {error}
        </div>
      )}

      <Button size="lg" onClick={confirm} disabled={isPending} className="mt-6 w-full">
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Registrando…
          </>
        ) : (
          "Continuar con el pago"
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-charcoal-muted">
        Al continuar reservamos tu lugar. Te damos los datos de pago en el siguiente paso.
      </p>
    </div>
  );
}
