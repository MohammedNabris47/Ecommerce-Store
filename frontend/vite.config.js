import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import flowbitePlugin from "flowbite/plugin";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbitePlugin],
  server: {
    proxy: {
      "/api/": "http://localhost:3500",
      "/uploads/": "http://localhost:3500",
    },
  },
});
