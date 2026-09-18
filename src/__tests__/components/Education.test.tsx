import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("framer-motion");

import { Education } from "@/components/sections/Education";
import { education } from "@/data/education";

describe("Education", () => {
  it("renders the section with id 'education'", () => {
    const { container } = render(<Education />);
    expect(container.querySelector("#education")).toBeInTheDocument();
  });

  it("renders the title and the self-taught subtitle", () => {
    render(<Education />);
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("subtitle")).toBeInTheDocument();
  });

  it("renders a degree, institution and note for every entry", () => {
    render(<Education />);
    for (const entry of education) {
      expect(
        screen.getByText(`entries.${entry.i18nKey}.degree`)
      ).toBeInTheDocument();
      expect(screen.getByText(entry.institution)).toBeInTheDocument();
      expect(
        screen.getByText(`entries.${entry.i18nKey}.note`)
      ).toBeInTheDocument();
    }
  });

  it("shows the period and the live marker for an in-progress program", () => {
    render(<Education />);
    const current = education.filter((e) => e.status === "in-progress");
    expect(current.length).toBeGreaterThan(0);
    for (const entry of current) {
      expect(screen.getByText(entry.period as string)).toBeInTheDocument();
    }
    expect(screen.getAllByText("inProgress")).toHaveLength(current.length);
  });
});
