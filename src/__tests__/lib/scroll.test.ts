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

  it("scrolls to element with default nav offset", () => {
    const mockElement = { offsetTop: 500 } as HTMLElement;
    vi.spyOn(document, "getElementById").mockReturnValue(mockElement);

    scrollToSection("about");

    expect(document.getElementById).toHaveBeenCalledWith("about");
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 420, // 500 - 80 (default nav height)
      behavior: "smooth",
    });
  });

  it("scrolls to element with custom nav height", () => {
    const mockElement = { offsetTop: 300 } as HTMLElement;
    vi.spyOn(document, "getElementById").mockReturnValue(mockElement);

    scrollToSection("contact", 100);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 200, // 300 - 100
      behavior: "smooth",
    });
  });

  it("does nothing when element is not found", () => {
    vi.spyOn(document, "getElementById").mockReturnValue(null);

    scrollToSection("nonexistent");

    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
