import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    include: ["**/*.test.ts", "**/*.test.tsx"],
    setupFiles: "./src/application/tests/setup.js",
    environment: "jsdom",
  },
});
