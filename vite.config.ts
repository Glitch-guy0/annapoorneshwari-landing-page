import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * `BASE_PATH` lets the same build target either a GitHub Pages project site
 * (`BASE_PATH=/landing-site/ npm run build`) or a custom domain (`BASE_PATH=/`).
 * It defaults to `/` so local previews behave normally.
 */
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    target: "es2022",
  },
  server: {
    port: 5173,
    strictPort: false,
  },
});
