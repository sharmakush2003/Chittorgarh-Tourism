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
                }

                /* --- Hero --- */
                .fort-hero {
                    min-height: 80vh;
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
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--gold);
                    text-decoration: none;
                    font-size: 0.75rem;
                    margin-bottom: 2rem;
                    opacity: 0.7;
                    transition: 0.3s;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    font-weight: 600;
                }

                .hero-eyebrow {
                    display: block;
                    letter-spacing: clamp(4px, 1.5vw, 8px);
                    text-transform: uppercase;
                    font-size: clamp(0.65rem, 1.5vw, 0.75rem);
                    color: var(--gold);
                    margin-bottom: 1rem;
                    font-weight: 600;
                }

                .hero-title {
                    font-family: var(--ff-display);
                    font-size: clamp(3rem, 10vw, 8rem);
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                    font-weight: 500;
                    word-break: break-word;
                }

                .hero-desc {
                    font-size: clamp(0.9rem, 2vw, 1.1rem);
                    color: rgba(255,255,255,0.7);
                    max-width: 600px;
                    margin: 0 auto 3rem;
                    line-height: 1.6;
                    font-weight: 300;
                }

                .hero-stats {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: clamp(1rem, 4vw, 3rem);
                    flex-wrap: wrap;
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .stat-val {
                    font-family: var(--ff-display);
                    font-size: clamp(1.5rem, 4vw, 3rem);
                    color: var(--gold);
                    font-weight: 500;
                }

                .stat-label {
                    font-size: 0.6rem;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    color: rgba(255,255,255,0.4);
                }

                .stat-divider {
                    width: 1px;
                    height: 30px;
                    background: rgba(255,255,255,0.1);
                }

                /* --- Nav --- */
                .fort-nav {
                    position: sticky;
                    top: 0;
                    background: rgba(15, 10, 6, 0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    z-index: 100;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                }

                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                }

                .nav-item {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.4);
                    padding: 1.25rem 1.5rem;
                    font-size: 0.7rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: 0.3s;
                    flex-shrink: 0;
                }

                .nav-item.active {
                    color: var(--gold);
                    background: rgba(212, 175, 55, 0.05);
                }

                /* --- Main --- */
                .fort-main {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: clamp(4rem, 8vw, 8rem) 1.5rem;
                }

                .fort-section {
                    margin-bottom: clamp(6rem, 12vw, 10rem);
                    scroll-margin-top: 80px;
                    padding: clamp(1.5rem, 5vw, 4rem);
                    border-radius: 32px;
                    overflow: hidden;
                }

                .section-header {
                    margin-bottom: clamp(3rem, 6vw, 5rem);
                    text-align: center;
                }

                .section-title {
                    font-family: var(--ff-display);
                    font-size: clamp(2.2rem, 5vw, 3.5rem);
                    margin-bottom: 1rem;
                    font-weight: 400;
                }

                .title-divider {
                    width: 50px;
                    height: 2px;
                    background: var(--gold);
                    margin: 0 auto;
                }

                /* --- Overview --- */
                .overview-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: flex-start;
                }

                .lead-para {
                    font-size: clamp(1.2rem, 2.5vw, 1.4rem);
                    color: var(--gold-light);
                    margin-bottom: 2rem;
                    line-height: 1.5;
                    font-family: var(--ff-display);
                    font-style: italic;
                }

                .overview-text p {
                    color: rgba(255,255,255,0.7);
                    line-height: 1.8;
                    margin-bottom: 2rem;
                    font-weight: 300;
                }

                .info-chips {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .chip {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(255,255,255,0.03);
                    padding: 0.6rem 1rem;
                    border-radius: 100px;
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.8);
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .overview-sidebar {
                    position: sticky;
                    top: 120px;
                    width: 100%;
                }

                /* --- History --- */
                .history-timeline {
                    position: relative;
                    max-width: 800px;
                    margin: 0 auto;
                    padding-left: clamp(1.5rem, 4vw, 3rem);
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
                    left: clamp(-1.5rem, -4vw, -3rem);
                    top: 0.5rem;
                    width: 10px;
                    height: 10px;
                    background: var(--gold);
                    border-radius: 50%;
                    transform: translateX(-50%);
                    box-shadow: 0 0 10px var(--gold);
                }

                .timeline-year {
                    font-family: var(--ff-display);
                    font-size: clamp(1.52rem, 3vw, 2rem);
                    color: var(--gold);
                    margin-bottom: 0.5rem;
                }

                .timeline-title {
                    font-size: clamp(1.1rem, 2vw, 1.3rem);
                    margin-bottom: 1rem;
                    font-family: var(--ff-display);
                }

                .timeline-content p {
                    color: rgba(255,255,255,0.6);
                    line-height: 1.7;
                    font-size: 0.95rem;
                }

                /* --- Monuments --- */
                .monuments-list {
                    display: grid;
                    gap: 2rem;
                }

                .monument-card {
                    padding: clamp(1.5rem, 4vw, 3rem);
                    display: grid;
                    grid-template-columns: auto 1fr;
                    gap: clamp(1.5rem, 4vw, 3.5rem);
                    border-radius: 24px;
                    align-items: flex-start;
                }

                .mon-icon-container {
                    width: clamp(80px, 15vw, 120px);
                    height: clamp(80px, 15vw, 120px);
                    background: rgba(212, 175, 55, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 20px;
                    flex-shrink: 0;
                }

                .mon-icon {
                    font-size: clamp(2.5rem, 6vw, 4rem);
                }

                .mon-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.5rem;
                    gap: 1rem;
                }

                .mon-name {
                    font-family: var(--ff-display);
                    font-size: clamp(1.4rem, 4vw, 2.2rem);
                    color: var(--gold);
                    line-height: 1.2;
                }

                .audio-btn {
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid var(--gold);
                    color: var(--gold);
                    padding: 0.5rem 1rem;
                    border-radius: 100px;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    transition: 0.3s;
                    font-weight: 600;
                    font-size: 0.7rem;
                    flex-shrink: 0;
                }

                .audio-btn:hover { background: var(--gold); color: #000; }
                .audio-btn.playing { background: #fff; color: #000; animation: pulse 2s infinite; }

                .mon-desc {
                    color: rgba(255,255,255,0.7);
                    line-height: 1.7;
                    margin-bottom: 1.5rem;
                    font-size: 0.95rem;
                }

                .mon-tag {
                    font-size: 0.65rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: rgba(255,255,255,0.4);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 0.3rem 0.8rem;
                    border-radius: 6px;
                }

                /* --- Gallery --- */
                .fort-gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(clamp(250px, 40vw, 350px), 1fr));
                    gap: 1.5rem;
                }

                .gallery-item {
                    aspect-ratio: 16/10;
                    border-radius: 12px;
                    overflow: hidden;
                }

                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: 0.6s;
                }

                .gallery-item:hover img { transform: scale(1.1); }

                @media (max-width: 1024px) {
                    .overview-grid { grid-template-columns: 1fr; gap: 3rem; }
                    .overview-sidebar { position: static; }
                }

                @media (max-width: 640px) {
                    .monument-card { grid-template-columns: 1fr; gap: 1.5rem; }
                    .mon-top { flex-direction: column; align-items: flex-start; gap: 1rem; }
                    .audio-btn { width: 100%; justify-content: center; }
                    .nav-item span:last-child { display: none; }
                    .nav-item { padding: 1rem; }
                    .stat-divider { display: none; }
                    .hero-stats { flex-direction: column; gap: 1.5rem; }
                    .stat-item { padding: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); width: 100%; }
                    .stat-item:last-child { border-bottom: none; }
                }
            `}</style>
        </motion.div>
    );
}
