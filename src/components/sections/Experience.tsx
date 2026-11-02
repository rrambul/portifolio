"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { experiences as experienceData } from "@/data/experiences";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { LiveStatus } from "@/components/ui/Status";

export function Experience() {
  const t = useTranslations("experience");

  const experiences = experienceData.map((exp) => ({
    ...exp,
    jobTitle: t(`companies.${exp.id}.title`),
    responsibilities: t.raw(`companies.${exp.id}.responsibilities`) as string[],
    skills: t.raw(`companies.${exp.id}.skills`) as string[],
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
          meta={t("releases", { count: experiences.length })}
        />

        {/* Roles as a changelog: each is a release, newest first. */}
        <ol className="space-y-14">
          {experiences.map((exp) => (
            <m.li
              key={exp.id}
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
                  <p key={part} className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    {part.trim()}
                  </p>
                ))}
                {exp.current && (
                  <LiveStatus className="mt-2">{t("current")}</LiveStatus>
                )}
              </div>

              {/* Release notes */}
              <div>
                <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>

                <ul className="mt-3 space-y-1.5">
                  {exp.responsibilities.map((note, idx) => (
                    <li key={`${idx}-${note}`} className="flex gap-2.5 text-zinc-600 dark:text-zinc-400">
                      <span
                        className="select-none font-accent-mono text-emerald-700 dark:text-emerald-400"
                        aria-hidden="true"
                      >
                        +
                      </span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>

                {/* Stack */}
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                  {exp.skills.map((skill, idx) => (
                    <span
                      key={`${idx}-${skill}`}
                      className="font-accent-mono text-xs text-zinc-500 dark:text-zinc-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </m.li>
          ))}
        </ol>
      </m.div>
    </Section>
  );
}
