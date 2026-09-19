import fs from "node:fs";
import path from "node:path";
import { PDFDocument, rgb, degrees, type PDFFont, type PDFPage } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

/**
 * Generador del certificado de finalización.
 *
 * Usa pdf-lib (vectorial, sin navegador headless) en lugar de renderizar
 * HTML con Chromium: esta función corre dentro de una Server Action /
 * Route Handler en el runtime de Node de Vercel, y pdf-lib no depende de un
 * binario de Chromium que haya que empaquetar aparte.
 *
 * Diseño v2: paisaje tamaño carta, verde profundo + arena + un acento bronce
 * para las líneas finas. Referencias de "documento oficial" ejecutadas con
 * el propio lenguaje de marca, en vez de clichés de plantilla:
 *   - Marco con marcas grabadas (como el canto de una moneda), no un
 *     rectángulo plano.
 *   - Esquinas con escuadra fina + rama de hojas, no un sello dorado pegado.
 *   - Medallón con cintas en vez de un círculo con texto suelto.
 *   - Marca de agua tenue del wordmark detrás del contenido — el mismo
 *     recurso que ya usa el footer del sitio (components/layout/footer.tsx),
 *     para que el documento se sienta de la misma familia.
 *   - Tracking manual en las etiquetas en mayúsculas: sin eso, un caption en
 *     mayúsculas apretado se lee "genérico"; con tracking se lee "grabado".
 *
 * Tipografía: Instrument Serif para el nombre y el título, Manrope para el
 * resto — la misma pareja usada en el manual de ventas y en la presentación
 * de capacitación.
 */

// ---------------------------------------------------------------------------
// Paleta (tomada de los tokens de marca: tailwind.config.ts, + un acento
// bronce nuevo, exclusivo de este documento, para las líneas finas del marco
// y el medallón — evita el dorado brillante de plantilla).
// ---------------------------------------------------------------------------
const GREEN_DEEP = rgb(0x14 / 255, 0x34 / 255, 0x2b / 255);
const GREEN_LINE = rgb(0x2a / 255, 0x52 / 255, 0x44 / 255);
const OLIVE = rgb(0x6b / 255, 0x7a / 255, 0x4f / 255);
const SAND = rgb(0xdb / 255, 0xc9 / 255, 0xa6 / 255);
const CREAM = rgb(0xf6 / 255, 0xf2 / 255, 0xe9 / 255);
const INK = rgb(0x10 / 255, 0x1a / 255, 0x16 / 255);
const INK_SOFT = rgb(0x4c / 255, 0x57 / 255, 0x4f / 255);
const INK_FAINT = rgb(0x7c / 255, 0x87 / 255, 0x80 / 255);
const BRONZE = rgb(0x8a / 255, 0x6a / 255, 0x2e / 255);

const FONTS_DIR = path.join(process.cwd(), "lib", "certificates", "fonts");
const PAGE_W = 792; // 11in landscape
const PAGE_H = 612; // 8.5in

function loadFont(file: string): Buffer {
  return fs.readFileSync(path.join(FONTS_DIR, file));
}

/** Centra una línea de texto horizontalmente en la página. */
function drawCentered(
  page: PDFPage,
  text: string,
  y: number,
  font: PDFFont,
  size: number,
  color = INK
) {
  const width = font.widthOfTextAtSize(text, size);
  page.drawText(text, { x: (PAGE_W - width) / 2, y, size, font, color });
}

/**
 * Texto en mayúsculas con espaciado entre letras (tracking), centrado.
 * pdf-lib no soporta letter-spacing nativo, así que se dibuja letra por
 * letra. Es lo que separa un caption "genérico" de uno que se lee grabado:
 * úsalo sólo en etiquetas cortas en mayúsculas, nunca en párrafos.
 */
function drawTracked(
  page: PDFPage,
  text: string,
  y: number,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>,
  tracking: number
) {
  const chars = [...text];
  const widths = chars.map((c) => font.widthOfTextAtSize(c, size));
  const total = widths.reduce((s, w) => s + w, 0) + tracking * (chars.length - 1);
  let x = (PAGE_W - total) / 2;
  chars.forEach((c, i) => {
    page.drawText(c, { x, y, size, font, color });
    x += widths[i] + tracking;
  });
}

// Silueta de una hoja individual: un óvalo puntiagudo (forma de almendra)
// apuntando en +x desde el origen, con su vena central. Coordenadas propias
// de un sistema local de 24×10 unidades que luego se escala y rota.
const LEAF_BLADE_PATH = "M0,0 C6,5 16,4.5 24,0 C16,-4.5 6,-5 0,0 Z";
const LEAF_VEIN_PATH = "M2,0 L22,0";

/** Rama con hojas reales: un tallo curvo y hojas puntiagudas a lo largo,
 * motivo botánico coherente con el rubro de Green Gib. */
function drawLeafSprig(page: PDFPage, x: number, y: number, scale: number, mirror: boolean) {
  const sx = mirror ? -1 : 1;

  const stemEnd = { x: x + sx * 40 * scale, y: y + 9 * scale };
  const stemMid = { x: x + sx * 20 * scale, y: y + 3 * scale };
  page.drawLine({ start: { x, y }, end: stemMid, thickness: 1, color: OLIVE, opacity: 0.5 });
  page.drawLine({ start: stemMid, end: stemEnd, thickness: 1, color: OLIVE, opacity: 0.5 });

  const leaves: Array<{ along: number; size: number; rot: number }> = [
    { along: 8, size: 0.55, rot: 44 },
    { along: 18, size: 0.62, rot: 26 },
    { along: 30, size: 0.52, rot: 12 },
  ];

  for (const leaf of leaves) {
    const t = leaf.along / 40;
    const px = x + sx * leaf.along * scale;
    const py = y + (3 + t * 6) * scale;
    // El espejo se resuelve por rotación pura (no por escala negativa, que
    // degenera la silueta).
    const angle = mirror ? 180 - leaf.rot : leaf.rot;
    const opts = {
      x: px,
      y: py,
      scale: scale * leaf.size,
      rotate: degrees(angle),
      color: OLIVE,
      opacity: 0.45,
    };
    page.drawSvgPath(LEAF_BLADE_PATH, opts);
    page.drawSvgPath(LEAF_VEIN_PATH, {
      ...opts,
      color: undefined,
      borderColor: CREAM,
      borderWidth: 0.5,
      borderOpacity: 0.55,
      opacity: undefined,
    });
  }
}

/**
 * Marco del certificado: no un rectángulo plano, sino dos elementos que
 * juntos leen como "documento oficial":
 *   1. Dos filetes (uno grueso en verde, uno fino en bronce) a modo de mat
 *      de cuadro.
 *   2. Una banda de marcas grabadas entre ambos filetes — como el canto
 *      estriado de una moneda — que rompe la monotonía de una línea recta.
 */
function drawFrame(page: PDFPage, margin: number) {
  const outer = margin;
  const inner = margin + 16;

  // Filete exterior (grueso, verde) y el interior (fino, bronce).
  page.drawRectangle({
    x: outer,
    y: outer,
    width: PAGE_W - outer * 2,
    height: PAGE_H - outer * 2,
    borderColor: GREEN_LINE,
    borderWidth: 1.3,
  });
  page.drawRectangle({
    x: inner,
    y: inner,
    width: PAGE_W - inner * 2,
    height: PAGE_H - inner * 2,
    borderColor: BRONZE,
    borderWidth: 0.7,
  });

  // Banda de marcas grabadas entre los dos filetes (canto de moneda).
  // `band` es el ancho del hueco entre el filete exterior y el interior;
  // cada marca ocupa la mayor parte del hueco, dejando un margen simétrico.
  const step = 9;
  const band = inner - outer;
  const tickLen = band - 6;
  const tickInset = (band - tickLen) / 2;
  for (let x = inner + step; x < PAGE_W - inner; x += step) {
    page.drawLine({
      start: { x, y: outer + tickInset },
      end: { x, y: outer + tickInset + tickLen },
      thickness: 0.5,
      color: BRONZE,
      opacity: 0.5,
    });
    page.drawLine({
      start: { x, y: PAGE_H - outer - tickInset },
      end: { x, y: PAGE_H - outer - tickInset - tickLen },
      thickness: 0.5,
      color: BRONZE,
      opacity: 0.5,
    });
  }
  for (let y = outer + step; y < PAGE_H - outer; y += step) {
    page.drawLine({
      start: { x: outer + tickInset, y },
      end: { x: outer + tickInset + tickLen, y },
      thickness: 0.5,
      color: BRONZE,
      opacity: 0.5,
    });
    page.drawLine({
      start: { x: PAGE_W - outer - tickInset, y },
      end: { x: PAGE_W - outer - tickInset - tickLen, y },
      thickness: 0.5,
      color: BRONZE,
      opacity: 0.5,
    });
  }
}

/**
 * Marca de agua tenue del wordmark detrás de todo el contenido — el mismo
 * recurso que usa el footer del sitio (una palabra enorme casi invisible).
 * Aporta la textura de "papel de seguridad" de un documento oficial sin
 * competir con el texto que va encima.
 */
function drawWatermark(page: PDFPage, serifItalic: PDFFont) {
  const text = "Green Gib";
  const targetWidth = 540;
  const probe = serifItalic.widthOfTextAtSize(text, 100);
  const size = (targetWidth / probe) * 100;
  const width = serifItalic.widthOfTextAtSize(text, size);
  page.drawText(text, {
    x: (PAGE_W - width) / 2,
    y: PAGE_H / 2 - size * 0.32,
    size,
    font: serifItalic,
    color: GREEN_DEEP,
    opacity: 0.025,
  });
}

/**
 * Medallón con cintas: el gesto clásico de "reconocimiento oficial",
 * ejecutado en la paleta de la marca (nunca dorado brillante ni relleno
 * sólido) para que no se lea como sello de plantilla.
 */
function drawSeal(page: PDFPage, cx: number, cy: number, serif: PDFFont) {
  // Cintas, dibujadas primero para que el medallón quede encima.
  const ribbon = (dir: 1 | -1) => {
    const ribbonPath = "M-9,0 L9,0 L9,46 L0,34 L-9,46 Z";
    page.drawSvgPath(ribbonPath, {
      x: cx + dir * 9,
      y: cy - 8,
      scale: 1,
      rotate: degrees(dir * 11),
      color: SAND,
      opacity: 0.85,
      borderColor: BRONZE,
      borderWidth: 0.5,
      borderOpacity: 0.4,
    });
  };
  ribbon(1);
  ribbon(-1);

  // Anillo exterior con marcas (canto de moneda) + anillo interior fino.
  const rOuter = 30;
  const ticks = 28;
  for (let i = 0; i < ticks; i++) {
    const a = (i / ticks) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * (rOuter - 3);
    const y1 = cy + Math.sin(a) * (rOuter - 3);
    const x2 = cx + Math.cos(a) * rOuter;
    const y2 = cy + Math.sin(a) * rOuter;
    page.drawLine({ start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, thickness: 0.6, color: BRONZE, opacity: 0.65 });
  }
  page.drawEllipse({ x: cx, y: cy, xScale: rOuter - 5, yScale: rOuter - 5, color: CREAM, borderColor: GREEN_LINE, borderWidth: 1 });
  page.drawEllipse({ x: cx, y: cy, xScale: rOuter - 10, yScale: rOuter - 10, borderColor: BRONZE, borderWidth: 0.6 });

  const monogram = "GG";
  const monoSize = 24;
  const monoWidth = serif.widthOfTextAtSize(monogram, monoSize);
  page.drawText(monogram, {
    x: cx - monoWidth / 2,
    y: cy - monoSize * 0.32,
    size: monoSize,
    font: serif,
    color: GREEN_DEEP,
  });
}

export interface CertificateData {
  recipientName: string;
  courseTitle: string;
  courseLevel: string;
  durationLabel: string;
  code: string;
  issuedAt: Date;
  signerName: string;
  signerRole: string;
}

const MONTHS_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function formatDateEs(d: Date): string {
  return `${d.getDate()} de ${MONTHS_ES[d.getMonth()]} de ${d.getFullYear()}`;
}

export async function generateCertificatePdf(data: CertificateData): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);

  const serif = await doc.embedFont(loadFont("InstrumentSerif-Regular.ttf"));
  const serifItalic = await doc.embedFont(loadFont("InstrumentSerif-Italic.ttf"));
  const sans = await doc.embedFont(loadFont("Manrope-Regular.ttf"));
  const sansSemi = await doc.embedFont(loadFont("Manrope-SemiBold.ttf"));
  const sansBold = await doc.embedFont(loadFont("Manrope-ExtraBold.ttf"));

  const page = doc.addPage([PAGE_W, PAGE_H]);

  // ---- Fondo
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: CREAM });

  // ---- Marca de agua (antes que cualquier otro elemento, para quedar debajo)
  drawWatermark(page, serifItalic);

  // ---- Marco grabado + escuadras
  const M = 30;
  drawFrame(page, M);

  // Ramas decorativas en las esquinas inferiores, dentro del marco.
  drawLeafSprig(page, M + 30, M + 30, 1, false);
  drawLeafSprig(page, PAGE_W - M - 30, M + 30, 1, true);

  // ---- Encabezado de marca (con tracking: se lee grabado, no plano)
  drawTracked(page, "GREEN GIB", PAGE_H - 68, sansBold, 16, GREEN_DEEP, 3.2);
  drawTracked(page, "CERTIFICACIÓN PROFESIONAL", PAGE_H - 85, sansSemi, 8, OLIVE, 2.2);

  // Filete corto bajo el encabezado
  const ruleW = 46;
  page.drawLine({
    start: { x: PAGE_W / 2 - ruleW / 2, y: PAGE_H - 96 },
    end: { x: PAGE_W / 2 + ruleW / 2, y: PAGE_H - 96 },
    thickness: 1.5,
    color: BRONZE,
  });

  // ---- Título
  drawCentered(page, "Certificado de Finalización", PAGE_H - 138, serif, 34, GREEN_DEEP);

  // ---- "Se otorga a"
  drawCentered(page, "Se otorga el presente reconocimiento a", PAGE_H - 168, sans, 10.5, INK_SOFT);

  // ---- Nombre del alumno (elemento central, la pieza más grande)
  const nameSize = data.recipientName.length > 28 ? 30 : 38;
  drawCentered(page, data.recipientName, PAGE_H - 208, serifItalic, nameSize, GREEN_DEEP);
  // Línea bajo el nombre, como "campo" a llenar en un certificado clásico.
  const nameLineW = 380;
  page.drawLine({
    start: { x: PAGE_W / 2 - nameLineW / 2, y: PAGE_H - 218 },
    end: { x: PAGE_W / 2 + nameLineW / 2, y: PAGE_H - 218 },
    thickness: 0.8,
    color: BRONZE,
  });

  // ---- Cuerpo: curso completado
  drawCentered(
    page,
    "por concluir satisfactoriamente el curso de capacitación técnica",
    PAGE_H - 244,
    sans,
    10.5,
    INK_SOFT
  );
  drawCentered(page, `«${data.courseTitle}»`, PAGE_H - 266, sansBold, 15, INK);
  drawCentered(
    page,
    `Nivel ${data.courseLevel} · ${data.durationLabel} de contenido en video`,
    PAGE_H - 284,
    sans,
    9,
    INK_FAINT
  );

  // ---- Medallón: ancla visualmente el centro del certificado.
  drawSeal(page, PAGE_W / 2, 206, serif);

  // ---- Pie: fecha | firma | folio (tres columnas)
  const footY = 92;
  const colW = (PAGE_W - M * 2 - 60) / 3;
  const col1X = M + 30;
  const col2X = col1X + colW;
  const col3X = col2X + colW;

  // Columna 1: fecha
  page.drawLine({ start: { x: col1X, y: footY + 28 }, end: { x: col1X + colW - 24, y: footY + 28 }, thickness: 0.7, color: INK_FAINT });
  page.drawText(formatDateEs(data.issuedAt), {
    x: col1X, y: footY + 34, size: 10, font: sansSemi, color: INK,
  });
  drawTrackedLeft(page, "FECHA DE EMISIÓN", col1X, footY + 16, sansBold, 6.5, INK_FAINT, 1.2);

  // Columna 2: firma (centrada en su columna)
  const sigWidth = serifItalic.widthOfTextAtSize(data.signerName, 15);
  const sigX = col2X + (colW - 24 - sigWidth) / 2;
  page.drawText(data.signerName, { x: sigX, y: footY + 34, size: 15, font: serifItalic, color: GREEN_DEEP });
  page.drawLine({ start: { x: col2X, y: footY + 28 }, end: { x: col2X + colW - 24, y: footY + 28 }, thickness: 0.7, color: INK_FAINT });
  drawTrackedInColumn(page, data.signerRole.toUpperCase(), col2X, colW - 24, footY + 16, sansBold, 6.5, INK_FAINT, 1.2);

  // Columna 3: folio de verificación
  page.drawLine({ start: { x: col3X, y: footY + 28 }, end: { x: col3X + colW - 24, y: footY + 28 }, thickness: 0.7, color: INK_FAINT });
  page.drawText(data.code, { x: col3X, y: footY + 34, size: 10, font: sansSemi, color: INK });
  drawTrackedLeft(page, "FOLIO DE VERIFICACIÓN", col3X, footY + 16, sansBold, 6.5, INK_FAINT, 1.2);

  // ---- Nota de verificación
  drawCentered(
    page,
    `Verifica la autenticidad de este documento en greengib.mx/certificados/verificar con el folio ${data.code}`,
    50,
    sans,
    8,
    INK_FAINT
  );

  // ---- Metadatos del archivo
  doc.setTitle(`Certificado — ${data.recipientName} — ${data.courseTitle}`);
  doc.setAuthor("Green Gib");
  doc.setSubject(`Certificado de finalización del curso ${data.courseTitle}`);
  doc.setProducer("Green Gib");
  doc.setCreator("Green Gib · Plataforma de cursos");

  return doc.save();
}

/** Como drawTracked, pero alineado a la izquierda desde x en vez de centrado. */
function drawTrackedLeft(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>,
  tracking: number
) {
  let cursor = x;
  for (const c of text) {
    page.drawText(c, { x: cursor, y, size, font, color });
    cursor += font.widthOfTextAtSize(c, size) + tracking;
  }
}

/** Como drawTracked, pero centrado dentro de una columna de ancho `colWidth`
 * que empieza en `colX`, en vez de centrado en toda la página. */
function drawTrackedInColumn(
  page: PDFPage,
  text: string,
  colX: number,
  colWidth: number,
  y: number,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>,
  tracking: number
) {
  const chars = [...text];
  const widths = chars.map((c) => font.widthOfTextAtSize(c, size));
  const total = widths.reduce((s, w) => s + w, 0) + tracking * (chars.length - 1);
  let x = colX + (colWidth - total) / 2;
  chars.forEach((c, i) => {
    page.drawText(c, { x, y, size, font, color });
    x += widths[i] + tracking;
  });
}
