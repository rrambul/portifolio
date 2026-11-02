import { locales, defaultLocale } from "@/i18n/config";

const name = "Renan Rambul";
const url = "https://renanrambul.dev";

/** The role, per locale. Under the name in the hero, the CV and the OG card. */
const role = {
  en: "Senior Software Engineer",
  pt: "Engenheiro de Software Sênior",
} as const;

/**
 * Identity, in one place. Prose lives in the message files; these are the
 * strings machines read (metadata, JSON-LD, the manifest, the OG card, the CV
 * header) and the few the pages print verbatim, so they cannot drift apart.
 */
export const siteConfig = {
  name,
  role,
  /** The `og:site_name` and the JSON-LD WebSite name. */
  siteName: `${name} Portfolio`,
  /** Default document title, for routes that do not set their own. */
  title: `${name} | ${role.en} Portfolio`,
  description:
    "Portfolio of Renan Rambul, a software engineer with 7+ years of experience building web products end to end, from APIs to fast, accessible interfaces.",
  url,
  /** The bare host, printed in the footer wordmark, the CV and the OG card. */
  host: new URL(url).host,
  links: {
    github: "https://github.com/rrambul",
    linkedin: "https://www.linkedin.com/in/renan-rambul/",
    email: "renanrambuls@gmail.com",
    twitter: "@renanrambul",
    x: "https://x.com/renanrambul",
  },
  // Default keywords meta (Google ignores it, but other engines still read it).
  keywords: [
    "Renan Rambul",
    "Senior Software Engineer",
    "Software Engineer",
    "Frontend Engineer",
    "Full-stack Developer",
    "React",
    "TypeScript",
    "Next.js",
    "JavaScript",
    "Web Development",
    "Portfolio",
    "Brazil",
  ],
  locale: {
    default: defaultLocale,
    // Derived from the single i18n source so the two cannot drift.
    supported: locales,
  },
} as const;
