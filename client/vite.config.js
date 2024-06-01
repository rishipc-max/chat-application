import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // //below code is needed if you get error like Uncaught ReferenceError: global is not defined.
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },

  resolve: {
    alias: {
      "readable-stream": "vite-compatible-readable-stream"
    },
  },
})
