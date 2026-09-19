-- ===========================================================================
--  Green Gib — Certificados de finalización
--  Ejecutar en el SQL Editor de Supabase DESPUÉS de courses.sql.
--
--  Un certificado se emite la primera vez que el alumno completa el 100% de
--  las lecciones de un curso. El folio es estable: volver a descargarlo
--  siempre da el mismo documento, con la misma fecha de emisión.
-- ===========================================================================

create table if not exists public.course_certificates (
  id             uuid primary key default gen_random_uuid(),
  -- Folio corto y legible para mostrar en el PDF y verificar en la web.
  -- Formato: GG-2026-A3F9K2 (prefijo, año, 6 caracteres al azar).
  code           text unique not null,
  user_id        uuid not null references auth.users (id) on delete cascade,
  course_id      uuid not null references public.courses (id) on delete restrict,
  -- Copiado al momento de emitir: si el alumno cambia su nombre de perfil
  -- después, el certificado ya emitido no debe cambiar retroactivamente.
  recipient_name text not null,
  issued_at      timestamptz not null default now(),
  unique (user_id, course_id)
);

create index if not exists course_certificates_code_idx on public.course_certificates (code);
create index if not exists course_certificates_user_idx on public.course_certificates (user_id);

alter table public.course_certificates enable row level security;

-- Cada alumno ve únicamente sus propios certificados. No hay política de
-- INSERT/UPDATE para authenticated ni anon: emitir un certificado es un
-- efecto de la función de abajo (SECURITY DEFINER), nunca una escritura
-- directa del cliente. Así nadie puede otorgarse un certificado sin haber
-- completado el curso de verdad.
drop policy if exists "certificates_own_read" on public.course_certificates;
create policy "certificates_own_read" on public.course_certificates
  for select to authenticated
  using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
--  Emisión: crea el certificado si el alumno ya completó el 100% del curso.
--  Idempotente — si ya existe, sólo lo devuelve.
-- ---------------------------------------------------------------------------
create or replace function public.issue_certificate_if_completed(target_course_slug text)
returns table (code text, recipient_name text, issued_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  uid          uuid := auth.uid();
  cid          uuid;
  total        integer;
  done         integer;
  uname        text;
  new_code     text;
begin
  if uid is null then
    raise exception 'Se requiere sesión iniciada.';
  end if;

  select c.id into cid from public.courses c where c.slug = target_course_slug;
  if cid is null then
    raise exception 'El curso no existe.';
  end if;

  -- ¿Tiene acceso activo?
  if not public.has_course_access(cid) then
    raise exception 'No tienes acceso activo a este curso.';
  end if;

  select count(*) into total from public.course_lessons l where l.course_id = cid;
  select count(*) into done
    from public.lesson_progress p
    where p.user_id = uid and p.course_id = cid and p.completed = true;

  if total = 0 or done < total then
    raise exception 'El curso todavía no está completo (% de % lecciones).', done, total;
  end if;

  -- Ya emitido: devolver el existente, no crear otro.
  return query
    select ct.code, ct.recipient_name, ct.issued_at
    from public.course_certificates ct
    where ct.user_id = uid and ct.course_id = cid;
  if found then
    return;
  end if;

  select coalesce(nullif(u.raw_user_meta_data ->> 'full_name', ''), split_part(u.email, '@', 1))
    into uname
  from auth.users u
  where u.id = uid;

  new_code := 'GG-' || to_char(now(), 'YYYY') || '-' ||
              upper(substr(md5(gen_random_uuid()::text), 1, 6));

  insert into public.course_certificates (code, user_id, course_id, recipient_name)
  values (new_code, uid, cid, uname);

  return query
    select ct.code, ct.recipient_name, ct.issued_at
    from public.course_certificates ct
    where ct.code = new_code;
end;
$$;

revoke all on function public.issue_certificate_if_completed(text) from public;
grant execute on function public.issue_certificate_if_completed(text) to authenticated;

-- ---------------------------------------------------------------------------
--  Verificación pública: cualquiera con el folio puede confirmar que es
--  auténtico. No expone user_id ni ningún dato más allá de lo necesario
--  para validar el documento frente a un tercero (p. ej. un cliente del
--  alumno que quiere comprobar la certificación).
--
--  Es una función y no una política pública sobre la tabla a propósito:
--  una política "using (true)" permitiría listar TODOS los certificados sin
--  conocer un folio. La función sólo devuelve una fila cuando el folio
--  exacto coincide.
-- ---------------------------------------------------------------------------
create or replace function public.verify_certificate(input_code text)
returns table (
  code text,
  recipient_name text,
  course_title text,
  issued_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select ct.code, ct.recipient_name, c.title, ct.issued_at
  from public.course_certificates ct
  join public.courses c on c.id = ct.course_id
  where ct.code = upper(trim(input_code));
$$;

revoke all on function public.verify_certificate(text) from public;
grant execute on function public.verify_certificate(text) to anon, authenticated;
