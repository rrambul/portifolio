import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@/lib/scroll", () => ({ scrollToSection: vi.fn() }));

import { scrollToSection } from "@/lib/scroll";
import {
  anchor,
  anchorIds,
  homeItem,
  isAnchor,
  navItems,
  navigateTo,
} from "@/lib/nav";

const router = { push: vi.fn() };

beforeEach(() => {
  router.push.mockClear();
  vi.mocked(scrollToSection).mockClear();
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("nav model", () => {
  it("lists learning as the one route and everything else as anchors", () => {
    const routes = navItems.filter((item) => !isAnchor(item));
    expect(routes.map((item) => item.id)).toEqual(["learning"]);
    expect(anchorIds).toEqual(["about", "experience", "projects", "contact"]);
  });

  it("points the brand at the locale root", () => {
    expect(homeItem).toEqual({ id: "home", kind: "route", path: "" });
  });

  it("builds an anchor item from a section id", () => {
    expect(anchor("contact")).toEqual({ id: "contact", kind: "anchor" });
  });
});

describe("navigateTo", () => {
  it("pushes a route under the locale prefix", () => {
    navigateTo(router, "pt", { id: "learning", kind: "route", path: "/learning" });
    expect(router.push).toHaveBeenCalledWith("/pt/learning");
    expect(scrollToSection).not.toHaveBeenCalled();
  });

  it("pushes the bare locale for the home item", () => {
    navigateTo(router, "en", homeItem);
    expect(router.push).toHaveBeenCalledWith("/en");
  });

  it("scrolls when the anchor's section is on the page", () => {
    const section = document.createElement("div");
    section.id = "about";
    document.body.appendChild(section);

    navigateTo(router, "en", anchor("about"));
    expect(scrollToSection).toHaveBeenCalledWith("about");
    expect(router.push).not.toHaveBeenCalled();
  });

  it("routes to the homepage hash when the section is not on the page", () => {
    // This is the /learning case: the footer and nav must still get there.
    navigateTo(router, "en", anchor("about"));
    expect(router.push).toHaveBeenCalledWith("/en#about");
    expect(scrollToSection).not.toHaveBeenCalled();
  });

  it("waits out the given delay before scrolling", () => {
    vi.useFakeTimers();
    const section = document.createElement("div");
    section.id = "projects";
    document.body.appendChild(section);

    navigateTo(router, "en", anchor("projects"), { scrollDelayMs: 300 });
    expect(scrollToSection).not.toHaveBeenCalled();
    vi.advanceTimersByTime(300);
    expect(scrollToSection).toHaveBeenCalledWith("projects");
  });
});
