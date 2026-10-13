const https = require('https');

const urlsToTest = [
    { name: "Home Page", url: "https://www.chittorgarh-tourism.in/" },
    { name: "Chittorgarh Fort", url: "https://www.chittorgarh-tourism.in/chittorgarh-fort" },
    { name: "Vijay Stambh", url: "https://www.chittorgarh-tourism.in/vijay-stambh" },
    { name: "Kirti Stambh", url: "https://www.chittorgarh-tourism.in/kirti-stambh" },
    { name: "Padmini Palace", url: "https://www.chittorgarh-tourism.in/padmini-palace" },
    { name: "Rana Kumbha Palace", url: "https://www.chittorgarh-tourism.in/kumbha-palace" },
    { name: "Ratan Singh Palace", url: "https://www.chittorgarh-tourism.in/ratan-palace" },
    { name: "Fateh Prakash Palace", url: "https://www.chittorgarh-tourism.in/fateh-prakash" },
    { name: "Gaumukh Reservoir", url: "https://www.chittorgarh-tourism.in/gaumukh" },
    { name: "Kalika Mata Temple", url: "https://www.chittorgarh-tourism.in/kalika-temple" },
    { name: "Meera Bai Temple", url: "https://www.chittorgarh-tourism.in/meera-bai-temple" },
    { name: "Kumbha Shyam Temple", url: "https://www.chittorgarh-tourism.in/kumbha-shyam" },
    { name: "Jain Temples", url: "https://www.chittorgarh-tourism.in/jain-temples" },
    { name: "Light & Sound Show", url: "https://www.chittorgarh-tourism.in/light-and-sound-show" },
    { name: "Sanwaliya Seth Temple", url: "https://www.chittorgarh-tourism.in/sanwaliya" },
    { name: "Menal Waterfall & Temples", url: "https://www.chittorgarh-tourism.in/menal" },
    { name: "Nagari Ancient Site", url: "https://www.chittorgarh-tourism.in/nagari" },
    { name: "Bassi Wildlife Sanctuary", url: "https://www.chittorgarh-tourism.in/bassi" },
    { name: "Sitamata Sanctuary", url: "https://www.chittorgarh-tourism.in/sitamata" },
    { name: "Visitor Feedback Hub", url: "https://www.chittorgarh-tourism.in/feedback" }
];

function fetchUrl(targetUrl) {
    return new Promise((resolve) => {
        const req = https.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                const titleMatch = data.match(/<title[^>]*>([^<]+)<\/title>/i);
                const title = titleMatch ? titleMatch[1].trim() : 'No Title Found';
                resolve({
                    statusCode: res.statusCode,
                    finalUrl: res.headers.location || targetUrl,
                    title: title,
                    bodyLength: data.length
                });
            });
        });
        req.on('error', (err) => {
            resolve({ statusCode: 0, error: err.message });
        });
        req.setTimeout(10000, () => {
            req.destroy();
            resolve({ statusCode: 0, error: 'Timeout' });
        });
    });
}

async function verifyAll() {
    console.log("Testing WWW URLs directly on Chittorgarh Tourism...\n");
    const results = [];

    for (const item of urlsToTest) {
        process.stdout.write(`Testing: ${item.name} (${item.url})... `);
        const res = await fetchUrl(item.url);
        if (res.statusCode === 200) {
            console.log(`[OK 200] Title: "${res.title}"`);
            results.push({ ...item, status: "SUCCESS (200 OK)", statusCode: 200, title: res.title });
        } else {
            console.log(`[HTTP ${res.statusCode}] ${res.error || ''}`);
            results.push({ ...item, status: "FAIL", statusCode: res.statusCode, title: res.error });
        }
    }

    console.log("\nFinal WWW Verification Results:");
    console.table(results.map(r => ({ Name: r.name, URL: r.url, Status: r.status, Title: r.title })));
}

verifyAll();
