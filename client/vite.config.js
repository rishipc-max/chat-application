import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // //below code is needed if you get error like Uncaught ReferenceError: global is not defined.
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      "readable-stream": "vite-compatible-readable-stream",
    },
  },
});