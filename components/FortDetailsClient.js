"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, useRef } from "react";
import { 
    Play, 
    Pause, 
    Clock, 
    Shield, 
    History, 
    Camera, 
    ArrowLeft,
    MapPin,
    ScrollText,
} from "lucide-react";
import Link from "next/link";
import { triggerHaptic } from "@/lib/haptics";
import GoldenHourTracker from "./GoldenHourTracker";
import { motion } from "framer-motion";

export default function FortDetailsClient() {
    const { t, lang } = useLanguage();
    const [activeSection, setActiveSection] = useState("overview");
    const [playingAudio, setPlayingAudio] = useState(null);

    const MONUMENTS = [
        { id: "vijay", icon: "🏛️" },
        { id: "kirti", icon: "💎" },
        { id: "padmini", icon: "👑" },
        { id: "gaumukh", icon: "💧" },
        { id: "kumbha_palace", icon: "🏰" },
        { id: "meera", icon: "🙏" }
    ];

    const SECTIONS = [
        { id: "overview", label: t("fort.nav.overview"), icon: <Shield size={18} /> },
        { id: "history", label: t("fort.nav.history"), icon: <History size={18} /> },
        { id: "monuments", label: t("fort.nav.monuments"), icon: <ScrollText size={18} /> },
        { id: "gallery", label: t("fort.nav.gallery"), icon: <Camera size={18} /> }
    ];

    const handleAudioPlay = (monId) => {
        triggerHaptic('medium');
        window.speechSynthesis.cancel();

        if (playingAudio === monId) {
            setPlayingAudio(null);
            return;
        }

        const textToSpeak = `${t(`attr.${monId}.name`)}. ${t(`attr.${monId}.desc`)}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        const langMap = {
            'en': 'en-US', 'hi': 'hi-IN', 'fr': 'fr-FR', 'nl': 'nl-NL', 'ja': 'ja-JP'
        };
        utterance.lang = langMap[lang] || 'en-US';
        utterance.rate = 0.9;
        
        utterance.onend = () => setPlayingAudio(null);
        utterance.onerror = () => setPlayingAudio(null);

        setPlayingAudio(monId);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="fort-page"
        >
            {/* ═══ HERO SECTION ═══════════════════════════ */}
            <section className="fort-hero">
                <div className="hero-bg"></div>
                <div className="hero-overlay"></div>
                
                <motion.div 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="hero-content"
                >
                    <Link href="/explore" className="back-link">
                        <ArrowLeft size={16} /> {t("btn.back")}
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
                </motion.div>
                
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
                            <span className="nav-icon-wrapper">{s.icon}</span>
                            <span>{s.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            <main className="fort-main">
                {/* ═══ OVERVIEW ══════════════════════════════ */}
                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    id="overview" 
                    className="fort-section mesh-bg"
                >
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
                        <div className="overview-sidebar">
                            <GoldenHourTracker />
                        </div>
                    </div>
                </motion.section>

                {/* ═══ HISTORY ═══════════════════════════════ */}
                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    id="history" 
                    className="fort-section"
                >
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
                </motion.section>

                {/* ═══ MONUMENTS ═════════════════════════════ */}
                <section id="monuments" className="fort-section">
                    <div className="section-header">
                        <h2 className="section-title text-gold">{t("fort.section.monuments")}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="monuments-list">
                        {MONUMENTS.map((m, idx) => (
                            <motion.div 
                                key={m.id} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="monument-card premium-glass"
                            >
                                <div className="mon-icon-container">
                                    <motion.div 
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className="mon-icon"
                                    >
                                        {m.icon}
                                    </motion.div>
                                </div>
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
                            </motion.div>
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
                            <motion.div 
                                key={i} 
                                whileHover={{ scale: 1.05 }}
                                className="gallery-item premium-glass"
                            >
                                <img src={`/hero_bg.png`} alt={`Fort View ${i}`} />
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            <style jsx>{`
                .fort-page {
                    background: #0f0a06;
                    color: #fff;
                    min-height: 100vh;
                    font-family: var(--ff-body);
                }

                .fort-hero {
                    height: 100vh;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    overflow: hidden;
                    padding-top: 100px;
                }

                .hero-bg {
                    position: absolute;
                    inset: 0;
                    background: url('/hero_bg.png') no-repeat center center / cover;
                    transform: scale(1.05);
                }

                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, 
                        rgba(15, 10, 6, 0.3) 0%, 
                        rgba(15, 10, 6, 0.6) 60%,
                        rgba(15, 10, 6, 1) 100%
                    );
                }

                .hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 1000px;
                    padding: 0 2rem;
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--gold);
                    text-decoration: none;
                    font-size: 0.8rem;
                    margin-bottom: 2rem;
                    opacity: 0.7;
                    transition: 0.3s;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    font-weight: 600;
                }

                .back-link:hover { opacity: 1; transform: translateX(-5px); }

                .hero-eyebrow {
                    display: block;
                    letter-spacing: 8px;
                    text-transform: uppercase;
                    font-size: 0.75rem;
                    color: var(--gold);
                    margin-bottom: 1.5rem;
                    font-weight: 600;
                }

                .hero-title {
                    font-family: var(--ff-display);
                    font-size: clamp(3.5rem, 10vw, 8rem);
                    line-height: 0.95;
                    margin-bottom: 2rem;
                    font-weight: 500;
                }

                .hero-desc {
                    font-size: 1.1rem;
                    color: rgba(255,255,255,0.7);
                    max-width: 700px;
                    margin: 0 auto 4rem;
                    line-height: 1.6;
                    font-weight: 300;
                }

                .hero-stats {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 3rem;
                }

                .stat-val {
                    font-family: var(--ff-display);
                    font-size: clamp(2rem, 4vw, 3rem);
                    color: var(--gold);
                    font-weight: 500;
                }

                .stat-label {
                    font-size: 0.65rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: rgba(255,255,255,0.4);
                }

                .stat-divider {
                    width: 1px;
                    height: 40px;
                    background: rgba(255,255,255,0.1);
                }

                .fort-nav {
                    position: sticky;
                    top: 0;
                    background: rgba(15, 10, 6, 0.8);
                    backdrop-filter: blur(20px);
                    z-index: 100;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                }

                .nav-item {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.4);
                    padding: 1.5rem 2rem;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    transition: 0.3s;
                }

                .nav-item.active {
                    color: var(--gold);
                    background: rgba(212, 175, 55, 0.05);
                }

                .fort-main {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 8rem 2rem;
                }

                .fort-section {
                    margin-bottom: 10rem;
                    scroll-margin-top: 100px;
                    padding: 4rem;
                    border-radius: 32px;
                }

                .section-header {
                    margin-bottom: 5rem;
                    text-align: center;
                }

                .section-title {
                    font-family: var(--ff-display);
                    font-size: 3.5rem;
                    margin-bottom: 1rem;
                    font-weight: 400;
                }

                .title-divider {
                    width: 60px;
                    height: 2px;
                    background: var(--gold);
                    margin: 0 auto;
                }

                .overview-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 5rem;
                    align-items: flex-start;
                }

                .lead-para {
                    font-size: 1.4rem;
                    color: var(--gold-light);
                    margin-bottom: 2rem;
                    line-height: 1.5;
                    font-family: var(--ff-display);
                    font-style: italic;
                }

                .overview-text p {
                    color: rgba(255,255,255,0.7);
                    line-height: 1.8;
                    margin-bottom: 2.5rem;
                    font-weight: 300;
                }

                .info-chips {
                    display: flex;
                    gap: 1.5rem;
                }

                .chip {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: rgba(255,255,255,0.03);
                    padding: 0.75rem 1.25rem;
                    border-radius: 100px;
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.8);
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .overview-sidebar {
                    position: sticky;
                    top: 140px;
                }

                .history-timeline {
                    position: relative;
                    max-width: 900px;
                    margin: 0 auto;
                    padding-left: 3rem;
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
                    margin-bottom: 5rem;
                }

                .timeline-dot {
                    position: absolute;
                    left: -3rem;
                    top: 0.5rem;
                    width: 11px;
                    height: 11px;
                    background: var(--gold);
                    border-radius: 50%;
                    transform: translateX(-50%);
                    box-shadow: 0 0 15px var(--gold);
                }

                .timeline-year {
                    font-family: var(--ff-display);
                    font-size: 2rem;
                    color: var(--gold);
                    margin-bottom: 0.5rem;
                }

                .timeline-title {
                    font-size: 1.3rem;
                    margin-bottom: 1.5rem;
                    font-family: var(--ff-display);
                }

                .timeline-content p {
                    color: rgba(255,255,255,0.6);
                    line-height: 1.8;
                }

                .monuments-list {
                    display: grid;
                    gap: 2.5rem;
                }

                .monument-card {
                    padding: 3rem;
                    display: grid;
                    grid-template-columns: auto 1fr;
                    gap: 3.5rem;
                    transition: 0.4s;
                    border-radius: 24px;
                }

                .mon-icon-container {
                    width: 120px;
                    height: 120px;
                    background: rgba(212, 175, 55, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 20px;
                }

                .mon-icon {
                    font-size: 4rem;
                }

                .mon-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 2rem;
                }

                .mon-name {
                    font-family: var(--ff-display);
                    font-size: 2.2rem;
                    color: var(--gold);
                }

                .audio-btn {
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid var(--gold);
                    color: var(--gold);
                    padding: 0.75rem 1.5rem;
                    border-radius: 100px;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    cursor: pointer;
                    transition: 0.3s;
                    font-weight: 600;
                    font-size: 0.8rem;
                }

                .audio-btn:hover {
                    background: var(--gold);
                    color: #000;
                }

                .audio-btn.playing {
                    background: #fff;
                    color: #000;
                    animation: pulse 2s infinite;
                }

                .mon-desc {
                    color: rgba(255,255,255,0.7);
                    line-height: 1.8;
                    margin-bottom: 2rem;
                    font-size: 1.05rem;
                }

                .mon-tag {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: rgba(255,255,255,0.4);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 0.4rem 1rem;
                    border-radius: 6px;
                }

                .fort-gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 2rem;
                }

                .gallery-item {
                    aspect-ratio: 16/10;
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: zoom-in;
                }

                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: 0.6s;
                }

                .gallery-item:hover img {
                    transform: scale(1.1);
                }

                .scroll-indicator {
                    position: absolute;
                    bottom: 40px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 2;
                }

                .mouse {
                    width: 28px;
                    height: 48px;
                    border: 2px solid rgba(255,255,255,0.2);
                    border-radius: 20px;
                    position: relative;
                }

                .mouse::after {
                    content: '';
                    position: absolute;
                    top: 10px;
                    left: 50%;
                    width: 4px;
                    height: 10px;
                    background: var(--gold);
                    border-radius: 2px;
                    transform: translateX(-50%);
                    animation: scrollWheel 2s infinite;
                }

                @keyframes scrollWheel {
                    0% { transform: translate(-50%, 0); opacity: 1; }
                    100% { transform: translate(-50%, 18px); opacity: 0; }
                }

                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(255,255,255, 0.4); }
                    70% { box-shadow: 0 0 0 12px rgba(255,255,255, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(255,255,255, 0); }
                }

                @media (max-width: 1024px) {
                    .overview-grid { grid-template-columns: 1fr; gap: 4rem; }
                    .overview-sidebar { position: static; }
                }

                @media (max-width: 768px) {
                    .nav-item span:last-child { display: none; }
                    .stat-divider { height: 1px; width: 60px; background: rgba(255,255,255,0.1); }
                    .hero-stats { flex-direction: column; }
                    .monument-card { grid-template-columns: 1fr; padding: 2rem; gap: 2rem; }
                    .mon-icon-container { width: 100px; height: 100px; }
                    .hero-title { font-size: 4rem; }
                }
            `}</style>
        </motion.div>
    );
}
