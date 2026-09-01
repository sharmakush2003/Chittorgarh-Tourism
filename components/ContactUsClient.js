"use client";

import { useLanguage } from "@/context/LanguageContext";
import React, { useRef } from "react";
import {
    ArrowLeft,
    Globe,
    Phone,
    Mail,
    User,
    Shield,
    Terminal,
    Compass
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { triggerHaptic } from "@/lib/haptics";
import QRScannerButton from "./QRScannerButton";

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
                boxShadow: '0 -2px 15px rgba(212, 175, 55, 0.5)'
            }} 
        />
    );
};

export default function ContactUsClient() {
    const { t } = useLanguage();
    const router = useRouter();
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.08]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const heroTranslateY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);

    const TEAM = [
        { id: "card1", email: "Kushsharma.cor@gmail.com", icon: <Terminal size={32} /> },
        { id: "card2", email: "lavsharma.cor@gmail.com", icon: <Compass size={32} /> }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { y: 40, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
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

            {/* ═══ PARALLAX HERO SECTION ═══════════════════════════ */}
            <section className="fort-hero">
                <motion.div 
                    style={{ 
                        scale: heroScale, 
                        opacity: heroOpacity,
                        y: heroTranslateY,
                        backgroundImage: "url('/hero_bg.jpg')"
                    }} 
                    className="hero-bg"
                />
                <div className="hero-overlay"></div>

                <div className="hero-content">
                    <motion.button 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="back-btn" 
                        onClick={() => {
                            triggerHaptic('light');
                            router.push('/');
                        }}
                    >
                        <ArrowLeft size={16} /> {t("btn.back") || "Back"}
                    </motion.button>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="hero-eyebrow">{t("nav.contactUs") || "Contact Us"}</span>
                        <h1 className="hero-title">{t("contact.hero.title")}</h1>
                        <p className="hero-desc">{t("contact.hero.sub")}</p>
                    </motion.div>
                </div>
                
                <div className="hero-bottom-fade"></div>
            </section>

            <main className="fort-main">
                {/* ═══ NODAL OFFICER SECTION ══════════════════════════ */}
                <section id="nodal" className="fort-section relative">
                    <div className="ambient-glow-circle absolute pointer-events-none" style={{ top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header"
                    >
                        <h2 className="section-title text-gold aura-heading">{t("contact.nodal.title")}</h2>
                        <div className="title-divider"></div>
                    </motion.div>

                    <div className="card-container flex justify-center">
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="monument-card premium-glass nodal-card-featured"
                        >
                            <div className="badge-shield">
                                <Shield size={26} className="text-gold" />
                            </div>
                            
                            <div className="mon-content">
                                <div className="user-icon-ring">
                                    <User size={34} className="text-gold" />
                                </div>
                                <h3 className="mon-name">{t("contact.nodal.name")}</h3>
                                <div className="role-badge">
                                    {t("contact.nodal.role")}
                                </div>
                                <div className="info-links-grid">
                                    <motion.a 
                                        whileHover={{ scale: 1.02 }} 
                                        href={`mailto:${t("contact.nodal.email")}`} 
                                        className="info-item-link"
                                    >
                                        <div className="icon-wrapper">
                                            <Mail size={18} />
                                        </div>
                                        <div className="info-text">
                                            <span className="info-label">Email Support</span>
                                            <span className="info-val">{t("contact.nodal.email")}</span>
                                        </div>
                                    </motion.a>
                                    
                                    <motion.a 
                                        whileHover={{ scale: 1.02 }} 
                                        href={`tel:${t("contact.nodal.office")}`} 
                                        className="info-item-link"
                                    >
                                        <div className="icon-wrapper">
                                            <Phone size={18} />
                                        </div>
                                        <div className="info-text">
                                            <span className="info-label">Office Phone</span>
                                            <span className="info-val">{t("contact.nodal.office")}</span>
                                        </div>
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══ TECHNICAL ASSISTANCE SECTION ══════════════════════════ */}
                <section id="assistance" className="fort-section relative">
                    <div className="ambient-glow-circle absolute pointer-events-none" style={{ bottom: '10%', right: '5%' }}></div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header"
                    >
                        <h2 className="section-title text-gold aura-heading">{t("contact.techAssistance.title")}</h2>
                        <div className="title-divider"></div>
                    </motion.div>

                    <div className="tech-team-grid">
                        {TEAM.map((m, idx) => (
                            <motion.div
                                key={m.id}
                                variants={cardVariants}
                                whileHover={{ y: -8, scale: 1.03 }}
                                className="monument-card premium-glass tech-card"
                            >
                                <div className="mon-content">
                                    <div className="user-icon-ring ring-tech">
                                        {m.icon}
                                    </div>
                                    <h3 className="mon-name">{t(`contact.${m.id}.name`)}</h3>
                                    <div className="role-badge badge-tech">
                                        {t(`contact.${m.id}.role`)}
                                    </div>
                                    <p className="tech-desc">{t(`contact.${m.id}.desc`)}</p>
                                    <div className="tech-links">
                                        <motion.a 
                                            whileHover={{ y: -2 }} 
                                            href={`mailto:${m.email}`} 
                                            className="tech-action-btn email-btn"
                                        >
                                            <Mail size={16} /> <span>{m.email}</span>
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ═══ MEDIA & FEEDBACK CTA SECTION ══════════════════════════ */}
                <section id="ctas" className="fort-section grid-ctas-section mesh-bg">
                    <div className="ctas-grid">
                        {/* Media Card */}
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                            className="monument-card premium-glass cta-card"
                        >
                            <div className="mon-content flex-center">
                                <div className="cta-icon-outer">
                                    <Globe className="text-gold" size={26} />
                                </div>
                                <h3 className="mon-name cta-card-title">{t("contact.media.title")}</h3>
                                <p className="mon-desc text-center">
                                    {t("contact.media.sub")}
                                </p>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    href={`mailto:Kushsharma.cor@gmail.com?subject=Media Contribution - Chittorgarh Tourism Portal`}
                                    className="audio-btn action-cta-btn"
                                    onClick={() => triggerHaptic('medium')}
                                >
                                    <Mail size={16} /> {t("contact.media.btn")}
                                </motion.a>
                            </div>
                        </motion.div>

                        {/* Feedback Card */}
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                            className="monument-card premium-glass cta-card feedback-highlight-card"
                        >
                            <div className="mon-content flex-center">
                                <div className="cta-icon-outer">
                                    <Globe className="text-gold" size={26} />
                                </div>
                                <h3 className="mon-name cta-card-title">{t("contact.feedback.title")}</h3>
                                <p className="mon-desc text-center">
                                    {t("contact.feedback.sub")}
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="audio-btn action-cta-btn feedback-btn-gold"
                                    onClick={() => {
                                        triggerHaptic('medium');
                                        router.push('/feedback');
                                    }}
                                >
                                    <Globe size={16} /> {t("contact.feedback.btn")}
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <div style={{ textAlign: 'center', padding: '5rem 1rem 4rem' }}>
                    <QRScannerButton />
                </div>
            </main>

            <style jsx global>{`
                :root {
                    --ff-serif: 'Playfair Display', serif;
                    --ff-sans: 'Inter', sans-serif;
                    --gold: #d4af37;
                    --gold-glow: rgba(212, 175, 55, 0.25);
                    --glass-bg: rgba(20, 16, 12, 0.75);
                    --glass-border: rgba(212, 175, 55, 0.2);
                    --bg-dark: #080604;
                }

                .fort-page {
                    background: #080604 !important;
                    color: #fff;
                    min-height: 100vh;
                    font-family: var(--ff-sans);
                    overflow-x: hidden;
                    display: block;
                    position: relative;
                    z-index: 10;
                }

                /* UTILITIES */
                .flex { display: flex; }
                .justify-center { justify-content: center; }
                .relative { position: relative; }
                .absolute { position: absolute; }
                .pointer-events-none { pointer-events: none; }

                /* TYPOGRAPHY RULES */
                h1, h2, h3, h4 {
                    font-family: var(--ff-serif);
                    font-weight: 700;
                    letter-spacing: -0.01em;
                    background: linear-gradient(135deg, #fff 30%, var(--gold) 70%, #fff 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
                }

                .fort-page h1, .fort-page h2, .fort-page h3, .fort-page h4 {
                    line-height: 1.25 !important;
                    margin: 0;
                }

                .fort-page p {
                    color: rgba(255, 255, 255, 0.8) !important;
                    line-height: 1.8;
                    font-size: 1.05rem;
                }

                /* HINDI TYPOGRAPHY FIXED */
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
                }

                /* GOLDEN AURA HEADING */
                .aura-heading {
                    position: relative;
                    display: inline-block;
                }
                .aura-heading::before {
                    content: '';
                    position: absolute;
                    inset: -15px -30px;
                    background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
                    z-index: -1;
                    filter: blur(15px);
                }

                /* AMBIENT GLOW CIRCLE */
                .ambient-glow-circle {
                    width: 350px;
                    height: 350px;
                    background: radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, transparent 70%);
                    filter: blur(40px);
                    z-index: 1;
                }

                /* HERO SECTION */
                .fort-hero {
                    height: 75vh;
                    min-height: 520px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 8rem 1.5rem 4rem;
                    z-index: 2;
                    overflow: hidden;
                }

                .hero-bg {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center 35%;
                    background-repeat: no-repeat;
                    z-index: -2;
                    will-change: transform;
                }

                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(8, 6, 4, 0.45) 0%, rgba(8, 6, 4, 0.95) 100%) !important;
                    z-index: -1;
                }

                .hero-bottom-fade {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 140px;
                    background: linear-gradient(to bottom, transparent, var(--bg-dark));
                    z-index: 1;
                }

                .hero-content {
                    max-width: 800px;
                    width: 100%;
                    z-index: 10;
                }

                .back-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    color: #fff;
                    font-size: 0.78rem;
                    margin-bottom: 2.2rem;
                    text-transform: uppercase;
                    font-weight: 800;
                    letter-spacing: 2px;
                    background: rgba(212, 175, 55, 0.08);
                    padding: 0.75rem 1.5rem;
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .back-btn:hover {
                    background: var(--gold);
                    color: #000;
                    transform: translateX(-4px);
                    box-shadow: 0 8px 20px var(--gold-glow);
                }

                .hero-eyebrow {
                    display: block;
                    letter-spacing: 5px;
                    text-transform: uppercase;
                    font-size: 0.85rem;
                    color: var(--gold);
                    margin-bottom: 1.2rem;
                    font-weight: 800;
                }

                .hero-title {
                    font-size: clamp(2.2rem, 6vw, 4.2rem);
                    color: #fff;
                    margin-bottom: 1.2rem;
                    text-shadow: 0 4px 15px rgba(0,0,0,0.6);
                }

                .hero-desc {
                    font-size: clamp(0.95rem, 2vw, 1.15rem);
                    max-width: 600px;
                    margin: 0 auto;
                    color: rgba(255,255,255,0.75) !important;
                }

                .fort-main {
                    display: block;
                    width: 100%;
                    background: #080604;
                }

                .fort-section {
                    position: relative;
                    padding: 5rem 1.5rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    z-index: 2;
                }

                .section-header {
                    margin-bottom: 3.5rem;
                    text-align: center;
                }

                .section-title {
                    font-size: clamp(1.8rem, 5vw, 2.6rem);
                    margin-bottom: 1.2rem;
                    color: var(--gold) !important;
                }

                .title-divider {
                    width: 50px;
                    height: 2px;
                    background: var(--gold);
                    margin: 0 auto;
                }

                /* GLASSMORPHISM CARD DESIGN */
                .monument-card {
                    background: var(--glass-bg);
                    backdrop-filter: blur(25px);
                    -webkit-backdrop-filter: blur(25px);
                    border: 1px solid var(--glass-border);
                    border-radius: 20px;
                    overflow: hidden;
                    position: relative;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
                    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
                }

                .monument-card::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 20px;
                    padding: 1px;
                    background: linear-gradient(to bottom, rgba(212, 175, 55, 0.3), transparent);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    pointer-events: none;
                }

                .monument-card:hover {
                    border-color: rgba(212, 175, 55, 0.45);
                    box-shadow: 
                        0 20px 50px rgba(0, 0, 0, 0.7), 
                        0 0 35px rgba(212, 175, 55, 0.12);
                }

                .mon-content {
                    padding: 3rem 2.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                /* FEATURED NODAL CARD */
                .nodal-card-featured {
                    max-width: 650px;
                    width: 100%;
                    background: linear-gradient(145deg, rgba(26, 20, 14, 0.85) 0%, rgba(12, 9, 6, 0.95) 100%);
                    border: 1px solid rgba(212, 175, 55, 0.25);
                }

                .badge-shield {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    opacity: 0.6;
                }

                .user-icon-ring {
                    width: 76px;
                    height: 76px;
                    border-radius: 50%;
                    border: 2px solid rgba(212, 175, 55, 0.35);
                    background: rgba(212, 175, 55, 0.06);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.4rem;
                    box-shadow: 0 0 20px rgba(212, 175, 55, 0.15);
                    transition: all 0.4s ease;
                }
                .monument-card:hover .user-icon-ring {
                    border-color: var(--gold);
                    transform: scale(1.05);
                    box-shadow: 0 0 25px rgba(212, 175, 55, 0.3);
                }

                .mon-name {
                    font-size: clamp(1.4rem, 4vw, 1.8rem);
                    margin-bottom: 0.8rem;
                    text-align: center;
                    letter-spacing: -0.01em;
                }

                .role-badge {
                    display: inline-block;
                    color: var(--gold);
                    font-size: 0.72rem;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    font-weight: 700;
                    margin-bottom: 2.2rem;
                    padding: 0.45rem 1.1rem;
                    background: rgba(212, 175, 55, 0.08);
                    border: 1px solid rgba(212, 175, 55, 0.22);
                    border-radius: 30px;
                    text-align: center;
                    max-width: 100%;
                    line-height: 1.5;
                }

                .info-links-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.2rem;
                    width: 100%;
                }
                
                @media (min-width: 580px) {
                    .info-links-grid { grid-template-columns: 1fr 1fr; }
                }

                .info-item-link {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.1rem 1.2rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(212, 175, 55, 0.12);
                    border-radius: 12px;
                    color: rgba(255, 255, 255, 0.85);
                    text-decoration: none;
                    transition: all 0.3s ease;
                    min-width: 0;
                }
                .info-item-link:hover {
                    border-color: rgba(212, 175, 55, 0.4);
                    background: rgba(212, 175, 55, 0.06);
                    color: #fff;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                }

                .icon-wrapper {
                    color: var(--gold);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 38px;
                    height: 38px;
                    min-width: 38px;
                    border-radius: 8px;
                    background: rgba(212, 175, 55, 0.12);
                    transition: transform 0.3s ease;
                }
                .info-item-link:hover .icon-wrapper {
                    transform: scale(1.08);
                }

                .info-text {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                    min-width: 0;
                    width: 100%;
                    overflow: hidden;
                }

                .info-label {
                    font-size: 0.65rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: rgba(212, 175, 55, 0.85);
                    font-weight: 600;
                }

                .info-val {
                    font-size: 0.82rem;
                    font-weight: 500;
                    color: #fff;
                    word-break: break-all;
                    overflow-wrap: anywhere;
                    line-height: 1.4;
                }

                /* TECHNICAL TEAM SECTION */
                .tech-team-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2.5rem;
                    max-width: 1000px;
                    margin: 0 auto;
                }

                @media (min-width: 768px) {
                    .tech-team-grid { grid-template-columns: 1fr 1fr; }
                }

                .tech-card .mon-content {
                    align-items: center;
                    padding: 2.8rem 2rem;
                }

                .ring-tech {
                    border-color: rgba(255, 255, 255, 0.15);
                    background: rgba(255, 255, 255, 0.02);
                    color: rgba(255, 255, 255, 0.7);
                }
                .tech-card:hover .ring-tech {
                    border-color: var(--gold);
                    color: var(--gold);
                }

                .badge-tech {
                    color: rgba(255,255,255,0.7);
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(255, 255, 255, 0.08);
                    font-size: 0.65rem;
                    margin-bottom: 1.5rem;
                }
                .tech-card:hover .badge-tech {
                    color: var(--gold);
                    border-color: rgba(212, 175, 55, 0.25);
                    background: rgba(212, 175, 55, 0.06);
                }

                .tech-desc {
                    font-size: 0.92rem !important;
                    text-align: center;
                    color: rgba(255, 255, 255, 0.65) !important;
                    margin-bottom: 2rem !important;
                    line-height: 1.6;
                    max-width: 320px;
                    height: 50px;
                }

                .tech-links {
                    width: 100%;
                }

                .tech-action-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.6rem;
                    padding: 0.85rem 1.2rem;
                    border-radius: 8px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    width: 100%;
                    min-width: 0;
                }

                .email-btn {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    color: rgba(255, 255, 255, 0.85);
                }
                .tech-card:hover .email-btn {
                    border-color: rgba(212, 175, 55, 0.3);
                    background: rgba(212, 175, 55, 0.05);
                    color: var(--gold);
                }
                .email-btn:hover {
                    background: var(--gold) !important;
                    color: #000 !important;
                    box-shadow: 0 5px 15px var(--gold-glow);
                }
                .email-btn span {
                    word-break: break-all;
                }

                /* GRID CTAS SECTION */
                .ctas-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2.5rem;
                    max-width: 1000px;
                    margin: 0 auto;
                }

                @media (min-width: 768px) {
                    .ctas-grid { grid-template-columns: 1fr 1fr; }
                }

                .cta-card {
                    background: linear-gradient(135deg, rgba(20, 16, 12, 0.7) 0%, rgba(10, 8, 6, 0.85) 100%);
                    border: 1px solid rgba(212, 175, 55, 0.15);
                }

                .cta-card:hover {
                    border-color: rgba(212, 175, 55, 0.35);
                }

                .flex-center {
                    align-items: center;
                    text-align: center;
                    padding: 3rem 2rem;
                }

                .cta-icon-outer {
                    width: 56px;
                    height: 56px;
                    border-radius: 12px;
                    background: rgba(212, 175, 55, 0.08);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                    border: 1px solid rgba(212, 175, 55, 0.2);
                }

                .cta-card-title {
                    font-size: 1.4rem;
                    margin-bottom: 1rem;
                }

                .cta-card .mon-desc {
                    font-size: 0.95rem;
                    color: rgba(255, 255, 255, 0.65) !important;
                    line-height: 1.6;
                    margin-bottom: 2.2rem;
                    height: 70px;
                }

                .action-cta-btn {
                    background: rgba(212, 175, 55, 0.08);
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    color: var(--gold) !important;
                    padding: 0.85rem 1.6rem;
                    font-size: 0.8rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.7rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    text-decoration: none;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    width: auto;
                    min-width: 200px;
                }

                .action-cta-btn:hover {
                    background: var(--gold);
                    color: #000 !important;
                    box-shadow: 0 8px 20px var(--gold-glow);
                }

                .feedback-highlight-card {
                    background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(10, 8, 6, 0.85) 100%);
                    border-color: rgba(212, 175, 55, 0.2);
                }

                .feedback-btn-gold {
                    background: rgba(212, 175, 55, 0.15);
                }

                .mesh-bg {
                    background-image: 
                        radial-gradient(circle at 0% 0%, rgba(212, 175, 55, 0.03) 0%, transparent 40%),
                        radial-gradient(circle at 100% 100%, rgba(212, 175, 55, 0.03) 0%, transparent 40%) !important;
                }

                /* RESPONSIVE LAYOUT */
                @media (max-width: 768px) {
                    .fort-hero { height: 65vh; min-height: 480px; padding-top: 6.5rem; }
                    .hero-title { font-size: 2.4rem; }
                    .fort-section { padding: 3.5rem 1.2rem; }
                    .mon-content { padding: 2.2rem 1.4rem; }
                    .tech-desc { height: auto; margin-bottom: 1.5rem !important; }
                    .cta-card .mon-desc { height: auto; margin-bottom: 1.5rem; }
                }

                @media (max-width: 480px) {
                    .fort-hero { height: auto; min-height: 400px; padding: 5.5rem 1rem 3rem; }
                    .hero-eyebrow { font-size: 0.75rem; letter-spacing: 3px; margin-bottom: 1rem; }
                    .hero-title { font-size: 1.95rem; margin-bottom: 1rem; }
                    .hero-desc { font-size: 0.95rem; }
                    .fort-section { padding: 2.5rem 0.85rem; }
                    .section-header { margin-bottom: 2.2rem; }
                    .section-title { font-size: 1.55rem; }
                    .mon-content { padding: 1.8rem 1rem; }
                    .user-icon-ring { width: 66px; height: 66px; margin-bottom: 1.2rem; }
                    .mon-name { font-size: 1.35rem; }
                    .role-badge { font-size: 0.65rem; padding: 0.35rem 0.8rem; margin-bottom: 1.5rem; letter-spacing: 1px; }
                    .info-links-grid { gap: 0.8rem; }
                    .info-item-link { padding: 0.85rem 0.85rem; gap: 0.75rem; }
                    .icon-wrapper { width: 34px; height: 34px; min-width: 34px; }
                    .info-val { font-size: 0.78rem; }
                    .tech-team-grid, .ctas-grid { gap: 1.5rem; }
                    .tech-card .mon-content, .flex-center { padding: 1.8rem 1rem; }
                    .tech-action-btn { padding: 0.75rem 0.8rem; font-size: 0.75rem; }
                    .action-cta-btn { min-width: 0; width: 100%; padding: 0.75rem 1rem; }
                }
            `}</style>
        </motion.div>
    );
}
