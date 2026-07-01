import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const h = vi.hoisted(() => ({ locale: { current: "en" as string } }));

// Mock next-intl
vi.mock("next-intl", () => ({
  useLocale: () => h.locale.current,
  useTranslations: () => (key: string) => key,
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ alt, ...props }: Record<string, unknown>) => (
    <img alt={alt as string} {...props} />
  ),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <a href={href as string} {...props}>
      {children}
    </a>
  ),
}));

// Mock framer-motion
vi.mock("framer-motion");

import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogPostMetadata } from "@/types/blog";

const mockPost: BlogPostMetadata = {
  id: "1",
  title: { en: "Test Post", pt: "Post de Teste" },
  excerpt: { en: "Test excerpt", pt: "Resumo de teste" },
  date: "2025-01-15",
  banner: "/blog/test-banner.jpg",
  slug: "test-post",
  tags: ["testing", "react"],
  readTime: 5,
  author: { name: "Test Author" },
};

beforeEach(() => {
  h.locale.current = "en";
});

describe("BlogCard", () => {
  it("renders the post title in the current locale", () => {
    render(<BlogCard post={mockPost} index={0} />);
    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });

  it("renders the post excerpt", () => {
    render(<BlogCard post={mockPost} index={0} />);
    expect(screen.getByText("Test excerpt")).toBeInTheDocument();
  });

  it("renders the author name", () => {
    render(<BlogCard post={mockPost} index={0} />);
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  it("renders a read more link", () => {
    render(<BlogCard post={mockPost} index={0} />);
    const readMore = screen.getByText(/readMore/);
    expect(readMore).toBeInTheDocument();
  });

  it("links to the correct blog post URL", () => {
    render(<BlogCard post={mockPost} index={0} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/en/blog/test-post");
  });

  it("renders the date", () => {
    render(<BlogCard post={mockPost} index={0} />);
    // The date is formatted, just verify some time element exists
    const time = screen.getByText(/publishedOn/);
    expect(time).toBeInTheDocument();
  });

  it("renders read time", () => {
    render(<BlogCard post={mockPost} index={0} />);
    expect(screen.getByText("5 min")).toBeInTheDocument();
  });

  it("renders the Portuguese title/excerpt, a pt-BR date, and a pt blog link for the pt locale", () => {
    h.locale.current = "pt";
    render(<BlogCard post={mockPost} index={0} />);

    expect(screen.getByText("Post de Teste")).toBeInTheDocument();
    expect(screen.getByText("Resumo de teste")).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/pt/blog/test-post");

    // pt-BR formats the date day-first (15/01/2025), unlike en-US (1/15/2025).
    const enDate = new Date(mockPost.date).toLocaleDateString("en-US");
    const ptDate = new Date(mockPost.date).toLocaleDateString("pt-BR");
    expect(ptDate).not.toBe(enDate);
    const time = screen.getByText(new RegExp(`publishedOn ${ptDate}`));
    expect(time).toBeInTheDocument();
  });

  it("falls back to English copy when the locale is not a known locale", () => {
    h.locale.current = "fr";
    render(<BlogCard post={mockPost} index={0} />);

    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("Test excerpt")).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/en/blog/test-post");
  });
});
