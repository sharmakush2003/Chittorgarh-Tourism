"use client";

import { useLanguage } from "@/context/LanguageContext";
import React, { useState, useEffect, useRef } from "react";
import { 
    Play, 
    Pause, 
    ArrowLeft,
    Clock,
    Phone,
    Info
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";

const Waveform = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '24px', width: '24px', justifyContent: 'center' }}>
        {[...Array(4)].map((_, i) => (
            <motion.div
                key={i}
                animate={{
                    height: ["8px", "20px", "8px"],
                }}
                transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                }}
                style={{
                    width: '3px',
                    backgroundColor: 'currentColor',
                    borderRadius: '2px'
                }}
            />
        ))}
    </div>
);

export default function LightSoundShowClient() {
    const { t, lang } = useLanguage();
    const router = useRouter();
    const [playingAudio, setPlayingAudio] = useState(null);
    const voicesRef = useRef([]);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const sentenceVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

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
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
                }

                .fort-page p {
                    color: #fff !important;
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

                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(212, 175, 55, 0.15);
                    border-radius: 12px;
                    padding: 2.5rem;
                }

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
                    background-position: center;
                    z-index: -2;
                    will-change: transform;
                }

                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(10, 8, 4, 0.4) 0%, rgba(10, 8, 4, 0.95) 100%);
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
                    font-size: clamp(3rem, 10vw, 6rem);
                    line-height: 1.1;
                    margin-bottom: 2rem;
                    text-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }

                .hero-desc {
                    font-size: clamp(1.1rem, 2.5vw, 1.35rem);
                    max-width: 800px;
                    margin: 0 auto;
                    color: rgba(255, 255, 255, 0.85) !important;
                }

                .section-nav {
                    position: sticky;
                    top: 0;
                    background: rgba(10, 8, 4, 0.85);
                    backdrop-filter: blur(15px);
                    z-index: 100;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
                    padding: 1.25rem 0;
                }
                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                    gap: 4rem;
                }
                .nav-container a {
                    color: rgba(255, 255, 255, 0.5);
                    text-decoration: none;
                    text-transform: uppercase;
                    font-size: 0.85rem;
                    font-weight: 700;
                    letter-spacing: 2px;
                    transition: all 0.3s;
                    position: relative;
                }
                .nav-container a::after {
                    content: '';
                    position: absolute;
                    bottom: -8px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: var(--gold);
                    transition: width 0.3s;
                }
                .nav-container a:hover {
                    color: #fff;
                }
                .nav-container a:hover::after {
                    width: 100%;
                }

                .fort-section {
                    padding: 10rem 1.5rem;
                    position: relative;
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 6rem;
                }

                .section-title {
                    font-size: clamp(2.5rem, 6vw, 4.5rem);
                    margin-bottom: 2rem;
                    color: var(--gold) !important;
                }

                .title-divider {
                    width: 120px;
                    height: 4px;
                    background: var(--gold);
                    margin: 0 auto;
                    border-radius: 2px;
                }

                .audio-bar {
                    background: rgba(10, 8, 4, 0.9);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 50px;
                    padding: 1rem 2.5rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-top: 3rem;
                    cursor: pointer;
                    transition: all 0.4s;
                }
                .audio-bar:hover {
                    background: var(--gold);
                    color: #000;
                    box-shadow: 0 10px 40px rgba(212, 175, 55, 0.4);
                }
                .audio-bar.playing {
                    background: #fff;
                    color: #000;
                    border-color: #fff;
                }

                .light-glow {
                    position: absolute;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
                    pointer-events: none;
                    z-index: -1;
                }

                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .info-card {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(212, 175, 55, 0.1);
                    border-radius: 16px;
                    padding: 3rem;
                    text-align: center;
                    transition: all 0.4s;
                }
                .info-card:hover {
                    background: rgba(212, 175, 55, 0.05);
                    border-color: var(--gold);
                    transform: translateY(-10px);
                }

                .info-icon {
                    color: var(--gold);
                    margin-bottom: 1.5rem;
                    display: inline-block;
                }

                .info-label {
                    display: block;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 0.75rem;
                    margin-bottom: 0.5rem;
                    color: rgba(255, 255, 255, 0.6);
                }

                .info-value {
                    font-family: var(--ff-serif);
                    font-size: 1.5rem;
                    color: #fff;
                    font-weight: 600;
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
                    height: 50px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 15px;
                    position: relative;
                }
                .mouse::after {
                    content: '';
                    width: 4px;
                    height: 8px;
                    background: var(--gold);
                    position: absolute;
                    top: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-radius: 2px;
                    animation: mouseScroll 2s infinite;
                }
                @keyframes mouseScroll {
                    0% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
                }

                @media (max-width: 768px) {
                    .nav-container { gap: 1.5rem; overflow-x: auto; padding: 0 1rem; }
                    .nav-container a { font-size: 0.7rem; white-space: nowrap; }
                    .fort-section { padding: 6rem 1.25rem; }
                    .section-header { margin-bottom: 3rem; }
                    .hero-title { font-size: 3.5rem; }
                    .info-grid { grid-template-columns: 1fr; }
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
                        backgroundImage: "url('/light_sound_show.jpg')"
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
                    <motion.span variants={itemVariants} className="hero-eyebrow">{t("light_show.hero.eyebrow")}</motion.span>
                    <motion.h1 variants={itemVariants} className="hero-title">{t("light_show.hero.title")}</motion.h1>
                    <motion.p variants={itemVariants} className="hero-desc">
                        {t("light_show.hero.desc")?.split('. ').map((sentence, idx) => (
                            <motion.span 
                                key={idx} 
                                variants={sentenceVariants}
                                style={{ display: 'inline-block', marginRight: '0.4em' }}
                            >
                                {sentence}{idx < t("light_show.hero.desc").split('. ').length - 1 ? '.' : ''}
                            </motion.span>
                        ))}
                    </motion.p>
                </motion.div>
                
                <div className="scroll-indicator"><div className="mouse"></div></div>
            </section>

            {/* ═══ NAVIGATION ═════════════════════════════ */}
            <nav className="section-nav">
                <div className="nav-container">
                    <a href="#overview">{t("light_show.nav.overview")}</a>
                    <a href="#experience">{t("light_show.nav.experience")}</a>
                    <a href="#details">{t("light_show.nav.details")}</a>
                </div>
            </nav>

            <main className="fort-main">
                {/* ═══ OVERVIEW ═══════════════════════════════ */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    id="overview" 
                    className="fort-section"
                >
                    <div className="light-glow" style={{ top: '10%', left: '5%' }}></div>
                    <div className="section-header">
                        <motion.h2 variants={itemVariants} className="section-title">{t("light_show.section.overview")}</motion.h2>
                        <motion.div variants={itemVariants} className="title-divider"></motion.div>
                    </div>
                    <div className="glass-panel" style={{ textAlign: 'center' }}>
                        <motion.p variants={itemVariants} className="lead-para" style={{ color: '#fff !important', fontSize: '1.25rem' }}>
                            {t("light_show.overview.p1")?.split('. ').map((sentence, idx) => (
                                <motion.span key={idx} variants={sentenceVariants} style={{ display: 'inline-block', marginRight: '0.4em' }}>
                                    {sentence}{idx < t("light_show.overview.p1").split('. ').length - 1 ? '.' : ''}
                                </motion.span>
                            ))}
                        </motion.p>
                        
                        <motion.div 
                            variants={itemVariants}
                            className={`audio-bar ${playingAudio === 'overview' ? 'playing' : ''}`}
                            onClick={() => handleAudioPlay('overview', 'light_show.overview.p1')}
                        >
                            {playingAudio === 'overview' ? <Waveform /> : <Play size={24} fill="currentColor" />}
                            <span style={{ fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
                                {playingAudio === 'overview' ? t("fort.audio.playing") : t("fort.audio.listen")}
                            </span>
                        </motion.div>
                    </div>
                </motion.section>

                {/* ═══ EXPERIENCE ═══════════════════════════ */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    id="experience" 
                    className="fort-section"
                    style={{ background: 'rgba(20, 15, 10, 0.3)' }}
                >
                    <div className="light-glow" style={{ bottom: '10%', right: '5%' }}></div>
                    <div className="section-header">
                        <motion.h2 variants={itemVariants} className="section-title">{t("light_show.section.experience")}</motion.h2>
                        <motion.div variants={itemVariants} className="title-divider"></motion.div>
                    </div>

                    <div className="glass-panel" style={{ textAlign: 'center' }}>
                        <motion.p variants={itemVariants} style={{ color: '#fff !important' }}>
                            {t("light_show.experience.p1")?.split('. ').map((sentence, idx) => (
                                <motion.span key={idx} variants={sentenceVariants} style={{ display: 'inline-block', marginRight: '0.4em' }}>
                                    {sentence}{idx < t("light_show.experience.p1").split('. ').length - 1 ? '.' : ''}
                                </motion.span>
                            ))}
                        </motion.p>
                        
                        <motion.div 
                            variants={itemVariants}
                            className={`audio-bar ${playingAudio === 'experience' ? 'playing' : ''}`}
                            onClick={() => handleAudioPlay('experience', 'light_show.experience.p1')}
                        >
                            {playingAudio === 'experience' ? <Waveform /> : <Play size={24} fill="currentColor" />}
                            <span style={{ fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
                                {playingAudio === 'experience' ? t("fort.audio.playing") : t("fort.audio.listen")}
                            </span>
                        </motion.div>
                    </div>
                </motion.section>

                {/* ═══ DETAILS ═════════════════════════════ */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    id="details" 
                    className="fort-section"
                >
                    <div className="section-header">
                        <motion.h2 variants={itemVariants} className="section-title">{t("light_show.section.details")}</motion.h2>
                        <motion.div variants={itemVariants} className="title-divider"></motion.div>
                    </div>
                    
                    <div className="info-grid">
                        <motion.div variants={itemVariants} className="info-card">
                            <Clock className="info-icon" size={40} />
                            <span className="info-label">{t("lbl.bestTime") || "Timing"}</span>
                            <span className="info-value">{t("light_show.details.timing")}</span>
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="info-card">
                            <Phone className="info-icon" size={40} />
                            <span className="info-label">{t("lbl.contact") || "Contact"}</span>
                            <span className="info-value">{t("light_show.details.contact")}</span>
                        </motion.div>

                        <motion.div variants={itemVariants} className="info-card">
                            <Info className="info-icon" size={40} />
                            <span className="info-label">{t("lbl.distance") || "Location"}</span>
                            <span className="info-value">{t("light_show.details.location")}</span>
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
                    style={{ paddingBottom: '8rem' }}
                >
                    <div className="section-inner" style={{ textAlign: 'center' }}>
                        <motion.h2 variants={itemVariants} className="section-title" style={{ fontSize: '1.8rem' }}>{t("light_show.references.title")}</motion.h2>
                        <motion.div variants={itemVariants} className="title-divider" style={{ width: '40px', marginBottom: '3rem' }}></motion.div>
                        
                        <motion.a 
                            variants={itemVariants}
                            href={t("light_show.references.official_url")} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="back-btn"
                            style={{ margin: 0 }}
                        >
                            {t("light_show.references.official")}
                        </motion.a>
                    </div>
                </motion.section>
            </main>

        </motion.div>
    );
}
