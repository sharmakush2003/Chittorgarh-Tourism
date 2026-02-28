import { readdir, readFile } from "fs/promises";
import path from "path";
import BlogClient from "@/components/BlogClient";

export const metadata = {
    title: "Chittorgarh Travel Blog — Guides, Tips & History",
    description: "Read expert travel guides, historical stories, and insider tips about Chittorgarh. Plan your visit to Rajasthan's greatest fort with our curated articles.",
    alternates: {
        canonical: 'https://chittorgarh-tourism-five.vercel.app/blog',
    },
    keywords: ["Chittorgarh travel blog", "Chittorgarh guide", "Rajasthan travel articles", "Chittorgarh Fort tips"],
};

async function getArticles() {
    const dir = path.join(process.cwd(), "public", "blog-data");
    const files = await readdir(dir);
    const articles = await Promise.all(
        files
            .filter((f) => f.endsWith(".json"))
            .map(async (f) => {
                const content = await readFile(path.join(dir, f), "utf8");
                return JSON.parse(content);
            })
    );
    return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default async function BlogPage() {
    const articles = await getArticles();
    return <BlogClient articles={articles} />;
}
