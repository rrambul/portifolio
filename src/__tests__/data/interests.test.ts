import { describe, it, expect } from "vitest";
import { interests } from "@/data/interests";

describe("interests", () => {
  it("contains at least one interest", () => {
    expect(interests.length).toBeGreaterThan(0);
  });

  it("each interest is a non-empty key", () => {
    for (const key of interests) {
      expect(key).toBeTruthy();
      expect(typeof key).toBe("string");
    }
  });

  it("each interest has a unique key", () => {
    expect(new Set(interests).size).toBe(interests.length);
  });
});
