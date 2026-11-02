import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";

/**
 * Every indexable page, once per locale. The blog routes are still off the
 * site, so they are deliberately absent.
 */
const ROUTES = [
  { path: "", priority: 1 },
  { path: "/learning", priority: 0.6 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${siteConfig.url}/${locale}${route.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    }))
  );
}
