import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("framer-motion");

import { Interests } from "@/components/sections/Interests";
import { positions, changedMyMind } from "@/data/interests";

describe("Interests", () => {
  it("renders the section with id 'interests'", () => {
    const { container } = render(<Interests />);
    expect(container.querySelector("#interests")).toBeInTheDocument();
  });

  it("renders the title and subtitle", () => {
    render(<Interests />);
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("subtitle")).toBeInTheDocument();
  });

  it("renders a statement for every position key", () => {
    render(<Interests />);
    for (const key of positions) {
      expect(screen.getByText(`positions.${key}`)).toBeInTheDocument();
    }
  });

  it("numbers the positions from 01", () => {
    render(<Interests />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(
      screen.getByText(String(positions.length).padStart(2, "0"))
    ).toBeInTheDocument();
  });

  it("renders the changed-my-mind block", () => {
    render(<Interests />);
    // Rendered as "// {title}", so the node holds two text children.
    expect(screen.getByText(/changedMyMindTitle/)).toBeInTheDocument();
    for (const key of changedMyMind) {
      expect(screen.getByText(`changedMyMind.${key}`)).toBeInTheDocument();
    }
  });
});
