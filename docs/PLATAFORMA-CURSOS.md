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

## Pagos

**No hay pasarela conectada todavía.** El flujo actual:

1. El alumno confirma la compra → se crea la inscripción en
   `status = 'pending_payment'`.
2. Se le muestran las instrucciones para pagar por transferencia y enviar el
   comprobante por WhatsApp.
3. Dirección cambia el `status` a `'active'` en Supabase al confirmar el pago.

La política RLS de `enrollments` sólo permite insertar con
`status = 'pending_payment'`: **un cliente no puede activarse el acceso solo**,
ni llamando a la API directamente.

### Cuando se contrate una pasarela

El punto de integración es el paso 3. Un webhook que corra con `service_role`
(que se salta RLS) actualiza la inscripción:

```sql
update public.enrollments
set status = 'active',
    granted_at = now(),
    payment_provider = 'stripe',
    payment_reference = '<id del cargo>'
where id = '<enrollment_id>';
```

No hace falta cambiar nada del front: el panel ya reacciona al `status`.
