import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiGit,
  SiDocker,
  SiVercel,
  SiTailwindcss,
  SiCss3,
  SiHtml5,
  SiExpress,
  SiPostgresql,
  SiFirebase,
  SiAmazon,
  SiStorybook,
  SiCypress,
  SiJest,
  SiMysql,
  SiLit,
  SiFigma,
  SiVite,
  SiVitest,
  SiTestinglibrary,
  SiLinux,
} from "react-icons/si";
import { TbApi, TbAccessible, TbTestPipe, TbRobot, TbSparkles, TbBrain, TbPlugConnected, TbPointer } from "react-icons/tb";
import { VscSymbolInterface } from "react-icons/vsc";
import { MdSpeed } from "react-icons/md";
import { FaUniversalAccess } from "react-icons/fa";

export interface SkillItem {
  name: string;
  icon: React.ReactElement;
}

export interface SkillCategory {
  /** Key under `skills` in the message files. */
  titleKey: string;
  /** Accent color for the category's bento cell. */
  accent: string;
  skills: SkillItem[];
}

// Monochrome icons: one tonal scheme (neutral, amber for AI) so the grid reads
// as part of the terminal palette instead of a rainbow of brand colors.
const ICON = "h-8 w-8 text-zinc-700 dark:text-zinc-300";
const AI_ICON = "h-8 w-8 text-amber-600 dark:text-amber-400";

export const skillCategories: SkillCategory[] = [
  {
    titleKey: "frontend",
    accent: "#10b981",
    skills: [
      { name: "React", icon: <SiReact className={ICON} /> },
      { name: "Next.js", icon: <SiNextdotjs className={ICON} /> },
      { name: "TypeScript", icon: <SiTypescript className={ICON} /> },
      { name: "JavaScript", icon: <SiJavascript className={ICON} /> },
      { name: "Lit", icon: <SiLit className={ICON} /> },
      { name: "Web Components", icon: <VscSymbolInterface className={ICON} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className={ICON} /> },
      { name: "CSS", icon: <SiCss3 className={ICON} /> },
      { name: "HTML", icon: <SiHtml5 className={ICON} /> },
      { name: "Accessibility", icon: <FaUniversalAccess className={ICON} /> },
      { name: "Web Performance", icon: <MdSpeed className={ICON} /> },
    ],
  },
  {
    titleKey: "ai",
    accent: "#f59e0b",
    skills: [
      { name: "Coding Agents", icon: <TbRobot className={AI_ICON} /> },
      { name: "Claude", icon: <TbSparkles className={AI_ICON} /> },
      { name: "Cursor", icon: <TbPointer className={AI_ICON} /> },
      { name: "MCP", icon: <TbPlugConnected className={AI_ICON} /> },
      { name: "Context Engineering", icon: <TbBrain className={AI_ICON} /> },
    ],
  },
  {
    titleKey: "backend",
    accent: "#10b981",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs className={ICON} /> },
      { name: "Express", icon: <SiExpress className={ICON} /> },
      { name: "REST APIs", icon: <TbApi className={ICON} /> },
      { name: "PostgreSQL", icon: <SiPostgresql className={ICON} /> },
      { name: "MySQL", icon: <SiMysql className={ICON} /> },
      { name: "Firebase", icon: <SiFirebase className={ICON} /> },
    ],
  },
  {
    titleKey: "testing",
    accent: "#059669",
    skills: [
      { name: "Playwright", icon: <TbTestPipe className={ICON} /> },
      { name: "Vitest", icon: <SiVitest className={ICON} /> },
      { name: "Jest", icon: <SiJest className={ICON} /> },
      { name: "Testing Library", icon: <SiTestinglibrary className={ICON} /> },
      { name: "Cypress", icon: <SiCypress className={ICON} /> },
      { name: "Axe", icon: <TbAccessible className={ICON} /> },
    ],
  },
  {
    titleKey: "devopsTools",
    accent: "#34d399",
    skills: [
      { name: "Git", icon: <SiGit className={ICON} /> },
      { name: "Docker", icon: <SiDocker className={ICON} /> },
      { name: "AWS", icon: <SiAmazon className={ICON} /> },
      { name: "Vercel", icon: <SiVercel className={ICON} /> },
      { name: "Vite", icon: <SiVite className={ICON} /> },
      { name: "Storybook", icon: <SiStorybook className={ICON} /> },
      { name: "Figma", icon: <SiFigma className={ICON} /> },
      { name: "Linux", icon: <SiLinux className={ICON} /> },
    ],
  },
];
