"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import WeatherWidget from "@/components/WeatherWidget";
import VisitorStats from "@/components/VisitorStats";
import { triggerHaptic } from "@/lib/haptics";

export default function HomeClient() {
    const { t } = useLanguage();

    return (
        <>

            {/* ═══ HERO ══════════════════════════════════ */}
            <header id="home" className="hero">
                <div className="hero-widgets">
                    <WeatherWidget />
                    <VisitorStats />
                </div>
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className="hero-eyebrow reveal">
                        {t("hero.badge")}
                    </div>
                    <h1 className="reveal">
                        <span>{t("hero.line1")}</span>
                        <em>{t("hero.line2")}</em>
                    </h1>
                    <p className="hero-sub reveal">
                        {t("hero.sub")}
                    </p>
                    <div className="hero-actions reveal">
                        <Link href="/plan" className="btn-gold" onClick={() => triggerHaptic('light')}>
                            {t("hero.cta1")}
                        </Link>
                    </div>
                </div>
                <div className="hero-scroll-hint">
                    <span>{t("hero.scroll")}</span>
                    <div className="scroll-line"></div>
                </div>
            </header>

            {/* ═══ SIGNATURE HIGHLIGHTS ═══════════════════ */}
            <section className="highlights-section">
                <div className="container">
                    <header className="section-header">
                        <span className="eyebrow">{t("highlights.eyebrow")}</span>
                        <h2 className="section-title">{t("highlights.title")}</h2>
                        <div className="gold-divider"></div>
                    </header>

                    <div className="highlights-grid">
                        <HighlightCard
                            image="/vijay_stambh.jpg"
                            title={t("highlights.h1.title")}
                            desc={t("highlights.h1.desc")}
                            delay={0.1}
                        />
                        <HighlightCard
                            image="/hero_bg.png"
                            title={t("highlights.h2.title")}
                            desc={t("highlights.h2.desc")}
                            delay={0.2}
                        />
                        <HighlightCard
                            image="/rana_kumbha_palace.jpg"
                            title={t("highlights.h3.title")}
                            desc={t("highlights.h3.desc")}
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* ═══ STATS ══════════════════════════════════ */}
            <section className="stats-band">
                <div className="container">
                    <div className="stat-item reveal">
                        <div className="number">{t("stats.n1")}</div>
                        <div className="label">
                            {t("stats.l1")}
                        </div>
                    </div>
                    <div className="stat-item reveal reveal-delay-1">
                        <div className="number">{t("stats.n2")}</div>
                        <div className="label">
                            {t("stats.l2")}
                        </div>
                    </div>
                    <div className="stat-item reveal reveal-delay-2">
                        <div className="number">{t("stats.n3")}</div>
                        <div className="label">
                            {t("stats.l3")}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ QUOTE ════════════════════════════════════ */}
            <section className="quote-band">
                <div className="container">
                    <blockquote className="reveal">
                        "{t("quote.text")}"
                    </blockquote>
                    <cite className="reveal reveal-delay-1">
                        — {t("quote.cite")}
                    </cite>
                </div>
            </section>

            {/* ═══ CTA ══════════════════════════════════════ */}
            <section className="cta-section" id="contact">
                <div className="container">
                    <span
                        className="eyebrow reveal"
                        style={{ color: "var(--gold-light)" }}
                    >
                        {t("cta.eyebrow")}
                    </span>
                    <h2 className="reveal reveal-delay-1">
                        <span>{t("cta.title")}</span>{" "}
                        <em>{t("cta.title2")}</em>
                    </h2>
                    <p className="reveal reveal-delay-2">
                        {t("cta.desc")}
                    </p>
                    <Link href="/plan" className="btn-gold reveal reveal-delay-3" onClick={() => triggerHaptic('light')}>
                        {t("cta.btn")}
                    </Link>
                </div>
            </section>
        </>
    );
}

function HighlightCard({ image, title, desc, delay }) {
    const { t } = useLanguage();
    return (
        <div
            className="highlight-card reveal"
            style={{ transitionDelay: `${delay}s` }}
        >
            <div className="card-image-wrapper">
                <img src={image} alt={title} className="card-img" />
                <div className="card-overlay"></div>
            </div>
            <div className="card-content">
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="card-footer">
                    <Link href="/explore" className="explore-link">
                        <span className="explore-text">{t("highlights.explore")}</span>
                    </Link>
                </div>
            </div>
            <style jsx>{`
                .highlight-card {
                    position: relative;
                    background: var(--dark-soft);
                    border: 1px solid rgba(212, 175, 55, 0.1);
                    overflow: hidden;
                    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .highlight-card:hover {
                    transform: translateY(-10px);
                    border-color: var(--gold);
                    box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5);
                }

                .card-image-wrapper {
                    position: relative;
                    height: 250px;
                    overflow: hidden;
                }

                .card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s ease;
                }

                .highlight-card:hover .card-img {
                    transform: scale(1.1);
                }

                .card-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent, var(--dark-soft));
                }

                .card-content {
                    padding: 2rem;
                    position: relative;
                    z-index: 2;
                }

                .card-content h3 {
                    font-size: 1.75rem;
                    color: var(--gold);
                    margin-bottom: 1rem;
                }

                .card-content p {
                    font-size: 0.95rem;
                    color: rgba(255, 255, 255, 0.7);
                    line-height: 1.6;
                    margin-bottom: 2rem;
                    font-weight: 300;
                }

                .explore-link {
                    text-decoration: none;
                }

                .explore-text {
                    font-size: 0.75rem;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: var(--gold);
                    font-weight: 600;
                    transition: 0.3s;
                }

                .highlight-card:hover .explore-text {
                    letter-spacing: 3px;
                    color: #fff;
                }
            `}</style>
        </div>
    );
}
