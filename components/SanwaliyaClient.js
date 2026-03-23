"use client";

import { useLanguage } from "@/context/LanguageContext";
import React, { useState, useEffect, useRef } from "react";
import { 
    Play, 
    Pause, 
    ArrowLeft,
    Phone,
    Clock,
    MapPin,
    Calendar
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { triggerHaptic } from "@/lib/haptics";
import { Waveform } from "./Waveform";
import QRScannerButton from "./QRScannerButton";


export default function SanwaliyaClient() {
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

    const handleAudioPlay = (sectionId, customText = null) => {
        const synth = window.speechSynthesis;
        synth.cancel();

        if (playingAudio === sectionId) {
            setPlayingAudio(null);
            return;
        }

        const textToSpeak = customText || `${t(`sanwaliya.hero.title`)}. ${t(`sanwaliya.history.p1`)} ${t(`sanwaliya.history.p2`)}`;
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
                <div className="hero-bg" style={{ backgroundImage: "url('/images/sanwaliya_idol.jpg')", backgroundPosition: 'center top' }}></div>
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
                    <span className="hero-eyebrow">{t("sanwaliya.hero.eyebrow")}</span>
                    <h1 className="hero-title">{t("sanwaliya.hero.title")}</h1>
                    <p className="hero-desc">{t("sanwaliya.hero.desc")}</p>
                </motion.div>
            </section>

            <main className="fort-main">
                {/* ═══ HISTORY ══════════════════════════════ */}
                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    id="overview" 
                    className="fort-section mesh-bg"
                >
                    <div className="section-header">
                        <h2 className="section-title text-gold">{t("sanwaliya.section.history")}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="overview-grid">
                        <div className="overview-text">
                            <p className="lead-para">{t("sanwaliya.history.p1")}</p>
                            <p>{t("sanwaliya.history.p2")}</p>
                            
                            <button 
                                className={`audio-btn ${playingAudio === 'history' ? 'playing' : ''}`}
                                onClick={() => handleAudioPlay('history')}
                                style={{ marginTop: '2rem', marginLeft: 'auto', marginRight: 'auto' }}
                            >
                                {playingAudio === 'history' ? <Waveform /> : <Play size={18} fill="currentColor" />}
                                <span>{playingAudio === 'history' ? t("fort.audio.playing") || "Playing" : t("fort.audio.listen") || "Listen Narrated History"}</span>
                            </button>
                        </div>
                    </div>
                </motion.section>

                {/* ═══ THE THREE IDOLS ═════════════════════════ */}
                <motion.section 
                    className="fort-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="section-header">
                        <h2 className="section-title text-gold">{t("sanwaliya.section.temples")}</h2>
                        <div className="title-divider"></div>
                    </div>
                    
                    <div className="temple-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[1, 2, 3].map((num) => (
                            <div key={num} className="premium-glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                                <h3 style={{ color: 'var(--gold)', marginBottom: '1rem', fontSize: '1.4rem' }}>{t(`sanwaliya.temple${num}.title`)}</h3>
                                <p style={{ fontSize: '1rem', margin: 0 }}>{t(`sanwaliya.temple${num}.desc`)}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* ═══ TIMINGS & INFO ══════════════════════════ */}
                <motion.section 
                    className="fort-section mesh-bg"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="section-header">
                        <h2 className="section-title text-gold">{t("sanwaliya.timings.title")}</h2>
                        <div className="title-divider"></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        <div className="premium-glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                                <Clock size={24} color="var(--gold)" />
                                <h3 style={{ margin: 0, color: '#fff' }}>{t("sanwaliya.timings.title")}</h3>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li>{t("sanwaliya.timings.mangla")}</li>
                                <li>{t("sanwaliya.timings.rajbhog")}</li>
                                <li>{t("sanwaliya.timings.arati_afternoon")}</li>
                                <li>{t("sanwaliya.timings.arati_evening")}</li>
                                <li>{t("sanwaliya.timings.bhajan")}</li>
                            </ul>
                        </div>

                        <div className="premium-glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                                <Phone size={24} color="var(--gold)" />
                                <h3 style={{ margin: 0, color: '#fff' }}>{t("sanwaliya.info.contact")}</h3>
                            </div>
                            <p style={{ marginBottom: '1rem' }}>{t("sanwaliya.info.phone")}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <MapPin size={24} color="var(--gold)" />
                                <p style={{ margin: 0 }}>Chittorgarh-Udaipur Highway, Mandafiya</p>
                            </div>
                        </div>
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
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 9rem 1.5rem 6rem;
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
                        rgba(10, 8, 4, 0.2) 0%, 
                        rgba(10, 8, 4, 0.5) 60%,
                        rgba(10, 8, 4, 0.8) 100%
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
                    margin-bottom: 2.5rem;
                    text-transform: uppercase;
                    font-weight: 800;
                    background: rgba(212, 175, 55, 0.2);
                    padding: 0.65rem 1.25rem;
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .back-btn:hover {
                    background: rgba(212, 175, 55, 0.35);
                    transform: translateX(-4px);
                    border-color: var(--gold);
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
                    max-width: 300px;
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
                    .fort-hero { padding-top: 8rem; padding-bottom: 0 !important; min-height: auto !important; }
                    .hero-title { font-size: 2.2rem; line-height: 1.2 !important; margin-bottom: 0.8rem; }
                    .hero-desc { font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem; padding: 0 1rem; }
                    .fort-section { padding: 1.5rem 1.25rem; }
                    .section-header { margin-bottom: 1rem; }
                    .section-title { font-size: 2rem; }
                    .back-btn { margin-bottom: 1.2rem; font-size: 0.75rem; padding: 0.5rem 1rem; }
                    
                    :global([data-lang="hi"]) .hero-title { font-size: 2rem; line-height: 1.4 !important; }
                    :global([data-lang="hi"]) .section-title { font-size: 1.8rem; }
                }

                @media (max-width: 480px) {
                    .fort-hero { padding-top: 5rem; padding-bottom: 2rem !important; min-height: auto !important; }
                    .hero-title { font-size: 1.8rem; }
                    .hero-desc { font-size: 0.8rem; margin-bottom: 0.8rem; }
                    .back-btn { margin-top: 0; margin-bottom: 0.8rem; }
                    #overview { margin-top: 0 !important; position: relative; z-index: 5; }
                    .fort-section { padding: 1.25rem 1rem !important; }
                }

                .mesh-bg {
                    background-image: 
                        radial-gradient(circle at 0% 0%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 100% 100%, rgba(212, 175, 55, 0.05) 0%, transparent 50%) !important;
                }

                .premium-glass {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </motion.div>
    );
}
