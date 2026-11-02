"use client";

import type { ReactNode } from "react";
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
import { education, type EducationEntry } from "@/data/education";
import {
  getInProgress,
  getLearningByMonth,
  getUndated,
  type LearningEntry,
  type LearningType,
} from "@/data/learning";
import { localeTag } from "@/i18n/config";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LiveStatus } from "@/components/ui/Status";
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

/** Every row in the log shares this shape: mono meta left, the title filling the rest. */
const ROW = "flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3";
const META = "shrink-0 font-accent-mono text-xs text-zinc-500 dark:text-zinc-400";

/** Localized "Month Year" label for a "YYYY-MM" group key, e.g. "June 2026". */
function monthLabel(key: string, locale: string): string {
  const [year, month] = key.split("-").map(Number);
  return new Intl.DateTimeFormat(localeTag(locale), {
    month: "long",
    year: "numeric",
  }).format(new Date(year!, month! - 1, 1));
}

/** One titled group of the log: a mono eyebrow over a hairline-separated list. */
function LogGroup({
  label,
  tone = "muted",
  className = "",
  children,
}: {
  label: string;
  tone?: "muted" | "accent";
  className?: string;
  children: ReactNode;
}) {
  return (
    <m.div variants={fadeInUp} className={className}>
      <Eyebrow as="h2" tone={tone} className="mb-2">
        {label}
      </Eyebrow>
      <ul className="divide-y divide-zinc-200 dark:divide-white/10">{children}</ul>
    </m.div>
  );
}

/** A degree as a single line: period, degree and school, and the live marker if still running. */
function EducationRow({
  entry,
  degree,
  inProgress,
}: {
  entry: EducationEntry;
  degree: string;
  inProgress: string;
}) {
  return (
    <div className={ROW}>
      {entry.period ? <span className={META}>{entry.period}</span> : null}
      <span className="flex-1 text-zinc-700 dark:text-zinc-300">
        {degree}
        <span className="ml-2 font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
          {entry.institution}
        </span>
      </span>
      {entry.status === "in-progress" && (
        <LiveStatus className="self-center">{inProgress}</LiveStatus>
      )}
    </div>
  );
}

/**
 * One row of the log. Entries with a canonical link render as an external
 * anchor; the rest (most books) render as plain text rather than a dead link.
 */
function LearningRow({ entry, label }: { entry: LearningEntry; label: string }) {
  const Icon = TYPE_ICONS[entry.type];

  const body = (
    <>
      {entry.date ? (
        <time dateTime={entry.date} className={META}>
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

  if (!entry.url) return <div className={ROW}>{body}</div>;

  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group rounded-sm transition-colors ${ROW} ${focusRing}`}
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

  const rows = (entries: LearningEntry[]) =>
    entries.map((entry) => (
      <li key={entry.url ?? entry.title}>
        <LearningRow entry={entry} label={t(`types.${entry.type}`)} />
      </li>
    ));

  return (
    <Section id="learning" spacing="normal">
      <m.div initial="hidden" animate="show" variants={staggerContainer}>
        <SectionHeading
          label="learning"
          title={t("title")}
          subtitle={t("subtitle")}
          meta={t("count", { count: total })}
          as="h1"
        />

        {/* Formal study first, then the curriculum I set myself, then what I
            read. The degrees are not log entries, so they stay out of the
            count in the heading. */}
        {education.length > 0 && (
          <LogGroup label={tEducation("title")} className="mb-10">
            {education.map((entry) => (
              <li key={entry.id}>
                <EducationRow
                  entry={entry}
                  degree={tEducation(`entries.${entry.id}.degree`)}
                  inProgress={tEducation("inProgress")}
                />
              </li>
            ))}
          </LogGroup>
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
              <LogGroup label={t("reading")} tone="accent">
                {rows(inProgress)}
              </LogGroup>
            )}

            {undated.length > 0 && (
              <LogGroup label={t("undated")}>{rows(undated)}</LogGroup>
            )}

            {months.map((month) => (
              <LogGroup key={month.key} label={monthLabel(month.key, locale)}>
                {rows(month.entries)}
              </LogGroup>
            ))}
          </div>
        )}
      </m.div>
    </Section>
  );
}
