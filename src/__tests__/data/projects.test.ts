import { describe, it, expect } from "vitest";
import { projects } from "@/data/projects";

describe("projects", () => {
  it("contains at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("each project has required fields", () => {
    for (const project of projects) {
      expect(project.titleKey).toBeTruthy();
      expect(project.descriptionKey).toBeTruthy();
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.banner.pattern).toBeTruthy();
      expect(project.banner.icon).toBeTruthy();
      expect(project.bannerStyle).toBeDefined();
    }
  });

  it("each project has either demoUrl or githubUrl", () => {
    for (const project of projects) {
      expect(project.demoUrl || project.githubUrl).toBeTruthy();
    }
  });

  it("banner patterns are valid values", () => {
    const validPatterns = ["grid", "dots", "waves", "circuit"];
    for (const project of projects) {
      expect(validPatterns).toContain(project.banner.pattern);
    }
  });

  it("URLs are valid when present", () => {
    for (const project of projects) {
      if (project.demoUrl) {
        expect(project.demoUrl).toMatch(/^https?:\/\//);
      }
      if (project.githubUrl) {
        expect(project.githubUrl).toMatch(/^https:\/\/github\.com\//);
      }
    }
  });
});
