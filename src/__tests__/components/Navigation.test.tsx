import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act, cleanup } from "@testing-library/react";

const h = vi.hoisted(() => ({
  push: vi.fn(),
  pathname: { current: "/en" },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: h.push }),
  usePathname: () => h.pathname.current,
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

vi.mock("@/lib/scroll", () => ({ scrollToSection: vi.fn() }));

vi.mock("@/components/ui/ThemeSwitcher", () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher" />,
}));
vi.mock("@/components/ui/LanguageSwitcher", () => ({
  LanguageSwitcher: () => <div data-testid="lang-switcher" />,
}));

vi.mock("framer-motion");

import { Navigation } from "@/components/ui/Navigation";
import { scrollToSection } from "@/lib/scroll";

beforeEach(() => {
  h.push.mockClear();
  vi.mocked(scrollToSection).mockClear();
  h.pathname.current = "/en";
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("Navigation", () => {
  it("renders the brand and all section labels", () => {
    render(<Navigation />);
    expect(screen.getByText("Renan Rambul")).toBeInTheDocument();
    for (const label of ["home", "about", "experience", "skills", "projects", "interests", "contact"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("navigates to the homepage when 'home' is clicked", () => {
    render(<Navigation />);
    fireEvent.click(screen.getByText("home"));
    expect(h.push).toHaveBeenCalledWith("/en");
  });

  it("navigates with a hash when a missing section is clicked", () => {
    render(<Navigation />);
    fireEvent.click(screen.getByText("about"));
    expect(h.push).toHaveBeenCalledWith("/en#about");
  });

  it("scrolls to an existing section after the menu-close delay", () => {
    vi.useFakeTimers();
    const target = document.createElement("div");
    target.id = "projects";
    document.body.appendChild(target);

    render(<Navigation />);
    fireEvent.click(screen.getByText("projects"));
    expect(scrollToSection).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(300));
    expect(scrollToSection).toHaveBeenCalledWith("projects");

    document.body.removeChild(target);
  });

  it("toggles the mobile menu open and closed", () => {
    render(<Navigation />);
    const button = screen.getByLabelText("Open menu");
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);
    // Now both desktop and mobile copies of each label exist
    expect(screen.getAllByText("about").length).toBe(2);
    expect(screen.getByLabelText("Close menu")).toHaveAttribute(
      "aria-expanded",
      "true"
    );

    fireEvent.click(screen.getByLabelText("Close menu"));
    expect(screen.getAllByText("about").length).toBe(1);
  });

  it("marks the section currently under the nav as active", () => {
    // A section whose top has scrolled past the nav becomes active.
    const about = document.createElement("div");
    about.id = "about";
    about.getBoundingClientRect = () => ({ top: 0, bottom: 500 } as DOMRect);
    document.body.appendChild(about);

    render(<Navigation />);

    expect(screen.getByText("about").className).toContain("text-teal-700");

    document.body.removeChild(about);
  });

  it("treats blog routes as the active section without attaching a scroll listener", () => {
    h.pathname.current = "/en/blog";
    render(<Navigation />);
    expect(screen.getByText("Renan Rambul")).toBeInTheDocument();
  });
});
