import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const h = vi.hoisted(() => ({ locale: { current: "en" } }));
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => h.locale.current,
}));

vi.mock("framer-motion");

vi.mock("@/data/learning", () => ({ getLearningByMonth: vi.fn() }));

import { LearningLog } from "@/components/sections/LearningLog";
import { getLearningByMonth } from "@/data/learning";

const mockGet = vi.mocked(getLearningByMonth);

beforeEach(() => {
  mockGet.mockReset();
  h.locale.current = "en";
});

describe("LearningLog", () => {
  it("renders the section with id 'learning'", () => {
    mockGet.mockReturnValue([]);
    const { container } = render(<LearningLog />);
    expect(container.querySelector("#learning")).toBeInTheDocument();
  });

  it("shows the empty state when there are no entries", () => {
    mockGet.mockReturnValue([]);
    render(<LearningLog />);
    expect(screen.getByText("empty")).toBeInTheDocument();
  });

  it("renders an entry as an external link with its type label and source", () => {
    mockGet.mockReturnValue([
      {
        key: "2026-06",
        entries: [
          {
            title: "Modular Monolith Boundaries",
            url: "https://codeopinion.com/modular-monolith-boundaries/",
            date: "2026-06-20",
            type: "article",
            source: "codeopinion.com",
          },
        ],
      },
    ]);
    render(<LearningLog />);

    const link = screen.getByText("Modular Monolith Boundaries").closest("a");
    expect(link).toHaveAttribute(
      "href",
      "https://codeopinion.com/modular-monolith-boundaries/"
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByText("codeopinion.com")).toBeInTheDocument();
    expect(screen.getByText("types.article")).toBeInTheDocument();
    // Localized month heading (en locale via the mock -> "June 2026").
    expect(screen.getByText(/June 2026/)).toBeInTheDocument();
  });

  it("renders an entry without a source and a non-article type", () => {
    mockGet.mockReturnValue([
      {
        key: "2026-05",
        entries: [
          {
            title: "Some Conference Talk",
            url: "https://example.test/talk",
            date: "2026-05-10",
            type: "talk",
          },
        ],
      },
    ]);
    render(<LearningLog />);
    expect(screen.getByText("Some Conference Talk")).toBeInTheDocument();
    expect(screen.getByText("types.talk")).toBeInTheDocument();
  });

  it("localizes the month heading for the pt locale", () => {
    h.locale.current = "pt";
    mockGet.mockReturnValue([
      {
        key: "2026-06",
        entries: [
          {
            title: "Fronteiras do Monolito Modular",
            url: "https://example.test/pt-article",
            date: "2026-06-20",
            type: "article",
          },
        ],
      },
    ]);
    render(<LearningLog />);
    // pt-BR formatting of "2026-06" -> "junho de 2026".
    expect(screen.getByText(/junho/)).toBeInTheDocument();
  });
});
