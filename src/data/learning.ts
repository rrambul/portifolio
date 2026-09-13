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
  /** Canonical link, when there is one. Books often have no obvious one. */
  url?: string;
  /**
   * ISO date (YYYY-MM-DD) I got to it, which drives the monthly grouping.
   * Optional: an entry without a date renders in its own group instead of in
   * the dated log, so something read years ago needs no invented date.
   */
  date?: string;
  type: LearningType;
  /** Source or author, e.g. "codeopinion.com" or "Robert C. Martin". */
  source?: string;
  /** In progress. Rendered at the top rather than in the log. */
  status?: "reading";
}

/**
 * Things I learned from, across formats: articles, talks, videos, books,
 * courses, and more. A dated entry is grouped and sorted by month
 * automatically, so the order in this array does not matter.
 */
export const learning: LearningEntry[] = [
  {
    title: "System Design Interview",
    type: "book",
    source: "Alex Xu",
    status: "reading",
  },
  {
    title: "The Pragmatic Programmer",
    type: "book",
    source: "Andrew Hunt, David Thomas",
  },
  {
    title: "Clean Code",
    type: "book",
    source: "Robert C. Martin",
  },
  {
    title: "Fundamentals of Software Architecture",
    type: "book",
    source: "Mark Richards, Neal Ford",
  },
  {
    title: "The Mythical Man-Month",
    type: "book",
    source: "Frederick P. Brooks Jr.",
  },
  {
    title: "Clean Craftsmanship",
    type: "book",
    source: "Robert C. Martin",
  },
  {
    title: "Agentic Coding is a Trap",
    url: "https://larsfaye.com/articles/agentic-coding-is-a-trap",
    type: "article",
    source: "larsfaye.com",
  },
  {
    title:
      "How DriveClub and shadPS4 Almost Defeated AI and Me: How to Learn",
    url: "https://akitaonrails.com/en/2026/04/23/driveclub-shadps4-e-ia-como-aprender/",
    type: "article",
    source: "akitaonrails.com",
  },
  {
    title: "The engineer AI can't replace",
    url: "https://strategizeyourcareer.com/p/developer-taste-ai-slop",
    type: "article",
    source: "strategizeyourcareer.com",
  },
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

/** Entries I am working through right now, in array order. */
export function getInProgress(
  entries: LearningEntry[] = learning
): LearningEntry[] {
  return entries.filter((entry) => entry.status === "reading");
}

/**
 * Finished entries carrying no date. They render in their own group rather
 * than being filed under a month I would have to make up.
 */
export function getUndated(
  entries: LearningEntry[] = learning
): LearningEntry[] {
  return entries.filter((entry) => entry.status !== "reading" && !entry.date);
}

/**
 * Dated entries grouped by the month they happened, newest month first and
 * newest entry first within each month. Defaults to the full log; accepts an
 * explicit list so the grouping is unit-testable in isolation.
 */
export function getLearningByMonth(
  entries: LearningEntry[] = learning
): LearningMonth[] {
  const sorted = entries
    .filter((entry) => entry.status !== "reading" && entry.date)
    .sort((a, b) => b.date!.localeCompare(a.date!));

  const months: LearningMonth[] = [];
  for (const entry of sorted) {
    const key = entry.date!.slice(0, 7);
    const last = months[months.length - 1];
    if (last && last.key === key) {
      last.entries.push(entry);
    } else {
      months.push({ key, entries: [entry] });
    }
  }
  return months;
}
