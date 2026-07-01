import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/__tests__/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/__tests__/**",
        "src/**/*.d.ts",
        // Non-unit-testable infra: html/body document shells and next-intl
        // runtime glue that crashes on import outside the Next server runtime
        // (the layouts and i18n wiring are exercised by Playwright e2e). The
        // glob covers both [locale]/ and (redirect)/ layouts; the brace-style
        // dir names are glob-special, so an explicit path would not match.
        "src/app/**/layout.tsx",
        "src/i18n/**",
        // Pure type declarations (no runtime).
        "src/types/**",
        // Canvas drawing has no 2D context in jsdom; verified visually. Its
        // enable/skip guards are still covered by AboutParticles.test.
        "src/components/ui/AboutParticles.tsx",
        // next/og ImageResponse needs the Next server runtime, not jsdom; the
        // generated social cards are verified via the production build.
        "src/lib/og.tsx",
        "src/app/**/opengraph-image.tsx",
      ],
      thresholds: {
        // Global aggregate floors, buffered a few points below the current
        // ~98/96/98/98 so an unrelated refactor will not flip CI red, while a
        // real regression still trips it.
        statements: 94,
        branches: 91,
        functions: 94,
        lines: 94,
        // Per-file gates for the security-critical and historically-weak files
        // so they must hold their own coverage instead of hiding under the
        // global aggregate (see the test coverage audit).
        "src/app/api/contact/route.ts": {
          statements: 95,
          branches: 92,
          functions: 95,
          lines: 95,
        },
        "src/lib/rate-limit.ts": {
          statements: 95,
          branches: 92,
          functions: 95,
          lines: 95,
        },
        "src/components/ui/AnimatedContactForm.tsx": {
          statements: 90,
          branches: 90,
          functions: 90,
          lines: 90,
        },
        "src/components/ui/Navigation.tsx": {
          statements: 90,
          branches: 88,
          functions: 90,
          lines: 90,
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
