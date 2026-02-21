const fs = require('fs');
const path = require('path');

const translationsFile = path.join(__dirname, 'lib', 'translations.js');
let content = fs.readFileSync(translationsFile, 'utf8');

// The file looks like:
// const translations = {
//   ...
// };
// export default translations;

// Let's extract the object part
const startIdx = content.indexOf('{');
const endIdx = content.lastIndexOf('}');
const objStr = content.substring(startIdx, endIdx + 1);

// We'll evaluate it safely as a JavaScript object
let enTranslations = {};
try {
    // using new Function to parse JS object string (since JSON.parse won't work on unquoted keys/single quotes)
    enTranslations = new Function('return ' + objStr)();
} catch (e) {
    console.error("Failed to parse translations part:", e);
    process.exit(1);
}

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

    // Merge new keys from English into the target language, keeping existing translations
    const merged = { ...enTranslations, ...existingLang };

    fs.writeFileSync(langPath, JSON.stringify(merged, null, 4));
    console.log(`Updated ${lang}.json with new keys.`);
});
