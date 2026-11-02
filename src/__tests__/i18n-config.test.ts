import { describe, it, expect } from "vitest";
import {
  isLocale,
  locales,
  defaultLocale,
  toLocale,
  localeTag,
  ogLocale,
} from "@/i18n/config";

describe("i18n config", () => {
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

  it("narrows an untyped locale, falling back to the default", () => {
    expect(toLocale("pt")).toBe("pt");
    expect(toLocale("fr")).toBe("en");
    expect(toLocale("")).toBe("en");
  });

  it("maps locales to Intl tags and OpenGraph codes", () => {
    expect(localeTag("pt")).toBe("pt-BR");
    expect(localeTag("en")).toBe("en-US");
    expect(localeTag("anything-else")).toBe("en-US");
    expect(ogLocale("pt")).toBe("pt_BR");
    expect(ogLocale("en")).toBe("en_US");
    expect(ogLocale("anything-else")).toBe("en_US");
  });
});
