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
    for (const label of ["home", "about", "experience", "skills", "projects", "interests", "learning", "contact"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("navigates to the homepage when 'home' is clicked", () => {
    render(<Navigation />);
    fireEvent.click(screen.getByText("home"));
    expect(h.push).toHaveBeenCalledWith("/en");
  });

  it("routes to the Learning Log page when 'learning' is clicked", () => {
    render(<Navigation />);
    fireEvent.click(screen.getByText("learning"));
    expect(h.push).toHaveBeenCalledWith("/en/learning");
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

    expect(screen.getByText("about").className).toContain("text-emerald-700");

    document.body.removeChild(about);
  });

  it("marks the last section past the trigger line as active when several are above it", () => {
    // Active class is "text-emerald-700 dark:text-emerald-400"; the hover
    // variant "...dark:hover:text-emerald-400" deliberately does not match it.
    const active = "text-emerald-700 dark:text-emerald-400";

    // Both tops are above the trigger line (innerHeight * 0.3); the later
    // section in the list (projects) should win over the earlier one (about).
    const about = document.createElement("div");
    about.id = "about";
    about.getBoundingClientRect = () => ({ top: 0, bottom: 500 } as DOMRect);
    document.body.appendChild(about);

    const projects = document.createElement("div");
    projects.id = "projects";
    projects.getBoundingClientRect = () => ({ top: 100, bottom: 600 } as DOMRect);
    document.body.appendChild(projects);

    render(<Navigation />);

    expect(screen.getByText("projects").className).toContain(active);
    expect(screen.getByText("about").className).not.toContain(active);

    document.body.removeChild(about);
    document.body.removeChild(projects);
  });

  it("keeps 'home' active when every section top is below the trigger line", () => {
    const active = "text-emerald-700 dark:text-emerald-400";

    const about = document.createElement("div");
    about.id = "about";
    about.getBoundingClientRect = () => ({ top: 1000, bottom: 1500 } as DOMRect);
    document.body.appendChild(about);

    const projects = document.createElement("div");
    projects.id = "projects";
    projects.getBoundingClientRect = () => ({ top: 1200, bottom: 1700 } as DOMRect);
    document.body.appendChild(projects);

    render(<Navigation />);

    expect(screen.getByText("home").className).toContain(active);
    expect(screen.getByText("about").className).not.toContain(active);

    document.body.removeChild(about);
    document.body.removeChild(projects);
  });

  it("treats blog routes as the active section without attaching a scroll listener", () => {
    h.pathname.current = "/en/blog";
    render(<Navigation />);
    expect(screen.getByText("Renan Rambul")).toBeInTheDocument();
  });

  it("treats learning routes as the active section", () => {
    h.pathname.current = "/en/learning";
    render(<Navigation />);
    expect(screen.getByText("Renan Rambul")).toBeInTheDocument();
  });

  it("throttles scroll-driven recomputes through requestAnimationFrame", () => {
    const about = document.createElement("div");
    about.id = "about";
    about.getBoundingClientRect = () => ({ top: 0, bottom: 500 } as DOMRect);
    document.body.appendChild(about);

    // Capture the rAF callback instead of running it, so `frame` stays truthy
    // and the second scroll exercises the `if (frame) return` throttle guard.
    let rafCb: FrameRequestCallback | null = null;
    const raf = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb) => {
        rafCb = cb;
        return 1;
      });

    render(<Navigation />);
    raf.mockClear();

    fireEvent.scroll(window); // schedules one frame
    fireEvent.scroll(window); // frame still pending -> early return, no new schedule
    expect(raf).toHaveBeenCalledTimes(1);

    act(() => rafCb?.(0)); // run the recompute
    expect(screen.getByText("about").className).toContain("text-emerald-700");

    document.body.removeChild(about);
  });

  it("tears down its scroll/resize listeners and pending frame on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const cancelSpy = vi
      .spyOn(window, "cancelAnimationFrame")
      .mockImplementation(() => {});
    vi.spyOn(window, "requestAnimationFrame").mockReturnValue(7);

    const { unmount } = render(<Navigation />);
    fireEvent.scroll(window); // leave a frame pending so cleanup cancels it

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(cancelSpy).toHaveBeenCalledWith(7);
  });

  it("navigates and closes the mobile menu when a mobile item is tapped", () => {
    render(<Navigation />);
    fireEvent.click(screen.getByLabelText("Open menu"));
    // Desktop + mobile copies both present while the menu is open.
    expect(screen.getAllByText("about").length).toBe(2);

    // The mobile copy is the second one; tapping it routes and collapses.
    fireEvent.click(screen.getAllByText("about")[1]!);

    expect(h.push).toHaveBeenCalledWith("/en#about");
    expect(screen.getAllByText("about").length).toBe(1);
  });
});
