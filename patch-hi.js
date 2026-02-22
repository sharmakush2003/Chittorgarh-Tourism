const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'translations', 'hi.json');
const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const missingHiData = {
    "htr.eyebrow": "यात्रा गाइड · राजस्थान, भारत",
    "htr.hero.title1": "कैसे पहुँचें",
    "htr.hero.title2": "चित्तौड़गढ़",
    "htr.hero.sub": "भारत के महानतम किलों में से एक की यात्रा की योजना बनाएं। इस ऐतिहासिक शहर तक पहुंचने के हर तरीके यहाँ दिए गए हैं।",
    "htr.locPromptTitle": "आप कहाँ से यात्रा कर रहे हैं?",
    "htr.locPromptSub": "अपना स्थान साझा करें और हम आपको चित्तौड़गढ़ के लिए सबसे अच्छा मार्ग दिखाएंगे — दूरी, ड्राइव का समय, और आपके लिए अनुकूलित परिवहन विकल्प।",
    "lbl.perNight": "/ रात्रि",
    "lbl.bestTime": "सर्वोत्तम समय"
};

Object.assign(currentData, missingHiData);
fs.writeFileSync(filePath, JSON.stringify(currentData, null, 4));

console.log("Patched hi.json with missing hero and stay keys!");
