// discover-keywords.mjs
import OpenAI from 'openai';
import fs from 'fs';
import { niches } from './src/data/niches.cjs';
import 'dotenv/config';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateKeywords() {
    console.log('Starting keyword discovery...');
    let allKeywords = [];

    for (const niche of niches) {
        try {
            const prompt = `
                You are a world-class SEO strategist. For the niche "${niche.title}", generate a list of 20 hyper-specific, long-tail search queries that a person in this niche would use to find an AI content generation tool.
                The output must be a valid JSON object with a single key, "queries", which is an array of 20 unique strings.
                Example query: "AI post ideas for a new real estate listing"
            `;
            const completion = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [{ role: "user", content: prompt }],
                response_format: { type: "json_object" },
            });
            const { queries } = JSON.parse(completion.choices[0].message.content);
            allKeywords.push(...queries.map(q => ({ query: q, niche: niche.title })));
            console.log(`Generated ${queries.length} keywords for ${niche.title}`);
        } catch (error) {
            console.error(`Failed to generate keywords for ${niche.title}:`, error);
        }
    }

    fs.writeFileSync('./src/keywords.json', JSON.stringify(allKeywords, null, 2));
    console.log(`Successfully generated a total of ${allKeywords.length} keywords into src/keywords.json`);
}

generateKeywords();