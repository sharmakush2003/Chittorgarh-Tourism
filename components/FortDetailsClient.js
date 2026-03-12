"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect, useRef } from "react";
import { 
    Play, 
    Pause, 
    Volume2, 
    Clock, 
    Shield, 
    History, 
    Camera, 
    ChevronRight, 
    ArrowLeft,
    MapPin,
    ScrollText
} from "lucide-react";
import Link from "next/link";
import { triggerHaptic } from "@/lib/haptics";

export default function FortDetailsClient() {
    const { t, lang } = useLanguage();
    const [activeSection, setActiveSection] = useState("overview");
    const [playingAudio, setPlayingAudio] = useState(null);
    const audioRef = useRef(null);

    const MONUMENTS = [
        { id: "vijay", icon: "🏛️" },
        { id: "kirti", icon: "💎" },
        { id: "padmini", icon: "👑" },
        { id: "gaumukh", icon: "💧" },
        { id: "kumbha", icon: "🏰" },
        { id: "meera", icon: "🙏" }
    ];

    const SECTIONS = [
        { id: "overview", label: t("fort.nav.overview"), icon: <Shield size={18} /> },
        { id: "history", label: t("fort.nav.history"), icon: <History size={18} /> },
        { id: "monuments", label: t("fort.nav.monuments"), icon: <ScrollText size={18} /> },
        { id: "gallery", label: t("fort.nav.gallery"), icon: <Camera size={18} /> }
    ];

    const handleAudioPlay = (id) => {
        triggerHaptic('light');
        if (playingAudio === id) {
            setPlayingAudio(null);
            // In a real app, you'd pause the actual audio object
        } else {
            setPlayingAudio(id);
            // In a real app, you'd play the actual audio object
        }
    };

    return (
        <div className="fort-page">
            {/* ═══ HERO SECTION ═══════════════════════════ */}
            <section className="fort-hero">
                <div className="hero-bg"></div>
                <div className="hero-overlay"></div>
                
                <div className="hero-content">
                    <Link href="/explore" className="back-link">
                        <ArrowLeft size={20} /> {t("btn.back")}
                    </Link>
                    <span className="hero-eyebrow">{t("fort.hero.eyebrow")}</span>
                    <h1 className="hero-title">{t("fort.hero.title")}</h1>
                    <p className="hero-desc">{t("fort.hero.desc")}</p>
                    
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-val">700</span>
                            <span className="stat-label">{t("fort.stats.acres")}</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-val">7</span>
                            <span className="stat-label">{t("fort.stats.gates")}</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-val">UNESCO</span>
                            <span className="stat-label">{t("fort.stats.heritage")}</span>
                        </div>
                    </div>
                </div>
                
                <div className="scroll-indicator">
                    <div className="mouse"></div>
                </div>
            </section>

            {/* ═══ STICKY NAVIGATION ══════════════════════ */}
            <nav className="fort-nav">
                <div className="nav-container">
                    {SECTIONS.map(s => (
                        <button 
                            key={s.id}
                            className={`nav-item ${activeSection === s.id ? 'active' : ''}`}
                            onClick={() => {
                                setActiveSection(s.id);
                                triggerHaptic('light');
                                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                        >
                            {s.icon}
                            <span>{s.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            <main className="fort-main">
                {/* ═══ OVERVIEW ══════════════════════════════ */}
                <section id="overview" className="fort-section">
                    <div className="section-header">
                        <h2 className="section-title text-gold">{t("fort.section.overview")}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="overview-grid">
                        <div className="overview-text">
                            <p className="lead-para">{t("fort.overview.p1")}</p>
                            <p>{t("fort.overview.p2")}</p>
                            <div className="info-chips">
                                <span className="chip"><Clock size={14} /> {t("attr.fort.time")}</span>
                                <span className="chip"><MapPin size={14} /> {t("fort.overview.location")}</span>
                            </div>
                        </div>
                        <div className="overview-image">
                            <img src="/hero_bg.png" alt="Chittorgarh Fort Overview" />
                        </div>
                    </div>
                </section>

                {/* ═══ HISTORY ═══════════════════════════════ */}
                <section id="history" className="fort-section">
                    <div className="section-header">
                        <h2 className="section-title text-gold">{t("fort.section.history")}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="history-timeline">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <h3 className="timeline-year">{t(`fort.history.era${i}.year`)}</h3>
                                    <h4 className="timeline-title">{t(`fort.history.era${i}.title`)}</h4>
                                    <p>{t(`fort.history.era${i}.desc`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══ MONUMENTS ═════════════════════════════ */}
                <section id="monuments" className="fort-section">
                    <div className="section-header">
                        <h2 className="section-title text-gold">{t("fort.section.monuments")}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="monuments-list">
                        {MONUMENTS.map(m => (
                            <div key={m.id} className="monument-card">
                                <div className="mon-icon">{m.icon}</div>
                                <div className="mon-content">
                                    <div className="mon-top">
                                        <h3 className="mon-name">{t(`attr.${m.id}.name`)}</h3>
                                        <button 
                                            className={`audio-btn ${playingAudio === m.id ? 'playing' : ''}`}
                                            onClick={() => handleAudioPlay(m.id)}
                                        >
                                            {playingAudio === m.id ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                                            <span>{playingAudio === m.id ? t("fort.audio.playing") : t("fort.audio.listen")}</span>
                                        </button>
                                    </div>
                                    <p className="mon-desc">{t(`attr.${m.id}.desc`)}</p>
                                    <div className="mon-meta">
                                        <span className="mon-tag">{t(`fort.monument.${m.id}.tag`)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══ GALLERY ═══════════════════════════════ */}
                <section id="gallery" className="fort-section">
                    <div className="section-header">
                        <h2 className="section-title text-gold">{t("fort.section.gallery")}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="fort-gallery-grid">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="gallery-item">
                                <img src={`/hero_bg.png`} alt={`Fort View ${i}`} />
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <style jsx>{`
                .fort-page {
                    background: #0f0a06;
                    color: #fff;
                    min-height: 100vh;
                    font-family: var(--font-jost);
                }

                /* --- Hero --- */
                .fort-hero {
                    height: 90vh;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    overflow: hidden;
                }

                .hero-bg {
                    position: absolute;
                    inset: 0;
                    background: url('/hero_bg.png') no-repeat center center / cover;
                    transform: scale(1.1);
                }

                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, 
                        rgba(15, 10, 6, 0.4) 0%, 
                        rgba(15, 10, 6, 0.6) 60%,
                        rgba(15, 10, 6, 1) 100%
                    );
                }

                .hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 900px;
                    padding: 0 2rem;
                    animation: fadeIn 1.2s ease-out;
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--gold);
                    text-decoration: none;
                    font-size: 0.9rem;
                    margin-bottom: 2rem;
                    opacity: 0.8;
                    transition: 0.3s;
                }

                .back-link:hover { opacity: 1; transform: translateX(-5px); }

                .hero-eyebrow {
                    display: block;
                    letter-spacing: 6px;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    color: var(--gold);
                    margin-bottom: 1rem;
                }

                .hero-title {
                    font-family: var(--font-cormorant);
                    font-size: clamp(3.5rem, 10vw, 7rem);
                    line-height: 1;
                    margin-bottom: 1.5rem;
                }

                .hero-desc {
                    font-size: 1.1rem;
                    color: rgba(255,255,255,0.7);
                    max-width: 650px;
                    margin: 0 auto 3rem;
                    line-height: 1.6;
                }

                .hero-stats {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 3rem;
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                }

                .stat-val {
                    font-family: var(--font-cormorant);
                    font-size: 2.5rem;
                    color: var(--gold);
                    font-weight: 700;
                }

                .stat-label {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: rgba(255,255,255,0.4);
                }

                .stat-divider {
                    width: 1px;
                    height: 40px;
                    background: rgba(255,255,255,0.1);
                }

                /* --- Nav --- */
                .fort-nav {
                    position: sticky;
                    top: 0;
                    background: rgba(15, 10, 6, 0.9);
                    backdrop-filter: blur(10px);
                    z-index: 100;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                    padding: 0 1rem;
                }

                .nav-item {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.5);
                    padding: 1.25rem 2rem;
                    font-size: 0.85rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    transition: 0.3s;
                    border-bottom: 2px solid transparent;
                }

                .nav-item:hover { color: #fff; }
                .nav-item.active {
                    color: var(--gold);
                    border-bottom-color: var(--gold);
                }

                /* --- Content Area --- */
                .fort-main {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 5rem 2rem;
                }

                .fort-section {
                    margin-bottom: 8rem;
                    scroll-margin-top: 100px;
                }

                .section-header {
                    margin-bottom: 4rem;
                    text-align: center;
                }

                .section-title {
                    font-family: var(--font-cormorant);
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }

                .title-divider {
                    width: 60px;
                    height: 2px;
                    background: var(--gold);
                    margin: 0 auto;
                }

                /* --- Overview --- */
                .overview-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 4rem;
                    align-items: center;
                }

                .lead-para {
                    font-size: 1.25rem;
                    color: var(--gold);
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }

                .overview-text p {
                    color: rgba(255,255,255,0.7);
                    line-height: 1.8;
                    margin-bottom: 2rem;
                }

                .info-chips {
                    display: flex;
                    gap: 1rem;
                }

                .chip {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(255,255,255,0.05);
                    padding: 0.5rem 1rem;
                    border-radius: 100px;
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.8);
                }

                .overview-image img {
                    width: 100%;
                    border-radius: 12px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                }

                /* --- Timeline --- */
                .history-timeline {
                    position: relative;
                    max-width: 800px;
                    margin: 0 auto;
                    padding-left: 2rem;
                }

                .history-timeline::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 1px;
                    background: rgba(212, 175, 55, 0.2);
                }

                .timeline-item {
                    position: relative;
                    margin-bottom: 4rem;
                }

                .timeline-dot {
                    position: absolute;
                    left: -2rem;
                    top: 0.5rem;
                    width: 13px;
                    height: 13px;
                    background: var(--gold);
                    border-radius: 50%;
                    transform: translateX(-50%);
                    box-shadow: 0 0 15px var(--gold);
                }

                .timeline-year {
                    font-family: var(--font-cormorant);
                    font-size: 1.5rem;
                    color: var(--gold);
                    margin-bottom: 0.5rem;
                }

                .timeline-title {
                    font-size: 1.2rem;
                    margin-bottom: 1rem;
                }

                .timeline-content p {
                    color: rgba(255,255,255,0.6);
                    line-height: 1.7;
                }

                /* --- Monuments --- */
                .monuments-list {
                    display: grid;
                    gap: 2rem;
                }

                .monument-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 16px;
                    padding: 2.5rem;
                    display: grid;
                    grid-template-columns: auto 1fr;
                    gap: 2.5rem;
                    transition: 0.3s;
                }

                .monument-card:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(212, 175, 55, 0.2);
                    transform: translateY(-5px);
                }

                .mon-icon {
                    font-size: 3rem;
                    background: rgba(212, 175, 55, 0.1);
                    width: 100px;
                    height: 100px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                }

                .mon-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .mon-name {
                    font-family: var(--font-cormorant);
                    font-size: 2rem;
                    color: var(--gold);
                }

                .audio-btn {
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid var(--gold);
                    color: var(--gold);
                    padding: 0.6rem 1.2rem;
                    border-radius: 100px;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    cursor: pointer;
                    transition: 0.3s;
                    font-weight: 600;
                    font-size: 0.85rem;
                }

                .audio-btn:hover {
                    background: var(--gold);
                    color: #000;
                }

                .audio-btn.playing {
                    background: #fff;
                    color: #000;
                    border-color: #fff;
                    animation: pulse 2s infinite;
                }

                .mon-desc {
                    color: rgba(255,255,255,0.7);
                    line-height: 1.8;
                    margin-bottom: 1.5rem;
                }

                .mon-tag {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: rgba(255,255,255,0.4);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 0.3rem 0.8rem;
                    border-radius: 4px;
                }

                /* --- Gallery --- */
                .fort-gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                }

                .gallery-item {
                    aspect-ratio: 4/3;
                    border-radius: 8px;
                    overflow: hidden;
                    cursor: zoom-in;
                }

                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: 0.5s;
                }

                .gallery-item:hover img {
                    transform: scale(1.1);
                }

                /* --- Misc --- */
                .scroll-indicator {
                    position: absolute;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 2;
                }

                .mouse {
                    width: 25px;
                    height: 45px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-radius: 20px;
                    position: relative;
                }

                .mouse::after {
                    content: '';
                    position: absolute;
                    top: 10px;
                    left: 50%;
                    width: 4px;
                    height: 8px;
                    background: var(--gold);
                    border-radius: 2px;
                    transform: translateX(-50%);
                    animation: scrollWheel 2s infinite;
                }

                @keyframes scrollWheel {
                    0% { transform: translate(-50%, 0); opacity: 1; }
                    100% { transform: translate(-50%, 15px); opacity: 0; }
                }

                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(255,255,255, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(255,255,255, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(255,255,255, 0); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 768px) {
                    .nav-item span { display: none; }
                    .nav-item { padding: 1.25rem 1rem; }
                    .overview-grid { grid-template-columns: 1fr; gap: 2rem; }
                    .overview-image { order: -1; }
                    .monument-card { grid-template-columns: 1fr; padding: 1.5rem; gap: 1.5rem; }
                    .mon-icon { width: 60px; height: 60px; font-size: 1.5rem; }
                    .hero-title { font-size: 3.5rem; }
                    .hero-stats { gap: 1rem; flex-wrap: wrap; }
                }
            `}</style>
        </div>
    );
}
