import { describe, it, expect } from "vitest";
import { experiences } from "@/data/experiences";

describe("experiences", () => {
  it("contains at least one experience", () => {
    expect(experiences.length).toBeGreaterThan(0);
  });

  it("each experience has required fields", () => {
    for (const exp of experiences) {
      expect(exp.id).toBeTruthy();
      expect(exp.company).toBeTruthy();
      expect(exp.period).toBeTruthy();
      expect(exp.location).toBeTruthy();
    }
  });

  it("each experience has a unique id", () => {
    const ids = experiences.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("marks exactly one role as current, and it is the newest", () => {
    const current = experiences.filter((e) => e.current);
    expect(current).toHaveLength(1);
    expect(current[0]).toBe(experiences[0]);
    expect(current[0]?.period).toContain("Present");
  });
});
