import { NextResponse } from 'next/server';

export function middleware(request) {
    const userAgent = request.headers.get('user-agent') || '';
    
    // List of aggressive or unwanted bots that trigger high Edge Requests
    const blockedBots = [
        'HetrixTools',
        'UptimeRobot',
        'Better-Uptime',
        'Checkly',
        'Dotcom-Monitor',
        'Pingdom',
        'NewRelicPinger',
        'PetalBot',
        'AhrefsBot',
        'SEMrushBot',
        'MJ12bot',
        'DotBot',
        'GPTBot',
        'ClaudeBot',
        'CCBot',
    ];

    // Check if the current User-Agent matches any blocked bot
    const isBot = blockedBots.some(bot => 
        userAgent.toLowerCase().includes(bot.toLowerCase())
    );

    if (isBot) {
        console.log(`🛡️ Middleware: Blocked bot request from: ${userAgent}`);
        // Return a 403 Forbidden Response to stop the bot from loading any scripts/data
        return new NextResponse(
            JSON.stringify({ error: 'Access Denied: Automated monitors are currently restricted.' }),
            { status: 403, headers: { 'content-type': 'application/json' } }
        );
    }

    // Additional security: Block scans for common hacking targets
    const url = request.nextUrl.pathname;
    const sensitivePaths = [
        '/wp-admin',
        '/wp-login',
        '.php',
        '.env',
        '/config',
        '/admin',
    ];

    if (sensitivePaths.some(path => url.includes(path)) && !url.startsWith('/admin')) {
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
