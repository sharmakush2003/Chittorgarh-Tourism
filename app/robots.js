export default function robots() {
    return {
        rules: {
            userAgent: '*',
            disallow: '/',
        },
        sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chittorgarh-tourism.in'}/sitemap.xml`,
    }
}
