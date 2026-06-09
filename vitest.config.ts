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
        // Non-unit-testable infra: html/body shells, async server components,
        // server data-fetching pages, and next-intl runtime glue that requires
        // the Next server runtime (all covered by Playwright e2e instead).
        "src/app/layout.tsx",
        "src/app/[locale]/layout.tsx",
        "src/app/[locale]/blog/**",
        "src/i18n/**",
        "src/middleware.ts",
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
