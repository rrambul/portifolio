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
vi.mock("framer-motion", () => ({
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

import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogPost } from "@/types/blog";

const mockPost: BlogPost = {
  id: "1",
  title: { en: "Test Post", pt: "Post de Teste" },
  excerpt: { en: "Test excerpt", pt: "Resumo de teste" },
  content: { en: "Test content", pt: "Conteúdo de teste" },
  date: "2025-01-15",
  banner: "/blog/test-banner.jpg",
  slug: "test-post",
  tags: ["testing", "react"],
  readTime: 5,
  author: { name: "Test Author", avatar: "/profile.jpg" },
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

  it("falls back to the default avatar when none is provided", () => {
    const noAvatar: BlogPost = { ...mockPost, author: { name: "No Avatar" } };
    render(<BlogCard post={noAvatar} index={1} />);
    const avatar = screen
      .getAllByRole("img")
      .find((img) => img.getAttribute("alt") === "No Avatar");
    expect(avatar).toHaveAttribute("src", "/profile-picture.jpg");
  });
});
