const fs = require('fs');
const QRCode = require('qrcode');
const { createCanvas, loadImage, registerFont } = require('canvas');

async function createPoster(url, outputPath) {
    // Website URL to encode in the QR code
    const qrcodeUrl = url;

    // Create a canvas for the poster (A4 aspect ratio: 2480 x 3508 for 300dpi)
    const width = 1240;
    const height = 1754;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Background color - dark premium heritage aesthetic
    ctx.fillStyle = '#1A1814';
    ctx.fillRect(0, 0, width, height);

    // Add a subtle border
    ctx.strokeStyle = '#D4AF37'; // Gold
    ctx.lineWidth = 10;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    // Add Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 80px "Arial"';
    ctx.textAlign = 'center';
    ctx.fillText('Chittorgarh', width / 2, 200);

    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 80px "Arial"';
    ctx.fillText('Tourism', width / 2, 300);

    // Tagline
    ctx.fillStyle = '#f5f5f5';
    ctx.font = 'italic 40px "Arial"';
    ctx.fillText('The Saga of Bravery & Sacrifice', width / 2, 400);

    // Generate QR code as a data URI
    const qrBuffer = await QRCode.toBuffer(qrcodeUrl, {
        width: 600,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#ffffff'
        }
    });

    // Load the QR code into the canvas
    const img = await loadImage(qrBuffer);
    const qrX = (width - 600) / 2;
    const qrY = (height - 600) / 2 + 100;

    // Draw a white background for the rounded QR code container
    ctx.fillStyle = '#FFFFFF';
    ctx.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
    }

    ctx.roundRect(qrX - 20, qrY - 20, 640, 640, 40).fill();

    ctx.drawImage(img, qrX, qrY, 600, 600);

    // Instructions
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 50px "Arial"';
    ctx.fillText('Scan to Explore', width / 2, qrY + 600 + 100);

    ctx.fillStyle = '#e5e5e5';
    ctx.font = '30px "Arial"';
    ctx.fillText('Experience the timeless glory of Rajasthan\'s greatest fort.', width / 2, qrY + 600 + 170);

    // Footer
    ctx.fillStyle = '#a3a3a3';
    ctx.font = '24px "Arial"';
    ctx.fillText(qrcodeUrl, width / 2, height - 100);

    // Save the image
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Poster created successfully at ${outputPath}`);
}

// Replace with the actual deployed URL when ready
createPoster('https://chittorgarh-tourism-five.vercel.app/', 'public/poster.png');
