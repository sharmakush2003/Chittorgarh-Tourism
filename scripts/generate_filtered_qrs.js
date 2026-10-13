const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');

const targetDir = 'C:\\Users\\kushs\\Downloads\\QR Code';

// Clean out ALL existing files in Downloads\QR Code
if (fs.existsSync(targetDir)) {
    const existingFiles = fs.readdirSync(targetDir);
    for (const file of existingFiles) {
        fs.unlinkSync(path.join(targetDir, file));
    }
} else {
    fs.mkdirSync(targetDir, { recursive: true });
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chittorgarh-tourism.in';

const filteredPlaces = [
    {
        num: "01",
        name: "Home Page",
        cleanName: "Home_Page",
        url: `${baseUrl}/`,
        category: "Official Tourism Portal"
    },
    {
        num: "02",
        name: "Chittorgarh Fort",
        cleanName: "Chittorgarh_Fort",
        url: `${baseUrl}/chittorgarh-fort`,
        category: "UNESCO World Heritage Site"
    },
    {
        num: "03",
        name: "Vijay Stambh",
        cleanName: "Vijay_Stambh",
        url: `${baseUrl}/vijay-stambh`,
        category: "Tower of Victory"
    },
    {
        num: "04",
        name: "Kirti Stambh",
        cleanName: "Kirti_Stambh",
        url: `${baseUrl}/kirti-stambh`,
        category: "Tower of Fame"
    },
    {
        num: "05",
        name: "Padmini Palace",
        cleanName: "Padmini_Palace",
        url: `${baseUrl}/padmini-palace`,
        category: "Royal Water Palace"
    },
    {
        num: "06",
        name: "Rana Kumbha Palace",
        cleanName: "Rana_Kumbha_Palace",
        url: `${baseUrl}/kumbha-palace`,
        category: "Royal Residence"
    },
    {
        num: "07",
        name: "Ratan Singh Palace",
        cleanName: "Ratan_Singh_Palace",
        url: `${baseUrl}/ratan-palace`,
        category: "Ratneshwar Lake Palace"
    },
    {
        num: "08",
        name: "Fateh Prakash Palace",
        cleanName: "Fateh_Prakash_Palace",
        url: `${baseUrl}/fateh-prakash`,
        category: "Government Museum"
    },
    {
        num: "09",
        name: "Gaumukh Reservoir",
        cleanName: "Gaumukh_Reservoir",
        url: `${baseUrl}/gaumukh`,
        category: "Sacred Water Spring"
    },
    {
        num: "10",
        name: "Kalika Mata Temple",
        cleanName: "Kalika_Mata_Temple",
        url: `${baseUrl}/kalika-temple`,
        category: "8th-Century Shrine"
    },
    {
        num: "11",
        name: "Meera Bai Temple",
        cleanName: "Meera_Bai_Temple",
        url: `${baseUrl}/meera-bai-temple`,
        category: "Devotional Sanctuary"
    },
    {
        num: "12",
        name: "Kumbha Shyam Temple",
        cleanName: "Kumbha_Shyam_Temple",
        url: `${baseUrl}/kumbha-shyam`,
        category: "Indo-Aryan Architecture"
    },
    {
        num: "13",
        name: "Jain Temples",
        cleanName: "Jain_Temples",
        url: `${baseUrl}/jain-temples`,
        category: "Sattavis Devari Shrines"
    },
    {
        num: "14",
        name: "Light & Sound Show",
        cleanName: "Light_and_Sound_Show",
        url: `${baseUrl}/light-and-sound-show`,
        category: "Evening Spectacle"
    },
    {
        num: "15",
        name: "Sanwaliya Seth Temple",
        cleanName: "Sanwaliya_Seth_Temple",
        url: `${baseUrl}/sanwaliya`,
        category: "Mandaphiya Pilgrimage"
    },
    {
        num: "16",
        name: "Menal Waterfall & Temples",
        cleanName: "Menal_Waterfall",
        url: `${baseUrl}/menal`,
        category: "Scenic Gorge & Ancient Shrines"
    },
    {
        num: "17",
        name: "Nagari Ancient Site",
        cleanName: "Nagari_Ancient_Site",
        url: `${baseUrl}/nagari`,
        category: "Madhyamika Archaeology"
    },
    {
        num: "18",
        name: "Bassi Wildlife Sanctuary",
        cleanName: "Bassi_Sanctuary",
        url: `${baseUrl}/bassi`,
        category: "Nature & Wildlife Reserve"
    },
    {
        num: "19",
        name: "Sitamata Sanctuary",
        cleanName: "Sitamata_Sanctuary",
        url: `${baseUrl}/sitamata`,
        category: "Flying Squirrel Haven"
    }
];

async function createQRCard(item) {
    const numPath = path.join(targetDir, `${item.num}_${item.cleanName}.png`);
    await QRCode.toFile(numPath, item.url, {
        width: 1200,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: { dark: '#000000', light: '#FFFFFF' }
    });
    console.log(`Generated Simple QR File (${item.num}): ${numPath}`);
}

async function run() {
    console.log('Generating ONLY Single Numbered QR Codes (01 to 19)...');
    for (const item of filteredPlaces) {
        await createQRCard(item);
    }
    console.log(`\nDone! Exactly ${filteredPlaces.length} QR Code files created in: ${targetDir}`);
}

run().catch(err => {
    console.error('Error generating QR codes:', err);
    process.exit(1);
});
