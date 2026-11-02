import { describe, it, expect } from "vitest";
import { displayUrl, hostOf, repoHandle } from "@/lib/url";

describe("url helpers", () => {
  it("hostOf drops the scheme, the path and a leading www.", () => {
    expect(hostOf("https://fortuna.up.railway.app/")).toBe("fortuna.up.railway.app");
    expect(hostOf("https://www.linkedin.com/in/renan-rambul/")).toBe("linkedin.com");
  });

  it("displayUrl keeps the path but drops the trailing slash", () => {
    expect(displayUrl("https://renanrambul.dev")).toBe("renanrambul.dev");
    expect(displayUrl("https://github.com/rrambul")).toBe("github.com/rrambul");
    expect(displayUrl("https://www.linkedin.com/in/renan-rambul/")).toBe(
      "linkedin.com/in/renan-rambul"
    );
  });

  it("repoHandle returns owner/repo", () => {
    expect(repoHandle("https://github.com/rrambul/portifolio")).toBe("rrambul/portifolio");
    expect(repoHandle("https://github.com/animavita/animavita/")).toBe("animavita/animavita");
  });
});
