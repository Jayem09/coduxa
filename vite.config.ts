import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    rollupOptions: {
      external: (id) => {
        // Exclude test files from build
        return id.includes('.test.') || id.includes('__tests__') || id.includes('/test/')
      }
    }
  }
})
