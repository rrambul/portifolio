import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  const result = sitemap();

  it("returns an array of sitemap entries", () => {
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("includes static pages for both locales", () => {
    const urls = result.map((entry) => entry.url);
    expect(urls).toContain("https://renanrambul.dev/en");
    expect(urls).toContain("https://renanrambul.dev/pt");
    expect(urls).toContain("https://renanrambul.dev/en/blog");
    expect(urls).toContain("https://renanrambul.dev/pt/blog");
    expect(urls).toContain("https://renanrambul.dev/en/learning");
    expect(urls).toContain("https://renanrambul.dev/pt/learning");
  });

  it("includes blog post pages for both locales", () => {
    const urls = result.map((entry) => entry.url);
    const blogPostUrls = urls.filter(
      (url) => url.includes("/blog/") && !url.endsWith("/blog")
    );
    // Each blog post appears twice (en + pt)
    expect(blogPostUrls.length).toBeGreaterThan(0);
    expect(blogPostUrls.length % 2).toBe(0);
  });

  it("homepage has priority 1", () => {
    const homePage = result.find(
      (entry) => entry.url === "https://renanrambul.dev/en"
    );
    expect(homePage?.priority).toBe(1);
  });

  it("blog index has priority 0.8", () => {
    const blogIndex = result.find(
      (entry) => entry.url === "https://renanrambul.dev/en/blog"
    );
    expect(blogIndex?.priority).toBe(0.8);
  });

  it("blog posts have priority 0.6", () => {
    const blogPosts = result.filter(
      (entry) =>
        entry.url.includes("/blog/") && !entry.url.endsWith("/blog")
    );
    for (const post of blogPosts) {
      expect(post.priority).toBe(0.6);
    }
  });

  it("all entries have lastModified dates", () => {
    for (const entry of result) {
      expect(entry.lastModified).toBeDefined();
    }
  });
});
