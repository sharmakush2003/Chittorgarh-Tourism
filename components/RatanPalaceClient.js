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
    Info
} from "lucide-react";
import { useRouter } from "next/navigation";
import GoldenHourTracker from "./GoldenHourTracker";
import { motion } from "framer-motion";
import { triggerHaptic } from "@/lib/haptics";

export default function RatanPalaceClient() {
    const { t, lang } = useLanguage();
    const router = useRouter();
    const [activeSection, setActiveSection] = useState("overview");
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

    const SECTIONS = [
        { id: "overview", label: t("ratan_palace.nav.overview"), icon: <Shield size={18} /> },
        { id: "history", label: t("ratan_palace.nav.history"), icon: <History size={18} /> },
        { id: "architecture", label: t("ratan_palace.nav.architecture"), icon: <ScrollText size={18} /> },
    ];

    const ARCH_FEATURES = [
        { id: "ratan_palace_arch.talab", icon: "💧", image: "/ratan_singh_palace.jpg" },
        { id: "ratan_palace_arch.courtyards", icon: "🏛️", image: "/ratan_singh_palace.jpg" },
        { id: "ratan_palace_arch.balconies", icon: "🖼️", image: "/ratan_singh_palace.jpg" }
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
                <div className="hero-bg" style={{ backgroundImage: "url('/ratan_singh_palace.jpg')", backgroundPosition: 'center center' }}></div>
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
                    <span className="hero-eyebrow">{t("ratan_palace.hero.eyebrow")}</span>
                    <h1 className="hero-title">{t("ratan_palace.hero.title")}</h1>
                    <p className="hero-desc">{t("ratan_palace.hero.desc")}</p>
                    
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-val">{t("ratan_palace.stats.built").split(' ')[0]}</span>
                            <span className="stat-label">{t("ratan_palace.stats.built").split(' ').slice(1).join(' ')}</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-val">Winter</span>
                            <span className="stat-label">{t("ratan_palace.stats.type")}</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-val">Lake</span>
                            <span className="stat-label">{t("ratan_palace.stats.feature")}</span>
                        </div>
                    </div>
                </motion.div>
                
                <div className="scroll-indicator"><div className="mouse"></div></div>
            </section>

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
                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    id="overview" 
                    className="fort-section mesh-bg"
                >
                    <div className="section-header">
                        <h2 className="section-title text-gold">{t("ratan_palace.section.overview")}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="overview-grid">
                        <div className="overview-text">
                            <p className="lead-para">{t("ratan_palace.overview.p1")}</p>
                            <p>{t("ratan_palace.overview.p2")}</p>
                            <div className="info-chips">
                                <span className="chip"><Clock size={14} /> 9:30 AM - 5:00 PM</span>
                                <span className="chip"><MapPin size={14} /> Northern Fort</span>
                            </div>
                            
                            <button 
                                className={`audio-btn ${playingAudio === 'overview' ? 'playing' : ''}`}
                                onClick={() => handleAudioPlay('overview', `${t("ratan_palace.overview.p1")} ${t("ratan_palace.overview.p2")}`)}
                                style={{ marginTop: '2rem' }}
                            >
                                {playingAudio === 'overview' ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                                <span>{playingAudio === 'overview' ? t("fort.audio.playing") : t("fort.audio.listen")}</span>
                            </button>
                        </div>
                        <div className="overview-sidebar">
                            <GoldenHourTracker />
                        </div>
                    </div>
                </motion.section>

                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    id="history" 
                    className="fort-section"
                >
                    <div className="section-header">
                        <h2 className="section-title text-gold">{t("ratan_palace.section.history")}</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="history-timeline">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="timeline-item">
                                <div className="timeline-img-wrapper">
                                    <img src="/ratan_singh_palace.jpg" alt={t(`ratan_palace.history.era${i}.title`)} className="timeline-img" />
                                </div>
                                <div className="timeline-content">
                                    <h3 className="timeline-year">{t(`ratan_palace.history.era${i}.year`)}</h3>
                                    <h4 className="timeline-title">{t(`ratan_palace.history.era${i}.title`)}</h4>
                                    <p>{t(`ratan_palace.history.era${i}.desc`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                <section id="architecture" className="fort-section">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header"
                    >
                        <h2 className="section-title text-gold">{t("ratan_palace.section.architecture")}</h2>
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
                                <div className="mon-image-wrapper">
                                    <img src={m.image} alt={t(`attr.${m.id}.name`)} className="mon-card-img" />
                                </div>

                                <div className="mon-content">
                                    <h3 className="mon-name">{t(`attr.${m.id}.name`)}</h3>
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
                    color: rgba(255, 255, 255, 0.98) !important;
                    line-height: 1.8;
                    font-size: 1.05rem;
                    margin: 0 0 1.5rem 0;
                }

                [lang="hi"] .fort-page .hero-title,
                [lang="hi"] .fort-page .section-title,
                [lang="hi"] .fort-page .timeline-year,
                [lang="hi"] .fort-page .mon-name {
                    font-family: var(--font-martel), serif !important;
                    font-weight: 900 !important;
                    line-height: 1.4 !important;
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

                .fort-nav { position: sticky; top: 0; background: #0a0804 !important; z-index: 100; border-bottom: 1px solid rgba(212, 175, 55, 0.2); }
                .nav-container { display: flex; justify-content: center; gap: 0.5rem; padding: 0.5rem 1rem; overflow-x: auto; scrollbar-width: none; }
                .nav-item { background: none; border: 1px solid transparent; padding: 0.5rem 1.5rem; border-radius: 50px; color: rgba(255,255,255,0.7); cursor: pointer; display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; transition: 0.4s; }
                .nav-item.active { color: var(--gold); background: rgba(212, 175, 55, 0.1); border-color: var(--gold); }

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
