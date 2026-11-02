import { describe, it, expect } from "vitest";
import { skillCategories } from "@/data/skills";

describe("skillCategories", () => {
  it("contains 5 categories", () => {
    expect(skillCategories).toHaveLength(5);
  });

  it("has the expected category ids", () => {
    const ids = skillCategories.map((c) => c.id);
    expect(ids).toContain("frontend");
    expect(ids).toContain("ai");
    expect(ids).toContain("backend");
    expect(ids).toContain("testing");
    expect(ids).toContain("devopsTools");
  });

  it("each category has required fields", () => {
    for (const cat of skillCategories) {
      expect(cat.id).toBeTruthy();
      expect(Array.isArray(cat.skills)).toBe(true);
    }
  });

  it("each category exposes non-empty skill names", () => {
    for (const cat of skillCategories) {
      expect(cat.skills.length).toBeGreaterThan(0);
      for (const skill of cat.skills) {
        expect(skill).toBeTruthy();
        expect(typeof skill).toBe("string");
      }
    }
  });

  it("frontend category has the most skills", () => {
    const frontend = skillCategories.find((c) => c.id === "frontend")!;
    const others = skillCategories.filter((c) => c.id !== "frontend");
    const frontendCount = frontend.skills.length;
    for (const cat of others) {
      expect(frontendCount).toBeGreaterThanOrEqual(cat.skills.length);
    }
  });
});
