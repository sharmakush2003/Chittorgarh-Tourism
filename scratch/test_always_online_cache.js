const https = require('https');

const urls = [
    'https://www.chittorgarh-tourism.in/',
    'https://chittorgarh-tourism.in/',
    'https://www.chittorgarh-tourism.in/chittorgarh-fort',
    'https://www.chittorgarh-tourism.in/vijay-stambh',
    'https://www.chittorgarh-tourism.in/kirti-stambh'
];

function checkHeaders(url) {
    return new Promise((resolve) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) CloudflareAlwaysOnlineCheck/1.0'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => { data += chunk; });
            res.on('end', () => {
                resolve({
                    url,
                    statusCode: res.statusCode,
                    headers: {
                        'server': res.headers['server'],
                        'cf-cache-status': res.headers['cf-cache-status'],
                        'cache-control': res.headers['cache-control'],
                        'age': res.headers['age'],
                        'cf-ray': res.headers['cf-ray'],
                        'etag': res.headers['etag'],
                        'content-type': res.headers['content-type']
                    },
                    contentLength: data.length,
                    hasHtmlContent: data.includes('<html') || data.includes('<!DOCTYPE html')
                });
            });
        });
        req.on('error', (err) => resolve({ url, error: err.message }));
        req.setTimeout(8000, () => {
            req.destroy();
            resolve({ url, error: 'Timeout' });
        });
    });
}

async function run() {
    console.log("=== CLOUDFLARE ALWAYS-ONLINE & EDGE CACHE DIAGNOSTIC ===");
    for (const url of urls) {
        const result = await checkHeaders(url);
        console.log(`\nURL: ${result.url}`);
        if (result.error) {
            console.log(`  -> Error: ${result.error}`);
        } else {
            console.log(`  -> Status Code: ${result.statusCode}`);
            console.log(`  -> Server: ${result.headers.server}`);
            console.log(`  -> CF Cache Status: ${result.headers['cf-cache-status'] || 'N/A'}`);
            console.log(`  -> Cache-Control: ${result.headers['cache-control'] || 'N/A'}`);
            console.log(`  -> Response Length: ${result.contentLength} bytes`);
            console.log(`  -> Contains Full HTML: ${result.hasHtmlContent}`);
            console.log(`  -> CF Ray ID: ${result.headers['cf-ray'] || 'N/A'}`);
        }
    }
}

run();
