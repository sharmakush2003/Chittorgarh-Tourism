const fs = require('fs');
const path = require('path');

const transDir = path.join(__dirname, 'public', 'translations');
const enPath = path.join(transDir, 'en.json');

if (!fs.existsSync(enPath)) {
    console.error("en.json not found!");
    process.exit(1);
}

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const langs = ['hi', 'fr', 'de', 'ja', 'es', 'eo', 'nl'];

for (const lang of langs) {
    const langPath = path.join(transDir, `${lang}.json`);
    let langData = {};
    if (fs.existsSync(langPath)) {
        try {
            langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));
        } catch (e) {
            console.error(`Error parsing ${lang}.json`, e);
            continue;
        }
    } else {
        console.log(`Created new empty file for ${lang}.json`);
    }

    const newData = {};
    let scrubbed = 0;

    // Copy all keys from english, but map values from langData
    for (const key of Object.keys(enData)) {
        if (langData[key] !== undefined && langData[key] !== enData[key]) {
            newData[key] = langData[key];
        } else if (langData[key] === enData[key]) {
            scrubbed++;
        }
    }

    // Check if langData had keys that are not in english anymore
    for (const key of Object.keys(langData)) {
        if (!enData.hasOwnProperty(key)) {
            // we could keep or delete depreciated keys. let's keep them just in case.
            newData[key] = langData[key];
        }
    }

    fs.writeFileSync(langPath, JSON.stringify(newData, null, 4));
    console.log(`Updated ${lang}.json. Scrubbed ${scrubbed} exact English matches.`);
}

console.log('All translations synced and scrubbed successfully!');
