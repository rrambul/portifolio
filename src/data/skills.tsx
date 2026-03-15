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
  SiPrisma,
  SiSvelte,
  SiLit,
  SiFigma,
  SiVite,
  SiVitest,
  SiTestinglibrary,
  SiLinux,
} from "react-icons/si";
import { TbApi, TbAccessible, TbTestPipe } from "react-icons/tb";
import { VscSymbolInterface } from "react-icons/vsc";
import { MdSpeed } from "react-icons/md";
import { FaUniversalAccess } from "react-icons/fa";

export interface SkillItem {
  name: string;
  icon: React.ReactElement;
}

export interface SkillCategory {
  titleKey: string;
  radius: number;
  rotationSpeed: number;
  skills: (isDark: boolean) => SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    titleKey: "frontend",
    radius: 150,
    rotationSpeed: 0.002,
    skills: (isDark) => [
      { name: "React", icon: <SiReact className="h-8 w-8 text-[#61DAFB]" /> },
      {
        name: "Next.js",
        icon: <SiNextdotjs className={`h-8 w-8 ${isDark ? "text-white" : "text-black"}`} />,
      },
      { name: "TypeScript", icon: <SiTypescript className="h-8 w-8 text-[#3178C6]" /> },
      { name: "JavaScript", icon: <SiJavascript className="h-8 w-8 text-[#F7DF1E]" /> },
      { name: "Svelte", icon: <SiSvelte className="h-8 w-8 text-[#FF3E00]" /> },
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
    titleKey: "backend",
    radius: 120,
    rotationSpeed: -0.002,
    skills: (isDark) => [
      { name: "Node.js", icon: <SiNodedotjs className="h-8 w-8 text-[#339933]" /> },
      {
        name: "Express",
        icon: <SiExpress className={`h-8 w-8 ${isDark ? "text-white" : "text-black"}`} />,
      },
      { name: "PostgreSQL", icon: <SiPostgresql className="h-8 w-8 text-[#4169E1]" /> },
      { name: "MySQL", icon: <SiMysql className="h-8 w-8 text-[#4479A1]" /> },
      {
        name: "Prisma",
        icon: <SiPrisma className={`h-8 w-8 ${isDark ? "text-white" : "text-black"}`} />,
      },
      { name: "Firebase", icon: <SiFirebase className="h-8 w-8 text-[#FFCA28]" /> },
    ],
  },
  {
    titleKey: "testing",
    radius: 140,
    rotationSpeed: 0.0018,
    skills: (isDark) => [
      { name: "Jest", icon: <SiJest className="h-8 w-8 text-[#C21325]" /> },
      { name: "Testing Library", icon: <SiTestinglibrary className="h-8 w-8 text-[#E33332]" /> },
      { name: "Vitest", icon: <SiVitest className="h-8 w-8 text-[#729B1B]" /> },
      {
        name: "Cypress",
        icon: <SiCypress className={`h-8 w-8 ${isDark ? "text-white" : "text-black"}`} />,
      },
      {
        name: "Playwright",
        icon: <TbTestPipe className="h-8 w-8 text-black dark:text-[#2EAD33]" />,
      },
      {
        name: "Supertest",
        icon: <TbApi className="h-8 w-8 text-black dark:text-[#00B57B]" />,
      },
      {
        name: "Axe",
        icon: <TbAccessible className="h-8 w-8 text-black dark:text-[#00739D]" />,
      },
    ],
  },
  {
    titleKey: "devopsTools",
    radius: 160,
    rotationSpeed: -0.0015,
    skills: (isDark) => [
      { name: "Git", icon: <SiGit className="h-8 w-8 text-[#F05032]" /> },
      { name: "Docker", icon: <SiDocker className="h-8 w-8 text-[#2496ED]" /> },
      { name: "Figma", icon: <SiFigma className="h-8 w-8 text-[#F24E1E]" /> },
      { name: "Vite", icon: <SiVite className="h-8 w-8 text-[#646CFF]" /> },
      { name: "Linux", icon: <SiLinux className="h-8 w-8 text-[#FCC624]" /> },
      { name: "Storybook", icon: <SiStorybook className="h-8 w-8 text-[#FF4785]" /> },
      { name: "AWS", icon: <SiAmazon className="h-8 w-8 text-[#FF9900]" /> },
      {
        name: "Vercel",
        icon: <SiVercel className={`h-8 w-8 ${isDark ? "text-white" : "text-black"}`} />,
      },
    ],
  },
];
