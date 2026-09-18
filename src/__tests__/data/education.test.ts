import { describe, it, expect } from "vitest";
import { education } from "@/data/education";

describe("education", () => {
  it("contains at least one entry", () => {
    expect(education.length).toBeGreaterThan(0);
  });

  it("each entry has required fields", () => {
    for (const entry of education) {
      expect(entry.id).toBeTruthy();
      expect(entry.i18nKey).toBeTruthy();
      expect(entry.institution).toBeTruthy();
    }
  });

  it("each entry has a unique id", () => {
    const ids = education.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("lists the in-progress MBA at Full Cycle", () => {
    const mba = education.find((e) => e.id === "fullcycle-mba");
    expect(mba?.institution).toBe("Full Cycle");
    expect(mba?.status).toBe("in-progress");
    expect(mba?.period).toBe("Sep 2026 - May 2028");
  });
});
