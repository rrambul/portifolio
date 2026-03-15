import { describe, it, expect } from "vitest";
import robots from "@/app/robots";

describe("robots", () => {
  const result = robots();

  it("returns rules array", () => {
    expect(result.rules).toBeDefined();
    expect(Array.isArray(result.rules)).toBe(true);
  });

  it("allows general crawlers on /", () => {
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const generalRule = rules.find(
      (r) => r.userAgent === "*"
    );
    expect(generalRule).toBeDefined();
    expect(generalRule!.allow).toBe("/");
  });

  it("disallows /api/ for general crawlers", () => {
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const generalRule = rules.find(
      (r) => r.userAgent === "*"
    );
    expect(generalRule!.disallow).toContain("/api/");
  });

  it("blocks AI bots", () => {
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const gptBot = rules.find((r) => r.userAgent === "GPTBot");
    expect(gptBot).toBeDefined();
    expect(gptBot!.disallow).toBe("/");

    const chatGPT = rules.find((r) => r.userAgent === "ChatGPT-User");
    expect(chatGPT).toBeDefined();
    expect(chatGPT!.disallow).toBe("/");
  });

  it("has sitemap URL", () => {
    expect(result.sitemap).toContain("sitemap.xml");
  });
});
