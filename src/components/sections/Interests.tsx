"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { positions, changedMyMind } from "@/data/interests";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";

export function Interests() {
  const t = useTranslations("interests");

  return (
    <Section id="interests" spacing="normal">
      <m.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <SectionHeading
          label="positions"
          title={t("title")}
          subtitle={t("subtitle")}
        />

        {/* Numbered like clauses in a spec. The index sits in its own rail so
            the statements keep a single hard left edge. */}
        <m.ol variants={fadeInUp} className="space-y-6">
          {positions.map((key, idx) => (
            <li
              key={key}
              className="grid grid-cols-[2.25rem_1fr] items-baseline gap-x-3"
            >
              <span
                className="font-accent-mono text-xs text-emerald-700 dark:text-emerald-400"
                aria-hidden="true"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <p className="text-zinc-700 dark:text-zinc-300">
                {t(`positions.${key}`)}
              </p>
            </li>
          ))}
        </m.ol>

        {/* Positions are cheap without a record of being wrong. */}
        <m.div variants={fadeInUp} className="mt-12">
          <p className="font-accent-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {"// "}
            {t("changedMyMindTitle")}
          </p>
          <ul className="mt-4 space-y-3">
            {changedMyMind.map((key) => (
              <li
                key={key}
                className="flex gap-3 text-zinc-600 dark:text-zinc-400"
              >
                <span
                  className="select-none font-accent-mono text-zinc-400 dark:text-zinc-500"
                  aria-hidden="true"
                >
                  ~
                </span>
                <span>{t(`changedMyMind.${key}`)}</span>
              </li>
            ))}
          </ul>
        </m.div>
      </m.div>
    </Section>
  );
}
