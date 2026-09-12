import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Translation function that also supports `.raw` for array values.
const t = Object.assign((key: string) => key, {
  raw: (key: string) => {
    if (key.endsWith("responsibilities")) return ["Built things", "Shipped features"];
    if (key.endsWith("skills")) return ["React", "TypeScript"];
    return key;
  },
});

vi.mock("next-intl", () => ({
  useTranslations: () => t,
}));

vi.mock("framer-motion");

import { Experience } from "@/components/sections/Experience";
import { experiences } from "@/data/experiences";

describe("Experience", () => {
  it("renders the section with id 'experience'", () => {
    const { container } = render(<Experience />);
    expect(container.querySelector("#experience")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<Experience />);
    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("renders every company from the data", () => {
    render(<Experience />);
    for (const exp of experiences) {
      expect(screen.getByText(exp.company)).toBeInTheDocument();
    }
  });

  it("renders periods and locations", () => {
    render(<Experience />);
    expect(screen.getByText(experiences[0]!.period)).toBeInTheDocument();
    // The rail splits "Place · Mode" onto separate lines so the narrow column
    // does not break inside a word; each part is its own node.
    // "Remote" appears in more than one role, so match all occurrences.
    for (const part of experiences[0]!.location.split("·")) {
      expect(screen.getAllByText(part.trim()).length).toBeGreaterThan(0);
    }
  });

  it("renders responsibilities and skills from t.raw", () => {
    render(<Experience />);
    expect(screen.getAllByText("Built things").length).toBe(experiences.length);
    expect(screen.getAllByText("React").length).toBe(experiences.length);
  });
});
