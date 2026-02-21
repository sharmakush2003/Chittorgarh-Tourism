import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import the translations
import enTranslations from './lib/translations.js';

const langs = ['hi', 'fr', 'de', 'ja', 'es', 'eo'];

langs.forEach(lang => {
    const langPath = path.join(__dirname, 'public', 'translations', `${lang}.json`);
    let existingLang = {};
    if (fs.existsSync(langPath)) {
        try {
            existingLang = JSON.parse(fs.readFileSync(langPath, 'utf8'));
        } catch (e) {
            existingLang = {};
        }
    }

    // We want to keep existing translations, but only for keys that exist in enTranslations
    // However, for keys that DO NOT exist in existingLang, we pull from enTranslations
    const merged = { ...enTranslations, ...existingLang };

    // Write back nicely formatted
    fs.writeFileSync(langPath, JSON.stringify(merged, null, 4));
    console.log(`Updated ${lang}.json with new keys.`);
});
