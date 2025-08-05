import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: parseInt(process.env.PORT) || 4040,
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
