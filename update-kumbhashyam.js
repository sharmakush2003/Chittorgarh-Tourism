const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'public/translations/en.json');
const hiPath = path.join(__dirname, 'public/translations/hi.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
const hiData = JSON.parse(fs.readFileSync(hiPath, 'utf-8'));

// Updates for English
enData["kumbha_shyam.hero.desc"] = "A private place of worship for the devotee Mirabai, built by Maharana Sangram Singh I.";
enData["kumbha_shyam.overview.p1"] = "The Kumbha Shyam Temple of Chittorgarh was constructed by Maharana Sangram Singh I, the ruler of Mewar (1482–1528), on the special request of his daughter-in-law, Mirabai.";
enData["kumbha_shyam.overview.p2"] = "Opposite the main temple lies a beautiful chhatri constructed in memory of Mirabai's guru, Ravidass. This revered pavilion preserves the sacred impression of Guru Ravidass's footprints.";
enData["kumbha_shyam.history.era1.title"] = "Built by Sangram Singh I";
enData["kumbha_shyam.history.era1.desc"] = "Maharana Sangram Singh I built this magnificent temple on the special request of his daughter-in-law, Mirabai.";
enData["kumbha_shyam.history.era1.year"] = "1482-1528";
enData["kumbha_shyam.history.era2.title"] = "Mirabai's Devotion";
enData["kumbha_shyam.history.era2.desc"] = "The temple served as a private worship place where Mirabai devotedly chanted the name of Lord Krishna.";
enData["kumbha_shyam.history.era2.year"] = "16th Century";
enData["kumbha_shyam.history.era3.title"] = "Chhatri of Guru Ravidass";
enData["kumbha_shyam.history.era3.desc"] = "A chhatri was constructed opposite the temple in memory of Mirabai's guru, preserving the impression of his sacred footprints.";
enData["kumbha_shyam.history.era3.year"] = "Legacy";
enData["attr.kumbha_shyam_arch.sanctum.desc"] = "A grand structure featuring a towering pyramidal roof, high ceilings, and intricate archways adorned with idols of Hindu deities.";
enData["attr.kumbha_shyam_arch.mandapa.desc"] = "The beautiful chhatri (cenotaph) dedicated to Swami Ravidass, located directly opposite the main temple.";
enData["attr.kumbha_shyam_arch.varaha.desc"] = "The temple complex exhibits classic Rajput architectural elements, including majestic pillars and ornate sculptures.";
enData["kumbha_shyam.nav.references"] = "References";
enData["kumbha_shyam.section.references"] = "References & Citations";
enData["kumbha_shyam.ref.wiki"] = "Wikipedia";

// Updates for Hindi
hiData["kumbha_shyam.hero.desc"] = "भक्त मीराबाई का एक निजी पूजा स्थल, जिसका निर्माण महाराणा संग्राम सिंह प्रथम द्वारा किया गया था।";
hiData["kumbha_shyam.overview.p1"] = "चित्तौड़गढ़ के कुंभ श्याम मंदिर का निर्माण मेवाड़ के शासक महाराणा संग्राम सिंह प्रथम (1482-1528) ने अपनी बहू मीराबाई के विशेष अनुरोध पर करवाया था।";
hiData["kumbha_shyam.overview.p2"] = "मुख्य मंदिर के सामने मीराबाई के गुरु, संत रविदास की याद में निर्मित एक सुंदर छतरी स्थित है। यह श्रद्धेय मंडप गुरु रविदास के पैरों के निशानों (चरण पादुका) की पवित्र छाप को संरक्षित करता है।";
hiData["kumbha_shyam.history.era1.title"] = "संग्राम सिंह प्रथम द्वारा निर्माण";
hiData["kumbha_shyam.history.era1.desc"] = "महाराणा संग्राम सिंह प्रथम ने अपनी बहू, मीराबाई के विशेष आग्रह पर इस भव्य मंदिर का निर्माण करवाया।";
hiData["kumbha_shyam.history.era1.year"] = "1482-1528";
hiData["kumbha_shyam.history.era2.title"] = "मीराबाई की भक्ति";
hiData["kumbha_shyam.history.era2.desc"] = "यह मंदिर एक निजी पूजा स्थल के रूप में कार्य करता था जहाँ मीराबाई ने पूरी श्रद्धा के साथ भगवान कृष्ण के नाम का जाप किया।";
hiData["kumbha_shyam.history.era2.year"] = "16वीं सदी";
hiData["kumbha_shyam.history.era3.title"] = "गुरु रविदास की छतरी";
hiData["kumbha_shyam.history.era3.desc"] = "मीराबाई के गुरु की स्मृति में मंदिर के ठीक सामने एक छतरी का निर्माण किया गया, जिसमें उनके पवित्र पैरों के निशान संरक्षित हैं।";
hiData["kumbha_shyam.history.era3.year"] = "विरासत";
hiData["attr.kumbha_shyam_arch.sanctum.desc"] = "एक भव्य संरचना जिसमें एक विशाल पिरामिड की छत, ऊंची छतें और हिंदू देवी-देवताओं की मूर्तियों से सजे जटिल मेहराब हैं।";
hiData["attr.kumbha_shyam_arch.mandapa.desc"] = "मुख्य मंदिर के ठीक सामने स्थित स्वामी रविदास को समर्पित खूबसूरत छतरी।";
hiData["attr.kumbha_shyam_arch.varaha.desc"] = "इस मंदिर परिसर में राजपूताना वास्तुकला की उत्कृष्ट झलक दिखती है, जिसमें राजसी स्तंभ और देवताओं की अलंकृत मूर्तियां शामिल हैं।";
hiData["kumbha_shyam.nav.references"] = "संदर्भ";
hiData["kumbha_shyam.section.references"] = "संदर्भ और उद्धरण";
hiData["kumbha_shyam.ref.wiki"] = "विकिपीडिया";

fs.writeFileSync(enPath, JSON.stringify(enData, null, 4));
fs.writeFileSync(hiPath, JSON.stringify(hiData, null, 4));
console.log('Successfully updated kumbha shyam translations!');
