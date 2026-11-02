import { siteConfig } from "@/config/site";
import { experiences } from "@/data/experiences";
import { education } from "@/data/education";

/**
 * Pure builders for the JSON-LD structured data injected into the document
 * head (see src/app/[locale]/layout.tsx). Side-effect free so they can be unit
 * tested, and read from the same data the pages render so the employer and
 * the school can never lag behind the visible copy.
 */

export function buildPersonJsonLd() {
  const current = experiences.find((exp) => exp.current);
  // Alumni of a finished program only: a program still running is not one
  // the person graduated from yet.
  const school = education.find((entry) => entry.status !== "in-progress");

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "jobTitle": siteConfig.role.en,
    ...(current
      ? { worksFor: { "@type": "Organization", name: current.company } }
      : {}),
    "description": siteConfig.description,
    ...(school
      ? {
          alumniOf: {
            "@type": "EducationalOrganization",
            name: school.institution,
          },
        }
      : {}),
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
    "name": siteConfig.siteName,
    "url": siteConfig.url,
    "description": siteConfig.description,
    "author": {
      "@type": "Person",
      "name": siteConfig.name,
    },
    "inLanguage": siteConfig.locale.supported,
  };
}
