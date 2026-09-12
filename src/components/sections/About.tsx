"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";

export function About() {
  const t = useTranslations("about");

  // Rendered like a README: an overview, then "##" subsections.
  const blocks = ["personal", "technical", "languages"] as const;

  return (
    <Section id="about" spacing="loose">
      <m.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <SectionHeading label="about" title={t("title")} meta="README.md" />

        {/* The lead runs a step above body size: it is the thesis, and the
            sub-blocks below it are the footnotes. */}
        <m.p
          variants={fadeInUp}
          className="text-xl leading-relaxed text-zinc-700 dark:text-zinc-200"
        >
          {t("content")}
        </m.p>

        <m.div variants={fadeInUp} className="mt-12 space-y-8">
          {blocks.map((key) => (
            <div key={key}>
              <h3 className="mb-2 font-accent-mono text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                <span
                  className="text-emerald-600 dark:text-emerald-400"
                  aria-hidden="true"
                >
                  ##{" "}
                </span>
                {t(`${key}.title`)}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                {t(`${key}.content`)}
              </p>
            </div>
          ))}
        </m.div>
      </m.div>
    </Section>
  );
}
