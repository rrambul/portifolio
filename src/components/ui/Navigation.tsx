"use client";

import { useTranslations, useLocale } from "next-intl";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useState, useEffect, useMemo, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

export function Navigation() {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigationRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Use useMemo to prevent the sections array from being recreated on every render
  const sections = useMemo(
    () => [
      { id: "home", label: t("home") },
      { id: "about", label: t("about") },
      { id: "experience", label: t("experience") },
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

    // Check if the target section exists on the current page
    const targetElement = document.getElementById(sectionId);
    
    // If section doesn't exist, navigate to homepage with hash
    if (!targetElement) {
      router.push(`/${locale}#${sectionId}`);
      return;
    }

    // Delay scrolling to ensure the menu animation completes
    setTimeout(() => {
      try {
        // Get navigation height for offset
        const navHeight = navigationRef.current?.offsetHeight || 80;

        // Calculate position
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        // Perform scroll
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      } catch (error) {
        console.error("Error scrolling to section:", error);
      }
    }, 300); // Longer delay for mobile
  };

  // Update active section based on scroll position
  useEffect(() => {
    // Check if we're on a blog page
    const isBlogPage = pathname.includes('/blog');
    
    if (isBlogPage) {
      setActiveSection("blog");
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Get the nav height for calculations
      const navHeight = navigationRef.current?.offsetHeight || 80;

      // Check if we're at the top of the page
      if (scrollPosition < 300) {
        setActiveSection("home");
        return;
      }

      // Find which section takes up most of the viewport
      let maxVisibleSection = null;
      let maxVisibleArea = 0;

      // Check each section
      for (const { id } of sections) {
        const section = document.getElementById(id);
        if (!section) continue;

        // Get section dimensions and position
        const rect = section.getBoundingClientRect();

        // Calculate how much of the section is visible in the viewport
        const visibleTop = Math.max(rect.top, navHeight);
        const visibleBottom = Math.min(rect.bottom, viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        // If this section has more visible area than previous maximum, it becomes the active section
        if (visibleHeight > maxVisibleArea) {
          maxVisibleArea = visibleHeight;
          maxVisibleSection = id;
        }

        // Special case for sections that are smaller than the viewport
        // If section top is just past the navbar, prioritize it
        if (rect.top > navHeight && rect.top < viewportHeight * 0.5) {
          maxVisibleSection = id;
          break;
        }
      }

      // Update active section if we found one
      if (maxVisibleSection) {
        setActiveSection(maxVisibleSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Use a resize listener as well to handle orientation changes
    window.addEventListener("resize", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sections, router, pathname]);

  return (
    <nav
      ref={navigationRef}
      className="sticky top-0 z-50 border-b bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md dark:border-zinc-800 border-gray-200"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => scrollToSection("home", e)}
            className="text-xl font-bold cursor-pointer"
          >
            Renan Rambul
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={(e) => scrollToSection(section.id, e)}
                className={`transition-colors hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer ${
                  activeSection === section.id
                    ? "text-teal-600 dark:text-teal-400"
                    : ""
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md cursor-pointer"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
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
          <motion.div
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
                    className={`block w-full text-left py-2 transition-colors hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer ${
                      activeSection === section.id
                        ? "text-teal-600 dark:text-teal-400"
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
