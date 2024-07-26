import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // //below code is needed if you get error like Uncaught ReferenceError: global is not defined.
  define: {
    global: "globalThis",
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      "readable-stream": "vite-compatible-readable-stream",
    },
  },
});