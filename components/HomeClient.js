"use client";
import Image from 'next/image';
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { triggerHaptic } from "@/lib/haptics";
import { motion } from "framer-motion";
import { Map, Zap, Headphones, Castle, Shield, Droplets, Award, ArrowUpRight } from 'lucide-react';

import FAQ from "./FAQ";
import QRScannerButton from "./QRScannerButton";
import HeroCarousel from "./HeroCarousel";

export default function HomeClient() {
    const { t } = useLanguage();
    
    return (
        <div className="home-page-container">
            {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â NEW IMAGE CAROUSEL Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}


            {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â FIXED BACKGROUND Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}


            {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â HERO SECTION Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
            <HeroCarousel />
            <header id="home" className="editorial-hero" style={{ padding: "3rem 1.5rem 2rem", justifyContent: "center" }}>
                <div className="editorial-content" style={{ textAlign: "center", width: "100%" }}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="editorial-eyebrow"
                        style={{ justifyContent: "center" }}
                    >
                        <span className="sparkle">✦</span>
                        <span>{t("hero.badge")}</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="editorial-title"
                    >
                        <span className="ed-line1">{t("hero.line1")}</span>
                        <span className="ed-line2">{t("hero.line2")}</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="editorial-sub"
                        style={{ margin: "0 auto 2.5rem" }}
                    >
                        {t("hero.sub")}
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="editorial-actions"
                        style={{ justifyContent: "center" }}
                    >
                        <Link prefetch={false} href="/explore" className="btn-gold-luxury" onClick={() => triggerHaptic('light')}>
                            {t("hero.cta1")} <ArrowUpRight size={16} style={{marginLeft: '8px'}} />
                        </Link>
                        <Link prefetch={false} href="/panch-gaurav" className="btn-outline-luxury" onClick={() => triggerHaptic('medium')}>
                            {t("hero.cta_gaurav")}
                        </Link>
                    </motion.div>
                </div>
            </header>

            {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â LIVE FORT STATS BAR Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
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

            {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â SIGNATURE HIGHLIGHTS Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
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

            {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â DIGITAL COMPANION FEATURES Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
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

            {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â QUOTE BAND Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
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
                        {t("quote.cite")}
                    </motion.cite>
                </div>
            </section>

            {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â CTA SECTION Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
            <section className="cta-section" id="contact">
                <div className="container">
                    <div className="cta-card-luxury">
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
                            <Link prefetch={false} href="/explore" className="btn-gold-luxury" onClick={() => triggerHaptic('light')}>
                                {t("cta.btn")}
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â FAQ SECTION Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
            <FAQ />

            {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â LUXURY DARK OBSIDIAN & GOLD THEME CSS Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
            <style jsx global>{`
                .home-page-container {
                    position: relative;
                    min-height: 100vh;
                    background: transparent;
                    color: var(--text-main);
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
                    padding: 2rem 1rem;
                    
                    border-radius: 24px;
                    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.6));
                }

                .eyebrow {
                    display: inline-block;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.25em;
                    font-weight: 700;
                    color: #8A682F;
                    margin-bottom: 0.85rem;
                    padding: 0.35rem 1rem;
                    background: var(--sandstone);
                    border: 1px solid var(--border-mid);
                    border-radius: 999px;
                    max-width: 100%;
                }

                .section-title {
                    font-family: var(--ff-display), serif;
                    font-size: clamp(1.65rem, 5vw, 3.4rem);
                    font-weight: 800;
                    margin-bottom: 1rem;
                    background: none; color: var(--text-main);
                    /* -webkit-background-clip: text; */
                    
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
                    color: var(--text-muted);
                    font-size: 1.05rem;
                    line-height: 1.7;
                    font-weight: 400;
                }

                /* EDITORIAL HERO SECTION (BELOW BANNER) */
                .editorial-hero {
                    position: relative;
                    min-height: auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #181512 0%, #2A241C 50%, #0A0806 100%);
                    box-shadow: inset 0 0 100px rgba(0,0,0,0.8);
                    border-bottom: 2px solid rgba(212, 175, 55, 0.2);
                    padding: 4rem 1.5rem 3.5rem;
                    overflow: hidden;
                    width: 100%;
                }
                
                .editorial-hero::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 0%, transparent 60%);
                    pointer-events: none;
                }

                .editorial-content {
                    position: relative;
                    z-index: 3;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    max-width: 800px;
                }

                .editorial-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.8rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: var(--gold-light);
                    margin-bottom: 1.25rem;
                    font-weight: 700;
                    text-shadow: 0 2px 8px rgba(0,0,0,0.8);
                }

                .sparkle { color: var(--gold-light); }

                .editorial-title {
                    font-family: var(--ff-display), serif;
                    margin-bottom: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    align-items: center;
                }

                .ed-line1 {
                    display: block;
                    font-size: clamp(2.5rem, 8vw, 4.5rem);
                    font-weight: 400;
                    line-height: 1.1;
                    letter-spacing: -0.01em;
                    color: #FFFFFF;
                    text-shadow: 0 4px 16px rgba(0,0,0,0.8);
                }

                .ed-line2 {
                    display: block;
                    font-size: clamp(2.5rem, 8vw, 4.5rem);
                    font-style: normal;
                    font-weight: 700;
                    color: var(--gold-light);
                    line-height: 1.1;
                    margin-top: 0.2rem;
                    text-shadow: 0 4px 16px rgba(0,0,0,0.8);
                }

                .editorial-sub {
                    font-size: clamp(1.05rem, 2vw, 1.25rem);
                    color: rgba(255, 255, 255, 0.95);
                    text-shadow: 0 2px 8px rgba(0,0,0,0.8);
                    max-width: 650px;
                    margin-bottom: 2.5rem;
                    line-height: 1.6;
                    font-weight: 500;
                    text-align: center;
                }

                .editorial-actions {
                    display: flex;
                    gap: 1rem;
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
                    color: var(--text-main);
                    box-shadow: 0 10px 30px -5px rgba(212, 175, 55, 0.3);
                }

                /* STATS BAR */
                .stats-bar-section {
                    padding: 2.5rem 0;
                    background: var(--sandstone);
                    border-top: 1px solid var(--border-light);
                    border-bottom: 1px solid var(--border-light);
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
                    background: var(--ivory);
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-md);
                    transition: all 0.3s ease;
                    box-shadow: var(--shadow-sm);
                }

                .stat-card:hover {
                    border-color: var(--border-mid);
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-md);
                }

                .stat-icon-wrapper {
                    width: 46px;
                    height: 46px;
                    border-radius: 12px;
                    background: rgba(176, 138, 74, 0.1);
                    border: 1px solid var(--border-light);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--gold);
                    flex-shrink: 0;
                }

                .stat-val {
                    font-family: var(--ff-display), serif;
                    font-size: 1.3rem;
                    font-weight: 800;
                    color: var(--charcoal);
                    line-height: 1.2;
                }

                .stat-lbl {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    font-weight: 600;
                    margin-top: 0.15rem;
                }

                /* HIGHLIGHTS GRID */
                .highlights-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .highlight-card {
                    background: var(--ivory) !important;
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-md);
                    overflow: hidden;
                    transition: var(--transition);
                    display: flex;
                    flex-direction: column;
                    box-shadow: var(--shadow-sm);
                }

                .highlight-card:hover {
                    transform: translateY(-5px);
                    border-color: var(--border-mid);
                    box-shadow: var(--shadow-md);
                }

                .card-image-wrapper {
                    position: relative;
                    aspect-ratio: 4/3;
                    width: 100%;
                    overflow: hidden;
                }

                .card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .highlight-card:hover .card-img {
                    transform: scale(1.05);
                }

                .card-overlay {
                    display: none;
                }

                .card-content {
                    padding: 1.5rem;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                }

                .card-content h3 {
                    font-family: var(--ff-display), serif;
                    font-size: 1.35rem;
                    font-weight: 700;
                    color: var(--text-main);
                    margin-bottom: 0.5rem;
                }

                .card-content p {
                    color: var(--text-muted);
                    font-size: 0.95rem;
                    line-height: 1.5;
                }

                .explore-btn {
                    margin-top: 1.5rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    color: #8A682F;
                    font-size: 0.8rem;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .explore-btn:hover {
                    color: var(--text-main);
                }

                /* FEATURES GRID */
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.25rem;
                }

                .feature-card {
                    background: var(--sandstone) !important;
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-md);
                    padding: 2rem 1.5rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    transition: var(--transition);
                    box-shadow: var(--shadow-sm);
                }

                .feature-card:hover {
                    transform: translateY(-5px);
                    border-color: var(--border-mid);
                    box-shadow: var(--shadow-md);
                }

                .feature-icon {
                    color: var(--gold);
                    margin-bottom: 1.25rem;
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    background: rgba(176, 138, 74, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .feature-card h3 {
                    font-family: var(--ff-display), serif;
                    font-size: 1.25rem !important;
                    font-weight: 700;
                    color: var(--text-main);
                    margin-bottom: 0.75rem;
                }

                .feature-card p {
                    color: var(--text-muted);
                    font-size: 0.95rem;
                    line-height: 1.6;
                }

                /* QUOTE BAND */
                .quote-band {
                    background: var(--charcoal);
                    text-align: center;
                    padding: 4rem 0;
                }

                .quote-text {
                    font-family: var(--ff-display), serif;
                    font-size: clamp(1.15rem, 2.8vw, 1.85rem);
                    font-style: italic;
                    color: var(--ivory);
                    max-width: 850px;
                    margin: 0 auto 1rem;
                    font-weight: 400;
                    line-height: 1.4;
                }

                cite {
                    font-size: 0.85rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: var(--gold-light);
                    font-weight: 600;
                    font-style: normal;
                }

                /* CTA CARD */
                .cta-card-luxury {
                    background: var(--charcoal);
                    border-radius: var(--radius-lg);
                    padding: 3rem 2rem;
                    text-align: center;
                    box-shadow: var(--shadow-md);
                }

                .cta-title {
                    font-family: var(--ff-display), serif;
                    font-size: clamp(1.5rem, 3.5vw, 2.35rem);
                    font-weight: 700;
                    margin-top: 0.5rem;
                    margin-bottom: 0.5rem;
                    color: var(--ivory);
                }

                /* RESPONSIVE MOBILE FIXES */
                @media (max-width: 640px) {
                    section {
                        padding: 2.5rem 0;
                    }
                    .editorial-hero {
                        padding: 7rem 1.5rem 3rem;
                    }
                    .editorial-eyebrow {
                        flex-wrap: wrap;
                        justify-content: center;
                        text-align: center;
                        font-size: 0.7rem;
                        letter-spacing: 0.1em;
                        line-height: 1.4;
                    }
                    .editorial-actions {
                        flex-direction: column;
                        width: 100%;
                        align-items: stretch;
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
                    .features-grid {
                        grid-template-columns: 1fr;
                        gap: 0.75rem;
                    }
                    .feature-card {
                        padding: 1.25rem 1rem !important;
                    }
                    .feature-icon {
                        width: 40px;
                        height: 40px;
                        margin-bottom: 0.6rem;
                    }
                    .feature-card h3 {
                        font-size: 1.05rem !important;
                    }
                    .quote-band {
                        padding: 2rem 0;
                    }
                    .quote-text {
                        font-size: 1.1rem;
                        margin-bottom: 0.75rem;
                    }
                    .highlights-grid {
                        grid-template-columns: 1fr;
                    }
                    .section-header {
                        margin-bottom: 1.5rem;
                    }
                    .section-title {
                        font-size: clamp(1.3rem, 5.5vw, 1.7rem) !important;
                        line-height: 1.3 !important;
                    }
                    .eyebrow {
                        font-size: 0.7rem;
                        padding: 0.3rem 0.8rem;
                    }
                    .cta-section {
                        padding: 1.25rem 0 !important;
                    }
                    .cta-card-luxury {
                        padding: 1.75rem 1rem !important;
                        border-radius: 16px !important;
                    }
                    .cta-title {
                        font-size: clamp(1.25rem, 5vw, 1.65rem) !important;
                        margin-top: 0.4rem !important;
                        margin-bottom: 0.4rem !important;
                        line-height: 1.25 !important;
                    }
                    .cta-card-luxury .section-desc {
                        font-size: 0.82rem !important;
                        line-height: 1.4 !important;
                        margin-bottom: 0.6rem !important;
                    }
                    .cta-card-luxury .mt-6 {
                        margin-top: 0.85rem !important;
                    }
                }

                /* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â HINDI SPECIFIC REFINEMENTS Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */
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






