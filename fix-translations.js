const fs = require('fs');
const path = require('path');
const en = require('./public/translations/en.json');

// These are the keys we need to properly translate
// For Hindi: real translations
// For all other non-English: remove prefix placeholders so fallback to English kicks in

const hindiTranslations = {
    // FAQ
    "faq.eyebrow": "सामान्य प्रश्न",
    "faq.title": "चित्तौड़गढ़ के बारे में अक्सर पूछे जाने वाले प्रश्न",
    "faq.q1": "चित्तौड़गढ़ किस लिए प्रसिद्ध है?",
    "faq.a1": "चित्तौड़गढ़ अपने विशाल चित्तौड़गढ़ किले के लिए विश्व प्रसिद्ध है, जो भारत का सबसे बड़ा किला और यूनेस्को विश्व धरोहर स्थल है। यह रानी पद्मिनी के जौहर की वीरगाथा, मीरा बाई की भक्ति और महाराणा प्रताप की शौर्यगाथा के लिए जाना जाता है।",
    "faq.q2": "चित्तौड़गढ़ घूमने का सबसे अच्छा समय कौन सा है?",
    "faq.a2": "चित्तौड़गढ़ घूमने का सबसे अच्छा समय अक्टूबर से मार्च के बीच है। इन सर्दियों के महीनों में मौसम सुहावना रहता है और किले का भ्रमण आसान होता है। मानसून (जुलाई-सितंबर) में हरियाली के कारण दृश्य भी सुंदर होता है।",
    "faq.q3": "चित्तौड़गढ़ के लिए कितने दिन पर्याप्त हैं?",
    "faq.a3": "चित्तौड़गढ़ घूमने के लिए 1 से 2 दिन पर्याप्त हैं। एक पूरे दिन में विजय स्तंभ, कीर्ति स्तंभ, राणा कुम्भा महल और पद्मिनी महल देखे जा सकते हैं। दूसरे दिन बस्सी वन्यजीव अभयारण्य या मेनाल जलप्रपात का भ्रमण किया जा सकता है।",
    "faq.q4": "क्या चित्तौड़गढ़ घूमने लायक है?",
    "faq.a4": "हाँ, चित्तौड़गढ़ इतिहास प्रेमियों, वास्तुकला के जानकारों और राजपूत विरासत में रुचि रखने वाले हर व्यक्ति के लिए अवश्य घूमने योग्य है। 700 एकड़ में फैले इस विशाल किले में विजय और शौर्य की अनगिनत कहानियाँ गूंजती हैं।",
    // RTDC
    "stays.rtdc.title": "क्या RTDC होटल पन्ना में बुकिंग नहीं मिली?",
    "stays.rtdc.desc": "RTDC होटल पन्ना एक लोकप्रिय सरकारी विकल्प है, लेकिन पीक सीजन में यह अक्सर पूरी तरह बुक रहता है। नीचे सूचीबद्ध प्राइवेट हेरिटेज होटल समान सुविधाएं, किले से बेहतर नजदीकी और उतना ही प्रामाणिक राजस्थानी अनुभव प्रदान करते हैं।",
};

const translationsDir = path.join(__dirname, 'public', 'translations');
const files = fs.readdirSync(translationsDir).filter(f => f.endsWith('.json'));

for (const file of files) {
    const filePath = path.join(translationsDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const lang = file.replace('.json', '');
    let changed = false;

    const relevantKeys = [
        'faq.eyebrow', 'faq.title', 'faq.q1', 'faq.a1',
        'faq.q2', 'faq.a2', 'faq.q3', 'faq.a3', 'faq.q4', 'faq.a4',
        'stays.rtdc.title', 'stays.rtdc.desc'
    ];

    for (const key of relevantKeys) {
        if (lang === 'en') continue; // Don't touch English

        if (lang === 'hi') {
            // Add real Hindi translations
            if (hindiTranslations[key] && data[key] !== hindiTranslations[key]) {
                data[key] = hindiTranslations[key];
                changed = true;
            }
        } else {
            // Remove any prefixed placeholders like "[fr] Some English text"
            // so that LanguageContext falls back to English gracefully
            if (data[key] && data[key].startsWith(`[${lang}]`)) {
                delete data[key];
                changed = true;
            }
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        console.log(`Fixed ${file}`);
    }
}

console.log('Done!');
