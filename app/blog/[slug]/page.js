import { readdir, readFile } from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import ArticleClient from "@/components/ArticleClient";

async function getArticle(slug) {
    const dir = path.join(process.cwd(), "public", "blog-data");
    const files = await readdir(dir);
    for (const file of files) {
        if (file.endsWith(".json")) {
            const content = await readFile(path.join(dir, file), "utf8");
            const article = JSON.parse(content);
            if (article.slug === slug) return article;
        }
    }
    return null;
}

export async function generateStaticParams() {
    const dir = path.join(process.cwd(), "public", "blog-data");
    const files = await readdir(dir);
    return Promise.all(
        files
            .filter((f) => f.endsWith(".json"))
            .map(async (f) => {
                const content = await readFile(path.join(dir, f), "utf8");
                const { slug } = JSON.parse(content);
                return { slug };
            })
    );
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const article = await getArticle(slug);
    if (!article) return {};
    return {
        title: article.title,
        description: article.description,
        keywords: article.keywords,
        openGraph: {
            title: article.title,
            description: article.description,
            type: "article",
            publishedTime: article.date,
        },
    };
}

export default async function ArticlePage({ params }) {
    const { slug } = await params;
    const article = await getArticle(slug);
    if (!article) notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        author: { "@type": "Organization", name: "Chittorgarh Tourism" },
        publisher: {
            "@type": "Organization",
            name: "Chittorgarh Tourism",
            url: "https://chittorgarh-tourism-five.vercel.app",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ArticleClient article={article} />
        </>
    );
}
