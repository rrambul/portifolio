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

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ alt, ...props }: Record<string, unknown>) => (
    <img alt={alt as string} {...props} />
  ),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  useReducedMotion: () => false,
  useMotionValue: (initial: number) => ({ set: () => {}, get: () => initial }),
  useSpring: (value: unknown) => value,
  useTransform: () => 0,
  motion: new Proxy(
    {},
    {
      get: (_target, prop) => {
        return ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
          const Tag = prop as keyof JSX.IntrinsicElements;
          const htmlProps: Record<string, unknown> = {};
          for (const [k, v] of Object.entries(props)) {
            if (
              !k.startsWith("while") &&
              !k.startsWith("animate") &&
              !k.startsWith("initial") &&
              k !== "transition" &&
              k !== "variants" &&
              k !== "viewport" &&
              k !== "exit"
            ) {
              htmlProps[k] = v;
            }
          }
          return <Tag {...htmlProps}>{children}</Tag>;
        };
      },
    }
  ),
}));

import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders greeting and title", () => {
    render(<Hero />);
    expect(screen.getByText("greeting")).toBeInTheDocument();
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
});
