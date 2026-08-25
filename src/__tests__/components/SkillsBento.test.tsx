import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("framer-motion");

import { SkillsBento } from "@/components/sections/SkillsBento";
import { skillCategories } from "@/data/skills";

describe("SkillsBento", () => {
  it("renders the section with id 'skills'", () => {
    const { container } = render(<SkillsBento />);
    expect(container.querySelector("#skills")).toBeInTheDocument();
  });

  it("renders a labeled row for every skill category", () => {
    render(<SkillsBento />);
    // categories are rendered via their i18n key (mock returns the key)
    for (const key of ["frontend", "ai", "backend", "testing", "devopsTools"]) {
      expect(screen.getByText(key)).toBeInTheDocument();
    }
  });

  it("renders every category's skills as a joined text line", () => {
    render(<SkillsBento />);
    for (const category of skillCategories) {
      expect(screen.getByText(category.skills.join(" · "))).toBeInTheDocument();
    }
  });

  it("renders the highlight stats and community block", () => {
    render(<SkillsBento />);
    expect(screen.getByText("7+")).toBeInTheDocument();
    expect(screen.getByText("300+")).toBeInTheDocument();
    expect(screen.getByText("community.title")).toBeInTheDocument();
    expect(screen.getByText("community.text")).toBeInTheDocument();
  });
});
