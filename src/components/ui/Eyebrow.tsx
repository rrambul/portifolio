import type { ReactNode } from "react";

interface EyebrowProps {
  as?: "h2" | "p";
  /** `muted` is the default zinc; `accent` is emerald, for the group that is live right now. */
  tone?: "muted" | "accent";
  className?: string;
  children: ReactNode;
}

const TONES = {
  muted: "text-zinc-500 dark:text-zinc-400",
  accent: "text-emerald-700 dark:text-emerald-400",
} as const;

/**
 * The mono `// label` that names a group within a section, in the site's spec
 * language. `SectionHeading` renders the section-level one; this is for the
 * groups under it (the hero's release log, the months of the learning log).
 */
export function Eyebrow({ as: Tag = "p", tone = "muted", className = "", children }: EyebrowProps) {
  return (
    <Tag className={`font-accent-mono text-xs uppercase tracking-wider ${TONES[tone]} ${className}`}>
      {"// "}
      {children}
    </Tag>
  );
}
