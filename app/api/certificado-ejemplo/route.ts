import { NextResponse } from "next/server";
import { generateCertificatePdf } from "@/lib/certificates/pdf";
import { getCourseBySlug, formatDuration } from "@/lib/data/courses";
import { founder } from "@/lib/data/founder";

// pdf-lib lee las fuentes del sistema de archivos: necesita runtime de Node.
export const runtime = "nodejs";

// A propósito estático: el PDF se genera una vez durante el build y se sirve
// desde el CDN. Generarlo por petición costaría ~77 ms de CPU en un endpoint
// público sin autenticación, que es justo lo que no conviene dejar abierto.
// El precio es que la fecha del certificado de muestra es la del despliegue,
// cosa que en un ejemplo da igual.
export const dynamic = "force-static";

/**
 * Certificado de muestra, público.
 *
 * Existe para que un interesado pueda ver qué recibe al terminar el curso sin
 * tener que comprarlo, y para poder revisar el diseño en la vista previa del
 * panel. Se genera con el MISMO código que el certificado real, así que no
 * puede desincronizarse del diseño que se entrega de verdad.
 *
 * No es un certificado válido y no pretende serlo: el nombre es un marcador y
 * el folio `GG-EJEMPLO` no existe en la base, de modo que si alguien intenta
 * verificarlo la página de verificación responde que no lo encuentra.
 *
 * Vive FUERA de /api/certificados a propósito: como hermana de
 * `[codigo]/pdf`, el segmento dinámico la capturaba y devolvía 401 aunque el
 * build la listara como ruta propia.
 */
export async function GET() {
  const course = getCourseBySlug("instalacion-de-muros-verdes");
  if (!course) {
    return NextResponse.json({ error: "Curso no disponible." }, { status: 404 });
  }

  const bytes = await generateCertificatePdf({
    recipientName: "Nombre del alumno",
    courseTitle: course.title,
    courseLevel: course.level,
    durationLabel: formatDuration(course.durationMinutes),
    code: "GG-EJEMPLO",
    issuedAt: new Date(), // fecha del build (ver nota sobre force-static)
    signerName: founder.name,
    signerRole: founder.role,
  });

  return new NextResponse(Buffer.from(bytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="certificado-green-gib-ejemplo.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
