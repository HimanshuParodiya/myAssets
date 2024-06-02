import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Replace with your API server URL
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
