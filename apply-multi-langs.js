const fs = require('fs');
const path = require('path');

const translations = {
    fr: {
        "faq.eyebrow": "FAQ",
        "faq.title": "Questions Fréquentes sur Chittorgarh",
        "faq.q1": "Pourquoi Chittorgarh est-elle célèbre ?",
        "faq.a1": "Chittorgarh est mondialement connue pour le fort de Chittorgarh, le plus grand fort de l'Inde et un site du patrimoine mondial de l'UNESCO. Il est réputé pour son architecture Rajput, l'histoire légendaire du Jauhar de la reine Padmini, et la bravoure de Maharana Pratap.",
        "faq.q2": "Quelle est la meilleure période pour visiter Chittorgarh ?",
        "faq.a2": "La meilleure période pour visiter est entre octobre et mars, pendant les mois d'hiver. Le temps est agréable, ce qui rend l'exploration du vaste fort confortable.",
        "faq.q3": "Combien de jours sont suffisants pour Chittorgarh ?",
        "faq.a3": "1 à 2 jours sont suffisants. Vous pouvez couvrir les principaux monuments du fort (Tour de la Victoire, Tour de la Renommée, Palais Padmini) en une journée complète.",
        "faq.q4": "Chittorgarh vaut-elle le détour ?",
        "faq.a4": "Oui, c'est une visite incontournable pour les passionnés d'histoire et d'architecture. Se promener dans ce complexe de 700 acres résonne de légendes héroïques.",
        "stays.rtdc.title": "Vous cherchez l'hôtel RTDC Panna ?",
        "stays.rtdc.desc": "L'hôtel RTDC Panna est une option gouvernementale populaire mais souvent complet en haute saison. Les hôtels patrimoniaux privés ci-dessous offrent un confort comparable, une meilleure proximité du fort et une expérience rajasthanaise authentique.",
        "nav.blog": "Blog"
    },
    de: {
        "faq.eyebrow": "Häufig Gestellte Fragen",
        "faq.title": "Häufig Gestellte Fragen zu Chittorgarh",
        "faq.q1": "Wofür ist Chittorgarh berühmt?",
        "faq.a1": "Chittorgarh ist weltberühmt für das Chittorgarh Fort, das größte Fort Indiens und ein UNESCO-Weltkulturerbe. Es ist bekannt für seine Rajputen-Architektur, die Legende der Königin Padmini und die Tapferkeit von Maharana Pratap.",
        "faq.q2": "Wann ist die beste Reisezeit für Chittorgarh?",
        "faq.a2": "Die beste Reisezeit ist zwischen Oktober und März in den Wintermonaten. Das Wetter ist angenehm und macht die Erkundung des riesigen Forts komfortabel.",
        "faq.q3": "Wie viele Tage reichen für Chittorgarh?",
        "faq.a3": "1 bis 2 Tage sind ausreichend. An einem ganzen Tag können Sie die Hauptmonumente des Forts ansehen.",
        "faq.q4": "Lohnt sich ein Besuch in Chittorgarh?",
        "faq.a4": "Ja, absolut. Für Geschichtsinteressierte und Architekturliebhaber ist es ein Muss in Rajasthan.",
        "stays.rtdc.title": "Suchen Sie das RTDC Hotel Panna?",
        "stays.rtdc.desc": "Das RTDC Hotel Panna ist sehr beliebt, aber in der Hochsaison oft ausgebucht. Die unten aufgeführten privaten Heritage-Hotels bieten ähnlichen Komfort, Nähe zum Fort und ein authentisches Erlebnis.",
        "nav.blog": "Blog"
    },
    ja: {
        "faq.eyebrow": "よくある質問",
        "faq.title": "チットールガルに関するよくある質問",
        "faq.q1": "チットールガルは何で有名ですか？",
        "faq.a1": "チットールガルは、インド最大の城塞でありユネスコ世界遺産であるチットールガル城塞で世界的に有名です。パドミニ王妃の伝説やマハラナ・プラタープの勇敢さで知られています。",
        "faq.q2": "チットールガルを訪れるのに最適な時期はいつですか？",
        "faq.a2": "10月から3月の冬の時期が最適です。気候が涼しく、広大な城塞を快適に探索できます。",
        "faq.q3": "チットールガル観光には何日必要ですか？",
        "faq.a3": "1〜2日で十分です。丸1日あれば、城塞内の主要な記念碑をすべて見学できます。",
        "faq.q4": "チットールガルは訪れる価値がありますか？",
        "faq.a4": "はい。歴史や建築に興味がある方にとって、ラージャスターン州で必見の場所です。",
        "stays.rtdc.title": "RTDC ホテル・パンナをお探しですか？",
        "stays.rtdc.desc": "公営のRTDCホテル・パンナは人気ですが、繁忙期は満室になることがよくあります。以下のプライベート・ヘリテージ・ホテルは同等の快適さを提供し、城塞にも近くおすすめです。",
        "nav.blog": "ブログ"
    },
    es: {
        "faq.eyebrow": "Preguntas Frecuentes",
        "faq.title": "Preguntas Frecuentes sobre Chittorgarh",
        "faq.q1": "¿Por qué es famoso Chittorgarh?",
        "faq.a1": "Chittorgarh es mundialmente famoso por el Fuerte de Chittorgarh, el más grande de la India y Patrimonio de la Humanidad por la UNESCO. Es famoso por la historia de la Reina Padmini y la valentía del Maharana Pratap.",
        "faq.q2": "¿Cuál es la mejor época para visitar Chittorgarh?",
        "faq.a2": "La mejor época es entre octubre y marzo. El clima de invierno es agradable para explorar el gran fuerte.",
        "faq.q3": "¿Cuántos días son suficientes en Chittorgarh?",
        "faq.a3": "1 o 2 días son suficientes para ver los principales monumentos del fuerte durante un día completo.",
        "faq.q4": "¿Vale la pena visitar Chittorgarh?",
        "faq.a4": "Sí, es una visita obligada para los amantes de la historia y la arquitectura en Rajasthan.",
        "stays.rtdc.title": "¿Busca el Hotel RTDC Panna?",
        "stays.rtdc.desc": "El Hotel RTDC Panna es muy popular, pero suele estar lleno en temporada alta. Los hoteles patrimoniales privados a continuación ofrecen comodidad comparable y mejor proximidad al fuerte.",
        "nav.blog": "Blog"
    },
    eo: {
        "faq.eyebrow": "Oftaj Demandoj",
        "faq.title": "Oftaj Demandoj pri Chittorgarh",
        "faq.q1": "Por kio estas fama Chittorgarh?",
        "faq.a1": "Chittorgarh estas famega pro sia fortikaĵo, la plej granda en Hindio kaj Monda Heredaĵo de Unesko.",
        "faq.q2": "Kiam estas la plej bona tempo por viziti?",
        "faq.a2": "Inter oktobro kaj marto, dum la vintra sezono, kiam la vetero estas agrabla.",
        "faq.q3": "Kiom da tagoj sufiĉas?",
        "faq.a3": "Unu aŭ du tagoj tute sufiĉas por esplori la tutan fortikaĵon.",
        "faq.q4": "Ĉu indas viziti ĝin?",
        "faq.a4": "Jes, nepre indas por tiuj, kiuj amas historion kaj arkitekturon.",
        "stays.rtdc.title": "Ĉu vi serĉas la Hotelon RTDC Panna?",
        "stays.rtdc.desc": "Ĝi ofte estas plena. La jenaj privataj hoteloj ofertas bonegajn alternativojn tre proksime al la fortikaĵo.",
        "nav.blog": "Blogo"
    },
    nl: {
        "faq.eyebrow": "Veelgestelde Vragen",
        "faq.title": "Veelgestelde vragen over Chittorgarh",
        "faq.q1": "Waarom is Chittorgarh beroemd?",
        "faq.a1": "Chittorgarh is wereldberoemd om zijn fort, het grootste in India en UNESCO Werelderfgoed. Het staat bekend om de legendarische verhalen van moed en opoffering.",
        "faq.q2": "Wat is de beste reistijd?",
        "faq.a2": "De beste tijd is tussen oktober en maart. Het zachte winterweer maakt het comfortabel om te wandelen.",
        "faq.q3": "Hoeveel dagen zijn voldoende in Chittorgarh?",
        "faq.a3": "1 tot 2 dagen zijn genoeg. In één volledige dag kun je alle belangrijke monumenten bezoeken.",
        "faq.q4": "Is Chittorgarh een bezoek waard?",
        "faq.a4": "Absoluut. Het is een must-see voor liefhebbers van geschiedenis en indrukwekkende paleizen.",
        "stays.rtdc.title": "Op zoek naar RTDC Hotel Panna?",
        "stays.rtdc.desc": "Het RTDC Hotel Panna is populair, maar vaak volgeboekt. De onderstaande privé heritage hotels bieden vergelijkbaar comfort en liggen dicht bij het fort.",
        "nav.blog": "Blog"
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
        console.log(`Added translations for ${lang}.json`);
    }
}
