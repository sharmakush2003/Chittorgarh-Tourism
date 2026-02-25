const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API key found in .env.local");
        return;
    }

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log("=== START_MODEL_LIST ===");
            data.models.forEach(m => console.log(m.name));
            console.log("=== END_MODEL_LIST ===");
        } else {
            console.error("Could not list models. Error data:", JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.error("Error:", err.message);
    }
}

listModels();
