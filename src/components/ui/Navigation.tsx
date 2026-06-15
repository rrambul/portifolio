"use client";

import { useTranslations, useLocale } from "next-intl";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useState, useEffect, useMemo, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { m, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { scrollToSection as scrollToSectionLib } from "@/lib/scroll";

export function Navigation() {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigationRef = useRef<HTMLDivElement>(null);

  // Reading progress bar, smoothed so it eases rather than snaps.
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Use useMemo to prevent the sections array from being recreated on every render
  const sections = useMemo(
    () => [
      { id: "home", label: t("home") },
      { id: "about", label: t("about") },
      { id: "experience", label: t("experience") },
      { id: "skills", label: t("skills") },
      { id: "projects", label: t("projects") },
      { id: "interests", label: t("interests") },
      { id: "contact", label: t("contact") },
    ],
    [t]
  );

  // Mobile-optimized scroll handling
  const scrollToSection = (sectionId: string, event?: React.MouseEvent) => {
    // Prevent default behavior to ensure we handle scrolling
    if (event) {
      event.preventDefault();
    }

    // Close the menu first
    setIsMenuOpen(false);

    // Handle blog navigation - redirect to blog page
    if (sectionId === "blog") {
      router.push(`/${locale}/blog`);
      return;
    }

    // Handle home navigation - go to homepage
    if (sectionId === "home") {
      router.push(`/${locale}`);
      return;
    }

    // If section doesn't exist on this page, navigate to homepage with hash
    if (!document.getElementById(sectionId)) {
      router.push(`/${locale}#${sectionId}`);
      return;
    }

    // Delay scrolling so the mobile menu finishes collapsing first (its height
    // change would otherwise throw off the final scroll position). The actual
    // offset is handled by `scroll-margin-top` in globals.css.
    setTimeout(() => scrollToSectionLib(sectionId), 300);
  };

  // Highlight the nav item for whichever section is currently under the nav.
  useEffect(() => {
    if (pathname.includes("/blog")) {
      setActiveSection("blog");
      return;
    }

    const sectionIds = sections
      .map((s) => s.id)
      .filter((id) => id !== "home");

    // A section becomes active once its top crosses into the upper third of
    // the viewport (comfortably below the sticky nav + scroll-margin offset).
    // The last such section wins; "home" while still above the first.
    const updateActiveSection = () => {
      const triggerLine = window.innerHeight * 0.3;
      let current = "home";
      for (const id of sectionIds) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= triggerLine) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    // Throttle to at most one measurement per animation frame instead of
    // recomputing on every individual scroll event.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections, pathname]);

  return (
    <nav
      ref={navigationRef}
      className="sticky top-0 z-50 border-b bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md dark:border-zinc-800 border-gray-200"
    >
      {/* Reading progress bar */}
      <m.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-teal-500 via-cyan-400 to-violet-500"
        style={{ scaleX: progressScaleX }}
      />
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => scrollToSection("home", e)}
            className="text-xl font-bold cursor-pointer rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
          >
            Renan Rambul
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={(e) => scrollToSection(section.id, e)}
                className={`relative py-1 rounded-sm transition-colors hover:text-teal-700 dark:hover:text-teal-400 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900 ${
                  activeSection === section.id
                    ? "text-teal-700 dark:text-teal-400"
                    : ""
                }`}
              >
                {section.label}
                {activeSection === section.id && (
                  <m.span
                    layoutId="nav-active-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-teal-600 dark:bg-teal-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800"
          >
            <div className="px-4 py-3 space-y-4">
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={(e) => scrollToSection(section.id, e)}
                    className={`block w-full text-left py-2 transition-colors hover:text-teal-700 dark:hover:text-teal-400 cursor-pointer ${
                      activeSection === section.id
                        ? "text-teal-700 dark:text-teal-400"
                        : ""
                    }`}
                  >
                    {section.label}
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
