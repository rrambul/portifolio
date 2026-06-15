export const siteConfig = {
  name: "Renan Rambul",
  title: "Renan Rambul | Software Engineer Portfolio",
  description:
    "Portfolio of Renan Rambul, a software engineer with 6+ years of experience building web products end to end, from APIs to fast, accessible interfaces.",
  url: "https://renanrambul.dev",
  ogImage: "/og-home.png",
  links: {
    github: "https://github.com/rrambul",
    linkedin: "https://www.linkedin.com/in/renan-rambul/",
    email: "renan.rambul@gmail.com",
    twitter: "@renanrambul",
  },
  locale: {
    default: "en",
    supported: ["en", "pt"] as const,
  },
} as const;
