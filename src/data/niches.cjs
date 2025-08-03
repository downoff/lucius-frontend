// src/data/niches.cjs
const niches = [
    // Tech & SaaS
    { slug: "saas-founders", title: "SaaS Founders", placeholder: "e.g., The launch of our new B2B productivity feature." },
    { slug: "mobile-app-developers", title: "Mobile App Developers", placeholder: "e.g., A new update for our app is live with these exciting features." },
    { slug: "tech-startups", title: "Tech Startups", placeholder: "e.g., Announcing our Series A funding round and future plans." },
    { slug: "game-developers", title: "Game Developers", placeholder: "e.g., Announcing the release date for our new indie game." },
    { slug: "web3-projects", title: "Web3 Projects", placeholder: "e.g., The launch of our new NFT collection." },
    { slug: "dev-tool-creators", title: "Developer Tool Creators", placeholder: "e.g., Announcing a new integration for our API." },
    { slug: "cybersecurity-experts", title: "Cybersecurity Experts", placeholder: "e.g., A warning about a new phishing scam." },
    { slug: "ai-researchers", title: "AI Researchers", placeholder: "e.g., Our new paper on large language models has been published." },
    { slug: "product-managers", title: "Product Managers", placeholder: "e.g., A breakdown of our latest feature release and user feedback." },
    { slug: "devops-engineers", title: "DevOps Engineers", placeholder: "e.g., How we achieved a 99.99% uptime this quarter." },

    // Creative Professionals
    { slug: "graphic-designers", title: "Graphic Designers", placeholder: "e.g., Showcasing a recent branding project for a new client." },
    { slug: "photographers", title: "Photographers", placeholder: "e.g., A behind-the-scenes look at a recent wedding photoshoot." },
    { slug: "authors-and-writers", title: "Authors & Writers", placeholder: "e.g., The cover reveal for my upcoming novel." },
    { slug: "musicians-and-bands", title: "Musicians & Bands", placeholder: "e.g., The release of our new single and upcoming tour dates." },
    { slug: "filmmakers", title: "Filmmakers", placeholder: "e.g., The trailer for our new short film is out now." },
    { slug: "artists-and-illustrators", title: "Artists & Illustrators", placeholder: "e.g., My new collection of prints is now available." },
    { slug: "ux-ui-designers", title: "UX/UI Designers", placeholder: "e.g., A case study on our recent app redesign." },
    { slug: "voice-actors", title: "Voice Actors", placeholder: "e.g., My new character demo reel is live." },
    { slug: "interior-designers", title: "Interior Designers", placeholder: "e.g., A tour of our latest home renovation project." },
    { slug: "fashion-designers", title: "Fashion Designers", placeholder: "e.g., A sneak peek at our upcoming fall collection." },

    // Marketing & Business
    { slug: "digital-marketing-agencies", title: "Digital Marketing Agencies", placeholder: "e.g., A case study showing how we increased a client's ROI by 300%." },
    { slug: "b2b-consultants", title: "B2B Consultants", placeholder: "e.g., An insight into the future of supply chain management." },
    { slug: "financial-advisors", title: "Financial Advisors", placeholder: "e.g., 5 tips for young investors to start building wealth." },
    { slug: "real-estate-agents", title: "Real Estate Agents", placeholder: "e.g., A new 4-bedroom house listing with a modern kitchen." },
    { slug: "e-commerce-brands", title: "E-commerce Brands", placeholder: "e.g., A 24-hour flash sale on our best-selling products." },
    { slug: "seo-specialists", title: "SEO Specialists", placeholder: "e.g., The latest Google algorithm update and what it means for you." },
    { slug: "public-relations-firms", title: "Public Relations Firms", placeholder: "e.g., Announcing a major new client partnership." },
    { slug: "event-planners", title: "Event Planners", placeholder: "e.g., Early bird tickets for our annual conference are now on sale." },
    { slug: "sales-teams", title: "Sales Teams", placeholder: "e.g., A success story about closing a major enterprise deal." },
    { slug: "hr-managers", title: "HR Managers", placeholder: "e.g., We're hiring! Announcing new open positions at our company." },

    // Influencers & Creators
    { slug: "fitness-coaches", title: "Fitness Coaches", placeholder: "e.g., A high-intensity interval training (HIIT) workout." },
    { slug: "life-coaches", title: "Life Coaches", placeholder: "e.g., A motivational post about overcoming procrastination." },
    { slug: "travel-bloggers", title: "Travel Bloggers", placeholder: "e.g., A photo dump from my recent trip to Bali with travel tips." },
    { slug: "health-and-wellness-influencers", title: "Health & Wellness Influencers", placeholder: "e.g., My top 5 favorite healthy breakfast recipes." },
    { slug: "podcast-hosts", title: "Podcast Hosts", placeholder: "e.g., Announcing a special guest for this week's episode." },
    { slug: "food-bloggers", title: "Food Bloggers", placeholder: "e.g., A new recipe for a one-pan chicken dinner." },
    { slug: "youtube-creators", title: "YouTube Creators", placeholder: "e.g., My new video just dropped! Go watch it now." },
    { slug: "tiktok-dancers", title: "TikTok Dancers", placeholder: "e.g., Trying out the latest viral dance challenge." },
    { slug: "beauty-influencers", title: "Beauty Influencers", placeholder: "e.g., A tutorial on my everyday makeup routine." },
    { slug: "bookstagrammers", title: "Bookstagrammers", placeholder: "e.g., My monthly reading wrap-up and favorite books." },

    // Local Businesses
    { slug: "local-restaurants", title: "Local Restaurants", placeholder: "e.g., Our new seasonal menu featuring fresh, local ingredients." },
    { slug: "local-coffee-shops", title: "Local Coffee Shops", placeholder: "e.g., Introducing our new seasonal pumpkin spice latte." },
    { slug: "bakeries-and-cafes", title: "Bakeries & Cafes", placeholder: "e.g., Freshly baked croissants are ready!" },
    { slug: "hair-salons", title: "Hair Salons", placeholder: "e.g., A stunning before-and-after hair transformation." },
    { slug: "local-gyms", title: "Local Gyms", placeholder: "e.g., A new group fitness class starting next week." },
    { slug: "boutique-hotels", title: "Boutique Hotels", placeholder: "e.g., A weekend getaway package for the upcoming holiday." },
    { slug: "law-firms", title: "Law Firms", placeholder: "e.g., A blog post explaining a recent change in local regulations." },
    { slug: "dentists", title: "Dentists", placeholder: "e.g., A reminder to book your semi-annual cleaning." },
    { slug: "veterinarians", title: "Veterinarians", placeholder: "e.g., Tips for keeping your pet cool during the summer." },
    { slug: "florists", title: "Florists", placeholder: "e.g., Announcing our new bouquet of the week." },
    
    // Education & Non-Profit
    { slug: "online-course-creators", title: "Online Course Creators", placeholder: "e.g., Enrollment for my new masterclass is now open." },
    { slug: "non-profit-organizations", title: "Non-Profit Organizations", placeholder: "e.g., A fundraising campaign for our new community outreach program." },
    { slug: "tutors", title: "Tutors", placeholder: "e.g., I have a few spots open for new students this semester." },
    { slug: "universities", title: "Universities", placeholder: "e.g., Applications for the fall semester are now being accepted." },
    { slug: "museums-and-galleries", title: "Museums & Galleries", placeholder: "e.g., Announcing our new exhibition opening this Friday." },
    { slug: "libraries", title: "Libraries", placeholder: "e.g., A reminder about our upcoming author talk and book signing." },
];

module.exports = { niches };