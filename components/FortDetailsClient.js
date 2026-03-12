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

            <style jsx global>{`
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

                /* --- Global Typography Polish --- */
                .fort-page h1, .fort-page h2, .fort-page h3, .fort-page h4, .fort-page .timeline-year {
                    font-family: var(--ff-display) !important;
                    line-height: 1.3 !important;
                    margin: 0;
                    padding: 0;
                }

                .fort-page p {
                    color: rgba(255, 255, 255, 0.98) !important;
                    line-height: 1.8;
                    font-size: 1.05rem;
                    margin: 0 0 1.5rem 0;
                }

                /* Hindi High Contrast & Spacing */
                [lang="hi"] .fort-page .hero-title,
                [lang="hi"] .fort-page .section-title,
                [lang="hi"] .fort-page .timeline-year,
                [lang="hi"] .fort-page .mon-name {
                    font-family: var(--font-martel), serif !important;
                    font-weight: 900 !important;
                    line-height: 1.4 !important;
                }

                [lang="hi"] .fort-page p {
                    font-weight: 500 !important;
                    line-height: 1.9;
                }

                /* --- Hero --- */
                .fort-hero {
                    min-height: 100vh; 
                    height: auto;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 8rem 1.5rem 4rem;
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
                        rgba(10, 8, 4, 0.6) 0%, 
                        rgba(10, 8, 4, 0.98) 100%
                    ) !important;
                    z-index: -1;
                }

                .hero-content {
                    max-width: 900px;
                    width: 100%;
                    z-index: 10;
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #fff;
                    font-size: 0.8rem;
                    margin-bottom: 3rem;
                    text-transform: uppercase;
                    font-weight: 800;
                    background: rgba(212, 175, 55, 0.2);
                    padding: 0.75rem 1.5rem;
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    border-radius: 4px;
                }

                .hero-eyebrow {
                    display: block;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    font-size: 0.9rem;
                    color: var(--gold);
                    margin-bottom: 1.5rem;
                    font-weight: 800;
                }

                .hero-title {
                    font-size: clamp(2.5rem, 8vw, 5rem);
                    color: #fff;
                    margin-bottom: 2rem;
                    text-shadow: 0 4px 20px rgba(0,0,0,0.8);
                }

                .hero-desc {
                    font-size: clamp(1rem, 2.5vw, 1.2rem);
                    max-width: 700px;
                    margin: 0 auto 3rem;
                }

                .hero-stats {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 2rem;
                    padding-top: 3rem;
                    border-top: 1px solid rgba(212, 175, 55, 0.3);
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .stat-val {
                    font-size: clamp(1.8rem, 5vw, 3rem);
                    color: var(--gold);
                    font-family: var(--ff-display);
                    margin-bottom: 0.5rem;
                    font-weight: 900;
                }

                .stat-label {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    opacity: 0.9;
                }

                .stat-divider {
                    width: 1px;
                    height: 40px;
                    background: rgba(212, 175, 55, 0.3);
                }

                /* --- Nav --- */
                .fort-nav {
                    position: sticky;
                    top: 0;
                    background: #0a0804 !important;
                    z-index: 100;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
                }

                .nav-container {
                    display: flex;
                    justify-content: center;
                    overflow-x: auto;
                }

                .nav-item {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.7);
                    padding: 1rem 1.5rem;
                    font-size: 0.8rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    white-space: nowrap;
                }

                .nav-item.active { 
                    color: var(--gold);
                    background: rgba(212, 175, 55, 0.1);
                    border-bottom: 2px solid var(--gold);
                }

                /* --- Sections --- */
                .fort-main {
                    display: block;
                    width: 100%;
                }

                .fort-section {
                    display: block; /* crucial for non-overlapping flow */
                    position: relative;
                    height: auto !important;
                    min-height: auto !important;
                    padding: 5rem 1.5rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    background: #0a0804 !important;
                    overflow: hidden; /* contain floats/margins */
                }

                .section-header {
                    margin-bottom: 4rem;
                    text-align: center;
                }

                .section-title {
                    font-size: clamp(2.2rem, 6vw, 4rem);
                    margin-bottom: 1.5rem;
                    color: var(--gold) !important;
                }

                .title-divider {
                    width: 60px;
                    height: 3px;
                    background: var(--gold);
                    margin: 0 auto;
                }

                /* --- Overview --- */
                .overview-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 3rem;
                }
                
                @media (min-width: 900px) {
                    .overview-grid { grid-template-columns: 1.5fr 1fr; }
                }

                .info-chips {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-top: 2rem;
                }

                .chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(255,255,255,0.05);
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                /* --- History --- */
                .history-timeline {
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                }

                .timeline-item {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    padding: 2rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 8px;
                }

                @media (min-width: 768px) {
                    .timeline-item {
                        flex-direction: row;
                        align-items: flex-start;
                        gap: 3rem;
                        padding: 3rem;
                    }
                    .timeline-year {
                        min-width: 150px;
                        border-right: 2px solid rgba(212, 175, 55, 0.5);
                        border-bottom: none;
                        padding-right: 2rem;
                        padding-bottom: 0;
                    }
                }

                .timeline-year {
                    font-size: 2rem;
                    color: var(--gold) !important;
                    border-bottom: 2px solid rgba(212, 175, 55, 0.5);
                    padding-bottom: 1rem;
                }

                .timeline-title {
                    font-size: 1.6rem;
                    margin-bottom: 1rem;
                }

                /* --- Monuments --- */
                .monuments-list {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2.5rem;
                }

                @media (min-width: 768px) {
                    .monuments-list { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 3rem; }
                }

                .monument-card {
                    background: #110d0a !important;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 12px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .mon-icon-container {
                    background: rgba(0,0,0,0.4);
                    padding: 3rem 0;
                    display: flex;
                    justify-content: center;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
                    position: relative;
                }

                .mon-icon { font-size: 3.5rem; }

                .mon-tag {
                    position: absolute;
                    top: 1rem;
                    left: 1rem;
                    background: var(--gold);
                    color: #000;
                    padding: 0.3rem 0.8rem;
                    font-size: 0.7rem;
                    font-weight: 800;
                    border-radius: 4px;
                }

                .mon-content {
                    padding: 2rem;
                    flex: 1;
                }

                .mon-name {
                    font-size: 1.8rem;
                    margin-bottom: 1rem;
                }

                .audio-btn {
                    background: rgba(212, 175, 55, 0.15);
                    border: 1px solid var(--gold);
                    color: var(--gold) !important;
                    padding: 0.6rem 1.2rem;
                    font-size: 0.8rem;
                    font-weight: 700;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                    border-radius: 4px;
                    cursor: pointer;
                }

                /* --- Gallery --- */
                .fort-gallery-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }

                @media (min-width: 600px) {
                    .fort-gallery-grid { grid-template-columns: repeat(2, 1fr); }
                }
                
                @media (min-width: 900px) {
                    .fort-gallery-grid { grid-template-columns: repeat(3, 1fr); }
                }

                .gallery-item {
                    aspect-ratio: 4/3;
                    border-radius: 8px;
                    overflow: hidden;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                }

                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                /* --- Mobile Polish --- */
                @media (max-width: 768px) {
                    .fort-hero { padding-top: 6rem; padding-bottom: 4rem; min-height: 100vh; }
                    .hero-title { font-size: 2.8rem; line-height: 1.15 !important; margin-bottom: 1.5rem; }
                    .hero-desc { font-size: 1rem; margin-bottom: 2rem; }
                    .hero-stats { flex-direction: column; gap: 1.5rem; border-top: none; padding-top: 1rem; }
                    .stat-divider { display: none; }
                    
                    .fort-section { padding: 4rem 1.25rem; }
                    .section-header { margin-bottom: 3rem; }
                    .section-title { font-size: 2.4rem; }
                    
                    .timeline-item { padding: 1.5rem; }
                    .timeline-year { font-size: 1.8rem; }
                    .timeline-title { font-size: 1.5rem; }
                    
                    .mon-content { padding: 1.5rem; }
                    .mon-name { font-size: 1.6rem; }
                    p { font-size: 1rem; line-height: 1.6; }
                }
            `}</style>
        </motion.div>
    );
}
