"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogClient({ articles }) {
    const { t } = useLanguage();

    return (
        <div className="blog-page">
            <div className="fixed-bg"></div>
            <div className="bg-overlay"></div>

            <style jsx>{`
                .blog-page { min-height: 100vh; position: relative; color: #fff; }
                .fixed-bg { position: fixed; inset: 0; background: url('/hero_bg.png') no-repeat center center / cover; z-index: -2; }
                .bg-overlay { position: fixed; inset: 0; background: linear-gradient(to bottom, rgba(15,10,6,0.75) 0%, rgba(15,10,6,0.6) 50%, rgba(15,10,6,0.85) 100%); z-index: -1; backdrop-filter: blur(3px); }
                .blog-header { padding-top: 110px; margin-bottom: 4rem; text-align: center; }
                .eyebrow { display: block; font-size: 0.75rem; letter-spacing: 4px; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 1rem; }
                .blog-title { font-family: var(--ff-display); font-size: clamp(2.5rem, 5vw, 4rem); color: var(--gold); margin-bottom: 1.5rem; text-shadow: 0 4px 20px rgba(0,0,0,0.5); }
                .gold-divider { width: 100px; height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent); margin: 0 auto; }
                .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; padding-bottom: 6rem; }
                .article-card { background: rgba(28,20,15,0.7); border: 1px solid rgba(212,175,55,0.15); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; transition: all 0.3s ease; backdrop-filter: blur(10px); }
                .article-card:hover { border-color: rgba(212,175,55,0.5); transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
                .card-body { padding: 1.8rem; flex: 1; display: flex; flex-direction: column; }
                .card-meta { display: flex; gap: 0.75rem; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; }
                .category-badge { background: rgba(212,175,55,0.15); color: var(--gold); font-size: 0.65rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 0.25rem 0.75rem; border-radius: 20px; border: 1px solid rgba(212,175,55,0.3); }
                .read-time { font-size: 0.75rem; color: rgba(255,255,255,0.45); }
                .card-title { font-family: var(--ff-display); font-size: 1.3rem; color: #fff; margin-bottom: 0.75rem; line-height: 1.3; }
                .card-desc { font-size: 0.88rem; color: rgba(255,255,255,0.65); line-height: 1.6; flex: 1; margin-bottom: 1.5rem; }
                .card-date { font-size: 0.72rem; color: rgba(255,255,255,0.35); margin-bottom: 1.25rem; }
                .read-btn { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--gold); font-size: 0.78rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; transition: gap 0.2s ease; }
                .read-btn:hover { gap: 0.8rem; }
            `}</style>

            <header className="blog-header">
                <span className="eyebrow">{t("blog.eyebrow") || "Travel Insights & Guides"}</span>
                <h1 className="blog-title">{t("blog.title") || "Chittorgarh Blog"}</h1>
                <div className="gold-divider"></div>
            </header>

            <section className="section-pad" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="blog-grid">
                        {articles.map((article) => (
                            <article key={article.slug} className="article-card">
                                <div className="card-body">
                                    <div className="card-meta">
                                        <span className="category-badge">{article.category}</span>
                                        <span className="read-time">{article.readTime}</span>
                                    </div>
                                    <h2 className="card-title">{article.title}</h2>
                                    <p className="card-desc">{article.description}</p>
                                    <p className="card-date">{new Date(article.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
                                    <Link href={`/blog/${article.slug}`} className="read-btn">
                                        {t("blog.readBtn") || "Read Article"} →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
