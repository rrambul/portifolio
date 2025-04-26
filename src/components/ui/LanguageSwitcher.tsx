"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FiGlobe, FiCheck, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// Type for custom CSS properties
interface CustomStyle {
  [key: string]: string;
}

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isChangingLocale, setIsChangingLocale] = useState(false);

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
    if (newLocale === locale || isChangingLocale) return;

    // Immediate feedback
    setIsOpen(false);
    setIsChangingLocale(true);

    // Create new path
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);

    // Update HTML lang attribute
    document.documentElement.lang = newLocale;

    // Use Next.js router for client-side navigation instead of direct location change
    router.push(newPath);

    // Reset changing state after navigation
    setTimeout(() => {
      setIsChangingLocale(false);
    }, 500);
  };

  // Animation variants
  const buttonVariants = {
    initial: {
      backgroundColor: "transparent",
    },
    hover: {
      scale: 1.05,
      backgroundColor: "var(--button-hover-bg)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: {
      scale: 0.95,
      backgroundColor: "var(--button-hover-bg)",
    },
  };

  const optionVariants = {
    initial: {
      y: 0,
      backgroundColor: "transparent",
    },
    hover: {
      y: -2,
      backgroundColor: "var(--option-hover-bg)",
      transition: { type: "spring", stiffness: 500, damping: 15 },
    },
    tap: {
      y: 0,
      scale: 0.98,
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  // Style objects
  const buttonStyle: CustomStyle = {
    "--button-hover-bg": "rgba(var(--zinc-100-rgb), 0.8)",
  };

  const optionStyle: CustomStyle = {
    "--option-hover-bg": "rgba(var(--zinc-100-rgb), 1)",
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className={`flex items-center space-x-1 rounded-md border p-2 cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
        transition-all duration-300
        ${isOpen ? "bg-zinc-100 dark:bg-zinc-800" : ""}`}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        style={buttonStyle}
        disabled={isChangingLocale}
      >
        <div className="flex items-center space-x-1">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiGlobe className="h-5 w-5" />
          </motion.div>
          <span className="hidden sm:inline">
            {locale === "en" ? "English" : "Português"}
          </span>
        </div>
      </motion.button>

      {/* Desktop dropdown */}
      <AnimatePresence>
        {isOpen && !isMobile && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 z-50 mt-2 w-48 rounded-md border bg-white shadow-lg dark:bg-zinc-800 dark:border-zinc-700 overflow-hidden"
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
              <motion.button
                variants={optionVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className={`w-full text-left px-4 py-2 text-sm cursor-pointer 
                flex justify-between items-center
                transition-all duration-200 
                ${
                  locale === "en"
                    ? "font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-zinc-700/50"
                    : ""
                }`}
                onClick={() => switchLocale("en")}
                role="menuitem"
                style={optionStyle}
                disabled={isChangingLocale}
              >
                <span>{t("english")}</span>
                {locale === "en" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 5, stiffness: 200 }}
                  >
                    <FiCheck className="h-4 w-4" />
                  </motion.div>
                )}
              </motion.button>
              <motion.button
                variants={optionVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className={`w-full text-left px-4 py-2 text-sm cursor-pointer 
                flex justify-between items-center
                transition-all duration-200 
                ${
                  locale === "pt"
                    ? "font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-zinc-700/50"
                    : ""
                }`}
                onClick={() => switchLocale("pt")}
                role="menuitem"
                style={optionStyle}
                disabled={isChangingLocale}
              >
                <span>{t("portuguese")}</span>
                {locale === "pt" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 5, stiffness: 200 }}
                  >
                    <FiCheck className="h-4 w-4" />
                  </motion.div>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-zinc-800 w-full max-w-sm rounded-lg shadow-xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b dark:border-zinc-700">
                <h2 className="text-lg font-medium">
                  {t("english") === "English"
                    ? "Select Language"
                    : "Selecionar Idioma"}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  disabled={isChangingLocale}
                >
                  <FiX className="h-5 w-5" />
                </motion.button>
              </div>
              <div className="p-1">
                <motion.button
                  variants={optionVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className={`w-full text-left px-4 py-3 text-base cursor-pointer 
                  flex justify-between items-center rounded-md
                  transition-all duration-200
                  ${
                    locale === "en"
                      ? "font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-zinc-700/50"
                      : ""
                  }`}
                  onClick={() => switchLocale("en")}
                  style={optionStyle}
                  disabled={isChangingLocale}
                >
                  <span>{t("english")}</span>
                  {locale === "en" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        damping: 5,
                        stiffness: 200,
                      }}
                    >
                      <FiCheck className="h-5 w-5" />
                    </motion.div>
                  )}
                </motion.button>
                <motion.button
                  variants={optionVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className={`w-full text-left px-4 py-3 text-base cursor-pointer 
                  flex justify-between items-center rounded-md
                  transition-all duration-200
                  ${
                    locale === "pt"
                      ? "font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-zinc-700/50"
                      : ""
                  }`}
                  onClick={() => switchLocale("pt")}
                  style={optionStyle}
                  disabled={isChangingLocale}
                >
                  <span>{t("portuguese")}</span>
                  {locale === "pt" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        damping: 5,
                        stiffness: 200,
                      }}
                    >
                      <FiCheck className="h-5 w-5" />
                    </motion.div>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
