require('dotenv').config();
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const qrDir = path.join(process.cwd(), 'public', 'QR_codes');
if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir);
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chittorgarh-tourism.in';
const urls = [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Vijay-Stambh', url: `${baseUrl}/vijay-stambh` },
    { name: 'Fateh-Prakash', url: `${baseUrl}/fateh-prakash` },
    { name: 'Rana-Kumbha-Palace', url: `${baseUrl}/kumbha-palace` },
    { name: 'Kumbha-Shyam-Temple', url: `${baseUrl}/kumbha-shyam` },
    { name: 'Jain-Temples', url: `${baseUrl}/jain-temples` },
    { name: 'Meera-Bai-Temple', url: `${baseUrl}/meera-bai-temple` },
    { name: 'Kirti-Stambh', url: `${baseUrl}/kirti-stambh` },
    { name: 'Ratan-Singh-Palace', url: `${baseUrl}/ratan-palace` },
    { name: 'Nagari', url: `${baseUrl}/nagari` },
    { name: 'Sitamata', url: `${baseUrl}/sitamata` }
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
