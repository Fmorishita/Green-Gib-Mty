"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, Field } from "@/components/ui/input";
import { Honeypot } from "@/components/forms/honeypot";
import { submitLead } from "@/lib/actions/leads";
import {
  PROJECT_TYPES,
  BUDGET_RANGES,
  TIMELINES,
  HONEYPOT_FIELD,
  type LeadInput,
} from "@/lib/validations/lead";
import { trackEvent } from "@/lib/tracking";

interface ContactFormProps {
  /** Origen del lead para tracking/CRM. */
  source?: string;
  /** Valor inicial del tipo de proyecto. */
  defaultProjectType?: string;
}

type FieldErrors = Partial<Record<keyof LeadInput, string>>;

/** Formulario de contacto completo con validación y guardado en Supabase. */
export function ContactForm({ source = "contacto", defaultProjectType }: ContactFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const input: LeadInput = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      project_type: String(fd.get("project_type") ?? ""),
      location: String(fd.get("location") ?? ""),
      budget_range: String(fd.get("budget_range") ?? ""),
      timeline: String(fd.get("timeline") ?? ""),
      message: String(fd.get("message") ?? ""),
      source,
      company: String(fd.get(HONEYPOT_FIELD) ?? ""),
    };

    startTransition(async () => {
      const result = await submitLead(input);
      if (!result.ok) {
        if (result.fieldErrors) setErrors(result.fieldErrors);
        setFormError(result.error ?? "Ocurrió un error. Intenta de nuevo.");
        return;
      }
      trackEvent("Lead", { content_name: input.project_type || "Contacto", source });
      trackEvent("Contact", { source });
      router.push("/gracias");
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" htmlFor="name" required error={errors.name}>
          <Input id="name" name="name" autoComplete="name" placeholder="Tu nombre" required />
        </Field>
        <Field label="Teléfono" htmlFor="phone" required error={errors.phone}>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="81 0000 0000" required />
        </Field>
      </div>

      <Field label="Correo electrónico" htmlFor="email" error={errors.email}>
        <Input id="email" name="email" type="email" autoComplete="email" placeholder="tucorreo@ejemplo.com" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Tipo de proyecto" htmlFor="project_type">
          <Select id="project_type" name="project_type" defaultValue={defaultProjectType ?? ""}>
            <option value="">Selecciona una opción</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Ubicación" htmlFor="location">
          <Input id="location" name="location" placeholder="Colonia o municipio" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Presupuesto aproximado" htmlFor="budget_range">
          <Select id="budget_range" name="budget_range" defaultValue="">
            <option value="">Selecciona un rango</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Tiempo estimado de ejecución" htmlFor="timeline">
          <Select id="timeline" name="timeline" defaultValue="">
            <option value="">Selecciona una opción</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Cuéntanos sobre tu proyecto" htmlFor="message" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          placeholder="Describe tu espacio, qué te gustaría lograr y cualquier detalle relevante."
        />
      </Field>

      {formError && (
        <div className="flex items-start gap-2 rounded-md bg-terracotta/10 px-4 py-3 text-sm text-terracotta-dark" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
          {formError}
        </div>
      )}

      <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Enviando…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden /> Enviar solicitud
          </>
        )}
      </Button>
      <p className="text-xs text-charcoal-muted">
        Al enviar aceptas que te contactemos por los medios proporcionados. Tus datos se
        tratan de forma confidencial.
      </p>
    </form>
  );
}
