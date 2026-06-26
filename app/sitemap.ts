import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { services } from "@/lib/data/services";
import { projects } from "@/lib/data/projects";
import { products } from "@/lib/data/products";
import { blogPosts } from "@/lib/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/servicios",
    "/portafolio",
    "/tienda",
    "/nosotros",
    "/blog",
    "/contacto",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${SITE_URL}/servicios/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${SITE_URL}/portafolio/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const productRoutes = products
    .filter((p) => p.active)
    .map((p) => ({
      url: `${SITE_URL}/tienda/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  const blogRoutes = blogPosts
    .filter((p) => p.published)
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...productRoutes, ...blogRoutes];
}
