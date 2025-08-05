import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: parseInt(process.env.PORT) || 4040,
    host: '0.0.0.0',
    allowedHosts: ['negative-burm.onrender.com']
  },
  plugins: [
    react(),
    tailwindcss()
  ],
   build: {
    minify: 'terser', // Ensure minification is enabled (default in production)
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'), // Force production mode
  },
})
