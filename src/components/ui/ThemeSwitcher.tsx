"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

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
    <div className="flex items-center space-x-2 rounded-md border p-1">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          theme === "light" ? "bg-purple-100 dark:bg-purple-700" : ""
        }`}
        aria-label={t("light")}
      >
        <FiSun className="h-5 w-5" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-md transition-colors cursor-pointer ${
          theme === "dark" ? "bg-purple-100 dark:bg-purple-700" : ""
        }`}
        aria-label={t("dark")}
      >
        <FiMoon className="h-5 w-5" />
      </button>
    </div>
  );
}
