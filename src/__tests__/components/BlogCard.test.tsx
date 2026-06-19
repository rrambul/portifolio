import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

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
});
