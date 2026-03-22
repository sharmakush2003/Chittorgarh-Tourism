const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const qrDir = path.join(process.cwd(), 'QR_codes');
if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir);
}

const urls = [
    { name: 'Home', url: 'https://www.chittorgarh-tourism.in/' },
    { name: 'Vijay-Stambh', url: 'https://www.chittorgarh-tourism.in/vijay-stambh' },
    { name: 'Fateh-Prakash', url: 'https://www.chittorgarh-tourism.in/fateh-prakash' },
    { name: 'Rana-Kumbha-Palace', url: 'https://www.chittorgarh-tourism.in/kumbha-palace' },
    { name: 'Kumbha-Shyam-Temple', url: 'https://www.chittorgarh-tourism.in/kumbha-shyam' }
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
