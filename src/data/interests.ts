/**
 * The section used to be thirteen topic nouns ("Design Systems", "Testing"),
 * which cannot carry a point of view. It is now a short list of positions and
 * a shorter list of things I've changed my mind about.
 */

/** Keys under `interests.positions` in the message files. */
export const positions = [
  "accessibility",
  "designSystems",
  "seams",
  "tests",
  "agents",
  "performance",
] as const;

/** Keys under `interests.changedMyMind` in the message files. */
export const changedMyMind = ["consistency", "coverage"] as const;
