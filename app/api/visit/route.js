// Disabling file-system based analytics for Vercel deployment.
// Using Firebase Analytics instead (AnalyticsTracker).
// This route now returns a mock success to prevent console errors from legacy components.

export async function POST(request) {
    return Response.json({ success: true, total: 1024 });
}

export async function GET() {
    return Response.json({ 
        total: 1024, 
        referrers: { 'Direct': 500, 'Google': 350, 'Facebook': 120, 'Twitter/X': 54 } 
    });
}
