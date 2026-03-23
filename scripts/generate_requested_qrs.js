require('dotenv').config();
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chittorgarh-tourism.in";
const qrDir = path.join(process.cwd(), 'public', 'Qr_Codes');

// Ensure directory exists
if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir, { recursive: true });
}

const mappings = [
    { name: 'Home', slug: '' },
    { name: 'Explore', slug: 'explore' },
    { name: 'Emergency', slug: 'emergency' },
    { name: 'Chittorgarh Fort', slug: 'chittorgarh-fort' },
    { name: 'Bassi Sanctuary', slug: 'bassi' },
    { name: 'Sanwariya ji temple', slug: 'sanwaliya' },
    { name: 'Vijay Stambh', slug: 'vijay-stambh' },
    { name: 'Kirti Stambh', slug: 'kirti-stambh' },
    { name: 'Kalika Mata Temple', slug: 'kalika-temple' },
    { name: 'Jain Temples', slug: 'jain-temples' },
    { name: 'Gaumukh', slug: 'gaumukh' },
    { name: 'Fateh Prakash Palace', slug: 'fateh-prakash' },
    { name: 'Rana Kumbha', slug: 'kumbha-palace' },
    { name: 'Padmini Palace', slug: 'padmini-palace' },
    { name: 'Meera Bai', slug: 'meera-bai-temple' },
    { name: 'Ratan Singh', slug: 'ratan-palace' },
    { name: 'Nagari', slug: 'nagari' },
    { name: 'Sitamata', slug: 'sitamata' },
    { name: 'Kumbha Shyam', slug: 'kumbha-shyam' },
    { name: 'Menal', slug: 'menal' },
    { name: 'Light and Sound Show', slug: 'light-and-sound-show' }
];

async function generateQRs() {
    console.log("🚀 Starting QR code generation for http://chittorgarh-tourism.in ...");
    
    for (const item of mappings) {
        const url = `${baseUrl}/${item.slug}`;
        const fileName = `${item.name.replace(/\s+/g, '_')}.png`;
        const filePath = path.join(qrDir, fileName);
        
        try {
            await QRCode.toFile(filePath, url, {
                width: 1024,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            });
            console.log(`✅ Generated: ${fileName} -> ${url}`);
        } catch (err) {
            console.error(`❌ Failed to generate QR for ${item.name}:`, err);
        }
    }
    
    console.log("\n✨ QR code generation complete! Files stored in public/Qr_Codes");
}

generateQRs();
