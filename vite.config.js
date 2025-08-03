import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import fs from 'fs';
// This now correctly requires your .cjs data file
const { niches } = require('./src/data/niches.cjs');

// --- The Final "Sentient" SEO Plugin ---
const generateSitemapPlugin = () => {
  return {
    name: 'generate-sitemap',
    // This function runs automatically after the build is complete
    writeBundle() {
      console.log('Generating final sitemap...');
      const baseUrl = 'https://www.ailucius.com';
      
      const staticPages = [
        { loc: `${baseUrl}/`, priority: '1.00' },
        { loc: `${baseUrl}/pricing`, priority: '0.80' },
        { loc: `${baseUrl}/blog`, priority: '0.80' },
        { loc: `${baseUrl}/about`, priority: '0.70' },
        { loc: `${baseUrl}/contact`, priority: '0.70' },
      ];

      // This will now correctly map over your entire list of 100+ niches
      const pSEO_Pages = niches.map(niche => ({
        loc: `${baseUrl}/tools/${niche.slug}`,
        priority: '0.80'
      }));

      const allPages = [...staticPages, ...pSEO_Pages];

      const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
  <url>
    <loc>${page.loc}</loc>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>
      `.trim();

      // Write the sitemap to the final 'dist' folder
      fs.writeFileSync(path.resolve(__dirname, 'dist', 'sitemap.xml'), sitemapContent);
      console.log(`Successfully generated sitemap.xml with ${allPages.length} URLs.`);
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    generateSitemapPlugin() // Activate our custom plugin
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})