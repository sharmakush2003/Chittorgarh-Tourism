const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

async function generateQR() {
    const url = 'https://chittorgarh-tourism.in/bassi';
    const outputPath = path.join(__dirname, '../public/QR_codes/Bassi.png');

    try {
        // Ensure the directory exists
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Generate QR code with high quality
        await QRCode.toFile(outputPath, url, {
            errorCorrectionLevel: 'H',
            type: 'png',
            width: 1024,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });

        console.log(`QR Code generated successfully at: ${outputPath}`);
        console.log(`URL: ${url}`);
    } catch (err) {
        console.error('Error generating QR code:', err);
        process.exit(1);
    }
}

generateQR();
