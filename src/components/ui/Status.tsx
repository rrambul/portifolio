import type { ReactNode } from "react";

/** The small emerald dot that marks something live or in progress. */
export function StatusDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400 ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * The dot with a short mono label in the accent color: "shipping", "studying",
 * "live". One component, so every live marker on the site is the same marker.
 */
export function LiveStatus({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-accent-mono text-xs text-emerald-700 dark:text-emerald-400 ${className}`}
    >
      <StatusDot />
      {children}
    </span>
  );
}
