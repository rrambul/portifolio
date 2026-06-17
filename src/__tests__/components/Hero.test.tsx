import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock scrollToSection
const mockScrollToSection = vi.fn();
vi.mock("@/lib/scroll", () => ({
  scrollToSection: (...args: unknown[]) => mockScrollToSection(...args),
}));

// Mock siteConfig
vi.mock("@/config/site", () => ({
  siteConfig: {
    url: "https://renanrambul.dev",
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
  useLocale: () => "en",
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ alt, ...props }: Record<string, unknown>) => (
    <img alt={alt as string} {...props} />
  ),
}));

// Mock framer-motion
vi.mock("framer-motion");

import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders name and role", () => {
    render(<Hero />);
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("subtitle")).toBeInTheDocument();
  });

  it("renders CTA button", () => {
    render(<Hero />);
    expect(screen.getByText("cta")).toBeInTheDocument();
  });

  it("calls scrollToSection when CTA is clicked", () => {
    render(<Hero />);
    fireEvent.click(screen.getByText("cta"));
    expect(mockScrollToSection).toHaveBeenCalledWith("contact");
  });

  it("renders social links with siteConfig URLs", () => {
    render(<Hero />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("https://github.com/testuser");
    expect(hrefs).toContain("https://www.linkedin.com/in/testuser/");
    expect(hrefs).toContain("mailto:test@example.com");
  });

  it("social links open in new tab", () => {
    render(<Hero />);
    const externalLinks = screen
      .getAllByRole("link")
      .filter((l) => l.getAttribute("target") === "_blank");
    expect(externalLinks.length).toBeGreaterThanOrEqual(2); // github + linkedin
    for (const link of externalLinks) {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("renders profile image", () => {
    render(<Hero />);
    const img = screen.getByRole("img", { name: "Renan Rambul" });
    expect(img).toBeInTheDocument();
  });

  it("tracks pointer movement for the parallax effect", () => {
    render(<Hero />);
    // Should not throw when the window emits a mousemove.
    expect(() =>
      fireEvent.mouseMove(window, { clientX: 200, clientY: 150 })
    ).not.toThrow();
  });

  it("scrolls to the about section from the scroll cue", () => {
    render(<Hero />);
    fireEvent.click(screen.getByLabelText("scrollDown"));
    expect(mockScrollToSection).toHaveBeenCalledWith("about");
  });

  it("renders the release status and changelog notes", () => {
    render(<Hero />);
    expect(screen.getByText("currentlyAt")).toBeInTheDocument();
    expect(screen.getByText("statusShipping")).toBeInTheDocument();
    expect(screen.getByText("logShipped")).toBeInTheDocument();
    expect(screen.getByText("logAgents")).toBeInTheDocument();
    expect(screen.getByText("logLearning")).toBeInTheDocument();
  });

  it("renders a CV download link for the active locale", () => {
    render(<Hero />);
    const link = screen.getByText("downloadCV").closest("a");
    expect(link).toHaveAttribute("href", "/api/cv?locale=en");
    // Same-tab download: must not be a new-tab link.
    expect(link).not.toHaveAttribute("target");
  });
});
