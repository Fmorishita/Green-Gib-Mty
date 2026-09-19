# Plataforma de cursos

Venta de cursos de capacitación en video, con área privada para los alumnos.

## Rutas

| Ruta | Acceso | Render | Qué es |
| --- | --- | --- | --- |
| `/cursos` | Público | Estático | Catálogo |
| `/cursos/[slug]` | Público | Estático | Detalle y temario |
| `/cursos/[slug]/comprar` | Público | Dinámico | Checkout |
| `/cursos/vista-previa` | Público | Estático | Maqueta del panel, con datos de ejemplo |
| `/acceso` · `/acceso/registro` · `/acceso/recuperar` | Público | Dinámico | Autenticación |
| `/mi-cuenta` | **Privado** | Dinámico | Panel del alumno |
| `/mi-cuenta/[curso]` | **Privado** | Dinámico | Índice del curso |
| `/mi-cuenta/[curso]/[leccion]` | **Privado** | Dinámico | Reproductor |

Las páginas que dependen de la sesión declaran `dynamic = "force-dynamic"`.
Sin eso Next las prerenderiza durante el build (donde no hay variables de
Supabase) y en producción serviría HTML cacheado de un usuario a todos.

## Puesta en marcha

1. **Base de datos.** Ejecuta `supabase/courses.sql` en el SQL Editor,
   después de `supabase/schema.sql`.

2. **Autenticación.** En Supabase → Authentication → Providers, deja activo
   *Email*. En URL Configuration agrega el dominio del sitio a las *Redirect
   URLs* (`https://tudominio.com/acceso`).

3. **Catálogo.** Carga los cursos en las tablas `courses`, `course_modules` y
   `course_lessons` con los mismos `slug` que `lib/data/courses.ts`. El texto
   del catálogo se sigue leyendo del archivo; de la base salen los ids que
   enlazan inscripciones y progreso.

4. **Videos.** Súbelos al bucket privado `course-videos` respetando la
   convención de rutas:

   ```
   course-videos/<slug-del-curso>/<nombre-del-archivo>.mp4
   ```

   La primera carpeta **debe** ser el slug del curso: de ahí sale el permiso
   de lectura. Después registra cada video en `lesson_videos` con
   `video_url = 'course-videos/<slug>/<archivo>.mp4'`.

   También se acepta una URL externa completa (Mux, Vimeo) en `video_url`; en
   ese caso se usa tal cual.

## Modelo de acceso

Tres capas, ninguna depende de las otras:

1. **Middleware** (`middleware.ts`) redirige a `/acceso` cualquier petición a
   `/mi-cuenta/*` sin sesión.
2. **Layout del panel** vuelve a verificar la sesión en el servidor. El
   middleware no debe ser la única barrera.
3. **RLS en Postgres** es la que realmente protege: aunque alguien llamara a
   la API directamente, `lesson_videos`, `lesson_progress` y el bucket de
   storage exigen una inscripción con `status = 'active'`.

El temario es público a propósito (hay que poder verlo antes de comprar) y los
videos viven en una tabla aparte, `lesson_videos`. RLS es por fila y no por
columna: separar la tabla es lo que permite publicar el temario sin exponer
las URLs de video.

## Pagos y alta de cuenta

**El alumno paga primero y crea su cuenta después.** No se le pide registro
para comprar: esa fricción tira ventas.

### Flujo actual (sin pasarela contratada)

1. El visitante llena nombre, correo y teléfono en `/cursos/[slug]/comprar`.
   Se guarda una fila en `course_orders` con `status = 'pending_payment'`.
   **No hace falta cuenta.**
2. Se le muestran las instrucciones para pagar por transferencia y enviar el
   comprobante por WhatsApp.
3. Al confirmar el pago, dirección cambia esa orden a `status = 'paid'`:

   ```sql
   update public.course_orders
   set status = 'paid', paid_at = now()
   where id = '<order_id>';
   ```

4. Se le envía al alumno el enlace de `/acceso/registro` para que cree su
   contraseña **con el mismo correo de la compra**.
5. Al entrar a `/mi-cuenta`, la función `claim_paid_orders()` encuentra las
   órdenes pagadas de ese correo y las convierte en inscripciones activas.
   Es idempotente: se puede llamar tantas veces como haga falta.

### Por qué el correo debe estar confirmado

El vínculo entre pago y acceso es el correo. `claim_paid_orders()` sólo
reclama órdenes si `email_confirmed_at` no es nulo, de modo que alguien no
pueda registrarse con el correo ajeno y quedarse con una compra que no hizo.

**La confirmación de correo debe permanecer activada en Supabase Auth.** Si se
desactiva, esa protección desaparece.

### Qué no puede hacer un cliente

- Crear una orden ya pagada: la política RLS de `course_orders` sólo permite
  insertar con `status = 'pending_payment'`.
- Crear una inscripción activa: la de `enrollments` sólo permite
  `pending_payment` desde el cliente.
- Listar órdenes ajenas: sólo se leen las del correo del propio usuario.

### Cuando se contrate una pasarela

El punto de integración es el paso 3. Un webhook que corra con `service_role`
(que se salta RLS) marca la orden como pagada:

```sql
update public.course_orders
set status = 'paid',
    paid_at = now(),
    payment_provider = 'stripe',
    payment_reference = '<id del cargo>'
where id = '<order_id>';
```

No hace falta cambiar nada del front: el resto del flujo ya reacciona solo.

## Certificados de finalización

Al completar el 100% de las lecciones de un curso, el alumno ve una tarjeta de
descarga en su panel (tanto en `/mi-cuenta` como en `/mi-cuenta/[curso]`).

### Cómo se genera

- El PDF se dibuja con `pdf-lib` (vectorial) en `lib/certificates/pdf.ts` — no
  usa un navegador headless, así que no depende de empaquetar Chromium en la
  función serverless de Vercel.
- Las fuentes (Instrument Serif + Manrope) están incrustadas como archivos
  `.ttf` en `lib/certificates/fonts/`. Se les quitó la tabla `GSUB` a
  propósito: la ligadura "fi" del Google Fonts original se corrompe al
  incrustarse con `pdf-lib`/`fontkit` y deja un hueco en blanco en el texto
  ("Certifi cado" en vez de "Certificado"). Sin GSUB, "fi"/"fl" se
  dibujan como letras sueltas — ya verificado visualmente que se ven
  correctas.
- `next.config.mjs` declara `outputFileTracingIncludes` para el endpoint de
  descarga, para que Vercel empaquete esos `.ttf` en la función. Verificado
  en el build: aparecen en `route.js.nft.json`.

### Autenticidad

- Cada certificado tiene un folio (`GG-2026-XXXXXX`) generado por la función
  de Postgres `issue_certificate_if_completed`, que primero comprueba que el
  alumno de verdad completó el 100% de las lecciones — el cliente no puede
  fabricarse un certificado llamando a la Server Action con datos falsos.
- La emisión es idempotente: volver a "descargar" no crea un folio nuevo.
- Cualquiera puede verificar un folio en `/certificados/verificar` (enlazado
  desde el pie de página del sitio). La consulta pasa por la función
  `verify_certificate`, que sólo devuelve una fila si el folio coincide
  exactamente — no hay política pública que permita listar todos los
  certificados.

### Certificado de ejemplo (público)

`/api/certificado-ejemplo` devuelve un certificado de muestra, sin sesión. Se
usa en dos lugares: el botón "Ver certificado de ejemplo" de `/cursos` (para
que el interesado vea qué recibe antes de comprar) y la tarjeta del panel en
`/cursos/vista-previa`, que en modo maqueta abre este PDF en lugar de llamar a
la Server Action de emisión.

Se genera con el **mismo** código que el certificado real, así que no puede
desincronizarse del diseño que se entrega. No es válido y no lo aparenta: el
nombre es un marcador y el folio `GG-EJEMPLO` no existe en la base, de modo
que quien lo intente verificar recibe "no encontramos ese folio".

Dos decisiones que conviene no revertir sin querer:

- **Vive fuera de `/api/certificados/`.** Como hermana de `[codigo]/pdf`, el
  segmento dinámico la capturaba y respondía 401 aunque el build la listara
  como ruta propia.
- **Es `force-static`.** Generar el PDF cuesta ~77 ms de CPU; hacerlo por
  petición en un endpoint público sin autenticación es justo lo que no
  conviene dejar abierto. El precio es que la fecha de la muestra es la del
  despliegue, cosa que en un ejemplo da igual.

### Firma del certificado

El pie lleva el nombre del fundador impreso sobre la línea, no una firma
dibujada: inventar la rúbrica de una persona real en un documento que
certifica algo no es aceptable. Si dirección quiere que aparezca la firma
real, basta con colocar un PNG de fondo transparente en
`lib/certificates/assets/firma.png`; `drawSignatureImage()` la incrusta sola y,
si el archivo no está, el certificado se genera igual sin ella.

### Poner en marcha

Ejecutar `supabase/certificates.sql` en el SQL Editor, después de
`courses.sql`.
