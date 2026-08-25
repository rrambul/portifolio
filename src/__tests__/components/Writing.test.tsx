import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

vi.mock("framer-motion");

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { Writing } from "@/components/sections/Writing";
import { getBlogPosts } from "@/data/blog-posts";

describe("Writing", () => {
  it("renders the section with id 'writing'", () => {
    const { container } = render(<Writing />);
    expect(container.querySelector("#writing")).toBeInTheDocument();
  });

  it("renders the blog title and post count", () => {
    render(<Writing />);
    expect(screen.getByText("title")).toBeInTheDocument();
    const count = getBlogPosts().length;
    expect(screen.getByText(`${count} posts`)).toBeInTheDocument();
  });

  it("renders a dated link for every post, newest first", () => {
    render(<Writing />);
    const posts = getBlogPosts();
    const hrefs = screen.getAllByRole("link").map((l) => l.getAttribute("href"));
    for (const post of posts) {
      expect(screen.getByText(post.title.en)).toBeInTheDocument();
      expect(hrefs).toContain(`/en/blog/${post.slug}`);
    }
    // Post links appear in the sorted (newest-first) order.
    const postHrefs = hrefs.filter((h) => h?.startsWith("/en/blog/"));
    expect(postHrefs).toEqual(posts.map((p) => `/en/blog/${p.slug}`));
  });

  it("links to the full blog index", () => {
    render(<Writing />);
    const allPosts = screen.getByText(/allPosts/);
    expect(allPosts.closest("a")).toHaveAttribute("href", "/en/blog");
  });
});
