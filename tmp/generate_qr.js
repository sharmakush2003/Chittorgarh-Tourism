const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const url = 'https://chittorgarh-tourism.in/light-and-sound-show';
const outputPath = path.join(__dirname, '..', 'public', 'QR_codes', 'Light-Sound-Show.png');

// Ensure directory exists
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

QRCode.toFile(outputPath, url, {
  color: {
    dark: '#000000',
    light: '#ffffff'
  },
  width: 1024
}, function (err) {
  if (err) throw err;
  console.log('QR code generated at: ' + outputPath);
});
