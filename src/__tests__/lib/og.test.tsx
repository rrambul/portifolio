import { describe, it, expect } from "vitest";
import { siteOgFields, ogEyebrow } from "@/lib/og";
import { siteConfig } from "@/config/site";

describe("siteOgFields", () => {
  it("uses the Portuguese subtitle for pt", () => {
    expect(siteOgFields("pt").subtitle).toBe("Engenheiro de Software");
  });

  it("uses the English subtitle for en", () => {
    expect(siteOgFields("en").subtitle).toBe("Software Engineer");
  });

  it("falls back to the English subtitle for any other locale", () => {
    expect(siteOgFields("anything-else").subtitle).toBe("Software Engineer");
  });

  it("carries the site name as the title and a stable footer", () => {
    const fields = siteOgFields("en");
    expect(fields.title).toBe(siteConfig.name);
    expect(fields.footer).toBe("7+ years building web products end to end");
  });

  it("strips the protocol from siteConfig.url for the eyebrow", () => {
    expect(siteOgFields("en").eyebrow).toBe("renanrambul.dev");
    expect(siteOgFields("en").eyebrow).not.toMatch(/^https?:\/\//);
  });
});

describe("ogEyebrow", () => {
  it("returns the bare host with no suffix", () => {
    expect(ogEyebrow()).toBe(
      siteConfig.url.replace(/^https?:\/\//, "")
    );
  });

  it("appends a path suffix to the bare host", () => {
    expect(ogEyebrow("/blog")).toBe("renanrambul.dev/blog");
  });
});
