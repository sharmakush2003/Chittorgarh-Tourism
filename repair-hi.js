const fs = require('fs');
const path = require('path');

const hiPath = path.join(__dirname, 'public', 'translations', 'hi.json');
const enPath = path.join(__dirname, 'public', 'translations', 'en.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Hardcoded recovery of important Hindi keys
const h = {
    "nav.logoPart1": "चित्तौड़गढ़",
    "nav.logoPart2": "पर्यटन",
    "nav.home": "होम",
    "nav.explore": "अन्वेषण",
    "nav.chronicles": "गौरवगाथा",
    "nav.stays": "ठहरें",
    "nav.cuisine": "स्थानीय व्यंजन",
    "nav.gallery": "गैलरी",
    "btn.back": "वापस जाएँ",
    "vijay.hero.eyebrow": "वास्तुकला का चमत्कार",
    "vijay.hero.title": "विजय स्तंभ: जीत की मीनार",
    "vijay.hero.desc": "मेवाड़ के गौरव का प्रतीक, यह नौ मंजिला स्तंभ भारतीय वास्तुकला का एक अनुपम उदाहरण है।",
    "vijay.stats.height": "37 मीटर ऊँचा",
    "vijay.stats.steps": "157 संकरी सीढ़ियाँ",
    "vijay.stats.stories": "9 विशिष्ट मंजिलें",
    "vijay.nav.overview": "अवलोकन",
    "vijay.nav.history": "इतिहास",
    "vijay.nav.architecture": "वास्तुकला",
    "vijay.section.overview": "मेवाड़ का गौरव",
    "vijay.section.history": "विजय की गाथा",
    "vijay.section.architecture": "दिव्य वास्तुकला",
    "vijay.overview.p1": "विजय स्तंभ चित्तौड़गढ़ किले के भीतर स्थित एक भव्य विजय स्मारक है। इसका निर्माण मेवाड़ के राजा राणा कुंभा ने 1448 में मालवा और गुजरात की सेनाओं पर अपनी जीत के उपलक्ष्य में करवाया था।",
    "vijay.overview.p2": "भगवान विष्णु को समर्पित यह स्तंभ धार्मिक और सांस्कृतिक एकता का प्रतीक है। इसकी दीवारों पर हिंदू देवी-देवताओं की सैकड़ों जटिल नक्काशी की गई है।",
    "vijay.history.era1.year": "1440 - 1448",
    "vijay.history.era1.title": "विजय का संकल्प",
    "vijay.history.era1.desc": "सारंगपुर की लड़ाई के बाद, राणा कुंभा ने एक ऐसा स्मारक बनाने का संकल्प लिया जो अनंत काल तक खड़ा रहे।",
    "vijay.history.era2.year": "मध्यकालीन युग",
    "vijay.history.era2.title": "मेवाड़ का प्रकाशस्तंभ",
    "vijay.history.era2.desc": "सदियों तक, यह स्तंभ राजपूत गौरव के प्रकाशस्तंभ के रूप में कार्य करता रहा, जो दूर से ही मेवाड़ की शक्ति का संकेत देता था।",
    "vijay.history.era3.year": "वर्तमान समय",
    "vijay.history.era3.title": "एक राष्ट्रीय धरोहर",
    "vijay.history.era3.desc": "आज, विजय स्तंभ को भारत में धार्मिक वास्तुकला के सबसे उल्लेखनीय उदाहरणों में से एक माना जाता है।",
    "attr.vijay_base.name": "नींव और वास्तुकार",
    "attr.vijay_base.desc": "स्तंभ 47 फीट वर्गाकार चबूतरे पर खड़ा है। इसके मुख्य वास्तुकारों—सूत्रधार जैता और उनके पुत्रों—के नाम पाँचवीं मंजिल पर अंकित हैं।",
    "attr.vijay_icons.name": "मूर्तियों का शब्दकोश",
    "attr.vijay_icons.desc": "स्तंभ का हर इंच हिंदू देवी-देवताओं, अप्सराओं और दैनिक जीवन के दृश्यों से उकेरा गया है।",
    "attr.vijay_harmony.name": "धार्मिक सद्भाव",
    "attr.vijay_harmony.desc": "राणा कुंभा की समावेशी दृष्टि को दर्शाते हुए, स्तंभ की तीसरी और आठवीं मंजिल पर अरबी में 'अल्लाह' शब्द अंकित है।",
    "btn.readMore": "और पढ़ें",
    "btn.readLess": "कम दिखाएं",
    "fort.audio.listen": "सुनें",
    "fort.audio.playing": "चल रहा है..."
};

const final = {};
for (const k in en) {
    final[k] = h[k] || en[k]; // fallback to English if not in h
}

fs.writeFileSync(hiPath, JSON.stringify(final, null, 4));
console.log('Final clean hi.json written.');
