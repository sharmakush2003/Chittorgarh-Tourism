"use client";
import Image from 'next/image';
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { triggerHaptic } from "@/lib/haptics";
import { motion } from "framer-motion";
import { Map, Zap, Headphones, Castle, Shield, Droplets, Award, ArrowUpRight } from 'lucide-react';

import FAQ from "./FAQ";
import QRScannerButton from "./QRScannerButton";

export default function HomeClient() {
    const { t } = useLanguage();
    
    return (
        <div className="home-page-container">
            {/* ═══ HERO SECTION ══════════════════════════════════ */}
            <header id="home" className="hero-redesigned">
                <div className="hero-bg-overlay"></div>
                <div className="hero-ambient-glow"></div>
                
                <div className="hero-content">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-eyebrow-badge"
                    >
                        <span className="sparkle">✦</span> {t("hero.badge")} <span className="sparkle">✦</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hero-title"
                    >
                        <span className="hero-line1">{t("hero.line1")}</span>
                        <em className="hero-line2">{t("hero.line2")}</em>
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
                        className="hero-actions-dock"
                    >
                        <Link prefetch={false} href="/plan" className="btn-gold-luxury" onClick={() => triggerHaptic('light')}>
                            {t("hero.cta1")}
                        </Link>
                        <Link prefetch={false} href="/panch-gaurav" className="btn-outline-luxury" onClick={() => triggerHaptic('medium')}>
                            {t("hero.cta_gaurav")}
                        </Link>
                        <QRScannerButton />
                    </motion.div>
                </div>
            </header>

            {/* ═══ LIVE FORT STATS BAR ════════════════════════════ */}
            <section className="stats-bar-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon-wrapper">
                                <Castle size={22} />
                            </div>
                            <div className="stat-info">
                                <div className="stat-val">{t("stats.n2") || "700+ Acres"}</div>
                                <div className="stat-lbl">{t("home.stat.acres") || "Largest Fort Citadel"}</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon-wrapper">
                                <Shield size={22} />
                            </div>
                            <div className="stat-info">
                                <div className="stat-val">{t("home.stat.polsVal") || "7 Fort Pols"}</div>
                                <div className="stat-lbl">{t("home.stat.polsLbl") || "Grand Victory Gates"}</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon-wrapper">
                                <Droplets size={22} />
                            </div>
                            <div className="stat-info">
                                <div className="stat-val">{t("home.stat.waterVal") || "84 Bodies"}</div>
                                <div className="stat-lbl">{t("home.stat.waterLbl") || "Ancient Water Springs"}</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon-wrapper">
                                <Award size={22} />
                            </div>
                            <div className="stat-info">
                                <div className="stat-val">UNESCO</div>
                                <div className="stat-lbl">{t("home.stat.unescoLbl") || "World Heritage Site"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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

                    <div className="highlights-grid">
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

            {/* ═══ DIGITAL COMPANION FEATURES ════════════ */}
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

                    <div className="features-grid">
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

            {/* ═══ QUOTE BAND ══════════════════════════════ */}
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

            {/* ═══ CTA SECTION ═════════════════════════════ */}
            <section className="cta-section" id="contact">
                <div className="container">
                    <div className="cta-card-luxury">
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
                            className="cta-title"
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
                            className="mt-6"
                        >
                            <Link prefetch={false} href="/plan" className="btn-gold-luxury" onClick={() => triggerHaptic('light')}>
                                {t("cta.btn")}
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ FAQ SECTION ═════════════════════════════ */}
            <FAQ />

            {/* ═══ LUXURY DARK OBSIDIAN & GOLD THEME CSS ══════════════ */}
            <style jsx global>{`
                .home-page-container {
                    background: linear-gradient(180deg, #0A0806 0%, #140F0A 25%, #18130D 50%, #110D08 75%, #0A0806 100%);
                    color: #FFFFFF;
                    min-height: 100vh;
                    font-family: var(--ff-body), sans-serif;
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

                section {
                    padding: 5rem 0;
                    background: transparent;
                    position: relative;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.25rem;
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 3.5rem;
                    width: 100%;
                    padding: 0 0.5rem;
                }

                .eyebrow {
                    display: inline-block;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.25em;
                    font-weight: 700;
                    color: #D4AF37;
                    margin-bottom: 0.85rem;
                    padding: 0.35rem 1rem;
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 999px;
                    max-width: 100%;
                }

                .section-title {
                    font-family: var(--ff-display), serif;
                    font-size: clamp(1.65rem, 5vw, 3.4rem);
                    font-weight: 800;
                    margin-bottom: 1rem;
                    background: linear-gradient(135deg, #FFFFFF 0%, #F3E5AB 50%, #D4AF37 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    line-height: 1.35;
                    word-break: break-word;
                    overflow-wrap: break-word;
                    padding: 0.1em 0.2em;
                }

                .gold-divider {
                    width: 80px;
                    height: 3px;
                    background: linear-gradient(90deg, transparent, #D4AF37, transparent);
                    margin: 1.2rem auto 0;
                    border-radius: 999px;
                }

                .section-desc {
                    max-width: 650px;
                    margin: 0.8rem auto 0;
                    color: rgba(255, 255, 255, 0.85);
                    font-size: 1.05rem;
                    line-height: 1.7;
                    font-weight: 400;
                }

                /* HERO SECTION */
                .hero-redesigned {
                    position: relative;
                    min-height: 90vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: url('/hero_new.jpg') no-repeat center center / cover;
                    padding: 7.5rem 1.25rem 4rem;
                    overflow: hidden;
                }

                .hero-bg-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, rgba(10, 8, 6, 0.6) 0%, rgba(10, 8, 6, 0.88) 80%, #0A0806 100%);
                    z-index: 1;
                }

                .hero-ambient-glow {
                    position: absolute;
                    top: 25%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(212, 175, 55, 0.22) 0%, transparent 70%);
                    pointer-events: none;
                    z-index: 2;
                }

                .hero-content {
                    position: relative;
                    z-index: 3;
                    text-align: center;
                    max-width: 900px;
                    margin: 0 auto;
                }

                .hero-eyebrow-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #F3E5AB;
                    padding: 0.4rem 1.2rem;
                    background: rgba(10, 8, 6, 0.75);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    border-radius: 999px;
                    margin-bottom: 1.5rem;
                    font-weight: 600;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
                }

                .sparkle { color: #D4AF37; }

                .hero-title {
                    font-family: var(--ff-display), serif;
                    margin-bottom: 1.5rem;
                }

                .hero-line1 {
                    display: block;
                    font-size: clamp(2.2rem, 7.5vw, 5.2rem);
                    font-weight: 900;
                    line-height: 1.1;
                    letter-spacing: -0.02em;
                    background: linear-gradient(135deg, #FFFFFF 0%, #FFF5D0 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hero-line2 {
                    display: block;
                    font-size: clamp(1.8rem, 5.5vw, 4.2rem);
                    font-style: italic;
                    font-weight: 400;
                    color: #D4AF37;
                    line-height: 1.1;
                    margin-top: 0.2rem;
                    text-shadow: 0 4px 20px rgba(0,0,0,0.6);
                }

                .hero-sub {
                    font-size: clamp(0.95rem, 2vw, 1.2rem);
                    color: rgba(255, 255, 255, 0.9);
                    max-width: 680px;
                    margin: 0 auto 2.2rem;
                    line-height: 1.7;
                    font-weight: 300;
                }

                .hero-actions-dock {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                }

                /* LUXURY BUTTONS */
                .btn-gold-luxury {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.95rem 2.2rem;
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
                    color: #0A0806;
                    font-weight: 800;
                    font-size: 0.82rem;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    border-radius: 999px;
                    text-decoration: none;
                    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                    box-shadow: 0 10px 30px -5px rgba(212, 175, 55, 0.4);
                }

                .btn-gold-luxury:hover {
                    transform: translateY(-3px) scale(1.03);
                    box-shadow: 0 18px 40px -5px rgba(212, 175, 55, 0.6);
                    color: #000;
                }

                .btn-outline-luxury {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.95rem 2.2rem;
                    background: rgba(10, 8, 6, 0.7);
                    backdrop-filter: blur(12px);
                    color: #F3E5AB;
                    border: 1px solid rgba(212, 175, 55, 0.45);
                    border-radius: 999px;
                    font-weight: 700;
                    font-size: 0.82rem;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    text-decoration: none;
                    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .btn-outline-luxury:hover {
                    background: rgba(212, 175, 55, 0.18);
                    border-color: #D4AF37;
                    transform: translateY(-3px);
                    color: #FFF;
                    box-shadow: 0 10px 30px -5px rgba(212, 175, 55, 0.3);
                }

                /* STATS BAR */
                .stats-bar-section {
                    padding: 2.5rem 0;
                    background: rgba(15, 12, 8, 0.95);
                    border-top: 1px solid rgba(212, 175, 55, 0.25);
                    border-bottom: 1px solid rgba(212, 175, 55, 0.25);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 1.25rem;
                }

                .stat-card {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.25rem 1.5rem;
                    background: rgba(26, 20, 14, 0.92);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 16px;
                    transition: all 0.3s ease;
                }

                .stat-card:hover {
                    border-color: rgba(212, 175, 55, 0.7);
                    transform: translateY(-4px);
                    box-shadow: 0 12px 30px -10px rgba(212, 175, 55, 0.3);
                }

                .stat-icon-wrapper {
                    width: 46px;
                    height: 46px;
                    border-radius: 12px;
                    background: rgba(212, 175, 55, 0.15);
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #D4AF37;
                    flex-shrink: 0;
                }

                .stat-val {
                    font-family: var(--ff-display), serif;
                    font-size: 1.3rem;
                    font-weight: 800;
                    color: #FFF;
                    line-height: 1.2;
                }

                .stat-lbl {
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.7);
                    margin-top: 0.15rem;
                }

                /* HIGHLIGHTS GRID */
                .highlights-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .highlight-card {
                    background: rgba(24, 18, 12, 0.95) !important;
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 20px;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
                }

                .highlight-card:hover {
                    transform: translateY(-10px);
                    border-color: rgba(212, 175, 55, 0.75);
                    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 175, 55, 0.2);
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
                    transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .highlight-card:hover .card-img {
                    transform: scale(1.08);
                }

                .card-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent 20%, rgba(24, 18, 12, 0.98) 100%);
                }

                .card-content {
                    padding: 2rem;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .card-content h3 {
                    font-family: var(--ff-display), serif;
                    font-size: 1.45rem;
                    font-weight: 800;
                    color: #FFF;
                    margin-bottom: 0.85rem;
                }

                .card-content p {
                    color: rgba(255, 255, 255, 0.82);
                    font-size: 0.95rem;
                    line-height: 1.65;
                }

                .explore-btn {
                    margin-top: 1.5rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    color: #D4AF37;
                    font-size: 0.8rem;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .explore-btn:hover {
                    color: #FFF;
                }

                /* FEATURES GRID */
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .feature-card {
                    background: rgba(24, 18, 12, 0.95) !important;
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 20px;
                    padding: 3.5rem 2rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
                }

                .feature-card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(212, 175, 55, 0.7);
                    box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.8);
                }

                .feature-icon {
                    color: #D4AF37;
                    margin-bottom: 2rem;
                    width: 68px;
                    height: 68px;
                    border-radius: 20px;
                    background: rgba(212, 175, 55, 0.15);
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 24px rgba(212, 175, 55, 0.2);
                }

                .feature-card h3 {
                    font-family: var(--ff-display), serif;
                    font-size: 1.4rem !important;
                    font-weight: 800;
                    color: #FFF;
                    margin-bottom: 1rem;
                }

                .feature-card p {
                    color: rgba(255, 255, 255, 0.82);
                    font-size: 0.95rem;
                    line-height: 1.65;
                }

                /* QUOTE BAND */
                .quote-band {
                    background: linear-gradient(180deg, rgba(15, 12, 8, 0.9) 0%, rgba(28, 21, 14, 0.95) 50%, rgba(15, 12, 8, 0.9) 100%);
                    text-align: center;
                    padding: 6rem 0;
                    border-top: 1px solid rgba(212, 175, 55, 0.25);
                    border-bottom: 1px solid rgba(212, 175, 55, 0.25);
                }

                .quote-text {
                    font-family: var(--ff-display), serif;
                    font-size: clamp(1.5rem, 4vw, 2.75rem);
                    font-style: italic;
                    color: #F3E5AB;
                    max-width: 900px;
                    margin: 0 auto 2rem;
                    font-weight: 600;
                    line-height: 1.4;
                }

                cite {
                    font-size: 1rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(212, 175, 55, 0.9);
                    font-weight: 600;
                    font-style: normal;
                }

                /* CTA CARD */
                .cta-card-luxury {
                    background: linear-gradient(135deg, rgba(30, 23, 15, 0.95) 0%, rgba(20, 15, 9, 0.98) 100%);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    border-radius: 28px;
                    padding: 4.5rem 2rem;
                    text-align: center;
                    box-shadow: 0 30px 70px -20px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.1);
                }

                .cta-title {
                    font-family: var(--ff-display), serif;
                    font-size: clamp(2rem, 5vw, 3.25rem);
                    font-weight: 900;
                    margin-top: 1rem;
                    background: linear-gradient(135deg, #FFF 0%, #F3E5AB 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                /* RESPONSIVE MOBILE FIXES */
                @media (max-width: 640px) {
                    section {
                        padding: 3rem 0;
                    }
                    .hero-redesigned {
                        padding-top: 7rem;
                        padding-bottom: 3.5rem;
                        min-height: 82vh;
                    }
                    .hero-actions-dock {
                        flex-direction: column;
                        width: 100%;
                    }
                    .btn-gold-luxury, .btn-outline-luxury {
                        width: 100%;
                    }
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 0.6rem;
                    }
                    .stat-card {
                        flex-direction: column;
                        text-align: center;
                        justify-content: center;
                        padding: 0.85rem 0.5rem;
                        gap: 0.35rem;
                    }
                    .stat-icon-wrapper {
                        width: 32px;
                        height: 32px;
                        margin: 0 auto;
                    }
                    .stat-val {
                        font-size: 0.95rem;
                        line-height: 1.25;
                    }
                    .stat-lbl {
                        font-size: 0.68rem;
                        line-height: 1.3;
                    }
                    .highlights-grid, .features-grid {
                        grid-template-columns: 1fr;
                    }
                    .section-header {
                        margin-bottom: 2.2rem;
                    }
                    .section-title {
                        font-size: clamp(1.4rem, 6.2vw, 1.85rem) !important;
                        line-height: 1.35 !important;
                    }
                    .eyebrow {
                        font-size: 0.7rem;
                        padding: 0.3rem 0.8rem;
                    }
                }

                /* ════ HINDI SPECIFIC REFINEMENTS ════ */
                :global([data-lang="hi"]) .hero-eyebrow-badge {
                    letter-spacing: normal !important;
                    font-size: 0.82rem;
                    font-weight: 600;
                }

                :global([data-lang="hi"]) .hero-line1 {
                    font-family: var(--font-martel), 'Martel', serif !important;
                    line-height: 1.38 !important;
                    letter-spacing: normal !important;
                    padding-top: 0.12em;
                    padding-bottom: 0.08em;
                }

                :global([data-lang="hi"]) .hero-line2 {
                    font-family: var(--font-martel), 'Martel', serif !important;
                    font-style: normal !important;
                    line-height: 1.38 !important;
                    letter-spacing: normal !important;
                    padding-bottom: 0.08em;
                }

                :global([data-lang="hi"]) .hero-sub {
                    font-family: var(--font-martel), 'Martel', sans-serif !important;
                    font-weight: 500 !important;
                    line-height: 1.85 !important;
                    font-size: clamp(0.95rem, 2vw, 1.15rem);
                }

                :global([data-lang="hi"]) .btn-gold-luxury,
                :global([data-lang="hi"]) .btn-outline-luxury {
                    letter-spacing: normal !important;
                    text-transform: none !important;
                    font-family: var(--font-martel), 'Martel', sans-serif !important;
                    font-weight: 700 !important;
                    font-size: 0.92rem !important;
                }

                :global([data-lang="hi"]) .eyebrow,
                :global([data-lang="hi"]) .section-title {
                    letter-spacing: normal !important;
                    font-family: var(--font-martel), 'Martel', serif !important;
                    line-height: 1.4 !important;
                }
            `}</style>
        </div>
    );
}

function HighlightCard({ image, title, desc, delay, href = "/explore" }) {
    const { t } = useLanguage();
    return (
        <div className="highlight-card">
            <div className="card-image-wrapper">
                <Image src={image} alt={title} className="card-img" width={1200} height={800} style={{ objectFit: "cover" }}/>
                <div className="card-overlay"></div>
            </div>
            <div className="card-content">
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link prefetch={false} href={href} className="explore-btn" onClick={() => triggerHaptic('light')}>
                    {t("highlights.explore")} <ArrowUpRight size={16} />
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
            className="feature-card"
        >
            <div className="feature-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </motion.div>
    );
}


