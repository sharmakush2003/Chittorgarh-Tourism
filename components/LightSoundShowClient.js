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
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '30px', width: '40px', justifyContent: 'center' }}>
        {[...Array(8)].map((_, i) => (
            <motion.div
                key={i}
                animate={{
                    height: ["6px", "24px", "10px", "28px", "6px"],
                    opacity: [0.3, 1, 0.5, 1, 0.3]
                }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                }}
                style={{
                    width: '3px',
                    backgroundColor: 'currentColor',
                    borderRadius: '4px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                }}
            />
        ))}
    </div>
);

const KineticScroll = ({ progress }) => {
    const width = useTransform(progress, [0, 1], ["0%", "100%"]);
    return (
        <motion.div 
            style={{ 
                position: 'fixed',
                bottom: 0,
                left: 0,
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #fff, var(--gold))',
                zIndex: 1000,
                width,
                boxShadow: '0 -2px 15px rgba(255,255,255,0.3)'
            }} 
        />
    );
};

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
                    --light-blue: #ade8f4;
                }

                .fort-page {
                    background: #050505 !important;
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
                    background: linear-gradient(135deg, #fff 0%, var(--gold) 60%, #b8860b 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
                    position: relative;
                }

                /* Dynamic Light Aura */
                .aura-heading {
                    position: relative;
                }
                .aura-heading::before {
                    content: '';
                    position: absolute;
                    inset: -30px -60px;
                    background: radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 75%);
                    z-index: -1;
                    filter: blur(25px);
                    animation: lightTrace 5s infinite outline alternate ease-in-out;
                }

                @keyframes lightTrace {
                    0% { opacity: 0.3; transform: scale(0.9) skewX(-2deg); filter: blur(20px); }
                    50% { opacity: 0.8; transform: scale(1.1) skewX(2deg); filter: blur(30px); }
                    100% { opacity: 0.4; transform: scale(0.95) skewX(-1deg); filter: blur(25px); }
                }

                .fort-page p {
                    color: #e0e0e0 !important;
                    line-height: 1.8;
                    font-size: 1.2rem;
                    margin-bottom: 2rem;
                    text-align: center;
                    font-weight: 300;
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
                    font-weight: 400 !important;
                    line-height: 1.8 !important;
                    letter-spacing: normal !important;
                }

                /* --- Glassmorphism 2.0 --- */
                .glass-panel {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 20px;
                    padding: 3.5rem;
                    box-shadow: 
                        0 15px 45px rgba(0,0,0,0.6),
                        inset 0 0 20px rgba(255,255,255,0.02);
                    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .glass-panel:hover {
                    border-color: rgba(255, 255, 255, 0.4);
                    background: rgba(255, 255, 255, 0.04);
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
                    background: radial-gradient(circle at center, rgba(5, 5, 5, 0.5) 0%, rgba(5, 5, 5, 0.95) 100%);
                    z-index: -1;
                }

                .hero-content {
                    max-width: 1100px;
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
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    padding: 0.8rem 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
                    margin-bottom: 3rem;
                }
                .back-btn:hover {
                    background: #fff;
                    color: #000;
                    transform: translateY(-3px);
                    box-shadow: 0 15px 30px rgba(255,255,255,0.2);
                }

                .hero-eyebrow {
                    display: block;
                    letter-spacing: 8px;
                    text-transform: uppercase;
                    font-size: 1rem;
                    color: var(--gold);
                    margin-bottom: 2rem;
                    font-weight: 800;
                }

                .hero-title {
                    font-size: clamp(3.5rem, 12vw, 7.5rem);
                    line-height: 1;
                    margin-bottom: 3rem;
                    text-shadow: 
                        0 20px 50px rgba(0,0,0,1),
                        0 0 100px rgba(0,0,0,0.8);
                    -webkit-text-stroke: 1px rgba(0,0,0,0.7);
                    position: relative;
                }

                .hero-desc {
                    font-size: clamp(1.2rem, 3vw, 1.5rem);
                    max-width: 900px;
                    margin: 0 auto;
                    color: rgba(255, 255, 255, 0.9) !important;
                }



                .fort-section {
                    padding: 12rem 1.5rem;
                    position: relative;
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 8rem;
                }

                .section-title {
                    font-size: clamp(3rem, 8vw, 5.5rem);
                    margin-bottom: 2.5rem;
                    color: #fff !important;
                }

                .title-divider {
                    width: 150px;
                    height: 3px;
                    background: linear-gradient(90deg, transparent, #fff, transparent);
                    margin: 0 auto;
                    box-shadow: 0 0 10px rgba(255,255,255,0.5);
                }

                .audio-bar {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 60px;
                    padding: 1.25rem 3.5rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 2rem;
                    margin-top: 4rem;
                    cursor: pointer;
                    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .audio-bar:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: #fff;
                    transform: scale(1.05);
                    box-shadow: 0 20px 40px rgba(255,255,255,0.1);
                }
                .audio-bar.playing {
                    background: #fff;
                    color: #000;
                    border-color: #fff;
                    box-shadow: 0 15px 50px rgba(255,255,255,0.4);
                }
                .audio-bar.playing :global(svg) {
                    fill: #000;
                }

                .light-glow {
                    position: absolute;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
                    pointer-events: none;
                    z-index: -1;
                    filter: blur(40px);
                }

                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 3rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .info-card {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 24px;
                    padding: 4rem 2rem;
                    text-align: center;
                    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
                    position: relative;
                    overflow: hidden;
                }
                .info-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
                    opacity: 0;
                    transition: opacity 0.5s ease;
                }
                .info-card:hover {
                    border-color: rgba(212, 175, 55, 0.4);
                    transform: translateY(-15px);
                    box-shadow: 0 30px 60px rgba(0,0,0,0.4);
                }
                .info-card:hover::before {
                    opacity: 1;
                }

                .info-icon {
                    color: var(--gold);
                    margin-bottom: 2rem;
                    display: inline-block;
                    filter: drop-shadow(0 0 10px var(--gold-glow));
                }

                .info-label {
                    display: block;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    font-size: 0.8rem;
                    margin-bottom: 1rem;
                    color: rgba(255, 255, 255, 0.5);
                    font-weight: 700;
                }

                .info-value {
                    font-family: var(--ff-serif);
                    font-size: 1.75rem;
                    color: #fff;
                    font-weight: 600;
                    position: relative;
                }

                .scroll-indicator {
                    position: absolute;
                    bottom: 3rem;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 10;
                }
                .mouse {
                    width: 32px;
                    height: 56px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 16px;
                    position: relative;
                }
                .mouse::after {
                    content: '';
                    width: 6px;
                    height: 12px;
                    background: #fff;
                    position: absolute;
                    top: 12px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-radius: 3px;
                    animation: mouseScroll 2.2s infinite ease-in-out;
                    box-shadow: 0 0 10px #fff;
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
                    .info-grid { grid-template-columns: 1fr; gap: 2rem; }
                    .glass-panel { padding: 2.5rem 1.5rem; }
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
                    <motion.h1 variants={itemVariants} className="hero-title aura-heading">{t("light_show.hero.title")}</motion.h1>
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



            <main className="fort-main">
                {/* ═══ OVERVIEW ═══════════════════════════════ */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    id="overview" 
                    className="fort-section"
                >
                    <div className="light-glow" style={{ top: '10%', left: '10%' }}></div>
                    <div className="section-header">
                        <motion.h2 variants={itemVariants} className="section-title aura-heading">{t("light_show.section.overview")}</motion.h2>
                        <motion.div variants={itemVariants} className="title-divider"></motion.div>
                    </div>
                    <div className="glass-panel" style={{ textAlign: 'center' }}>
                        <motion.p variants={itemVariants} className="lead-para" style={{ color: '#fff !important', fontSize: '1.4rem', fontWeight: 300 }}>
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
                            {playingAudio === 'overview' ? <Waveform /> : <Play size={28} fill="currentColor" />}
                            <span style={{ fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', fontSize: '1rem' }}>
                                {playingAudio === 'overview' ? t("fort.audio.playing") : t("fort.audio.listen")}
                            </span>
                        </motion.div>
                    </div>
                </motion.section>

                {/* ═══ EXPERIENCE ═══════════════════════════ */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    id="experience" 
                    className="fort-section"
                    style={{ background: 'rgba(20, 15, 10, 0.4)' }}
                >
                    <div className="light-glow" style={{ bottom: '15%', right: '10%' }}></div>
                    <div className="section-header">
                        <motion.h2 variants={itemVariants} className="section-title aura-heading">{t("light_show.section.experience")}</motion.h2>
                        <motion.div variants={itemVariants} className="title-divider"></motion.div>
                    </div>

                    <div className="glass-panel" style={{ textAlign: 'center' }}>
                        <motion.p variants={itemVariants} style={{ color: '#fff !important', fontSize: '1.3rem' }}>
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
                            {playingAudio === 'experience' ? <Waveform /> : <Play size={28} fill="currentColor" />}
                            <span style={{ fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', fontSize: '1rem' }}>
                                {playingAudio === 'experience' ? t("fort.audio.playing") : t("fort.audio.listen")}
                            </span>
                        </motion.div>
                    </div>
                </motion.section>

                {/* ═══ DETAILS ═════════════════════════════ */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    id="details" 
                    className="fort-section"
                >
                    <div className="section-header">
                        <motion.h2 variants={itemVariants} className="section-title aura-heading">{t("light_show.section.details")}</motion.h2>
                        <motion.div variants={itemVariants} className="title-divider"></motion.div>
                    </div>
                    
                    <div className="info-grid">
                        <motion.div variants={itemVariants} className="info-card">
                            <Clock className="info-icon" size={48} />
                            <span className="info-label">{t("lbl.bestTime") || "Timing"}</span>
                            <span className="info-value">{t("light_show.details.timing")}</span>
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="info-card">
                            <Phone className="info-icon" size={48} />
                            <span className="info-label">{t("lbl.contact") || "Contact"}</span>
                            <span className="info-value">{t("light_show.details.contact")}</span>
                        </motion.div>
 
                        <motion.div variants={itemVariants} className="info-card">
                            <Info className="info-icon" size={48} />
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
                    style={{ paddingBottom: '12rem' }}
                >
                    <div className="section-inner" style={{ textAlign: 'center' }}>
                        <motion.h2 variants={itemVariants} className="section-title" style={{ fontSize: '2.5rem' }}>{t("light_show.references.title")}</motion.h2>
                        <motion.div variants={itemVariants} className="title-divider" style={{ width: '80px', marginBottom: '4rem' }}></motion.div>
                        
                        <motion.a 
                            variants={itemVariants}
                            href={t("light_show.references.official_url")} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="back-btn"
                            style={{ margin: 0, padding: '1rem 3rem' }}
                        >
                            {t("light_show.references.official")}
                        </motion.a>
                    </div>
                </motion.section>
            </main>
        </motion.div>
    );
}
