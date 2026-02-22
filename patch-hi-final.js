const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'translations', 'hi.json');
const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const finalMissingHiData = {
    "explore.hero.title": "प्रमुख पर्यटक आकर्षण",
    "explore.hero.subtitle": "चित्तौड़गढ़ की शाश्वत विरासत की खोज करें",
    "attr.padmini.name": "पद्मिनी महल",
    "attr.padmini.desc": "पानी से घिरा एक पौराणिक महल, रानी पद्मिनी की बहादुरी के लिए प्रसिद्ध। स्थापत्य कला का एक उत्कृष्ट नमूना।",
    "gate.local.title": "जय चित्तौड़गढ़!",
    "gate.local.body": "स्वागत है! चूंकि आप पहले से ही इस ऐतिहासिक शहर से परिचित हैं, आप सीधे साइट में प्रवेश कर सकते हैं।",
    "gate.local.cta1": "वेबसाइट पर जाएँ",
    "gate.local.cta2": "यात्रा जानकारी देखें",
    "gate.fallback.title": "चित्तौड़गढ़ में आपका स्वागत है",
    "gate.fallback.tourist": "मैं यात्रा की योजना बना रहा हूँ",
    "gate.fallback.local": "मैं चित्तौड़गढ़ से हूँ"
};

Object.assign(currentData, finalMissingHiData);
fs.writeFileSync(filePath, JSON.stringify(currentData, null, 4));

console.log("Patched last missing keys!");
