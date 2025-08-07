import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: parseInt(process.env.PORT)||5173,
    host: true,
     strictPort: true,
      // Add your Render.com host here
      allowedHosts: [
        'negative-burm.onrender.com',
        'localhost' // Keep localhost for development
      ]
  },
  plugins: [
    react(),
    tailwindcss()
  ]
})
