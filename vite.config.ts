import { cpSync, mkdirSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/** Кладёт кадры проверок груза в public, откуда их забирает Vite */
function copyCheckPhotos() {
  const from = fileURLToPath(new URL("./assets/check", import.meta.url));
  const to = fileURLToPath(new URL("./public/images/check", import.meta.url));
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
}

export default defineConfig({
  // На GitHub Pages сайт лежит в /cargo575_main2/
  base: process.env.GITHUB_PAGES === "true" ? "/cargo575_main2/" : "/",
  plugins: [
    {
      name: "copy-check-photos",
      buildStart() {
        copyCheckPhotos();
      },
    },
    react(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5175,
    host: true,
    proxy: {
      "/api": {
        target: "https://chinatoway.ru",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
