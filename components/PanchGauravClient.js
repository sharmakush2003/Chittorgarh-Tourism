"use client";

import { useLanguage } from "@/context/LanguageContext";
import { 
    Package, 
    Sprout, 
    Palmtree, 
    Trophy, 
    Flower, 
    ShieldCheck, 
    Megaphone, 
    Users, 
    Coins,
    Calendar,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { triggerHaptic } from "@/lib/haptics";

export default function PanchGauravClient() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const pillars = [
        { key: "1", icon: <Package className="card-icon" strokeWidth={1} /> },
        { key: "2", icon: <Sprout className="card-icon" strokeWidth={1} /> },
        { key: "3", icon: <Palmtree className="card-icon" strokeWidth={1} /> },
        { key: "4", icon: <Trophy className="card-icon" strokeWidth={1} /> },
        { key: "5", icon: <Flower className="card-icon" strokeWidth={1} /> }
    ];

    return (
        <div className="explore-page">
            {/* ═══ FIXED BACKGROUND ══════════════════════ */}
            <div className="fixed-bg"></div>
            <div className="bg-overlay"></div>

            {/* ═══ CONTENT ═══════════════════════════════ */}
            <main className="main-content">
                <header className="header-section text-center">
                    <span className="eyebrow">{t("pg.eyebrow")}</span>
                    <h1 className="title text-gold">{t("pg.title")}</h1>
                    <div className="divider"></div>
                    <p className="subtitle">{t("pg.subtitle")}</p>
                    
                    <div className="program-meta">
                        <div className="meta-badge">
                            <Calendar size={14} />
                            <span>{t("pg.launchDate")}</span>
                        </div>
                        <div className="meta-badge govt">
                            <ShieldCheck size={14} />
                            <span>{t("pg.gov")}</span>
                        </div>
                    </div>
                </header>

                <div className="container">
                    <div className="attractions-grid">
                        {pillars.map((pillar, idx) => (
                            <div key={pillar.key} className={`glass-card reveal reveal-delay-${idx} ${isVisible ? 'visible' : ''}`}>
                                <div className="card-icon-wrapper">
                                    {pillar.icon}
                                </div>
                                <div className="card-content">
                                    <h3 className="card-title">{t(`pg.pillar.${pillar.key}.name`)}</h3>
                                    <p className="card-desc">{t(`pg.pillar.${pillar.key}.desc`)}</p>
                                    
                                    <div className="card-footer-accent">
                                        <div className="accent-line"></div>
                                        <span className="accent-text">Pillar {pillar.key}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Special Budget Card */}
                        <div className={`glass-card budget-card reveal reveal-delay-5 ${isVisible ? 'visible' : ''}`}>
                            <div className="card-icon-wrapper">
                                <Coins className="card-icon budget-icon" strokeWidth={1} />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title text-gold">{t("pg.budget.title")}</h3>
                                <p className="card-desc font-medium text-white">{t("pg.budget.desc")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Objectives Section */}
                    <section className={`objectives-section reveal reveal-delay-6 ${isVisible ? 'visible' : ''}`}>
                        <div className="objectives-inner">
                            <h2 className="obj-header">{t("pg.obj.title")}</h2>
                            <div className="obj-grid">
                                <div className="obj-item">
                                    <ShieldCheck className="obj-icon" />
                                    <span>{t("pg.obj.1")}</span>
                                </div>
                                <div className="obj-item">
                                    <Megaphone className="obj-icon" />
                                    <span>{t("pg.obj.2")}</span>
                                </div>
                                <div className="obj-item">
                                    <Users className="obj-icon" />
                                    <span>{t("pg.obj.3")}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="bottom-nav">
                        <Link href="/" className="read-more" onClick={() => triggerHaptic('light')}>
                            {t("nav.home")} <ArrowRight className="arrow" size={16} />
                        </Link>
                    </div>
                </div>
            </main>

            <style jsx>{`
                .explore-page {
                    min-height: 100vh;
                    color: #fff;
                }

                .fixed-bg {
                    position: fixed;
                    inset: 0;
                    background: url('/hero_bg.png') no-repeat center center / cover;
                    z-index: -2;
                }

                .bg-overlay {
                    position: fixed;
                    inset: 0;
                    background: linear-gradient(to bottom, 
                        rgba(15, 10, 6, 0.8) 0%, 
                        rgba(15, 10, 6, 0.6) 50%,
                        rgba(15, 10, 6, 0.9) 100%
                    );
                    z-index: -1;
                    backdrop-filter: blur(4px);
                }

                .main-content {
                    padding-top: 120px;
                    padding-bottom: 80px;
                }

                .header-section {
                    margin-bottom: 5rem;
                    padding: 0 1rem;
                }

                .eyebrow {
                    display: block;
                    font-family: var(--ff-body);
                    font-size: 0.75rem;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    color: rgba(255, 255, 255, 0.6);
                    margin-bottom: 1rem;
                }

                .title {
                    font-size: clamp(2.5rem, 6vw, 4.5rem);
                    font-family: var(--ff-display);
                    margin-bottom: 1.5rem;
                    text-shadow: 0 4px 30px rgba(0,0,0,0.5);
                }

                .divider {
                    width: 80px;
                    height: 3px;
                    background: var(--gold);
                    margin: 0 auto 2rem;
                    border-radius: 2px;
                }

                .subtitle {
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.7);
                    max-width: 700px;
                    margin: 0 auto 2.5rem;
                    line-height: 1.6;
                }

                .program-meta {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                }

                .meta-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.6rem 1.2rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 50px;
                    font-size: 0.8rem;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.8);
                }

                .meta-badge.govt {
                    border-color: rgba(212, 175, 55, 0.3);
                    background: rgba(212, 175, 55, 0.1);
                    color: var(--gold);
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                .attractions-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 2rem;
                    margin-bottom: 4rem;
                }

                .glass-card {
                    background: rgba(20, 15, 10, 0.7);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 24px;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                    padding: 2.5rem;
                    height: 100%;
                }

                .glass-card:hover {
                    background: rgba(28, 20, 15, 0.85);
                    border-color: rgba(212, 175, 55, 0.5);
                    transform: translateY(-12px) scale(1.02);
                    box-shadow: 0 25px 60px rgba(0,0,0,0.5);
                }

                .card-icon-wrapper {
                    margin-bottom: 2rem;
                }

                :global(.card-icon) {
                    width: 48px;
                    height: 48px;
                    color: var(--gold);
                    opacity: 0.8;
                }

                .card-title {
                    font-family: var(--ff-display);
                    font-size: 1.6rem;
                    color: var(--gold);
                    margin-bottom: 1.2rem;
                    line-height: 1.3;
                }

                .card-desc {
                    font-size: 0.95rem;
                    color: rgba(255, 255, 255, 0.7);
                    line-height: 1.7;
                    margin-bottom: 2rem;
                }

                .card-footer-accent {
                    margin-top: auto;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .accent-line {
                    height: 1px;
                    width: 30px;
                    background: rgba(212, 175, 55, 0.3);
                }

                .accent-text {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: rgba(212, 175, 55, 0.5);
                }

                .budget-card {
                    background: rgba(212, 175, 55, 0.1);
                    border-color: rgba(212, 175, 55, 0.4);
                }

                .objectives-section {
                    margin: 4rem 0;
                }

                .objectives-inner {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 32px;
                    padding: 3rem;
                    backdrop-filter: blur(10px);
                }

                .obj-header {
                    font-family: var(--ff-display);
                    font-size: 2rem;
                    text-align: center;
                    margin-bottom: 3rem;
                    color: #fff;
                }

                .obj-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                }

                .obj-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.2rem;
                    text-align: center;
                }

                :global(.obj-icon) {
                    width: 32px;
                    height: 32px;
                    color: var(--gold);
                }

                .obj-item span {
                    font-size: 1rem;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.9);
                }

                .bottom-nav {
                    display: flex;
                    justify-content: center;
                    margin-top: 4rem;
                }

                :global(.read-more) {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid var(--gold);
                    color: var(--gold);
                    padding: 1rem 2.5rem;
                    border-radius: 50px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-weight: 700;
                    font-size: 0.85rem;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }

                :global(.read-more:hover) {
                    background: var(--gold);
                    color: #000;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
                }

                .reveal {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .reveal.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                .reveal-delay-0 { transition-delay: 0.1s; }
                .reveal-delay-1 { transition-delay: 0.2s; }
                .reveal-delay-2 { transition-delay: 0.3s; }
                .reveal-delay-3 { transition-delay: 0.4s; }
                .reveal-delay-4 { transition-delay: 0.5s; }
                .reveal-delay-5 { transition-delay: 0.6s; }
                .reveal-delay-6 { transition-delay: 0.7s; }

                @media (max-width: 768px) {
                    .obj-grid {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                    }
                    
                    .title {
                        font-size: 3rem;
                    }
                    
                    .attractions-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
