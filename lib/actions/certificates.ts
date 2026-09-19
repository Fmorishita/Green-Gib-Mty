"use server";

import { issueCertificateIfCompleted, type CertificateRecord } from "@/lib/certificates/access";

export interface IssueCertificateResult {
  ok: boolean;
  error?: string;
  certificate?: CertificateRecord;
}

/** Server Action que expone la emisión del certificado a los componentes cliente. */
export async function issueCertificate(courseSlug: string): Promise<IssueCertificateResult> {
  const result = await issueCertificateIfCompleted(courseSlug);
  if (!result.ok) return { ok: false, error: result.error };
  return { ok: true, certificate: result.certificate };
}
