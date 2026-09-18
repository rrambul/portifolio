"use client";

import { ReactNode, useMemo, useState } from "react";
import { LazyMotion, MotionConfig, domMax } from "framer-motion";
import { usePathname } from "next/navigation";
import { stripLocale } from "@/lib/strip-locale";

interface TransitionProviderProps {
  children: ReactNode;
}

export function TransitionProvider({ children }: TransitionProviderProps) {
  const pathname = usePathname();

  // Strip locale prefix so locale changes don't trigger a page transition
  const pathnameWithoutLocale = useMemo(() => {
    return stripLocale(pathname);
  }, [pathname]);

  // Has the visitor navigated at all? The session's first page must not fade
  // in: that would gate the LCP behind hydration, which is the whole reason
  // the Hero entrances are CSS. Adjusted during render (the React "derived
  // state" pattern) rather than in an effect, so the class is already on the
  // element in the same commit that remounts it, with no flash in between.
  const [previousPath, setPreviousPath] = useState(pathnameWithoutLocale);
  const [hasNavigated, setHasNavigated] = useState(false);
  if (previousPath !== pathnameWithoutLocale) {
    setPreviousPath(pathnameWithoutLocale);
    setHasNavigated(true);
  }

  return (
    // `reducedMotion="user"` makes every Framer Motion animation honor the OS
    // "reduce motion" setting (transforms/layout are skipped, fades kept).
    // LazyMotion + `m` components load the animation runtime as a separate
    // lazy chunk instead of bundling all of framer-motion up front; `domMax`
    // (rather than domAnimation) is required for the nav's layoutId underline.
    // `strict` throws if a full `motion.` component sneaks back in.
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domMax} strict>
        {/* The page entrance is a CSS keyframe, not Framer, and deliberately.
            This used to be an AnimatePresence/m.div pair, and the entering
            page could be left at `opacity: 0` forever: coming from /learning
            to a homepage anchor whose hash scroll lands near the top (#about)
            stalled the enter animation every time, so the page rendered blank
            until a scroll forced it to repaint. A keyframe cannot stall, and
            dropping `mode="wait"` also drops the 300ms the old page spent
            animating out before the new one was allowed to mount. Keyed on the
            path so React remounts here, which is what restarts the animation. */}
        <div
          key={pathnameWithoutLocale}
          className={hasNavigated ? "animate-page-enter" : undefined}
        >
          {children}
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
