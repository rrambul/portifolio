import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const h = vi.hoisted(() => ({ locale: { current: "en" } }));
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => h.locale.current,
}));

vi.mock("framer-motion");

vi.mock("@/data/learning", () => ({
  getLearningByMonth: vi.fn(),
  getInProgress: vi.fn(),
  getShelf: vi.fn(),
}));

import { LearningLog } from "@/components/sections/LearningLog";
import { getInProgress, getLearningByMonth, getShelf } from "@/data/learning";

const mockMonths = vi.mocked(getLearningByMonth);
const mockReading = vi.mocked(getInProgress);
const mockShelf = vi.mocked(getShelf);

/** Default every group to empty; each test opts into the ones it needs. */
beforeEach(() => {
  mockMonths.mockReset().mockReturnValue([]);
  mockReading.mockReset().mockReturnValue([]);
  mockShelf.mockReset().mockReturnValue([]);
  h.locale.current = "en";
});

describe("LearningLog", () => {
  it("renders the section with id 'learning'", () => {
    const { container } = render(<LearningLog />);
    expect(container.querySelector("#learning")).toBeInTheDocument();
  });

  it("shows the empty state when every group is empty", () => {
    render(<LearningLog />);
    expect(screen.getByText("empty")).toBeInTheDocument();
  });

  it("renders a dated entry as an external link with its type label and source", () => {
    mockMonths.mockReturnValue([
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
    expect(screen.getByText("2026-06-20")).toBeInTheDocument();
  });

  it("renders the currently-reading group", () => {
    mockReading.mockReturnValue([
      { title: "System Design Interview", type: "book", source: "Alex Xu" },
    ]);
    render(<LearningLog />);
    expect(screen.getByText(/reading/)).toBeInTheDocument();
    expect(screen.getByText("System Design Interview")).toBeInTheDocument();
    expect(screen.getByText("Alex Xu")).toBeInTheDocument();
  });

  it("renders an entry with no url as plain text rather than a dead link", () => {
    mockShelf.mockReturnValue([
      { title: "Clean Code", type: "book", source: "Robert C. Martin" },
    ]);
    render(<LearningLog />);

    const title = screen.getByText("Clean Code");
    expect(title.closest("a")).toBeNull();
    expect(screen.getByText(/shelf/)).toBeInTheDocument();
    expect(screen.getByText("types.book")).toBeInTheDocument();
  });

  it("omits the date element for an entry with no date", () => {
    mockShelf.mockReturnValue([{ title: "Clean Code", type: "book" }]);
    const { container } = render(<LearningLog />);
    expect(container.querySelector("time")).toBeNull();
  });

  it("counts every group in the heading meta", () => {
    mockReading.mockReturnValue([{ title: "Reading", type: "book" }]);
    mockShelf.mockReturnValue([{ title: "Shelved", type: "book" }]);
    mockMonths.mockReturnValue([
      {
        key: "2026-06",
        entries: [
          { title: "Dated", url: "https://x.test", date: "2026-06-20", type: "article" },
        ],
      },
    ]);
    render(<LearningLog />);
    expect(screen.getByText("3 entries")).toBeInTheDocument();
  });

  it("uses the singular label for a single entry", () => {
    mockShelf.mockReturnValue([{ title: "Clean Code", type: "book" }]);
    render(<LearningLog />);
    expect(screen.getByText("1 entry")).toBeInTheDocument();
  });

  it("localizes the month heading for the pt locale", () => {
    h.locale.current = "pt";
    mockMonths.mockReturnValue([
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
