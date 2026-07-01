import { describe, it, expect } from "vitest";
import { isLocale, locales, defaultLocale } from "../../i18n.config";

describe("i18n.config", () => {
  it("recognizes the supported locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("pt")).toBe(true);
  });

  it("rejects unsupported, miscased, or empty strings", () => {
    expect(isLocale("EN")).toBe(false);
    expect(isLocale("")).toBe(false);
    expect(isLocale("fr")).toBe(false);
  });

  it("exposes the expected locale list and default", () => {
    expect(locales).toEqual(["en", "pt"]);
    expect(defaultLocale).toBe("en");
    expect(locales).toContain(defaultLocale);
  });
});
