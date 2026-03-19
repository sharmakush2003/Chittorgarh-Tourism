const fs = require('fs');
const path = require('path');

const hiPath = path.join(__dirname, 'public', 'translations', 'hi.json');
const enPath = path.join(__dirname, 'public', 'translations', 'en.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const h = {
    "kalika.hero.eyebrow": "8वीं शताब्दी का रक्षक",
    "kalika.hero.title": "कालिका माता: संरक्षक देवी",
    "kalika.hero.desc": "प्रतिहार युग का एक भव्य सूर्य मंदिर, यह पवित्र स्थान चित्तौड़गढ़ की अटूट भावना का प्रमाण है।",
    "kalika.stats.age": "1200+ वर्ष पुराना",
    "kalika.stats.type": "नगर शैली",
    "kalika.stats.deity": "देवी कालिका",
    "kalika.nav.overview": "अवलोकन",
    "kalika.nav.history": "गौरवगाथा",
    "kalika.nav.architecture": "डिजाइन",
    "kalika.section.overview": "पुनर्जन्म: सूर्य मंदिर",
    "kalika.section.history": "समय की गूँज",
    "kalika.section.architecture": "वास्तुकला की श्रेष्ठता",
    "kalika.overview.p1": "कालिका माता मंदिर चित्तौड़गढ़ किले के भीतर सबसे पुराने और सबसे प्रतिष्ठित मंदिरों में से एक है। मूल रूप से 8वीं शताब्दी में सूर्य देव को समर्पित एक मंदिर के रूप में निर्मित, इसे बाद में 14वीं शताब्दी के आक्रमणों के दौरान नष्ट कर दिया गया था और अंततः देवी कालिका के मंदिर के रूप में बहाल किया गया था।",
    "kalika.overview.p2": "यह मंदिर अपनी जटिल नक्काशी और चित्तौड़गढ़ के शासकों की संरक्षक देवी के रूप में जाना जाता है। यह आज भी पूजा का एक जीवंत केंद्र बना हुआ है, विशेष रूप से नवरात्रि उत्सव के दौरान।",
    "kalika.history.era1.year": "8वीं शताब्दी",
    "kalika.history.era1.title": "सूर्य का उदय",
    "kalika.history.era1.desc": "प्रतिहार काल के दौरान एक भव्य सूर्य मंदिर के रूप में निर्मित, जिसमें भोर की पहली किरणों को पकड़ने के लिए पूर्व की ओर मुख वाला प्रवेश द्वार है।",
    "kalika.history.era2.year": "14वीं शताब्दी",
    "kalika.history.era2.title": "खंडहर में मंदिर",
    "kalika.history.era2.desc": "अलाउद्दीन खिलजी के घेराबंदी के दौरान मंदिर को काफी हद तक ध्वस्त कर दिया गया था, जिससे केवल इसकी मजबूत नींव और मुख्य संरचना बची थी।",
    "kalika.history.era3.year": "वर्तमान युग",
    "kalika.history.era3.title": "किले की देवी",
    "kalika.history.era3.desc": "इसकी बहाली और देवी कालिका को समर्पण के बाद, यह शाही परिवार और आम लोगों के लिए प्रमुख मंदिर बन गया।",
    "attr.kalika_arch.mandapa.name": "विशाल मंडप",
    "attr.kalika_arch.mandapa.desc": "प्रारंभिक नगर शैली के प्रतीक, स्वर्गदूतों और फूलों के रूपांकनों को दर्शाने वाले जटिल नक्काशीदार स्तंभों वाला एक विशाल सभा स्थल।",
    "attr.kalika_arch.sanctum.name": "गर्भगृह",
    "attr.kalika_arch.sanctum.desc": "गर्भगृह में देवी कालिका की शक्तिशाली मूर्ति है, जिसे मूल सूर्य मंदिर परिसर के ढांचे के भीतर रखा गया है।",
    "attr.kalika_arch.facade.name": "बाहरी नक्काशी",
    "attr.kalika_arch.facade.desc": "बाहरी दीवारों को मूर्तियों की पंक्तियों से सजाया गया है, हालांकि समय के साथ वे घिस गई हैं, फिर भी वे 8वीं शताब्दी की कलात्मक उत्कृष्टता को प्रकट करती हैं।"
};

// We read current hi.json to preserve existing keys (like rtdc and faq we just fixed)
const currentHi = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

const final = { ...currentHi }; // Start with what we have
for (const k in h) {
    final[k] = h[k];
}

// Sync missing keys from en as placeholders (though we think we have them all)
for (const k in en) {
    if (!final[k]) final[k] = en[k];
}

fs.writeFileSync(hiPath, JSON.stringify(final, null, 4));
console.log('Patched hi.json with Kalika translations.');
