import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  // На GitHub Pages сайт лежит в /cargo575_main2/
  base: process.env.GITHUB_PAGES === "true" ? "/cargo575_main2/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5175,
    host: true,
  },
});
