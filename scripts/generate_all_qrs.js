const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const { createCanvas } = require('canvas');

const targetDir = 'C:\\Users\\kushs\\Downloads\\QR Code';

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chittorgarh-tourism.in';

const places = [
    {
        name: "Home Page",
        cleanName: "Home_Page",
        numName: "01_Home_Page",
        url: `${baseUrl}/`,
        category: "Official Tourism Portal",
        badge: "Official Website"
    },
    {
        name: "Explore All Landmarks",
        cleanName: "Explore_Landmarks",
        numName: "02_Explore_Landmarks",
        url: `${baseUrl}/explore`,
        category: "All Destinations",
        badge: "Complete Directory"
    },
    {
        name: "Chittorgarh Fort",
        cleanName: "Chittorgarh_Fort",
        numName: "03_Chittorgarh_Fort",
        url: `${baseUrl}/chittorgarh-fort`,
        category: "UNESCO World Heritage Site",
        badge: "Fortress Citadel"
    },
    {
        name: "Vijay Stambh",
        cleanName: "Vijay_Stambh",
        numName: "04_Vijay_Stambh",
        url: `${baseUrl}/vijay-stambh`,
        category: "Tower of Victory",
        badge: "9-Story Monument"
    },
    {
        name: "Kirti Stambh",
        cleanName: "Kirti_Stambh",
        numName: "05_Kirti_Stambh",
        url: `${baseUrl}/kirti-stambh`,
        category: "Tower of Fame",
        badge: "Jain Heritage Monument"
    },
    {
        name: "Padmini Palace",
        cleanName: "Padmini_Palace",
        numName: "06_Padmini_Palace",
        url: `${baseUrl}/padmini-palace`,
        category: "Royal Water Palace",
        badge: "Historic Residence"
    },
    {
        name: "Rana Kumbha Palace",
        cleanName: "Rana_Kumbha_Palace",
        numName: "07_Rana_Kumbha_Palace",
        url: `${baseUrl}/kumbha-palace`,
        category: "Royal Residence",
        badge: "Ancient Royal Palace"
    },
    {
        name: "Ratan Singh Palace",
        cleanName: "Ratan_Singh_Palace",
        numName: "08_Ratan_Singh_Palace",
        url: `${baseUrl}/ratan-palace`,
        category: "Ratneshwar Lake Palace",
        badge: "Scenic Royal Retreat"
    },
    {
        name: "Fateh Prakash Palace",
        cleanName: "Fateh_Prakash_Palace",
        numName: "09_Fateh_Prakash_Palace",
        url: `${baseUrl}/fateh-prakash`,
        category: "Government Museum",
        badge: "Artifacts & Sculptures"
    },
    {
        name: "Gaumukh Reservoir",
        cleanName: "Gaumukh_Reservoir",
        numName: "10_Gaumukh_Reservoir",
        url: `${baseUrl}/gaumukh`,
        category: "Sacred Water Spring",
        badge: "Holy Spring & Tank"
    },
    {
        name: "Kalika Mata Temple",
        cleanName: "Kalika_Mata_Temple",
        numName: "11_Kalika_Mata_Temple",
        url: `${baseUrl}/kalika-temple`,
        category: "8th-Century Shrine",
        badge: "Historic Sun/Goddess Temple"
    },
    {
        name: "Meera Bai Temple",
        cleanName: "Meera_Bai_Temple",
        numName: "12_Meera_Bai_Temple",
        url: `${baseUrl}/meera-bai-temple`,
        category: "Devotional Sanctuary",
        badge: "Lord Krishna Devotion"
    },
    {
        name: "Kumbha Shyam Temple",
        cleanName: "Kumbha_Shyam_Temple",
        numName: "13_Kumbha_Shyam_Temple",
        url: `${baseUrl}/kumbha-shyam`,
        category: "Indo-Aryan Architecture",
        badge: "Ancient Temple Complex"
    },
    {
        name: "Jain Temples",
        cleanName: "Jain_Temples",
        numName: "14_Jain_Temples",
        url: `${baseUrl}/jain-temples`,
        category: "Sattavis Devari Shrines",
        badge: "27 Ancient Jain Temples"
    },
    {
        name: "Light & Sound Show",
        cleanName: "Light_and_Sound_Show",
        numName: "15_Light_and_Sound_Show",
        url: `${baseUrl}/light-and-sound-show`,
        category: "Evening Spectacle",
        badge: "Fort History Laser Show"
    },
    {
        name: "Sanwaliya Seth Temple",
        cleanName: "Sanwaliya_Seth_Temple",
        numName: "16_Sanwaliya_Seth_Temple",
        url: `${baseUrl}/sanwaliya`,
        category: "Mandaphiya Pilgrimage",
        badge: "Famous Krishna Shrine"
    },
    {
        name: "Menal Waterfall & Temples",
        cleanName: "Menal_Waterfall",
        numName: "17_Menal_Waterfall",
        url: `${baseUrl}/menal`,
        category: "Scenic Gorge & Ancient Shrines",
        badge: "Monsoon Paradise"
    },
    {
        name: "Nagari Ancient Site",
        cleanName: "Nagari_Ancient_Site",
        numName: "18_Nagari_Ancient_Site",
        url: `${baseUrl}/nagari`,
        category: "Madhyamika Archaeology",
        badge: "Ancient Maurya/Sunga Site"
    },
    {
        name: "Bassi Wildlife Sanctuary",
        cleanName: "Bassi_Sanctuary",
        numName: "19_Bassi_Sanctuary",
        url: `${baseUrl}/bassi`,
        category: "Nature & Wildlife Reserve",
        badge: "Panthers & Birds"
    },
    {
        name: "Sitamata Sanctuary",
        cleanName: "Sitamata_Sanctuary",
        numName: "20_Sitamata_Sanctuary",
        url: `${baseUrl}/sitamata`,
        category: "Flying Squirrel Haven",
        badge: "Teak Forest & Wildlife"
    },
    {
        name: "Panch Gaurav",
        cleanName: "Panch_Gaurav",
        numName: "21_Panch_Gaurav",
        url: `${baseUrl}/panch-gaurav`,
        category: "Five Pride Attributes",
        badge: "Heritage Pride"
    },
    {
        name: "Visitor Information",
        cleanName: "Visitor_Information",
        numName: "22_Visitor_Information",
        url: `${baseUrl}/visitor-info`,
        category: "Timings, Tickets & Guidelines",
        badge: "Essential Tourist Info"
    },
    {
        name: "Plan Your Visit",
        cleanName: "Plan_Your_Visit",
        numName: "23_Plan_Your_Visit",
        url: `${baseUrl}/plan`,
        category: "Custom Itineraries",
        badge: "Trip Planner"
    },
    {
        name: "How to Reach",
        cleanName: "How_To_Reach",
        numName: "24_How_To_Reach",
        url: `${baseUrl}/how-to-reach`,
        category: "Air, Train & Road Routes",
        badge: "Travel Directions"
    },
    {
        name: "Stays & RTDC Hotels",
        cleanName: "Stays_and_Hotels",
        numName: "25_Stays_and_Hotels",
        url: `${baseUrl}/stays`,
        category: "RTDC Hotel Panna & Stays",
        badge: "Accommodation Guide"
    },
    {
        name: "Emergency & Helplines",
        cleanName: "Emergency_Contacts",
        numName: "26_Emergency_Contacts",
        url: `${baseUrl}/emergency`,
        category: "Police, Medical & Tourist Police",
        badge: "24x7 Helplines"
    }
];

async function createQRCard(item) {
    const width = 1000;
    const height = 1250;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // 1. Background Fill - Premium Royal Deep Navy Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#0F0B07');
    bgGradient.addColorStop(0.5, '#1A130C');
    bgGradient.addColorStop(1, '#080604');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Outer Decorative Border (Royal Gold)
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 12;
    ctx.strokeRect(24, 24, width - 48, height - 48);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 3;
    ctx.strokeRect(36, 36, width - 72, height - 72);

    // 2. Header Section
    // Small Pill Badge
    ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const pillX = width / 2 - 200;
    const pillY = 70;
    const pillW = 400;
    const pillH = 45;
    const pillR = 22.5;
    ctx.moveTo(pillX + pillR, pillY);
    ctx.arcTo(pillX + pillW, pillY, pillX + pillW, pillY + pillH, pillR);
    ctx.arcTo(pillX + pillW, pillY + pillH, pillX, pillY + pillH, pillR);
    ctx.arcTo(pillX, pillY + pillH, pillX, pillY, pillR);
    ctx.arcTo(pillX, pillY, pillX + pillW, pillY, pillR);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#F5E6AB';
    ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CHITTORGARH TOURISM', width / 2, pillY + pillH / 2);

    // Landmark Name (Large Title)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 54px "Georgia", "Times New Roman", serif';
    ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
    ctx.shadowBlur = 15;
    ctx.fillText(item.name, width / 2, 175);
    ctx.shadowBlur = 0; // reset shadow

    // Subtitle / Category
    ctx.fillStyle = '#D4AF37';
    ctx.font = '500 26px "Segoe UI", Arial, sans-serif';
    ctx.fillText(`• ${item.category} •`, width / 2, 225);

    // Gold Divider Line
    const divGrad = ctx.createLinearGradient(width / 2 - 250, 0, width / 2 + 250, 0);
    divGrad.addColorStop(0, 'rgba(212, 175, 55, 0)');
    divGrad.addColorStop(0.5, 'rgba(212, 175, 55, 1)');
    divGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
    ctx.fillStyle = divGrad;
    ctx.fillRect(width / 2 - 250, 255, 500, 3);

    // 3. QR Code Container Box (Crisp White Card with subtle drop shadow)
    const qrBoxWidth = 620;
    const qrBoxHeight = 620;
    const qrBoxX = (width - qrBoxWidth) / 2;
    const qrBoxY = 285;

    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetY = 10;
    
    // Draw rounded rect for QR box
    const cardR = 24;
    ctx.beginPath();
    ctx.moveTo(qrBoxX + cardR, qrBoxY);
    ctx.arcTo(qrBoxX + qrBoxWidth, qrBoxY, qrBoxX + qrBoxWidth, qrBoxY + qrBoxHeight, cardR);
    ctx.arcTo(qrBoxX + qrBoxWidth, qrBoxY + qrBoxHeight, qrBoxX, qrBoxY + qrBoxHeight, cardR);
    ctx.arcTo(qrBoxX, qrBoxY + qrBoxHeight, qrBoxX, qrBoxY, cardR);
    ctx.arcTo(qrBoxX, qrBoxY, qrBoxX + qrBoxWidth, qrBoxY, cardR);
    ctx.closePath();
    ctx.fill();
    ctx.shadowColor = 'transparent';

    // Gold border around QR white box
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Generate high-resolution QR Buffer
    const qrSize = 540;
    const qrBuffer = await QRCode.toBuffer(item.url, {
        width: qrSize,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        }
    });

    const { loadImage } = require('canvas');
    const qrImg = await loadImage(qrBuffer);
    const qrImageX = (width - qrSize) / 2;
    const qrImageY = qrBoxY + (qrBoxHeight - qrSize) / 2;
    ctx.drawImage(qrImg, qrImageX, qrImageY, qrSize, qrSize);

    // 4. Footer Section
    // Instruction Callout
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 30px "Segoe UI", Arial, sans-serif';
    ctx.fillText('SCAN WITH CAMERA TO VISIT PAGE', width / 2, 960);

    // URL Display Box
    const urlBoxW = 750;
    const urlBoxH = 54;
    const urlBoxX = (width - urlBoxW) / 2;
    const urlBoxY = 1000;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(urlBoxX + 16, urlBoxY);
    ctx.arcTo(urlBoxX + urlBoxW, urlBoxY, urlBoxX + urlBoxW, urlBoxY + urlBoxH, 16);
    ctx.arcTo(urlBoxX + urlBoxW, urlBoxY + urlBoxH, urlBoxX, urlBoxY + urlBoxH, 16);
    ctx.arcTo(urlBoxX, urlBoxY + urlBoxH, urlBoxX, urlBoxY, 16);
    ctx.arcTo(urlBoxX, urlBoxY, urlBoxX + urlBoxW, urlBoxY, 16);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#F5E6AB';
    ctx.font = '600 24px "Courier New", monospace, sans-serif';
    ctx.fillText(item.url, width / 2, urlBoxY + urlBoxH / 2 + 1);

    // District Collectorate Branding Line
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 22px "Georgia", serif';
    ctx.fillText('District Administration & Tourism Department, Chittorgarh', width / 2, 1100);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '18px "Segoe UI", Arial, sans-serif';
    ctx.fillText('Official Visitor QR Code System', width / 2, 1135);

    // Save to files in C:\Users\kushs\Downloads\QR Code
    const buf = canvas.toBuffer('image/png');
    
    // Save numbered file (e.g. 05_Kirti_Stambh.png)
    const numPath = path.join(targetDir, `${item.numName}.png`);
    fs.writeFileSync(numPath, buf);

    // Save clean file (e.g. Kirti_Stambh.png)
    const cleanPath = path.join(targetDir, `${item.cleanName}.png`);
    fs.writeFileSync(cleanPath, buf);

    console.log(`Generated: ${item.name} -> ${numPath} & ${cleanPath}`);
}

async function run() {
    console.log('Generating QR Codes for Chittorgarh Tourism...');
    for (const item of places) {
        await createQRCard(item);
    }
    console.log(`\nAll ${places.length} QR Codes generated successfully in: ${targetDir}`);
}

run().catch(err => {
    console.error('Error generating QR codes:', err);
    process.exit(1);
});
