document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const promptTextarea = document.getElementById('prompt-textarea');
    const resultContainer = document.getElementById('result-container');

    const backendUrl = 'https://lucius-ai.onrender.com'; // Your live backend URL

    generateBtn.addEventListener('click', async () => {
        const prompt = promptTextarea.value;
        if (!prompt) {
            resultContainer.innerText = 'Please enter a topic.';
            return;
        }

        generateBtn.disabled = true;
        generateBtn.innerText = 'Generating...';
        resultContainer.innerHTML = '<div class="loader"></div>';

        try {
            const response = await fetch(`${backendUrl}/api/public/generate-demo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred.');
            }

            resultContainer.innerHTML = `<div class="result">${data.text}</div>`;

        } catch (error) {
            resultContainer.innerHTML = `<div class="result" style="color: #F87171;">Error: ${error.message}</div>`;
        } finally {
            generateBtn.disabled = false;
            generateBtn.innerText = 'Generate';
        }
    });
});