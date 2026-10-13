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
    Compass,
    Sparkles
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { triggerHaptic } from "@/lib/haptics";

const KineticScroll = ({ progress }) => {
    const width = useTransform(progress, [0, 1], ["0%", "100%"]);
    return (
        <motion.div 
            style={{ 
                position: 'fixed',
                bottom: 0,
                left: 0,
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #B8860B, #FFD700)',
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
                delayChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0, scale: 0.97 },
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

            {/* HERO SECTION */}
            <section className="fort-hero">
                <div className="hero-content">
                    <motion.button 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
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
                        transition={{ delay: 0.2 }}
                    >
                        <span className="hero-eyebrow">{t("nav.contactUs") || "Contact Us"}</span>
                        <h1 className="hero-title">{t("contact.hero.title")}</h1>
                        <p className="hero-desc">{t("contact.hero.sub")}</p>
                    </motion.div>
                </div>
            </section>

            <main className="fort-main">
                {/* NODAL OFFICER SECTION */}
                <section id="nodal" className="fort-section relative">
                    <div className="ambient-glow-circle absolute pointer-events-none" style={{ top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header"
                    >
                        <h2 className="section-title aura-heading">{t("contact.nodal.title")}</h2>
                        <div className="title-divider"></div>
                    </motion.div>

                    <div className="card-container flex justify-center">
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ y: -6, scale: 1.01 }}
                            className="monument-card nodal-card-featured"
                        >
                            <div className="badge-shield">
                                <Shield size={26} className="text-gold" />
                            </div>
                            
                            <div className="mon-content">
                                <div className="user-icon-ring">
                                    <User size={36} className="text-gold" />
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

                {/* TECHNICAL ASSISTANCE SECTION */}
                <section id="assistance" className="fort-section relative">
                    <div className="ambient-glow-circle absolute pointer-events-none" style={{ bottom: '10%', right: '5%' }}></div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-header"
                    >
                        <h2 className="section-title aura-heading">{t("contact.techAssistance.title")}</h2>
                        <div className="title-divider"></div>
                    </motion.div>

                    <div className="tech-team-grid">
                        {TEAM.map((m) => (
                            <motion.div
                                key={m.id}
                                variants={cardVariants}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className="monument-card tech-card"
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
                                            whileHover={{ scale: 1.02 }} 
                                            whileTap={{ scale: 0.98 }}
                                            href={`mailto:${m.email}`} 
                                            className="tech-action-btn email-btn"
                                        >
                                            <Mail size={18} />
                                            <span className="email-text">{m.email}</span>
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* MEDIA & FEEDBACK CTA SECTION */}
                <section id="ctas" className="fort-section grid-ctas-section mesh-bg">
                    <div className="ctas-grid">
                        {/* Media Card */}
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                            className="monument-card cta-card"
                        >
                            <div className="mon-content flex-center">
                                <div className="cta-icon-outer">
                                    <Globe className="text-gold" size={26} />
                                </div>
                                <h3 className="cta-card-title">{t("contact.media.title")}</h3>
                                <p className="mon-desc text-center">
                                    {t("contact.media.sub")}
                                </p>
                                <motion.a
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.98 }}
                                    href={`mailto:Kushsharma.cor@gmail.com?subject=Media Contribution - Chittorgarh Tourism Portal`}
                                    className="action-cta-btn"
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
                            className="monument-card cta-card feedback-highlight-card"
                        >
                            <div className="mon-content flex-center">
                                <div className="cta-icon-outer">
                                    <Sparkles className="text-gold" size={26} />
                                </div>
                                <h3 className="cta-card-title">{t("contact.feedback.title")}</h3>
                                <p className="mon-desc text-center">
                                    {t("contact.feedback.sub")}
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="action-cta-btn feedback-btn-gold"
                                    onClick={() => {
                                        triggerHaptic('medium');
                                        window.open('https://docs.google.com/forms/d/e/1FAIpQLSeBDx8SK9Rm-S0QBO6wCFV5v-pfE6uCYTYU6ubMR5jNDOkpOA/viewform', '_blank', 'noopener,noreferrer');
                                    }}
                                >
                                    <Globe size={16} /> {t("contact.feedback.btn")}
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <style jsx global>{`
                :root {
                    --ff-serif: 'Playfair Display', serif;
                    --ff-sans: 'Inter', sans-serif;
                    --gold: #B8860B;
                    --gold-bright: #D4AF37;
                    --gold-glow: rgba(184, 134, 11, 0.3);
                    --charcoal: #1C1B19;
                    --sandstone-card: #FAF6F0;
                }

                .fort-page {
                    background-color: #F9F6F0 !important;
                    color: #1C1B19;
                    min-height: 100vh;
                    font-family: var(--ff-sans);
                    overflow-x: hidden;
                    display: block;
                    position: relative;
                    z-index: 10;
                }

                .fort-page::before {
                    content: '';
                    position: fixed;
                    inset: 0;
                    background: url('/Image_3.jpg') no-repeat center center / cover;
                    opacity: 0.1;
                    z-index: 0;
                    pointer-events: none;
                }

                .flex { display: flex; }
                .justify-center { justify-content: center; }
                .relative { position: relative; }
                .absolute { position: absolute; }
                .pointer-events-none { pointer-events: none; }

                h1, h2, h3, h4 {
                    font-family: var(--ff-serif);
                    font-weight: 700;
                    letter-spacing: -0.01em;
                    color: #1C1B19;
                }

                .fort-page h1, .fort-page h2, .fort-page h3, .fort-page h4 {
                    line-height: 1.25 !important;
                    margin: 0;
                }

                .fort-page p {
                    color: #4A453E !important;
                    line-height: 1.7;
                    font-size: 1.05rem;
                }

                .aura-heading {
                    position: relative;
                    display: inline-block;
                    color: #1C1B19 !important;
                    font-weight: 800;
                }

                .ambient-glow-circle {
                    width: 450px;
                    height: 450px;
                    background: radial-gradient(circle, rgba(184, 134, 11, 0.12) 0%, transparent 70%);
                    filter: blur(50px);
                    z-index: 1;
                }

                /* HERO SECTION */
                .fort-hero {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 7rem 1.5rem 3.5rem;
                    z-index: 2;
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
                    color: #1C1B19;
                    font-size: 0.8rem;
                    margin-bottom: 2rem;
                    text-transform: uppercase;
                    font-weight: 800;
                    letter-spacing: 2px;
                    background: #FFFFFF;
                    padding: 0.7rem 1.4rem;
                    border: 1.5px solid rgba(184, 134, 11, 0.3);
                    border-radius: 30px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.06);
                }
                .back-btn:hover {
                    background: #B8860B;
                    color: #FFFFFF;
                    border-color: #B8860B;
                    transform: translateX(-4px);
                    box-shadow: 0 6px 20px rgba(184, 134, 11, 0.4);
                }

                .hero-eyebrow {
                    display: block;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    font-size: 0.85rem;
                    color: #8B6508;
                    margin-bottom: 1rem;
                    font-weight: 800;
                }

                .hero-title {
                    font-size: clamp(2.4rem, 6vw, 4.2rem);
                    color: #1C1B19;
                    margin-bottom: 1.2rem;
                    font-weight: 800;
                }

                .hero-desc {
                    font-size: clamp(1rem, 2vw, 1.2rem);
                    max-width: 620px;
                    margin: 0 auto;
                    color: #4A453E !important;
                }

                .fort-main {
                    display: block;
                    width: 100%;
                    background: transparent;
                }

                .fort-section {
                    position: relative;
                    padding: 4rem 1.5rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    z-index: 2;
                }

                .section-header {
                    margin-bottom: 3rem;
                    text-align: center;
                }

                .section-title {
                    font-size: clamp(1.8rem, 5vw, 2.6rem);
                    margin-bottom: 1rem;
                    color: #1C1B19 !important;
                    font-weight: 800;
                }

                .title-divider {
                    width: 60px;
                    height: 3px;
                    background: linear-gradient(90deg, #B8860B, #FFD700);
                    margin: 0 auto;
                    border-radius: 2px;
                }

                /* CARDS */
                .monument-card {
                    background: #FFFFFF;
                    border: 1.5px solid rgba(184, 134, 11, 0.25);
                    border-radius: 20px;
                    overflow: hidden;
                    position: relative;
                    box-shadow: 0 10px 30px rgba(28, 27, 25, 0.06);
                    transition: all 0.35s ease;
                }

                .monument-card:hover {
                    border-color: #B8860B;
                    box-shadow: 0 16px 40px rgba(184, 134, 11, 0.18);
                }

                .mon-content {
                    padding: 3rem 2.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                /* FEATURED NODAL CARD */
                .nodal-card-featured {
                    max-width: 680px;
                    width: 100%;
                    background: linear-gradient(180deg, #FFFFFF 0%, #FAF6F0 100%);
                    border: 2px solid rgba(184, 134, 11, 0.35);
                }

                .badge-shield {
                    position: absolute;
                    top: 22px;
                    right: 22px;
                }
                .text-gold {
                    color: #B8860B;
                }

                .user-icon-ring {
                    width: 86px;
                    height: 86px;
                    border-radius: 50%;
                    border: 2px solid #B8860B;
                    background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(184, 134, 11, 0.08));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                    box-shadow: 0 6px 20px rgba(184, 134, 11, 0.2);
                    transition: all 0.4s ease;
                }

                .monument-card:hover .user-icon-ring {
                    transform: scale(1.06);
                    border-color: #D4AF37;
                    box-shadow: 0 8px 25px rgba(184, 134, 11, 0.35);
                }

                .mon-name {
                    font-size: clamp(1.5rem, 4vw, 2.1rem);
                    margin-bottom: 0.6rem;
                    text-align: center;
                    color: #1C1B19;
                    font-weight: 800;
                }

                .role-badge {
                    display: inline-block;
                    color: #8B6508;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    font-weight: 800;
                    margin-bottom: 2rem;
                    padding: 0.5rem 1.4rem;
                    background: rgba(184, 134, 11, 0.12);
                    border: 1px solid rgba(184, 134, 11, 0.3);
                    border-radius: 30px;
                    text-align: center;
                    max-width: 100%;
                    line-height: 1.4;
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
                    background: #FFFFFF;
                    border: 1.5px solid rgba(184, 134, 11, 0.25);
                    border-radius: 14px;
                    color: #1C1B19;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    min-width: 0;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
                }
                .info-item-link:hover {
                    border-color: #B8860B;
                    background: #FAF6F0;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 18px rgba(184, 134, 11, 0.15);
                }

                .icon-wrapper {
                    color: #B8860B;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 42px;
                    height: 42px;
                    min-width: 42px;
                    border-radius: 10px;
                    background: rgba(184, 134, 11, 0.12);
                    border: 1px solid rgba(184, 134, 11, 0.25);
                }

                .info-text {
                    display: flex;
                    flex-direction: column;
                    gap: 0.2rem;
                    min-width: 0;
                    width: 100%;
                    overflow: hidden;
                }

                .info-label {
                    font-size: 0.68rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #8B6508;
                    font-weight: 700;
                }

                .info-val {
                    font-size: 0.88rem;
                    font-weight: 700;
                    color: #1C1B19 !important;
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

                .tech-card {
                    background: linear-gradient(180deg, #FFFFFF 0%, #FAF6F0 100%);
                    border: 1.5px solid rgba(184, 134, 11, 0.3);
                }

                .tech-card .mon-content {
                    align-items: center;
                    padding: 2.8rem 2rem;
                }

                .ring-tech {
                    border-color: #B8860B;
                    background: rgba(184, 134, 11, 0.1);
                    color: #B8860B;
                }

                .badge-tech {
                    color: #8B6508;
                    background: rgba(184, 134, 11, 0.12);
                    border-color: rgba(184, 134, 11, 0.25);
                    font-size: 0.72rem;
                    margin-bottom: 1.2rem;
                }

                .tech-desc {
                    font-size: 0.95rem !important;
                    text-align: center;
                    color: #4A453E !important;
                    margin-bottom: 2rem !important;
                    line-height: 1.6;
                    max-width: 340px;
                    min-height: 48px;
                    font-weight: 500;
                }

                .tech-links {
                    width: 100%;
                }

                /* EMAIL BUTTON - HIGH CONTRAST DARK TEXT */
                .email-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.7rem;
                    padding: 0.95rem 1.4rem;
                    border-radius: 12px;
                    font-size: 0.88rem;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    width: 100%;
                    min-width: 0;
                    background: #FAF6F0;
                    border: 1.5px solid rgba(184, 134, 11, 0.4);
                    color: #1C1B19 !important;
                    box-shadow: 0 4px 15px rgba(28, 27, 25, 0.05);
                }

                .email-btn:hover {
                    background: #B8860B !important;
                    color: #FFFFFF !important;
                    border-color: #B8860B !important;
                    box-shadow: 0 6px 20px rgba(184, 134, 11, 0.35) !important;
                    transform: translateY(-2px);
                }

                .email-btn span.email-text {
                    color: #1C1B19 !important;
                    word-break: break-all;
                    font-weight: 700 !important;
                }

                .email-btn:hover span.email-text {
                    color: #FFFFFF !important;
                }

                /* DARK CTA CARDS (MEDIA & FEEDBACK) */
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
                    background: linear-gradient(145deg, #1C1B19 0%, #2D2923 100%);
                    border: 1.5px solid rgba(212, 175, 55, 0.3);
                    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
                }

                .cta-card:hover {
                    border-color: #FFD700;
                    box-shadow: 0 16px 45px rgba(184, 134, 11, 0.3);
                }

                .flex-center {
                    align-items: center;
                    text-align: center;
                    padding: 3rem 2rem;
                }

                .cta-icon-outer {
                    width: 58px;
                    height: 58px;
                    border-radius: 14px;
                    background: rgba(255, 215, 0, 0.12);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                    border: 1px solid rgba(255, 215, 0, 0.3);
                }

                .cta-card-title {
                    font-size: 1.45rem;
                    margin-bottom: 1rem;
                    color: #FFD700 !important;
                    font-weight: 800;
                }

                .cta-card .mon-desc {
                    font-size: 0.95rem;
                    color: #E2E8F0 !important;
                    line-height: 1.6;
                    margin-bottom: 2.2rem;
                    min-height: 60px;
                }

                .action-cta-btn {
                    background: linear-gradient(135deg, #FFD700, #B8860B);
                    border: none;
                    color: #000000 !important;
                    padding: 0.9rem 1.8rem;
                    font-size: 0.85rem;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.7rem;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.35s ease;
                    text-decoration: none;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    width: auto;
                    min-width: 210px;
                    box-shadow: 0 6px 20px rgba(184, 134, 11, 0.3);
                }

                .action-cta-btn:hover {
                    background: linear-gradient(135deg, #FFFFFF, #FFD700);
                    color: #000000 !important;
                    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.5);
                    transform: translateY(-2px);
                }

                .mesh-bg {
                    background-image: 
                        radial-gradient(circle at 0% 0%, rgba(184, 134, 11, 0.05) 0%, transparent 40%),
                        radial-gradient(circle at 100% 100%, rgba(184, 134, 11, 0.05) 0%, transparent 40%) !important;
                }

                /* RESPONSIVE MEDIA QUERIES */
                @media (max-width: 768px) {
                    .fort-hero { padding-top: 5.5rem; padding-bottom: 2.5rem; }
                    .hero-title { font-size: 2.4rem; }
                    .fort-section { padding: 3rem 1.2rem; }
                    .mon-content { padding: 2.2rem 1.4rem; }
                    .tech-desc { min-height: auto; margin-bottom: 1.5rem !important; }
                    .cta-card .mon-desc { min-height: auto; margin-bottom: 1.8rem; }
                }

                @media (max-width: 480px) {
                    .fort-hero { padding: 5rem 1rem 2.5rem; }
                    .hero-eyebrow { font-size: 0.75rem; letter-spacing: 3px; margin-bottom: 0.8rem; }
                    .hero-title { font-size: 2rem; margin-bottom: 0.8rem; }
                    .hero-desc { font-size: 0.95rem; }
                    .fort-section { padding: 2.2rem 0.85rem; }
                    .section-header { margin-bottom: 2rem; }
                    .section-title { font-size: 1.6rem; }
                    .mon-content { padding: 1.8rem 1rem; }
                    .user-icon-ring { width: 72px; height: 72px; margin-bottom: 1.2rem; }
                    .mon-name { font-size: 1.4rem; }
                    .role-badge { font-size: 0.68rem; padding: 0.4rem 0.9rem; margin-bottom: 1.4rem; letter-spacing: 1px; }
                    .info-links-grid { gap: 0.8rem; }
                    .info-item-link { padding: 0.9rem 0.9rem; gap: 0.75rem; }
                    .icon-wrapper { width: 36px; height: 36px; min-width: 36px; }
                    .info-val { font-size: 0.82rem; }
                    .tech-team-grid, .ctas-grid { gap: 1.5rem; }
                    .tech-card .mon-content, .flex-center { padding: 1.8rem 1rem; }
                    .email-btn { padding: 0.85rem 1rem; font-size: 0.82rem; }
                    .action-cta-btn { min-width: 0; width: 100%; padding: 0.85rem 1rem; }
                }
            `}</style>
        </motion.div>
    );
}
