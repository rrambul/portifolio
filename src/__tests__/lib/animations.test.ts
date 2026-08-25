import { describe, it, expect } from "vitest";
import { staggerContainer, fadeInUp } from "@/lib/animations";

describe("staggerContainer", () => {
  it("has hidden state with opacity 0", () => {
    expect(staggerContainer.hidden).toEqual({ opacity: 0 });
  });

  it("has show state with opacity 1 and staggerChildren", () => {
    const show = staggerContainer.show as Record<string, unknown>;
    expect(show.opacity).toBe(1);
    expect(show.transition).toEqual({ staggerChildren: 0.15 });
  });
});

describe("fadeInUp", () => {
  it("has hidden state with opacity 0 and y offset", () => {
    expect(fadeInUp.hidden).toEqual({ opacity: 0, y: 20 });
  });

  it("has show state with opacity 1 and y 0", () => {
    const show = fadeInUp.show as Record<string, unknown>;
    expect(show.opacity).toBe(1);
    expect(show.y).toBe(0);
    expect(show.transition).toEqual({ duration: 0.5 });
  });
});
