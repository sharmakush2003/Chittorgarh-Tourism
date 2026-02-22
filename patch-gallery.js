const fs = require('fs');
const translations = {
    en: {
        "nav.gallery": "Gallery",
        "gallery.title": "Visual Gallery",
        "gallery.subtitle": "A glimpse into the stunning heritage of Chittorgarh, curated from Pinterest."
    },
    hi: {
        "nav.gallery": "गैलरी",
        "gallery.title": "दृश्य गैलरी",
        "gallery.subtitle": "पिंटरेस्ट से संकलित चित्तौड़गढ़ की आश्चर्यजनक विरासत की एक झलक।"
    },
    fr: {
        "nav.gallery": "Galerie",
        "gallery.title": "Galerie Visuelle",
        "gallery.subtitle": "Un aperçu du magnifique héritage de Chittorgarh, sélectionné sur Pinterest."
    },
    de: {
        "nav.gallery": "Galerie",
        "gallery.title": "Visuelle Galerie",
        "gallery.subtitle": "Ein Einblick in das atemberaubende Erbe von Chittorgarh, zusammengestellt von Pinterest."
    },
    ja: {
        "nav.gallery": "ギャラリー",
        "gallery.title": "ビジュアルギャラリー",
        "gallery.subtitle": "Pinterestから厳選された、チットルガルの素晴らしい遺産の片鱗。"
    }
};

const langs = ['en', 'hi', 'fr', 'de', 'ja'];

for (const lang of langs) {
    const file = `public/translations/${lang}.json`;
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    Object.assign(data, translations[lang]);
    fs.writeFileSync(file, JSON.stringify(data, null, 4), 'utf-8');
}
console.log("Translations updated!");
