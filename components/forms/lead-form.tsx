"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select, Field } from "@/components/ui/input";
import { submitLead } from "@/lib/actions/leads";
import { PROJECT_TYPES, type LeadInput } from "@/lib/validations/lead";
import { trackEvent } from "@/lib/tracking";

interface LeadFormProps {
  source?: string;
  defaultProjectType?: string;
  ctaLabel?: string;
}

type FieldErrors = Partial<Record<keyof LeadInput, string>>;

/** Formulario de lead compacto (lead magnet / valoración). */
export function LeadForm({
  source = "lead-magnet",
  defaultProjectType,
  ctaLabel = "Agendar mi valoración",
}: LeadFormProps) {
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
      project_type: String(fd.get("project_type") ?? ""),
      source,
    };

    startTransition(async () => {
      const result = await submitLead(input);
      if (!result.ok) {
        if (result.fieldErrors) setErrors(result.fieldErrors);
        setFormError(result.error ?? "Ocurrió un error. Intenta de nuevo.");
        return;
      }
      trackEvent("Lead", { content_name: input.project_type || "Valoración", source });
      router.push("/gracias");
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" htmlFor="lf-name" required error={errors.name}>
          <Input id="lf-name" name="name" autoComplete="name" placeholder="Tu nombre" required />
        </Field>
        <Field label="Teléfono" htmlFor="lf-phone" required error={errors.phone}>
          <Input id="lf-phone" name="phone" type="tel" autoComplete="tel" placeholder="81 0000 0000" required />
        </Field>
      </div>
      <Field label="Tipo de proyecto" htmlFor="lf-type">
        <Select id="lf-type" name="project_type" defaultValue={defaultProjectType ?? ""}>
          <option value="">Selecciona una opción</option>
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </Field>

      {formError && (
        <div className="flex items-start gap-2 rounded-md bg-terracotta/10 px-4 py-3 text-sm text-terracotta-dark" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
          {formError}
        </div>
      )}

      <Button type="submit" size="lg" disabled={isPending} className="w-full">
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Enviando…
          </>
        ) : (
          <>
            <Sprout className="h-4 w-4" aria-hidden /> {ctaLabel}
          </>
        )}
      </Button>
    </form>
  );
}
