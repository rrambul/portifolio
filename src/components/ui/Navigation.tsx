"use client";

import { useTranslations, useLocale } from "next-intl";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { m, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { anchorIds, homeItem, navItems, navigateTo, type NavItem } from "@/lib/nav";
import { focusRing } from "@/lib/ui";
import { siteConfig } from "@/config/site";

/** Duration of the mobile menu's collapse, which a scroll has to wait out. */
const MENU_CLOSE_MS = 300;

/** A section becomes active once its top crosses into the upper third of the
 *  viewport, comfortably below the sticky nav plus the scroll-margin offset. */
const TRIGGER_LINE = 0.3;

const ACTIVE = "text-emerald-700 dark:text-emerald-400";
const INACTIVE = "text-zinc-600 dark:text-zinc-400";

export function Navigation() {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // The anchor currently under the nav, or null while still above the first.
  const [activeId, setActiveId] = useState<string | null>(null);

  const go = (item: NavItem) => {
    setIsMenuOpen(false);
    navigateTo(router, locale, item, { scrollDelayMs: MENU_CLOSE_MS });
  };

  const tone = (id: string) => (activeId === id ? ACTIVE : INACTIVE);

  useEffect(() => {
    // The last anchor whose top is past the trigger line wins.
    const updateActive = () => {
      const triggerLine = window.innerHeight * TRIGGER_LINE;
      let current: string | null = null;
      for (const id of anchorIds) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= triggerLine) current = id;
      }
      setActiveId(current);
    };

    // At most one measurement per animation frame, not one per scroll event.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        updateActive();
      });
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-[hsl(var(--background))] dark:border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => go(homeItem)}
            className={`flex cursor-pointer items-center gap-1.5 rounded-sm font-accent-mono text-base font-semibold ${focusRing}`}
          >
            <span className="text-emerald-600 dark:text-emerald-400" aria-hidden="true">
              ❯
            </span>
            {siteConfig.name}
          </button>

          {/* Desktop */}
          <div className="hidden items-center space-x-6 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item)}
                className={`relative cursor-pointer rounded-sm py-1 font-accent-mono text-sm transition-colors hover:text-emerald-700 dark:hover:text-emerald-400 ${focusRing} ${tone(item.id)}`}
              >
                {t(item.id)}
                {activeId === item.id && (
                  <m.span
                    layoutId="nav-active-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-emerald-600 dark:bg-emerald-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hidden items-center space-x-3 md:flex">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>

          {/* Mobile menu toggle */}
          <button
            className={`cursor-pointer rounded-md p-2 md:hidden ${focusRing}`}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
          >
            {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: MENU_CLOSE_MS / 1000 }}
            className="overflow-hidden border-b border-zinc-200 bg-[hsl(var(--background))] md:hidden dark:border-white/10"
          >
            <div className="space-y-4 px-4 py-3">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => go(item)}
                    className={`block w-full cursor-pointer py-2 text-left font-accent-mono transition-colors hover:text-emerald-700 dark:hover:text-emerald-400 ${tone(item.id)}`}
                  >
                    {t(item.id)}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-3 py-2">
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
