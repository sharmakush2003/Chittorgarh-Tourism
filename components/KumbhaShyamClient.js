"use client";

import { useLanguage } from "@/context/LanguageContext";
import React, { useState, useEffect, useRef } from "react";
import { 
    Play, 
    Pause, 
    ArrowLeft,
    Globe
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { triggerHaptic } from "@/lib/haptics";

export default function KumbhaShyamClient() {
    const { t, lang } = useLanguage();
    const router = useRouter();
    const [playingAudio, setPlayingAudio] = useState(null);
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

    const handleAudioPlay = (sectionId, text) => {
        const synth = window.speechSynthesis;
        synth.cancel();

        if (playingAudio === sectionId) {
            setPlayingAudio(null);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        const langMap = { 'en': 'en-US', 'hi': 'hi-IN' };
        const targetLang = langMap[lang] || 'en-US';
        utterance.lang = targetLang;
        
        const voices = voicesRef.current.length > 0 ? voicesRef.current : synth.getVoices();
        const bestVoice = voices.find(v => v.lang.includes(targetLang) && (v.name.includes("Natural") || v.name.includes("Online")))
                       || voices.find(v => v.lang.includes(targetLang) && v.name.includes("Google"))
                       || voices.find(v => v.lang === targetLang);
        
        if (bestVoice) utterance.voice = bestVoice;
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
            <style jsx global>{`
                .reference-link {
                    color: var(--gold);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all 0.3s;
                    border-bottom: 1px solid transparent;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .reference-link:hover {
                    border-bottom-color: var(--gold);
                    opacity: 0.8;
                }
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

                .fort-page p {
                    color: rgba(255, 255, 255, 0.98) !important;
                    line-height: 1.8;
                    font-size: 1.15rem;
                    margin: 0 0 1.5rem 0;
                    text-align: center;
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

                /* --- Nav --- */
                .section-nav {
                    position: sticky;
                    top: 0;
                    background: rgba(10, 8, 4, 0.95);
                    backdrop-filter: blur(10px);
                    z-index: 100;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
                    padding: 1.25rem 0;
                }
                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                    gap: 3rem;
                }
                .nav-container a {
                    color: rgba(255, 255, 255, 0.6);
                    text-decoration: none;
                    text-transform: uppercase;
                    font-size: 0.85rem;
                    font-weight: 700;
                    letter-spacing: 1.5px;
                    transition: all 0.3s;
                }
                .nav-container a:hover {
                    color: var(--gold);
                    text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
                }

                /* --- Sections --- */
                .fort-main {
                    display: block;
                    width: 100%;
                }

                .fort-section {
                    display: block;
                    position: relative;
                    padding: 8rem 1.5rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    background: transparent;
                }

                .section-header {
                    margin-bottom: 4rem;
                    text-align: center;
                }

                .section-title {
                    font-size: clamp(2.2rem, 6vw, 3.5rem);
                    margin-bottom: 1.5rem;
                    color: var(--gold) !important;
                }

                .title-divider {
                    width: 80px;
                    height: 3px;
                    background: var(--gold);
                    margin: 0 auto;
                }

                .overview-text {
                    max-width: 800px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .lead-para {
                    font-size: 1.25rem !important;
                    font-weight: 500;
                }

                .audio-btn {
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    color: var(--gold) !important;
                    padding: 1rem 2rem;
                    font-size: 0.9rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.4s;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                }

                .audio-btn:hover {
                    background: var(--gold);
                    color: #000 !important;
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(212, 175, 55, 0.3);
                }

                .audio-btn.playing {
                    background: #fff;
                    color: #000 !important;
                    border-color: #fff;
                }

                .mesh-bg::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px);
                    background-size: 30px 30px;
                    z-index: -1;
                }

                .scroll-indicator {
                    position: absolute;
                    bottom: 2rem;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                    z-index: 10;
                }

                .mouse {
                    width: 26px;
                    height: 42px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 20px;
                    position: relative;
                }

                .mouse::after {
                    content: '';
                    width: 4px;
                    height: 8px;
                    background: var(--gold);
                    position: absolute;
                    top: 8px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-radius: 2px;
                    animation: scroll 2s infinite;
                }

                @keyframes scroll {
                    0% { transform: translateX(-50%) translateY(0); opacity: 1; }
                    100% { transform: translateX(-50%) translateY(20px); opacity: 0; }
                }

                @media (max-width: 768px) {
                    .fort-hero { padding-top: 6rem; padding-bottom: 4rem; min-height: 100vh; }
                    .hero-title { font-size: 2.5rem; line-height: 1.15; }
                    .nav-container { gap: 1.5rem; }
                    .nav-container a { font-size: 0.7rem; }
                    .fort-section { padding: 5rem 1.25rem; }
                    .section-title { font-size: 2.2rem; }
                }

                html {
                    scroll-behavior: smooth;
                }
            `}</style>

            {/* ═══ HERO SECTION ═══════════════════════════ */}
            <section className="fort-hero">
                <div className="hero-bg" style={{ backgroundImage: "url('/kumbha_shyam_temple.jpg')", backgroundPosition: 'center center' }}></div>
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
                    <span className="hero-eyebrow">{t("kumbha_shyam.hero.eyebrow")}</span>
                    <h1 className="hero-title">{t("kumbha_shyam.hero.title")}</h1>
                    <p className="hero-desc">{t("kumbha_shyam.hero.desc")}</p>
                </motion.div>
                
                <div className="scroll-indicator"><div className="mouse"></div></div>
            </section>

            {/* ═══ NAVIGATION ═════════════════════════════ */}
            <nav className="section-nav">
                <div className="nav-container">
                    <a href="#history">{t("kumbha_shyam.nav.history")}</a>
                    <a href="#architecture">{t("kumbha_shyam.nav.architecture")}</a>
                    <a href="#references">{t("kumbha_shyam.nav.references")}</a>
                </div>
            </nav>

            <main className="fort-main">
                {/* ═══ HISTORY / CHRONICLES ══════════════════ */}
                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    id="history" 
                    className="fort-section mesh-bg"
                >
                    <div className="section-header">
                        <h2 className="section-title text-gold">{t("kumbha_shyam.section.history")}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="overview-text">
                        <p className="lead-para">{t("kumbha_shyam.history.p1")}</p>
                        
                        <button 
                            className={`audio-btn ${playingAudio === 'history' ? 'playing' : ''}`}
                            onClick={() => handleAudioPlay('history', t("kumbha_shyam.history.p1"))}
                            style={{ marginTop: '2rem' }}
                        >
                            {playingAudio === 'history' ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                            <span>{playingAudio === 'history' ? t("fort.audio.playing") : t("fort.audio.listen")}</span>
                        </button>
                    </div>
                </motion.section>

                {/* ═══ ARCHITECTURE ══════════════════════════ */}
                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    id="architecture" 
                    className="fort-section"
                >
                    <div className="section-header">
                        <h2 className="section-title text-gold">{t("kumbha_shyam.section.architecture")}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="overview-text">
                        <p className="lead-para">{t("kumbha_shyam.architecture.p1")}</p>
                        
                        <button 
                            className={`audio-btn ${playingAudio === 'architecture' ? 'playing' : ''}`}
                            onClick={() => handleAudioPlay('architecture', t("kumbha_shyam.architecture.p1"))}
                            style={{ marginTop: '2rem' }}
                        >
                            {playingAudio === 'architecture' ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                            <span>{playingAudio === 'architecture' ? t("fort.audio.playing") : t("fort.audio.listen")}</span>
                        </button>
                    </div>
                </motion.section>

                {/* ═══ REFERENCES ═════════════════════════════ */}
                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    id="references"
                    className="fort-section mesh-bg"
                    style={{ paddingBottom: '4rem' }}
                >
                    <div className="section-header">
                        <h2 className="section-title text-gold" style={{ fontSize: '1.5rem' }}>{t("kumbha_shyam.section.references")}</h2>
                        <div className="title-divider" style={{ width: '40px' }}></div>
                    </div>
                    <div className="overview-text" style={{ gap: '1rem' }}>
                        <a 
                            href={t("kumbha_shyam.references.official_url")} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="reference-link"
                        >
                            <Globe size={18} /> {t("kumbha_shyam.references.official")}
                        </a>
                    </div>
                </motion.section>
            </main>
        </motion.div>
    );
}
