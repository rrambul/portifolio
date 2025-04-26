"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Force document to have the theme class
  useEffect(() => {
    if (mounted && theme) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(
        theme === "dark" ? "dark" : "light"
      );

      // Force all card backgrounds
      if (theme === "light") {
        document.documentElement.style.backgroundColor = "#ffffff";
        document.body.style.backgroundColor = "#ffffff";
      } else {
        document.documentElement.style.backgroundColor = "";
        document.body.style.backgroundColor = "";
      }
    }
  }, [theme, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 rounded-md border p-1 relative overflow-hidden">
      {/* Animated background pill that moves between light/dark */}
      <motion.div
        className="absolute w-10 h-10 rounded-md bg-purple-100 dark:bg-purple-700/50 z-0"
        initial={false}
        animate={{
          x: theme === "light" ? 0 : 40,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      <motion.button
        onClick={() => setTheme("light")}
        className="p-2 rounded-md transition-colors cursor-pointer z-10"
        aria-label={t("light")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: theme === "light" ? [0, 360] : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <FiSun
            className={`h-5 w-5 ${
              theme === "light"
                ? "text-yellow-500"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          />
        </motion.div>
      </motion.button>
      <motion.button
        onClick={() => setTheme("dark")}
        className="p-2 rounded-md transition-colors cursor-pointer z-10"
        aria-label={t("dark")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: theme === "dark" ? [0, 360] : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <FiMoon
            className={`h-5 w-5 ${
              theme === "dark"
                ? "text-indigo-400"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          />
        </motion.div>
      </motion.button>
    </div>
  );
}
