"use client";
import Image from 'next/image';
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
    ShieldCheck, 
    Megaphone, 
    Users, 
    Calendar,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Award,
    Sprout,
    Dumbbell,
    Landmark,
    Gem,
    Building2
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

export default function PanchGauravClient() {
    const { t } = useLanguage();

    const pillars = [
        { 
            key: "1", 
            pillarNo: "01",
            icon: Gem,
            tag: "ODOP PRODUCT",
            image: "/panch-gaurav/odop.png" 
        },
        { 
            key: "2", 
            pillarNo: "02",
            icon: Sprout,
            tag: "AGRICULTURE",
            image: "/panch-gaurav/crop.png" 
        },
        { 
            key: "3", 
            pillarNo: "03",
            icon: Landmark,
            tag: "DESTINATION",
            image: "/hero_bg.png" 
        },
        { 
            key: "4", 
            pillarNo: "04",
            icon: Dumbbell,
            tag: "TRADITIONAL SPORT",
            image: "/panch-gaurav/sport.png" 
        },
        { 
            key: "5", 
            pillarNo: "05",
            icon: Sprout,
            tag: "FLORA & HERB",
            image: "/panch-gaurav/plant.png" 
        }
    ];

    const objectives = [
        { icon: ShieldCheck, titleKey: "pg.obj.1", desc: "Building local industrial self-sufficiency and empowering traditional Mewar stone artisans." },
        { icon: Megaphone, titleKey: "pg.obj.2", desc: "Promoting homegrown crops, sacred plants, and authentic products to national & international markets." },
        { icon: Users, titleKey: "pg.obj.3", desc: "Nurturing grassroots sports talent and fostering rural employment for farmers and youth." }
    ];

    return (
        <div className="pg-page">
            {/* ═══ FIXED BACKGROUND ══════════════════════ */}
            <div className="fixed-bg"></div>
            <div className="bg-overlay"></div>

            <style jsx global>{`
                .pg-page {
                    position: relative;
                    min-height: 100vh;
                    background: transparent;
                    color: #FFFFFF;
                    font-family: var(--ff-body), sans-serif;
                }

                .fixed-bg {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: url('/hero_bg.png') no-repeat center center / cover;
                    z-index: 0;
                    pointer-events: none;
                }

                .bg-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: linear-gradient(to bottom, 
                        rgba(15, 10, 6, 0.35) 0%, 
                        rgba(15, 10, 6, 0.25) 40%,
                        rgba(15, 10, 6, 0.65) 100%
                    );
                    z-index: 1;
                    pointer-events: none;
                }

                .main-content {
                    position: relative;
                    z-index: 10;
                    padding-top: 155px;
                    padding-bottom: 5rem;
                }

                .container {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 0 1.25rem;
                }

                /* HEADER SECTION */
                .header-section {
                    text-align: center;
                    margin-bottom: 3rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .royal-badge-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.7rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #F5E6AB;
                    padding: 0.4rem 1.1rem;
                    background: rgba(15, 10, 6, 0.85);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(212, 175, 55, 0.45);
                    border-radius: 999px;
                    margin-bottom: 1rem;
                    font-weight: 700;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                }

                .sparkle-gold {
                    color: #D4AF37;
                }

                .title-hero-royal {
                    font-size: clamp(2.2rem, 5vw, 3.8rem);
                    font-family: var(--ff-display), serif;
                    font-weight: 800;
                    margin-bottom: 0.6rem;
                    background: linear-gradient(135deg, #FFFFFF 0%, #F5E6AB 50%, #D4AF37 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    line-height: 1.15;
                    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.9));
                }

                .subtitle-hero-royal {
                    max-width: 640px;
                    margin: 0 auto 1.5rem;
                    color: #FFFFFF;
                    font-size: 0.98rem;
                    line-height: 1.6;
                    font-weight: 400;
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95);
                }

                .program-meta {
                    display: flex;
                    gap: 0.85rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .meta-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.45rem;
                    padding: 0.4rem 1rem;
                    background: rgba(15, 10, 6, 0.82);
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    border-radius: 999px;
                    color: #F5E6AB;
                    font-size: 0.78rem;
                    font-weight: 700;
                    backdrop-filter: blur(8px);
                }

                /* PILLARS GRID */
                .pillars-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.75rem;
                    margin-bottom: 4.5rem;
                }

                .pillar-glass-card {
                    background: rgba(20, 15, 10, 0.88);
                    border: 1px solid rgba(212, 175, 55, 0.38);
                    border-radius: 22px;
                    overflow: hidden;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.65);
                    display: flex;
                    flex-direction: column;
                    transition: all 0.35s ease;
                }

                .pillar-glass-card:hover {
                    transform: translateY(-6px);
                    border-color: rgba(212, 175, 55, 0.7);
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
                }

                .pillar-image-wrapper {
                    position: relative;
                    height: 200px;
                    width: 100%;
                    overflow: hidden;
                }

                .pillar-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .pillar-glass-card:hover .pillar-image {
                    transform: scale(1.05);
                }

                .pillar-img-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(20, 15, 10, 0.95) 0%, transparent 60%);
                }

                .pillar-badge-floating {
                    position: absolute;
                    top: 1rem;
                    left: 1rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.35rem 0.85rem;
                    background: rgba(15, 10, 6, 0.88);
                    border: 1px solid rgba(212, 175, 55, 0.45);
                    border-radius: 999px;
                    color: #D4AF37;
                    font-size: 0.68rem;
                    font-weight: 800;
                    letter-spacing: 0.1em;
                    backdrop-filter: blur(10px);
                }

                .pillar-body {
                    padding: 1.75rem 1.6rem 1.8rem;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }

                .pillar-no-tag {
                    color: #D4AF37;
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    margin-bottom: 0.3rem;
                }

                .pillar-title {
                    font-family: var(--ff-display), serif;
                    font-size: 1.35rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    line-height: 1.3;
                    margin-bottom: 0.75rem;
                }

                .pillar-desc {
                    font-size: 0.88rem;
                    color: rgba(255, 255, 255, 0.85);
                    line-height: 1.55;
                    font-weight: 300;
                    flex: 1;
                    margin-bottom: 1.25rem;
                }

                .pillar-footer {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding-top: 0.85rem;
                    border-top: 1px solid rgba(212, 175, 55, 0.2);
                    color: #F3E5AB;
                    font-size: 0.75rem;
                    font-weight: 700;
                }

                /* OBJECTIVES SECTION */
                .objectives-section {
                    background: rgba(20, 15, 10, 0.88);
                    border: 1px solid rgba(212, 175, 55, 0.38);
                    border-radius: 24px;
                    padding: 3rem 2.2rem;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.65);
                    margin-bottom: 3.5rem;
                }

                .sec-title-center {
                    text-align: center;
                    font-family: var(--ff-display), serif;
                    font-size: clamp(1.8rem, 4vw, 2.4rem);
                    font-weight: 800;
                    color: #FFF;
                    margin-bottom: 2.2rem;
                }

                .obj-cards-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 1.5rem;
                }

                .obj-glass-card {
                    background: rgba(26, 20, 14, 0.75);
                    border: 1px solid rgba(212, 175, 55, 0.25);
                    border-radius: 16px;
                    padding: 1.75rem 1.4rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .obj-icon-box {
                    width: 52px;
                    height: 52px;
                    background: rgba(212, 175, 55, 0.15);
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #D4AF37;
                    margin-bottom: 1rem;
                }

                .obj-card-title {
                    font-family: var(--ff-display), serif;
                    font-size: 1.2rem;
                    font-weight: 800;
                    color: #FFF;
                    margin-bottom: 0.5rem;
                }

                .obj-card-desc {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.5;
                }

                /* FOOTER NAVIGATION BAR */
                .bottom-nav-box {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                    text-align: center;
                }

                .ai-note-text {
                    font-size: 0.78rem;
                    color: rgba(255, 255, 255, 0.6);
                    font-style: italic;
                }

                .btn-home-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.75rem 1.8rem;
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
                    border-radius: 999px;
                    color: #0A0806;
                    font-size: 0.85rem;
                    font-weight: 800;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                    text-decoration: none;
                    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.35);
                    transition: all 0.3s ease;
                }

                .btn-home-cta:hover {
                    background: #FFF;
                    color: #0A0806;
                    transform: translateY(-2px);
                }

                @media (max-width: 640px) {
                    .main-content {
                        padding-top: 85px;
                    }
                    .objectives-section {
                        padding: 2rem 1.25rem;
                    }
                    .pillar-body {
                        padding: 1.4rem 1.25rem;
                    }
                }
            `}</style>

            <main className="main-content">
                <div className="container">
                    {/* ═══ PAGE HEADER ═══════════════════════════ */}
                    <header className="header-section">
                        <div className="royal-badge-pill">
                            <Sparkles size={13} className="sparkle-gold" />
                            <span>{t("pg.eyebrow")}</span>
                        </div>
                        <h1 className="title-hero-royal">
                            {t("pg.title")}
                        </h1>
                        <p className="subtitle-hero-royal">
                            {t("pg.subtitle")}
                        </p>

                        <div className="program-meta">
                            <div className="meta-pill">
                                <Calendar size={14} />
                                <span>{t("pg.launchDate")}</span>
                            </div>
                            <div className="meta-pill">
                                <ShieldCheck size={14} />
                                <span>{t("pg.gov")}</span>
                            </div>
                        </div>
                    </header>

                    {/* ═══ 5 CORE PILLARS GRID ═══════════════════ */}
                    <div className="pillars-grid">
                        {pillars.map((pillar) => {
                            const IconComp = pillar.icon;
                            return (
                                <div key={pillar.key} className="pillar-glass-card">
                                    <div className="pillar-image-wrapper">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={pillar.image}
                                            alt={t(`pg.pillar.${pillar.key}.name`)}
                                            className="pillar-image"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = "/hero_bg.png";
                                            }}
                                        />
                                        <div className="pillar-img-overlay"></div>
                                        <div className="pillar-badge-floating">
                                            <IconComp size={12} />
                                            <span>{pillar.tag}</span>
                                        </div>
                                    </div>
                                    <div className="pillar-body">
                                        <span className="pillar-no-tag">PILLAR {pillar.pillarNo}</span>
                                        <h3 className="pillar-title">{t(`pg.pillar.${pillar.key}.name`)}</h3>
                                        <p className="pillar-desc">{t(`pg.pillar.${pillar.key}.desc`)}</p>
                                        <div className="pillar-footer">
                                            <CheckCircle2 size={14} style={{ color: '#D4AF37' }} />
                                            <span>Chittorgarh Special Initiative</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ═══ OBJECTIVES SECTION ════════════════════ */}
                    <section className="objectives-section">
                        <h2 className="sec-title-center">{t("pg.obj.title")}</h2>
                        <div className="obj-cards-grid">
                            {objectives.map((obj, idx) => {
                                const IconComp = obj.icon;
                                return (
                                    <div key={idx} className="obj-glass-card">
                                        <div className="obj-icon-box">
                                            <IconComp size={24} />
                                        </div>
                                        <h3 className="obj-card-title">{t(obj.titleKey)}</h3>
                                        <p className="obj-card-desc">{obj.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* ═══ BOTTOM NAV ═══════════════════════════ */}
                    <div className="bottom-nav-box">
                        <p className="ai-note-text">{t("pg.aiNote")}</p>
                        <Link 
                            prefetch={false} 
                            href="/" 
                            className="btn-home-cta" 
                            onClick={() => triggerHaptic('light')}
                        >
                            <span>Return to Home</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
