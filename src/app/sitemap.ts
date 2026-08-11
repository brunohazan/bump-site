import type { MetadataRoute } from "next";
import { lineSlugs } from "@/lib/site-data";
import { SITE_URL } from "@/lib/structured-data";

const staticRoutes = [
  "", "/linhas", "/configurador", "/quem-somos", "/tecnologia", "/aplicacoes",
  "/como-comprar", "/resultados", "/faq", "/contato", "/politica-de-privacidade", "/termos-de-uso",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-11T12:00:00.000Z");
  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : route === "/configurador" ? 0.9 : 0.7,
    })),
    ...lineSlugs.map((slug) => ({
      url: `${SITE_URL}/linhas/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
