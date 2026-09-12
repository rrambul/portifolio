"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { experiences as experienceData } from "@/data/experiences";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";

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
    /* The one section that breaks the reading column. It is the strongest
       content on the page and it was shaped exactly like everything else; a
       dated rail beside the notes is also simply the right layout for a
       changelog. Collapses to a single column below `md`. */
    <Section id="experience" width="wide" spacing="normal">
      <m.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <SectionHeading
          label="experience"
          title={t("title")}
          meta={`${experiences.length} releases`}
        />

        {/* Roles as a changelog: each is a release, newest first. */}
        <ol className="space-y-14">
          {experiences.map((exp, idx) => {
            const current = exp.period.includes("Present");
            return (
              <m.li
                key={idx}
                variants={fadeInUp}
                className="grid gap-x-10 gap-y-3 md:grid-cols-[12rem_1fr]"
              >
                {/* Dated rail */}
                <div className="md:pt-1">
                  <p className="font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {exp.period}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    {exp.company}
                  </p>
                  {/* Split on the separator so the narrow rail breaks between
                      place and work mode, not inside "On-site". */}
                  {exp.location.split("·").map((part) => (
                    <p
                      key={part}
                      className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400"
                    >
                      {part.trim()}
                    </p>
                  ))}
                  {current && (
                    <span className="mt-2 inline-flex items-center gap-1.5 font-accent-mono text-xs text-emerald-700 dark:text-emerald-400">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
                        aria-hidden="true"
                      />
                      shipping
                    </span>
                  )}
                </div>

                {/* Release notes */}
                <div>
                  <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>

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
                </div>
              </m.li>
            );
          })}
        </ol>
      </m.div>
    </Section>
  );
}
