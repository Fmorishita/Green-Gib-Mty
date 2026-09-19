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
 * Diseño: paisaje tamaño carta, verde profundo + arena + un motivo de hoja
 * (referencia directa al rubro de Green Gib) en vez del sello dorado
 * genérico de plantilla. Tipografía: Instrument Serif para el nombre y el
 * título, Manrope para el resto — la misma pareja usada en el manual de
 * ventas y en la presentación de capacitación, para que los tres documentos
 * de la marca se sientan de la misma familia.
 */

// ---------------------------------------------------------------------------
// Paleta (tomada de los tokens de marca: tailwind.config.ts)
// ---------------------------------------------------------------------------
const GREEN_DEEP = rgb(0x14 / 255, 0x34 / 255, 0x2b / 255);
const GREEN_LINE = rgb(0x2a / 255, 0x52 / 255, 0x44 / 255);
const OLIVE = rgb(0x6b / 255, 0x7a / 255, 0x4f / 255);
const SAND = rgb(0xdb / 255, 0xc9 / 255, 0xa6 / 255);
const SAND_LIGHT = rgb(0xe8 / 255, 0xdc / 255, 0xc2 / 255);
const CREAM = rgb(0xf6 / 255, 0xf2 / 255, 0xe9 / 255);
const INK = rgb(0x10 / 255, 0x1a / 255, 0x16 / 255);
const INK_SOFT = rgb(0x4c / 255, 0x57 / 255, 0x4f / 255);
const INK_FAINT = rgb(0x7c / 255, 0x87 / 255, 0x80 / 255);

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

// Silueta de una hoja individual: un óvalo puntiagudo (forma de almendra)
// apuntando en +x desde el origen, con su vena central. Coordenadas propias
// de un sistema local de 24×10 unidades que luego se escala y rota.
const LEAF_BLADE_PATH =
  "M0,0 C6,5 16,4.5 24,0 C16,-4.5 6,-5 0,0 Z";
const LEAF_VEIN_PATH = "M2,0 L22,0";

/** Rama con hojas reales (no manchas): un tallo curvo y hojas puntiagudas
 * a lo largo, motivo botánico coherente con el rubro de Green Gib. */
function drawLeafSprig(page: PDFPage, x: number, y: number, scale: number, mirror: boolean) {
  const sx = mirror ? -1 : 1;

  // Tallo con una leve curva (dos segmentos rectos que la insinúan).
  const stemEnd = { x: x + sx * 48 * scale, y: y + 10 * scale };
  const stemMid = { x: x + sx * 24 * scale, y: y + 3 * scale };
  page.drawLine({ start: { x, y }, end: stemMid, thickness: 1.1, color: OLIVE, opacity: 0.55 });
  page.drawLine({ start: stemMid, end: stemEnd, thickness: 1.1, color: OLIVE, opacity: 0.55 });

  const leaves: Array<{ along: number; side: 1 | -1; size: number; rot: number }> = [
    { along: 10, side: 1, size: 0.62, rot: 42 },
    { along: 10, side: -1, size: 0.6, rot: -38 },
    { along: 24, side: 1, size: 0.72, rot: 30 },
    { along: 24, side: -1, size: 0.68, rot: -26 },
    { along: 38, side: 1, size: 0.6, rot: 18 },
  ];

  for (const leaf of leaves) {
    const t = leaf.along / 48;
    const px = x + sx * leaf.along * scale;
    const py = y + (3 + t * 7) * scale;
    // El espejo se resuelve por rotación pura (no por escala negativa, que
    // degenera la silueta): la rama izquierda apunta hacia -x en vez de +x.
    const angle = mirror ? 180 - leaf.rot * leaf.side : leaf.rot * leaf.side;
    const opts = {
      x: px,
      y: py,
      scale: scale * leaf.size,
      rotate: degrees(angle),
      color: OLIVE,
      opacity: 0.5,
    };
    page.drawSvgPath(LEAF_BLADE_PATH, opts);
    page.drawSvgPath(LEAF_VEIN_PATH, {
      ...opts,
      color: undefined,
      borderColor: CREAM,
      borderWidth: 0.5,
      borderOpacity: 0.6,
      opacity: undefined,
    });
  }
}

/**
 * Sello de marca: dos anillos concéntricos con hojas en los polos y el
 * monograma "GG" al centro. Reemplaza al sello dorado de plantilla por algo
 * propio de Green Gib, y llena con intención el espacio entre el cuerpo del
 * texto y el pie del certificado.
 */
function drawSeal(page: PDFPage, cx: number, cy: number, serif: PDFFont, sansBold: PDFFont) {
  page.drawEllipse({ x: cx, y: cy, xScale: 34, yScale: 34, borderColor: SAND, borderWidth: 1.4 });
  page.drawEllipse({ x: cx, y: cy, xScale: 27, yScale: 27, borderColor: GREEN_LINE, borderWidth: 0.9 });

  const monogram = "GG";
  const monoSize = 26;
  const monoWidth = serif.widthOfTextAtSize(monogram, monoSize);
  page.drawText(monogram, {
    x: cx - monoWidth / 2,
    y: cy - monoSize * 0.32,
    size: monoSize,
    font: serif,
    color: GREEN_DEEP,
  });

  const label = "GREEN GIB";
  const labelSize = 5.5;
  const labelWidth = sansBold.widthOfTextAtSize(label, labelSize);
  page.drawText(label, {
    x: cx - labelWidth / 2,
    y: cy - 30,
    size: labelSize,
    font: sansBold,
    color: OLIVE,
  });

  // Hojas pequeñas a los lados, en el ecuador del anillo exterior. El
  // espejo se logra rotando 180°, nunca con escala negativa (deforma la
  // silueta): ver la misma nota en drawLeafSprig.
  const sideLeaf = (dir: 1 | -1) => {
    page.drawSvgPath(LEAF_BLADE_PATH, {
      x: cx + dir * 34,
      y: cy,
      scale: 0.5,
      rotate: degrees(dir === 1 ? 0 : 180),
      color: OLIVE,
      opacity: 0.55,
    });
  };
  sideLeaf(1);
  sideLeaf(-1);
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

  // Franja superior e inferior en verde profundo — enmarca sin encerrar del
  // todo, deja "aire" al centro donde va el contenido.
  page.drawRectangle({ x: 0, y: PAGE_H - 14, width: PAGE_W, height: 14, color: GREEN_DEEP });
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: 14, color: GREEN_DEEP });

  // Marco doble, con esquinas en arena.
  const M = 34;
  page.drawRectangle({
    x: M, y: M, width: PAGE_W - M * 2, height: PAGE_H - M * 2,
    borderColor: GREEN_LINE, borderWidth: 1.4,
  });
  page.drawRectangle({
    x: M + 6, y: M + 6, width: PAGE_W - (M + 6) * 2, height: PAGE_H - (M + 6) * 2,
    borderColor: SAND, borderWidth: 0.7,
  });

  // Ramas decorativas en las esquinas inferiores (motivo botánico, no un sello).
  drawLeafSprig(page, M + 16, M + 22, 1, false);
  drawLeafSprig(page, PAGE_W - M - 16, M + 22, 1, true);

  // ---- Encabezado de marca
  drawCentered(page, "GREEN GIB", PAGE_H - 70, sansBold, 15, GREEN_DEEP);
  drawCentered(page, "CERTIFICACIÓN PROFESIONAL", PAGE_H - 86, sansSemi, 8.5, OLIVE);

  // Filete corto bajo el encabezado
  const ruleW = 46;
  page.drawLine({
    start: { x: PAGE_W / 2 - ruleW / 2, y: PAGE_H - 96 },
    end: { x: PAGE_W / 2 + ruleW / 2, y: PAGE_H - 96 },
    thickness: 1.5,
    color: SAND,
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
    color: SAND,
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

  // ---- Sello de marca: llena el espacio entre el cuerpo y el pie con un
  // elemento propio (dos anillos + monograma + hojas), no un sticker dorado
  // genérico. Ancla visualmente el centro del certificado.
  drawSeal(page, PAGE_W / 2, 210, serif, sansBold);

  // ---- Pie: fecha | firma | folio (tres columnas)
  const footY = 96;
  const colW = (PAGE_W - M * 2 - 40) / 3;
  const col1X = M + 20;
  const col2X = col1X + colW;
  const col3X = col2X + colW;

  // Columna 1: fecha
  page.drawLine({ start: { x: col1X, y: footY + 28 }, end: { x: col1X + colW - 24, y: footY + 28 }, thickness: 0.8, color: INK_FAINT });
  page.drawText(formatDateEs(data.issuedAt), {
    x: col1X, y: footY + 34, size: 10, font: sansSemi, color: INK,
  });
  page.drawText("FECHA DE EMISIÓN", { x: col1X, y: footY + 16, size: 7, font: sansBold, color: INK_FAINT });

  // Columna 2: firma (centrada en su columna)
  const sigWidth = serifItalic.widthOfTextAtSize(data.signerName, 15);
  const sigX = col2X + (colW - 24 - sigWidth) / 2;
  page.drawText(data.signerName, { x: sigX, y: footY + 34, size: 15, font: serifItalic, color: GREEN_DEEP });
  page.drawLine({ start: { x: col2X, y: footY + 28 }, end: { x: col2X + colW - 24, y: footY + 28 }, thickness: 0.8, color: INK_FAINT });
  const roleWidth = sansBold.widthOfTextAtSize(data.signerRole.toUpperCase(), 7);
  page.drawText(data.signerRole.toUpperCase(), {
    x: col2X + (colW - 24 - roleWidth) / 2, y: footY + 16, size: 7, font: sansBold, color: INK_FAINT,
  });

  // Columna 3: folio de verificación
  page.drawLine({ start: { x: col3X, y: footY + 28 }, end: { x: col3X + colW - 24, y: footY + 28 }, thickness: 0.8, color: INK_FAINT });
  page.drawText(data.code, { x: col3X, y: footY + 34, size: 10, font: sansSemi, color: INK });
  page.drawText("FOLIO DE VERIFICACIÓN", { x: col3X, y: footY + 16, size: 7, font: sansBold, color: INK_FAINT });

  // ---- Nota de verificación
  drawCentered(
    page,
    `Verifica la autenticidad de este documento en greengib.mx/certificados/verificar con el folio ${data.code}`,
    54,
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
