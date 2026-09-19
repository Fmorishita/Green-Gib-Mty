import type { Metadata } from "next";
import { CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { VerifyForm } from "@/components/courses/verify-form";
import { verifyCertificate } from "@/lib/certificates/access";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Verificar un certificado",
    description: "Confirma la autenticidad de un certificado de finalización emitido por Green Gib.",
    path: "/certificados/verificar",
  }),
  // Evita que folios y nombres de alumnos terminen indexados en buscadores.
  robots: { index: false, follow: false },
};

/**
 * Verificación pública de certificados.
 *
 * No requiere sesión: cualquier tercero (un cliente del alumno, por ejemplo)
 * puede confirmar que un folio es auténtico. Sólo se consulta a través de
 * `verify_certificate`, una función de Postgres que exige el folio exacto —
 * no hay forma de listar certificados sin conocerlo de antemano.
 */
export default async function VerificarCertificadoPage({
  searchParams,
}: {
  searchParams: { folio?: string };
}) {
  const folio = searchParams.folio?.trim();
  const result = folio ? await verifyCertificate(folio) : null;

  return (
    <section className="py-section">
      <Container size="narrow">
        <div className="text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-green-olive" aria-hidden />
          <h1 className="mt-4 font-display text-display-sm font-medium text-green-deep">
            Verificar un certificado
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-charcoal-muted">
            Ingresa el folio impreso al pie del certificado para confirmar que fue emitido por
            Green Gib.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-md">
          <VerifyForm defaultValue={folio} />
        </div>

        {folio && (
          <div className="mx-auto mt-8 max-w-md">
            {result?.valid ? (
              <div className="rounded-2xl border border-green-olive/40 bg-green-olive/5 p-7 text-center">
                <CheckCircle2 className="mx-auto h-9 w-9 text-green-olive" aria-hidden />
                <p className="mt-3 font-display text-xl text-green-deep">Certificado auténtico</p>
                <dl className="mt-5 space-y-3 border-t border-green-olive/20 pt-5 text-left text-sm">
                  <div>
                    <dt className="text-charcoal-light">Nombre</dt>
                    <dd className="font-medium text-charcoal">{result.recipientName}</dd>
                  </div>
                  <div>
                    <dt className="text-charcoal-light">Curso</dt>
                    <dd className="font-medium text-charcoal">{result.courseTitle}</dd>
                  </div>
                  <div>
                    <dt className="text-charcoal-light">Fecha de emisión</dt>
                    <dd className="font-medium text-charcoal">
                      {result.issuedAt?.toLocaleDateString("es-MX", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </dd>
                  </div>
                </dl>
              </div>
            ) : (
              <div className="rounded-2xl border border-terracotta/30 bg-terracotta/5 p-7 text-center">
                <XCircle className="mx-auto h-9 w-9 text-terracotta" aria-hidden />
                <p className="mt-3 font-display text-xl text-terracotta-dark">
                  No encontramos ese folio
                </p>
                <p className="mt-2 text-sm text-charcoal-muted">
                  Revisa que esté escrito tal como aparece en el certificado, incluyendo guiones.
                </p>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
