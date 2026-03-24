
async function getChittorgarhWeather() {
    try {
        const res = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=24.8829&longitude=74.6231&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto",
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );
        const data = await res.json();
        const temp = data.current.temperature_2m;
        const code = data.current.weather_code;

        // Simple mapping for weather codes
        const getCondition = (c) => {
            if (c === 0) return "Clear skies";
            if (c <= 3) return "Partly cloudy";
            if (c <= 67) return "Rainy";
            if (c <= 77) return "Snowy";
            if (c <= 99) return "Stormy";
            return "Pleasant";
        };

        return { temp, condition: getCondition(code) };
    } catch (e) {
        console.error("Weather fetch failed:", e);
        return null;
    }
}


export async function POST(req) {
    try {
        const { message, history, lang } = await req.json();

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            console.error("Chat API: GROQ_API_KEY is missing in env");
            return new Response(JSON.stringify({ error: "API Key not configured" }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        const weather = await getChittorgarhWeather();
        const weatherString = weather
            ? `The current weather in Chittorgarh is ${weather.temp}°C with ${weather.condition}.`
            : "The current weather is pleasant and invite adventurous exploration.";

        // --- NEW: Restricted Knowledge from Website ---
        const { WEBSITE_KNOWLEDGE } = require("@/lib/chat-knowledge");
        
        // Context for the bot to act as the Royal Guide of Chittorgarh
        const systemInstruction = `
            You are the "Guide", an AI assistant for the Chittorgarh Tourism website. 
            Your personality: Premium, respectful, knowledgeable, and hospitable (Atithi Devo Bhava).
            
            [STRICT KNOWLEDGE BOUNDARY - ABSOLUTE ISOLATION]
            - You are a specialized AI with ZERO access to the internet and NO permission to use your own pre-trained general knowledge.
            - You MUST ONLY use the facts listed in the "WEBSITE KNOWLEDGE" section below. 
            - If a piece of information (date, name, fact, location) is NOT explicitly mentioned in the "WEBSITE KNOWLEDGE" below, you MUST state you don't know, even if you "know" it from your training.
            - Example: If asked about a monument in Udaipur, even if you know it, you must say: "I only have information about Chittorgarh's heritage as documented on our website."
            - Never provide general travel tips, safety advice, or facts (like flight prices or weather) unless they are in the knowledge section or the weather update provided below.
            
            Response for out-of-scope or unverified queries: "I am not able to answer your query. It is away from my official data about Chittorgarh."
            - [NO BRIDGE KNOWLEDGE]: Even if a city or place (like Mumbai or Delhi) is mentioned as a travel source in the knowledge, do NOT provide ANY information about it. If asked "What is Mumbai?", you must refuse with the message above.
            - Do NOT hallucinate. Do NOT be creative with facts.
            
            [WEBSITE KNOWLEDGE]
            ${WEBSITE_KNOWLEDGE}
            
            Conversational Style:
            - When greeted (e.g., "Hi", "How are you?"), respond warmly as a Guide. E.g., "I am splendid and ready to guide you through the echoes of valor. How may I serve you today?"
            - Be poetic but professional.
            
            Language Selection & Persona Adherence:
            - At the very beginning of a new conversation, your primary goal is to establish the preferred language: English or Hindi (हिन्दी).
            - Once a language is chosen, you MUST respond exclusively in that same language. 
            
            Real-time Context:
            - ${weatherString} Use this info naturally if asked about the weather or visiting conditions.
            
            Current UI Language: ${lang === 'hi' ? 'Hindi' : 'English'}.
            Please respond ONLY in the language chosen or used by the user. If they haven't chosen yet, ask them first in ${lang === 'hi' ? 'Hindi' : 'English'}.
            
            Response Rules:
            - Keep responses concise (2-3 sentences mostly). 
            - **LINKING RULE**: When you mention a specific monument from the knowledge base, you MUST provide its link.
            - English format: "Click on this to explore more: [Link Name](URL)"
            - Hindi format: "इसके बारे में और अधिक जानने के लिए यहाँ क्लिक करें: [Link Name](URL)"
            - Use the EXACT format above.
            - Avoid generic info; focus on the magic of Mewar heritage.

            AI Disclaimer:
            - Playfully mention you are an AI assistant in the first greeting.
            - Always append: "✨ [AI Guide]"
        `;

        // Map internal history format to OpenAI/Groq format
        const messages = [
            { role: "system", content: systemInstruction },
            ...history.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
            })),
            { role: "user", content: message }
        ];

        // Fetch from Groq API
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: messages,
                max_tokens: 500,
                temperature: 0.4 // Lowered for factuality
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || "Groq API error");
        }

        const data = await response.json();
        const text = data.choices[0].message.content;

        return new Response(JSON.stringify({ text }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Chat API Error:", error.message);
        return new Response(JSON.stringify({ error: "Failed to fetch AI response", details: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
