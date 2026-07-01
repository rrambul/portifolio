import { describe, it, expect } from "vitest";
import {
  learning,
  getLearningByMonth,
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
  it("every entry has a title, https url, ISO date, and known type", () => {
    for (const entry of learning) {
      expect(entry.title, "title").toBeTruthy();
      expect(entry.url, entry.title).toMatch(/^https:\/\//);
      expect(entry.date, entry.title).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(VALID_TYPES, `type "${entry.type}"`).toContain(entry.type);
    }
  });
});

describe("getLearningByMonth", () => {
  it("keeps every entry exactly once", () => {
    const months = getLearningByMonth();
    const total = months.reduce((n, m) => n + m.entries.length, 0);
    expect(total).toBe(learning.length);
  });

  it("orders months newest-first and entries newest-first within a month", () => {
    const months = getLearningByMonth();

    const keys = months.map((m) => m.key);
    expect([...keys].sort((a, b) => b.localeCompare(a))).toEqual(keys);

    for (const month of months) {
      const dates = month.entries.map((e) => e.date);
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
