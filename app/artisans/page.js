"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Artisans() {
    const { t } = useLanguage();

    return (
        <div className="artisans-page">
            {/* ═══ FIXED BACKGROUND ══════════════════════ */}
            <div className="fixed-bg"></div>
            <div className="bg-overlay"></div>

            <style jsx>{`
                .artisans-page {
                    min-height: 100vh;
                    position: relative;
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
                        rgba(15, 10, 6, 0.7) 0%, 
                        rgba(15, 10, 6, 0.5) 50%,
                        rgba(15, 10, 6, 0.8) 100%
                    );
                    z-index: -1;
                    backdrop-filter: blur(3px);
                }
            `}</style>

            {/* ═══ PAGE HEADER ═══════════════════════════ */}
            <header className="hero page-header" style={{ background: 'transparent', minHeight: '50vh' }}>
                <div className="hero-content">
                    <h1>{t("art.title")}</h1>
                </div>
            </header>

            {/* ═══ ARTISANS CONTENT ══════════════════════ */}
            <section id="artisans" className="artisans section-pad" style={{ background: 'transparent' }}>
                <div className="container text-center">
                    <span className="eyebrow">
                        {t("art.eyebrow")}
                    </span>
                    <p className="section-desc">
                        {t("art.desc")}
                    </p>
                    <div className="artisan-grid">
                        <div className="artisan-card reveal" style={{ background: 'rgba(255,255,255,0.95)' }}>
                            <div className="card-image">🧸</div>
                            <div className="card-body">
                                <h3>{t("art.c1.title")}</h3>
                                <p>
                                    {t("art.c1.desc")}
                                </p>
                                <a href="#" className="card-link">
                                    {t("art.c1.cta")}
                                </a>
                            </div>
                        </div>
                        <div className="artisan-card reveal reveal-delay-1" style={{ background: 'rgba(255,255,255,0.95)' }}>
                            <div className="card-image">🎨</div>
                            <div className="card-body">
                                <h3>{t("art.c2.title")}</h3>
                                <p>
                                    {t("art.c2.desc")}
                                </p>
                                <a href="#" className="card-link">
                                    {t("art.c2.cta")}
                                </a>
                            </div>
                        </div>
                        <div className="artisan-card reveal reveal-delay-2" style={{ background: 'rgba(255,255,255,0.95)' }}>
                            <div className="card-image">💎</div>
                            <div className="card-body">
                                <h3>{t("art.c3.title")}</h3>
                                <p>
                                    {t("art.c3.desc")}
                                </p>
                                <a href="#" className="card-link">
                                    {t("art.c3.cta")}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
