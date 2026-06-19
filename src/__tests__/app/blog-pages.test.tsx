import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const notFound = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});
vi.mock("next/navigation", () => ({ notFound: () => notFound() }));

vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => key,
}));

vi.mock("@/components/ui/Navigation", () => ({ Navigation: () => <nav data-testid="nav" /> }));
vi.mock("@/components/ui/Footer", () => ({ Footer: () => <footer data-testid="footer" /> }));
vi.mock("@/components/sections/Blog", () => ({ Blog: () => <div data-testid="blog" /> }));
vi.mock("@/components/blog/BlogPost", () => ({
  BlogPost: ({ post, content }: { post: { slug: string }; content: string }) => (
    <article data-testid="post">
      {post.slug}:{content.slice(0, 12)}
    </article>
  ),
}));

import BlogIndex, { generateMetadata as blogMeta } from "@/app/[locale]/blog/page";
import BlogPostPage, {
  generateMetadata as postMeta,
  generateStaticParams,
} from "@/app/[locale]/blog/[slug]/page";
import { getBlogPosts } from "@/data/blog-posts";

describe("Blog index page", () => {
  it("composes Navigation, Blog, and Footer", () => {
    render(<BlogIndex />);
    expect(screen.getByTestId("nav")).toBeInTheDocument();
    expect(screen.getByTestId("blog")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("builds localized metadata", async () => {
    const meta = await blogMeta({ params: Promise.resolve({ locale: "en" }) });
    expect(meta.alternates?.canonical).toContain("/en/blog");
    expect(meta.openGraph?.locale).toBe("en_US");
  });
});

describe("Blog post page", () => {
  const slug = getBlogPosts()[0]!.slug;

  it("generateStaticParams returns every post × locale", async () => {
    const params = await generateStaticParams();
    expect(params.length).toBe(getBlogPosts().length * 2);
    expect(params).toContainEqual({ slug, locale: "en" });
  });

  it("renders the post with its server-loaded content", async () => {
    render(await BlogPostPage({ params: Promise.resolve({ slug, locale: "en" }) }));
    expect(screen.getByTestId("nav")).toBeInTheDocument();
    expect(screen.getByTestId("post")).toHaveTextContent(slug);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("calls notFound for an unknown slug", async () => {
    await expect(
      BlogPostPage({ params: Promise.resolve({ slug: "nope", locale: "en" }) })
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });

  it("builds article metadata for a real post", async () => {
    const meta = await postMeta({ params: Promise.resolve({ slug, locale: "pt" }) });
    // @ts-expect-error narrow OG union in test
    expect(meta.openGraph?.type).toBe("article");
    expect(meta.alternates?.canonical).toContain(`/pt/blog/${slug}`);
  });

  it("returns a not-found title for an unknown slug's metadata", async () => {
    const meta = await postMeta({
      params: Promise.resolve({ slug: "nope", locale: "en" }),
    });
    expect(String(meta.title)).toMatch(/not found/i);
  });
});
