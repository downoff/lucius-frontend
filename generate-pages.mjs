// generate-pages.mjs
import fs from 'fs';
import { niches } from './niches.js';

console.log('Starting page and sitemap generation...');

// --- 1. Generate the pages.json file ---
const pageData = niches.map(niche => ({
    slug: niche.slug,
    title: niche.title,
    placeholder: niche.placeholder,
}));
// UPDATED: Save the file to the 'public' folder so we can fetch it
fs.writeFileSync('./public/pages.json', JSON.stringify(pageData, null, 2));
console.log(`Successfully generated data for ${pageData.length} pages into public/pages.json`);


// --- 2. Generate the sitemap.xml file ---
const baseUrl = 'https://www.ailucius.com';
const staticPages = [
    { loc: `${baseUrl}/`, priority: '1.00' },
    { loc: `${baseUrl}/pricing`, priority: '0.80' },
    // ... add other static pages if needed
];

const pSEO_Pages = niches.map(niche => ({
    loc: `${baseUrl}/tools/${niche.slug}`,
    priority: '0.80'
}));

// We can add blog post URLs here later
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