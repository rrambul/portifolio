"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";

/** Skills as an editorial index: a mono category label and a plain text
 *  line per category, no icon grid or cells. */
export function SkillsBento() {
  // Numbers are deliberately exact and attributable rather than rounded up;
  // "300+" and "7+" read as placeholders, "274" reads as someone who counted.
  const stats = [
    { value: "300+", key: "prs" },
    { value: "274", key: "trunk" },
    { value: "739", key: "stars" },
  ] as const;

  const t = useTranslations("skills");

  return (
    /* `tight` on purpose: skills continue the thought Experience started,
       so they sit closer to it than to Projects below. */
    <Section id="skills" spacing="tight">
      <m.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
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

        {/* Highlight stats. The one place body copy gives way to real scale,
            so the page has a second loud moment after the hero name. */}
        <m.div
          variants={fadeInUp}
          className="mt-14 grid gap-8 border-t border-zinc-200 pt-10 sm:grid-cols-3 dark:border-white/10"
        >
          {stats.map((stat) => (
            <div key={stat.key}>
              <div className="font-accent-mono text-4xl font-bold leading-none tracking-tight text-emerald-700 md:text-5xl dark:text-emerald-400">
                {stat.value}
              </div>
              <div className="mt-3 text-sm leading-snug text-zinc-500 dark:text-zinc-400">
                {t(`stats.${stat.key}`)}
              </div>
            </div>
          ))}
        </m.div>

        {/* Community */}
        <m.div variants={fadeInUp} className="mt-10">
          <h3 className="font-accent-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {t("community.title")}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t("community.text")}
          </p>
        </m.div>
      </m.div>
    </Section>
  );
}
