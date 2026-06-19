import { describe, it, expect } from "vitest";
import manifest from "@/app/manifest";
import { siteConfig } from "@/config/site";

describe("manifest", () => {
  it("derives identity from siteConfig (so it cannot drift)", () => {
    const m = manifest();
    expect(m.name).toContain(siteConfig.name);
    expect(m.description).toBe(siteConfig.description);
    expect(m.short_name).toBe(siteConfig.name);
    expect(m.start_url).toBe("/");
  });

  it("references only icon assets that exist under /favicon", () => {
    const m = manifest();
    expect(m.icons?.length).toBeGreaterThan(0);
    for (const icon of m.icons ?? []) {
      expect(icon.src).toMatch(/^\/favicon\//);
    }
  });
});
