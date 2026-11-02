import { scrollToSection } from "@/lib/scroll";

/**
 * Where the site can send a visitor. An `anchor` is a homepage section (a
 * `<Section id>`); a `route` is a page of its own under the locale prefix.
 * The nav bar and the footer go through `navigateTo`, so there is one answer
 * to "what happens when this is clicked from /learning". The Hero calls
 * `scrollToSection` directly because it only renders on the homepage; reuse
 * any of its buttons elsewhere and they must switch to `navigateTo`.
 */
export type NavItem =
  | { id: string; kind: "anchor" }
  | { id: string; kind: "route"; path: string };

export type AnchorItem = Extract<NavItem, { kind: "anchor" }>;

/** The brand button: the top of the homepage. */
export const homeItem: NavItem = { id: "home", kind: "route", path: "" };

/**
 * The nav bar, in order. Kept short on purpose: a single-page scroll does not
 * need an index of itself, and "home" is already the brand button; Skills and
 * Interests are reachable by scrolling past the sections that introduce them.
 * Learning is here because it is a separate route, so scrolling never reaches
 * it. The `id` doubles as the key under `navigation` in the message files.
 */
export const navItems: readonly NavItem[] = [
  { id: "about", kind: "anchor" },
  { id: "experience", kind: "anchor" },
  { id: "projects", kind: "anchor" },
  { id: "learning", kind: "route", path: "/learning" },
  { id: "contact", kind: "anchor" },
];

export function isAnchor(item: NavItem): item is AnchorItem {
  return item.kind === "anchor";
}

/** Section ids the active-section sweep may highlight. A route never is. */
export const anchorIds: readonly string[] = navItems
  .filter(isAnchor)
  .map((item) => item.id);

/** Shorthand for callers that only ever point at homepage sections. */
export function anchor(id: string): AnchorItem {
  return { id, kind: "anchor" };
}

/**
 * The one method of Next's router this module needs, so callers and tests can
 * hand in anything with a `push`.
 */
export interface NavRouter {
  push: (href: string) => void;
}

export interface NavigateOptions {
  /**
   * Wait before scrolling. The nav uses it so the mobile menu finishes
   * collapsing first; its height change would otherwise throw off the final
   * position. The offset under the sticky nav itself is `scroll-margin-top`
   * in globals.css.
   */
  scrollDelayMs?: number;
}

/**
 * Send the visitor to an item from wherever they are. A route always pushes.
 * An anchor scrolls when its section is on the current page, and otherwise
 * routes to the homepage with the hash, which is what keeps the footer and
 * the nav working from a page that has no sections.
 */
export function navigateTo(
  router: NavRouter,
  locale: string,
  item: NavItem,
  { scrollDelayMs = 0 }: NavigateOptions = {}
): void {
  if (item.kind === "route") {
    router.push(`/${locale}${item.path}`);
    return;
  }

  if (!document.getElementById(item.id)) {
    router.push(`/${locale}#${item.id}`);
    return;
  }

  if (scrollDelayMs > 0) {
    setTimeout(() => scrollToSection(item.id), scrollDelayMs);
    return;
  }
  scrollToSection(item.id);
}
