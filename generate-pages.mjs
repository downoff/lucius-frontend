// generate-pages.mjs
import fs from 'fs';
import { niches } from './niches.js';

console.log('Starting page generation...');

// For now, we will just transform the niche data into a JSON file.
// In the next step, we can add the AI generation logic here.

const pageData = niches.map(niche => ({
    slug: niche.slug,
    title: niche.title,
    placeholder: niche.placeholder,
    // We can add AI-generated H1s, descriptions, etc. here later
}));

fs.writeFileSync('./src/pages.json', JSON.stringify(pageData, null, 2));

console.log(`Successfully generated ${pageData.length} pages into src/pages.json`);