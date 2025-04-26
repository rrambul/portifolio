"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FiGlobe, FiCheck, FiX } from "react-icons/fi";

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Preload all language resources
  useEffect(() => {
    // Preload the alternate language
    const alternateLocale = locale === "en" ? "pt" : "en";
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "document";
    link.href = pathname.replace(`/${locale}`, `/${alternateLocale}`);
    document.head.appendChild(link);

    return () => {
      // Cleanup
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [locale, pathname]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile dropdown is open
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;

    // Immediate feedback
    setIsOpen(false);

    // Create new path
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);

    // Update HTML lang attribute
    document.documentElement.lang = newLocale;

    // Use direct location change for instant navigation with no transitions
    window.location.assign(newPath);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center space-x-1 rounded-md border p-2 cursor-pointer
        hover:bg-zinc-100 dark:hover:bg-zinc-800 
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
        transition-colors
        ${isOpen ? "bg-zinc-100 dark:bg-zinc-800" : ""}`}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <FiGlobe className="h-5 w-5" />
        <span className="hidden sm:inline">
          {locale === "en" ? "English" : "Português"}
        </span>
      </button>

      {/* Desktop dropdown */}
      {isOpen && !isMobile && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border bg-white shadow-lg dark:bg-zinc-800 dark:border-zinc-700 transition-all duration-200 ease-in-out">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className={`w-full text-left px-4 py-2 text-sm cursor-pointer 
              flex justify-between items-center
              hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors 
              ${
                locale === "en"
                  ? "font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-zinc-700/50"
                  : ""
              }`}
              onClick={() => switchLocale("en")}
              role="menuitem"
            >
              <span>{t("english")}</span>
              {locale === "en" && <FiCheck className="h-4 w-4" />}
            </button>
            <button
              className={`w-full text-left px-4 py-2 text-sm cursor-pointer 
              flex justify-between items-center
              hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors 
              ${
                locale === "pt"
                  ? "font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-zinc-700/50"
                  : ""
              }`}
              onClick={() => switchLocale("pt")}
              role="menuitem"
            >
              <span>{t("portuguese")}</span>
              {locale === "pt" && <FiCheck className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Mobile full-screen overlay */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-800 w-full max-w-sm rounded-lg shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b dark:border-zinc-700">
              <h2 className="text-lg font-medium">
                {t("english") === "English"
                  ? "Select Language"
                  : "Selecionar Idioma"}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <div className="p-1">
              <button
                className={`w-full text-left px-4 py-3 text-base cursor-pointer 
                flex justify-between items-center rounded-md
                hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors 
                ${
                  locale === "en"
                    ? "font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-zinc-700/50"
                    : ""
                }`}
                onClick={() => switchLocale("en")}
              >
                <span>{t("english")}</span>
                {locale === "en" && <FiCheck className="h-5 w-5" />}
              </button>
              <button
                className={`w-full text-left px-4 py-3 text-base cursor-pointer 
                flex justify-between items-center rounded-md
                hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors 
                ${
                  locale === "pt"
                    ? "font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-zinc-700/50"
                    : ""
                }`}
                onClick={() => switchLocale("pt")}
              >
                <span>{t("portuguese")}</span>
                {locale === "pt" && <FiCheck className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
