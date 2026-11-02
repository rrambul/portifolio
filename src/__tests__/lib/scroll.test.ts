import { describe, it, expect, vi, beforeEach } from "vitest";
import { scrollToSection } from "@/lib/scroll";

describe("scrollToSection", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("scrolls the target element into view", () => {
    const scrollIntoView = vi.fn();
    const mockElement = { scrollIntoView } as unknown as HTMLElement;
    vi.spyOn(document, "getElementById").mockReturnValue(mockElement);

    scrollToSection("about");

    expect(document.getElementById).toHaveBeenCalledWith("about");
    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });

  it("does nothing when element is not found", () => {
    vi.spyOn(document, "getElementById").mockReturnValue(null);
    expect(() => scrollToSection("nonexistent")).not.toThrow();
  });
});
