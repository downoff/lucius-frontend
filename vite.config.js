import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { viteStaticCopy } from 'vite-plugin-static-copy' // <-- NEW: Import the plugin

export default defineConfig({
  plugins: [
    react(),
    // NEW: Configure the plugin to copy our SEO files
    viteStaticCopy({
      targets: [
        {
          src: 'public/sitemap.xml',
          dest: '.' // Copies it to the root of the 'dist' folder
        },
        {
          src: 'public/robots.txt',
          dest: '.' // Copies it to the root of the 'dist' folder
        }
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})