import { NextResponse, type NextRequest } from "next/server";
import { renderOwnedCertificatePdf } from "@/lib/certificates/access";

// pdf-lib lee los archivos de fuente del sistema de archivos y no corre en
// el runtime Edge: este endpoint necesita el runtime de Node.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { codigo: string } }
) {
  const result = await renderOwnedCertificatePdf(params.codigo);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return new NextResponse(Buffer.from(result.bytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${result.fileName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
