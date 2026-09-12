import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  const result = sitemap();

  it("returns an array of sitemap entries", () => {
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("includes the homepage for both locales", () => {
    const urls = result.map((entry) => entry.url);
    expect(urls).toContain("https://renanrambul.dev/en");
    expect(urls).toContain("https://renanrambul.dev/pt");
  });

  it("omits the temporarily disabled blog and learning routes", () => {
    const urls = result.map((entry) => entry.url);
    expect(urls.some((url) => url.includes("/blog"))).toBe(false);
    expect(urls.some((url) => url.includes("/learning"))).toBe(false);
  });

  it("homepage has priority 1", () => {
    const homePage = result.find(
      (entry) => entry.url === "https://renanrambul.dev/en"
    );
    expect(homePage?.priority).toBe(1);
  });

  it("all entries have lastModified dates", () => {
    for (const entry of result) {
      expect(entry.lastModified).toBeDefined();
    }
  });
});
