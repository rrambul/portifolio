import { describe, it, expect } from "vitest";

/**
 * The next-intl middleware must skip API routes, Next internals, and any path
 * carrying a file extension (sitemap.xml, favicon.ico, static chunks). It must
 * still run for locale-negotiable page routes. This guards that matcher.
 *
 * Importing middleware.ts crashes outside the Next runtime (next-intl reaches
 * for "next/server"), so this pattern is a verbatim mirror of the literal in
 * the repo-root middleware.ts (config.matcher[0]). Keep the two in sync.
 */
const pattern = "/((?!api|_next|.*\\..*).*)";
// Next.js applies the matcher as a full-path match, so anchor it the same way.
const matcher = new RegExp(`^${pattern}$`);

describe("middleware config.matcher", () => {
  it.each([
    "/api/contact",
    "/_next/static/chunk.js",
    "/sitemap.xml",
    "/robots.txt",
    "/favicon.ico",
  ])("does not match %s", (path) => {
    expect(matcher.test(path)).toBe(false);
  });

  it.each(["/", "/about", "/en/blog/some-post"])(
    "matches %s",
    (path) => {
      expect(matcher.test(path)).toBe(true);
    },
  );
});
