import { describe, it, expect } from "vitest";
import { experiences } from "@/data/experiences";

describe("experiences", () => {
  it("contains at least one experience", () => {
    expect(experiences.length).toBeGreaterThan(0);
  });

  it("each experience has required fields", () => {
    for (const exp of experiences) {
      expect(exp.companyId).toBeTruthy();
      expect(exp.company).toBeTruthy();
      expect(exp.period).toBeTruthy();
      expect(exp.location).toBeTruthy();
    }
  });

  it("each experience has a unique companyId", () => {
    const ids = experiences.map((e) => e.companyId);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
