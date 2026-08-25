"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionCol } from "@/lib/ui";

/** Skills as an editorial index: a mono category label and a plain text
 *  line per category, no icon grid or cells. */
export function SkillsBento() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="py-16">
      <div className="container mx-auto px-4">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className={sectionCol}
        >
          <SectionHeading
            label="skills"
            title={t("title")}
            subtitle={t("subtitle")}
          />

          <m.div variants={fadeInUp} className="space-y-5">
            {skillCategories.map((category) => (
              <div
                key={category.titleKey}
                className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4"
              >
                <h3 className="font-accent-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 sm:pt-1">
                  {t(category.titleKey)}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {category.skills.join(" · ")}
                </p>
              </div>
            ))}
          </m.div>

          {/* Highlight stats: flat mono numbers. */}
          <m.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap gap-x-12 gap-y-4 border-t border-zinc-200 pt-8 dark:border-white/10"
          >
            <div>
              <div className="font-accent-mono text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                7+
              </div>
              <div className="mt-1 max-w-[12rem] text-sm text-zinc-500 dark:text-zinc-400">
                {t("stats.years")}
              </div>
            </div>
            <div>
              <div className="font-accent-mono text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                300+
              </div>
              <div className="mt-1 max-w-[12rem] text-sm text-zinc-500 dark:text-zinc-400">
                {t("stats.prs")}
              </div>
            </div>
          </m.div>

          {/* Community */}
          <m.div variants={fadeInUp} className="mt-8">
            <h3 className="font-accent-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t("community.title")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("community.text")}
            </p>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
