"use client";

import { useLanguage } from "@/context/LanguageContext";
import React, { useState, useEffect, useRef } from "react";
import { 
    Play, 
    Pause, 
    ArrowLeft,
    ChevronDown,
    ChevronUp,
    Trees,
    Bird,
    Wind,
    Globe
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { triggerHaptic } from "@/lib/haptics";
import { Waveform } from "./Waveform";
import QRScannerButton from "./QRScannerButton";


export default function SitamataClient() {
    const { t, lang } = useLanguage();
    const router = useRouter();
    const [playingAudio, setPlayingAudio] = useState(null);
    const [expandedSections, setExpandedSections] = useState({});
    const voicesRef = useRef([]);

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

    const ATTRACTIONS = [
        { id: "flora", icon: <Trees size={20} /> },
        { id: "fauna", icon: <Bird size={20} /> },
        { id: "squirrel", icon: <Wind size={20} /> }
    ];

    const handleAudioPlay = (sectionId, customText = null) => {
        const synth = window.speechSynthesis;
        synth.cancel();

        if (playingAudio === sectionId) {
            setPlayingAudio(null);
            return;
        }

        const textToSpeak = customText || `${t(`sitamata.wildlife.${sectionId}.title`)}. ${t(`sitamata.wildlife.${sectionId}.desc`)}`;
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
                <div className="hero-bg" style={{ backgroundImage: "url('/images/sitamata_1.jpg')", backgroundPosition: 'center center' }}></div>
...

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
                    <span className="hero-eyebrow">{t("sitamata.hero.eyebrow")}</span>
                    <h1 className="hero-title">{t("sitamata.hero.title")}</h1>
                    <p className="hero-desc">{t("sitamata.hero.desc")}</p>
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
                        <h2 className="section-title text-gold">{t("sitamata.section.overview")}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="overview-grid">
                        <div className="overview-text">
                            <p className="lead-para">{t("sitamata.overview.p1")}</p>
                            <p>{t("sitamata.overview.p2")}</p>
                            
                            <button 
                                className={`audio-btn ${playingAudio === 'overview' ? 'playing' : ''}`}
                                onClick={() => handleAudioPlay('overview', `${t("sitamata.overview.p1")} ${t("sitamata.overview.p2")}`)}
                                style={{ marginTop: '2rem' }}
                            >
                                {playingAudio === 'overview' ? <Waveform /> : <Play size={18} fill="currentColor" />}
                                <span>{playingAudio === 'overview' ? t("fort.audio.playing") : t("fort.audio.listen")}</span>
                            </button>
                        </div>
                    </div>
                </motion.section>

                {/* ═══ GALLERY ══════════════════════════════ */}
                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="fort-section"
                >
                    <div className="section-header">
                        <h2 className="section-title text-gold">{t("fort.section.gallery") || "Sanctuary Gallery"}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="gallery-grid">
                        <div className="gallery-item-large premium-glass">
                            <img src="/images/sitamata_1.jpg" alt="Sitamata 1" />
                        </div>
                        <div className="gallery-item-large premium-glass">
                            <img src="/images/sitamata_2.jpg" alt="Sitamata 2" />
                        </div>
                    </div>
                </motion.section>

                {/* ═══ FEATURES ══════════════════════════ */}
                <section id="wildlife" className="fort-section">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header"
                    >
                        <h2 className="section-title text-gold">{t("sitamata.section.wildlife")}</h2>
                        <div className="title-divider"></div>
                    </motion.div>

                    <div className="monuments-list">
                        {ATTRACTIONS.map((m, idx) => (
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
                                        {t(`sitamata.wildlife.${m.id}.title`)}
                                    </h3>
                                    <p className={`mon-desc ${expandedSections[m.id] ? 'expanded' : ''}`}>
                                        {t(`sitamata.wildlife.${m.id}.desc`)}
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
                                        {playingAudio === m.id ? <Waveform /> : <Play size={18} fill="currentColor" />}
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
                        <h2 className="section-title text-gold">{t("sitamata.references.title")}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="premium-glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <Globe size={24} color="var(--gold)" style={{ marginTop: '4px' }} />
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', color: '#fff', fontFamily: 'var(--ff-sans)', fontWeight: '600' }}>{t("sitamata.references.official")}</h3>
                                    <a 
                                        href={t("sitamata.references.official_url")} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                    >
                                        {t("sitamata.references.official")} <span>→</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </motion.section>

                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <QRScannerButton />
                </div>
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

                .fort-page h1, .fort-page h2, .fort-page h3, .fort-page h4 {
                    line-height: 1.3 !important;
                    margin: 0;
                    padding: 0;
                }

                .fort-page p {
                    color: #fff !important;
                    line-height: 1.8;
                    font-size: 1.15rem;
                    margin-bottom: 2rem;
                }

                :global([data-lang="hi"]) .fort-page {
                    --ff-serif: 'Martel', serif;
                }

                :global([data-lang="hi"]) h1, 
                :global([data-lang="hi"]) h2, 
                :global([data-lang="hi"]) h3 {
                    font-family: 'Martel', serif !important;
                    font-weight: 900 !important;
                    line-height: 1.5 !important;
                }

                :global([data-lang="hi"]) .fort-page p {
                    font-family: 'Martel', serif !important;
                    font-weight: 500 !important;
                    line-height: 1.8 !important;
                }

                .fort-hero {
                    min-height: 80vh; 
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
                        rgba(10, 8, 4, 0.95) 100%
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

                .fort-main {
                    display: block;
                    width: 100%;
                }

                .fort-section {
                    display: block;
                    position: relative;
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

                .overview-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 3rem;
                }
                
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

                .audio-btn.playing {
                    background: #fff;
                    color: #000 !important;
                    border-color: var(--gold);
                    box-shadow: 0 10px 40px rgba(255,255,255,0.3);
                }
 
                .audio-btn.playing :global(svg) {
                    fill: #000;
                }
 
                .audio-btn:hover {
                    background: var(--gold);
                    color: #000 !important;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.4);
                }

                @media (max-width: 768px) {
                    .fort-hero { padding-top: 6rem; padding-bottom: 4rem; min-height: 70vh; }
                    .hero-title { font-size: 2.8rem; line-height: 1.15 !important; }
                    .fort-section { padding: 4rem 1.25rem; }
                    .section-title { font-size: 2.4rem; }
                }

                .mesh-bg {
                    background-image: 
                        radial-gradient(circle at 0% 0%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 100% 100%, rgba(212, 175, 55, 0.05) 0%, transparent 50%) !important;
                }

                .gallery-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                    margin-top: 2rem;
                }

                @media (min-width: 768px) {
                    .gallery-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                }

                .gallery-item-large {
                    border-radius: 24px;
                    overflow: hidden;
                    height: 400px;
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    transition: all 0.5s ease;
                }

                .gallery-item-large img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s ease;
                }

                .gallery-item-large:hover img {
                    transform: scale(1.05);
                }

                .gallery-item-large:hover {
                    border-color: var(--gold);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 55, 0.2);
                }
            `}</style>
        </motion.div>
    );
}
