"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  const t = useTranslations("about");

  // Rendered like a README: an overview, then "##" subsections.
  const blocks = ["personal", "technical", "languages"] as const;

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-4xl"
        >
          <SectionHeading label="about" title={t("title")} meta="README.md" />

          <m.p
            variants={fadeInUp}
            className="mb-12 max-w-3xl text-lg text-zinc-600 dark:text-zinc-300"
          >
            {t("content")}
          </m.p>

          <m.div variants={fadeInUp} className="grid gap-8 md:grid-cols-3">
            {blocks.map((key) => (
              <div
                key={key}
                className="border-l border-zinc-200 pl-5 dark:border-white/10"
              >
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
      </div>
    </section>
  );
}
