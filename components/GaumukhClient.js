"use client";

import { useLanguage } from "@/context/LanguageContext";
import React, { useState, useEffect, useRef } from "react";
import { 
    Play, 
    Pause, 
    ArrowLeft,
    MapPin,
    ScrollText,
    ChevronDown,
    ChevronUp,
    Camera,
    Info,
    Mountain,
    Gem,
    Layers
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { triggerHaptic } from "@/lib/haptics";
import QRScannerButton from "./QRScannerButton";

export default function GaumukhClient() {
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



    const ARCH_FEATURES = [
        { id: "gaumukh_arch.rock", icon: <Mountain size={20} /> },
        { id: "gaumukh_arch.temple", icon: <Gem size={20} /> },
        { id: "gaumukh_arch.steps", icon: <Layers size={20} /> }
    ];

    const handleAudioPlay = (sectionId, customText = null) => {
        const synth = window.speechSynthesis;
        synth.cancel();

        if (playingAudio === sectionId) {
            setPlayingAudio(null);
            return;
        }

        const textToSpeak = customText || `${t(`attr.${sectionId}.name`)}. ${t(`attr.${sectionId}.desc`)}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
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
            <section className="fort-hero">
                <div className="hero-bg" style={{ backgroundImage: "url('/gaumukh_reservoir.jpg')", backgroundPosition: 'center center' }}></div>
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
                    <span className="hero-eyebrow">{t("gaumukh.hero.eyebrow")}</span>
                    <h1 className="hero-title">{t("gaumukh.hero.title")}</h1>
                    <p className="hero-desc">{t("gaumukh.hero.desc")}</p>
                    
                </motion.div>
            </section>



            <main className="fort-main">
                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    id="overview" 
                    className="fort-section mesh-bg"
                >
                    <div className="section-header">
                        <h2 className="section-title text-gold">{t("gaumukh.section.overview")}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="overview-grid">
                        <div className="overview-text">
                            <p className="lead-para">{t("gaumukh.overview.p1")}</p>
                            <p>{t("gaumukh.overview.p2")}</p>
                            
                            <button 
                                className={`audio-btn ${playingAudio === 'overview' ? 'playing' : ''}`}
                                onClick={() => handleAudioPlay('overview', `${t("gaumukh.overview.p1")} ${t("gaumukh.overview.p2")}`)}
                                style={{ marginTop: '2rem' }}
                            >
                                {playingAudio === 'overview' ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                                <span>{playingAudio === 'overview' ? t("fort.audio.playing") : t("fort.audio.listen")}</span>
                            </button>
                        </div>
                    </div>
                </motion.section>


                <section id="architecture" className="fort-section">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header"
                    >
                        <h2 className="section-title text-gold">{t("gaumukh.section.architecture")}</h2>
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
                                        {t(`attr.${m.id}.name`)}
                                    </h3>
                                    <p className={`mon-desc ${expandedSections[m.id] ? 'expanded' : ''}`}>
                                        {t(`attr.${m.id}.desc`)}
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

                .fort-page h1, .fort-page h2, .fort-page h3, .fort-page h4, .fort-page .timeline-year {
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

                .stat-item { display: flex; flex-direction: column; align-items: center; }
                .stat-val { font-size: clamp(2rem, 6vw, 3.5rem); color: var(--gold); font-family: var(--ff-serif); font-weight: 800; }
                .stat-label { font-size: 0.8rem; color: rgba(255,255,255,0.7); text-transform: uppercase; }
                .stat-divider { width: 1px; height: 40px; background: rgba(212, 175, 55, 0.3); }



                .fort-section { padding: 5rem 1.5rem; max-width: 1200px; margin: 0 auto; }
                .section-header { text-align: center; margin-bottom: 4rem; }
                .section-title { font-size: clamp(2rem, 5vw, 3.5rem); color: var(--gold); }
                .title-divider { width: 60px; height: 3px; background: var(--gold); margin: 0.5rem auto; }

                .overview-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
                @media (min-width: 900px) { .overview-grid { grid-template-columns: 1.5fr 1fr; } }
                .info-chips { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2rem; }
                .chip { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.05); padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; border: 1px solid rgba(255,255,255,0.1); }

                .history-timeline { display: flex; flex-direction: column; gap: 3rem; }
                .timeline-item { display: flex; flex-direction: column; gap: 2rem; padding: 2rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(212,175,55,0.1); border-radius: 16px; }
                @media (min-width: 768px) { 
                    .timeline-item { flex-direction: row; align-items: center; gap: 4rem; } 
                    .timeline-item:nth-child(even) { flex-direction: row-reverse; }
                }
                .timeline-img-wrapper { flex: 1; border-radius: 12px; overflow: hidden; aspect-ratio: 16/10; border: 1px solid rgba(212,175,55,0.2); }
                .timeline-img { width: 100%; height: 100%; object-fit: cover; }
                .timeline-content { flex: 1.2; }
                .timeline-year { font-size: 2rem; color: var(--gold); }

                .monuments-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
                .monument-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; overflow: hidden; display: flex; flex-direction: column; transition: 0.4s; }
                .monument-card:hover { transform: translateY(-10px); border-color: var(--gold); }
                .mon-image-wrapper { height: 200px; overflow: hidden; }
                .mon-card-img { width: 100%; height: 100%; object-fit: cover; }
                .mon-content { padding: 2rem; display: flex; flex-direction: column; gap: 1rem; flex: 1; }
                .mon-desc { font-size: 1rem; color: rgba(255,255,255,0.8); overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
                .mon-desc.expanded { -webkit-line-clamp: unset; }
                .read-more-btn { background: none; border: none; color: var(--gold); cursor: pointer; font-weight: 700; text-transform: uppercase; font-size: 0.8rem; display: flex; align-items: center; gap: 0.5rem; }
                .audio-btn { background: rgba(212,175,55,0.1); border: 1px solid var(--gold); color: var(--gold); padding: 0.8rem; border-radius: 8px; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight: 700; text-transform: uppercase; }
                .audio-btn:hover { background: var(--gold); color: #000; }
            `}</style>
        </motion.div>
    );
}
