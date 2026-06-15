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
  skills: (isDark: boolean) => SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    titleKey: "frontend",
    accent: "#0d9488",
    skills: (isDark) => [
      { name: "React", icon: <SiReact className="h-8 w-8 text-[#61DAFB]" /> },
      {
        name: "Next.js",
        icon: <SiNextdotjs className={`h-8 w-8 ${isDark ? "text-white" : "text-black"}`} />,
      },
      { name: "TypeScript", icon: <SiTypescript className="h-8 w-8 text-[#3178C6]" /> },
      { name: "JavaScript", icon: <SiJavascript className="h-8 w-8 text-[#F7DF1E]" /> },
      { name: "Lit", icon: <SiLit className="h-8 w-8 text-[#324FFF]" /> },
      {
        name: "Web Components",
        icon: <VscSymbolInterface className="h-8 w-8 text-black dark:text-[#29ABE2]" />,
      },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="h-8 w-8 text-[#06B6D4]" /> },
      { name: "CSS", icon: <SiCss3 className="h-8 w-8 text-[#1572B6]" /> },
      { name: "HTML", icon: <SiHtml5 className="h-8 w-8 text-[#E34F26]" /> },
      {
        name: "Accessibility",
        icon: <FaUniversalAccess className="h-8 w-8 text-black dark:text-[#0072CE]" />,
      },
      {
        name: "Web Performance",
        icon: <MdSpeed className="h-8 w-8 text-black dark:text-[#FF6B00]" />,
      },
    ],
  },
  {
    titleKey: "ai",
    accent: "#8b5cf6",
    skills: () => [
      { name: "Coding Agents", icon: <TbRobot className="h-8 w-8 text-[#8b5cf6]" /> },
      { name: "Claude", icon: <TbSparkles className="h-8 w-8 text-[#a78bfa]" /> },
      { name: "Cursor", icon: <TbPointer className="h-8 w-8 text-[#7c3aed]" /> },
      { name: "MCP", icon: <TbPlugConnected className="h-8 w-8 text-[#8b5cf6]" /> },
      { name: "Context Engineering", icon: <TbBrain className="h-8 w-8 text-[#a78bfa]" /> },
    ],
  },
  {
    titleKey: "backend",
    accent: "#14b8a6",
    skills: (isDark) => [
      { name: "Node.js", icon: <SiNodedotjs className="h-8 w-8 text-[#339933]" /> },
      {
        name: "Express",
        icon: <SiExpress className={`h-8 w-8 ${isDark ? "text-white" : "text-black"}`} />,
      },
      { name: "REST APIs", icon: <TbApi className="h-8 w-8 text-black dark:text-[#2dd4bf]" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="h-8 w-8 text-[#4169E1]" /> },
      { name: "MySQL", icon: <SiMysql className="h-8 w-8 text-[#4479A1]" /> },
      { name: "Firebase", icon: <SiFirebase className="h-8 w-8 text-[#FFCA28]" /> },
    ],
  },
  {
    titleKey: "testing",
    accent: "#0f766e",
    skills: (isDark) => [
      { name: "Playwright", icon: <TbTestPipe className="h-8 w-8 text-black dark:text-[#2EAD33]" /> },
      { name: "Vitest", icon: <SiVitest className="h-8 w-8 text-[#729B1B]" /> },
      { name: "Jest", icon: <SiJest className="h-8 w-8 text-[#C21325]" /> },
      { name: "Testing Library", icon: <SiTestinglibrary className="h-8 w-8 text-[#E33332]" /> },
      {
        name: "Cypress",
        icon: <SiCypress className={`h-8 w-8 ${isDark ? "text-white" : "text-black"}`} />,
      },
      { name: "Axe", icon: <TbAccessible className="h-8 w-8 text-black dark:text-[#00739D]" /> },
    ],
  },
  {
    titleKey: "devopsTools",
    accent: "#2dd4bf",
    skills: (isDark) => [
      { name: "Git", icon: <SiGit className="h-8 w-8 text-[#F05032]" /> },
      { name: "Docker", icon: <SiDocker className="h-8 w-8 text-[#2496ED]" /> },
      { name: "AWS", icon: <SiAmazon className="h-8 w-8 text-[#FF9900]" /> },
      {
        name: "Vercel",
        icon: <SiVercel className={`h-8 w-8 ${isDark ? "text-white" : "text-black"}`} />,
      },
      { name: "Vite", icon: <SiVite className="h-8 w-8 text-[#646CFF]" /> },
      { name: "Storybook", icon: <SiStorybook className="h-8 w-8 text-[#FF4785]" /> },
      { name: "Figma", icon: <SiFigma className="h-8 w-8 text-[#F24E1E]" /> },
      { name: "Linux", icon: <SiLinux className="h-8 w-8 text-[#FCC624]" /> },
    ],
  },
];
