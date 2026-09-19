-- ===========================================================================
--  Green Gib — Plataforma de cursos
--  Ejecutar en el SQL Editor de Supabase DESPUÉS de schema.sql.
--
--  Modelo de acceso:
--    · El catálogo (courses, course_modules, course_lessons) es de lectura
--      pública: el temario tiene que verse antes de comprar.
--    · Los VIDEOS viven en una tabla aparte (lesson_videos) cuya política RLS
--      exige una inscripción activa. Así el temario es público sin que la URL
--      del video quede expuesta. RLS es por fila, no por columna: separar la
--      tabla es lo que permite proteger sólo el video.
-- ===========================================================================

-- ---------------------------------------------------------------------------
--  Perfiles (extiende auth.users)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  phone       text,
  company     text,
  created_at  timestamptz not null default now()
);

-- Crea el perfil automáticamente al registrarse.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    nullif(new.raw_user_meta_data ->> 'phone', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
--  Catálogo
-- ---------------------------------------------------------------------------
create table if not exists public.courses (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  title             text not null,
  subtitle          text,
  description       text,
  level             text,
  price             numeric(10,2) not null default 0,
  compare_at_price  numeric(10,2),
  duration_minutes  integer not null default 0,
  lesson_count      integer not null default 0,
  cover             text,
  outcomes          text[] not null default '{}',
  for_whom          text[] not null default '{}',
  requirements      text[] not null default '{}',
  includes          text[] not null default '{}',
  featured          boolean not null default false,
  published         boolean not null default false,
  sort_order        integer not null default 0,
  created_at        timestamptz not null default now()
);

create index if not exists courses_slug_idx on public.courses (slug);
create index if not exists courses_published_idx on public.courses (published);

create table if not exists public.course_modules (
  id          uuid primary key default gen_random_uuid(),
  course_id   uuid not null references public.courses (id) on delete cascade,
  title       text not null,
  position    integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists course_modules_course_idx on public.course_modules (course_id, position);

create table if not exists public.course_lessons (
  id                uuid primary key default gen_random_uuid(),
  module_id         uuid not null references public.course_modules (id) on delete cascade,
  course_id         uuid not null references public.courses (id) on delete cascade,
  slug              text not null,
  title             text not null,
  description       text,
  duration_minutes  integer not null default 0,
  position          integer not null default 0,
  is_preview        boolean not null default false,
  resource_url      text,
  created_at        timestamptz not null default now(),
  unique (course_id, slug)
);

create index if not exists course_lessons_course_idx on public.course_lessons (course_id, position);

-- Videos: tabla separada precisamente para poder protegerlos.
create table if not exists public.lesson_videos (
  lesson_id   uuid primary key references public.course_lessons (id) on delete cascade,
  provider    text not null default 'mux',
  video_url   text not null,
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
--  Inscripciones y progreso
-- ---------------------------------------------------------------------------
create table if not exists public.enrollments (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users (id) on delete cascade,
  course_id          uuid not null references public.courses (id) on delete cascade,
  status             text not null default 'pending_payment'
                     check (status in ('pending_payment','active','expired','cancelled')),
  price_paid         numeric(10,2),
  payment_provider   text,
  payment_reference  text,
  granted_at         timestamptz,
  expires_at         timestamptz,
  created_at         timestamptz not null default now(),
  unique (user_id, course_id)
);

create index if not exists enrollments_user_idx on public.enrollments (user_id, status);
create index if not exists enrollments_course_idx on public.enrollments (course_id);

create table if not exists public.lesson_progress (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid not null references auth.users (id) on delete cascade,
  lesson_id              uuid not null references public.course_lessons (id) on delete cascade,
  course_id              uuid not null references public.courses (id) on delete cascade,
  completed              boolean not null default false,
  completed_at           timestamptz,
  last_position_seconds  integer not null default 0,
  updated_at             timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create index if not exists lesson_progress_user_course_idx on public.lesson_progress (user_id, course_id);

-- ---------------------------------------------------------------------------
--  Helper: ¿el usuario tiene acceso activo a este curso?
--  SECURITY DEFINER para que la política de lesson_videos pueda consultar
--  enrollments sin quedar atrapada en la RLS de esa misma tabla.
-- ---------------------------------------------------------------------------
create or replace function public.has_course_access(target_course uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.enrollments e
    where e.user_id = auth.uid()
      and e.course_id = target_course
      and e.status = 'active'
      and (e.expires_at is null or e.expires_at > now())
  );
$$;

-- ---------------------------------------------------------------------------
--  Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles        enable row level security;
alter table public.courses         enable row level security;
alter table public.course_modules  enable row level security;
alter table public.course_lessons  enable row level security;
alter table public.lesson_videos   enable row level security;
alter table public.enrollments     enable row level security;
alter table public.lesson_progress enable row level security;

-- Perfiles: cada quien el suyo.
drop policy if exists "profiles_own_read" on public.profiles;
create policy "profiles_own_read" on public.profiles
  for select to authenticated using (id = auth.uid());

drop policy if exists "profiles_own_update" on public.profiles;
create policy "profiles_own_update" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Catálogo: lectura pública de lo publicado.
drop policy if exists "courses_public_read" on public.courses;
create policy "courses_public_read" on public.courses
  for select to anon, authenticated using (published = true);

drop policy if exists "modules_public_read" on public.course_modules;
create policy "modules_public_read" on public.course_modules
  for select to anon, authenticated
  using (exists (select 1 from public.courses c where c.id = course_id and c.published));

drop policy if exists "lessons_public_read" on public.course_lessons;
create policy "lessons_public_read" on public.course_lessons
  for select to anon, authenticated
  using (exists (select 1 from public.courses c where c.id = course_id and c.published));

-- Videos: sólo lecciones de muestra, o con inscripción activa.
drop policy if exists "videos_preview_or_enrolled" on public.lesson_videos;
create policy "videos_preview_or_enrolled" on public.lesson_videos
  for select to anon, authenticated
  using (
    exists (
      select 1 from public.course_lessons l
      where l.id = lesson_id
        and (l.is_preview = true or public.has_course_access(l.course_id))
    )
  );

-- Inscripciones: cada usuario ve y crea las suyas.
drop policy if exists "enrollments_own_read" on public.enrollments;
create policy "enrollments_own_read" on public.enrollments
  for select to authenticated using (user_id = auth.uid());

-- El alta se permite SÓLO como pendiente de pago: activar es tarea del
-- webhook de la pasarela (service_role), nunca del cliente.
drop policy if exists "enrollments_own_insert" on public.enrollments;
create policy "enrollments_own_insert" on public.enrollments
  for insert to authenticated
  with check (user_id = auth.uid() and status = 'pending_payment');

-- Progreso: cada usuario el suyo, y sólo con acceso activo.
drop policy if exists "progress_own_read" on public.lesson_progress;
create policy "progress_own_read" on public.lesson_progress
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "progress_own_insert" on public.lesson_progress;
create policy "progress_own_insert" on public.lesson_progress
  for insert to authenticated
  with check (user_id = auth.uid() and public.has_course_access(course_id));

drop policy if exists "progress_own_update" on public.lesson_progress;
create policy "progress_own_update" on public.lesson_progress
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid() and public.has_course_access(course_id));

-- ---------------------------------------------------------------------------
--  Storage: bucket PRIVADO para los videos
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('course-videos', 'course-videos', false)
on conflict (id) do nothing;

-- CONVENCIÓN DE RUTAS: course-videos/<slug-del-curso>/<archivo>
-- La primera carpeta debe ser el slug del curso; de ahí sale el permiso.
--
-- Lectura: sólo quien tenga inscripción ACTIVA en ese curso. Sin esto,
-- cualquier usuario registrado podría descargar los videos de cursos que no
-- compró pidiendo una URL firmada.
drop policy if exists "course_videos_admin_write" on storage.objects;
drop policy if exists "course_videos_read_enrolled" on storage.objects;
create policy "course_videos_read_enrolled" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'course-videos'
    and exists (
      select 1
      from public.enrollments e
      join public.courses c on c.id = e.course_id
      where e.user_id = auth.uid()
        and e.status = 'active'
        and (e.expires_at is null or e.expires_at > now())
        and c.slug = (storage.foldername(name))[1]
    )
  );

-- La subida de videos NO se hace desde la app: se hace desde el panel de
-- Supabase o con service_role, que se salta RLS. Por eso aquí no se otorga
-- ningún permiso de escritura a los usuarios autenticados.
