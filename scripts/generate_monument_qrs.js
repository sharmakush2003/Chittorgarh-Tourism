const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const qrDir = path.join(process.cwd(), 'public', 'QR_codes');
if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir);
}

const urls = [
    { name: 'Home', url: 'https://chittorgarh-tourism.in/' },
    { name: 'Vijay-Stambh', url: 'https://chittorgarh-tourism.in/vijay-stambh' },
    { name: 'Fateh-Prakash', url: 'https://chittorgarh-tourism.in/fateh-prakash' },
    { name: 'Rana-Kumbha-Palace', url: 'https://chittorgarh-tourism.in/kumbha-palace' },
    { name: 'Kumbha-Shyam-Temple', url: 'https://chittorgarh-tourism.in/kumbha-shyam' },
    { name: 'Jain-Temples', url: 'https://chittorgarh-tourism.in/jain-temples' },
    { name: 'Meera-Bai-Temple', url: 'https://chittorgarh-tourism.in/meera-bai-temple' },
    { name: 'Kirti-Stambh', url: 'https://chittorgarh-tourism.in/kirti-stambh' },
    { name: 'Ratan-Singh-Palace', url: 'https://chittorgarh-tourism.in/ratan-palace' },
    { name: 'Nagari', url: 'https://chittorgarh-tourism.in/nagari' }
];

async function generateQRs() {
    for (const item of urls) {
        const filePath = path.join(qrDir, `${item.name}.png`);
        try {
            await QRCode.toFile(filePath, item.url, {
                width: 500,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            });
            console.log(`Generated QR for ${item.name} at ${filePath}`);
        } catch (err) {
            console.error(`Error generating QR for ${item.name}:`, err);
        }
    }
}

generateQRs();
