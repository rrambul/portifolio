import { describe, it, expect } from "vitest";
import { siteOgFields } from "@/lib/og";
import { siteConfig } from "@/config/site";

describe("siteOgFields", () => {
  it("uses the Portuguese role and footer for pt", () => {
    const fields = siteOgFields("pt");
    expect(fields.subtitle).toBe("Engenheiro de Software Sênior");
    expect(fields.footer).toBe("7+ anos construindo produtos web de ponta a ponta");
  });

  it("uses the English role and footer for en", () => {
    const fields = siteOgFields("en");
    expect(fields.subtitle).toBe("Senior Software Engineer");
    expect(fields.footer).toBe("7+ years building web products end to end");
  });

  it("falls back to English for any other locale", () => {
    expect(siteOgFields("anything-else").subtitle).toBe("Senior Software Engineer");
  });

  it("carries the site name as the title and the bare host as the eyebrow", () => {
    const fields = siteOgFields("en");
    expect(fields.title).toBe(siteConfig.name);
    expect(fields.eyebrow).toBe("renanrambul.dev");
  });
});
