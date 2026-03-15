"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CircularCarousel } from "../ui/CircularCarousel";
import { skillCategories } from "@/data/skills";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const SkillsParticles = dynamic(() => import("../ui/SkillsParticles"), {
  ssr: false,
});

export function Skills() {
  const t = useTranslations("skills");
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDarkTheme = mounted && (theme === "dark" || resolvedTheme === "dark");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="skills"
      className="pt-20 pb-10 bg-white dark:bg-zinc-900/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <SkillsParticles />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            {t("title")}
          </motion.h2>

          <div>
            {skillCategories.map((category) => {
              const items = category.skills(isDarkTheme).map((skill, i) => ({
                id: i,
                name: skill.name,
                icon: skill.icon,
              }));

              return (
                <motion.div key={category.titleKey} variants={fadeInUp}>
                  <h3 className="text-2xl font-semibold text-black dark:text-teal-400 text-center">
                    {t(category.titleKey)}
                  </h3>
                  <CircularCarousel
                    items={items}
                    radius={category.radius}
                    autoRotate={true}
                    rotationSpeed={category.rotationSpeed}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
