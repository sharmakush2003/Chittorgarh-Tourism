import { NextResponse } from 'next/server';

// Configurable region identifiers
const CHITTORGARH_CITIES = ['chittorgarh', 'chittor', 'chittaurgarh', 'chanderiya', 'chanderia', 'senthi', 'bapawar'];
const RAJASTHAN_NAMES = ['rajasthan'];

export async function GET(request) {
    try {
        // Extract client IP from headers (works on Vercel & other proxied environments)
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

        // In local dev, localhost IPs cannot be resolved.
        const isLocalDev = ip === '127.0.0.1' || ip === '::1';

        // Allow manual testing via query param: /api/geo?sim=local or /api/geo?sim=tourist
        const { searchParams } = new URL(request.url);
        const sim = searchParams.get('sim');

        if (sim === 'local' || (isLocalDev && sim !== 'tourist')) {
            return NextResponse.json({
                city: 'Chittorgarh',
                regionName: 'Rajasthan',
                country: 'IN',
                isChittorgarh: true,
                isRajasthan: true,
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
