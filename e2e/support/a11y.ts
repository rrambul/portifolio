import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import en from "../../src/messages/en/index.json";
import pt from "../../src/messages/pt/index.json";

export type Theme = "light" | "dark";

/** The theme switcher's aria-label in either locale. */
const THEME_LABEL = new RegExp(
  [en.theme.light, en.theme.dark, pt.theme.light, pt.theme.dark]
    .map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|"),
  "i"
);

/** Persist a theme choice before the page loads; next-themes reads it from localStorage. */
export async function setTheme(page: Page, theme: Theme) {
  await page.addInitScript((t) => {
    try {
      localStorage.setItem("theme", t);
    } catch {}
  }, theme);
}

/**
 * Wait for the page to hydrate and for every entrance animation to finish.
 *
 * Axe samples computed styles, so text that is still fading in (opacity
 * between 0 and 1) is reported as low contrast. A fixed timeout raced the
 * staggered entrances and broke whenever a page gained a group, so this
 * watches the animations themselves.
 */
export async function waitForEntrances(page: Page) {
  // The theme switcher only renders after mount, so it doubles as the
  // hydration signal; before it, no Framer animation has started yet.
  await page
    .locator("nav")
    .getByRole("button", { name: THEME_LABEL })
    .first()
    .waitFor({ state: "attached" });

  // Settled means two samples in a row with no running animation and no
  // element whose opacity changed since the last sample. Comparing samples,
  // rather than asking for opacity 1, lets an element that rests at a
  // fractional opacity (a disabled control, a dimmed decoration) count as
  // settled. Polled every 100ms, with its own timeout, so a page that never
  // settles fails with a clear message instead of eating the test timeout.
  await page.waitForFunction(
    () => {
      const w = window as unknown as { __a11yLast?: string; __a11yStable?: number };
      const running = document
        .getAnimations()
        .some((a) => a.pending || a.playState === "running");
      const snapshot = Array.from(document.body.querySelectorAll<HTMLElement>("*"))
        .map((el) => getComputedStyle(el).opacity)
        .join(",");
      const unchanged = snapshot === w.__a11yLast;
      w.__a11yLast = snapshot;
      w.__a11yStable = !running && unchanged ? (w.__a11yStable ?? 0) + 1 : 0;
      return w.__a11yStable >= 2;
    },
    undefined,
    { polling: 100, timeout: 10_000 }
  ).catch((error: Error) => {
    throw new Error(
      `Entrance animations did not settle within 10s, so axe would scan text mid-fade. ${error.message}`
    );
  });
}

/** Run axe on the page as it is now and fail on any WCAG 2 A/AA or best-practice violation. */
export async function expectNoAxeViolations(page: Page) {
  await waitForEntrances(page);

  // @axe-core/playwright bundles its own playwright-core types, which lag
  // behind our @playwright/test version; the runtime object is compatible.
  type AxePage = ConstructorParameters<typeof AxeBuilder>[0]["page"];
  const results = await new AxeBuilder({ page: page as unknown as AxePage })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
    .analyze();

  const summary = results.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    nodes: v.nodes.slice(0, 3).map((n) => n.html),
  }));
  expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
}
