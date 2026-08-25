"use client";

import { useLocale, useTranslations } from "next-intl";
import { m } from "framer-motion";
import {
  FiArrowUpRight,
  FiFileText,
  FiPlayCircle,
  FiMic,
  FiBookOpen,
  FiAward,
  FiHeadphones,
  FiFile,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { getLearningByMonth, type LearningType } from "@/data/learning";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { focusRing } from "@/lib/ui";

const TYPE_ICONS: Record<LearningType, IconType> = {
  article: FiFileText,
  video: FiPlayCircle,
  talk: FiMic,
  book: FiBookOpen,
  course: FiAward,
  podcast: FiHeadphones,
  paper: FiFile,
};

/** Localized "Month Year" label for a "YYYY-MM" group key, e.g. "June 2026". */
function monthLabel(key: string, locale: string): string {
  const [year, month] = key.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(year!, month! - 1, 1));
}

export function LearningLog() {
  const t = useTranslations("learning");
  const locale = useLocale();
  const months = getLearningByMonth();
  const total = months.reduce((sum, group) => sum + group.entries.length, 0);

  return (
    <section id="learning" className="py-20">
      <div className="container mx-auto px-4">
        <m.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="mx-auto max-w-2xl"
        >
          <SectionHeading
            label="learning"
            title={t("title")}
            subtitle={t("subtitle")}
            meta={`${total} ${total === 1 ? "entry" : "entries"}`}
            as="h1"
          />

          {months.length === 0 ? (
            <p className="font-accent-mono text-sm text-zinc-500 dark:text-zinc-400">
              {t("empty")}
            </p>
          ) : (
            <div className="space-y-10">
              {months.map((month) => (
                <m.div key={month.key} variants={fadeInUp}>
                  <h2 className="mb-2 font-accent-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {"// "}
                    {monthLabel(month.key, locale)}
                  </h2>
                  <ul className="divide-y divide-zinc-200 dark:divide-white/10">
                    {month.entries.map((entry) => {
                      const Icon = TYPE_ICONS[entry.type];
                      return (
                        <li key={entry.url}>
                          <a
                            href={entry.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-sm py-3 transition-colors ${focusRing}`}
                          >
                            <time
                              dateTime={entry.date}
                              className="shrink-0 font-accent-mono text-xs text-zinc-500 dark:text-zinc-400"
                            >
                              {entry.date}
                            </time>
                            <span className="inline-flex shrink-0 items-center gap-1 self-center rounded border border-zinc-200 px-1.5 py-0.5 font-accent-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                              <Icon className="h-3 w-3" aria-hidden="true" />
                              {t(`types.${entry.type}`)}
                            </span>
                            <span className="flex-1 text-zinc-700 transition-colors group-hover:text-emerald-700 dark:text-zinc-300 dark:group-hover:text-emerald-400">
                              {entry.title}
                              {entry.source ? (
                                <span className="ml-2 font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
                                  {entry.source}
                                </span>
                              ) : null}
                            </span>
                            <FiArrowUpRight
                              className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400 transition-colors group-hover:text-emerald-700 dark:text-zinc-500 dark:group-hover:text-emerald-400"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </m.div>
              ))}
            </div>
          )}
        </m.div>
      </div>
    </section>
  );
}
