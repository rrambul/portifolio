"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ReactNode, useEffect } from "react";

// Theme wrapper to handle theme changes
function ThemeHandler({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    if (!theme) return;

    try {
      if (theme === "dark") {
        document.documentElement.style.setProperty("color-scheme", "dark");
        document.documentElement.style.setProperty("--foreground", "0 0% 98%");
        document.documentElement.style.setProperty(
          "--card-foreground",
          "0 0% 98%"
        );
      } else {
        document.documentElement.style.setProperty("color-scheme", "light");
        document.documentElement.style.setProperty(
          "--foreground",
          "240 10% 3.9%"
        );
        document.documentElement.style.setProperty(
          "--card-foreground",
          "240 10% 3.9%"
        );
      }
    } catch (e) {
      console.error("Theme change handling failed:", e);
    }
  }, [theme]);

  return children;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      <ThemeHandler>{children}</ThemeHandler>
    </NextThemesProvider>
  );
}
