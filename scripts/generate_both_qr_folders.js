const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const baseDir = 'C:\\Users\\kushs\\Downloads\\QR Code';
const hdDir = path.join(baseDir, 'HD QR Code');

// Ensure directories exist
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
}
if (!fs.existsSync(hdDir)) {
    fs.mkdirSync(hdDir, { recursive: true });
}

// Clean out base directory (only delete files, leave HD QR Code subfolder)
const existingBaseFiles = fs.readdirSync(baseDir);
for (const file of existingBaseFiles) {
    const fullPath = path.join(baseDir, file);
    if (fs.statSync(fullPath).isFile()) {
        fs.unlinkSync(fullPath);
    }
}

// Clean out HD subfolder
const existingHDFiles = fs.readdirSync(hdDir);
for (const file of existingHDFiles) {
    const fullPath = path.join(hdDir, file);
    if (fs.statSync(fullPath).isFile()) {
        fs.unlinkSync(fullPath);
    }
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chittorgarh-tourism.in';

const filteredPlaces = [
    { num: "01", name: "Home Page", cleanName: "Home_Page", url: `${baseUrl}/`, category: "Official Tourism Portal" },
    { num: "02", name: "Chittorgarh Fort", cleanName: "Chittorgarh_Fort", url: `${baseUrl}/chittorgarh-fort`, category: "UNESCO World Heritage Site" },
    { num: "03", name: "Vijay Stambh", cleanName: "Vijay_Stambh", url: `${baseUrl}/vijay-stambh`, category: "Tower of Victory" },
    { num: "04", name: "Kirti Stambh", cleanName: "Kirti_Stambh", url: `${baseUrl}/kirti-stambh`, category: "Tower of Fame" },
    { num: "05", name: "Padmini Palace", cleanName: "Padmini_Palace", url: `${baseUrl}/padmini-palace`, category: "Royal Water Palace" },
    { num: "06", name: "Rana Kumbha Palace", cleanName: "Rana_Kumbha_Palace", url: `${baseUrl}/kumbha-palace`, category: "Royal Residence" },
    { num: "07", name: "Ratan Singh Palace", cleanName: "Ratan_Singh_Palace", url: `${baseUrl}/ratan-palace`, category: "Ratneshwar Lake Palace" },
    { num: "08", name: "Fateh Prakash Palace", cleanName: "Fateh_Prakash_Palace", url: `${baseUrl}/fateh-prakash`, category: "Government Museum" },
    { num: "09", name: "Gaumukh Reservoir", cleanName: "Gaumukh_Reservoir", url: `${baseUrl}/gaumukh`, category: "Sacred Water Spring" },
    { num: "10", name: "Kalika Mata Temple", cleanName: "Kalika_Mata_Temple", url: `${baseUrl}/kalika-temple`, category: "8th-Century Shrine" },
    { num: "11", name: "Meera Bai Temple", cleanName: "Meera_Bai_Temple", url: `${baseUrl}/meera-bai-temple`, category: "Devotional Sanctuary" },
    { num: "12", name: "Kumbha Shyam Temple", cleanName: "Kumbha_Shyam_Temple", url: `${baseUrl}/kumbha-shyam`, category: "Indo-Aryan Architecture" },
    { num: "13", name: "Jain Temples", cleanName: "Jain_Temples", url: `${baseUrl}/jain-temples`, category: "Sattavis Devari Shrines" },
    { num: "14", name: "Light & Sound Show", cleanName: "Light_and_Sound_Show", url: `${baseUrl}/light-and-sound-show`, category: "Evening Spectacle" },
    { num: "15", name: "Sanwaliya Seth Temple", cleanName: "Sanwaliya_Seth_Temple", url: `${baseUrl}/sanwaliya`, category: "Mandaphiya Pilgrimage" },
    { num: "16", name: "Menal Waterfall & Temples", cleanName: "Menal_Waterfall", url: `${baseUrl}/menal`, category: "Scenic Gorge & Ancient Shrines" },
    { num: "17", name: "Nagari Ancient Site", cleanName: "Nagari_Ancient_Site", url: `${baseUrl}/nagari`, category: "Madhyamika Archaeology" },
    { num: "18", name: "Bassi Wildlife Sanctuary", cleanName: "Bassi_Sanctuary", url: `${baseUrl}/bassi`, category: "Nature & Wildlife Reserve" },
    { num: "19", name: "Sitamata Sanctuary", cleanName: "Sitamata_Sanctuary", url: `${baseUrl}/sitamata`, category: "Flying Squirrel Haven" }
];

async function generateStandardQR(item) {
    const filePath = path.join(baseDir, `${item.num}_${item.cleanName}.png`);
    await QRCode.toFile(filePath, item.url, {
        width: 4000,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: { dark: '#000000', light: '#FFFFFF' }
    });
}

async function generateUltraHDQR(item) {
    const filePath = path.join(hdDir, `${item.num}_${item.cleanName}.png`);
    await QRCode.toFile(filePath, item.url, {
        width: 4000,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: { dark: '#000000', light: '#FFFFFF' }
    });
}

async function run() {
    console.log('Generating plain simple standard & HD QR code sets...');
    for (const item of filteredPlaces) {
        await generateStandardQR(item);
        await generateUltraHDQR(item);
        console.log(`Generated item ${item.num}: ${item.name} (${item.num}_${item.cleanName}.png)`);
    }
    console.log('\nAll 19 simple QR codes generated successfully in both standard & HD folders!');
}

run().catch(err => {
    console.error('Error generating QR codes:', err);
    process.exit(1);
});
