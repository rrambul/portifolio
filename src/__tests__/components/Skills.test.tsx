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

// Mock dynamic imports (particles)
vi.mock("next/dynamic", () => ({
  default: () => {
    return function MockDynamic() {
      return <div data-testid="mock-particles" />;
    };
  },
}));

// Mock CircularCarousel
vi.mock("@/components/ui/CircularCarousel", () => ({
  CircularCarousel: ({ items }: { items: { name: string }[] }) => (
    <div data-testid="carousel">
      {items.map((item) => (
        <span key={item.name}>{item.name}</span>
      ))}
    </div>
  ),
}));

import { Skills } from "@/components/sections/Skills";

describe("Skills", () => {
  it("renders the section with id 'skills'", () => {
    const { container } = render(<Skills />);
    const section = container.querySelector("#skills");
    expect(section).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<Skills />);
    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("renders all 4 category headings", () => {
    render(<Skills />);
    expect(screen.getByText("frontend")).toBeInTheDocument();
    expect(screen.getByText("backend")).toBeInTheDocument();
    expect(screen.getByText("testing")).toBeInTheDocument();
    expect(screen.getByText("devopsTools")).toBeInTheDocument();
  });

  it("renders carousels with skill items", () => {
    render(<Skills />);
    const carousels = screen.getAllByTestId("carousel");
    expect(carousels).toHaveLength(4);
  });

  it("renders individual skill names", () => {
    render(<Skills />);
    // Check some well-known skills are rendered
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Docker")).toBeInTheDocument();
  });
});
