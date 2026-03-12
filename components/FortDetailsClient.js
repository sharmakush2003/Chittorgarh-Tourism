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
                    background: #0a0804 !important;
                    color: #fff;
                    min-height: 100vh;
                    font-family: var(--ff-body);
                    overflow-x: hidden;
                    display: block;
                    position: relative;
                }

                .mesh-bg-fixed {
                    position: fixed;
                    inset: 0;
                    background: 
                        radial-gradient(circle at 0% 0%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 100% 100%, rgba(184, 134, 11, 0.05) 0%, transparent 50%);
                    pointer-events: none;
                    z-index: 1;
                }

                /* --- Global Heading Polish --- */
                h1, h2, h3, h4, .timeline-year {
                    font-family: var(--ff-display) !important;
                }

                /* Royal Hindi Rule */
                :global([lang="hi"]) .hero-title,
                :global([lang="hi"]) .section-title,
                :global([lang="hi"]) .timeline-year,
                :global([lang="hi"]) .mon-name {
                    font-family: var(--font-martel), serif !important;
                    font-weight: 900 !important;
                }

                /* --- Hero --- */
                .fort-hero {
                    min-height: 80svh;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    overflow: hidden;
                    padding: 4rem 1.5rem;
                    z-index: 2;
                }

                .hero-bg {
                    position: absolute;
                    inset: 0;
                    background: url('/hero_bg.png') no-repeat center center / cover;
                    z-index: -2;
                }

                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, 
                        rgba(10, 8, 4, 0.3) 0%, 
                        rgba(10, 8, 4, 0.8) 100%
                    );
                    z-index: -1;
                }

                .hero-content {
                    max-width: 800px;
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
                    opacity: 0.8;
                }

                .hero-eyebrow {
                    display: block;
                    letter-spacing: 6px;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    color: var(--gold);
                    margin-bottom: 1.5rem;
                    font-weight: 700;
                }

                .hero-title {
                    font-size: clamp(2.8rem, 10vw, 7rem);
                    line-height: 1;
                    margin-bottom: 1.5rem;
                    color: #fff;
                    text-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }

                .hero-desc {
                    font-size: clamp(1rem, 2.5vw, 1.25rem);
                    color: rgba(255,255,255,0.8);
                    max-width: 600px;
                    margin: 0 auto 3rem;
                    line-height: 1.6;
                    font-weight: 300;
                }

                .hero-stats {
                    display: flex;
                    justify-content: center;
                    gap: clamp(1rem, 5vw, 3rem);
                    padding-top: 2rem;
                    border-top: 1px solid rgba(212, 175, 55, 0.2);
                }

                .stat-val {
                    display: block;
                    font-size: clamp(1.5rem, 4vw, 2.8rem);
                    color: var(--gold);
                    font-family: var(--ff-display);
                    line-height: 1;
                    margin-bottom: 0.25rem;
                }

                .stat-label {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    opacity: 0.6;
                }

                /* --- Nav --- */
                .fort-nav {
                    position: sticky;
                    top: 0;
                    background: rgba(10, 8, 4, 0.95);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    z-index: 100;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.1);
                }

                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                    padding: 0;
                }

                .nav-item {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.5);
                    padding: 1.25rem 1.5rem;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 2px;
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

                /* --- Sections --- */
                .fort-main {
                    position: relative;
                    z-index: 2;
                }

                .fort-section {
                    padding: clamp(4rem, 15vh, 8rem) 1.5rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    height: auto;
                }

                .section-header {
                    margin-bottom: 4rem;
                    text-align: center;
                }

                .section-title {
                    font-size: clamp(2.2rem, 6vw, 4.5rem);
                    margin-bottom: 1rem;
                    color: var(--gold);
                }

                .title-divider {
                    width: 60px;
                    height: 2px;
                    background: var(--gold);
                    margin: 0 auto;
                }

                /* --- History --- */
                .history-timeline {
                    max-width: 850px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .timeline-item {
                    display: grid;
                    grid-template-columns: 140px 1fr;
                    gap: 2rem;
                    padding: 2rem;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(212, 175, 55, 0.1);
                    transition: 0.4s;
                }

                .timeline-year {
                    font-size: 1.5rem;
                    color: var(--gold);
                    line-height: 1;
                    border-right: 1px solid rgba(212, 175, 55, 0.3);
                    padding-right: 1.5rem;
                    display: flex;
                    align-items: center;
                }

                .timeline-title {
                    font-size: 1.4rem;
                    color: #fff;
                    margin-bottom: 0.5rem;
                }

                .timeline-content p {
                    color: rgba(255,255,255,0.7);
                    line-height: 1.7;
                }

                /* --- Monuments --- */
                .monuments-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 2rem;
                }

                .monument-card {
                    background: #15110d;
                    border: 1px solid rgba(212, 175, 55, 0.15);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    height: auto !important;
                }

                .mon-icon-container {
                    width: 100%;
                    aspect-ratio: 16/9;
                    background: rgba(10, 8, 4, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }

                .mon-icon { font-size: 4rem; opacity: 0.9; }

                .mon-tag {
                    position: absolute;
                    top: 1rem;
                    left: 1rem;
                    background: var(--gold);
                    color: #000;
                    padding: 0.25rem 0.75rem;
                    font-size: 0.7rem;
                    font-weight: 800;
                    text-transform: uppercase;
                }

                .mon-content {
                    padding: 2rem;
                    flex: 1;
                }

                .mon-name {
                    font-size: 1.6rem;
                    color: #fff;
                    margin-bottom: 0.75rem;
                }

                .audio-btn {
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid var(--gold);
                    color: var(--gold);
                    padding: 0.5rem 1rem;
                    font-size: 0.7rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                    letter-spacing: 1px;
                }

                .mon-desc {
                    color: rgba(255,255,255,0.6);
                    line-height: 1.6;
                    font-size: 0.95rem;
                }

                /* --- Gallery --- */
                .fort-gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }

                .gallery-item {
                    aspect-ratio: 1;
                    overflow: hidden;
                    border: 1px solid rgba(212, 175, 55, 0.1);
                }

                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                /* --- Mobile --- */
                @media (max-width: 768px) {
                    .nav-container { overflow-x: auto; justify-content: flex-start; }
                    .nav-item { padding: 1rem; font-size: 0.65rem; }
                    .nav-icon-wrapper { display: none; }
                    
                    .hero-section { min-height: 90svh; }
                    .hero-title { font-size: 3rem; }
                    .hero-stats { flex-direction: column; gap: 1.5rem; align-items: center; }
                    .stat-divider { display: none; }

                    .timeline-item { grid-template-columns: 1fr; gap: 1rem; padding: 1.5rem; }
                    .timeline-year { border-right: none; border-bottom: 1px solid var(--gold); padding: 0 0 0.5rem 0; width: fit-content; }
                    
                    .monuments-list { grid-template-columns: 1fr; }
                    .fort-gallery-grid { grid-template-columns: repeat(2, 1fr); }
                }
            `}</style>
        </motion.div>
    );
}
