import { describe, it, expect, vi, beforeEach } from "vitest";
import { scrollToSection } from "@/lib/scroll";

describe("scrollToSection", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.scrollTo = vi.fn();
  });

  it('scrolls to top when sectionId is "home"', () => {
    scrollToSection("home");
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
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

    scrollToSection("nonexistent");

    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
