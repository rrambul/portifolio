import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const h = vi.hoisted(() => ({ locale: { current: "en" as "en" | "pt" } }));

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

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_t, prop) =>
        ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
          const Tag = prop as keyof JSX.IntrinsicElements;
          const htmlProps: Record<string, unknown> = {};
          for (const [k, v] of Object.entries(props)) {
            if (
              !k.startsWith("while") &&
              !k.startsWith("animate") &&
              !k.startsWith("initial") &&
              !["transition", "variants", "viewport", "exit"].includes(k)
            ) {
              htmlProps[k] = v;
            }
          }
          return <Tag {...htmlProps}>{children}</Tag>;
        },
    }
  ),
}));

import { BlogPost } from "@/components/blog/BlogPost";
import type { BlogPost as BlogPostType } from "@/types/blog";

const post: BlogPostType = {
  id: "1",
  title: { en: "English Title", pt: "Título PT" },
  excerpt: { en: "English excerpt", pt: "Resumo PT" },
  content: { en: "English **content**", pt: "Conteúdo PT" },
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
  it("renders the title, excerpt, and content in English", () => {
    render(<BlogPost post={post} />);
    expect(screen.getByText("English Title")).toBeInTheDocument();
    expect(screen.getByText("English excerpt")).toBeInTheDocument();
    expect(screen.getByText("English **content**")).toBeInTheDocument();
  });

  it("renders author name and read time", () => {
    render(<BlogPost post={post} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("7 min read")).toBeInTheDocument();
  });

  it("renders both back-to-blog links pointing to the localized blog index", () => {
    render(<BlogPost post={post} />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(2);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/en/blog");
    }
  });

  it("renders Portuguese content and a pt-BR date for the pt locale", () => {
    h.locale.current = "pt";
    render(<BlogPost post={post} />);
    expect(screen.getByText("Título PT")).toBeInTheDocument();
    expect(screen.getByText("Resumo PT")).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/pt/blog");
  });

  it("falls back to the default avatar when none is provided", () => {
    const noAvatar = { ...post, author: { name: "No Avatar" } };
    render(<BlogPost post={noAvatar} />);
    const avatar = screen
      .getAllByRole("img")
      .find((img) => img.getAttribute("alt") === "No Avatar");
    expect(avatar).toHaveAttribute("src", "/profile-picture.jpg");
  });
});
