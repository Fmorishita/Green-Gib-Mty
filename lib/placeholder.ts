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

const A = "/images/green-gib";

const IMAGE_ASSETS: Record<string, string> = {
  // Global / páginas principales
  "Jardín residencial premium Monterrey": `${A}/hero-home.jpg`,
  "Servicios de paisajismo Green Gib": `${A}/corporativo-apodaca-acceso-verde.jpg`,
  "Portafolio de paisajismo Monterrey": `${A}/paisajismo-desarrollo-residencial.jpg`,
  "Tienda de plantas y macetas Green Gib": `${A}/products-clean.jpg`,
  "Equipo Green Gib paisajismo": `${A}/team-working.jpg`,
  "Contacto Green Gib paisajismo": `${A}/team-working.jpg`,
  "Texturas naturales Green Gib": `${A}/foliage-textures.jpg`,
  "Jardín diseñado con intención": `${A}/project-residential.jpg`,
  "Terraza con vegetación natural": `${A}/terraza-estar-vegetacion.jpg`,
  "Valoración de jardín Green Gib": `${A}/team-working.jpg`,
  "Mapa de cobertura Monterrey zona metropolitana": `${A}/areas-verdes-corporativas.jpg`,
  "Detalle de plantas y materiales": `${A}/foliage-textures.jpg`,
  "Proyecto de paisajismo terminado": `${A}/paisajismo-desarrollo-residencial.jpg`,

  // Proyectos
  // Fase 1 — Jardín residencial San Pedro (fotografía específica)
  "Jardín residencial San Pedro fachada": `${A}/jardin-san-pedro-fachada.jpg`,
  "Jardín San Pedro zona de estar": `${A}/jardin-san-pedro-zona-estar.jpg`,
  "Jardín San Pedro iluminación nocturna": `${A}/garden-night.jpg`,
  "Jardín San Pedro vegetación": `${A}/jardin-san-pedro-vegetacion.jpg`,
  "Jardín San Pedro andador": `${A}/jardin-san-pedro-andador.jpg`,
  "Jardín San Pedro antes": `${A}/jardin-san-pedro-antes.jpg`,
  "Jardín San Pedro después": `${A}/jardin-san-pedro-despues.jpg`,

  // Fase 2 — Muro verde restaurante (Valle Oriente)
  "Muro verde restaurante acceso": `${A}/muro-verde-restaurante-acceso.jpg`,
  "Muro verde restaurante detalle": `${A}/muro-verde-restaurante-detalle.jpg`,
  "Muro verde restaurante noche": `${A}/muro-verde-restaurante-noche.jpg`,
  "Muro verde restaurante texturas": `${A}/muro-verde-restaurante-texturas.jpg`,

  // Fase 3 — Rooftop penthouse (Centrito Valle)
  "Rooftop penthouse vista ciudad": `${A}/rooftop-penthouse-vista-ciudad.jpg`,
  "Rooftop lounge con vegetación": `${A}/rooftop-lounge-vegetacion.jpg`,
  "Rooftop pérgola sombra": `${A}/rooftop-pergola-sombra.jpg`,
  "Rooftop iluminación nocturna": `${A}/rooftop-iluminacion-nocturna.jpg`,
  "Rooftop jardineras perimetrales": `${A}/rooftop-jardineras-perimetrales.jpg`,

  // Fase 4 — Corporativo Apodaca
  "Corporativo Apodaca acceso verde": `${A}/corporativo-apodaca-acceso-verde.jpg`,
  "Corporativo jardineras": `${A}/corporativo-jardineras.jpg`,
  "Corporativo andador": `${A}/corporativo-andador.jpg`,
  "Corporativo zona de descanso": `${A}/corporativo-zona-descanso.jpg`,

  // Fase 2 — Jardín vertical recepción oficina (Cumbres)
  "Jardín vertical recepción oficina": `${A}/jardin-vertical-recepcion-oficina.jpg`,
  "Jardín vertical detalle especies": `${A}/jardin-vertical-detalle-especies.jpg`,
  "Jardín vertical recepción amplio": `${A}/jardin-vertical-recepcion-amplio.jpg`,

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

  // Fase 4 — Desarrollo García
  "Acceso desarrollo García paisajismo": `${A}/acceso-desarrollo-garcia-paisajismo.jpg`,
  "Desarrollo García vegetación estructurada": `${A}/desarrollo-garcia-vegetacion-estructurada.jpg`,
  "Desarrollo García iluminación de acceso": `${A}/desarrollo-garcia-iluminacion-acceso.jpg`,

  // Servicios
  // Fase 5 — Servicios principales
  "Paisajismo residencial servicio": `${A}/paisajismo-residencial-servicio.jpg`,
  "Jardín residencial San Pedro": `${A}/paisajismo-residencial-servicio.jpg`,
  "Patio interior con vegetación": `${A}/patio-interior-vegetacion-acento.jpg`,
  "Entrada principal paisajismo": `${A}/entrada-principal-paisajismo.jpg`,
  "Plano de diseño de jardín": `${A}/diseno-jardin-plano.jpg`,
  "Render de paisajismo": `${A}/render-paisajismo.jpg`,
  "Paleta vegetal Monterrey": `${A}/paleta-vegetal-monterrey.jpg`,

  // Fase 2 — Muros verdes / jardines verticales (servicios)
  "Muro verde recepción corporativa": `${A}/muro-verde-recepcion-corporativa.jpg`,
  "Jardín vertical restaurante": `${A}/muro-verde-restaurante-acceso.jpg`,
  "Fachada con muro vivo": `${A}/fachada-con-muro-vivo.jpg`,
  "Jardín vertical balcón": `${A}/jardin-vertical-balcon.jpg`,
  "Patio interior vertical": `${A}/jardin-vertical-recepcion-oficina.jpg`,
  // "Modular verde terraza" conserva la imagen dedicada de Fase 5 (modular-verde-terraza.jpg)
  "Modular verde terraza": `${A}/modular-verde-terraza.jpg`,

  // Fase 5 — Decoración exterior
  "Decoración terraza con macetas": `${A}/decoracion-terraza-macetas.jpg`,
  "Iluminación exterior jardín": `${A}/iluminacion-exterior-jardin.jpg`,
  "Composición de jardineras": `${A}/composicion-jardineras.jpg`,

  "Equipo de mantenimiento de jardines": `${A}/team-working.jpg`,
  "Poda profesional": `${A}/team-working.jpg`,
  "Área verde corporativa cuidada": `${A}/jardin-hotel-senderos.jpg`,

  // Fase 4 — Comercial / desarrollos
  "Paisajismo desarrollo residencial": `${A}/paisajismo-desarrollo-residencial.jpg`,
  "Áreas verdes corporativas": `${A}/areas-verdes-corporativas.jpg`,
  "Acceso comercial con jardinería": `${A}/acceso-comercial-jardineria.jpg`,

  "Rooftop con jardín y vista": `${A}/rooftop-penthouse-vista-ciudad.jpg`,
  "Terraza de estar con vegetación": `${A}/terraza-estar-vegetacion.jpg`,
  "Patio convertido en estancia": `${A}/patio-convertido-estancia.jpg`,

  // Productos
  // Fase 7 — Macetas (fotografía de producto)
  "Maceta terracota grande": `${A}/producto-maceta-terracota-grande.jpg`,
  "Maceta terracota detalle": `${A}/producto-maceta-terracota-detalle.jpg`,
  "Maceta concreto minimalista": `${A}/producto-maceta-concreto-minimalista.jpg`,
  "Maceta concreto set": `${A}/producto-maceta-concreto-set.jpg`,
  // Fase 8 — Plantas (olivo, palma)
  "Olivo europeo mediano": `${A}/producto-olivo-europeo-mediano.jpg`,
  "Olivo follaje detalle": `${A}/producto-olivo-follaje-detalle.jpg`,
  "Palma areca interior": `${A}/producto-palma-areca-interior.jpg`,
  "Palma areca maceta": `${A}/producto-palma-areca-maceta.jpg`,
  "Jardinera madera rectangular": `${A}/producto-jardinera-madera-rectangular.jpg`,
  "Jardinera madera con plantas": `${A}/producto-jardinera-madera-plantas.jpg`,
  "Panel jardín vertical modular": `${A}/producto-panel-jardin-vertical-modular.jpg`,
  "Panel jardín vertical instalado": `${A}/producto-panel-jardin-vertical-instalado.jpg`,
  "Set tres macetas concreto": `${A}/producto-set-macetas-concreto-trio.jpg`,
  "Set macetas composición": `${A}/producto-set-macetas-composicion.jpg`,
  // Fase 8 — Accesorios / suculentas
  "Lámpara solar exterior": `${A}/producto-lampara-solar-exterior.jpg`,
  "Lámpara solar jardín noche": `${A}/producto-lampara-solar-jardin-noche.jpg`,
  "Kit suculentas exterior": `${A}/producto-kit-suculentas-exterior.jpg`,
  "Suculentas composición": `${A}/producto-suculentas-composicion.jpg`,
  "Piezas decorativas piedra": `${A}/producto-piezas-decorativas-piedra.jpg`,
  "Piedra natural jardín": `${A}/producto-piedra-natural-jardin.jpg`,
  // Fase 9 — Riego y aromáticas
  "Sistema riego goteo": `${A}/producto-sistema-riego-goteo.jpg`,
  "Riego goteo instalado": `${A}/producto-riego-goteo-instalado.jpg`,
  "Kit hierbas aromáticas": `${A}/producto-kit-hierbas-aromaticas.jpg`,
  "Aromáticas jardinera": `${A}/producto-aromaticas-jardinera.jpg`,

  // Blog
  // Fase 9 — Covers de blog
  "Jardín moderno casa Monterrey": `${A}/blog-jardines-modernos-monterrey.jpg`,
  "Plantas de exterior Monterrey": `${A}/blog-plantas-exterior-monterrey.jpg`,
  "Beneficios muro verde": `${A}/blog-beneficios-muro-verde.jpg`,
  "Plusvalía casa paisajismo": `${A}/blog-plusvalia-paisajismo.jpg`,
  "Errores diseño jardín": `${A}/blog-errores-diseno-jardin.jpg`,
  "Mantenimiento áreas verdes clima cálido": `${A}/blog-mantenimiento-clima-calido.jpg`,

  // Fase 6 — Hotelería / amenidades premium (disponibles para tarjetas futuras)
  "Hotel boutique entrada verde": `${A}/hotel-boutique-entrada-verde.jpg`,
  "Hotel boutique patio interior": `${A}/hotel-boutique-patio-interior.jpg`,
  "Hotel rooftop bar vegetación": `${A}/hotel-rooftop-bar-vegetacion.jpg`,
  "Spa exterior relajación": `${A}/spa-exterior-relajacion.jpg`,
  "Spa interior natural": `${A}/spa-interior-natural.jpg`,
  "Hotel piscina vegetación": `${A}/hotel-piscina-vegetacion.jpg`,
  "Restaurante terraza verde": `${A}/restaurante-terraza-verde.jpg`,
  "Lounge amenidad premium": `${A}/lounge-amenidad-premium.jpg`,
  "Jardín hotel senderos": `${A}/jardin-hotel-senderos.jpg`,
  "Iluminación amenidades nocturna": `${A}/iluminacion-amenidades-nocturna.jpg`,
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
  label = "Green Gib",
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
  <text x="50%" y="${height - height * 0.06}" fill="${palette.ink}" fill-opacity="0.55" font-family="system-ui, sans-serif" font-size="${Math.round(width * 0.016)}" letter-spacing="6" text-anchor="middle">GREEN GIB · MONTERREY</text>
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
