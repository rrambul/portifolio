"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";

interface TransitionProviderProps {
  children: ReactNode;
}

export function TransitionProvider({ children }: TransitionProviderProps) {
  const pathname = usePathname();
  const [isFirstMount, setIsFirstMount] = useState(true);

  // Strip locale prefix so locale changes don't trigger page transition
  const pathnameWithoutLocale = useMemo(() => {
    return pathname.replace(/^\/(en|pt)/, "") || "/";
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
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathnameWithoutLocale}
          initial={isFirstMount ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
