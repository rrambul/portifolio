"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domMax,
  m,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { stripLocale } from "@/lib/strip-locale";

interface TransitionProviderProps {
  children: ReactNode;
}

export function TransitionProvider({ children }: TransitionProviderProps) {
  const pathname = usePathname();
  const [isFirstMount, setIsFirstMount] = useState(true);

  // Strip locale prefix so locale changes don't trigger page transition
  const pathnameWithoutLocale = useMemo(() => {
    return stripLocale(pathname);
  }, [pathname]);

  // Skip initial animation on first page load
  useEffect(() => {
    if (isFirstMount) {
      setIsFirstMount(false);
    }
  }, [isFirstMount]);

  return (
    // `reducedMotion="user"` makes every Framer Motion animation honor the OS
    // "reduce motion" setting (transforms/layout are skipped, fades kept).
    // LazyMotion + `m` components load the animation runtime as a separate
    // lazy chunk instead of bundling all of framer-motion up front; `domMax`
    // (rather than domAnimation) is required for the nav's layoutId underline.
    // `strict` throws if a full `motion.` component sneaks back in.
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domMax} strict>
        <AnimatePresence mode="wait">
          <m.div
            key={pathnameWithoutLocale}
            initial={isFirstMount ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </MotionConfig>
  );
}
