/**
 * Shared Tailwind class fragments so repeated UI treatments live in one place
 * instead of being hand-copied (and drifting) across components.
 */

/** The single editorial column every section aligns to (~42rem measure). */
export const sectionCol = "mx-auto max-w-2xl";

/** Keyboard focus ring shared by interactive elements (links, buttons). */
export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900";

/**
 * Section measures. `text` is the default reading column the page is built on;
 * the other two exist so a section can *deliberately* break it. Used sparingly
 * (the hero name and the experience changelog) so that the narrow column reads
 * as a choice rather than as the page width.
 */
export const sectionWidth = {
  text: "max-w-2xl",
  wide: "max-w-4xl",
  display: "max-w-5xl",
} as const;

/**
 * Vertical rhythm. Uniform padding gives every section the same weight and no
 * grouping, so the scale is deliberately uneven: `tight` glues a section to the
 * one above it, `loose` opens a new movement.
 */
export const sectionSpacing = {
  /** The hero: light on top (it sits under the sticky nav), heavy below. */
  hero: "pt-12 pb-24 md:pt-20 md:pb-32",
  tight: "py-10 md:py-14",
  normal: "py-16 md:py-20",
  loose: "py-24 md:py-32",
} as const;
