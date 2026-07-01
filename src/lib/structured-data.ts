import { siteConfig } from "@/config/site";

/**
 * Pure builders for the JSON-LD structured data injected into the document
 * head (see src/app/[locale]/layout.tsx). Kept side-effect free so they can be
 * unit tested and so the two schemas have a single source of truth.
 */

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "jobTitle": "Software Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Translational Analytics & Statistics",
    },
    "description": siteConfig.description,
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Web Development",
      "Frontend Development",
      "Software Architecture",
    ],
    "sameAs": [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.x,
    ] as string[],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR",
    },
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `${siteConfig.name} Portfolio`,
    "url": siteConfig.url,
    "description": siteConfig.description,
    "author": {
      "@type": "Person",
      "name": siteConfig.name,
    },
    "inLanguage": siteConfig.locale.supported,
  };
}
