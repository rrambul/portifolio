import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Web app manifest, generated from siteConfig so the install name/description
 * cannot drift from the rest of the site. Only references assets that exist.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} - Software Engineer Portfolio`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f10",
    theme_color: "#10b981",
    categories: ["portfolio", "developer", "technology"],
    lang: siteConfig.locale.default,
    dir: "ltr",
    icons: [
      {
        src: "/favicon/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
