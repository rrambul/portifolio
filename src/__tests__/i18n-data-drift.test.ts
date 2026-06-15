import { describe, it, expect } from "vitest";
import en from "@/messages/en/index.json";
import pt from "@/messages/pt/index.json";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experiences";
import { skillCategories } from "@/data/skills";

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
});
