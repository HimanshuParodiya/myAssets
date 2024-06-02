import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://myassets-api.onrender.com" // where every find /api add "http://localhost:8000" before that so it will become "http://localhost:8000/api...."
      // using proxy also help use to tell our cross-origin that this our url to now we will not get an error of cross-origin
    }
  },
  plugins: [react()],
})
