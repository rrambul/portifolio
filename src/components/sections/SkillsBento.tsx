"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { FiUsers } from "react-icons/fi";
import { skillCategories, type SkillCategory } from "@/data/skills";
import { staggerContainer, fadeInUp, cardHover } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CARD =
  "rounded-xl border border-zinc-200 bg-white/70 p-5 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none";

/** A category's skills as a grid of labeled icon tiles. */
function SkillTiles({ category }: { category: SkillCategory }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-4">
      {category.skills().map((skill) => (
        <div
          key={skill.name}
          className="flex w-16 flex-col items-center gap-1.5"
        >
          {/* Icons are decorative; the label below is the accessible name. */}
          <div
            className="flex h-8 items-center justify-center"
            aria-hidden="true"
          >
            {skill.icon}
          </div>
          <span className="text-center text-[11px] leading-tight text-zinc-600 dark:text-zinc-400">
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
  return (
    <m.div
      variants={fadeInUp}
      whileHover={cardHover}
      className={`${CARD} ${className}`}
    >
      <div className="mb-4 flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: category.accent }}
          aria-hidden="true"
        />
        <h3 className="font-accent-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {title}
        </h3>
      </div>
      <SkillTiles category={category} />
    </m.div>
  );
}

export function SkillsBento() {
  const t = useTranslations("skills");

  const byKey = (key: string) =>
    skillCategories.find((c) => c.titleKey === key) as SkillCategory;

  return (
    <section id="skills" className="bg-transparent py-20">
      <div className="container mx-auto px-4">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mx-auto max-w-6xl"
        >
          <SectionHeading
            label="skills"
            title={t("title")}
            subtitle={t("subtitle")}
          />

          <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3">
            <CategoryCell
              category={byKey("frontend")}
              title={t("frontend")}
              className="md:col-span-2"
            />

            {/* AI cell carries the amber secondary accent. */}
            <CategoryCell
              category={byKey("ai")}
              title={t("ai")}
              className="ring-1 ring-amber-300/60 dark:ring-amber-500/30"
            />

            <CategoryCell category={byKey("backend")} title={t("backend")} />
            <CategoryCell category={byKey("testing")} title={t("testing")} />
            <CategoryCell
              category={byKey("devopsTools")}
              title={t("devopsTools")}
            />

            {/* Highlight stats: flat mono numbers, no gradient. */}
            <m.div
              variants={fadeInUp}
              whileHover={cardHover}
              className={`${CARD} flex items-center justify-around gap-4 md:col-span-2`}
            >
              <div className="text-center">
                <div className="font-accent-mono text-4xl font-bold text-emerald-600 dark:text-emerald-400 md:text-5xl">
                  6+
                </div>
                <div className="mt-1 max-w-[10rem] text-sm text-zinc-500 dark:text-zinc-400">
                  {t("stats.years")}
                </div>
              </div>
              <div
                className="h-12 w-px self-center bg-zinc-200 dark:bg-white/10"
                aria-hidden="true"
              />
              <div className="text-center">
                <div className="font-accent-mono text-4xl font-bold text-emerald-600 dark:text-emerald-400 md:text-5xl">
                  250+
                </div>
                <div className="mt-1 max-w-[10rem] text-sm text-zinc-500 dark:text-zinc-400">
                  {t("stats.prs")}
                </div>
              </div>
            </m.div>

            {/* Community */}
            <m.div
              variants={fadeInUp}
              whileHover={cardHover}
              className={`${CARD} flex flex-col justify-center`}
            >
              <div className="mb-2 flex items-center gap-2">
                <FiUsers
                  className="h-4 w-4 text-amber-500 dark:text-amber-400"
                  aria-hidden="true"
                />
                <h3 className="font-accent-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {t("community.title")}
                </h3>
              </div>
              <p className="text-sm leading-snug text-zinc-600 dark:text-zinc-400">
                {t("community.text")}
              </p>
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
