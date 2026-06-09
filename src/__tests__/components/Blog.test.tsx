import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
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

// Mock BlogCard so the test focuses on the Blog section itself.
vi.mock("@/components/blog/BlogCard", () => ({
  BlogCard: ({ post }: { post: { id: string; slug: string } }) => (
    <div data-testid="blog-card">{post.slug}</div>
  ),
}));

import { Blog } from "@/components/sections/Blog";
import { getBlogPosts } from "@/data/blog-posts";

describe("Blog section", () => {
  it("renders the section with id 'blog'", () => {
    const { container } = render(<Blog />);
    expect(container.querySelector("#blog")).toBeInTheDocument();
  });

  it("renders the title and subtitle once loaded", () => {
    render(<Blog />);
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("subtitle")).toBeInTheDocument();
  });

  it("renders a card for every blog post", () => {
    render(<Blog />);
    const posts = getBlogPosts();
    expect(screen.getAllByTestId("blog-card")).toHaveLength(posts.length);
  });

  it("renders the published article count", () => {
    render(<Blog />);
    const count = getBlogPosts().length;
    expect(
      screen.getByText((text) => text.includes(`${count} articles published`))
    ).toBeInTheDocument();
  });
});
