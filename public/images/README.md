# Imágenes del sitio

Coloca aquí la fotografía real de Green Gib. Estructura sugerida:

```
public/images/
  brand/        # logo.png, isotipo, favicon, og-default.jpg (1200×630)
  projects/     # fotos de proyectos terminados y antes/después
  products/     # productos de la tienda (cuadrado, fondo limpio)
  blog/         # portadas de artículos (16:9)
  hero/         # imagen/clip horizontal para el hero de la Home
```

## Cómo conectar una imagen

El sitio usa placeholders de marca para cualquier valor de imagen que **no** sea una
URL. Para usar una imagen real, en los datos (`lib/data/*.ts` o en Supabase) cambia el
texto descriptivo por una ruta o URL:

```ts
// Antes (placeholder de marca)
cover_image: "Jardín residencial San Pedro"

// Después (imagen local)
cover_image: "/images/projects/san-pedro-cover.jpg"

// O desde Supabase Storage
cover_image: "https://<proyecto>.supabase.co/storage/v1/object/public/projects/san-pedro.jpg"
```

El componente `<Figure>` detecta automáticamente las URLs/rutas y las sirve con
`next/image` (optimización, lazy loading, AVIF/WebP).

## Imagen Open Graph

Agrega `public/images/og-default.jpg` (1200×630) para las vistas previas al compartir
en redes sociales y WhatsApp.
