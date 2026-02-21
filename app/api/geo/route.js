import { NextResponse } from 'next/server';

// Configurable region identifiers
const CHITTORGARH_CITIES = ['chittorgarh', 'chittor', 'chittaurgarh'];
const RAJASTHAN_NAMES = ['rajasthan'];

export async function GET(request) {
    try {
        // Extract client IP from headers (works on Vercel & other proxied environments)
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

        // In local dev, localhost IPs cannot be resolved — return tourist mode so the flow is testable
        const isLocalDev = ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.');
        if (isLocalDev) {
            return NextResponse.json({
                city: 'Localhost',
                regionName: 'Dev',
                country: 'IN',
                isChittorgarh: false,
                isRajasthan: false,
                devMode: true,
            });
        }

        // Call ip-api.com — free, no key required, no PII retained
        const geoUrl = `http://ip-api.com/json/${ip}?fields=status,city,regionName,country`;
        const res = await fetch(geoUrl, { next: { revalidate: 0 } });

        if (!res.ok) throw new Error('Geo API HTTP error');

        const data = await res.json();

        if (data.status !== 'success') {
            return NextResponse.json({ error: 'Geo lookup failed', isChittorgarh: false, isRajasthan: false });
        }

        const city = (data.city || '').toLowerCase();
        const region = (data.regionName || '').toLowerCase();

        const isChittorgarh = CHITTORGARH_CITIES.some(c => city.includes(c));
        const isRajasthan = RAJASTHAN_NAMES.some(r => region.includes(r));

        return NextResponse.json({
            city: data.city,
            regionName: data.regionName,
            country: data.country,
            isChittorgarh,
            isRajasthan,
        });
    } catch (err) {
        console.error('[geo] Error:', err.message);
        // Return a safe fallback — the client will show the manual choice modal
        return NextResponse.json({ error: 'Unavailable', isChittorgarh: false, isRajasthan: false }, { status: 200 });
    }
}
