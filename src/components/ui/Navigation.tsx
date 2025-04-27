"use client";

import { useTranslations } from "next-intl";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useState, useEffect, useMemo } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const t = useTranslations("navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Use useMemo to prevent the sections array from being recreated on every render
  const sections = useMemo(
    () => [
      { id: "home", label: t("home") },
      { id: "about", label: t("about") },
      { id: "experience", label: t("experience") },
      { id: "skills", label: t("skills") },
      // { id: "blog", label: t("blog") },
      { id: "contact", label: t("contact") },
    ],
    [t]
  );

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);

    // Handle home section specially (scroll to top)
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop - 80, // Adjust for nav height
        behavior: "smooth",
      });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Add some offset

      // Check if we're at the top of the page
      if (scrollPosition < 300) {
        setActiveSection("home");
        return;
      }

      // Check each section's position
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md dark:border-zinc-800 border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("home")}
            className="text-xl font-bold cursor-pointer"
          >
            Renan Rambul
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`transition-colors hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer ${
                  activeSection === section.id
                    ? "text-purple-600 dark:text-purple-400"
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
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left py-2 transition-colors hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer ${
                      activeSection === section.id
                        ? "text-purple-600 dark:text-purple-400"
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
