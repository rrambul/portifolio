import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", resolvedTheme: "dark" }),
}));

// Mock framer-motion
vi.mock("framer-motion");

// Mock dynamic imports
vi.mock("next/dynamic", () => ({
  default: () => {
    return function MockDynamic() {
      return <div data-testid="mock-particles" />;
    };
  },
}));

import { About } from "@/components/sections/About";

describe("About", () => {
  it("renders the section with id 'about'", () => {
    const { container } = render(<About />);
    const section = container.querySelector("#about");
    expect(section).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<About />);
    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("renders the content paragraph", () => {
    render(<About />);
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("renders three info cards", () => {
    render(<About />);
    expect(screen.getByText("personal.title")).toBeInTheDocument();
    expect(screen.getByText("technical.title")).toBeInTheDocument();
    expect(screen.getByText("languages.title")).toBeInTheDocument();
  });

  it("renders card content", () => {
    render(<About />);
    expect(screen.getByText("personal.content")).toBeInTheDocument();
    expect(screen.getByText("technical.content")).toBeInTheDocument();
    expect(screen.getByText("languages.content")).toBeInTheDocument();
  });
});
