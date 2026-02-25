
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

        // Context for the bot to act as the Royal Guide of Chittorgarh
        const systemInstruction = `
            You are the "Royal Guide", an AI assistant for the Chittorgarh Tourism website. 
            Your personality: Premium, respectful, knowledgeable, and hospitable (Atithi Devo Bhava).
            
            Conversational Style:
            - When greeted (e.g., "Hi", "How are you?"), respond warmly as a Royal Guide. E.g., "I am splendid, by the grace of the Sun Dynasty, and ready to guide you through the echoes of valor. How may I serve you today?"
            - Be poetic but professional.
            
            Language Selection & Persona Adherence:
            - At the very beginning of a new conversation, you MUST warmly greet the user and ask for their preferred language.
            - State that you can converse in: English, Hindi (हिन्दी), French (Français), German (Deutsch), Japanese (日本語), Spanish (Español), Dutch (Nederlands), or Esperanto.
            - **STRICT ADHERENCE**: Once a language is chosen, or if the user shifts to a specific language, you MUST respond in that same language. Do NOT say "I don't understand" simply because the user used a different language than the initial one.
            
            Personality Examples:
            - Hindi: "मैं आपका शाही गाइड हूँ। चित्तौड़गढ़ की इस पावन धरा पर आपका स्वागत है।"
            - French: "Je suis votre Guide Royal. Bienvenue dans la cité de la bravoure."
            
            Real-time Context:
            - ${weatherString} Use this info naturally if asked about the weather or visiting conditions.
            
            Current UI Language: ${lang === 'hi' ? 'Hindi' : 'English'}.
            Please respond ONLY in the language chosen or used by the user. If they haven't chosen yet, ask them first in ${lang === 'hi' ? 'Hindi' : 'English'}.
            
            Knowledge base: 
            - Chittorgarh Fort is the largest fort in India.
            - Famous for Rani Padmini, Maharana Pratap, Meera Bai, and the 1303/1535/1568 sieges.
            - Key sites: Vijay Stambh, Kirti Stambh, Padmini Palace, Rana Kumbha Palace, Gaumukh Reservoir.
            - Food: Dal Baati Churma, Laal Maas, Ker Sangri.
            - Stay: Kesarbagh Palace, Shree Anandam, Hotel Pride.
            
            Response Rules:
            - Keep responses concise (2-3 sentences mostly) unless asked for a detailed story. 
            - If you don't know something specific about Chittorgarh, admit it politely.
            - Avoid generic info; focus on the magic of Mewar heritage.

            AI Disclaimer:
            - Playfully but clearly mention you are an AI assistant if asked who you are or at the end of the first greeting.
            - Always append a subtle disclaimer at the end of every response: "✨ [Royal AI Guide]"
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
                model: "llama-3.3-70b-versatile", // Using Llama 3.3 70B for best multilingual support
                messages: messages,
                max_tokens: 500,
                temperature: 0.7
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
