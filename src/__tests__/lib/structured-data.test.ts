import { describe, it, expect } from "vitest";
import { buildPersonJsonLd, buildWebSiteJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site";

describe("buildPersonJsonLd", () => {
  it("is a Person schema rooted at the site url", () => {
    const person = buildPersonJsonLd();
    expect(person["@type"]).toBe("Person");
    expect(person["@context"]).toBe("https://schema.org");
    expect(person.url).toBe(siteConfig.url);
    expect(person.name).toBe(siteConfig.name);
  });

  it("keeps the hardcoded job title (siteConfig has no jobTitle field)", () => {
    expect(buildPersonJsonLd().jobTitle).toBe("Software Engineer");
  });

  it("exposes the social profiles via sameAs", () => {
    const { sameAs } = buildPersonJsonLd();
    expect(sameAs).toContain(siteConfig.links.github);
    expect(sameAs).toContain(siteConfig.links.linkedin);
    expect(sameAs).toContain(siteConfig.links.x);
  });

  it("never ships a null or undefined sameAs entry", () => {
    const { sameAs } = buildPersonJsonLd();
    for (const entry of sameAs) {
      expect(entry).toBeTruthy();
      expect(typeof entry).toBe("string");
    }
    expect(sameAs.includes(null as unknown as string)).toBe(false);
    expect(sameAs.includes(undefined as unknown as string)).toBe(false);
  });
});

describe("buildWebSiteJsonLd", () => {
  it("is a WebSite schema matching the site identity", () => {
    const site = buildWebSiteJsonLd();
    expect(site["@type"]).toBe("WebSite");
    expect(site["@context"]).toBe("https://schema.org");
    expect(site.name).toBe(`${siteConfig.name} Portfolio`);
    expect(site.url).toBe(siteConfig.url);
    expect(site.description).toBe(siteConfig.description);
  });

  it("advertises the supported locales", () => {
    expect(buildWebSiteJsonLd().inLanguage).toEqual(siteConfig.locale.supported);
  });
});
