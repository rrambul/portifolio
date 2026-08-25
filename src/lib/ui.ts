/**
 * Shared Tailwind class fragments so repeated UI treatments live in one place
 * instead of being hand-copied (and drifting) across components.
 */

/** The single editorial column every section aligns to (~42rem measure). */
export const sectionCol = "mx-auto max-w-2xl";

/** Keyboard focus ring shared by interactive elements (links, buttons). */
export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900";
