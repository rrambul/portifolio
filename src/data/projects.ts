export interface ProjectData {
  /** Also the key under `projects` in the message files, with `.title` and `.description` beneath it. */
  id: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  stars?: number;
  isContribution?: boolean;
}

export const projects: ProjectData[] = [
  {
    id: "fortuna",
    tags: ["AI", "Next.js", "NestJS", "Personal Finance", "Testing", "PWA", "i18n"],
    demoUrl: "https://fortuna.up.railway.app/",
  },
  {
    id: "mindforge",
    tags: ["AI Agents", "TypeScript", "React", "NestJS", "Supabase", "Turborepo", "i18n"],
    githubUrl: "https://github.com/rrambul/mindforge",
  },
  {
    id: "modularGameStore",
    tags: ["TypeScript", "Rspack", "Module Federation", "Micro-frontends", "React"],
    githubUrl: "https://github.com/rrambul/modular-game-store",
    demoUrl:
      "https://renanrambuls-gmail-com-7-mgs-store-modular-game-s-cafcfd99c-ze.zephyrcloud.app/",
  },
  {
    id: "marketPulse",
    tags: ["TypeScript", "Lit", "Lit Signals", "Rspack", "Module Federation"],
    githubUrl: "https://github.com/rrambul/market-pulse",
  },
  {
    id: "animavita",
    tags: ["TypeScript", "React Native", "GraphQL", "MongoDB", "Open Source"],
    githubUrl: "https://github.com/animavita/animavita",
    stars: 739,
    isContribution: true,
  },
  {
    id: "portfolio",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "i18n"],
    githubUrl: "https://github.com/rrambul/portifolio",
    demoUrl: "https://renanrambul.dev",
  },
];
