"use client";

import { useLanguage } from "@/context/LanguageContext";
import React, { useState, useEffect, useRef } from "react";
import {
    Play,
    Pause,
    ArrowLeft,
    Info
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { triggerHaptic } from "@/lib/haptics";
import QRScannerButton from "./QRScannerButton";
import { Waveform } from "./Waveform";


const KineticScroll = ({ progress }) => {
    const width = useTransform(progress, [0, 1], ["0%", "100%"]);
    return (
        <motion.div 
            style={{ 
                position: 'fixed',
                bottom: 0,
                left: 0,
                height: '4px',
                background: 'linear-gradient(90deg, transparent, var(--gold), #fff)',
                zIndex: 1000,
                width,
                boxShadow: '0 -2px 15px var(--gold-glow)'
            }} 
        />
    );
};

export default function VijayStambhClient() {
    const { t, lang } = useLanguage();
    const router = useRouter();
    const [playingAudio, setPlayingAudio] = useState(null);
    const voicesRef = useRef([]);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0, filter: "blur(10px)" },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const sentenceVariants = {
        hidden: { y: 15, opacity: 0, filter: "blur(8px)" },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

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

    const handleAudioPlay = (sectionId, textKey) => {
        const synth = window.speechSynthesis;
        synth.cancel();

        if (playingAudio === sectionId) {
            setPlayingAudio(null);
            return;
        }

        const textToSpeak = t(textKey);
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
            ref={containerRef}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="fort-page"
        >
            <KineticScroll progress={scrollYProgress} />
            <style jsx global>{`
                :root {
                    --ff-serif: 'Playfair Display', serif;
                    --ff-sans: 'Inter', sans-serif;
                    --gold: #d4af37;
                    --gold-glow: rgba(212, 175, 55, 0.3);
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
                    letter-spacing: -0.01em;
                    background: linear-gradient(135deg, #fff 0%, var(--gold) 50%, #d4af37 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
                    position: relative;
                }

                /* Golden Aura Effect */
                .aura-heading {
                    position: relative;
                }
                .aura-heading::before {
                    content: '';
                    position: absolute;
                    inset: -20px -40px;
                    background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
                    z-index: -1;
                    filter: blur(20px);
                    animation: auraPulse 4s infinite alternate ease-in-out;
                }

                @keyframes auraPulse {
                    from { opacity: 0.4; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1.05); }
                }

                .fort-page p {
                    color: #e0e0e0 !important;
                    line-height: 1.8;
                    font-size: 1.15rem;
                    margin-bottom: 2rem;
                    text-align: center;
                }

                /* --- Language Specific --- */
                :global([data-lang="hi"]) .fort-page {
                    --ff-serif: 'Martel', serif;
                }

                :global([data-lang="hi"]) h1, 
                :global([data-lang="hi"]) h2, 
                :global([data-lang="hi"]) h3 {
                    font-family: 'Martel', serif !important;
                    font-weight: 900 !important;
                    line-height: 1.5 !important;
                    letter-spacing: normal !important;
                }

                :global([data-lang="hi"]) .fort-page p {
                    font-family: 'Martel', serif !important;
                    font-weight: 500 !important;
                    line-height: 1.8 !important;
                    letter-spacing: normal !important;
                }

                /* --- Glassmorphism 2.0 --- */
                .glass-panel {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 20px;
                    padding: 3rem;
                    box-shadow: 
                        0 10px 30px rgba(0,0,0,0.5),
                        inset 0 0 20px rgba(212, 175, 55, 0.05);
                    position: relative;
                    transition: border-color 0.4s ease;
                }
                .glass-panel:hover {
                    border-color: rgba(212, 175, 55, 0.4);
                }

                /* --- Hero --- */
                .fort-hero {
                    height: 100vh;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    overflow: hidden;
                    z-index: 2;
                }

                .hero-bg {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: 50% 30%;
                    z-index: -2;
                    will-change: transform;
                }

                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(10, 8, 4, 0.5) 0%, rgba(10, 8, 4, 0.95) 100%);
                    z-index: -1;
                }

                .hero-content {
                    max-width: 1000px;
                    padding: 0 1.5rem;
                    z-index: 10;
                }

                .back-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: #fff;
                    font-size: 0.85rem;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    font-weight: 700;
                    background: rgba(212, 175, 55, 0.1);
                    backdrop-filter: blur(8px);
                    padding: 0.8rem 1.8rem;
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                    margin-bottom: 3rem;
                }
                .back-btn:hover {
                    background: var(--gold);
                    color: #000;
                    transform: translateX(-5px);
                    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.4);
                }

                .hero-eyebrow {
                    display: block;
                    letter-spacing: 6px;
                    text-transform: uppercase;
                    font-size: 0.9rem;
                    color: var(--gold);
                    margin-bottom: 1.5rem;
                    font-weight: 800;
                    opacity: 0.9;
                }

                .hero-title {
                    font-size: clamp(3.5rem, 12vw, 7.5rem);
                    line-height: 1;
                    margin-bottom: 2.5rem;
                    text-shadow: 
                        0 10px 30px rgba(0,0,0,0.8),
                        0 0 100px rgba(0,0,0,0.4);
                }

                .hero-desc {
                    font-size: clamp(1.2rem, 3vw, 1.5rem);
                    max-width: 850px;
                    margin: 0 auto;
                    color: rgba(255, 255, 255, 0.9) !important;
                    font-weight: 400;
                }



                /* --- Sections --- */
                .fort-section {
                    padding: 12rem 1.5rem;
                    position: relative;
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 8rem;
                }

                .section-title {
                    font-size: clamp(3rem, 7vw, 5rem);
                    margin-bottom: 2.5rem;
                    color: var(--gold) !important;
                }

                .title-divider {
                    width: 150px;
                    height: 3px;
                    background: linear-gradient(90deg, transparent, var(--gold), transparent);
                    margin: 0 auto;
                }

                /* --- Audio Control --- */
                .audio-bar {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 60px;
                    padding: 1.25rem 3rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 2rem;
                    margin-top: 4rem;
                    cursor: pointer;
                    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .audio-bar:hover {
                    background: rgba(212, 175, 55, 0.1);
                    border-color: var(--gold);
                    transform: scale(1.05);
                    box-shadow: 0 15px 45px rgba(212, 175, 55, 0.2);
                }
                .audio-bar.playing {
                    background: #fff;
                    color: #000;
                    border-color: var(--gold);
                    box-shadow: 0 10px 40px rgba(255,255,255,0.3);
                }
                .audio-bar.playing :global(svg) {
                    fill: #000;
                }

                .mesh-bg {
                    position: relative;
                }
                .mesh-bg::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: 
                        radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 40%),
                        radial-gradient(circle at 90% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 40%);
                    z-index: -1;
                    pointer-events: none;
                }

                .scroll-indicator {
                    position: absolute;
                    bottom: 3rem;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 10;
                }
                .mouse {
                    width: 30px;
                    height: 54px;
                    border: 2px solid rgba(212, 175, 55, 0.4);
                    border-radius: 15px;
                    position: relative;
                }
                .mouse::after {
                    content: '';
                    width: 5px;
                    height: 10px;
                    background: var(--gold);
                    position: absolute;
                    top: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-radius: 2px;
                    animation: mouseScroll 2.2s infinite ease-in-out;
                    box-shadow: 0 0 8px var(--gold);
                }
                @keyframes mouseScroll {
                    0% { opacity: 0; transform: translateX(-50%) translateY(0); }
                    20% { opacity: 1; }
                    80% { opacity: 0; transform: translateX(-50%) translateY(25px); }
                    100% { opacity: 0; }
                }

                @media (max-width: 768px) {
                    .fort-section { padding: 8rem 1.5rem; }
                    .fort-section { padding: 8rem 1.5rem; }
                    .section-header { margin-bottom: 5rem; }
                    .hero-title { font-size: 4rem; }
                    .hero-desc { font-size: 1.1rem; }
                    .glass-panel { padding: 2rem; }
                }

                html {
                    scroll-behavior: smooth;
                }
            `}</style>

            {/* ═══ HERO SECTION ═══════════════════════════ */}
            <section className="fort-hero">
                <motion.div 
                    style={{ 
                        scale: heroScale,
                        backgroundImage: "url('/vijay_stambh.jpg')"
                    }} 
                    className="hero-bg"
                ></motion.div>
                <div className="hero-overlay"></div>
                
                <motion.div 
                    variants={containerVariants}
                    className="hero-content"
                >
                    <motion.button variants={itemVariants} className="back-btn" onClick={() => router.push('/explore')}>
                        <ArrowLeft size={18} /> {t("btn.back") || "Back"}
                    </motion.button>
                    <motion.span variants={itemVariants} className="hero-eyebrow">{t("vijay.hero.eyebrow")}</motion.span>
                    <motion.h1 variants={itemVariants} className="hero-title aura-heading">{t("vijay.hero.title")}</motion.h1>
                    <motion.p variants={itemVariants} className="hero-desc">
                        {t("vijay.hero.desc")?.split('. ').map((sentence, idx) => (
                            <motion.span 
                                key={idx} 
                                variants={sentenceVariants}
                                style={{ display: 'inline-block', marginRight: '0.4em' }}
                            >
                                {sentence}{idx < t("vijay.hero.desc").split('. ').length - 1 ? '.' : ''}
                            </motion.span>
                        ))}
                    </motion.p>
                </motion.div>
                
                <div className="scroll-indicator"><div className="mouse"></div></div>
            </section>



            <main className="fort-main">
                {/* ═══ HISTORY ═══════════════════════════════ */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    id="history" 
                    className="fort-section mesh-bg"
                >
                    <div className="section-header">
                        <motion.h2 variants={itemVariants} className="section-title aura-heading">{t("vijay.section.history")}</motion.h2>
                        <motion.div variants={itemVariants} className="title-divider"></motion.div>
                    </div>
                    <div className="glass-panel" style={{ textAlign: 'center' }}>
                        <motion.p variants={itemVariants} className="lead-para" style={{ color: '#fff !important', fontSize: '1.3rem', fontWeight: 300 }}>
                            {t("vijay.history.p1")?.split('. ').map((sentence, idx) => (
                                <motion.span key={idx} variants={sentenceVariants} style={{ display: 'inline-block', marginRight: '0.4em' }}>
                                    {sentence}{idx < t("vijay.history.p1").split('. ').length - 1 ? '.' : ''}
                                </motion.span>
                            ))}
                        </motion.p>
                        
                        <motion.div 
                            variants={itemVariants}
                            className={`audio-bar ${playingAudio === 'history' ? 'playing' : ''}`}
                            onClick={() => handleAudioPlay('history', 'vijay.history.p1')}
                        >
                            {playingAudio === 'history' ? <Waveform /> : <Play size={28} fill="currentColor" />}
                            <span style={{ fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', fontSize: '1rem' }}>
                                {playingAudio === 'history' ? (t("fort.audio.playing") || "Playing") : (t("fort.audio.listen") || "Listen Narrative")}
                            </span>
                        </motion.div>
                    </div>
                </motion.section>

                {/* ═══ ARCHITECTURE ═══════════════════════════ */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    id="architecture" 
                    className="fort-section"
                >
                    <div className="section-header">
                        <motion.h2 variants={itemVariants} className="section-title aura-heading">{t("vijay.section.architecture")}</motion.h2>
                        <motion.div variants={itemVariants} className="title-divider"></motion.div>
                    </div>


                    <div className="glass-panel" style={{ textAlign: 'center' }}>
                        <motion.p variants={itemVariants} style={{ color: '#fff !important', fontSize: '1.25rem' }}>
                            {t("vijay.architecture.p1")?.split('. ').map((sentence, idx) => (
                                <motion.span key={idx} variants={sentenceVariants} style={{ display: 'inline-block', marginRight: '0.4em' }}>
                                    {sentence}{idx < t("vijay.architecture.p1").split('. ').length - 1 ? '.' : ''}
                                </motion.span>
                            ))}
                        </motion.p>
                        
                        <motion.div 
                            variants={itemVariants}
                            className={`audio-bar ${playingAudio === 'architecture' ? 'playing' : ''}`}
                            onClick={() => handleAudioPlay('architecture', 'vijay.architecture.p1')}
                        >
                            {playingAudio === 'architecture' ? <Waveform /> : <Play size={28} fill="currentColor" />}
                            <span style={{ fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', fontSize: '1rem' }}>
                                {playingAudio === 'architecture' ? (t("fort.audio.playing") || "Playing") : (t("fort.audio.listen") || "Listen Narrative")}
                            </span>
                        </motion.div>
                    </div>
                </motion.section>

                {/* ═══ EXPERIENCE ═════════════════════════════ */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    id="experience" 
                    className="fort-section mesh-bg"
                >
                    <div className="section-header">
                        <motion.h2 variants={itemVariants} className="section-title aura-heading">{t("vijay.section.experience")}</motion.h2>
                        <motion.div variants={itemVariants} className="title-divider"></motion.div>
                    </div>
                    <div className="glass-panel" style={{ textAlign: 'center' }}>
                        <motion.p variants={itemVariants} style={{ color: '#fff !important', fontSize: '1.25rem' }}>
                            {t("vijay.experience.p1")?.split('. ').map((sentence, idx) => (
                                <motion.span key={idx} variants={sentenceVariants} style={{ display: 'inline-block', marginRight: '0.4em' }}>
                                    {sentence}{idx < t("vijay.experience.p1").split('. ').length - 1 ? '.' : ''}
                                </motion.span>
                            ))}
                        </motion.p>
                        
                        <motion.div 
                            variants={itemVariants}
                            className={`audio-bar ${playingAudio === 'experience' ? 'playing' : ''}`}
                            onClick={() => handleAudioPlay('experience', 'vijay.experience.p1')}
                        >
                            {playingAudio === 'experience' ? <Waveform /> : <Play size={28} fill="currentColor" />}
                            <span style={{ fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', fontSize: '1rem' }}>
                                {playingAudio === 'experience' ? (t("fort.audio.playing") || "Playing") : (t("fort.audio.listen") || "Listen Narrative")}
                            </span>
                        </motion.div>
                    </div>
                </motion.section>

                {/* ═══ REFERENCES ═════════════════════════════ */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="fort-section"
                    style={{ paddingBottom: '10rem' }}
                >
                    <div className="section-inner" style={{ textAlign: 'center' }}>
                        <motion.h2 variants={itemVariants} className="section-title" style={{ fontSize: '2.5rem' }}>{t("vijay.references.title")}</motion.h2>
                        <motion.div variants={itemVariants} className="title-divider" style={{ width: '80px', marginBottom: '4rem' }}></motion.div>
                        
                        <motion.a 
                            variants={itemVariants}
                            href={t("vijay.references.official_url")} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="back-btn"
                            style={{ margin: 0, padding: '1rem 2.5rem' }}
                        >
                            {t("vijay.references.official")}
                        </motion.a>

                        <motion.div variants={itemVariants} style={{ marginTop: '4rem' }}>
                            <QRScannerButton />
                        </motion.div>
                    </div>
                </motion.section>
            </main>

        </motion.div>
    );
}
