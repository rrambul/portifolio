/**
 * Shared Tailwind class fragments so repeated UI treatments live in one place
 * instead of being hand-copied (and drifting) across components.
 */

/** Card surface used by the homepage section cells (Skills, Projects, Hero):
 *  a flat hairline outline, no fill or shadow. */
export const cardClass =
  "rounded-lg border border-zinc-200 p-5 transition-colors dark:border-white/10";

/** Keyboard focus ring shared by interactive elements (links, buttons). */
export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900";
