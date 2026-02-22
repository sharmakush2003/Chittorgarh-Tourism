"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState, useRef } from "react";
import { Flower, Shield, Heart, Flame, Star, ArrowRight, Music } from "lucide-react";
import Image from "next/image";

export default function Chronicles() {
    const { t } = useLanguage();
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(scrolled / maxScroll);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const legends = [
        {
            id: "padmini",
            icon: <Flower className="legend-icon" />,
            color: "rgba(212, 175, 55, 0.2)",
            accent: "#D4AF37",
            align: "left",
            link: "https://en.wikipedia.org/wiki/Rani_Padmini"
        },
        {
            id: "pratap",
            icon: <Shield className="legend-icon" />,
            color: "rgba(160, 64, 48, 0.2)",
            accent: "#A04030",
            align: "right",
            link: "https://en.wikipedia.org/wiki/Maharana_Pratap"
        },
        {
            id: "panna",
            icon: <Heart className="legend-icon" />,
            color: "rgba(74, 222, 128, 0.2)",
            accent: "#4ade80",
            align: "left",
            link: "https://en.wikipedia.org/wiki/Panna_Dai"
        },
        {
            id: "meera",
            icon: <Music className="legend-icon" />,
            color: "rgba(147, 197, 253, 0.2)",
            accent: "#93c5fd",
            align: "right",
            link: "https://en.wikipedia.org/wiki/Meera"
        }
    ];

    return (
        <div className="chronicles-page" ref={containerRef}>
            {/* ═══ CINEMATIC BACKGROUNDS ═══════════════════ */}
            <div className="fixed-bg"></div>
            <div className="bg-overlay"></div>

            {/* ═══ HERO SECTION ═══════════════════════════ */}
            <header className="chron-hero">
                <div className="hero-content reveal">
                    <span className="eyebrow">{t("chron.eyebrow")}</span>
                    <h1 className="hero-title">{t("chron.hero.title")}</h1>
                    <p className="hero-subtitle">{t("chron.hero.sub")}</p>
                    <div className="scroll-indicator">
                        <div className="mouse">
                            <div className="wheel"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* ═══ TIMELINE SECTION ═══════════════════════ */}
            <main className="timeline-container">
                <div className="timeline-guide" style={{ height: `${scrollProgress * 100}%` }}></div>

                {legends.map((legend, index) => (
                    <section key={legend.id} className={`timeline-segment ${legend.align}`}>
                        <div className="legend-marker">
                            <div className="marker-dot" style={{ backgroundColor: legend.accent }}></div>
                            <div className="marker-line" style={{ background: `linear-gradient(to bottom, ${legend.accent}, transparent)` }}></div>
                        </div>

                        <div className="legend-card-wrapper reveal">
                            <div className="legend-card" style={{ boxShadow: `0 20px 40px ${legend.color}` }}>
                                <div className="card-glass-accent" style={{ background: legend.accent }}></div>
                                <div className="card-top">
                                    <span className="legend-year" style={{ color: legend.accent }}>{t(`legend.${legend.id}.year`)}</span>
                                    <div className="legend-icon-box" style={{ borderColor: legend.accent }}>
                                        {legend.icon}
                                    </div>
                                </div>

                                <div className="legend-image-container">
                                    <Image
                                        src={`/${legend.id}.png`}
                                        alt={t(`legend.${legend.id}.title`)}
                                        className="legend-card-image"
                                        width={600}
                                        height={400}
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    />
                                </div>

                                <h2 className="legend-title">{t(`legend.${legend.id}.title`)}</h2>
                                <h3 className="legend-subtitle">{t(`legend.${legend.id}.subtitle`)}</h3>
                                <p className="legend-desc">{t(`legend.${legend.id}.desc`)}</p>

                                <div className="card-footer">
                                    <a
                                        href={legend.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="explore-saga"
                                        style={{ color: legend.accent, textDecoration: 'none' }}
                                    >
                                        {t("chron.btn.explore")} <ArrowRight size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </main>

            {/* ═══ FOOTER NOTE ═══════════════════════════ */}
            <footer className="chron-footer reveal">
                <div className="footer-content">
                    <p className="ai-disclosure">
                        {t("chron.footer.aiNote")}
                    </p>
                    <div className="footer-divider"></div>
                    <p className="heritage-note">
                        {t("chron.footer.heritage")}
                    </p>
                </div>
            </footer>

            <style jsx>{`
                .chron-footer {
                    padding: 5rem 2rem 10rem;
                    text-align: center;
                    background: linear-gradient(to bottom, transparent, rgba(15, 10, 6, 0.9));
                    position: relative;
                    z-index: 2;
                }

                .footer-content {
                    max-width: 800px;
                    margin: 0 auto;
                }

                .ai-disclosure {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.4);
                    font-style: italic;
                    letter-spacing: 1px;
                }

                .footer-divider {
                    width: 40px;
                    height: 1px;
                    background: var(--gold);
                    margin: 2rem auto;
                    opacity: 0.5;
                }

                .heritage-note {
                    font-family: var(--ff-display);
                    font-size: 1.2rem;
                    color: var(--gold);
                    opacity: 0.8;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }
                .legend-image-container {
                    width: 100%;
                    height: 250px;
                    border-radius: 8px;
                    overflow: hidden;
                    margin-bottom: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .legend-card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .legend-card:hover .legend-card-image {
                    transform: scale(1.1);
                }
                .chronicles-page {
                    background: transparent;
                    color: #fff;
                    min-height: 200vh;
                    position: relative;
                }

                /* ── Backgrounds (matches Explore/Stays) ─── */
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

                /* ── Hero ────────────────────────────────── */
                .chron-hero {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 0 2rem;
                    position: relative;
                }

                .eyebrow {
                    display: block;
                    font-family: var(--ff-body);
                    font-size: 0.8rem;
                    letter-spacing: 6px;
                    text-transform: uppercase;
                    color: var(--gold);
                    margin-bottom: 1.5rem;
                }

                .hero-title {
                    font-family: var(--ff-display);
                    font-size: clamp(3rem, 10vw, 6rem);
                    margin-bottom: 1.5rem;
                    background: linear-gradient(to bottom, #fff, #888);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hero-subtitle {
                    font-size: 1.25rem;
                    color: rgba(255, 255, 255, 0.7);
                    max-width: 600px;
                    margin: 0 auto;
                }

                /* ── Timeline Grid ────────────────────────── */
                .timeline-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    padding: 10rem 2rem;
                }

                .timeline-guide {
                    position: absolute;
                    left: 50%;
                    top: 0;
                    width: 1px;
                    background: linear-gradient(to bottom, var(--gold), transparent);
                    transform: translateX(-50%);
                    z-index: 1;
                    opacity: 0.3;
                }

                .timeline-segment {
                    display: flex;
                    width: 100%;
                    margin-bottom: 15rem;
                    position: relative;
                }

                .timeline-segment.left { justify-content: flex-start; }
                .timeline-segment.right { justify-content: flex-end; }

                /* ── Markers ─────────────────────────────── */
                .legend-marker {
                    position: absolute;
                    left: 50%;
                    top: 0;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 100%;
                    z-index: 2;
                }

                .marker-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: 2px solid #fff;
                    box-shadow: 0 0 15px currentColor;
                }

                .marker-line {
                    flex-grow: 1;
                    width: 1px;
                    margin-top: 10px;
                }

                /* ── Cards ───────────────────────────────── */
                .legend-card-wrapper {
                    width: 45%;
                }

                .legend-card {
                    background: rgba(28, 20, 15, 0.6);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 3rem;
                    position: relative;
                    transition: 0.5s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .legend-card:hover {
                    transform: translateY(-10px) scale(1.02);
                    border-color: rgba(255, 255, 255, 0.2);
                    background: rgba(28, 20, 15, 0.8);
                }

                .card-glass-accent {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 4px;
                    height: 0%;
                    transition: 0.5s;
                }

                .legend-card:hover .card-glass-accent {
                    height: 100%;
                }

                .card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .legend-year {
                    font-family: var(--ff-display);
                    font-size: 1.25rem;
                    font-weight: bold;
                    letter-spacing: 2px;
                }

                .legend-icon-box {
                    width: 50px;
                    height: 50px;
                    border: 1px solid;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }

                :global(.legend-icon) {
                    width: 24px;
                    height: 24px;
                }

                .legend-title {
                    font-family: var(--ff-display);
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }

                .legend-subtitle {
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: rgba(255, 255, 255, 0.5);
                    margin-bottom: 1.5rem;
                }

                .legend-desc {
                    color: rgba(255, 255, 255, 0.7);
                    line-height: 1.8;
                    font-size: 1rem;
                    margin-bottom: 2rem;
                }

                .explore-saga {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    font-weight: bold;
                    letter-spacing: 2px;
                    transition: 0.3s;
                }

                .explore-saga:hover {
                    gap: 15px;
                }

                /* ── Animations ──────────────────────────── */
                .reveal {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .reveal.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* ── Mobile ──────────────────────────────── */
                @media (max-width: 968px) {
                    .timeline-guide { left: 20px; }
                    .legend-marker { left: 20px; }
                    .legend-card-wrapper { width: calc(100% - 60px); margin-left: 60px; }
                    .timeline-segment.left, .timeline-segment.right { justify-content: flex-start; }
                    
                    .hero-title { font-size: 3.5rem; }
                    .legend-title { font-size: 2rem; }
                }

                /* ── Mouse Indicator ─────────────────────── */
                .scroll-indicator {
                    position: absolute;
                    bottom: 40px;
                    left: 50%;
                    transform: translateX(-50%);
                }

                .mouse {
                    width: 26px;
                    height: 44px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 20px;
                    position: relative;
                }

                .wheel {
                    width: 4px;
                    height: 8px;
                    background: #fff;
                    position: absolute;
                    top: 8px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-radius: 2px;
                    animation: scroll 2s infinite;
                }

                @keyframes scroll {
                    0% { transform: translate(-50%, 0); opacity: 1; }
                    100% { transform: translate(-50%, 15px); opacity: 0; }
                }
            `}</style>

            <script dangerouslySetInnerHTML={{
                __html: `
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                }, { threshold: 0.1 });

                document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
            ` }} />
        </div>
    );
}

