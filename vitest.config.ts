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
        // (the layouts and i18n wiring are exercised by Playwright e2e).
        "src/app/(redirect)/layout.tsx",
        "src/app/[locale]/layout.tsx",
        "src/i18n/**",
        "src/middleware.ts",
        // Pure type declarations (no runtime).
        "src/types/**",
        // Canvas drawing has no 2D context in jsdom; verified visually. Its
        // enable/skip guards are still covered by AboutParticles.test.
        "src/components/ui/AboutParticles.tsx",
      ],
      thresholds: {
        statements: 90,
        branches: 85,
        functions: 90,
        lines: 90,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
