import { describe, it, expect } from "vitest";
import {
  learning,
  getInProgress,
  getLearningByMonth,
  getUndated,
  type LearningType,
} from "@/data/learning";

const VALID_TYPES: LearningType[] = [
  "article",
  "video",
  "talk",
  "book",
  "course",
  "podcast",
  "paper",
];

describe("learning data", () => {
  it("every entry has a title and a known type", () => {
    for (const entry of learning) {
      expect(entry.title, "title").toBeTruthy();
      expect(VALID_TYPES, `type "${entry.type}"`).toContain(entry.type);
    }
  });

  it("any url is https and any date is ISO", () => {
    for (const entry of learning) {
      if (entry.url) expect(entry.url, entry.title).toMatch(/^https:\/\//);
      if (entry.date) {
        expect(entry.date, entry.title).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });

  it("has no duplicate titles, which the list keys on", () => {
    const titles = learning.map((e) => e.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});

describe("getInProgress / getUndated", () => {
  it("splits entries into reading, undated shelf, and dated log", () => {
    const entries = [
      { title: "Reading", type: "book" as const, status: "reading" as const },
      { title: "Shelved", type: "book" as const },
      { title: "Dated", type: "article" as const, date: "2026-06-20" },
    ];

    expect(getInProgress(entries).map((e) => e.title)).toEqual(["Reading"]);
    expect(getUndated(entries).map((e) => e.title)).toEqual(["Shelved"]);
    expect(getLearningByMonth(entries).flatMap((m) => m.entries.map((e) => e.title)))
      .toEqual(["Dated"]);
  });

  it("keeps a dated in-progress entry out of the month log", () => {
    const entries = [
      {
        title: "Reading",
        type: "book" as const,
        date: "2026-06-20",
        status: "reading" as const,
      },
    ];
    expect(getLearningByMonth(entries)).toEqual([]);
    expect(getInProgress(entries)).toHaveLength(1);
  });

  it("every entry lands in exactly one of the three groups", () => {
    const counted =
      getInProgress().length + getUndated().length +
      getLearningByMonth().reduce((n, m) => n + m.entries.length, 0);
    expect(counted).toBe(learning.length);
  });
});

describe("getLearningByMonth", () => {
  it("keeps every dated entry exactly once", () => {
    const dated = learning.filter((e) => e.date && e.status !== "reading");
    const months = getLearningByMonth();
    const total = months.reduce((n, m) => n + m.entries.length, 0);
    expect(total).toBe(dated.length);
  });

  it("orders months newest-first and entries newest-first within a month", () => {
    const months = getLearningByMonth();

    const keys = months.map((m) => m.key);
    expect([...keys].sort((a, b) => b.localeCompare(a))).toEqual(keys);

    for (const month of months) {
      // Grouping only ever yields dated entries, so the dates are non-null.
      const dates = month.entries.map((e) => e.date!);
      expect([...dates].sort((a, b) => b.localeCompare(a))).toEqual(dates);
    }
  });

  it("sorts and groups an explicit multi-month list", () => {
    const out = getLearningByMonth([
      { title: "A", url: "https://a.test", date: "2026-05-02", type: "article" },
      { title: "C", url: "https://c.test", date: "2026-06-20", type: "talk" },
      { title: "B", url: "https://b.test", date: "2026-06-10", type: "video" },
    ]);

    expect(out.map((m) => m.key)).toEqual(["2026-06", "2026-05"]);
    // newest-first within the shared June group
    expect(out[0]!.entries.map((e) => e.title)).toEqual(["C", "B"]);
    expect(out[1]!.entries.map((e) => e.title)).toEqual(["A"]);
  });
});
