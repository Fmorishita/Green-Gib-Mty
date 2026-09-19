import fs from "node:fs";
import path from "node:path";
import { PDFDocument, rgb, degrees, type PDFFont, type PDFPage, type RGB } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

/**
 * Generador del certificado de finalización.
 *
 * Usa pdf-lib (vectorial, sin navegador headless) porque esta función corre
 * en el runtime de Node de Vercel y pdf-lib no depende de un binario de
 * Chromium que haya que empaquetar aparte.
 *
 * Diseño v3 — estilo diploma clásico, siguiendo la referencia aprobada:
 *   · Marco ancho verde con patrón guilloché (las ondas entrelazadas de los
 *     billetes y títulos oficiales), entre filetes dorados.
 *   · Guirnaldas de laurel doradas con moño en las cuatro esquinas.
 *   · Sello de cera dorado con monograma, montado sobre el marco superior.
 *   · Roseta dorada con cintas verdes como ancla del centro.
 *   · Marca de agua del wordmark, como papel de seguridad.
 *
 * Todo es vectorial y generado por código: no hay imágenes rasterizadas, así
 * que el certificado se imprime nítido a cualquier tamaño.
 */

// ---------------------------------------------------------------------------
// Paleta
// ---------------------------------------------------------------------------
const GOLD = rgb(0xb8 / 255, 0x91 / 255, 0x2f / 255);
const GOLD_LIGHT = rgb(0xdf / 255, 0xc2 / 255, 0x75 / 255);
const GOLD_PALE = rgb(0xf0 / 255, 0xe0 / 255, 0xb4 / 255);
const GOLD_DARK = rgb(0x7d / 255, 0x5f / 255, 0x1c / 255);

const GREEN_BAND = rgb(0x1e / 255, 0x47 / 255, 0x36 / 255);
const GREEN_GUILLOCHE = rgb(0x4a / 255, 0x7a / 255, 0x63 / 255);
const GREEN_DEEP = rgb(0x14 / 255, 0x34 / 255, 0x2b / 255);

const CREAM = rgb(0xfb / 255, 0xf8 / 255, 0xf1 / 255);
const INK = rgb(0x1a / 255, 0x23 / 255, 0x1e / 255);
const INK_SOFT = rgb(0x4c / 255, 0x57 / 255, 0x4f / 255);
const INK_FAINT = rgb(0x7c / 255, 0x87 / 255, 0x80 / 255);

const FONTS_DIR = path.join(process.cwd(), "lib", "certificates", "fonts");
const ASSETS_DIR = path.join(process.cwd(), "lib", "certificates", "assets");
const PAGE_W = 792; // 11in horizontal
const PAGE_H = 612; // 8.5in

// Geometría del marco
const RULE_OUT = 22; // filete dorado exterior
const BAND_OUT = 28; // borde exterior de la banda verde
const BAND_IN = 56; // borde interior de la banda verde
const RULE_IN = 66; // filete dorado interior
const BAND_MID = (BAND_OUT + BAND_IN) / 2;

function loadFont(file: string): Buffer {
  return fs.readFileSync(path.join(FONTS_DIR, file));
}

// ---------------------------------------------------------------------------
// Utilidades de texto
// ---------------------------------------------------------------------------

/** Centra una línea de texto horizontalmente en la página. */
function drawCentered(
  page: PDFPage,
  text: string,
  y: number,
  font: PDFFont,
  size: number,
  color: RGB = INK
) {
  const width = font.widthOfTextAtSize(text, size);
  page.drawText(text, { x: (PAGE_W - width) / 2, y, size, font, color });
}

/**
 * Texto con espaciado entre letras (tracking), dibujado letra por letra
 * porque pdf-lib no soporta letter-spacing nativo. Es lo que separa un
 * caption en mayúsculas apretado de uno que se lee grabado.
 */
function drawTracked(
  page: PDFPage,
  text: string,
  y: number,
  font: PDFFont,
  size: number,
  color: RGB,
  tracking: number,
  opts?: { x?: number; width?: number }
) {
  const chars = [...text];
  const widths = chars.map((c) => font.widthOfTextAtSize(c, size));
  const total = widths.reduce((s, w) => s + w, 0) + tracking * (chars.length - 1);
  const boxX = opts?.x ?? 0;
  const boxW = opts?.width ?? PAGE_W;
  let x = boxX + (boxW - total) / 2;
  chars.forEach((c, i) => {
    page.drawText(c, { x, y, size, font, color });
    x += widths[i] + tracking;
  });
}

/** Igual que drawTracked pero anclado a la izquierda. */
function drawTrackedLeft(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
  size: number,
  color: RGB,
  tracking: number
) {
  let cursor = x;
  for (const c of text) {
    page.drawText(c, { x: cursor, y, size, font, color });
    cursor += font.widthOfTextAtSize(c, size) + tracking;
  }
}

// ---------------------------------------------------------------------------
// Utilidades vectoriales
//
// drawSvgPath interpreta el path en coordenadas SVG (eje Y hacia abajo) y lo
// ancla en el punto (x, y) que se le pase. Anclando en (0, PAGE_H) y
// escribiendo cada punto como (px, PAGE_H - py), el path queda en las
// coordenadas normales del PDF.
// ---------------------------------------------------------------------------
interface Pt {
  x: number;
  y: number;
}

function polyline(points: Pt[]): string {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${(PAGE_H - p.y).toFixed(2)}`)
    .join(" ");
}

function drawPolyline(
  page: PDFPage,
  points: Pt[],
  color: RGB,
  thickness: number,
  opacity = 1
) {
  page.drawSvgPath(polyline(points), {
    x: 0,
    y: PAGE_H,
    borderColor: color,
    borderWidth: thickness,
    borderOpacity: opacity,
  });
}

/** Rectángulo dibujado sólo como contorno, en coordenadas de página. */
function strokeRect(
  page: PDFPage,
  inset: number,
  color: RGB,
  thickness: number,
  opacity = 1
) {
  page.drawRectangle({
    x: inset,
    y: inset,
    width: PAGE_W - inset * 2,
    height: PAGE_H - inset * 2,
    borderColor: color,
    borderWidth: thickness,
    borderOpacity: opacity,
  });
}

// ---------------------------------------------------------------------------
// Marco guilloché
// ---------------------------------------------------------------------------

/**
 * Una corrida de ondas entrelazadas a lo largo de un lado de la banda.
 * Tres senoidales desfasadas 120° producen el trenzado clásico del guilloché
 * de un billete o un título oficial.
 */
function guillocheRun(
  page: PDFPage,
  start: Pt,
  dir: Pt,
  length: number,
  amplitude: number,
  cycles: number
) {
  const normal = { x: -dir.y, y: dir.x };
  const steps = Math.max(80, Math.round(length / 2));
  const phases = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];

  for (const phase of phases) {
    const pts: Pt[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const off = amplitude * Math.sin(2 * Math.PI * cycles * t + phase);
      pts.push({
        x: start.x + dir.x * length * t + normal.x * off,
        y: start.y + dir.y * length * t + normal.y * off,
      });
    }
    drawPolyline(page, pts, GREEN_GUILLOCHE, 0.55, 0.85);
  }
}

/** Banda verde perimetral con guilloché y filetes dorados. */
function drawOrnateBorder(page: PDFPage) {
  // Banda verde: un rectángulo lleno con el interior "recortado" encima.
  page.drawRectangle({
    x: BAND_OUT,
    y: BAND_OUT,
    width: PAGE_W - BAND_OUT * 2,
    height: PAGE_H - BAND_OUT * 2,
    color: GREEN_BAND,
  });
  page.drawRectangle({
    x: BAND_IN,
    y: BAND_IN,
    width: PAGE_W - BAND_IN * 2,
    height: PAGE_H - BAND_IN * 2,
    color: CREAM,
  });

  // Guilloché sobre cada lado, a lo largo de la línea media de la banda.
  const amp = 8.5;
  const hLen = PAGE_W - BAND_MID * 2;
  const vLen = PAGE_H - BAND_MID * 2;
  const density = 1 / 26; // ciclos por punto: mantiene el trenzado uniforme

  guillocheRun(page, { x: BAND_MID, y: BAND_MID }, { x: 1, y: 0 }, hLen, amp, hLen * density);
  guillocheRun(page, { x: BAND_MID, y: PAGE_H - BAND_MID }, { x: 1, y: 0 }, hLen, amp, hLen * density);
  guillocheRun(page, { x: BAND_MID, y: BAND_MID }, { x: 0, y: 1 }, vLen, amp, vLen * density);
  guillocheRun(page, { x: PAGE_W - BAND_MID, y: BAND_MID }, { x: 0, y: 1 }, vLen, amp, vLen * density);

  // Filetes dorados: exterior, los dos bordes de la banda y el interior.
  strokeRect(page, RULE_OUT, GOLD, 1.4);
  strokeRect(page, BAND_OUT, GOLD_LIGHT, 1);
  strokeRect(page, BAND_IN, GOLD_LIGHT, 1);
  strokeRect(page, RULE_IN, GOLD, 0.9);
}

// ---------------------------------------------------------------------------
// Laurel y moños
// ---------------------------------------------------------------------------
const LEAF_PATH = "M0,0 C5,4.4 14,4 21,0 C14,-4 5,-4.4 0,0 Z";

/**
 * Guirnalda de laurel: un tallo con leve caída y hojas alternadas a ambos
 * lados, escalando de mayor a menor hacia la punta.
 */
function drawGarland(
  page: PDFPage,
  origin: Pt,
  dir: Pt,
  length: number,
  sag: number
) {
  const normal = { x: -dir.y, y: dir.x };
  const at = (t: number): Pt => ({
    x: origin.x + dir.x * length * t + normal.x * sag * Math.sin(Math.PI * t),
    y: origin.y + dir.y * length * t + normal.y * sag * Math.sin(Math.PI * t),
  });

  // Tallo
  const stem: Pt[] = [];
  for (let i = 0; i <= 24; i++) stem.push(at(i / 24));
  drawPolyline(page, stem, GOLD, 1.2, 0.95);

  // Hojas alternadas
  const baseAngle = (Math.atan2(dir.y, dir.x) * 180) / Math.PI;
  const count = 9;
  for (let i = 0; i < count; i++) {
    const t = 0.08 + (i / (count - 1)) * 0.86;
    const p = at(t);
    const side = i % 2 === 0 ? 1 : -1;
    // Las hojas grandes al arranque, pequeñas hacia la punta.
    const scale = 0.95 - t * 0.45;
    page.drawSvgPath(LEAF_PATH, {
      x: p.x,
      y: p.y,
      scale,
      rotate: degrees(baseAngle + side * 38),
      color: i % 2 === 0 ? GOLD : GOLD_LIGHT,
      opacity: 0.95,
      borderColor: GOLD_DARK,
      borderWidth: 0.35,
      borderOpacity: 0.55,
    });
  }
}

/** Moño de cinta: dos lazos, nudo y dos colas. */
function drawBow(page: PDFPage, center: Pt, scale: number, rotation: number) {
  const loop = (dir: 1 | -1) => {
    page.drawEllipse({
      x: center.x + dir * 8.5 * scale,
      y: center.y + 2.5 * scale,
      xScale: 8.5 * scale,
      yScale: 4.6 * scale,
      rotate: degrees(rotation + dir * 28),
      color: GOLD_LIGHT,
      borderColor: GOLD_DARK,
      borderWidth: 0.4,
      borderOpacity: 0.6,
    });
  };
  loop(1);
  loop(-1);

  // Colas
  // Longitud acotada para que las colas no rebasen el ancho de la banda verde.
  const tail = "M0,0 L3.6,0 L5.8,11 L1.3,8.2 Z";
  for (const dir of [1, -1] as const) {
    page.drawSvgPath(tail, {
      x: center.x + dir * 2 * scale,
      y: center.y,
      scale,
      rotate: degrees(rotation + dir * 18),
      color: GOLD,
      borderColor: GOLD_DARK,
      borderWidth: 0.35,
      borderOpacity: 0.55,
    });
  }

  // Nudo
  page.drawEllipse({
    x: center.x,
    y: center.y + 2 * scale,
    xScale: 3.2 * scale,
    yScale: 3.2 * scale,
    color: GOLD,
    borderColor: GOLD_DARK,
    borderWidth: 0.4,
  });
}

/** Ornamento completo de esquina: moño con dos guirnaldas saliendo de él. */
function drawCornerOrnament(page: PDFPage, corner: Pt, hDir: 1 | -1, vDir: 1 | -1) {
  drawGarland(page, corner, { x: hDir, y: 0 }, 150, -vDir * 5);
  drawGarland(page, corner, { x: 0, y: vDir }, 118, hDir * 5);
  drawBow(page, corner, 1.05, vDir === 1 ? 0 : 180);
}

// ---------------------------------------------------------------------------
// Sellos
// ---------------------------------------------------------------------------

/** Contorno festoneado (borde de sello de cera / moneda) como path SVG. */
function scallopPath(radius: number, scallops: number, depth: number): string {
  const pts: string[] = [];
  const steps = scallops * 14;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const r = radius + depth * Math.cos(scallops * a);
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return `${pts.join(" ")} Z`;
}

/** Sello dorado con monograma. Se usa arriba (chico) y al centro (grande). */
function drawGoldSeal(page: PDFPage, center: Pt, radius: number, serif: PDFFont) {
  // Festón exterior, con una copia desplazada detrás que simula relieve.
  const scallop = scallopPath(radius, 16, radius * 0.075);
  page.drawSvgPath(scallop, {
    x: center.x,
    y: center.y + 1.2,
    scale: 1,
    color: GOLD_DARK,
    opacity: 0.55,
  });
  page.drawSvgPath(scallop, {
    x: center.x,
    y: center.y,
    scale: 1,
    color: GOLD,
    borderColor: GOLD_DARK,
    borderWidth: 0.5,
  });

  // Anillos interiores
  page.drawEllipse({
    x: center.x,
    y: center.y,
    xScale: radius * 0.8,
    yScale: radius * 0.8,
    color: GOLD_LIGHT,
    borderColor: GOLD_DARK,
    borderWidth: 0.6,
  });
  page.drawEllipse({
    x: center.x,
    y: center.y,
    xScale: radius * 0.66,
    yScale: radius * 0.66,
    color: GOLD_PALE,
    borderColor: GOLD_DARK,
    borderWidth: 0.5,
    borderOpacity: 0.8,
  });

  const monogram = "GG";
  const size = radius * 0.86;
  const width = serif.widthOfTextAtSize(monogram, size);
  page.drawText(monogram, {
    x: center.x - width / 2,
    y: center.y - size * 0.33,
    size,
    font: serif,
    color: GOLD_DARK,
  });
}

/** Roseta central: sello dorado sobre dos cintas verdes. */
function drawRosette(page: PDFPage, center: Pt, radius: number, serif: PDFFont) {
  const ribbon = "M-11,0 L11,0 L11,54 L0,40 L-11,54 Z";
  for (const dir of [1, -1] as const) {
    page.drawSvgPath(ribbon, {
      x: center.x + dir * 11,
      y: center.y - 4,
      scale: 1,
      rotate: degrees(dir * 13),
      color: GREEN_BAND,
      borderColor: GREEN_DEEP,
      borderWidth: 0.6,
    });
  }
  drawGoldSeal(page, center, radius, serif);
}

// ---------------------------------------------------------------------------
// Marca de agua
// ---------------------------------------------------------------------------
function drawWatermark(page: PDFPage, serifItalic: PDFFont) {
  const text = "Green Gib";
  const target = 520;
  const probe = serifItalic.widthOfTextAtSize(text, 100);
  const size = (target / probe) * 100;
  const width = serifItalic.widthOfTextAtSize(text, size);
  page.drawText(text, {
    x: (PAGE_W - width) / 2,
    y: PAGE_H / 2 - size * 0.3,
    size,
    font: serifItalic,
    color: GOLD_DARK,
    opacity: 0.05,
  });
}

/**
 * Firma manuscrita escaneada, si existe.
 *
 * NO se dibuja una firma inventada: falsificar la rúbrica de una persona real
 * en un documento que certifica algo no es aceptable. Para que aparezca,
 * dirección debe colocar un PNG con fondo transparente en
 * lib/certificates/assets/firma.png (ver docs/PLATAFORMA-CURSOS.md).
 */
async function drawSignatureImage(
  doc: PDFDocument,
  page: PDFPage,
  center: Pt,
  maxWidth: number
): Promise<void> {
  const file = path.join(ASSETS_DIR, "firma.png");
  if (!fs.existsSync(file)) return;
  try {
    const png = await doc.embedPng(fs.readFileSync(file));
    const scale = Math.min(maxWidth / png.width, 44 / png.height);
    const w = png.width * scale;
    const h = png.height * scale;
    page.drawImage(png, { x: center.x - w / 2, y: center.y, width: w, height: h });
  } catch {
    // Un PNG corrupto no debe tumbar la generación del certificado.
  }
}

// ---------------------------------------------------------------------------

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

  // Fondo y marca de agua
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: CREAM });
  drawWatermark(page, serifItalic);

  // Marco guilloché
  drawOrnateBorder(page);

  // Ornamentos de esquina (sobre la banda, cubren el empalme del guilloché)
  drawCornerOrnament(page, { x: BAND_MID, y: BAND_MID }, 1, 1);
  drawCornerOrnament(page, { x: PAGE_W - BAND_MID, y: BAND_MID }, -1, 1);
  drawCornerOrnament(page, { x: BAND_MID, y: PAGE_H - BAND_MID }, 1, -1);
  drawCornerOrnament(page, { x: PAGE_W - BAND_MID, y: PAGE_H - BAND_MID }, -1, -1);

  // Sello superior, montado sobre el marco
  drawGoldSeal(page, { x: PAGE_W / 2, y: PAGE_H - BAND_MID }, 25, serif);

  // ---- Encabezado
  drawTracked(page, "GREEN GIB", PAGE_H - 118, sansBold, 17, GREEN_DEEP, 3.4);
  drawTracked(page, "CERTIFICACIÓN PROFESIONAL", PAGE_H - 135, sansSemi, 8, GOLD_DARK, 2.4);

  const ruleW = 54;
  page.drawLine({
    start: { x: PAGE_W / 2 - ruleW / 2, y: PAGE_H - 147 },
    end: { x: PAGE_W / 2 + ruleW / 2, y: PAGE_H - 147 },
    thickness: 1.4,
    color: GOLD,
  });

  // ---- Título
  drawCentered(page, "Certificado de Finalización", PAGE_H - 189, serif, 34, GREEN_DEEP);

  // ---- Destinatario
  drawCentered(page, "Se otorga el presente reconocimiento a", PAGE_H - 217, sans, 10.5, INK_SOFT);

  const nameSize = data.recipientName.length > 30 ? 29 : 36;
  drawCentered(page, data.recipientName, PAGE_H - 256, serifItalic, nameSize, GREEN_DEEP);
  const nameLineW = 420;
  page.drawLine({
    start: { x: PAGE_W / 2 - nameLineW / 2, y: PAGE_H - 267 },
    end: { x: PAGE_W / 2 + nameLineW / 2, y: PAGE_H - 267 },
    thickness: 0.9,
    color: GOLD,
    opacity: 0.85,
  });

  // ---- Curso
  drawCentered(
    page,
    "por concluir satisfactoriamente el curso de capacitación técnica",
    PAGE_H - 291,
    sans,
    10.5,
    INK_SOFT
  );
  drawCentered(page, `«${data.courseTitle}»`, PAGE_H - 313, sansBold, 15, INK);
  drawCentered(
    page,
    `Nivel ${data.courseLevel} · ${data.durationLabel} de contenido en video`,
    PAGE_H - 331,
    sans,
    9,
    INK_FAINT
  );

  // ---- Roseta central
  drawRosette(page, { x: PAGE_W / 2, y: 218 }, 31, serif);

  // ---- Pie: fecha | firma | folio
  const footY = 100;
  const usable = PAGE_W - RULE_IN * 2 - 40;
  const colW = usable / 3;
  const col1X = RULE_IN + 20;
  const col2X = col1X + colW;
  const col3X = col2X + colW;
  const lineW = colW - 26;

  // Firma escaneada, si dirección ya la subió.
  await drawSignatureImage(doc, page, { x: col2X + lineW / 2, y: footY + 40 }, lineW * 0.8);

  const rule = (x: number) =>
    page.drawLine({
      start: { x, y: footY + 30 },
      end: { x: x + lineW, y: footY + 30 },
      thickness: 0.8,
      color: GOLD_DARK,
      opacity: 0.55,
    });

  rule(col1X);
  page.drawText(formatDateEs(data.issuedAt), {
    x: col1X, y: footY + 36, size: 10, font: sansSemi, color: INK,
  });
  drawTrackedLeft(page, "FECHA DE EMISIÓN", col1X, footY + 17, sansBold, 6.5, INK_FAINT, 1.3);

  rule(col2X);
  const sigWidth = serifItalic.widthOfTextAtSize(data.signerName, 15);
  page.drawText(data.signerName, {
    x: col2X + (lineW - sigWidth) / 2, y: footY + 36, size: 15, font: serifItalic, color: GREEN_DEEP,
  });
  drawTracked(page, data.signerRole.toUpperCase(), footY + 17, sansBold, 6.5, INK_FAINT, 1.3, {
    x: col2X,
    width: lineW,
  });

  rule(col3X);
  page.drawText(data.code, {
    x: col3X, y: footY + 36, size: 10, font: sansSemi, color: INK,
  });
  drawTrackedLeft(page, "FOLIO DE VERIFICACIÓN", col3X, footY + 17, sansBold, 6.5, INK_FAINT, 1.3);

  // ---- Nota de verificación
  drawCentered(
    page,
    `Verifica la autenticidad de este documento en greengib.mx/certificados/verificar con el folio ${data.code}`,
    78,
    sans,
    8,
    INK_FAINT
  );

  // ---- Metadatos
  doc.setTitle(`Certificado — ${data.recipientName} — ${data.courseTitle}`);
  doc.setAuthor("Green Gib");
  doc.setSubject(`Certificado de finalización del curso ${data.courseTitle}`);
  doc.setProducer("Green Gib");
  doc.setCreator("Green Gib · Plataforma de cursos");

  return doc.save();
}
