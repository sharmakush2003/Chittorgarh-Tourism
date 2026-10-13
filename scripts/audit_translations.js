const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const componentsDir = path.join(projectRoot, 'components');
const appDir = path.join(projectRoot, 'app');
const enPath = path.join(projectRoot, 'public', 'translations', 'en.json');
const hiPath = path.join(projectRoot, 'public', 'translations', 'hi.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const hiData = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

const usedKeys = new Set();
const keyLocations = {};

function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next') {
                scanDirectory(fullPath);
            }
        } else if (file.match(/\.(js|jsx|ts|tsx)$/)) {
            const content = fs.readFileSync(fullPath, 'utf8');
            // Strict regex to find t("key") or t('key') or t(`key`)
            const matches = content.matchAll(/\bt\(['"`]([a-zA-Z0-9._-]+)['"`]\)/g);
            for (const match of matches) {
                const key = match[1];
                usedKeys.add(key);
                if (!keyLocations[key]) keyLocations[key] = [];
                keyLocations[key].push(path.relative(projectRoot, fullPath));
            }
        }
    }
}

console.log('--- Auditing Translations ---');
scanDirectory(componentsDir);
scanDirectory(appDir);

const missingInEn = [];
const missingInHi = [];
const inconsistent = [];

for (const key of usedKeys) {
    if (!enData[key]) missingInEn.push(key);
    if (!hiData[key]) missingInHi.push(key);
}

// Also check for keys in En but not in Hi (and vice versa)
const enKeys = Object.keys(enData);
const hiKeys = Object.keys(hiData);

for (const key of enKeys) {
    if (!hiData[key]) inconsistent.push({ key, reason: 'In en.json but missing in hi.json' });
}
for (const key of hiKeys) {
    if (!enData[key]) inconsistent.push({ key, reason: 'In hi.json but missing in en.json' });
}

console.log(`\nUnique keys found in code: ${usedKeys.size}`);

if (missingInEn.length > 0) {
    console.log('\n❌ MISSING IN en.json:');
    missingInEn.forEach(key => console.log(`  - ${key} (used in: ${keyLocations[key].join(', ')})`));
} else {
    console.log('\n✅ All keys used in code are present in en.json');
}

if (missingInHi.length > 0) {
    console.log('\n❌ MISSING IN hi.json:');
    missingInHi.forEach(key => console.log(`  - ${key} (used in: ${keyLocations[key].join(', ')})`));
} else {
    console.log('\n✅ All keys used in code are present in hi.json');
}

if (inconsistent.length > 0) {
    console.log('\n⚠️ INCONSISTENCIES BETWEEN JSON FILES:');
    inconsistent.forEach(inc => console.log(`  - ${inc.key}: ${inc.reason}`));
}

console.log('\n--- Audit Complete ---');
