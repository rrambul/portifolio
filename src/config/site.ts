import { locales } from "../../i18n.config";

export const siteConfig = {
  name: "Renan Rambul",
  title: "Renan Rambul | Software Engineer Portfolio",
  description:
    "Portfolio of Renan Rambul, a software engineer with 7+ years of experience building web products end to end, from APIs to fast, accessible interfaces.",
  url: "https://renanrambul.dev",
  links: {
    github: "https://github.com/rrambul",
    linkedin: "https://www.linkedin.com/in/renan-rambul/",
    email: "renanrambuls@gmail.com",
    twitter: "@renanrambul",
    x: "https://x.com/renanrambul",
  },
  // Default keywords meta (Google ignores it, but other engines still read it).
  // Single source so the layout and any page-level metadata stay in sync.
  keywords: [
    "Renan Rambul",
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
    default: "en",
    // Derived from the single i18n source so the two cannot drift.
    supported: locales,
  },
} as const;
