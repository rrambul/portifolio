export interface SkillCategory {
  /** Also the key under `skills` in the message files. */
  id: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Lit",
      "Web Components",
      "Tailwind CSS",
      "CSS",
      "HTML",
      "Accessibility",
      "Web Performance",
    ],
  },
  {
    id: "ai",
    skills: [
      "Coding Agents",
      "Claude",
      "Cursor",
      "MCP",
      "Context Engineering",
    ],
  },
  {
    id: "backend",
    skills: ["Node.js", "NestJS", "Express", "REST APIs", "PostgreSQL", "MySQL", "Firebase"],
  },
  {
    id: "testing",
    skills: ["Playwright", "Vitest", "Jest", "Testing Library", "Cypress", "Axe"],
  },
  {
    id: "devopsTools",
    skills: ["Git", "Docker", "AWS", "Vercel", "Vite", "Storybook", "Figma", "Linux"],
  },
];
