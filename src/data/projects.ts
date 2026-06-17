export interface ProjectData {
  titleKey: string;
  descriptionKey: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  stars?: number;
  forks?: number;
  isContribution?: boolean;
}

export const projects: ProjectData[] = [
  {
    titleKey: "fortuna.title",
    descriptionKey: "fortuna.description",
    tags: ["AI", "Next.js", "NestJS", "Personal Finance", "Testing", "PWA", "i18n"],
    demoUrl: "https://fortuna.up.railway.app/",
  },
  {
    titleKey: "modularGameStore.title",
    descriptionKey: "modularGameStore.description",
    tags: ["TypeScript", "Rspack", "Module Federation", "Micro-frontends", "React"],
    githubUrl: "https://github.com/rrambul/modular-game-store",
    demoUrl:
      "https://renanrambuls-gmail-com-7-mgs-store-modular-game-s-cafcfd99c-ze.zephyrcloud.app/",
  },
  {
    titleKey: "marketPulse.title",
    descriptionKey: "marketPulse.description",
    tags: ["TypeScript", "Lit", "Lit Signals", "Rspack", "Module Federation"],
    githubUrl: "https://github.com/rrambul/market-pulse",
  },
  {
    titleKey: "animavita.title",
    descriptionKey: "animavita.description",
    tags: ["TypeScript", "React Native", "GraphQL", "MongoDB", "Open Source"],
    githubUrl: "https://github.com/animavita/animavita",
    stars: 739,
    forks: 318,
    isContribution: true,
  },
  {
    titleKey: "portfolio.title",
    descriptionKey: "portfolio.description",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "i18n"],
    githubUrl: "https://github.com/rrambul/portifolio",
    demoUrl: "https://renanrambul.dev",
  },
];
