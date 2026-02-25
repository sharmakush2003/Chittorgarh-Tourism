const fs = require('fs');
const path = require('path');

const newKeys = {
    "faq.eyebrow": "Common Questions",
    "faq.title": "People Also Ask about Chittorgarh",
    "faq.q1": "What is Chittorgarh famous for?",
    "faq.a1": "Chittorgarh is world-famous for the Chittorgarh Fort, the largest fort in India and a UNESCO World Heritage site. It is renowned for its magnificent Rajputana architecture, the legendary story of Rani Padmini's Jauhar, and being the land of devotion for the poetess-saint Meera Bai and the bravery of Maharana Pratap.",
    "faq.q2": "Which is the best month to visit Chittorgarh?",
    "faq.a2": "The best time to visit Chittorgarh is between October and March. During these winter months, the weather is pleasant and ideal for exploring the massive fort complex on foot. Visiting during the monsoon (July to September) is also beautiful as the landscape turns lush green.",
    "faq.q3": "How many days are enough for Chittorgarh?",
    "faq.a3": "A 1 to 2 day itinerary is sufficient to explore Chittorgarh. You need at least one full day to see the main attractions inside the fort like Vijay Stambha, Kirti Stambha, Rana Kumbha Palace, and Padmini Palace. A second day allows you to visit nearby attractions like the Bassi Wildlife Sanctuary or Menal Waterfalls.",
    "faq.q4": "Is Chittorgarh worth visiting?",
    "faq.a4": "Yes, Chittorgarh is absolutely worth visiting for history buffs, architecture lovers, and anyone interested in Rajput heritage. Simply walking through its massive 700-acre fort complex, observing the detailed carvings on the Towers of Victory and Fame, and feeling the echoes of legendary heroic tales makes it a must-visit destination in Rajasthan."
};

const translationsDir = path.join(__dirname, 'public', 'translations');

fs.readdirSync(translationsDir).forEach(file => {
    if (file.endsWith('.json')) {
        const filePath = path.join(translationsDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        let shouldSave = false;
        for (const [key, value] of Object.entries(newKeys)) {
            if (!data[key]) {
                // If it's not English, prepend the language code so it's obvious what needs translation later.
                data[key] = file === 'en.json' ? value : `[${file.replace('.json', '')}] ${value}`;
                shouldSave = true;
            }
        }

        if (shouldSave) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
            console.log(`Updated ${file}`);
        }
    }
});
