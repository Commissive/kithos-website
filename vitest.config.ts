import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

/* Vitest is the unit / component test runner. jsdom gives us a DOM
   for React Testing Library; Tailwind/PostCSS are skipped (we test
   semantic structure here, not pixels — visual regression lives in
   Playwright). E2E specs in /e2e are excluded so `vitest run` and
   `playwright test` stay independent. */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    css: false,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", "e2e", ".next", "dist"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
