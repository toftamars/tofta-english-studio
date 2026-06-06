import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages proje sitesi alt yolda yayınlanır:
// https://toftamars.github.io/tofta-english-studio/
// Yerelde "/" kullanırız, production build'de repo adını base alırız.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/tofta-english-studio/" : "/",
  plugins: [react()],
}));
