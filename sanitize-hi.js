const fs = require('fs');
const path = require('path');

const hiPath = path.join(__dirname, 'public', 'translations', 'hi.json');
const enPath = path.join(__dirname, 'public', 'translations', 'en.json');

try {
    const rawHi = fs.readFileSync(hiPath, 'utf8');
    const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    
    // Line by line extraction
    const lines = rawHi.split(/\r?\n/);
    const recovered = {};
    
    for (const line of lines) {
        // Look for "key": "value" on a single line
        const match = line.match(/"([a-zA-Z0-9._-]+)"\s*:\s*"((?:[^"\\]|\\.)*)"/);
        if (match) {
            const key = match[1];
            const val = match[2];
            if (enData.hasOwnProperty(key)) {
                // If it's a valid key and has a value, take it
                // We prefer longer values that look like real sentences
                if (!recovered[key] || val.length > recovered[key].length) {
                    recovered[key] = val;
                }
            }
        }
    }
    
    // Hardcoded fixes for common broken keys
    const criticalHindi = {
        "nav.home": "होम",
        "nav.explore": "अन्वेषण",
        "btn.back": "वापस जाएँ",
        "nav.logoPart1": "चित्तौड़गढ़",
        "nav.logoPart2": "पर्यटन",
        "nav.stays": "ठहरें (Stays)",
        "nav.cuisine": "स्थानीय व्यंजन",
        "nav.blog": "ब्लॉग"
    };

    const newData = {};
    for (const key in enData) {
        if (criticalHindi[key]) {
            newData[key] = criticalHindi[key];
        } else if (recovered[key]) {
            newData[key] = recovered[key];
        } else {
            newData[key] = enData[key];
        }
    }
    
    fs.writeFileSync(hiPath, JSON.stringify(newData, null, 4));
    console.log('Sanitized hi.json line-by-line successfully.');
} catch (e) {
    console.error('Failed to sanitize hi.json', e);
}
