/**
 * Generador de placeholders de marca + resolver de assets reales.
 *
 * Muchos labels de mock data se redirigen a fotografías JPG en /public/images
 * para que el sitio muestre visuales reales. Los labels que NO estén en el mapa
 * siguen usando el SVG dinámico de marca como fallback.
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
  // Global / páginas principales
  "Jardín residencial premium Monterrey": `${A}/hero-home.jpg`,
  "Servicios de paisajismo Green Gibb": `${A}/project-commercial.jpg`,
  "Portafolio de paisajismo Monterrey": `${A}/project-residential.jpg`,
  "Tienda de plantas y macetas Green Gibb": `${A}/products-clean.jpg`,
  "Equipo Green Gibb paisajismo": `${A}/team-working.jpg`,
  "Contacto Green Gibb paisajismo": `${A}/team-working.jpg`,
  "Texturas naturales Green Gibb": `${A}/foliage-textures.jpg`,
  "Jardín diseñado con intención": `${A}/project-residential.jpg`,
  "Terraza con vegetación natural": `${A}/terraza-estar-vegetacion.jpg`,
  "Valoración de jardín Green Gibb": `${A}/team-working.jpg`,
  "Mapa de cobertura Monterrey zona metropolitana": `${A}/project-commercial.jpg`,
  "Detalle de plantas y materiales": `${A}/foliage-textures.jpg`,
  "Proyecto de paisajismo terminado": `${A}/project-residential.jpg`,

  // Proyectos
  // Fase 1 — Jardín residencial San Pedro (fotografía específica)
  "Jardín residencial San Pedro fachada": `${A}/jardin-san-pedro-fachada.jpg`,
  "Jardín San Pedro zona de estar": `${A}/jardin-san-pedro-zona-estar.jpg`,
  "Jardín San Pedro iluminación nocturna": `${A}/garden-night.jpg`,
  "Jardín San Pedro vegetación": `${A}/jardin-san-pedro-vegetacion.jpg`,
  "Jardín San Pedro andador": `${A}/jardin-san-pedro-andador.jpg`,
  "Jardín San Pedro antes": `${A}/jardin-san-pedro-antes.jpg`,
  "Jardín San Pedro después": `${A}/jardin-san-pedro-despues.jpg`,

  "Muro verde restaurante acceso": `${A}/green-wall.jpg`,
  "Muro verde restaurante detalle": `${A}/green-wall.jpg`,
  "Muro verde restaurante noche": `${A}/green-wall.jpg`,
  "Muro verde restaurante texturas": `${A}/foliage-textures.jpg`,

  // Fase 3 — Rooftop penthouse (Centrito Valle)
  "Rooftop penthouse vista ciudad": `${A}/rooftop-penthouse-vista-ciudad.jpg`,
  "Rooftop lounge con vegetación": `${A}/rooftop-lounge-vegetacion.jpg`,
  "Rooftop pérgola sombra": `${A}/rooftop-pergola-sombra.jpg`,
  "Rooftop iluminación nocturna": `${A}/rooftop-iluminacion-nocturna.jpg`,
  "Rooftop jardineras perimetrales": `${A}/rooftop-jardineras-perimetrales.jpg`,

  "Corporativo Apodaca acceso verde": `${A}/project-commercial.jpg`,
  "Corporativo jardineras": `${A}/project-commercial.jpg`,
  "Corporativo andador": `${A}/project-commercial.jpg`,
  "Corporativo zona de descanso": `${A}/project-commercial.jpg`,

  "Jardín vertical recepción oficina": `${A}/green-wall.jpg`,
  "Jardín vertical detalle especies": `${A}/green-wall.jpg`,
  "Jardín vertical recepción amplio": `${A}/green-wall.jpg`,

  // Fase 1 — Patio interior (Carretera Nacional)
  "Patio interior jardín zen": `${A}/patio-interior-jardin-zen.jpg`,
  "Patio interior piedra natural": `${A}/patio-interior-piedra-natural.jpg`,
  "Patio interior vegetación de acento": `${A}/patio-interior-vegetacion-acento.jpg`,
  "Patio interior punto de agua": `${A}/patio-interior-punto-agua.jpg`,

  // Fase 3 — Terraza de restaurante (Santa Lucía)
  "Terraza restaurante ambientación viva": `${A}/terraza-restaurante-ambientacion-viva.jpg`,
  "Terraza restaurante macetas": `${A}/terraza-restaurante-macetas.jpg`,
  "Terraza restaurante noche": `${A}/terraza-restaurante-noche.jpg`,
  "Terraza restaurante vegetación aromática": `${A}/terraza-restaurante-vegetacion-aromatica.jpg`,

  "Acceso desarrollo García paisajismo": `${A}/project-commercial.jpg`,
  "Desarrollo García vegetación estructurada": `${A}/project-commercial.jpg`,
  "Desarrollo García iluminación de acceso": `${A}/garden-night.jpg`,

  // Servicios
  "Jardín residencial San Pedro": `${A}/jardin-san-pedro-fachada.jpg`,
  "Patio interior con vegetación": `${A}/patio-interior-vegetacion-acento.jpg`,
  "Entrada principal paisajismo": `${A}/jardin-san-pedro-andador.jpg`,
  "Plano de diseño de jardín": `${A}/project-commercial.jpg`,
  "Render de paisajismo": `${A}/project-residential.jpg`,
  "Paleta vegetal Monterrey": `${A}/foliage-textures.jpg`,

  "Muro verde recepción corporativa": `${A}/green-wall.jpg`,
  "Jardín vertical restaurante": `${A}/green-wall.jpg`,
  "Fachada con muro vivo": `${A}/green-wall.jpg`,
  "Jardín vertical balcón": `${A}/green-wall.jpg`,
  "Patio interior vertical": `${A}/green-wall.jpg`,
  "Modular verde terraza": `${A}/green-wall.jpg`,

  "Decoración terraza con macetas": `${A}/terraza-restaurante-macetas.jpg`,
  "Iluminación exterior jardín": `${A}/rooftop-iluminacion-nocturna.jpg`,
  "Composición de jardineras": `${A}/rooftop-jardineras-perimetrales.jpg`,

  "Equipo de mantenimiento de jardines": `${A}/team-working.jpg`,
  "Poda profesional": `${A}/team-working.jpg`,
  "Área verde corporativa cuidada": `${A}/project-commercial.jpg`,

  "Paisajismo desarrollo residencial": `${A}/project-commercial.jpg`,
  "Áreas verdes corporativas": `${A}/project-commercial.jpg`,
  "Acceso comercial con jardinería": `${A}/project-commercial.jpg`,

  "Rooftop con jardín y vista": `${A}/rooftop-penthouse-vista-ciudad.jpg`,
  "Terraza de estar con vegetación": `${A}/terraza-estar-vegetacion.jpg`,
  "Patio convertido en estancia": `${A}/jardin-san-pedro-zona-estar.jpg`,

  // Productos
  "Maceta terracota grande": `${A}/products-clean.jpg`,
  "Maceta terracota detalle": `${A}/products-clean.jpg`,
  "Maceta concreto minimalista": `${A}/products-clean.jpg`,
  "Maceta concreto set": `${A}/products-clean.jpg`,
  "Olivo europeo mediano": `${A}/products-clean.jpg`,
  "Olivo follaje detalle": `${A}/foliage-textures.jpg`,
  "Palma areca interior": `${A}/products-clean.jpg`,
  "Palma areca maceta": `${A}/products-clean.jpg`,
  "Jardinera madera rectangular": `${A}/products-clean.jpg`,
  "Jardinera madera con plantas": `${A}/products-clean.jpg`,
  "Panel jardín vertical modular": `${A}/green-wall.jpg`,
  "Panel jardín vertical instalado": `${A}/green-wall.jpg`,
  "Set tres macetas concreto": `${A}/products-clean.jpg`,
  "Set macetas composición": `${A}/products-clean.jpg`,
  "Lámpara solar exterior": `${A}/garden-night.jpg`,
  "Lámpara solar jardín noche": `${A}/garden-night.jpg`,
  "Kit suculentas exterior": `${A}/products-clean.jpg`,
  "Suculentas composición": `${A}/products-clean.jpg`,
  "Piezas decorativas piedra": `${A}/foliage-textures.jpg`,
  "Piedra natural jardín": `${A}/foliage-textures.jpg`,
  "Sistema riego goteo": `${A}/foliage-textures.jpg`,
  "Riego goteo instalado": `${A}/foliage-textures.jpg`,
  "Kit hierbas aromáticas": `${A}/products-clean.jpg`,
  "Aromáticas jardinera": `${A}/products-clean.jpg`,

  // Blog
  "Jardín moderno casa Monterrey": `${A}/project-residential.jpg`,
  "Plantas de exterior Monterrey": `${A}/foliage-textures.jpg`,
  "Beneficios muro verde": `${A}/green-wall.jpg`,
  "Plusvalía casa paisajismo": `${A}/project-residential.jpg`,
  "Errores diseño jardín": `${A}/before-after-transformation.jpg`,
  "Mantenimiento áreas verdes clima cálido": `${A}/team-working.jpg`,
};

/** Resuelve un label de mock data a su ruta de imagen real, si existe. */
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

/** SVG de marca generado al vuelo (fallback para labels sin imagen real). */
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

/** Data URI del placeholder de marca. */
export function placeholderDataUri(options: PlaceholderOptions): string {
  const svg = placeholderSvg(options);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/** True si el label resuelve a una imagen real (ruta local o URL). */
export function isRealImage(src: string): boolean {
  const resolved = resolveImageSrc(src);
  return /^(https?:)?\/\//.test(resolved) || resolved.startsWith("/images/");
}
