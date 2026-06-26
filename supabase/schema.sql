-- ============================================================
--  GREEN GIBB — Esquema de base de datos (Supabase / PostgreSQL)
--  Ejecuta este archivo en: Supabase Dashboard → SQL Editor.
-- ============================================================

-- Extensión para gen_random_uuid() (suele venir habilitada en Supabase).
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
--  TABLA: leads
-- ------------------------------------------------------------
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  phone        text not null,
  email        text,
  project_type text,
  budget_range text,
  location     text,
  message      text,
  source       text,
  status       text default 'new',
  created_at   timestamptz default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- ------------------------------------------------------------
--  TABLA: projects
-- ------------------------------------------------------------
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text unique not null,
  category    text not null,
  location    text,
  description text,
  challenge   text,
  solution    text,
  cover_image text,
  gallery     jsonb default '[]'::jsonb,
  services    jsonb default '[]'::jsonb,
  featured    boolean default false,
  created_at  timestamptz default now()
);

create index if not exists projects_slug_idx on public.projects (slug);
create index if not exists projects_category_idx on public.projects (category);
create index if not exists projects_featured_idx on public.projects (featured);

-- ------------------------------------------------------------
--  TABLA: products
-- ------------------------------------------------------------
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text unique not null,
  category    text not null,
  description text,
  price       numeric,
  images      jsonb default '[]'::jsonb,
  stock       integer default 0,
  featured    boolean default false,
  active      boolean default true,
  created_at  timestamptz default now()
);

create index if not exists products_slug_idx on public.products (slug);
create index if not exists products_category_idx on public.products (category);
create index if not exists products_active_idx on public.products (active);
create index if not exists products_featured_idx on public.products (featured);

-- ------------------------------------------------------------
--  TABLA: testimonials
-- ------------------------------------------------------------
create table if not exists public.testimonials (
  id           uuid primary key default gen_random_uuid(),
  client_name  text not null,
  project_type text,
  quote        text not null,
  rating       integer default 5,
  image        text,
  active       boolean default true,
  created_at   timestamptz default now()
);

create index if not exists testimonials_active_idx on public.testimonials (active);

-- ------------------------------------------------------------
--  TABLA: blog_posts
-- ------------------------------------------------------------
create table if not exists public.blog_posts (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text unique not null,
  excerpt     text,
  content     text,
  cover_image text,
  category    text,
  published   boolean default false,
  created_at  timestamptz default now()
);

create index if not exists blog_posts_slug_idx on public.blog_posts (slug);
create index if not exists blog_posts_published_idx on public.blog_posts (published);

-- ============================================================
--  ROW LEVEL SECURITY (RLS)
-- ============================================================
alter table public.leads        enable row level security;
alter table public.projects     enable row level security;
alter table public.products     enable row level security;
alter table public.testimonials enable row level security;
alter table public.blog_posts   enable row level security;

-- ---- LEADS --------------------------------------------------
-- Cualquiera (anon) puede INSERTAR un lead desde el formulario público.
-- NADIE público puede leer leads: solo el rol service_role (servidor) o
-- usuarios autenticados del panel admin.
drop policy if exists "leads_public_insert" on public.leads;
create policy "leads_public_insert"
  on public.leads for insert
  to anon, authenticated
  with check (true);

drop policy if exists "leads_auth_select" on public.leads;
create policy "leads_auth_select"
  on public.leads for select
  to authenticated
  using (true);

drop policy if exists "leads_auth_update" on public.leads;
create policy "leads_auth_update"
  on public.leads for update
  to authenticated
  using (true);

-- ---- CONTENIDO PÚBLICO (lectura abierta de lo publicado) -----
-- projects
drop policy if exists "projects_public_read" on public.projects;
create policy "projects_public_read"
  on public.projects for select
  to anon, authenticated
  using (true);

drop policy if exists "projects_auth_write" on public.projects;
create policy "projects_auth_write"
  on public.projects for all
  to authenticated
  using (true) with check (true);

-- products (solo activos para el público)
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
  on public.products for select
  to anon, authenticated
  using (active = true);

drop policy if exists "products_auth_write" on public.products;
create policy "products_auth_write"
  on public.products for all
  to authenticated
  using (true) with check (true);

-- testimonials (solo activos para el público)
drop policy if exists "testimonials_public_read" on public.testimonials;
create policy "testimonials_public_read"
  on public.testimonials for select
  to anon, authenticated
  using (active = true);

drop policy if exists "testimonials_auth_write" on public.testimonials;
create policy "testimonials_auth_write"
  on public.testimonials for all
  to authenticated
  using (true) with check (true);

-- blog_posts (solo publicados para el público)
drop policy if exists "blog_public_read" on public.blog_posts;
create policy "blog_public_read"
  on public.blog_posts for select
  to anon, authenticated
  using (published = true);

drop policy if exists "blog_auth_write" on public.blog_posts;
create policy "blog_auth_write"
  on public.blog_posts for all
  to authenticated
  using (true) with check (true);

-- ============================================================
--  STORAGE BUCKETS (imágenes)
--  Crea estos buckets como PÚBLICOS desde el Dashboard
--  (Storage → New bucket) o con el siguiente SQL:
-- ============================================================
insert into storage.buckets (id, name, public)
values
  ('projects', 'projects', true),
  ('products', 'products', true),
  ('blog',     'blog',     true),
  ('brand',    'brand',    true)
on conflict (id) do nothing;

-- Lectura pública de los buckets de imágenes.
drop policy if exists "public_images_read" on storage.objects;
create policy "public_images_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id in ('projects', 'products', 'blog', 'brand'));

-- Subida/edición de imágenes solo para usuarios autenticados (panel admin).
drop policy if exists "auth_images_write" on storage.objects;
create policy "auth_images_write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id in ('projects', 'products', 'blog', 'brand'));

drop policy if exists "auth_images_update" on storage.objects;
create policy "auth_images_update"
  on storage.objects for update
  to authenticated
  using (bucket_id in ('projects', 'products', 'blog', 'brand'));

drop policy if exists "auth_images_delete" on storage.objects;
create policy "auth_images_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id in ('projects', 'products', 'blog', 'brand'));
