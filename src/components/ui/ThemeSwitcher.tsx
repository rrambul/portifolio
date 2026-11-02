"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { focusRing } from "@/lib/ui";

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

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? t("light") : t("dark")}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 transition-colors hover:border-emerald-500/50 hover:text-emerald-600 dark:border-white/10 dark:text-zinc-400 dark:hover:text-emerald-400 ${focusRing}`}
    >
      {isDark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
    </button>
  );
}
