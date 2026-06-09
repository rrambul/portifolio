import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock scrollToSection
vi.mock("@/lib/scroll", () => ({
  scrollToSection: vi.fn(),
}));

import { scrollToSection } from "@/lib/scroll";

beforeEach(() => {
  vi.mocked(scrollToSection).mockClear();
});

// Mock siteConfig
vi.mock("@/config/site", () => ({
  siteConfig: {
    name: "Test User",
    links: {
      github: "https://github.com/testuser",
      linkedin: "https://www.linkedin.com/in/testuser/",
      email: "test@example.com",
    },
  },
}));

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

import { Footer } from "@/components/ui/Footer";

describe("Footer", () => {
  it("renders the footer", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("renders section headings", () => {
    render(<Footer />);
    expect(screen.getByText("about")).toBeInTheDocument();
    expect(screen.getByText("social")).toBeInTheDocument();
    expect(screen.getByText("links")).toBeInTheDocument();
    expect(screen.getByText("contact")).toBeInTheDocument();
  });

  it("renders social links with correct hrefs", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("https://github.com/testuser");
    expect(hrefs).toContain("https://www.linkedin.com/in/testuser/");
    expect(hrefs).toContain("mailto:test@example.com");
  });

  it("renders navigation buttons", () => {
    render(<Footer />);
    expect(screen.getByText("aboutLink")).toBeInTheDocument();
    expect(screen.getByText("experienceLink")).toBeInTheDocument();
    expect(screen.getByText("projectsLink")).toBeInTheDocument();
  });

  it("scrolls to the matching section when a quick link is clicked", () => {
    render(<Footer />);
    fireEvent.click(screen.getByText("aboutLink"));
    expect(scrollToSection).toHaveBeenCalledWith("about");
    fireEvent.click(screen.getByText("experienceLink"));
    expect(scrollToSection).toHaveBeenCalledWith("experience");
    fireEvent.click(screen.getByText("projectsLink"));
    expect(scrollToSection).toHaveBeenCalledWith("projects");
  });

  it("renders copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    const copyright = screen.getByText((content) => content.includes(year));
    expect(copyright).toBeInTheDocument();
  });
});
