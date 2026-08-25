import { describe, it, expect } from "vitest";
import { interests } from "@/data/interests";

describe("interests", () => {
  it("contains at least one interest", () => {
    expect(interests.length).toBeGreaterThan(0);
  });

  it("each interest has a key and an icon", () => {
    for (const interest of interests) {
      expect(interest.key).toBeTruthy();
      expect(typeof interest.icon).toBe("function"); // React icon component
    }
  });

  it("each interest has a unique key", () => {
    const keys = interests.map((i) => i.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
