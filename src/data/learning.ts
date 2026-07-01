/** The kind of learning content. Each maps to a label and icon in the UI. */
export type LearningType =
  | "article"
  | "video"
  | "talk"
  | "book"
  | "course"
  | "podcast"
  | "paper";

export interface LearningEntry {
  /** The title, as published. */
  title: string;
  url: string;
  /** ISO date (YYYY-MM-DD) I got to it. Drives the monthly grouping. */
  date: string;
  type: LearningType;
  /** Optional source/author, e.g. "codeopinion.com". */
  source?: string;
}

/**
 * Things I learned from, across formats: articles, talks, videos, books,
 * courses, and more. Add an entry with the date you got to it; the page groups
 * and sorts by month automatically, so the order in this array does not matter.
 */
export const learning: LearningEntry[] = [
  {
    date: "2026-06-20",
    title: "Modular Monolith Boundaries",
    url: "https://codeopinion.com/modular-monolith-boundaries/",
    type: "article",
    source: "codeopinion.com",
  },
];

export interface LearningMonth {
  /** Year-month key, e.g. "2026-06". */
  key: string;
  entries: LearningEntry[];
}

/**
 * Learning entries grouped by the month they happened, newest month first and
 * newest entry first within each month. Defaults to the full log; accepts an
 * explicit list so the grouping is unit-testable in isolation.
 */
export function getLearningByMonth(
  entries: LearningEntry[] = learning
): LearningMonth[] {
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  const months: LearningMonth[] = [];
  for (const entry of sorted) {
    const key = entry.date.slice(0, 7);
    const last = months[months.length - 1];
    if (last && last.key === key) {
      last.entries.push(entry);
    } else {
      months.push({ key, entries: [entry] });
    }
  }
  return months;
}
