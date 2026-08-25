"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { interests } from "@/data/interests";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionCol } from "@/lib/ui";

export function Interests() {
  const t = useTranslations("interests");

  return (
    <section id="interests" className="py-16">
      <div className="container mx-auto px-4">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className={sectionCol}
        >
          <SectionHeading
            label="interests"
            title={t("title")}
            subtitle={t("subtitle")}
            meta={`${interests.length} topics`}
          />

          {/* Topics as plain mono text, no chips. */}
          <m.div
            variants={fadeInUp}
            className="flex flex-wrap gap-x-5 gap-y-2.5"
          >
            {interests.map((key) => (
              <span
                key={key}
                className="font-accent-mono text-sm text-zinc-600 dark:text-zinc-300"
              >
                {t(`items.${key}`)}
              </span>
            ))}
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
