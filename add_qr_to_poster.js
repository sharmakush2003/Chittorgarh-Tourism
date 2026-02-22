const fs = require('fs');
const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');

async function addQRToPoster(url, inputPath, outputPath) {
    const qrcodeUrl = url;

    // Load the user's poster
    const img = await loadImage(inputPath);
    const width = img.width;
    const height = img.height;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Draw the original poster
    ctx.drawImage(img, 0, 0, width, height);

    // Determine QR size based on poster size, ensuring it's not too small or too large
    let qrSize = Math.floor(Math.min(width, height) / 6);
    if (qrSize < 200) qrSize = 200;

    // Generate QR code as a buffer
    const qrBuffer = await QRCode.toBuffer(qrcodeUrl, {
        width: qrSize,
        margin: 1, // small margin
        color: {
            dark: '#000000',
            light: '#ffffff'
        }
    });

    // Load the QR code
    const qrImg = await loadImage(qrBuffer);

    // Position QR code at the bottom right with padding
    const paddingX = Math.floor(width * 0.05);
    const paddingY = Math.floor(height * 0.05);
    const qrX = width - qrSize - paddingX;
    const qrY = height - qrSize - paddingY;

    // Draw a white background with a subtle border radius for the QR code container
    const bgPadding = Math.floor(qrSize * 0.1);
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;

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

    ctx.roundRect(qrX - bgPadding, qrY - bgPadding, qrSize + bgPadding * 2, qrSize + bgPadding * 2, 20).fill();

    // Reset shadow before drawing image
    ctx.shadowColor = 'transparent';
    ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

    // Save the image overwriting the previous poster.png
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Poster with QR created successfully at ${outputPath}`);
}

addQRToPoster('https://chittorgarh-tourism-five.vercel.app/', 'public/Poster-For-Chittorgarh-Tourism.png', 'public/poster.png');
