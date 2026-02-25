const fs = require('fs');
const path = require('path');

const translations = {
    en: {
        "blog.eyebrow": "Travel Insights & Guides",
        "blog.title": "Chittorgarh Blog",
        "blog.readBtn": "Read Article",
        "blog.allArticles": "All Articles"
    },
    hi: {
        "blog.eyebrow": "यात्रा अंतर्दृष्टि और गाइड",
        "blog.title": "चित्तौड़गढ़ ब्लॉग",
        "blog.readBtn": "लेख पढ़ें",
        "blog.allArticles": "सभी लेख"
    },
    fr: {
        "blog.eyebrow": "Conseils et guides de voyage",
        "blog.title": "Blog de Chittorgarh",
        "blog.readBtn": "Lire l'article",
        "blog.allArticles": "Tous les articles"
    },
    de: {
        "blog.eyebrow": "Reiseeinblicke & Reiseführer",
        "blog.title": "Chittorgarh Blog",
        "blog.readBtn": "Artikel lesen",
        "blog.allArticles": "Alle Artikel"
    },
    ja: {
        "blog.eyebrow": "旅行の洞察とガイド",
        "blog.title": "チットールガルブログ",
        "blog.readBtn": "記事を読む",
        "blog.allArticles": "すべての記事"
    },
    es: {
        "blog.eyebrow": "Consejos y guías de viaje",
        "blog.title": "Blog de Chittorgarh",
        "blog.readBtn": "Leer artículo",
        "blog.allArticles": "Todos los artículos"
    },
    eo: {
        "blog.eyebrow": "Vojaĝaj Enrigardoj kaj Gvidiloj",
        "blog.title": "Blogo de Chittorgarh",
        "blog.readBtn": "Legu Artikolon",
        "blog.allArticles": "Ĉiuj Artikoloj"
    },
    nl: {
        "blog.eyebrow": "Reisinzichten & Gidsen",
        "blog.title": "Chittorgarh Blog",
        "blog.readBtn": "Lees Artikel",
        "blog.allArticles": "Alle Artikelen"
    }
};

const translationsDir = path.join(__dirname, 'public', 'translations');

for (const [lang, msgs] of Object.entries(translations)) {
    const filePath = path.join(translationsDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        for (const [k, v] of Object.entries(msgs)) {
            data[k] = v;
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        console.log(`Added UI translations for ${lang}.json`);
    }
}
