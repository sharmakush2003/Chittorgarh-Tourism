const dns = require('dns');
const https = require('https');

const hostnames = ['chittorgarh-tourism.in', 'www.chittorgarh-tourism.in'];

async function testDNS(hostname) {
    return new Promise((resolve) => {
        dns.resolve4(hostname, (err, addresses) => {
            if (err) {
                resolve({ hostname, success: false, error: err.message });
            } else {
                resolve({ hostname, success: true, addresses });
            }
        });
    });
}

async function testHTTP(targetUrl) {
    return new Promise((resolve) => {
        const req = https.get(targetUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Diagnostic/1.0' }
        }, (res) => {
            resolve({
                url: targetUrl,
                statusCode: res.statusCode,
                cfCacheStatus: res.headers['cf-cache-status'] || 'N/A',
                cfRay: res.headers['cf-ray'] || 'N/A',
                server: res.headers['server'] || 'N/A',
                cacheControl: res.headers['cache-control'] || 'N/A',
                contentType: res.headers['content-type'] || 'N/A'
            });
        });
        req.on('error', (err) => resolve({ url: targetUrl, statusCode: 0, error: err.message }));
        req.setTimeout(8000, () => {
            req.destroy();
            resolve({ url: targetUrl, statusCode: 0, error: 'Timeout' });
        });
    });
}

async function runDiagnostics() {
    console.log("=== 1. DNS RESOLUTION TEST ===");
    for (const host of hostnames) {
        const dnsResult = await testDNS(host);
        console.log(`Host: ${host}`);
        if (dnsResult.success) {
            console.log(`  -> Resolved IPs: ${dnsResult.addresses.join(', ')} (Cloudflare Proxied IPs)`);
        } else {
            console.log(`  -> Error: ${dnsResult.error}`);
        }
    }

    console.log("\n=== 2. HTTP & CLOUDFLARE CACHING TEST ===");
    const testUrls = [
        "https://chittorgarh-tourism.in/",
        "https://www.chittorgarh-tourism.in/",
        "https://chittorgarh-tourism.in/chittorgarh-fort",
        "https://chittorgarh-tourism.in/vijay-stambh",
        "https://chittorgarh-tourism.in/kirti-stambh"
    ];

    for (const url of testUrls) {
        const httpResult = await testHTTP(url);
        console.log(`URL: ${url}`);
        console.log(`  -> Status: ${httpResult.statusCode}`);
        console.log(`  -> Server: ${httpResult.server}`);
        console.log(`  -> Cloudflare Cache Status: ${httpResult.cfCacheStatus}`);
        console.log(`  -> Cache Control: ${httpResult.cacheControl}`);
        console.log(`  -> CF Ray ID: ${httpResult.cfRay}`);
    }
}

runDiagnostics();
