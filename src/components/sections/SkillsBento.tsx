"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { m } from "framer-motion";
import { FiCpu, FiUsers } from "react-icons/fi";
import { skillCategories, type SkillCategory } from "@/data/skills";
import { staggerContainer, fadeInUp, cardHover } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** A category's skills as a grid of labeled icon tiles. */
function SkillTiles({ category, isDark }: { category: SkillCategory; isDark: boolean }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-4">
      {category.skills(isDark).map((skill) => (
        <div key={skill.name} className="flex flex-col items-center gap-1.5 w-16">
          {/* Icons are decorative; the label below is the accessible name. */}
          <div className="flex h-8 items-center justify-center" aria-hidden="true">
            {skill.icon}
          </div>
          <span className="text-[11px] leading-tight text-center text-zinc-600 dark:text-zinc-400">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  );
}

function CategoryCell({
  category,
  title,
  className = "",
}: {
  category: SkillCategory;
  title: string;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <m.div
      variants={fadeInUp}
      whileHover={cardHover}
      className={`rounded-2xl border border-zinc-200 dark:border-zinc-700/60 bg-white dark:bg-zinc-800/60 p-5 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: category.accent }}
          aria-hidden="true"
        />
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-800 dark:text-zinc-200">
          {title}
        </h3>
      </div>
      <SkillTiles category={category} isDark={isDark} />
    </m.div>
  );
}

export function SkillsBento() {
  const t = useTranslations("skills");

  const byKey = (key: string) =>
    skillCategories.find((c) => c.titleKey === key) as SkillCategory;

  return (
    <section id="skills" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <SectionHeading
            icon={<FiCpu className="text-teal-700 dark:text-teal-400 h-8 w-8" />}
            title={t("title")}
            subtitle={t("subtitle")}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
            <CategoryCell category={byKey("frontend")} title={t("frontend")} className="md:col-span-2" />

            {/* AI cell carries the violet secondary accent + a soft glow */}
            <CategoryCell
              category={byKey("ai")}
              title={t("ai")}
              className="ring-1 ring-violet-300/60 dark:ring-violet-500/30 bg-violet-50/40 dark:bg-violet-500/[0.06]"
            />

            <CategoryCell category={byKey("backend")} title={t("backend")} />
            <CategoryCell category={byKey("testing")} title={t("testing")} />
            <CategoryCell category={byKey("devopsTools")} title={t("devopsTools")} />

            {/* Highlight stats */}
            <m.div
              variants={fadeInUp}
              whileHover={cardHover}
              className="md:col-span-2 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-teal-600 to-violet-600 text-white flex items-center justify-around gap-4"
            >
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold">6+</div>
                <div className="text-sm text-white/80 mt-1 max-w-[10rem]">{t("stats.years")}</div>
              </div>
              <div className="w-px self-stretch bg-white/20" aria-hidden="true" />
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold">100+</div>
                <div className="text-sm text-white/80 mt-1 max-w-[10rem]">{t("stats.prs")}</div>
              </div>
            </m.div>

            {/* Community */}
            <m.div
              variants={fadeInUp}
              whileHover={cardHover}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-700/60 bg-white dark:bg-zinc-800/60 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center"
            >
              <div className="flex items-center gap-2 mb-2">
                <FiUsers className="h-5 w-5 text-violet-500 dark:text-violet-400" />
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-800 dark:text-zinc-200">
                  {t("community.title")}
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-snug">
                {t("community.text")}
              </p>
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
