import { describe, it, expect } from "vitest";
import { siteConfig } from "@/config/site";

describe("siteConfig", () => {
  it("has required top-level fields", () => {
    expect(siteConfig.name).toBe("Renan Rambul");
    expect(siteConfig.title).toContain("Renan Rambul");
    expect(siteConfig.description).toBeTruthy();
    expect(siteConfig.url).toMatch(/^https:\/\//);
    expect(siteConfig.ogImage).toBeTruthy();
  });

  it("has valid social links", () => {
    expect(siteConfig.links.github).toMatch(/^https:\/\/github\.com\//);
    expect(siteConfig.links.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
    expect(siteConfig.links.email).toContain("@");
    expect(siteConfig.links.twitter).toBeTruthy();
  });

  it("has locale configuration with en and pt", () => {
    expect(siteConfig.locale.default).toBe("en");
    expect(siteConfig.locale.supported).toContain("en");
    expect(siteConfig.locale.supported).toContain("pt");
  });
});
