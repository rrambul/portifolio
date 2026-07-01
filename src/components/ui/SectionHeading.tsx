"use client";

import { ReactNode } from "react";
import { m } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  /** Mono path-style label, rendered as "// {label}" — the section's namespace. */
  label: string;
  title: string;
  subtitle?: string;
  /** Optional right-aligned mono meta, e.g. a count or filename. */
  meta?: ReactNode;
  /**
   * Heading level for the title. Defaults to "h2" (homepage sections sit under
   * the Hero's h1); standalone pages with no other h1 should pass "h1".
   */
  as?: "h1" | "h2";
}

/**
 * Shared section header in the site's "spec" language: a mono `// label`
 * eyebrow, a display title, an optional subtitle, and a hairline rule.
 * Left-aligned and animated as a `fadeInUp` item inside a stagger container.
 */
export function SectionHeading({
  label,
  title,
  subtitle,
  meta,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <m.div className="mb-12" variants={fadeInUp}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-accent-mono text-sm text-emerald-700 dark:text-emerald-400">
          {"// "}
          {label}
        </span>
        {meta ? (
          <span className="shrink-0 font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
            {meta}
          </span>
        ) : null}
      </div>
      <Heading className="mt-3 text-3xl font-bold md:text-4xl">{title}</Heading>
      {subtitle ? (
        <p className="mt-2 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
      ) : null}
      <hr className="mt-6 border-zinc-200 dark:border-white/10" />
    </m.div>
  );
}
