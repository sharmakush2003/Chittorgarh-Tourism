"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import WeatherWidget from "@/components/WeatherWidget";
import { triggerHaptic } from "@/lib/haptics";
import { motion } from "framer-motion";
import { Map, Zap, Headphones } from 'lucide-react';

import RoyalLineage from "./RoyalLineage";
import FAQ from "./FAQ";

export default function HomeClient() {
    const { t } = useLanguage();

    return (
        <div className="home-page-container">
            {/* ═══ HERO ══════════════════════════════════ */}
            <header id="home" className="hero">
                <div className="hero-widgets">
                    <WeatherWidget />
                </div>
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-eyebrow"
                    >
                        {t("hero.badge")}
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span>{t("hero.line1")}</span>
                        <em>{t("hero.line2")}</em>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="hero-sub"
                    >
                        {t("hero.sub")}
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="hero-actions"
                    >
                        <Link href="/plan" className="btn-gold" onClick={() => triggerHaptic('light')}>
                            {t("hero.cta1")}
                        </Link>
                    </motion.div>
                </div>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="hero-scroll-hint"
                >
                    <span>{t("hero.scroll")}</span>
                    <div className="scroll-line"></div>
                </motion.div>
            </header>

            {/* ═══ SIGNATURE HIGHLIGHTS ═══════════════════ */}
            <section className="highlights-section">
                <div className="container">
                    <header className="section-header">
                        <motion.span 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="eyebrow"
                        >
                            {t("highlights.eyebrow")}
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="section-title"
                        >
                            {t("highlights.title")}
                        </motion.h2>
                        <div className="gold-divider"></div>
                    </header>

                    <div className="grid">
                        <HighlightCard
                            image="/vijay_stambh.jpg"
                            title={t("highlights.h1.title")}
                            desc={t("highlights.h1.desc")}
                            href="/vijay-stambh"
                            delay={0.1}
                        />
                        <HighlightCard
                            image="/Each page Pics/Fort pics/Padmini Palace.jpg"
                            title={t("highlights.h2.title")}
                            desc={t("highlights.h2.desc")}
                            href="/padmini-palace"
                            delay={0.2}
                        />
                        <HighlightCard
                            image="/Each page Pics/Fort pics/Rana Kumbha Palace.jpg"
                            title={t("highlights.h3.title")}
                            desc={t("highlights.h3.desc")}
                            href="/kumbha-palace"
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* ═══ DIGITAL COMPANION (FEATURE RICH MODERN TOURISM) ════ */}
            <section className="smart-features-section">
                <div className="container">
                    <header className="section-header">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="eyebrow"
                        >
                            {t("feat.eyebrow")}
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="section-title"
                        >
                            {t("feat.title")}
                        </motion.h2>
                        <p className="section-desc">{t("feat.desc")}</p>
                    </header>

                    <div className="grid">
                        <FeatureCard 
                            icon={<Map size={32} />}
                            title={t("feat.c1.title")}
                            desc={t("feat.c1.desc")}
                            delay={0.1}
                        />
                        <FeatureCard 
                            icon={<Zap size={32} />}
                            title={t("feat.c2.title")}
                            desc={t("feat.c2.desc")}
                            delay={0.2}
                        />
                        <FeatureCard 
                            icon={<Headphones size={32} />}
                            title={t("feat.c3.title")}
                            desc={t("feat.c3.desc")}
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* ═══ STATS ══════════════════════════════════ */}
            <section className="stats-band">
                <div className="container">
                    {[1, 2, 3].map((i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="stat-item"
                        >
                            <div className="number">{t(`stats.n${i}`)}</div>
                            <div className="label">{t(`stats.l${i}`)}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══ QUOTE ════════════════════════════════════ */}
            <section className="quote-band">
                <div className="container">
                    <motion.blockquote 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="quote-text"
                    >
                        "{t("quote.text")}"
                    </motion.blockquote>
                    <motion.cite 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        — {t("quote.cite")}
                    </motion.cite>
                </div>
            </section>

            {/* ═══ CTA ══════════════════════════════════════ */}
            <section className="cta-section" id="contact">
                <div className="container">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="eyebrow"
                    >
                        {t("cta.eyebrow")}
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {t("cta.title")} {t("cta.title2")}
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="section-desc"
                    >
                        {t("cta.desc")}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link href="/plan" className="btn-gold" onClick={() => triggerHaptic('light')}>
                            {t("cta.btn")}
                        </Link>
                    </motion.div>
                </div>
            </section>

            <FAQ />

            <style jsx global>{`
                .home-page-container {
                    background: #0a0804;
                    color: #fff;
                    min-height: 100vh;
                }

                /* GLOBAL HINDI TYPOGRAPHY FIXES */
                :global([lang="hi"]) h1, 
                :global([lang="hi"]) h2, 
                :global([lang="hi"]) h3, 
                :global([lang="hi"]) .section-title,
                :global([lang="hi"]) .eyebrow {
                    letter-spacing: 0 !important;
                    line-height: 1.35 !important;
                    word-spacing: 0.1rem;
                }

                h1, h2, h3, .featured-title {
                    font-family: var(--ff-display);
                    font-weight: 800;
                    background: linear-gradient(135deg, #fff 0%, var(--gold) 50%, #d4af37 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
                }

                section {
                    padding: var(--section-pad) 0;
                    background: #0a0804;
                    position: relative;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 4rem;
                }

                .eyebrow {
                    display: block;
                    font-size: 0.875rem;
                    text-transform: uppercase;
                    letter-spacing: 0.3em;
                    font-weight: 700;
                    color: var(--gold);
                    margin-bottom: 1rem;
                }

                .section-title {
                    font-size: var(--fs-section-title);
                    margin-bottom: 1.5rem;
                    font-weight: 800;
                }

                .section-desc {
                    max-width: 600px;
                    margin: 0 auto;
                    color: rgba(255, 255, 255, 0.85);
                    font-size: 1.15rem;
                    line-height: 1.8;
                    font-weight: 400;
                }

                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                /* Hero Restored */
                .hero {
                    height: 100vh;
                    position: relative;
                    background: url('/hero_bg.png') no-repeat center center / cover;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    overflow: hidden;
                }

                .hero-widgets {
                    position: absolute;
                    top: 10rem;
                    right: 4rem;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                @media (max-width: 1024px) {
                    .hero-widgets {
                        display: none;
                    }
                }
                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%);
                    z-index: 1;
                }
                .hero-content {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    max-width: 1000px;
                    padding: 0 1rem;
                }
                .hero-sub {
                    font-size: 1.35rem;
                    color: rgba(255, 255, 255, 0.9);
                    margin: 2.5rem auto;
                    max-width: 700px;
                    font-weight: 400;
                    line-height: 1.6;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                }
                .hero h1 {
                    font-size: clamp(3.5rem, 12vw, 8rem);
                    line-height: 1;
                    font-weight: 900;
                    letter-spacing: -0.02em;
                }
                .hero h1 span { display: block; }
                .hero h1 em { display: block; font-style: normal; opacity: 1; }

                /* Premium Card Aesthetics */
                .highlight-card, .feature-card {
                    background: #15110d !important;
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    transition: all 0.4s var(--liquid-easing);
                    position: relative;
                    overflow: hidden;
                    border-radius: 8px;
                }

                .highlight-card:hover, .feature-card:hover {
                    transform: translateY(-12px);
                    border-color: var(--gold);
                    box-shadow: 0 40px 80px -15px rgba(0, 0, 0, 0.6);
                    background: #1a1510 !important;
                }

                .feature-card {
                    padding: 4rem 1.5rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    height: 100%;
                }

                .feature-icon {
                    color: var(--gold);
                    margin-bottom: 2.5rem;
                    display: inline-flex;
                    filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.3));
                }

                .feature-card h3 {
                    font-size: 1.5rem !important;
                    margin-bottom: 1.25rem;
                    line-height: 1.4;
                    font-weight: 800;
                }

                /* Ensure Hindi text doesn't break letter-spacing */
                :global([lang="hi"]) .feature-card h3,
                :global([lang="hi"]) .feature-card p {
                    letter-spacing: normal !important;
                    word-spacing: normal !important;
                }

                .feature-card p {
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 1.05rem;
                    line-height: 1.6;
                    font-weight: 400;
                }

                /* Highlights */
                .card-image-wrapper {
                    position: relative;
                    height: 280px;
                    overflow: hidden;
                }
                .card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 1.2s var(--liquid-easing);
                }
                .highlight-card:hover .card-img {
                    transform: scale(1.1);
                }
                .card-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent, #0a0804);
                }
                .card-content {
                    padding: 2.5rem;
                }
                .card-content h3 {
                    font-size: 1.75rem;
                    margin-bottom: 1.25rem;
                    line-height: 1.3;
                    letter-spacing: normal !important;
                }
                .card-content p {
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.7;
                    font-size: 1.05rem;
                }

                /* Stats & Bands */
                .stats-band {
                    background: #0f0a06;
                    border-top: 1px solid rgba(212, 175, 55, 0.15);
                    border-bottom: 1px solid rgba(212, 175, 55, 0.15);
                    padding: 4rem 0;
                }
                .stat-item { text-align: center; }
                .number {
                    font-size: 3.5rem;
                    font-weight: 800;
                    color: var(--gold);
                    margin-bottom: 0.5rem;
                    font-family: var(--ff-display);
                }
                .label {
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    color: rgba(255,255,255,0.7);
                    font-weight: 600;
                }

                /* Quote */
                .quote-band {
                    background: #0a0804;
                    text-align: center;
                    padding: 8rem 0;
                }
                .quote-text {
                    font-family: var(--ff-display);
                    font-size: clamp(1.75rem, 5vw, 3rem);
                    font-style: italic;
                    color: var(--gold-light);
                    margin-bottom: 2.5rem;
                    font-weight: 700;
                    line-height: 1.4;
                }
                cite {
                    font-size: 1.1rem;
                    letter-spacing: 2px;
                    color: rgba(255, 255, 255, 0.6);
                    font-weight: 500;
                }
            `}</style>
        </div>
    );
}

function HighlightCard({ image, title, desc, delay, href = "/explore" }) {
    const { t } = useLanguage();
    return (
        <div className="highlight-card premium-glass">
            <div className="card-image-wrapper">
                <img src={image} alt={title} className="card-img" />
                <div className="card-overlay"></div>
            </div>
            <div className="card-content">
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link href={href} className="explore-btn" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '1.5rem', display: 'inline-block' }}>
                    {t("highlights.explore")}
                </Link>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc, delay }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            className="feature-card premium-glass"
        >
            <div className="feature-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </motion.div>
    );
}
