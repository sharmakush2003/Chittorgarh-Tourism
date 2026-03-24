"use client";

import { useLanguage } from "@/context/LanguageContext";
import React, { useState, useEffect, useRef } from "react";
import { 
    Play, 
    Pause, 
    ArrowLeft,
    ChevronDown,
    ChevronUp,
    Code,
    Globe,
    Phone,
    Mail,
    User
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { triggerHaptic } from "@/lib/haptics";
import { Waveform } from "./Waveform";
import QRScannerButton from "./QRScannerButton";

export default function ContactUsClient() {
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
    
    const TEAM = [
        { id: "card1", email: "Kushsharma.cor@gmail.com" },
        { id: "card2", email: "lavsharma.cor@gmail.com" }
    ];


    const handleAudioPlay = (sectionId, customText = null) => {
        const synth = window.speechSynthesis;
        synth.cancel();

        if (playingAudio === sectionId) {
            setPlayingAudio(null);
            return;
        }

        const textToSpeak = customText || `${t(`contact.${sectionId}.name`)}. ${t(`contact.${sectionId}.role`)}. ${t(`contact.${sectionId}.desc`)}`;
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
                <div className="hero-bg" style={{ backgroundColor: "#0F0A06", backgroundPosition: 'center center' }}></div>
                <div className="hero-overlay"></div>
                
                <motion.div 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="hero-content"
                >
                    <button className="back-btn" onClick={() => {
                        triggerHaptic('light');
                        router.push('/');
                    }}>
                        <ArrowLeft size={16} /> {t("btn.back") || "Back"}
                    </button>
                    <span className="hero-eyebrow">{t("nav.contactUs") || "Contact Us"}</span>
                    <h1 className="hero-title">{t("contact.hero.title")}</h1>
                    <p className="hero-desc">{t("contact.hero.sub")}</p>
                </motion.div>
            </section>

            <main className="fort-main">
                {/* ═══ NODAL OFFICER SECTION ══════════════════════════ */}
                <section id="nodal" className="fort-section">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header"
                    >
                        <h2 className="section-title text-gold">{t("contact.nodal.title")}</h2>
                        <div className="title-divider"></div>
                    </motion.div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="monument-card premium-glass"
                            style={{ maxWidth: '600px', width: '100%' }}
                        >
                            <div className="mon-content">
                                <h3 className="mon-name" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{ color: 'var(--gold)' }}><User size={24} /></span> 
                                    {t("contact.nodal.name")}
                                </h3>
                                <div className="role-badge">
                                    {t("contact.nodal.role")}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                                    <div className="email-link">
                                        <Mail size={16} color="var(--gold)" />
                                        <a href={`mailto:${t("contact.nodal.email")}`}>{t("contact.nodal.email")}</a>
                                    </div>
                                    <div className="email-link">
                                        <Phone size={16} color="var(--gold)" />
                                        <a href={`tel:${t("contact.nodal.mobile")}`}>{t("contact.nodal.mobile")} (Mobile)</a>
                                    </div>
                                    <div className="email-link">
                                        <Phone size={16} color="var(--gold)" />
                                        <span>{t("contact.nodal.office")} (Office)</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══ TECHNICAL ASSISTANCE SECTION ══════════════════════════ */}
                <section id="assistance" className="fort-section">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header"
                    >
                        <h2 className="section-title text-gold">{t("contact.techAssistance.title")}</h2>
                        <div className="title-divider"></div>
                    </motion.div>

                    <div className="monuments-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.5rem' }}>
                        {TEAM.map((m, idx) => (
                            <motion.div 
                                key={m.id} 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="monument-card premium-glass"
                                style={{ maxWidth: '600px', width: '100%' }}
                            >
                                <div className="mon-content">
                                    <h3 className="mon-name" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <span style={{ color: 'var(--gold)' }}><User size={24} /></span> 
                                        {t(`contact.${m.id}.name`)}
                                    </h3>
                                    <div className="role-badge">
                                        {t(`contact.${m.id}.role`)}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                                        <div className="email-link">
                                            <Mail size={16} color="var(--gold)" />
                                            <a href={`mailto:${m.email}`}>{m.email}</a>
                                        </div>
                                        <div className="email-link">
                                            <Phone size={16} color="var(--gold)" />
                                            <a href={`tel:${t(`contact.${m.id}.mobile`)}`}>{t(`contact.${m.id}.mobile`)} (Mobile)</a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ═══ MEDIA CONTRIBUTION SECTION ══════════════════════════ */}
                <section id="media" className="fort-section mesh-bg">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header"
                    >
                        <h2 className="section-title text-gold">{t("contact.media.title")}</h2>
                        <div className="title-divider"></div>
                    </motion.div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="monument-card premium-glass"
                            style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}
                        >
                            <div className="mon-content" style={{ alignItems: 'center' }}>
                                <Globe className="text-gold" size={48} style={{ marginBottom: '2rem', opacity: 0.8 }} />
                                <h3 className="mon-name">{t("contact.media.title")}</h3>
                                <p className="mon-desc" style={{ maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                                    {t("contact.media.sub")}
                                </p>
                                <a 
                                    href={`mailto:Kushsharma.cor@gmail.com?subject=Media Contribution - Chittorgarh Tourism Portal`}
                                    className="audio-btn"
                                    style={{ maxWidth: '300px', textDecoration: 'none' }}
                                    onClick={() => triggerHaptic('medium')}
                                >
                                    <Mail size={18} /> {t("contact.media.btn")}
                                </a>
                            </div>
                        </motion.div>
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
                    margin-bottom: 2rem;
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
                    margin-bottom: 6rem;
                    text-align: center;
                }

                .section-title {
                    font-size: clamp(1.8rem, 6vw, 3rem);
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
                    .monuments-list { grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 3rem; }
                }

                .monument-card {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(212, 175, 55, 0.15);
                    border-radius: 24px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
                    position: relative;
                }

                .monument-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at top left, rgba(212, 175, 55, 0.05) 0%, transparent 40%);
                    pointer-events: none;
                }

                .monument-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(212, 175, 55, 0.5);
                    transform: translateY(-12px);
                    box-shadow: 
                        0 20px 60px rgba(0, 0, 0, 0.5), 
                        0 0 30px rgba(212, 175, 55, 0.08),
                        inset 0 0 20px rgba(212, 175, 55, 0.02);
                }

                .mon-content {
                    padding: 4.5rem 3rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .mon-name {
                    font-size: 2.22rem;
                    margin-bottom: 2rem;
                    letter-spacing: -0.01em;
                }

                .role-badge {
                    display: inline-block;
                    color: var(--gold);
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    font-weight: 800;
                    margin-bottom: 1.5rem;
                    padding: 0.4rem 1rem;
                    background: rgba(212, 175, 55, 0.1);
                    border-radius: 20px;
                    width: fit-content;
                }

                .email-link {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    margin-bottom: 2rem;
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                }
                .email-link:hover {
                    color: var(--gold);
                }

                .mon-desc {
                    font-size: 1.15rem;
                    line-height: 1.8;
                    color: rgba(255,255,255,0.7);
                    margin-bottom: 2rem;
                    font-weight: 300;
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

                @media (max-width: 768px) {
                    .fort-hero { padding-top: 6rem; padding-bottom: 4rem; min-height: 70vh; }
                    .hero-title { font-size: 2.8rem; line-height: 1.15 !important; }
                    .fort-section { padding: 4rem 1.25rem; }
                    .section-title { font-size: 2.22rem; }
                }

                .mesh-bg {
                    background-image: 
                        radial-gradient(circle at 0% 0%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 100% 100%, rgba(212, 175, 55, 0.05) 0%, transparent 50%) !important;
                }

                .local-pride-container {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .local-pride-text {
                    font-family: var(--ff-serif);
                    font-size: clamp(1.2rem, 4vw, 1.8rem) !important;
                    font-style: italic;
                    color: #d4af37 !important;
                    line-height: 1.6 !important;
                    max-width: 800px;
                    letter-spacing: 1px;
                    opacity: 0.9;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.5);
                }
            `}</style>
        </motion.div>
    );
}
