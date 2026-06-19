/**
 * Shared Tailwind class fragments so repeated UI treatments live in one place
 * instead of being hand-copied (and drifting) across components.
 */

/** Card surface used by the homepage section cells (Skills, Projects, Hero). */
export const cardClass =
  "rounded-xl border border-zinc-200 bg-white/70 p-5 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none";

/** Keyboard focus ring shared by interactive elements (links, buttons). */
export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900";
