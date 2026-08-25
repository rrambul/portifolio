"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { experiences as experienceData } from "@/data/experiences";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionCol } from "@/lib/ui";

export function Experience() {
  const t = useTranslations("experience");

  const experiences = experienceData.map((exp) => ({
    ...exp,
    jobTitle: t(`companies.${exp.i18nKey}.title`),
    responsibilities: t.raw(
      `companies.${exp.i18nKey}.responsibilities`
    ) as string[],
    skills: t.raw(`companies.${exp.i18nKey}.skills`) as string[],
  }));

  return (
    <section id="experience" className="py-16">
      <div className="container mx-auto px-4">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className={sectionCol}
        >
          <SectionHeading
            label="experience"
            title={t("title")}
            meta={`${experiences.length} releases`}
          />

          {/* Roles as a changelog: each is a release, newest first. */}
          <ol className="space-y-12">
            {experiences.map((exp, idx) => {
              const current = exp.period.includes("Present");
              return (
                <m.li key={idx} variants={fadeInUp}>
                  {/* Header */}
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                    <span className="font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {exp.period}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
                    <span className="font-medium text-zinc-600 dark:text-zinc-300">
                      {exp.company}
                    </span>
                    <span
                      className="text-zinc-300 dark:text-zinc-700"
                      aria-hidden="true"
                    >
                      ·
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {exp.location}
                    </span>
                    {current && (
                      <span className="inline-flex items-center gap-1.5 font-accent-mono text-xs text-emerald-700 dark:text-emerald-400">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
                          aria-hidden="true"
                        />
                        shipping
                      </span>
                    )}
                  </div>

                  {/* Release notes */}
                  <ul className="mt-3 space-y-1.5">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li
                        key={rIdx}
                        className="flex gap-2.5 text-zinc-600 dark:text-zinc-400"
                      >
                        <span
                          className="select-none font-accent-mono text-emerald-700 dark:text-emerald-400"
                          aria-hidden="true"
                        >
                          +
                        </span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stack */}
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="font-accent-mono text-xs text-zinc-500 dark:text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </m.li>
              );
            })}
          </ol>
        </m.div>
      </div>
    </section>
  );
}
