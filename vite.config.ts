import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Set the base URL for the project, use for github pages
  base: '/front-end-assessment/',
  server: {
    // Open the browser when the server starts
    open: true,
  },
  plugins: [react()],
  css: {
    // Configuration to resolve the warning: "Deprecation [legacy-js-api]:
    // The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0."
    // This tells Vite to use the modern Sass compiler API
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})
