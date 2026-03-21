"use client";

import { useLanguage } from "@/context/LanguageContext";
import React, { useState, useEffect, useRef } from "react";
import { 
    Play, 
    Pause, 
    Clock, 
    Shield, 
    History, 
    ArrowLeft,
    MapPin,
    ScrollText,
    ChevronDown,
    ChevronUp,
    Camera,
    Info,
    Palette,
    Columns,
    Gem,
    Globe
} from "lucide-react";
import { useRouter } from "next/navigation";
import GoldenHourTracker from "./GoldenHourTracker";
import { motion } from "framer-motion";
import { triggerHaptic } from "@/lib/haptics";

export default function KalikaTempleClient() {
    const { t, lang } = useLanguage();
    const router = useRouter();
    const [playingAudio, setPlayingAudio] = useState(null);
    const [expandedSections, setExpandedSections] = useState({});
    const voicesRef = useRef([]);

    // Pre-load voices for better reliability
    useEffect(() => {
        const updateVoices = () => {
            voicesRef.current = window.speechSynthesis.getVoices();
        };
        updateVoices();
        window.speechSynthesis.onvoiceschanged = updateVoices;
        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);



    const ARCH_FEATURES = [
        { id: "mandapa", icon: <Columns size={20} /> },
        { id: "sanctum", icon: <Gem size={20} /> },
        { id: "facade", icon: <Palette size={20} /> }
    ];

    const handleAudioPlay = (sectionId, customText = null) => {
        const synth = window.speechSynthesis;
        synth.cancel();

        if (playingAudio === sectionId) {
            setPlayingAudio(null);
            return;
        }

        const textToSpeak = customText || `${t(`attr.kalika_arch.${sectionId}.name`)}. ${t(`attr.kalika_arch.${sectionId}.desc`)}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        const langMap = {
            'en': 'en-US', 'hi': 'hi-IN'
        };
        const targetLang = langMap[lang] || 'en-US';
        utterance.lang = targetLang;
        
        const voices = voicesRef.current.length > 0 ? voicesRef.current : synth.getVoices();
        const bestVoice = voices.find(v => v.lang.includes(targetLang) && (v.name.includes("Natural") || v.name.includes("Online")))
                       || voices.find(v => v.lang.includes(targetLang) && v.name.includes("Google"))
                       || voices.find(v => v.lang === targetLang)
                       || voices.find(v => v.lang.startsWith(targetLang.split('-')[0]));
        
        if (bestVoice) {
            utterance.voice = bestVoice;
        }
        
        utterance.rate = 0.85; 
        
        utterance.onstart = () => setPlayingAudio(sectionId);
        utterance.onend = () => setPlayingAudio(null);
        utterance.onerror = () => setPlayingAudio(null);

        synth.speak(utterance);
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
                <motion.div 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="hero-bg" 
                    style={{ backgroundImage: "url('/kalika_mata_temple.jpg')", backgroundPosition: 'center 40%' }}
                ></motion.div>
                <div className="hero-overlay"></div>
                
                <motion.div 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="hero-content"
                >
                    <button className="back-btn" onClick={() => {
                        triggerHaptic('light');
                        router.push('/explore');
                    }}>
                        <ArrowLeft size={16} /> {t("btn.back") || "Back"}
                    </button>
                    <span className="hero-eyebrow">{t("kalika.hero.eyebrow")}</span>
                    <h1 className="hero-title" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>{t("kalika.hero.title")}</h1>
                    <p className="hero-desc" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{t("kalika.hero.desc")}</p>
                    
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-val">{t("kalika.stats.age").split(' ')[0]}</span>
                            <span className="stat-label">{t("kalika.stats.age").split(' ').slice(1).join(' ')}</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-val">{t("kalika.stats.type").split(' ')[0]}</span>
                            <span className="stat-label">{t("kalika.stats.type").split(' ').slice(1).join(' ') || "Style"}</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-val">{t("kalika.stats.deity").split(' ')[0]}</span>
                            <span className="stat-label">{t("kalika.stats.deity").split(' ').slice(1).join(' ') || "Deity"}</span>
                        </div>
                    </div>

                </motion.div>
                
                <div className="scroll-indicator">
                    <div className="mouse"></div>
                </div>
            </section>



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
                        <h2 className="section-title text-gold">{t("kalika.section.overview")}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="overview-grid">
                        <div className="overview-text">
                            <p className="lead-para">{t("kalika.overview.p1")}</p>
                            <p>{t("kalika.overview.p2")}</p>
                            <div className="info-chips">
                                <span className="chip"><Clock size={14} /> 6:00 AM - 8:00 PM</span>
                            </div>
                            
                            <button 
                                className={`audio-btn ${playingAudio === 'overview' ? 'playing' : ''}`}
                                onClick={() => handleAudioPlay('overview', `${t("kalika.overview.p1")} ${t("kalika.overview.p2")}`)}
                                style={{ marginTop: '2rem' }}
                            >
                                {playingAudio === 'overview' ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                                <span>{playingAudio === 'overview' ? t("fort.audio.playing") : t("fort.audio.listen")}</span>
                            </button>
                        </div>
                        <div className="overview-sidebar">
                            <div style={{ width: '100%', aspectRatio: '16/10', borderRadius: '16px', overflow: 'hidden', marginBottom: '2rem', border: '1px solid rgba(212,175,55,0.2)' }}>
                                <img src="/kalika_mata_temple.jpg" alt={t("kalika.hero.title")} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
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
                        <h2 className="section-title text-gold">{t("kalika.section.history")}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="history-timeline">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="timeline-item premium-glass">
                                <div className="timeline-content">
                                    <h3 className="timeline-year">{t(`kalika.history.era${i}.year`)}</h3>
                                    <h4 className="timeline-title">{t(`kalika.history.era${i}.title`)}</h4>
                                    <p>{t(`kalika.history.era${i}.desc`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* ═══ ARCHITECTURE ══════════════════════════ */}
                <section id="architecture" className="fort-section">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header"
                    >
                        <h2 className="section-title text-gold">{t("kalika.section.architecture")}</h2>
                        <div className="title-divider"></div>
                    </motion.div>

                    <div className="monuments-list">
                        {ARCH_FEATURES.map((m, idx) => (
                            <motion.div 
                                key={m.id} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="monument-card premium-glass"
                            >


                                <div className="mon-content">
                                    <h3 className="mon-name" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ color: 'var(--gold)' }}>{m.icon}</span> 
                                        {t(`attr.kalika_arch.${m.id}.name`)}
                                    </h3>
                                    <p className={`mon-desc ${expandedSections[m.id] ? 'expanded' : ''}`}>
                                        {t(`attr.kalika_arch.${m.id}.desc`)}
                                    </p>
                                    
                                    <button 
                                        className="read-more-btn"
                                        onClick={() => {
                                            setExpandedSections(prev => ({...prev, [m.id]: !prev[m.id]}));
                                        }}
                                    >
                                        {expandedSections[m.id] ? (
                                            <><ChevronUp size={16} /> {t("btn.readLess") || "Read Less"}</>
                                        ) : (
                                            <><ChevronDown size={16} /> {t("btn.readMore") || "Read More"}</>
                                        )}
                                    </button>
                                    
                                    <button 
                                        className={`audio-btn ${playingAudio === m.id ? 'playing' : ''}`}
                                        onClick={() => handleAudioPlay(m.id)}
                                    >
                                        {playingAudio === m.id ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                                        <span>{playingAudio === m.id ? t("fort.audio.playing") : t("fort.audio.listen")}</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <motion.section 
                    id="references" 
                    className="fort-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="section-header">
                        <h2 className="section-title text-gold">{t("kalika.references.title") || "References"}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="premium-glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <Globe size={24} color="var(--gold)" style={{ marginTop: '4px' }} />
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', color: '#fff', fontFamily: 'var(--ff-sans)', fontWeight: '600' }}>{t("kalika.references.wikipedia") || "Wikipedia"}</h3>
                                    <a 
                                        href={t("kalika.references.url") || "https://en.wikipedia.org/wiki/Kalika_Mata_Temple,_Chittorgarh_Fort"} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                    >
                                        Kalika Mata Temple, Chittorgarh Fort <span>→</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </motion.section>
            </main>

            <style jsx global>{`
                :root {
                    --ff-serif: 'Playfair Display', serif;
                    --ff-sans: 'Inter', sans-serif;
                    --gold: #d4af37;
                }

                .fort-page {
                    background: #0a0804 !important;
                    color: #fff;
                    min-height: 100vh;
                    font-family: var(--ff-sans);
                    overflow-x: hidden;
                    display: block;
                    position: relative;
                }

                h1, h2, h3, h4 {
                    font-family: var(--ff-serif);
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    background: linear-gradient(135deg, #fff 0%, var(--gold) 50%, #d4af37 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
                }

                /* --- Global Typography Polish --- */
                .fort-page h1, .fort-page h2, .fort-page h3, .fort-page h4, .fort-page .timeline-year {
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
                    background-size: cover;
                    background-repeat: no-repeat;
                    z-index: -2;
                }

                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, 
                        rgba(10, 8, 4, 0.4) 0%, 
                        rgba(10, 8, 4, 0.85) 100%
                    ) !important;
                    z-index: -1;
                }

                .hero-content {
                    max-width: 900px;
                    width: 100%;
                    z-index: 10;
                }

                .back-btn {
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
                    cursor: pointer;
                    transition: background 0.2s, transform 0.2s;
                    font-family: var(--ff-sans);
                }
                .back-btn:hover {
                    background: rgba(212, 175, 55, 0.35);
                    transform: translateX(-4px);
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
                    gap: 0;
                }

                .stat-val {
                    font-size: clamp(2rem, 6vw, 3.5rem);
                    color: var(--gold);
                    font-family: var(--ff-serif);
                    line-height: 1.1;
                    font-weight: 800;
                }

                .stat-label {
                    font-size: clamp(0.7rem, 2vw, 0.9rem);
                    color: rgba(255, 255, 255, 0.8);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-weight: 600;
                    margin-top: 0;
                }

                .stat-divider {
                    width: 1px;
                    height: 40px;
                    background: rgba(212, 175, 55, 0.3);
                }

                    border-bottom: 2px solid var(--gold);
                }

                /* --- Sections --- */
                .fort-main {
                    display: block;
                    width: 100%;
                }

                .fort-section {
                    display: block;
                    position: relative;
                    height: auto !important;
                    min-height: auto !important;
                    padding: 5rem 1.5rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    background: #0a0804 !important;
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
                    gap: 3.5rem;
                    position: relative;
                }

                .timeline-item {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    padding: 2.5rem;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(212, 175, 55, 0.15);
                    border-radius: 16px;
                    position: relative;
                    transition: all 0.4s ease;
                }

                .timeline-item:hover {
                    border-color: var(--gold);
                    background: rgba(212, 175, 55, 0.05);
                    transform: translateY(-5px);
                }

                @media (min-width: 768px) {
                    .timeline-item {
                        flex-direction: row;
                        align-items: center;
                        gap: 4rem;
                        padding: 4rem;
                    }
                    .timeline-item:nth-child(even) {
                        flex-direction: row-reverse;
                    }
                }

                .timeline-img-wrapper {
                    width: 100%;
                    flex: 1;
                    max-width: 450px;
                    aspect-ratio: 16/10;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    box-shadow: 0 15px 40px rgba(0,0,0,0.6);
                }

                .timeline-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
                }

                .timeline-item:hover .timeline-img {
                    transform: scale(1.1);
                }

                .timeline-content {
                    flex: 1.2;
                }

                .timeline-year {
                    font-size: 2.2rem;
                    color: var(--gold);
                    margin-bottom: 1.5rem;
                    display: inline-block;
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
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
                }

                .monument-card:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(212, 175, 55, 0.4);
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(212, 175, 55, 0.1);
                }

                .mon-image-wrapper {
                    width: 100%;
                    height: 220px;
                    position: relative;
                    overflow: hidden;
                }

                .mon-card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .monument-card:hover .mon-card-img {
                    transform: scale(1.1);
                }

                .mon-content {
                    padding: 2rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .mon-desc {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.8);
                    margin-bottom: 1rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .mon-desc.expanded {
                    -webkit-line-clamp: unset;
                    display: block;
                }

                .read-more-btn {
                    background: none;
                    border: none;
                    color: var(--gold);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    margin-top: 1rem;
                    margin-bottom: 1.5rem;
                    font-weight: 700;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .read-more-btn:hover {
                    color: #fff;
                    text-shadow: 0 0 10px rgba(212,175,55,0.5);
                    transform: translateX(5px);
                }

                .mon-name {
                    font-size: 1.8rem;
                    margin-bottom: 1rem;
                }

                .audio-btn {
                    background: rgba(212, 175, 15, 0.1);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    color: var(--gold) !important;
                    padding: 0.8rem 1.5rem;
                    font-size: 0.85rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.8rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                    width: 100%;
                    margin-top: auto;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .audio-btn:hover {
                    background: var(--gold);
                    color: #000 !important;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.4);
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
                    
                    .overview-grid { gap: 2rem; }
                    .overview-sidebar { order: -1; }
                    
                    .timeline-item { padding: 2rem 1.5rem; }
                    .timeline-year { font-size: 1.8rem; }
                    .timeline-title { font-size: 1.4rem; }
                    
                    .mon-content { padding: 1.5rem; }
                    .mon-name { font-size: 1.5rem; }
                }

                /* Custom Mesh Background */
                .mesh-bg {
                    background-image: 
                        radial-gradient(circle at 0% 0%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 100% 100%, rgba(212, 175, 55, 0.05) 0%, transparent 50%) !important;
                }
            `}</style>
        </motion.div>
    );
}
