import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages proje sitesi alt yolda yayınlanır:
// https://toftamars.github.io/tofta-english-studio/
// Yerelde "/" kullanırız, production build'de repo adını base alırız.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/tofta-english-studio/" : "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("recharts")) return "charts";
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("@supabase")) return "supabase";
            if (id.includes("tesseract")) return "ocr";
            return "vendor";
          }
          if (id.includes("/src/data/")) return "curriculum";
        },
      },
    },
  },
}));
