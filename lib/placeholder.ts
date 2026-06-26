/**
 * Generador de placeholders de marca + resolver de assets reales.
 *
 * Fase 1 de imagen: varios labels de mock data se redirigen a archivos en
 * /public/images para que el sitio ya muestre visuales editoriales en lugar
 * de placeholders generados al vuelo. Los labels que no estén en el mapa
 * siguen usando el SVG dinámico de marca.
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

const A = "/images/green-gibb";

const IMAGE_ASSETS: Record<string, string> = {
  "Jardín residencial premium Monterrey": `${A}/hero-home.svg`,
  "Servicios de paisajismo Green Gibb": `${A}/services-hero.svg`,
  "Portafolio de paisajismo Monterrey": `${A}/project-residential.svg`,
  "Tienda de plantas y macetas Green Gibb": `${A}/products-clean.svg`,
  "Equipo Green Gibb paisajismo": `${A}/team-working.svg`,
  "Contacto Green Gibb paisajismo": `${A}/team-working.svg`,
  "Texturas naturales Green Gibb": `${A}/materials-detail.svg`,
  "Jardín diseñado con intención": `${A}/project-residential.svg`,
  "Terraza con vegetación natural": `${A}/terrace-rooftop.svg`,
  "Valoración de jardín Green Gibb": `${A}/team-working.svg`,
  "Mapa de cobertura Monterrey zona metropolitana": `${A}/coverage-map.svg`,
  "Detalle de plantas y materiales": `${A}/materials-detail.svg`,
  "Proyecto de paisajismo terminado": `${A}/project-residential.svg`,

  "Jardín residencial San Pedro fachada": `${A}/project-residential.svg`,
  "Jardín San Pedro zona de estar": `${A}/project-residential.svg`,
  "Jardín San Pedro iluminación nocturna": `${A}/after-garden.svg`,
  "Jardín San Pedro vegetación": `${A}/materials-detail.svg`,
  "Jardín San Pedro andador": `${A}/project-residential.svg`,
  "Jardín San Pedro antes": `${A}/before-garden.svg`,
  "Jardín San Pedro después": `${A}/after-garden.svg`,
  "Muro verde restaurante acceso": `${A}/green-wall.svg`,
  "Muro verde restaurante detalle": `${A}/green-wall.svg`,
  "Muro verde restaurante noche": `${A}/green-wall.svg`,
  "Muro verde restaurante texturas": `${A}/materials-detail.svg`,
  "Rooftop penthouse vista ciudad": `${A}/terrace-rooftop.svg`,
  "Rooftop lounge con vegetación": `${A}/terrace-rooftop.svg`,
  "Rooftop pérgola sombra": `${A}/terrace-rooftop.svg`,
  "Rooftop iluminación nocturna": `${A}/terrace-rooftop.svg`,
  "Rooftop jardineras perimetrales": `${A}/terrace-rooftop.svg`,
  "Corporativo Apodaca acceso verde": `${A}/project-commercial.svg`,
  "Corporativo jardineras": `${A}/project-commercial.svg`,
  "Corporativo andador": `${A}/project-commercial.svg`,
  "Corporativo zona de descanso": `${A}/project-commercial.svg`,
  "Jardín vertical recepción oficina": `${A}/green-wall.svg`,
  "Jardín vertical detalle especies": `${A}/green-wall.svg`,
  "Jardín vertical recepción amplio": `${A}/green-wall.svg`,
  "Patio interior jardín zen": `${A}/materials-detail.svg`,
  "Patio interior piedra natural": `${A}/materials-detail.svg`,
  "Patio interior vegetación de acento": `${A}/materials-detail.svg`,
  "Patio interior punto de agua": `${A}/project-residential.svg`,
  "Terraza restaurante ambientación viva": `${A}/terrace-rooftop.svg`,
  "Terraza restaurante macetas": `${A}/terrace-rooftop.svg`,
  "Terraza restaurante noche": `${A}/terrace-rooftop.svg`,
  "Terraza restaurante vegetación aromática": `${A}/materials-detail.svg`,
  "Acceso desarrollo García paisajismo": `${A}/project-commercial.svg`,
  "Desarrollo García vegetación estructurada": `${A}/project-commercial.svg`,
  "Desarrollo García iluminación de acceso": `${A}/project-commercial.svg`,

  "Jardín residencial San Pedro": `${A}/project-residential.svg`,
  "Patio interior con vegetación": `${A}/materials-detail.svg`,
  "Entrada principal paisajismo": `${A}/project-residential.svg`,
  "Plano de diseño de jardín": `${A}/services-hero.svg`,
  "Render de paisajismo": `${A}/project-residential.svg`,
  "Paleta vegetal Monterrey": `${A}/materials-detail.svg`,
  "Muro verde recepción corporativa": `${A}/green-wall.svg`,
  "Jardín vertical restaurante": `${A}/green-wall.svg`,
  "Fachada con muro vivo": `${A}/green-wall.svg`,
  "Jardín vertical balcón": `${A}/green-wall.svg`,
  "Patio interior vertical": `${A}/green-wall.svg`,
  "Modular verde terraza": `${A}/green-wall.svg`,
  "Decoración terraza con macetas": `${A}/terrace-rooftop.svg`,
  "Iluminación exterior jardín": `${A}/after-garden.svg`,
  "Composición de jardineras": `${A}/products-clean.svg`,
  "Equipo de mantenimiento de jardines": `${A}/team-working.svg`,
  "Poda profesional": `${A}/team-working.svg`,
  "Área verde corporativa cuidada": `${A}/project-commercial.svg`,
  "Paisajismo desarrollo residencial": `${A}/project-commercial.svg`,
  "Áreas verdes corporativas": `${A}/project-commercial.svg`,
  "Acceso comercial con jardinería": `${A}/project-commercial.svg`,
  "Rooftop con jardín y vista": `${A}/terrace-rooftop.svg`,
  "Terraza de estar con vegetación": `${A}/terrace-rooftop.svg`,
  "Patio convertido en estancia": `${A}/project-residential.svg`,

  "Maceta terracota grande": `${A}/products-clean.svg`,
  "Maceta terracota detalle": `${A}/products-clean.svg`,
  "Maceta concreto minimalista": `${A}/products-clean.svg`,
  "Maceta concreto set": `${A}/products-clean.svg`,
  "Olivo europeo mediano": `${A}/products-clean.svg`,
  "Olivo follaje detalle": `${A}/materials-detail.svg`,
  "Palma areca interior": `${A}/products-clean.svg`,
  "Palma areca maceta": `${A}/products-clean.svg`,
  "Jardinera madera rectangular": `${A}/products-clean.svg`,
  "Jardinera madera con plantas": `${A}/products-clean.svg`,
  "Panel jardín vertical modular": `${A}/green-wall.svg`,
  "Panel jardín vertical instalado": `${A}/green-wall.svg`,
  "Set tres macetas concreto": `${A}/products-clean.svg`,
  "Set macetas composición": `${A}/products-clean.svg`,
  "Lámpara solar exterior": `${A}/after-garden.svg`,
  "Lámpara solar jardín noche": `${A}/after-garden.svg`,
  "Kit suculentas exterior": `${A}/products-clean.svg`,
  "Suculentas composición": `${A}/products-clean.svg`,
  "Piezas decorativas piedra": `${A}/materials-detail.svg`,
  "Piedra natural jardín": `${A}/materials-detail.svg`,
  "Sistema riego goteo": `${A}/materials-detail.svg`,
  "Riego goteo instalado": `${A}/materials-detail.svg`,
  "Kit hierbas aromáticas": `${A}/products-clean.svg`,
  "Aromáticas jardinera": `${A}/products-clean.svg`,

  "Jardín moderno casa Monterrey": `${A}/blog-editorial.svg`,
  "Plantas de exterior Monterrey": `${A}/blog-editorial.svg`,
  "Beneficios muro verde": `${A}/green-wall.svg`,
  "Plusvalía casa paisajismo": `${A}/blog-editorial.svg`,
  "Errores diseño jardín": `${A}/blog-editorial.svg`,
  "Mantenimiento áreas verdes clima cálido": `${A}/blog-editorial.svg`,
};

export function resolveImageSrc(src: string): string {
  return IMAGE_ASSETS[src] ?? src;
}

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

export function placeholderDataUri(options: PlaceholderOptions): string {
  const svg = placeholderSvg(options);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function isRealImage(src: string): boolean {
  const resolved = resolveImageSrc(src);
  return /^(https?:)?\/\//.test(resolved) || resolved.startsWith("/images/");
}
