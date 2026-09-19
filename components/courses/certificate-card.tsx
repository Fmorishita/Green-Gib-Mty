"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Award, Download, Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { issueCertificate } from "@/lib/actions/certificates";
import { cn } from "@/lib/utils";

interface CertificateCardProps {
  courseSlug: string;
  courseTitle: string;
  /** Compacta: la versión que va en la lista de /mi-cuenta. */
  compact?: boolean;
}

/**
 * Tarjeta de certificado, visible sólo cuando el curso llegó al 100%.
 *
 * El clic dispara la emisión (idempotente) y de inmediato abre la descarga
 * del PDF en una pestaña nueva — no hace falta un paso intermedio, la
 * verificación de "¿de verdad terminó el curso?" ya ocurrió en el servidor
 * dentro de `issue_certificate_if_completed`.
 */
export function CertificateCard({ courseSlug, courseTitle, compact = false }: CertificateCardProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);

  const handleDownload = () => {
    setError(null);
    startTransition(async () => {
      const result = await issueCertificate(courseSlug);
      if (!result.ok || !result.certificate) {
        setError(result.error ?? "No pudimos generar tu certificado.");
        return;
      }
      setCode(result.certificate.code);
      window.open(`/api/certificados/${result.certificate.code}/pdf`, "_blank");
    });
  };

  if (compact) {
    return (
      <div className="flex flex-col gap-2">
        <Button size="sm" variant="secondary" onClick={handleDownload} disabled={isPending}>
          {isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
          ) : (
            <Award className="h-3.5 w-3.5" aria-hidden />
          )}
          Certificado
        </Button>
        {error && <p className="text-xs text-terracotta-dark">{error}</p>}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-sand bg-sand-light/40 p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-green-deep/10">
          <Award className="h-5 w-5 text-green-deep" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg text-green-deep">¡Completaste el curso!</h3>
          <p className="mt-1 text-sm leading-relaxed text-charcoal-muted">
            Descarga tu certificado de finalización de <strong>{courseTitle}</strong>, con folio
            único que puedes compartir con tus clientes.
          </p>

          {error && (
            <div className="mt-3 flex items-start gap-2 rounded-md bg-terracotta/10 px-3 py-2 text-sm text-terracotta-dark">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
              {error}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={handleDownload} disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Generando…
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" aria-hidden /> Descargar certificado (PDF)
                </>
              )}
            </Button>

            {code && (
              <Link
                href={`/certificados/verificar?folio=${encodeURIComponent(code)}`}
                target="_blank"
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-medium text-green-deep underline underline-offset-4 hover:text-green-olive"
                )}
              >
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                Ver folio {code}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
