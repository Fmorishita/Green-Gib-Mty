# Green Gibb — Paisajismo Premium en Monterrey

Sitio web premium para **Green Gibb**, empresa de paisajismo, diseño de jardines, muros
verdes, decoración exterior y mantenimiento de áreas verdes en Monterrey, Nuevo León.

La web funciona como **vendedor digital**: posiciona la marca, explica los servicios,
muestra portafolio, capta leads (WhatsApp + formularios con guardado en Supabase) y
ofrece una tienda visual con carrito que genera pedidos por WhatsApp.

---

## ✨ Stack

| Capa | Tecnología |
| --- | --- |
| Framework | **Next.js 14** (App Router, React Server Components) |
| Lenguaje | **TypeScript** (strict) |
| Estilos | **Tailwind CSS** + design system propio |
| Animación | **Framer Motion** (microinteracciones) |
| Validación | **Zod** |
| Backend / DB | **Supabase** (Postgres + Storage + Auth) |
| Formularios | **Server Actions** |
| Deploy | **Vercel** |

---

## 🚀 Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# edita .env.local con tus valores

# 3. Levantar en desarrollo
npm run dev      # http://localhost:3000

# Otros scripts
npm run build    # build de producción
npm run start    # servir el build
npm run lint     # ESLint
npm run typecheck# TypeScript sin emitir
```

> El sitio **funciona sin configurar Supabase ni Meta Pixel**: usa datos demostrativos
> (mock) y placeholders de marca. Configura los servicios cuando estés listo para
> producción.

---

## 🔐 Variables de entorno

Todas viven en `.env.example`. Cópialo a `.env.local`:

| Variable | Obligatoria | Descripción |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Para guardar leads | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Para guardar leads | Anon key (Project → API) |
| `SUPABASE_SERVICE_ROLE_KEY` | Solo tareas de servidor | Nunca exponer en el cliente |
| `NEXT_PUBLIC_SITE_URL` | Recomendada | URL pública (SEO, sitemap, OG) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | **Sí** | Número en formato internacional sin `+` (ej. `528112345678`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Opcional | ID de Meta Pixel; si falta, el tracking se omite sin romper nada |

---

## 🗄️ Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Ve a **SQL Editor** y ejecuta `supabase/schema.sql`
   (crea tablas, índices, RLS, políticas y buckets de Storage).
3. (Opcional) Ejecuta `supabase/seed.sql` para datos de ejemplo.
4. Copia **Project URL** y **anon key** desde *Project Settings → API* a tu `.env.local`.
5. Buckets de imágenes creados por el script (públicos): `projects`, `products`,
   `blog`, `brand`.

### Tablas

`leads` · `projects` · `products` · `testimonials` · `blog_posts`
(ver definición completa y comentada en `supabase/schema.sql`).

### Seguridad (RLS)

- **leads**: el público (`anon`) solo puede **insertar**; la lectura/edición queda
  reservada a usuarios autenticados (futuro panel admin) o al `service_role`.
- **projects / products / testimonials / blog_posts**: lectura pública de lo
  publicado/activo; escritura solo para usuarios autenticados.

---

## 📁 Estructura del proyecto

```
app/
  (site)/              # Grupo con header, footer, WhatsApp y carrito
    page.tsx           # Home
    servicios/         # /servicios y /servicios/[slug]
    portafolio/        # /portafolio y /portafolio/[slug]
    tienda/            # /tienda y /tienda/[slug]
    nosotros/
    blog/              # /blog y /blog/[slug]
    contacto/
    gracias/
  layout.tsx           # Root: fuentes, CartProvider, Meta Pixel
  sitemap.ts · robots.ts · not-found.tsx
  globals.css

components/
  layout/      # Header, Footer, WhatsAppButton, Logo
  sections/    # Hero, PageHero, SectionTitle, CTASection, ProcessSteps,
               # BeforeAfter, ImageGallery, PortfolioGrid, MotionSection, ...
  cards/       # ServiceCard, ProjectCard, ProductCard, TestimonialCard
  forms/       # ContactForm, LeadForm  (Zod + Server Action)
  ecommerce/   # CartProvider, CartDrawer, ProductCatalog, ProductFilters,
               # ProductGrid, AddToCartButton, ProductGallery, ProductPurchase
  ui/          # Button, Badge, Input, Container, Figure, EmptyState, WhatsAppLink
  analytics/   # MetaPixel, ConversionTracker

lib/
  data/        # Mock data: services, projects, products, testimonials, blog, site
  supabase/    # Clientes browser / server (con fallback a null)
  validations/ # Esquemas Zod
  actions/     # Server Actions (leads)
  whatsapp.ts seo.ts tracking.ts placeholder.ts utils.ts

types/         # Tipos de dominio (espejo del esquema de Supabase)
supabase/      # schema.sql · seed.sql
```

---

## 🎨 Design system

Definido en `tailwind.config.ts`:

- **Paleta:** `green-deep`, `green-olive`, `sand`, `stone`, `cream`, `terracotta`,
  `charcoal`.
- **Tipografía editorial:** *Fraunces* (display) + *Inter* (texto), vía `next/font`.
- **Escala display**, espaciado de secciones, radios suaves, sombras sutiles y
  animaciones (`fade-up`, `slow-zoom`).
- Componentes premium reutilizables con estados `hover/focus/active` y soporte de
  `prefers-reduced-motion`.

### Imágenes y placeholders

Mientras Green Gibb sube su fotografía real, las imágenes se representan con
**placeholders SVG de marca** generados al vuelo (`lib/placeholder.ts`). Son ligeros,
sin dependencia de red y sin problemas de derechos.

> Para usar una foto real, basta reemplazar el texto del dato (p. ej.
> `cover_image: "Jardín San Pedro"`) por una **URL** (`https://…` o una imagen del bucket
> de Supabase). El componente `<Figure>` detecta la URL y usa `next/image`
> automáticamente.

---

## 🔄 De mock data a Supabase

Los tipos de `types/index.ts` reflejan el esquema SQL, por lo que migrar es directo:

1. Sube tu contenido a las tablas de Supabase (o usa `seed.sql` como base).
2. En `lib/data/*.ts`, reemplaza el arreglo estático por una consulta con el cliente
   de servidor (`lib/supabase/server.ts`), p. ej.:
   ```ts
   const supabase = createClient();
   const { data } = await supabase.from("projects").select("*").order("created_at");
   ```
3. Las páginas ya son Server Components: solo cambia la fuente de datos.

---

## 💬 WhatsApp

`lib/whatsapp.ts` genera enlaces dinámicos a partir de `NEXT_PUBLIC_WHATSAPP_NUMBER`:

- `whatsappQuote()` — cotización de proyecto
- `whatsappProduct(nombre)` — consulta de producto
- `whatsappCart(items)` — **pedido del carrito con resumen y total**
- `whatsappSimilarProject(titulo)` — “quiero algo similar”
- `whatsappValuation()` — agendar valoración

Cada clic dispara el evento `WhatsAppClick` (ver tracking).

---

## 📊 Tracking / Meta Ads

`lib/tracking.ts` expone `trackEvent(evento, params)` y **no rompe** si no hay pixel.
Eventos preparados:

`Lead` · `Contact` · `ViewContent` · `AddToCart` · `InitiateCheckout` ·
`WhatsAppClick` · `PortfolioProjectView` · `ProductView`

El pixel se inicializa solo si existe `NEXT_PUBLIC_META_PIXEL_ID`
(`components/analytics/meta-pixel.tsx`). La página `/gracias` dispara la conversión y
está excluida de indexación.

---

## ▲ Deploy en Vercel

1. Importa el repo en [vercel.com](https://vercel.com) (framework: **Next.js**, sin
   configuración extra).
2. Agrega las variables de entorno (las mismas de `.env.local`).
3. Define `NEXT_PUBLIC_SITE_URL` con tu dominio final (afecta SEO/sitemap/OG).
4. Deploy. El sitio se prerenderiza estáticamente salvo `/contacto` (usa query params).

---

## ✅ Checklist final de pruebas

- [ ] Todas las rutas cargan: `/`, `/servicios`, `/portafolio`, `/tienda`, `/nosotros`,
      `/blog`, `/contacto`, `/gracias` y sus `[slug]`.
- [ ] Header sticky, navegación móvil y botón flotante de WhatsApp funcionan.
- [ ] Formularios validan (nombre y teléfono requeridos) y muestran estados de
      carga/error/éxito.
- [ ] Al enviar un formulario redirige a `/gracias` y guarda el lead (con Supabase) o
      registra el fallback en el log (sin Supabase).
- [ ] Carrito: agregar/quitar/cantidad, persiste en `localStorage` y genera el pedido
      por WhatsApp con resumen.
- [ ] Links de WhatsApp abren con el mensaje correcto por contexto.
- [ ] `sitemap.xml` y `robots.txt` responden.
- [ ] Metadata/OG por página y JSON-LD (LocalBusiness, Product, BlogPosting).
- [ ] `npm run build` sin errores.

---

## 🛣️ Próximos pasos

### Panel de administración (`/admin`)
La arquitectura ya está lista (RLS por usuarios autenticados, buckets de Storage).
Para activarlo:
1. Habilita **Supabase Auth** (email/password o magic link).
2. Crea rutas bajo `app/admin/` protegidas con `lib/supabase/server.ts` (middleware de
   sesión).
3. CRUD de `projects`, `products`, `blog_posts`, `testimonials` y bandeja de `leads`.
4. Upload de imágenes a Storage (`projects`, `products`, `blog`, `brand`).

### CRM
- Agrega un webhook/Edge Function en el insert de `leads` que reenvíe a tu CRM
  (HubSpot, Pipedrive, Zoho) o a un Google Sheet vía API.
- Mapea `source`, `project_type` y `budget_range` para segmentar.
- Usa `status` (`new → contacted → quoted → won/lost`) como pipeline.

### Agente de IA en WhatsApp
- Integra **WhatsApp Cloud API** (Meta) o un proveedor (360dialog, Twilio).
- Conecta un agente (function calling) que consulte `products`/`projects` desde
  Supabase y registre leads.
- Reutiliza los mensajes de `lib/whatsapp.ts` como plantillas base.

### Pagos (Stripe / Mercado Pago)
- Crea tabla `orders` (items jsonb, total, status, customer).
- Stripe: Checkout Session en una API route + webhook para confirmar pago.
- Mercado Pago: preferencia de pago + webhook de notificaciones.
- Sustituye el “Pedir por WhatsApp” del carrito por un checkout real cuando esté listo.

---

## 📸 Imágenes reales que conviene conseguir

Sube fotografía propia (o con derechos) para reemplazar los placeholders:

- Proyectos terminados (residenciales y comerciales)
- Antes y después de transformaciones
- Detalles de plantas, follaje y texturas
- Muros verdes y jardines verticales
- Macetas, jardineras y piezas decorativas
- Terrazas, patios y rooftops
- Jardines residenciales de día y de noche (iluminación)
- Equipo trabajando (genera confianza)
- Materiales (piedra, madera, sustratos)
- Productos de la tienda sobre fondo limpio
- Una imagen/clip para el **hero** de la Home (horizontal, alta resolución)
- Imagen Open Graph `public/images/og-default.jpg` (1200×630) para compartir en redes

> Recomendado: formato horizontal para heros, vertical para tarjetas de proyecto,
> cuadrado para productos. Optimiza a WebP/AVIF (next/image lo hace al servir URLs).
