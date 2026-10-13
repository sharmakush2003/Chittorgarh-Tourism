const fs = require('fs');
const path = require('path');

const newKeys = {
    "stays.rtdc.title": "Looking for RTDC Hotel Panna?",
    "stays.rtdc.desc": "While the official RTDC Hotel Panna is a popular government-run choice in Chittorgarh, it is frequently fully booked months in advance, especially during the peak tourist season. If you couldn't secure a reservation, don't worry—the private heritage stays and luxury hotels listed above offer exceptional Rajputana hospitality, modern amenities, and even closer proximity to the Fort, often at very comparable prices."
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
