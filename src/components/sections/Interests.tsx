"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { interests } from "@/data/interests";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Interests() {
  const t = useTranslations("interests");

  return (
    <section id="interests" className="py-20">
      <div className="container mx-auto px-4">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-4xl"
        >
          <SectionHeading
            label="interests"
            title={t("title")}
            subtitle={t("subtitle")}
            meta={`${interests.length} topics`}
          />

          {/* Topics as a mono "tag" cloud: a monochrome marker icon per item. */}
          <m.div variants={fadeInUp} className="flex flex-wrap gap-2.5">
            {interests.map(({ key, icon: Icon }) => (
              <span
                key={key}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-1.5 font-accent-mono text-sm text-zinc-700 dark:border-white/10 dark:text-zinc-300"
              >
                <Icon
                  className="h-4 w-4 text-zinc-400 dark:text-zinc-500"
                  aria-hidden="true"
                />
                {t(`items.${key}`)}
              </span>
            ))}
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
