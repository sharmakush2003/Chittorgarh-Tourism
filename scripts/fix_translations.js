const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, '..', 'public', 'translations', 'en.json');
const hiPath = path.join(__dirname, '..', 'public', 'translations', 'hi.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const hiData = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

// Hardcoded Hindi translations for missing keys
const missingTranslations = {
    "btn.readMore": "अधिक पढ़ें",
    "btn.readLess": "कम दिखाएं",
    "btn.directions": "रास्ता देखें",
    "btn.shareInfo": "जानकारी साझा करें",
    "btn.bookTickets": "टिकट बुक करें",
    "stays.sub": "किले के पास हेरिटेज हवेलियां और लक्जरी रिसॉर्ट्स।",
    "feat.c5.title": "लाइव विज़िटर ट्रैकिंग",
    "feat.c5.desc": "भीड़भाड़ से बचने के लिए वास्तविक समय में विज़िटर डेंसिटी को ट्रैक करें।",
    "feat.c6.title": "24/7 सहायता",
    "feat.c6.desc": "आपकी यात्रा के दौरान किसी भी प्रश्न के लिए हमारी टीम हमेशा उपलब्ध है।",
    "lbl.readMore": "अधिक पढ़ें",
    
    // Monument Pages (Kumbha Shyam)
    "kumbha_shyam.hero.eyebrow": "वैष्णव भक्ति",
    "kumbha_shyam.hero.title": "कुंभा श्याम मंदिर",
    "kumbha_shyam.hero.desc": "1448 में राणा कुंभा द्वारा निर्मित, यह मंदिर भगवान विष्णु को समर्पित है और इसमें अद्वितीय वराह (सूअर) देवता की वास्तुकला है।",
    "kumbha_shyam.stats.built": "15वीं शताब्दी",
    "kumbha_shyam.stats.type": "विष्णु मंदिर",
    "kumbha_shyam.stats.feature": "भारत-आर्य शैली",
    "kumbha_shyam.nav.overview": "अवलोकन",
    "kumbha_shyam.nav.history": "इतिहास",
    "kumbha_shyam.nav.architecture": "वास्तुकला",
    "kumbha_shyam.section.overview": "कुंभा का पवित्र संकल्प",
    "kumbha_shyam.section.history": "भक्ति की विरासत",
    "kumbha_shyam.section.architecture": "स्थापत्य महारत",
    "kumbha_shyam.overview.p1": "कुंभा श्याम मंदिर चित्तौड़गढ़ किला परिसर के भीतर स्थित एक महत्वपूर्ण ऐतिहासिक मंदिर है। भगवान विष्णु को कुंभा श्याम के रूप में समर्पित, इसका निर्माण 1448 में महान राणा कुंभा द्वारा किया गया था। यह मंदिर अपने भव्य पैमाने और जटिल पत्थरों की कारीगरी के लिए प्रसिद्ध है।",
    "kumbha_shyam.overview.p2": "इस मंदिर को जो बात अनूठी बनाती है वह इसी परिसर के भीतर एक समर्पित मंदिर में वराह (विष्णु का सूअर अवतार) की उपस्थिति है। यह पांच शताब्दियों से अधिक समय से धार्मिक और सांस्कृतिक गतिविधियों का एक महत्वपूर्ण केंद्र बना हुआ है।",
    "kumbha_shyam.history.era1.year": "1448 ई.",
    "kumbha_shyam.history.era1.title": "विश्वास की नींव",
    "kumbha_shyam.history.era1.desc": "अपने शासनकाल के चरम के दौरान, राणा कुंभा ने वराह और वैष्णव परंपरा के प्रति अपनी व्यक्तिगत भक्ति के प्रतीक के रूप में इस मंदिर का निर्माण करवाया था।",
    "kumbha_shyam.history.era2.year": "मध्यकालीन युग",
    "kumbha_shyam.history.era2.title": "आवाहिक केंद्र",
    "kumbha_shyam.history.era2.desc": "पीढ़ियों तक, मंदिर मेवाड़ के शाही परिवार के लिए पूजा का प्राथमिक स्थान रहा, विशेष रूप से दरबार की महिलाओं के लिए।",
    "kumbha_shyam.history.era3.year": "वर्तमान दिन",
    "kumbha_shyam.history.era3.title": "स्थापत्य खजाना",
    "kumbha_shyam.history.era3.desc": "आज, यह राजस्थान में 15वीं शताब्दी की मंदिर वास्तुकला के बेहतरीन संरक्षित उदाहरणों में से एक माना जाता है, जो विद्वानों और भक्तों को समान रूप से आकर्षित करता है।",
    "attr.kumbha_shyam_arch.sanctum.name": "गर्भगृह",
    "attr.kumbha_shyam_arch.sanctum.desc": "आंतरिक गर्भगृह में खूबसूरती से तराशी गई मूर्तियाँ हैं, जिसकी छत पर एक जटिल 'संवरण' गुंबद संरचना है।",
    "attr.kumbha_shyam_arch.mandapa.name": "भव्य मंडप",
    "attr.kumbha_shyam_arch.mandapa.desc": "सभा भवन कई स्तंभों द्वारा समर्थित है, जिनमें से प्रत्येक पुराणों के दृश्यों और भगवान विष्णु के विभिन्न रूपों के साथ उकेरा गया है।",
    "attr.kumbha_shyam_arch.varaha.name": "वराह मंदिर",
    "attr.kumbha_shyam_arch.varaha.desc": "वराह अवतार को समर्पित एक अनूठा अलग मंदिर, जो उस युग के मेवाड़ शासकों के विशिष्ट धार्मिक झुकाव को प्रदर्शित करता है।",

    // Ratan Palace
    "ratan_palace.hero.eyebrow": "राजसी विश्राम",
    "ratan_palace.hero.title": "रतन सिंह महल",
    "ratan_palace.hero.desc": "महाराणा रतन सिंह द्वितीय द्वारा निर्मित एक शीतकालीन महल, जो शांत रत्नेश्वर तालाब को देखता है।",
    "ratan_palace.stats.built": "16वीं शताब्दी",
    "ratan_palace.stats.type": "शीतकालीन महल",
    "ratan_palace.stats.feature": "झील का दृश्य",
    "ratan_palace.nav.overview": "अवलोकन",
    "ratan_palace.nav.history": "इतिहास",
    "ratan_palace.nav.architecture": "वास्तुकला",
    "ratan_palace.section.overview": "झील के किनारे का निवास",
    "ratan_palace.section.history": "युद्ध से राहत",
    "ratan_palace.section.architecture": "राजपूत सुंदरता",
    "ratan_palace.overview.p1": "रतन सिंह महल, जिसे शीतकालीन महल के रूप में भी जाना जाता है, चित्तौड़गढ़ किले के उत्तरी छोर पर स्थित है। इसका निर्माण 16वीं शताब्दी की शुरुआत में महाराणा रतन सिंह द्वितीय द्वारा किया गया था।",
    "ratan_palace.overview.p2": "महल रत्नेश्वर तालाब (झील) की ओर देखते हुए विशिष्ट रूप से स्थित है, जो एक शांत और सुंदर पृष्ठभूमि प्रदान करता है।",
    "ratan_palace.history.era1.year": "1528 - 1531",
    "ratan_palace.history.era1.title": "निर्माण",
    "ratan_palace.history.era1.desc": "महाराणा रतन सिंह द्वितीय ने इस महल को मुख्य किले की प्रशासनिक और सैन्य हलचल से दूर एक विश्राम स्थल के रूप में बनाया था।",
    "ratan_palace.history.era2.year": "1535 ई.",
    "ratan_palace.history.era2.title": "दूसरी घेराबंदी",
    "ratan_palace.history.era2.desc": "महल चित्तौड़गढ़ की दूसरी घेराबंदी की उथल-पुथल का गवाह रहा।",
    "ratan_palace.history.era3.year": "आधुनिक युग",
    "ratan_palace.history.era3.title": "दर्शनीय खंडहर",
    "ratan_palace.history.era3.desc": "हालांकि अब खंडहर में है, महल अपने प्रतिष्ठित झील के दृश्यों के कारण पर्यटकों के लिए पसंदीदा बना हुआ है।",
    "attr.ratan_palace_arch.talab.name": "रत्नेश्वर तालाब",
    "attr.ratan_palace_arch.talab.desc": "महल इस विशाल, प्राचीन झील की ओर देखता है जो कभी जल आपूर्ति के रूप में कार्य करती थी।",
    "attr.ratan_palace_arch.courtyards.name": "भव्य आंगन",
    "attr.ratan_palace_arch.courtyards.desc": "परिसर में कई खुले आंगन हैं जो शाही सभाओं और अवकाश के लिए डिज़ाइन किए गए हैं।",
    "attr.ratan_palace_arch.balconies.name": "झरोखे (बालकनी)",
    "attr.ratan_palace_arch.balconies.desc": "जटिल रूप से तराशे गए पत्थर के झरोखे झील के ऊपर निकले हुए हैं।",

    // Gaumukh
    "gaumukh.hero.eyebrow": "पवित्र जल स्रोत",
    "gaumukh.hero.title": "गौमुख जलाशय",
    "gaumukh.hero.desc": "चट्टान के किनारे स्थित एक शांत जलाशय, जहाँ एक प्राकृतिक झरना पवित्र 'गौमुख' (गाय के मुख) से बहता है।",
    "gaumukh.stats.built": "प्राचीन काल",
    "gaumukh.stats.type": "पवित्र जल निकाय",
    "gaumukh.stats.feature": "सदाबहार झरना",
    "gaumukh.nav.overview": "अवलोकन",
    "gaumukh.nav.history": "इतिहास",
    "gaumukh.nav.architecture": "वास्तुकला",
    "gaumukh.section.overview": "किले की जीवन रेखा",
    "gaumukh.section.history": "पुरातन काल से प्रवाह",
    "gaumukh.section.architecture": "प्राकृतिक सौंदर्य",
    "gaumukh.overview.p1": "गौमुख जलाशय चित्तौड़गढ़ किले के सबसे पवित्र और सुंदर स्थानों में से एक है। यह एक प्राकृतिक झरना है जो एक गाय के मुख के आकार की नक्काशीदार पत्थर की संरचना से होकर बहता है।",
    "gaumukh.overview.p2": "यह जलाशय सदियों से किले के निवासियों के लिए पानी का मुख्य स्रोत रहा है। यहाँ की शांति और निरंतर बहते पानी की आवाज़ एक आध्यात्मिक अनुभव प्रदान करती है।",
    "gaumukh.history.era1.year": "7वीं शताब्दी",
    "gaumukh.history.era1.title": "प्रारंभिक महत्व",
    "gaumukh.history.era1.desc": "किले की स्थापना के समय से ही, इस जलाशय को इसके रणनीतिक और धार्मिक महत्व के लिए जाना जाता था।",
    "gaumukh.history.era2.year": "मध्यकालीन काल",
    "gaumukh.history.era2.title": "घेराबंदी के दौरान सहारा",
    "gaumukh.history.era2.desc": "चित्तौड़गढ़ की कई ऐतिहासिक घेराबंदी के दौरान, गौमुख जलाशय ने यह सुनिश्चित किया कि किले के भीतर कभी पानी की कमी न हो।",
    "gaumukh.history.era3.year": "आज",
    "gaumukh.history.era3.title": "पर्यटक आकर्षण",
    "gaumukh.history.era3.desc": "आज यह अपनी प्राकृतिक सुंदरता और धार्मिक महत्व के लिए दुनिया भर से पर्यटकों को आकर्षित करता है।",
    "attr.gaumukh_arch.rock.name": "चट्टानी किनारा",
    "attr.gaumukh_arch.rock.desc": "जलाशय एक खड़ी ढलान पर स्थित है, जो नीचे की घाटी का अद्भुत दृश्य प्रदान करता है।",
    "attr.gaumukh_arch.temple.name": "समीपवर्ती मंदिर",
    "attr.gaumukh_arch.temple.desc": "जलाशय के पास छोटे शिव मंदिर और प्रतिमाएं हैं, जो इसकी पवित्रता को बढ़ाती हैं।",
    "attr.gaumukh_arch.steps.name": "पत्थर की सीढ़ियाँ",
    "attr.gaumukh_arch.steps.desc": "जलाशय तक जाने के लिए नक्काशीदार पत्थर की सीढ़ियाँ बनाई गई हैं।",

    // Fateh Prakash
    "fateh.hero.eyebrow": "शाही विरासत",
    "fateh.hero.title": "फतेह प्रकाश महल",
    "fateh.hero.desc": "महाराणा फतेह सिंह द्वारा निर्मित एक शानदार महल, जो अब मेवाड़ के गौरवशाली इतिहास को प्रदर्शित करने वाला एक संग्रहालय है।",
    "fateh.stats.built": "19वीं शताब्दी",
    "fateh.stats.type": "संग्रहालय व महल",
    "fateh.stats.feature": "क्रिस्टल गैलरी",
    "fateh.nav.overview": "अवलोकन",
    "fateh.nav.history": "इतिहास",
    "fateh.nav.architecture": "वास्तुकला",
    "fateh.section.overview": "कला का संरक्षक",
    "fateh.section.history": "आधुनिक मेवाड़ का उदय",
    "fateh.section.architecture": "भव्य वास्तुकला",
    "fateh.overview.p1": "फतेह प्रकाश महल महाराणा फतेह सिंह के शासनकाल के दौरान बनाया गया था। यह आधुनिक वास्तुकला और पारंपरिक राजपूत शैली का एक अद्भुत संगम है।",
    "fateh.overview.p2": "वर्तमान में, इस महल को एक सरकारी संग्रहालय में बदल दिया गया है, जहाँ हथियारों, शाही कपड़ों और प्राचीन कलाकृतियों का विशाल संग्रह है।",
    "fateh.history.era1.year": "1884 - 1930",
    "fateh.history.era1.title": "महाराणा फतेह सिंह",
    "fateh.history.era1.desc": "यह महल महाराणा फतेह सिंह के रहने के लिए बनाया गया था, जो अपनी सादगी और मेवाड़ के प्रति समर्पण के लिए जाने जाते थे।",
    "fateh.history.era2.year": "1968 AD",
    "fateh.history.era2.title": "संग्रहालय में परिवर्तन",
    "fateh.history.era2.desc": "राजस्थान सरकार ने इस ऐतिहासिक महल को एक सार्वजनिक संग्रहालय घोषित किया ताकि आने वाली पीढ़ियाँ मेवाड़ की विरासत को देख सकें।",
    "fateh.history.era3.year": "वर्तमान समय",
    "fateh.history.era3.title": "सांस्कृतिक केंद्र",
    "fateh.history.era3.desc": "यह संग्रहालय किले के भीतर सबसे महत्वपूर्ण शैक्षिक केंद्रों में से एक के रूप में कार्य करता है।",
    "attr.fateh_arch.corridors.name": "भव्य गलियारे",
    "attr.fateh_arch.corridors.desc": "महल में चौड़े और हवादार गलियारे हैं जो संगमरमर के स्तंभों से सुसज्जित हैं।",
    "attr.fateh_arch.museum.name": "मुख्य गैलरी",
    "attr.fateh_arch.museum.desc": "केंद्रीय हॉल में हथियारों का एक विशाल संग्रह है, जिसमें ऐतिहासिक लड़ाइयों में उपयोग की गई ढालें और तलवारें शामिल हैं।",
    "attr.fateh_arch.crystal.name": "क्रिस्टल रूम",
    "attr.fateh_arch.crystal.desc": "एक समर्पित अनुभाग उत्कृष्ट क्रिस्टल फर्नीचर और क्रॉकरी प्रदर्शित करता है।"
};

// 1. Deduplicate English
const cleanedEn = {};
Object.keys(enData).forEach(key => {
    // If we have a preference or duplicate, this ensures we have a single source
    // For btn.readMore, if both exist, title case is preferred by some, uppercase by others.
    // Standardizing to Title Case as per earlier convention.
    if (key === 'btn.readMore') {
        cleanedEn[key] = "Read More";
    } else {
        cleanedEn[key] = enData[key];
    }
});

// 2. Sync Hindi
const syncedHi = {};
Object.keys(cleanedEn).forEach(key => {
    if (hiData[key]) {
        syncedHi[key] = hiData[key];
    } else if (missingTranslations[key]) {
        syncedHi[key] = missingTranslations[key];
    } else {
        // Fallback to English for the key to avoid "Missing" status
        syncedHi[key] = cleanedEn[key];
        console.log(`Fallback for key: ${key}`);
    }
});

// 3. Remove keys from Hindi that are NOT in English (Dangling keys)
// except if they are known placeholders like [hi]
// Actually, let's keep them for now unless they are duplicates.

fs.writeFileSync(enPath, JSON.stringify(cleanedEn, null, 4));
fs.writeFileSync(hiPath, JSON.stringify(syncedHi, null, 4));

console.log('Translations Synced and Fixed!');
