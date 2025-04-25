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
  SiMongodb,
  SiRedis,
  SiFirebase,
  SiAmazon,
} from "react-icons/si";

// Dynamically import the particle component
const SkillsParticles = dynamic(() => import("../ui/SkillsParticles"), {
  ssr: false,
});

export function Skills() {
  const t = useTranslations("skills");

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
          icon: <SiNextdotjs className="h-8 w-8" />,
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
          name: "Tailwind CSS",
          icon: <SiTailwindcss className="h-8 w-8 text-[#06B6D4]" />,
        },
        { name: "CSS", icon: <SiCss3 className="h-8 w-8 text-[#1572B6]" /> },
        { name: "HTML", icon: <SiHtml5 className="h-8 w-8 text-[#E34F26]" /> },
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
          icon: <SiExpress className="h-8 w-8" />,
        },
        {
          name: "PostgreSQL",
          icon: <SiPostgresql className="h-8 w-8 text-[#4169E1]" />,
        },
        {
          name: "MongoDB",
          icon: <SiMongodb className="h-8 w-8 text-[#47A248]" />,
        },
        { name: "Redis", icon: <SiRedis className="h-8 w-8 text-[#DC382D]" /> },
        {
          name: "Firebase",
          icon: <SiFirebase className="h-8 w-8 text-[#FFCA28]" />,
        },
      ],
    },
    {
      title: t("tools"),
      skills: [
        { name: "Git", icon: <SiGit className="h-8 w-8 text-[#F05032]" /> },
        {
          name: "Docker",
          icon: <SiDocker className="h-8 w-8 text-[#2496ED]" />,
        },
        {
          name: "AWS",
          icon: <SiAmazon className="h-8 w-8 text-[#FF9900]" />,
        },
        { name: "Vercel", icon: <SiVercel className="h-8 w-8" /> },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="py-20 bg-white dark:bg-zinc-900/30 relative overflow-hidden"
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
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={item}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            {t("title")}
          </motion.h2>

          <div className="space-y-16">
            {skillSets.map((skillSet, idx) => (
              <motion.div key={idx} variants={item}>
                <h3 className="text-2xl font-semibold mb-6 text-purple-600 dark:text-purple-400">
                  {skillSet.title}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                  {skillSet.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skillIdx}
                      className="skills-card flex flex-col items-center p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md border border-gray-200 dark:border-zinc-700"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      {skill.icon}
                      <span className="mt-2 text-sm font-medium">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
