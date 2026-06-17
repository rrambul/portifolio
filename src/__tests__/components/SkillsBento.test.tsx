import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "dark" }),
}));

vi.mock("framer-motion");

import { SkillsBento } from "@/components/sections/SkillsBento";
import { skillCategories } from "@/data/skills";

describe("SkillsBento", () => {
  it("renders the section with id 'skills'", () => {
    const { container } = render(<SkillsBento />);
    expect(container.querySelector("#skills")).toBeInTheDocument();
  });

  it("renders a labeled cell for every skill category", () => {
    render(<SkillsBento />);
    // categories are rendered via their i18n key (mock returns the key)
    for (const key of ["frontend", "ai", "backend", "testing", "devopsTools"]) {
      expect(screen.getByText(key)).toBeInTheDocument();
    }
  });

  it("renders representative skills including the AI category", () => {
    render(<SkillsBento />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Coding Agents")).toBeInTheDocument();
    expect(screen.getByText("Playwright")).toBeInTheDocument();
  });

  it("renders the highlight stats and community cell", () => {
    render(<SkillsBento />);
    expect(screen.getByText("6+")).toBeInTheDocument();
    expect(screen.getByText("250+")).toBeInTheDocument();
    expect(screen.getByText("community.title")).toBeInTheDocument();
    expect(screen.getByText("community.text")).toBeInTheDocument();
  });

  it("renders every skill from the data", () => {
    render(<SkillsBento />);
    const total = skillCategories.reduce((n, c) => n + c.skills().length, 0);
    // each skill name is rendered once
    expect(total).toBeGreaterThan(20);
  });
});
