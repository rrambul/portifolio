"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { FiBriefcase, FiMapPin } from "react-icons/fi";
import Image from "next/image";
import { experiences as experienceData } from "@/data/experiences";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-4xl"
        >
          <SectionHeading
            label="experience"
            title={t("title")}
            meta={`${experiences.length} releases`}
          />

          {/* Roles as a changelog: each is a release on a chronological rail. */}
          <ol className="relative ml-2 space-y-10 border-l border-zinc-200 pl-8 dark:border-white/10">
            {experiences.map((exp, idx) => {
              const current = exp.period.includes("Present");
              return (
                <m.li key={idx} variants={fadeInUp} className="relative">
                  {/* Rail node. */}
                  <span
                    className="absolute -left-[2.4rem] top-1 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-[hsl(var(--background))] dark:bg-emerald-400"
                    aria-hidden="true"
                  />

                  {/* Header */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-800">
                        {exp.logo ? (
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        ) : (
                          <FiBriefcase
                            className="h-5 w-5 text-zinc-400"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
                          <span className="font-medium text-zinc-600 dark:text-zinc-300">
                            {exp.company}
                          </span>
                          <span
                            className="text-zinc-300 dark:text-zinc-700"
                            aria-hidden="true"
                          >
                            ·
                          </span>
                          <span className="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                            <FiMapPin className="h-3 w-3" aria-hidden="true" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 font-accent-mono text-xs">
                      {current && (
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
                            aria-hidden="true"
                          />
                          shipping
                        </span>
                      )}
                      <span className="rounded-md border border-zinc-200 px-2 py-0.5 text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                        {exp.period}
                      </span>
                    </div>
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
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded border border-zinc-200 px-1.5 py-0.5 font-accent-mono text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400"
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
