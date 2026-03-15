"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <motion.button
      onClick={toggle}
      className="relative h-9 w-16 rounded-full cursor-pointer border-0 outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #134e4a, #0f766e)"
          : "linear-gradient(135deg, #f0fdfa, #ccfbf1)",
        boxShadow: isDark
          ? "inset 0 1px 3px rgba(0,0,0,0.3), 0 0 8px rgba(20,184,166,0.15)"
          : "inset 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
      }}
      aria-label={isDark ? t("light") : t("dark")}
      whileTap={{ scale: 0.95 }}
    >
      {/* Sliding knob */}
      <motion.div
        className="absolute top-1 left-1 h-7 w-7 rounded-full flex items-center justify-center"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #0d9488, #14b8a6)"
            : "#ffffff",
          boxShadow: isDark
            ? "0 2px 6px rgba(0,0,0,0.3)"
            : "0 2px 6px rgba(0,0,0,0.12)",
        }}
        initial={false}
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiMoon className="h-3.5 w-3.5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiSun className="h-3.5 w-3.5 text-amber-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Background decorative dots */}
      <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none">
        <motion.div
          animate={{ opacity: isDark ? 0.4 : 0 }}
          className="flex gap-0.5"
        >
          <span className="block w-1 h-1 rounded-full bg-teal-300" />
          <span className="block w-0.5 h-0.5 rounded-full bg-teal-400 mt-1" />
        </motion.div>
        <motion.div
          animate={{ opacity: isDark ? 0 : 0.5 }}
          className="flex gap-0.5"
        >
          <span className="block w-0.5 h-0.5 rounded-full bg-teal-600 mt-1" />
          <span className="block w-1 h-1 rounded-full bg-teal-500" />
        </motion.div>
      </div>
    </motion.button>
  );
}
