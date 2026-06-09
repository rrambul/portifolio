import { describe, it, expect } from "vitest";
import {
  blogPosts,
  getBlogPosts,
  getBlogPost,
  getBlogPostsByTag,
} from "@/data/blog-posts";

describe("blogPosts", () => {
  it("contains at least one blog post", () => {
    expect(blogPosts.length).toBeGreaterThan(0);
  });

  it("each post has required fields", () => {
    for (const post of blogPosts) {
      expect(post.id).toBeTruthy();
      expect(post.slug).toBeTruthy();
      expect(post.title.en).toBeTruthy();
      expect(post.title.pt).toBeTruthy();
      expect(post.excerpt.en).toBeTruthy();
      expect(post.excerpt.pt).toBeTruthy();
      expect(post.date).toBeTruthy();
      expect(post.tags.length).toBeGreaterThan(0);
      expect(post.readTime).toBeGreaterThan(0);
      expect(post.author.name).toBeTruthy();
    }
  });

  it("each post has a unique slug", () => {
    const slugs = blogPosts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("each post has a unique id", () => {
    const ids = blogPosts.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("getBlogPosts", () => {
  it("returns all posts sorted by date descending", () => {
    const posts = getBlogPosts();
    expect(posts.length).toBe(blogPosts.length);

    for (let i = 0; i < posts.length - 1; i++) {
      const current = new Date(posts[i].date).getTime();
      const next = new Date(posts[i + 1].date).getTime();
      expect(current).toBeGreaterThanOrEqual(next);
    }
  });
});

describe("getBlogPost", () => {
  it("returns a post by slug", () => {
    const firstSlug = blogPosts[0].slug;
    const post = getBlogPost(firstSlug);
    expect(post).toBeDefined();
    expect(post!.slug).toBe(firstSlug);
  });

  it("returns undefined for unknown slug", () => {
    const post = getBlogPost("nonexistent-slug");
    expect(post).toBeUndefined();
  });
});

describe("getBlogPostsByTag", () => {
  it("returns posts matching a tag (case-insensitive)", () => {
    const firstTag = blogPosts[0].tags[0];
    const posts = getBlogPostsByTag(firstTag);
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      const hasTag = post.tags.some(
        (t) => t.toLowerCase() === firstTag.toLowerCase()
      );
      expect(hasTag).toBe(true);
    }
  });

  it("returns empty array for unknown tag", () => {
    const posts = getBlogPostsByTag("definitely-not-a-real-tag-xyz");
    expect(posts).toEqual([]);
  });
});
