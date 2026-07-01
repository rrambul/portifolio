import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const h = vi.hoisted(() => ({ locale: { current: "en" as string } }));

vi.mock("next-intl", () => ({
  useLocale: () => h.locale.current,
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: Record<string, unknown>) => (
    <img alt={alt as string} {...props} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("react-markdown", () => ({
  default: ({ children }: { children: string }) => <div>{children}</div>,
}));

vi.mock("framer-motion");

import { BlogPost } from "@/components/blog/BlogPost";
import type { BlogPostMetadata } from "@/types/blog";

const post: BlogPostMetadata = {
  id: "1",
  title: { en: "English Title", pt: "Título PT" },
  excerpt: { en: "English excerpt", pt: "Resumo PT" },
  date: "2025-01-15",
  banner: "/blog/banner.jpg",
  slug: "my-post",
  tags: ["react"],
  readTime: 7,
  author: { name: "Jane Doe", avatar: "/avatar.jpg" },
};

beforeEach(() => {
  h.locale.current = "en";
});

describe("BlogPost", () => {
  it("renders the title, excerpt, and content body", () => {
    render(<BlogPost post={post} content="English **content**" />);
    expect(screen.getByText("English Title")).toBeInTheDocument();
    expect(screen.getByText("English excerpt")).toBeInTheDocument();
    expect(screen.getByText("English **content**")).toBeInTheDocument();
  });

  it("renders author name and read time", () => {
    render(<BlogPost post={post} content="body" />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("7 min read")).toBeInTheDocument();
  });

  it("renders both back-to-blog links pointing to the localized blog index", () => {
    render(<BlogPost post={post} content="body" />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(2);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/en/blog");
    }
  });

  it("renders the Portuguese title/excerpt and a pt blog link for the pt locale", () => {
    h.locale.current = "pt";
    render(<BlogPost post={post} content="Conteúdo PT" />);
    expect(screen.getByText("Título PT")).toBeInTheDocument();
    expect(screen.getByText("Resumo PT")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo PT")).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/pt/blog");
  });

  it("falls back to English copy when the locale is not a known locale", () => {
    h.locale.current = "fr";
    render(<BlogPost post={post} content="English **content**" />);

    expect(screen.getByText("English Title")).toBeInTheDocument();
    expect(screen.getByText("English excerpt")).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/en/blog");
    }
  });
});
