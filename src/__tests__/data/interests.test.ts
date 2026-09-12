import { describe, it, expect } from "vitest";
import { positions, changedMyMind } from "@/data/interests";

describe("interests", () => {
  describe.each([
    ["positions", positions],
    ["changedMyMind", changedMyMind],
  ])("%s", (_name, list: readonly string[]) => {
    it("contains at least one key", () => {
      expect(list.length).toBeGreaterThan(0);
    });

    it("every key is a non-empty string", () => {
      for (const key of list) {
        expect(key).toBeTruthy();
        expect(typeof key).toBe("string");
      }
    });

    it("has no duplicate keys", () => {
      expect(new Set(list).size).toBe(list.length);
    });
  });
});
