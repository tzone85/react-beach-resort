import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Absolute base — required for SPA with deep-link routes (Router 6).
  // Relative "./" would resolve /assets/* against /rooms/foo/ → 404 on
  // direct navigation to deep links.
  base: "/",
  build: { outDir: "dist", sourcemap: true },
});
