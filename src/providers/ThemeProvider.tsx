"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Force document body to have the theme class
  useEffect(() => {
    if (mounted) {
      const updateBodyClass = () => {
        document.documentElement.classList.remove("light-mode", "dark-mode");

        if (
          localStorage.getItem("theme") === "dark" ||
          (!localStorage.getItem("theme") &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
          document.documentElement.classList.add("dark-mode");
          document.documentElement.classList.remove("light-mode");
          document.documentElement.style.backgroundColor = "#18181b";
        } else {
          document.documentElement.classList.add("light-mode");
          document.documentElement.classList.remove("dark-mode");
          document.documentElement.style.backgroundColor = "#ffffff";
        }
      };

      updateBodyClass();
      window.addEventListener("storage", updateBodyClass);

      return () => {
        window.removeEventListener("storage", updateBodyClass);
      };
    }
  }, [mounted]);

  return (
    <NextThemesProvider {...props}>
      {mounted ? children : null}
    </NextThemesProvider>
  );
}
