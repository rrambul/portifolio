import type { ReactNode } from "react";
import { sectionSpacing, sectionWidth } from "@/lib/ui";

interface SectionProps {
  /** Anchor id, used by the nav and by `scroll-margin-top` in globals.css. */
  id?: string;
  /**
   * Measure for this section. `text` (default) is the reading column the whole
   * page aligns to; `wide` and `display` are the deliberate breaks.
   */
  width?: keyof typeof sectionWidth;
  /** Vertical rhythm. See `sectionSpacing` for what each step is for. */
  spacing?: keyof typeof sectionSpacing;
  className?: string;
  children: ReactNode;
}

/**
 * The page's one layout primitive. Every section used to hand-roll the same
 * `section > container > max-w-2xl` triple, which made the narrow column the
 * path of least resistance and left the horizontal axis unused. Going through
 * here makes breaking the column a one-word change.
 */
export function Section({
  id,
  width = "text",
  spacing = "normal",
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={sectionSpacing[spacing]}>
      <div
        className={`mx-auto w-full px-4 sm:px-6 ${sectionWidth[width]} ${
          className ?? ""
        }`}
      >
        {children}
      </div>
    </section>
  );
}
