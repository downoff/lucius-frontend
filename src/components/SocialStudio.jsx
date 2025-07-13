import React, { useState } from 'react';

function SocialStudio() {
    // State for the form inputs
    const [coreMessage, setCoreMessage] = useState('');
    const [platform, setPlatform] = useState('X (formerly Twitter)');
    const [keywords, setKeywords] = useState('');

    // State to manage loading and the AI's response
    const [isLoading, setIsLoading] = useState(false);
    const [output, setOutput] = useState('Your generated social media posts will appear here.');

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        
        setIsLoading(true);
        setOutput('Lucius is crafting your posts...');

        let finalPrompt = `You are an expert social media marketer. Your target platform is ${platform}. Create 3 variations of a social media post based on the following core message: "${coreMessage}". The tone should be engaging and professional.`;
        if (keywords) {
            finalPrompt += ` Be sure to include the following keywords: ${keywords}.`;
        }

        try {
            const response = await puter.ai.chat(finalPrompt);
            setOutput(response.message.content);
        } catch (error) {
            console.error("Error during Puter.js generation:", error);
            setOutput('Sorry, an error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <article id="chat-interface">
            <h1 id="welcome-message">Lucius Social Media Studio</h1>

            <div id="output-area" style={{ marginTop: '2rem', border: '1px solid var(--border-color)', padding: '1rem', minHeight: '200px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                {output}
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
                <label htmlFor="core-message">Core Message or Topic</label>
                <textarea 
                    id="core-message" 
                    placeholder="e.g., The launch of our new productivity app..." 
                    required
                    value={coreMessage}
                    onChange={(e) => setCoreMessage(e.target.value)}
                ></textarea>

                <label htmlFor="platform-select">Target Platform</label>
                <select 
                    id="platform-select"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                >
                  <option value="X (formerly Twitter)">X (Twitter)</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Instagram Caption">Instagram</option>
                  <option value="Facebook">Facebook</option>
                </select>

                <label htmlFor="keywords">Keywords to Include (optional)</label>
                <input 
                    type="text" 
                    id="keywords" 
                    name="keywords" 
                    placeholder="e.g., productivity, new feature, launch"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)} /* <-- THIS LINE IS NOW FIXED */
                />
                
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                    <button type="submit" id="generate-button" disabled={isLoading}>
                        {isLoading ? 'Generating...' : 'Generate Posts'}
                    </button>
                    {isLoading && <span id="loader"><div className="loader"></div></span>}
                </div>
            </form>
        </article>
    );
}

export default SocialStudio;