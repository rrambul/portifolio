"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { education as educationData } from "@/data/education";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";

export function Education() {
  const t = useTranslations("education");

  return (
    /* `tight` on purpose: this belongs to the Experience/Skills movement, not
       to a new one. It also stays in the reading column, because the page
       breaks that column exactly twice and neither break is this. */
    <Section id="education" spacing="tight">
      <m.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* The self-taught half of the answer lives in the subtitle: it has no
            institution and no date, so it is a statement, not a list item. */}
        <SectionHeading
          label="education"
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <ol className="space-y-8">
          {educationData.map((entry) => (
            <m.li key={entry.id} variants={fadeInUp}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold">
                  {t(`entries.${entry.i18nKey}.degree`)}
                </h3>
                {entry.period && (
                  <span className="font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {entry.period}
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                {entry.institution}
              </p>

              {entry.status === "in-progress" && (
                <span className="mt-2 inline-flex items-center gap-1.5 font-accent-mono text-xs text-emerald-700 dark:text-emerald-400">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
                    aria-hidden="true"
                  />
                  {t("inProgress")}
                </span>
              )}

              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                {t(`entries.${entry.i18nKey}.note`)}
              </p>
            </m.li>
          ))}
        </ol>
      </m.div>
    </Section>
  );
}
