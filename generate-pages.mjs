// generate-pages.mjs
import fs from 'fs';
import { niches } from './src/data/niches.js'; // <-- Updated path

console.log('Starting sitemap generation...');

const baseUrl = 'https://www.ailucius.com';
const staticPages = [
    { loc: `${baseUrl}/`, priority: '1.00' },
    { loc: `${baseUrl}/pricing`, priority: '0.80' },
    { loc: `${baseUrl}/blog`, priority: '0.80' },
];

const pSEO_Pages = niches.map(niche => ({
    loc: `${baseUrl}/tools/${niche.slug}`,
    priority: '0.80'
}));

const allPages = [...staticPages, ...pSEO_Pages];

const sitemapContent = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
  <url>
    <loc>${page.loc}</loc>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>
`.trim();

fs.writeFileSync('./public/sitemap.xml', sitemapContent);
console.log(`Successfully generated sitemap.xml with ${allPages.length} URLs.`);