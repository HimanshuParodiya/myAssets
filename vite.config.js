import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://myassets-api.onrender.com', // Replace with your API server URL
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
