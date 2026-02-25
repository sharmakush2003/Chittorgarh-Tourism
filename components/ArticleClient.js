"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ArticleClient({ article }) {
    const { t } = useLanguage();

    return (
        <div className="article-page">
            <div className="fixed-bg"></div>
            <div className="bg-overlay"></div>

            <style jsx>{`
                .article-page { min-height: 100vh; position: relative; color: #fff; }
                .fixed-bg { position: fixed; inset: 0; background: url('/hero_bg.png') no-repeat center center / cover; z-index: -2; }
                .bg-overlay { position: fixed; inset: 0; background: linear-gradient(to bottom, rgba(15,10,6,0.8) 0%, rgba(15,10,6,0.65) 50%, rgba(15,10,6,0.9) 100%); z-index: -1; backdrop-filter: blur(3px); }
                .article-wrapper { max-width: 780px; margin: 0 auto; padding: 6rem 1.5rem 5rem; }
                .back-link { display: inline-flex; align-items: center; gap: 0.4rem; color: rgba(255,255,255,0.5); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2rem; transition: color 0.2s; }
                .back-link:hover { color: var(--gold); }
                .article-meta { display: flex; gap: 0.75rem; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; }
                .category-badge { background: rgba(212,175,55,0.15); color: var(--gold); font-size: 0.65rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 0.25rem 0.75rem; border-radius: 20px; border: 1px solid rgba(212,175,55,0.3); }
                .read-time { font-size: 0.75rem; color: rgba(255,255,255,0.45); }
                .article-date { font-size: 0.75rem; color: rgba(255,255,255,0.35); }
                .article-title { font-family: var(--ff-display); font-size: clamp(1.8rem, 4vw, 2.8rem); color: var(--gold); line-height: 1.2; margin-bottom: 1.5rem; }
                .gold-divider { width: 80px; height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent); margin-bottom: 3rem; }
                .article-section { margin-bottom: 2.5rem; }
                .section-heading { font-family: var(--ff-display); font-size: 1.4rem; color: #fff; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(212,175,55,0.15); }
                .section-body { font-size: 1rem; color: rgba(255,255,255,0.75); line-height: 1.8; }
                .article-cta { background: rgba(28,20,15,0.8); border: 1px solid rgba(212,175,55,0.25); border-radius: 12px; padding: 2rem; text-align: center; margin-top: 3rem; }
                .cta-text { font-size: 1.1rem; color: rgba(255,255,255,0.8); margin-bottom: 1.25rem; font-family: var(--ff-display); }
                .cta-btn { display: inline-flex; align-items: center; gap: 0.5rem; background: var(--gold); color: #0f0a06; padding: 0.75rem 2rem; border-radius: 6px; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; transition: opacity 0.2s; }
                .cta-btn:hover { opacity: 0.85; }
            `}</style>

            <div className="article-wrapper">
                <Link href="/blog" className="back-link">← {t("blog.allArticles") || "All Articles"}</Link>

                <div className="article-meta">
                    <span className="category-badge">{article.category}</span>
                    <span className="read-time">{article.readTime}</span>
                    <span className="article-date">{new Date(article.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>

                <h1 className="article-title">{article.title}</h1>
                <div className="gold-divider"></div>

                {article.sections.map((section, i) => (
                    <div key={i} className="article-section">
                        <h2 className="section-heading">{section.heading}</h2>
                        <p className="section-body">{section.body}</p>
                    </div>
                ))}

                {article.cta && (
                    <div className="article-cta">
                        <p className="cta-text">{article.cta.text}</p>
                        <Link href={article.cta.link} className="cta-btn">
                            {article.cta.linkText}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
