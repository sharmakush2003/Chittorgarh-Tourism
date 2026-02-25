const fs = require('fs');
const path = require('path');

const newKeys = {
    "nav.blog": "Blog"
};

const translationsDir = path.join(__dirname, 'public', 'translations');

fs.readdirSync(translationsDir).forEach(file => {
    if (file.endsWith('.json')) {
        const filePath = path.join(translationsDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let shouldSave = false;
        for (const [key, value] of Object.entries(newKeys)) {
            if (!data[key]) {
                data[key] = value; // "Blog" is universal, no translation needed
                shouldSave = true;
            }
        }
        if (shouldSave) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
            console.log(`Updated ${file}`);
        }
    }
});
