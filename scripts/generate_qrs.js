require('dotenv').config();
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chittorgarh-tourism.in";
const monuments = [
    "chittorgarh-fort",
    "vijay-stambh",
    "kumbha-shyam",
    "padmini-palace",
    "kumbha-palace",
    "ratan-palace",
    "gaumukh",
    "kalika-temple",
    "fateh-prakash",
    "menal",
    "sitamata",
    "sanwaliya",
    "explore",
    "chronicles",
    "plan",
    "stays",
    "how-to-reach",
    "menal"
];

const outputDir = path.join(__dirname, '../public/QR codes');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function generateQRs() {
    console.log("Starting QR code generation...");
    
    for (const slug of monuments) {
        const url = `${baseUrl}/${slug}`;
        const filePath = path.join(outputDir, `${slug}.png`);
        
        try {
            await QRCode.toFile(filePath, url, {
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                },
                width: 1024,
                margin: 2
            });
            console.log(`✅ Generated: ${slug}.png`);
        } catch (err) {
            console.error(`❌ Failed to generate QR for ${slug}:`, err);
        }
    }
    
    console.log("QR code generation complete!");
}

generateQRs();
