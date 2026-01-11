import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts(), tailwindcss()],
  optimizeDeps: {
    esbuildOptions: {
      jsx: "automatic",
    },
  },
  define: {
    global: "globalThis", // Sometimes needed for libraries
  },
  build: {
    lib: {
      entry: resolve(__dirname, "./src/main.ts"),
      name: "TesseraUI",
      fileName: "tessera-ui",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
