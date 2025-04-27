"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
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
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CircularCarousel } from "../ui/CircularCarousel";

// Dynamically import the particle component
const SkillsParticles = dynamic(() => import("../ui/SkillsParticles"), {
  ssr: false,
});

export function Skills() {
  const t = useTranslations("skills");
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDarkTheme = mounted && (theme === "dark" || resolvedTheme === "dark");

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Define skill sets
  const skillSets = [
    {
      title: t("frontend"),
      skills: [
        {
          name: "React",
          icon: <SiReact className="h-8 w-8 text-[#61DAFB]" />,
        },
        {
          name: "Next.js",
          icon: (
            <SiNextdotjs className="h-8 w-8 text-[#000000] dark:text-white" />
          ),
        },
        {
          name: "TypeScript",
          icon: <SiTypescript className="h-8 w-8 text-[#3178C6]" />,
        },
        {
          name: "JavaScript",
          icon: <SiJavascript className="h-8 w-8 text-[#F7DF1E]" />,
        },
        {
          name: "Svelte",
          icon: <SiSvelte className="h-8 w-8 text-[#FF3E00]" />,
        },
        {
          name: "Lit",
          icon: <SiLit className="h-8 w-8 text-[#324FFF]" />,
        },
        {
          name: "Web Components",
          icon: <VscSymbolInterface className="h-8 w-8 text-[#29ABE2]" />,
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss className="h-8 w-8 text-[#06B6D4]" />,
        },
        { name: "CSS", icon: <SiCss3 className="h-8 w-8 text-[#1572B6]" /> },
        { name: "HTML", icon: <SiHtml5 className="h-8 w-8 text-[#E34F26]" /> },
        {
          name: "Accessibility",
          icon: <FaUniversalAccess className="h-8 w-8 text-[#0072CE]" />,
        },
        {
          name: "Web Performance",
          icon: <MdSpeed className="h-8 w-8 text-[#FF6B00]" />,
        },
      ],
    },
    {
      title: t("backend"),
      skills: [
        {
          name: "Node.js",
          icon: <SiNodedotjs className="h-8 w-8 text-[#339933]" />,
        },
        {
          name: "Express",
          icon: (
            <SiExpress className="h-8 w-8 text-[#000000] dark:text-white" />
          ),
        },
        {
          name: "PostgreSQL",
          icon: <SiPostgresql className="h-8 w-8 text-[#4169E1]" />,
        },
        {
          name: "MySQL",
          icon: <SiMysql className="h-8 w-8 text-[#4479A1]" />,
        },
        {
          name: "Prisma",
          icon: isDarkTheme ? (
            <SiPrisma className="h-8 w-8 text-white" />
          ) : (
            <SiPrisma className="h-8 w-8 text-[#2D3748]" />
          ),
        },
        {
          name: "Firebase",
          icon: <SiFirebase className="h-8 w-8 text-[#FFCA28]" />,
        },
      ],
    },
    {
      title: t("testing"),
      skills: [
        {
          name: "Jest",
          icon: <SiJest className="h-8 w-8 text-[#C21325]" />,
        },
        {
          name: "Testing Library",
          icon: <SiTestinglibrary className="h-8 w-8 text-[#E33332]" />,
        },
        {
          name: "Vitest",
          icon: <SiVitest className="h-8 w-8 text-[#729B1B]" />,
        },
        {
          name: "Cypress",
          icon: isDarkTheme ? (
            <SiCypress className="h-8 w-8 text-white" />
          ) : (
            <SiCypress className="h-8 w-8 text-[#17202C]" />
          ),
        },
        {
          name: "Playwright",
          icon: <TbTestPipe className="h-8 w-8 text-[#2EAD33]" />,
        },
        {
          name: "Supertest",
          icon: <TbApi className="h-8 w-8 text-[#00B57B]" />,
        },
        {
          name: "Axe",
          icon: <TbAccessible className="h-8 w-8 text-[#00739D]" />,
        },
      ],
    },
    {
      title: t("devopsTools"),
      skills: [
        { name: "Git", icon: <SiGit className="h-8 w-8 text-[#F05032]" /> },
        {
          name: "Docker",
          icon: <SiDocker className="h-8 w-8 text-[#2496ED]" />,
        },
        {
          name: "Figma",
          icon: <SiFigma className="h-8 w-8 text-[#F24E1E]" />,
        },
        {
          name: "Vite",
          icon: <SiVite className="h-8 w-8 text-[#646CFF]" />,
        },
        {
          name: "Linux",
          icon: <SiLinux className="h-8 w-8 text-[#FCC624]" />,
        },
        {
          name: "Storybook",
          icon: <SiStorybook className="h-8 w-8 text-[#FF4785]" />,
        },
        {
          name: "AWS",
          icon: <SiAmazon className="h-8 w-8 text-[#FF9900]" />,
        },
        {
          name: "Vercel",
          icon: <SiVercel className="h-8 w-8 text-[#000000] dark:text-white" />,
        },
      ],
    },
  ];

  // Convert existing skills to carousel format with IDs
  const frontendSkills = skillSets[0].skills.map((skill, index) => ({
    id: index,
    name: skill.name,
    icon: skill.icon,
  }));

  const backendSkills = skillSets[1].skills.map((skill, index) => ({
    id: index,
    name: skill.name,
    icon: skill.icon,
  }));

  const testingSkills = skillSets[2].skills.map((skill, index) => ({
    id: index,
    name: skill.name,
    icon: skill.icon,
  }));

  const toolsSkills = skillSets[3].skills.map((skill, index) => ({
    id: index,
    name: skill.name,
    icon: skill.icon,
  }));

  return (
    <section
      id="skills"
      className="pt-20 bg-white dark:bg-zinc-900/30 relative overflow-hidden"
    >
      {/* Section-specific particles */}
      <div className="absolute inset-0 pointer-events-none">
        <SkillsParticles />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            variants={item}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            {t("title")}
          </motion.h2>

          <div>
            {/* Frontend Skills */}
            <motion.div variants={item}>
              <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 text-center">
                {t("frontend")}
              </h3>
              <CircularCarousel
                items={frontendSkills}
                radius={150}
                autoRotate={true}
                rotationSpeed={0.002}
              />
            </motion.div>

            {/* Backend Skills */}
            <motion.div variants={item}>
              <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 text-center">
                {t("backend")}
              </h3>
              <CircularCarousel
                items={backendSkills}
                radius={120}
                autoRotate={true}
                rotationSpeed={-0.002}
              />
            </motion.div>

            {/* Testing Skills */}
            <motion.div variants={item}>
              <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 text-center">
                {t("testing")}
              </h3>
              <CircularCarousel
                items={testingSkills}
                radius={140}
                autoRotate={true}
                rotationSpeed={0.0018}
              />
            </motion.div>

            {/* Tools Skills */}
            <motion.div variants={item}>
              <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 text-center">
                {t("devopsTools")}
              </h3>
              <CircularCarousel
                items={toolsSkills}
                radius={160}
                autoRotate={true}
                rotationSpeed={-0.0015}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
