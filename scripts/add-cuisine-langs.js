const fs = require('fs');
const path = require('path');

const locales = ['en', 'hi', 'fr', 'de', 'ja'];
const dir = path.join(__dirname, 'public', 'translations');

const newKeys = {
    en: {
        "nav.cuisine": "Local Cuisines",
        "cui.eyebrow": "Flavors of Mewar",
        "cui.title": "Authentic Rajasthani Cuisines",
        "cui.desc": "Discover the rich, spicy, and royal flavors that have defined Mewari culture for centuries.",
        "cui.footerText": "Hungry for more history?",
        "cui.footerBtn": "Explore Attractions",
        "cui.c1.name": "Dal Bati Churma",
        "cui.c1.desc": "The quintessential Rajasthani dish. Hard wheat rolls (Bati) served with lentil curry (Dal) and a sweet crumbled wheat dessert (Churma).",
        "cui.c1.spicy": "Mild - Medium",
        "cui.c1.type": "Vegetarian",
        "cui.c2.name": "Laal Maas",
        "cui.c2.desc": "A fiery mutton curry prepared in a sauce of yoghurt and hot Mathania spices. A vibrant, iconic non-vegetarian delicacy.",
        "cui.c2.spicy": "Very High",
        "cui.c2.type": "Non-Vegetarian",
        "cui.c3.name": "Gatte Ki Sabzi",
        "cui.c3.desc": "Steamed gram flour (besan) dumplings cooked in a tangy yogurt-based curry, a staple of the desert region.",
        "cui.c3.spicy": "Medium",
        "cui.c3.type": "Vegetarian",
        "cui.c4.name": "Ker Sangri",
        "cui.c4.desc": "A unique, rustic dry dish made from desert berries (Ker) and beans (Sangri), deeply rooted in Rajasthani culinary history.",
        "cui.c4.spicy": "Medium",
        "cui.c4.type": "Vegetarian",
        "cui.c5.name": "Pyaaz Kachori",
        "cui.c5.desc": "Deep-fried, flaky pastry filled with a spicy onion mixture, usually served hot with sweet and sour tamarind chutney.",
        "cui.c5.spicy": "High",
        "cui.c5.type": "Vegetarian Snack",
        "cui.c6.name": "Ghevar",
        "cui.c6.desc": "A traditional disc-shaped sweet made from flour, ghee, and soaked in sugar syrup. Highly popular during festivals.",
        "cui.c6.spicy": "Sweet",
        "cui.c6.type": "Dessert",
        "lbl.spicy": "SPICE LEVEL",
        "lbl.type": "CATEGORY"
    },
    hi: {
        "nav.cuisine": "स्थानीय व्यंजन",
        "cui.eyebrow": "मेवाड़ का स्वाद",
        "cui.title": "प्रामाणिक राजस्थानी व्यंजन",
        "cui.desc": "उन समृद्ध, तीखे और शाही स्वादों की खोज करें जिन्होंने सदियों से मेवाड़ी संस्कृति को परिभाषित किया है।",
        "cui.footerText": "क्या आप और इतिहास जानना चाहते हैं?",
        "cui.footerBtn": "आकर्षणों का अन्वेषण करें",
        "cui.c1.name": "दाल बाटी चूरमा",
        "cui.c1.desc": "विशिष्ट राजस्थानी व्यंजन। दाल और मीठे चूरमे के साथ परोसी जाने वाली गेहूं की बाटी।",
        "cui.c1.spicy": "हल्का - मध्यम",
        "cui.c1.type": "शाकाहारी",
        "cui.c2.name": "लाल मांस",
        "cui.c2.desc": "दही और गरम मथानिया मसालों की चटनी में तैयार एक तीखी मटन करी।",
        "cui.c2.spicy": "बहुत अधिक",
        "cui.c2.type": "मांसाहारी",
        "cui.c3.name": "गट्टे की सब्जी",
        "cui.c3.desc": "बेसन के गट्टे जिन्हें तीखी दही आधारित करी में पकाया जाता है।",
        "cui.c3.spicy": "मध्यम",
        "cui.c3.type": "शाकाहारी",
        "cui.c4.name": "कैर सांगरी",
        "cui.c4.desc": "रेगिस्तानी जामुन (कैर) और बीन्स (सांगरी) से बनी एक अनूठी, सूखी डिश।",
        "cui.c4.spicy": "मध्यम",
        "cui.c4.type": "शाकाहारी",
        "cui.c5.name": "प्याज कचौरी",
        "cui.c5.desc": "मसालेदार प्याज के मिश्रण से भरी डीप-फ्राइड, परतदार पेस्ट्री, जो आमतौर पर इमली की चटनी के साथ परोसी जाती है।",
        "cui.c5.spicy": "अधिक",
        "cui.c5.type": "शाकाहारी स्नैक",
        "cui.c6.name": "घेवर",
        "cui.c6.desc": "मैदा और घी से बनी और चाशनी में भिगोई हुई एक पारंपरिक डिस्क के आकार की मिठाई।",
        "cui.c6.spicy": "मीठा",
        "cui.c6.type": "मिठाई",
        "lbl.spicy": "तीखापन",
        "lbl.type": "श्रेणी"
    },
    fr: {
        "nav.cuisine": "Cuisines Locales",
        "cui.eyebrow": "Saveurs de Mewar",
        "cui.title": "Cuisines Authentiques du Rajasthan",
        "cui.desc": "Découvrez les saveurs riches, épicées et royales qui définissent la culture Mewari depuis des siècles.",
        "cui.footerText": "Faim d'histoire ?",
        "cui.footerBtn": "Explorez les Attractions",
        "cui.c1.name": "Dal Bati Churma",
        "cui.c1.desc": "Le plat rajasthani par excellence. Des petits pains de blé durs servis avec un curry de lentilles et un dessert sucré au blé émietté.",
        "cui.c1.spicy": "Doux - Moyen",
        "cui.c1.type": "Végétarien",
        "cui.c2.name": "Laal Maas",
        "cui.c2.desc": "Un curry de mouton fougueux préparé dans une sauce au yaourt et aux épices Mathania piquantes.",
        "cui.c2.spicy": "Très Élevé",
        "cui.c2.type": "Non-Végétarien",
        "cui.c3.name": "Gatte Ki Sabzi",
        "cui.c3.desc": "Boulettes de farine de pois chiche cuites à la vapeur dans un curry à base de yaourt acidulé.",
        "cui.c3.spicy": "Moyen",
        "cui.c3.type": "Végétarien",
        "cui.c4.name": "Ker Sangri",
        "cui.c4.desc": "Un plat sec rustique unique fait de baies du désert (Ker) et de haricots (Sangri).",
        "cui.c4.spicy": "Moyen",
        "cui.c4.type": "Végétarien",
        "cui.c5.name": "Pyaaz Kachori",
        "cui.c5.desc": "Pâtisserie feuilletée frite farcie d'un mélange d'oignons épicés, généralement servie chaude avec un chutney au tamarin aigre-doux.",
        "cui.c5.spicy": "Élevé",
        "cui.c5.type": "Snack Végétarien",
        "cui.c6.name": "Ghevar",
        "cui.c6.desc": "Un dessert traditionnel en forme de disque fait de farine, de ghee et trempé dans un sirop de sucre.",
        "cui.c6.spicy": "Doux",
        "cui.c6.type": "Dessert",
        "lbl.spicy": "NIVEAU D'ÉPICE",
        "lbl.type": "CATÉGORIE"
    },
    de: {
        "nav.cuisine": "Lokale Küchen",
        "cui.eyebrow": "Aromen von Mewar",
        "cui.title": "Authentische Rajasthani Küchen",
        "cui.desc": "Entdecken Sie die reichen, würzigen und königlichen Aromen, die die Kultur von Mewari seit Jahrhunderten prägen.",
        "cui.footerText": "Hungrig auf mehr Geschichte?",
        "cui.footerBtn": "Attraktionen erkunden",
        "cui.c1.name": "Dal Bati Churma",
        "cui.c1.desc": "Das klassische Rajasthani-Gericht. Harte Weizenbrötchen (Bati) serviert mit Linsen-Curry (Dal) und einem süßen, zerkrümelten Weizendessert.",
        "cui.c1.spicy": "Mild - Mittel",
        "cui.c1.type": "Vegetarisch",
        "cui.c2.name": "Laal Maas",
        "cui.c2.desc": "Ein feuriges Hammel-Curry, zubereitet in einer Sauce aus Joghurt und scharfen Mathania-Gewürzen.",
        "cui.c2.spicy": "Sehr hoch",
        "cui.c2.type": "Nicht-vegetarisch",
        "cui.c3.name": "Gatte Ki Sabzi",
        "cui.c3.desc": "Gedämpfte Kichererbsenmehl-Knödel in einem würzigen Curry auf Joghurtbasis.",
        "cui.c3.spicy": "Mittel",
        "cui.c3.type": "Vegetarisch",
        "cui.c4.name": "Ker Sangri",
        "cui.c4.desc": "Ein einzigartiges, rustikales Trockengericht aus Wüstenbeeren (Ker) und Bohnen (Sangri).",
        "cui.c4.spicy": "Mittel",
        "cui.c4.type": "Vegetarisch",
        "cui.c5.name": "Pyaaz Kachori",
        "cui.c5.desc": "Frittiertes, blättriges Gebäck, gefüllt mit einer würzigen Zwiebelmischung, meist heiß serviert mit süß-saurem Tamarinden-Chutney.",
        "cui.c5.spicy": "Hoch",
        "cui.c5.type": "Vegetarischer Snack",
        "cui.c6.name": "Ghevar",
        "cui.c6.desc": "Ein traditionelles, scheibenförmiges süßes Gebäck aus Mehl, Ghee und getränkt in Zuckersirup.",
        "cui.c6.spicy": "Süß",
        "cui.c6.type": "Dessert",
        "lbl.spicy": "SCHÄRFEGRAD",
        "lbl.type": "KATEGORIE"
    },
    ja: {
        "nav.cuisine": "郷土料理",
        "cui.eyebrow": "メーワールの味",
        "cui.title": "本格的なラジャスタン料理",
        "cui.desc": "何世紀にもわたってメーワール文化を特徴づけてきた、豊かでスパイシーで高貴な味を発見してください。",
        "cui.footerText": "もっと歴史を知りたいですか？",
        "cui.footerBtn": "観光名所を探索する",
        "cui.c1.name": "ダル・バーティ・チュルマ",
        "cui.c1.desc": "ラジャスタン州の代表的な料理。硬い小麦のパン（バーティ）、レンズ豆のカレー（ダル）、甘く砕いた小麦のデザート（チュルマ）を一緒に提供します。",
        "cui.c1.spicy": "マイルド - ミディアム",
        "cui.c1.type": "ベジタリアン",
        "cui.c2.name": "ラール・マース",
        "cui.c2.desc": "ヨーグルトとホットなマサニアスパイスのソースで調理された、燃えるような羊肉のカレー。",
        "cui.c2.spicy": "非常に高い",
        "cui.c2.type": "ノンベジタリアン",
        "cui.c3.name": "ガッテ・キ・サブジ",
        "cui.c3.desc": "酸味のあるヨーグルトベースのカレーで調理された、蒸したひよこ豆粉（ベサン）の団子。",
        "cui.c3.spicy": "ミディアム",
        "cui.c3.type": "ベジタリアン",
        "cui.c4.name": "ケル・サングリ",
        "cui.c4.desc": "砂漠のベリー（ケル）と豆（サングリ）から作られたユニークで素朴なドライ料理。",
        "cui.c4.spicy": "ミディアム",
        "cui.c4.type": "ベジタリアン",
        "cui.c5.name": "ピヤーズ・カチョリ",
        "cui.c5.desc": "スパイシーなタマネギの混合物が詰まった揚げパイ。通常、甘酸っぱいタマリンドチャツネと一緒に熱いまま提供されます。",
        "cui.c5.spicy": "高い",
        "cui.c5.type": "ベジタリアンスナック",
        "cui.c6.name": "ゲヴァル",
        "cui.c6.desc": "小麦粉、ギーから作られ、シュガーシロップに浸された伝統的な円盤状の甘いお菓子。",
        "cui.c6.spicy": "甘い",
        "cui.c6.type": "デザート",
        "lbl.spicy": "辛さのレベル",
        "lbl.type": "カテゴリー"
    }
};

locales.forEach(loc => {
    const filePath = path.join(dir, `${loc}.json`);
    if (fs.existsSync(filePath)) {
        let currentData = {};
        try {
            currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            console.error(`Error parsing ${loc}.json`, e);
            return;
        }

        const toAdd = newKeys[loc] || newKeys['en']; // fallback to en
        let updated = false;

        for (const [key, value] of Object.entries(toAdd)) {
            if (!currentData[key]) {
                currentData[key] = value;
                updated = true;
            }
        }

        if (updated) {
            fs.writeFileSync(filePath, JSON.stringify(currentData, null, 4));
            console.log(`Updated ${loc}.json`);
        } else {
            console.log(`No updates needed for ${loc}.json`);
        }
    }
});
