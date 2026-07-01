import { describe, it, expect } from "vitest";
import { stripLocale } from "@/lib/strip-locale";

describe("stripLocale", () => {
  it("removes the en/pt locale prefix from a nested path", () => {
    expect(stripLocale("/en/about")).toBe("/about");
    expect(stripLocale("/pt/about")).toBe("/about");
    expect(stripLocale("/en/blog/some-post")).toBe("/blog/some-post");
  });

  it("produces a locale-agnostic key (en and pt collapse to the same path)", () => {
    expect(stripLocale("/pt/about")).toBe(stripLocale("/en/about"));
    expect(stripLocale("/pt/blog/x")).toBe(stripLocale("/en/blog/x"));
  });

  it("normalizes a bare locale to the root", () => {
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/pt")).toBe("/");
  });

  it("leaves the root and locale-less paths untouched", () => {
    expect(stripLocale("/")).toBe("/");
    expect(stripLocale("/about")).toBe("/about");
    expect(stripLocale("/blog/some-post")).toBe("/blog/some-post");
  });

  it("does not false-match a path that merely starts with locale letters", () => {
    // The locale must be a full path segment, so `/end` must not collapse to
    // "/d" (or "d"); it stays intact.
    expect(stripLocale("/end")).toBe("/end");
    expect(stripLocale("/enter")).toBe("/enter");
    expect(stripLocale("/ptolemy")).toBe("/ptolemy");
  });
});
