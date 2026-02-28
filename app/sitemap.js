import { readdir, readFile } from "fs/promises";
import path from "path";

export default async function sitemap() {
    const baseUrl = "https://chittorgarh-tourism-five.vercel.app";

    // Get all blog posts
    const blogDir = path.join(process.cwd(), "public", "blog-data");
    let blogPages = [];
    try {
        const files = await readdir(blogDir);
        blogPages = await Promise.all(
            files
                .filter((f) => f.endsWith(".json"))
                .map(async (f) => {
                    const content = await readFile(path.join(blogDir, f), "utf8");
                    const { slug, date } = JSON.parse(content);
                    return {
                        url: `${baseUrl}/blog/${slug}`,
                        lastModified: new Date(date || new Date()),
                        changeFrequency: 'monthly',
                        priority: 0.7,
                    };
                })
        );
    } catch (error) {
        console.error("Error generating blog sitemap:", error);
    }

    const staticPages = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/explore`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/chronicles`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/plan`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/stays`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];

    return [...staticPages, ...blogPages];
}
