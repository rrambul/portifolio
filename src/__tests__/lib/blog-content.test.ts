import { describe, it, expect } from "vitest";
import { getBlogPostContent } from "@/lib/blog-content";

describe("getBlogPostContent", () => {
  it("reads the English markdown body for a known slug", () => {
    const md = getBlogPostContent("a-brief-introduction", "en");
    expect(md).toContain("# A Brief Introduction");
  });

  it("reads the Portuguese markdown body", () => {
    const md = getBlogPostContent("a-brief-introduction", "pt");
    expect(md).toContain("Uma Breve Apresentação");
  });

  it("throws for an unknown slug", () => {
    expect(() => getBlogPostContent("does-not-exist", "en")).toThrow();
  });
});
