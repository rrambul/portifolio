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
    }
  });

  it("each project has either demoUrl or githubUrl", () => {
    for (const project of projects) {
      expect(project.demoUrl || project.githubUrl).toBeTruthy();
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
