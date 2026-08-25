export interface SkillCategory {
  /** Key under `skills` in the message files. */
  titleKey: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    titleKey: "frontend",
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
    titleKey: "ai",
    skills: [
      "Coding Agents",
      "Claude",
      "Cursor",
      "MCP",
      "Context Engineering",
    ],
  },
  {
    titleKey: "backend",
    skills: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MySQL", "Firebase"],
  },
  {
    titleKey: "testing",
    skills: ["Playwright", "Vitest", "Jest", "Testing Library", "Cypress", "Axe"],
  },
  {
    titleKey: "devopsTools",
    skills: ["Git", "Docker", "AWS", "Vercel", "Vite", "Storybook", "Figma", "Linux"],
  },
];
