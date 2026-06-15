import { describe, it, expect } from "vitest";
import { skillCategories } from "@/data/skills";

describe("skillCategories", () => {
  it("contains 5 categories", () => {
    expect(skillCategories).toHaveLength(5);
  });

  it("has expected category title keys", () => {
    const titleKeys = skillCategories.map((c) => c.titleKey);
    expect(titleKeys).toContain("frontend");
    expect(titleKeys).toContain("ai");
    expect(titleKeys).toContain("backend");
    expect(titleKeys).toContain("testing");
    expect(titleKeys).toContain("devopsTools");
  });

  it("each category has required fields", () => {
    for (const cat of skillCategories) {
      expect(cat.titleKey).toBeTruthy();
      expect(cat.accent).toMatch(/^#[0-9a-f]{6}$/i);
      expect(typeof cat.skills).toBe("function");
    }
  });

  it("each category returns skills with light theme", () => {
    for (const cat of skillCategories) {
      const skills = cat.skills(false);
      expect(skills.length).toBeGreaterThan(0);
      for (const skill of skills) {
        expect(skill.name).toBeTruthy();
        expect(skill.icon).toBeDefined();
      }
    }
  });

  it("each category returns skills with dark theme", () => {
    for (const cat of skillCategories) {
      const skills = cat.skills(true);
      expect(skills.length).toBeGreaterThan(0);
      for (const skill of skills) {
        expect(skill.name).toBeTruthy();
        expect(skill.icon).toBeDefined();
      }
    }
  });

  it("frontend category has the most skills", () => {
    const frontend = skillCategories.find((c) => c.titleKey === "frontend")!;
    const others = skillCategories.filter((c) => c.titleKey !== "frontend");
    const frontendCount = frontend.skills(false).length;
    for (const cat of others) {
      expect(frontendCount).toBeGreaterThanOrEqual(cat.skills(false).length);
    }
  });
});
