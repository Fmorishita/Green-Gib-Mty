/**
 * Generador de placeholders de marca.
 *
 * Mientras Green Gibb sube su fotografía real, las imágenes del sitio se
 * representan con SVGs generados al vuelo con la paleta de la marca. Son
 * ligeros, no dependen de la red, no tienen problemas de derechos y se ven
 * intencionales. Para usar una foto real, basta con reemplazar el string del
 * dato por una URL `http(s)` y el componente <Figure> usará next/image.
 */

type PaletteKey = "green" | "olive" | "sand" | "terracotta" | "stone" | "cream";

const PALETTES: Record<PaletteKey, { from: string; to: string; ink: string }> = {
  green: { from: "#1C4638", to: "#0E261F", ink: "#DBC9A6" },
  olive: { from: "#7C8C5C", to: "#525E3C", ink: "#F6F2E9" },
  sand: { from: "#E8DCC2", to: "#C9B488", ink: "#14342B" },
  terracotta: { from: "#D17E5D", to: "#A24F31", ink: "#F6F2E9" },
  stone: { from: "#CFC7B6", to: "#9C9079", ink: "#14342B" },
  cream: { from: "#F6F2E9", to: "#EFE8D9", ink: "#14342B" },
};

const ORDER: PaletteKey[] = ["green", "olive", "sand", "terracotta", "stone", "cream"];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

interface PlaceholderOptions {
  label?: string;
  variant?: PaletteKey;
  width?: number;
  height?: number;
}

/** Devuelve un SVG (string) de marca para un label dado. */
export function placeholderSvg({
  label = "Green Gibb",
  variant,
  width = 1200,
  height = 900,
}: PlaceholderOptions): string {
  const h = hash(label);
  const palette = PALETTES[variant ?? ORDER[h % ORDER.length]];
  const cx = 30 + (h % 40);
  const cy = 25 + ((h >> 3) % 50);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice" role="img">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.from}"/>
      <stop offset="100%" stop-color="${palette.to}"/>
    </linearGradient>
    <radialGradient id="r" cx="${cx}%" cy="${cy}%" r="75%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <rect width="${width}" height="${height}" fill="url(#r)"/>
  <g fill="none" stroke="${palette.ink}" stroke-opacity="0.18" stroke-width="2">
    <path d="M${width * 0.62} ${height + 40} C ${width * 0.58} ${height * 0.5}, ${width * 0.78} ${height * 0.42}, ${width * 0.7} ${height * 0.12}" />
    <path d="M${width * 0.7} ${height * 0.5} q 70 -30 120 -10" />
    <path d="M${width * 0.66} ${height * 0.34} q 80 -34 130 -6" />
    <path d="M${width * 0.64} ${height * 0.7} q -80 -28 -130 -2" />
    <circle cx="${width * 0.24}" cy="${height * 0.3}" r="${Math.min(width, height) * 0.16}" />
  </g>
  <text x="50%" y="50%" fill="${palette.ink}" fill-opacity="0.95" font-family="Georgia, serif" font-size="${Math.round(width * 0.034)}" text-anchor="middle" dominant-baseline="middle">${escapeXml(label)}</text>
  <text x="50%" y="${height - height * 0.06}" fill="${palette.ink}" fill-opacity="0.55" font-family="system-ui, sans-serif" font-size="${Math.round(width * 0.016)}" letter-spacing="6" text-anchor="middle">GREEN GIBB · MONTERREY</text>
</svg>`;
}

/** Devuelve un data URI listo para usar en `src`. */
export function placeholderDataUri(options: PlaceholderOptions): string {
  const svg = placeholderSvg(options);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/** True si el string es una URL de imagen real (no un label de placeholder). */
export function isRealImage(src: string): boolean {
  return /^(https?:)?\/\//.test(src) || src.startsWith("/images/");
}
