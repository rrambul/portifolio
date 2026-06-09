import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("framer-motion");

import { Projects } from "@/components/sections/Projects";
import { projects } from "@/data/projects";

describe("Projects", () => {
  it("renders the section with id 'projects'", () => {
    const { container } = render(<Projects />);
    expect(container.querySelector("#projects")).toBeInTheDocument();
  });

  it("renders the title and subtitle", () => {
    render(<Projects />);
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("subtitle")).toBeInTheDocument();
  });

  it("renders a card for every project", () => {
    render(<Projects />);
    for (const project of projects) {
      expect(screen.getByText(project.titleKey)).toBeInTheDocument();
      expect(screen.getByText(project.descriptionKey)).toBeInTheDocument();
    }
  });

  it("renders all banner pattern variants without crashing", () => {
    // The data exercises grid, waves, dots, and circuit patterns.
    const patterns = new Set(projects.map((p) => p.banner.pattern));
    expect(patterns).toEqual(new Set(["grid", "waves", "dots", "circuit"]));
    const { container } = render(<Projects />);
    expect(container.querySelectorAll("svg").length).toBeGreaterThanOrEqual(
      projects.length
    );
  });

  it("renders the contribution badge and star count for contributed projects", () => {
    render(<Projects />);
    const contributed = projects.filter((p) => p.isContribution);
    expect(screen.getAllByText("contribution").length).toBe(contributed.length);
    const withStars = projects.filter((p) => p.stars);
    for (const p of withStars) {
      expect(screen.getByText(String(p.stars))).toBeInTheDocument();
    }
  });

  it("renders demo and source links with correct hrefs", () => {
    render(<Projects />);
    const hrefs = screen.getAllByRole("link").map((l) => l.getAttribute("href"));
    for (const p of projects) {
      if (p.demoUrl) expect(hrefs).toContain(p.demoUrl);
      if (p.githubUrl) expect(hrefs).toContain(p.githubUrl);
    }
  });

  it("renders project tags", () => {
    render(<Projects />);
    // "TypeScript" appears in multiple projects
    expect(screen.getAllByText("TypeScript").length).toBeGreaterThan(1);
  });
});
