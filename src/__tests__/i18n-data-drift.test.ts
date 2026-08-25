import { describe, it, expect } from "vitest";
import en from "@/messages/en/index.json";
import pt from "@/messages/pt/index.json";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experiences";
import { skillCategories } from "@/data/skills";
import { interests } from "@/data/interests";

/**
 * Guards the coupling between the data files (which carry bare string keys)
 * and the message files. Without this, adding a project/experience/skill and
 * forgetting its translation would silently render the raw key at runtime,
 * with no type error and no other failing test.
 */
const locales = { en, pt };

function resolve(obj: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      obj
    );
}

describe.each(Object.entries(locales))("%s message keys", (_name, m) => {
  it("resolves every project title and description key", () => {
    for (const p of projects) {
      expect(resolve(m.projects, p.titleKey), p.titleKey).toBeTypeOf("string");
      expect(resolve(m.projects, p.descriptionKey), p.descriptionKey).toBeTypeOf("string");
    }
  });

  it("resolves every experience company key (title + arrays)", () => {
    for (const e of experiences) {
      const company = resolve(m.experience.companies, e.i18nKey) as
        | Record<string, unknown>
        | undefined;
      expect(company, `experience.companies.${e.i18nKey}`).toBeTruthy();
      expect(company?.title).toBeTypeOf("string");
      expect(Array.isArray(company?.responsibilities)).toBe(true);
      expect(Array.isArray(company?.skills)).toBe(true);
    }
  });

  it("resolves every skill category title key", () => {
    for (const cat of skillCategories) {
      expect(resolve(m.skills, cat.titleKey), `skills.${cat.titleKey}`).toBeTypeOf("string");
    }
  });

  it("resolves every interest item key", () => {
    for (const key of interests) {
      expect(
        resolve(m, `interests.items.${key}`),
        `interests.items.${key}`
      ).toBeTypeOf("string");
    }
  });
});

/**
 * Structural parity between the two message trees. The data-key tests above
 * only cover copy referenced from data files; this catches component-literal
 * keys (the Hero changelog, contact validation, nav, etc.) and per-locale
 * array-length drift (e.g. a responsibilities bullet added to one locale only).
 */
describe("message tree parity (en <-> pt)", () => {
  function leafPaths(value: unknown, prefix = ""): string[] {
    if (Array.isArray(value)) {
      // Encode the length so arrays of differing size are caught as drift.
      return [`${prefix}[len=${value.length}]`];
    }
    if (value && typeof value === "object") {
      return Object.entries(value as Record<string, unknown>)
        .flatMap(([key, v]) =>
          leafPaths(v, prefix ? `${prefix}.${key}` : key)
        );
    }
    return [prefix];
  }

  it("en and pt expose the same key paths and array lengths", () => {
    expect(leafPaths(en).sort()).toEqual(leafPaths(pt).sort());
  });
});
