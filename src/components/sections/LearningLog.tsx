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
import { education } from "@/data/education";
import {
  getInProgress,
  getLearningByMonth,
  getUndated,
  type LearningEntry,
  type LearningType,
} from "@/data/learning";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { ForgeProgress } from "@/components/sections/ForgeProgress";
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

/**
 * One row of the log. Entries with a canonical link render as an external
 * anchor; the rest (most books) render as plain text rather than a dead link.
 */
function LearningRow({ entry, label }: { entry: LearningEntry; label: string }) {
  const Icon = TYPE_ICONS[entry.type];
  const row = "flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3";

  const body = (
    <>
      {entry.date ? (
        <time
          dateTime={entry.date}
          className="shrink-0 font-accent-mono text-xs text-zinc-500 dark:text-zinc-400"
        >
          {entry.date}
        </time>
      ) : null}
      <span className="inline-flex shrink-0 items-center gap-1 self-center rounded border border-zinc-200 px-1.5 py-0.5 font-accent-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:border-white/10 dark:text-zinc-400">
        <Icon className="h-3 w-3" aria-hidden="true" />
        {label}
      </span>
      <span className="flex-1 text-zinc-700 transition-colors group-hover:text-emerald-700 dark:text-zinc-300 dark:group-hover:text-emerald-400">
        {entry.title}
        {entry.source ? (
          <span className="ml-2 font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
            {entry.source}
          </span>
        ) : null}
      </span>
      {entry.url ? (
        <FiArrowUpRight
          className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400 transition-colors group-hover:text-emerald-700 dark:text-zinc-500 dark:group-hover:text-emerald-400"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (!entry.url) return <div className={row}>{body}</div>;

  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group rounded-sm transition-colors ${row} ${focusRing}`}
    >
      {body}
    </a>
  );
}

export function LearningLog() {
  const t = useTranslations("learning");
  const tEducation = useTranslations("education");
  const locale = useLocale();

  const inProgress = getInProgress();
  const undated = getUndated();
  const months = getLearningByMonth();

  const dated = months.reduce((sum, group) => sum + group.entries.length, 0);
  const total = inProgress.length + undated.length + dated;
  const listClass = "divide-y divide-zinc-200 dark:divide-white/10";

  return (
    <Section id="learning" spacing="normal">
      <m.div initial="hidden" animate="show" variants={staggerContainer}>
        <SectionHeading
          label="learning"
          title={t("title")}
          subtitle={t("subtitle")}
          meta={`${total} ${total === 1 ? "entry" : "entries"}`}
          as="h1"
        />

        {/* Formal study first, then the curriculum I set myself, then what I
            read. The degrees are not log entries, so they stay out of the
            count in the heading. */}
        {education.length > 0 && (
          <m.div variants={fadeInUp} className="mb-10">
            <h2 className="mb-2 font-accent-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {"// "}
              {tEducation("title")}
            </h2>
            <ul className={listClass}>
              {education.map((entry) => (
                <li
                  key={entry.id}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3"
                >
                  {entry.period ? (
                    <span className="shrink-0 font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {entry.period}
                    </span>
                  ) : null}
                  <span className="flex-1 text-zinc-700 dark:text-zinc-300">
                    {tEducation(`entries.${entry.i18nKey}.degree`)}
                    <span className="ml-2 font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {entry.institution}
                    </span>
                  </span>
                  {entry.status === "in-progress" && (
                    <span className="inline-flex shrink-0 items-center gap-1.5 self-center font-accent-mono text-xs text-emerald-700 dark:text-emerald-400">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
                        aria-hidden="true"
                      />
                      {tEducation("inProgress")}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </m.div>
        )}

        <div className="mb-10">
          <ForgeProgress />
        </div>

        {total === 0 ? (
          <p className="font-accent-mono text-sm text-zinc-500 dark:text-zinc-400">
            {t("empty")}
          </p>
        ) : (
          <div className="space-y-10">
            {inProgress.length > 0 && (
              <m.div variants={fadeInUp}>
                <h2 className="mb-2 font-accent-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {"// "}
                  {t("reading")}
                </h2>
                <ul className={listClass}>
                  {inProgress.map((entry) => (
                    <li key={entry.title}>
                      <LearningRow
                        entry={entry}
                        label={t(`types.${entry.type}`)}
                      />
                    </li>
                  ))}
                </ul>
              </m.div>
            )}

            {undated.length > 0 && (
              <m.div variants={fadeInUp}>
                <h2 className="mb-2 font-accent-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {"// "}
                  {t("undated")}
                </h2>
                <ul className={listClass}>
                  {undated.map((entry) => (
                    <li key={entry.title}>
                      <LearningRow
                        entry={entry}
                        label={t(`types.${entry.type}`)}
                      />
                    </li>
                  ))}
                </ul>
              </m.div>
            )}

            {months.map((month) => (
              <m.div key={month.key} variants={fadeInUp}>
                <h2 className="mb-2 font-accent-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {"// "}
                  {monthLabel(month.key, locale)}
                </h2>
                <ul className={listClass}>
                  {month.entries.map((entry) => (
                    <li key={entry.url ?? entry.title}>
                      <LearningRow
                        entry={entry}
                        label={t(`types.${entry.type}`)}
                      />
                    </li>
                  ))}
                </ul>
              </m.div>
            ))}
          </div>
        )}
      </m.div>
    </Section>
  );
}
