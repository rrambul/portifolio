export const siteConfig = {
  name: "Renan Rambul",
  title: "Renan Rambul | Software Developer Portfolio",
  description:
    "Portfolio of Renan Rambul, a passionate software developer with 6+ years of experience in building modern web applications and solving complex problems.",
  url: "https://renanrambul.com",
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
