const fs = require('fs');
const path = require('path');

const translations = {
    'en': {
        'fort.tracker.title': 'Golden Hour Tracker',
        'fort.tracker.activeNow': 'Active Now',
        'fort.tracker.upcoming': 'Upcoming Session',
        'fort.tracker.nextOpportunity': 'Next Opportunity',
        'fort.tracker.morning': 'Morning Window',
        'fort.tracker.evening': 'Evening Window',
        'fort.tracker.tip': 'Soft, warm lighting perfect for architectural photography.'
    },
    'hi': {
        'fort.tracker.title': 'स्वर्ण काल ट्रैकर',
        'fort.tracker.activeNow': 'अभी सक्रिय',
        'fort.tracker.upcoming': 'आगामी सत्र',
        'fort.tracker.nextOpportunity': 'अगला अवसर',
        'fort.tracker.morning': 'सुबह का समय',
        'fort.tracker.evening': 'शाम का समय',
        'fort.tracker.tip': 'वास्तुकला की फोटोग्राफी के लिए सबसे सुंदर और कोमल रोशनी (Golden Hour)।'
    },
    'fr': {
        'fort.tracker.title': 'Heure Dorée',
        'fort.tracker.activeNow': 'Actif Maintenant',
        'fort.tracker.upcoming': 'Session à Venir',
        'fort.tracker.nextOpportunity': 'Prochaine Opportunité',
        'fort.tracker.morning': 'Matinée',
        'fort.tracker.evening': 'Soirée',
        'fort.tracker.tip': 'Lumière douce et chaude, parfaite pour la photographie.'
    },
    'nl': {
        'fort.tracker.title': 'Gouden Uur Tracker',
        'fort.tracker.activeNow': 'Nu Actief',
        'fort.tracker.upcoming': 'Aankomende Sessie',
        'fort.tracker.nextOpportunity': 'Volgende Kans',
        'fort.tracker.morning': 'Ochtendvenster',
        'fort.tracker.evening': 'Avondvenster',
        'fort.tracker.tip': 'Zacht, warm licht, perfect voor architectuurfotografie.'
    },
    'ja': {
        'fort.tracker.title': 'ゴールデンアワー',
        'fort.tracker.activeNow': '現在アクティブ',
        'fort.tracker.upcoming': '次回のセッション',
        'fort.tracker.nextOpportunity': '次の機会',
        'fort.tracker.morning': '午前の時間帯',
        'fort.tracker.evening': '午後の時間帯',
        'fort.tracker.tip': '建築写真に最適な、柔らかく暖かい光の時間帯です。'
    }
};

const baseDir = 'c:/Users/kushs/OneDrive/Documents/Web Development/AI Assissted Web Development/Chittaurgarh Tourism/public/translations';

Object.entries(translations).forEach(([lang, data]) => {
    const filePath = path.join(baseDir, `${lang}.json`);
    try {
        if (fs.existsSync(filePath)) {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const updatedContent = { ...content, ...data };
            fs.writeFileSync(filePath, JSON.stringify(updatedContent, null, 4));
            console.log(`Updated ${lang}.json`);
        } else {
            console.error(`File not found: ${filePath}`);
        }
    } catch (err) {
        console.error(`Error processing ${lang}.json:`, err);
    }
});
