import type React from "react";

export interface ProjectData {
  titleKey: string;
  descriptionKey: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  stars?: number;
  forks?: number;
  isContribution?: boolean;
  banner: {
    pattern: "grid" | "dots" | "waves" | "circuit";
    icon: string;
  };
  bannerStyle: React.CSSProperties;
}

export const projects: ProjectData[] = [
  {
    titleKey: "modularGameStore.title",
    descriptionKey: "modularGameStore.description",
    tags: ["TypeScript", "Rspack", "Module Federation", "Micro-frontends", "React"],
    githubUrl: "https://github.com/rrambul/modular-game-store",
    demoUrl:
      "https://renanrambuls-gmail-com-7-mgs-store-modular-game-s-cafcfd99c-ze.zephyrcloud.app/",
    banner: { pattern: "grid", icon: "🎮" },
    bannerStyle: { backgroundImage: "linear-gradient(135deg, #0f766e, #0d9488, #14b8a6)" },
  },
  {
    titleKey: "marketPulse.title",
    descriptionKey: "marketPulse.description",
    tags: ["TypeScript", "Lit", "Lit Signals", "Rspack", "Module Federation"],
    githubUrl: "https://github.com/rrambul/market-pulse",
    banner: { pattern: "waves", icon: "📈" },
    bannerStyle: { backgroundImage: "linear-gradient(135deg, #134e4a, #0f766e, #14b8a6)" },
  },
  {
    titleKey: "animavita.title",
    descriptionKey: "animavita.description",
    tags: ["TypeScript", "React Native", "GraphQL", "MongoDB", "Open Source"],
    githubUrl: "https://github.com/animavita/animavita",
    stars: 739,
    forks: 318,
    isContribution: true,
    banner: { pattern: "dots", icon: "🐶" },
    bannerStyle: { backgroundImage: "linear-gradient(135deg, #164e63, #0e7490, #06b6d4)" },
  },
  {
    titleKey: "portfolio.title",
    descriptionKey: "portfolio.description",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "i18n"],
    githubUrl: "https://github.com/rrambul/portifolio",
    demoUrl: "https://renanrambul.com",
    banner: { pattern: "circuit", icon: "💼" },
    bannerStyle: { backgroundImage: "linear-gradient(135deg, #0c4a6e, #0369a1, #0ea5e9)" },
  },
];
