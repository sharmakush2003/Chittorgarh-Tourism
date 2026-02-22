export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/'],
        },
        sitemap: 'https://chittorgarh-tourism-five.vercel.app/sitemap.xml',
    }
}
