import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",

      manifest: {
        name: "Redtab",
        description: "Redtab",
        start_url: "/",
        display: "fullscreen",
        theme_color: "#f8453f",
        icons: [
          {
            src: "app.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        screenshots: [
          {
            src: "app.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "wide",
            label: "Wonder Widgets",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
