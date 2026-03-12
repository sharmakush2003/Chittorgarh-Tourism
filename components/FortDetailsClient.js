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
                    overflow-x: hidden;
                    display: block; /* Ensure no flex-stretch from parent */
                }

                /* --- Global Heading Polish --- */
                h1, h2, h3, h4, .timeline-year {
                    font-family: var(--ff-display) !important;
                }

                /* --- Hero --- */
                .fort-hero {
                    min-height: 70vh;
                    height: 100svh;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    overflow: hidden;
                    padding-top: 60px;
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
                        rgba(15, 10, 6, 0.4) 0%, 
                        rgba(15, 10, 6, 0.6) 60%,
                        rgba(15, 10, 6, 1) 100%
                    );
                }

                .hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 1000px;
                    padding: 0 1.5rem;
                    height: auto;
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--gold);
                    font-size: 0.75rem;
                    margin-bottom: 2rem;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    font-weight: 600;
                }

                .hero-eyebrow {
                    display: block;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    font-size: 0.7rem;
                    color: var(--gold);
                    margin-bottom: 1rem;
                    font-weight: 600;
                }

                .hero-title {
                    font-size: clamp(2.5rem, 8vw, 6rem);
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                    font-weight: 500;
                    color: #fff;
                }

                .hero-desc {
                    font-size: 1rem;
                    color: rgba(255,255,255,0.7);
                    max-width: 600px;
                    margin: 0 auto 3rem;
                    line-height: 1.6;
                }

                .hero-stats {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    flex-wrap: wrap;
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                }

                .stat-val {
                    font-size: clamp(1.5rem, 4vw, 2.5rem);
                    color: var(--gold);
                }

                /* --- Nav --- */
                .fort-nav {
                    position: sticky;
                    top: 0;
                    background: rgba(15, 10, 6, 0.9);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    z-index: 100;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }

                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    overflow-x: auto;
                    padding: 0 1rem;
                }

                .nav-item {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.4);
                    padding: 1rem 1.5rem;
                    font-size: 0.7rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    white-space: nowrap;
                    flex-shrink: 0;
                }

                .nav-item.active { color: var(--gold); }

                /* --- Main Content --- */
                .fort-main {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 4rem 1.5rem;
                    display: block;
                    height: auto;
                }

                .fort-section {
                    margin-bottom: 6rem;
                    padding: 0;
                    height: auto;
                    display: block;
                }

                .section-header {
                    margin-bottom: 3rem;
                    text-align: center;
                }

                .section-title {
                    font-size: clamp(2rem, 5vw, 3.5rem);
                    margin-bottom: 1rem;
                    background: linear-gradient(to bottom, #fff, var(--gold));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .title-divider {
                    width: 40px;
                    height: 2px;
                    background: var(--gold);
                    margin: 0 auto;
                }

                /* --- Overview --- */
                .overview-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 3rem;
                }

                .lead-para {
                    font-size: 1.2rem;
                    color: var(--gold-light);
                    margin-bottom: 1.5rem;
                    line-height: 1.5;
                    font-style: italic;
                }

                .overview-text p {
                    color: rgba(255,255,255,0.7);
                    line-height: 1.8;
                    margin-bottom: 1.5rem;
                    font-size: 0.95rem;
                }

                .overview-sidebar {
                    height: auto;
                    min-height: auto;
                }

                /* --- History (Fixed Spacing) --- */
                .history-timeline {
                    position: relative;
                    max-width: 800px;
                    margin: 0 auto;
                    padding-left: 2rem;
                    height: auto;
                    display: block;
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
                    margin-bottom: 3rem;
                    height: auto;
                    display: block;
                }

                .timeline-item:last-child { margin-bottom: 0; }

                .timeline-dot {
                    position: absolute;
                    left: -2rem;
                    top: 0.6rem;
                    width: 8px;
                    height: 8px;
                    background: var(--gold);
                    border-radius: 50%;
                    transform: translateX(-50%);
                }

                .timeline-year {
                    font-size: 1.5rem;
                    color: var(--gold);
                    margin-bottom: 0.25rem;
                    line-height: 1;
                }

                .timeline-title {
                    font-size: 1.1rem;
                    margin-bottom: 0.75rem;
                    color: rgba(255,255,255,0.9);
                }

                .timeline-content p {
                    color: rgba(255,255,255,0.6);
                    line-height: 1.6;
                    font-size: 0.9rem;
                }

                /* --- Monuments (Strict Height) --- */
                .monuments-list {
                    display: grid;
                    gap: 1.5rem;
                    height: auto;
                }

                .monument-card {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    border-radius: 20px;
                    height: auto !important;
                    min-height: auto !important;
                }

                .mon-icon-container {
                    width: 70px;
                    height: 70px;
                    background: rgba(212, 175, 55, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 16px;
                    flex-shrink: 0;
                }

                .mon-icon { font-size: 2.2rem; }

                .mon-content { height: auto; }

                .mon-top {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .mon-name {
                    font-size: 1.5rem;
                    color: var(--gold);
                    line-height: 1.2;
                }

                .audio-btn {
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid var(--gold);
                    color: var(--gold);
                    padding: 0.6rem 1.2rem;
                    border-radius: 100px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                    font-weight: 600;
                    width: fit-content;
                }

                .mon-desc {
                    color: rgba(255,255,255,0.7);
                    line-height: 1.6;
                    margin-bottom: 1rem;
                    font-size: 0.9rem;
                }

                /* --- Gallery --- */
                .fort-gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }

                .gallery-item {
                    aspect-ratio: 1;
                    border-radius: 12px;
                    overflow: hidden;
                }

                @media (min-width: 768px) {
                    .monument-card { flex-direction: row; padding: 2.5rem; align-items: flex-start; }
                    .mon-icon-container { width: 100px; height: 100px; }
                    .mon-icon { font-size: 3rem; }
                    .mon-top { flex-direction: row; justify-content: space-between; align-items: center; }
                    .audio-btn { width: auto; }
                    .fort-gallery-grid { grid-template-columns: repeat(3, 1fr); }
                    .section-header { margin-bottom: 5rem; }
                    .fort-section { margin-bottom: 10rem; }
                    .hero-title { font-size: clamp(3.5rem, 8vw, 8rem); }
                    .overview-grid { grid-template-columns: 1.2fr 0.8fr; }
                }

                @media (max-width: 767px) {
                    .overview-grid { grid-template-columns: 1fr; }
                    .overview-sidebar { margin-top: 2rem; }
                    .stat-divider { display: none; }
                    .stat-item { padding: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); width: 100%; text-align: center; }
                    .stat-item:last-child { border-bottom: none; }
                    .nav-item span:last-child { display: none; }
                }
            `}</style>
        </motion.div>
    );
}
