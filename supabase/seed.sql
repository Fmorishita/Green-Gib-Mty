-- ============================================================
--  GREEN GIB — Datos semilla (opcional)
--  Ejecuta DESPUÉS de schema.sql.
--
--  Nota: las columnas *_image / images / gallery aceptan tanto URLs
--  reales (https://… o de tu bucket de Supabase Storage) como
--  "labels" de texto. El sitio genera un placeholder de marca para
--  cualquier valor que no sea una URL, de modo que la web se ve
--  completa incluso antes de subir fotografía real.
-- ============================================================

-- ---- TESTIMONIALS ------------------------------------------
insert into public.testimonials (client_name, project_type, quote, rating, active) values
  ('Mariana T.', 'Jardín residencial · San Pedro',
   'El equipo entendió perfecto lo que buscábamos. Pasamos de un jardín que no usábamos a tener el lugar favorito de la casa.', 5, true),
  ('Roberto G.', 'Muro verde · Restaurante',
   'El muro verde se volvió el sello de nuestro restaurante. Los clientes se toman fotos ahí todo el tiempo.', 5, true),
  ('Arq. Daniela M.', 'Aliado de paisajismo',
   'Como arquitecta valoro trabajar con alguien que entiende diseño, materiales y ejecución. Green Gib es mi aliado de confianza.', 5, true),
  ('Grupo Inmobiliario · García', 'Áreas verdes de desarrollo',
   'Cumplieron en tiempo y forma con un proyecto de gran escala. La presentación del acceso cambió por completo.', 5, true)
on conflict do nothing;

-- ---- PROJECTS ----------------------------------------------
insert into public.projects (title, slug, category, location, description, challenge, solution, cover_image, gallery, services, featured) values
  ('Jardín residencial en San Pedro', 'jardin-residencial-san-pedro', 'Residencial', 'San Pedro Garza García, N.L.',
   'Rediseño integral del jardín frontal y posterior de una residencia.',
   'Un jardín amplio pero sin diseño, con pasto en mal estado y poca sombra.',
   'Definimos zonas de estar, vegetación de bajo mantenimiento e iluminación arquitectónica.',
   'Jardín residencial San Pedro fachada',
   '["Jardín San Pedro zona de estar","Jardín San Pedro iluminación nocturna","Jardín San Pedro vegetación"]'::jsonb,
   '["Paisajismo residencial","Diseño de jardines","Decoración exterior"]'::jsonb,
   true),
  ('Muro verde para restaurante en Valle Oriente', 'muro-verde-restaurante-valle', 'Muros verdes', 'Valle Oriente, Monterrey',
   'Muro verde de doble altura en el acceso de un restaurante.',
   'El acceso era frío y poco memorable.',
   'Instalamos un muro verde de 5 metros con riego automatizado.',
   'Muro verde restaurante acceso',
   '["Muro verde restaurante detalle","Muro verde restaurante noche"]'::jsonb,
   '["Muros verdes","Decoración exterior"]'::jsonb,
   true),
  ('Rooftop de penthouse en Centrito Valle', 'rooftop-penthouse-centrito', 'Terrazas', 'Centrito Valle, Monterrey',
   'Transformación de una azotea vacía en una terraza de estar con jardín.',
   'Una azotea amplia, desaprovechada y expuesta al sol.',
   'Creamos zonas de estar, pérgola para sombra e iluminación cálida.',
   'Rooftop penthouse vista ciudad',
   '["Rooftop lounge con vegetación","Rooftop pérgola sombra"]'::jsonb,
   '["Terrazas, patios y rooftops","Decoración exterior"]'::jsonb,
   true)
on conflict (slug) do nothing;

-- ---- PRODUCTS ----------------------------------------------
insert into public.products (name, slug, category, description, price, images, stock, featured, active) values
  ('Maceta de terracota artesanal grande', 'maceta-terracota-grande', 'Macetas',
   'Maceta de terracota de gran formato, hecha a mano, con acabado natural.', 2490,
   '["Maceta terracota grande","Maceta terracota detalle"]'::jsonb, 8, true, true),
  ('Maceta de concreto minimalista', 'maceta-concreto-minimalista', 'Macetas',
   'Maceta de concreto pulido con líneas limpias y estética arquitectónica.', 1690,
   '["Maceta concreto minimalista"]'::jsonb, 15, true, true),
  ('Olivo europeo (mediano)', 'olivo-europeo-mediano', 'Plantas',
   'Olivo de hoja perenne, muy resistente al clima de Monterrey.', 3200,
   '["Olivo europeo mediano"]'::jsonb, 6, true, true),
  ('Jardinera de madera rectangular', 'jardinera-madera-rectangular', 'Jardineras',
   'Jardinera de madera tratada para exterior, con drenaje integrado.', 2890,
   '["Jardinera madera rectangular"]'::jsonb, 10, true, true),
  ('Lámpara solar de exterior', 'lampara-solar-exterior', 'Accesorios',
   'Lámpara de exterior con carga solar y luz cálida.', 790,
   '["Lámpara solar exterior"]'::jsonb, 35, true, true),
  ('Kit de hierbas aromáticas', 'kit-aromaticas-cocina', 'Kits',
   'Albahaca, romero, menta y tomillo listos para jardinera o cocina.', 540,
   '["Kit hierbas aromáticas"]'::jsonb, 30, true, true)
on conflict (slug) do nothing;

-- ---- BLOG POSTS --------------------------------------------
insert into public.blog_posts (title, slug, excerpt, content, cover_image, category, published) values
  ('Ideas de jardines modernos para casas en Monterrey', 'ideas-jardines-modernos-casas-monterrey',
   'Estilos, especies y soluciones de diseño que funcionan en el clima de Monterrey.',
   'El paisajismo moderno se apoya en líneas limpias y materiales nobles...',
   'Jardín moderno casa Monterrey', 'Diseño', true),
  ('Cómo elegir plantas para exterior en Monterrey', 'como-elegir-plantas-exterior-monterrey',
   'Guía práctica para elegir especies que sobreviven bajo el sol regiomontano.',
   'Elegir plantas para exterior en Monterrey es, sobre todo, una cuestión de clima...',
   'Plantas de exterior Monterrey', 'Guías', true),
  ('Beneficios de un muro verde para tu casa o negocio', 'beneficios-muro-verde-casa-negocio',
   'Un muro verde regula temperatura, reduce ruido y se vuelve un imán visual.',
   'Un muro verde es uno de los elementos de mayor impacto que puedes incorporar...',
   'Beneficios muro verde', 'Muros verdes', true)
on conflict (slug) do nothing;
