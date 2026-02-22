const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'public', 'translations', 'en.json');
const hiPath = path.join(__dirname, 'public', 'translations', 'hi.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const hiData = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

const missing = [];
for (const key of Object.keys(enData)) {
    if (!hiData[key]) {
        missing.push(key);
    }
}

if (missing.length > 0) {
    console.log("Still missing the following keys in hi.json:");
    console.log(missing.join(', '));
} else {
    console.log("All en.json keys are now present in hi.json! Sanity check passed.");
}
