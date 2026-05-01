import { NextResponse } from 'next/server';

export function middleware(request) {
    const userAgent = request.headers.get('user-agent') || '';
    const url = request.nextUrl.pathname;
    
    // List of aggressive or unwanted bots that trigger high Edge Requests
    const blockedBots = [
        'HetrixTools', 'UptimeRobot', 'Better-Uptime', 'Checkly', 'Dotcom-Monitor',
        'Pingdom', 'NewRelicPinger', 'PetalBot', 'AhrefsBot', 'SEMrushBot',
        'MJ12bot', 'DotBot', 'GPTBot', 'ClaudeBot', 'CCBot',
    ];

    const isBot = blockedBots.some(bot => 
        userAgent.toLowerCase().includes(bot.toLowerCase())
    );

    if (isBot) {
        console.log(`🛡️ Middleware: Blocked bot request from: ${userAgent}`);
        return new NextResponse(
            JSON.stringify({ error: 'Access Denied' }),
            { status: 403, headers: { 'content-type': 'application/json' } }
        );
    }

    const sensitivePaths = [
        '/wp-admin', '/wp-login', '.php', '.env', '/config', '/admin',
    ];

    const matchedPath = sensitivePaths.find(path => url.includes(path));
    if (matchedPath && !url.startsWith('/admin')) {
        console.log(`🛡️ Middleware: Blocked sensitive path request: ${url} (Matched: ${matchedPath})`);
        return new NextResponse(null, { status: 404 });
    }

    return NextResponse.next();
}

// Ensure middleware only runs on relevant paths to keep performance high
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
