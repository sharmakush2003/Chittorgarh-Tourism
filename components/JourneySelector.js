"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { triggerHaptic } from "@/lib/haptics";
import { History, Heart, Compass, ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import Link from "next/link";

const DOMAINS = [
    {
        id: "historical",
        icon: <History size={24} />,
        color: "#D4AF37",
        link: "/kumbha-palace"
    },
    {
        id: "religious",
        icon: <Heart size={24} />,
        color: "#FF4D4D",
        link: "/meera-bai-temple"
    },
    {
        id: "adventure",
        icon: <Compass size={24} />,
        color: "#4ADE80",
        link: "/gaumukh"
    }
];

export default function JourneySelector() {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState(DOMAINS[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleOpen = () => {
        if (!isOpen) {
            triggerHaptic('medium');
            setIsOpen(true);
        }
    };

    const handleSelect = (domain) => {
        triggerHaptic('light');
        setSelectedDomain(domain);
    };

    return (
        <section className="journey-selector-section" style={{ '--accent-color': selectedDomain.color }}>
            <div className="dynamic-background-overlay"></div>
            
            <div className="container">
                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        <motion.div
                            key="invitation"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="invitation-wrapper"
                        >
                            <button
                                className="journey-trigger-premium"
                                onClick={handleOpen}
                            >
                                <div className="btn-shine"></div>
                                <Sparkles size={20} className="sparkle-icon" />
                                <span>{t("journey.invitation")}</span>
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="selector"
                            initial={{ opacity: 0, filter: "blur(20px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            className="selector-content-v3"
                        >
                            <div className="selector-header">
                                <motion.h2
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {t("journey.title")}
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {t("journey.subtitle")}
                                </motion.p>
                            </div>

                            <div className="dropdown-wrapper-v4">
                                <button 
                                    className="dropdown-trigger-v4"
                                    onClick={() => {
                                        triggerHaptic('light');
                                        setIsDropdownOpen(!isDropdownOpen);
                                    }}
                                >
                                    <div className="trigger-icon">{selectedDomain.icon}</div>
                                    <span className="trigger-text">{t(`journey.cat.${selectedDomain.id}`)}</span>
                                    <motion.div
                                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown size={20} />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            className="dropdown-menu-v4"
                                        >
                                            {DOMAINS.map((domain) => (
                                                <button
                                                    key={domain.id}
                                                    className={`dropdown-item-v4 ${selectedDomain.id === domain.id ? 'active' : ''}`}
                                                    onClick={() => {
                                                        handleSelect(domain);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                >
                                                    <div className="item-icon" style={{ color: domain.color }}>{domain.icon}</div>
                                                    <span>{t(`journey.cat.${domain.id}`)}</span>
                                                    {selectedDomain.id === domain.id && <div className="active-dot"></div>}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <motion.div 
                                className="suggestion-hero-v3"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={selectedDomain.id}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            >
                                <div className="hero-glow-v3"></div>
                                <span className="label-v3">{t("journey.flow.title")}</span>
                                <h3 className="path-v3">{t(`journey.${selectedDomain.id}.flow`)}</h3>
                                <p className="desc-v3">{t(`journey.cat.${selectedDomain.id}.desc`)}</p>
                                
                                <div className="cta-wrapper-v3">
                                    <Link prefetch={false} href={selectedDomain.link} 
                                        className="btn-gold-v3"
                                        onClick={() => triggerHaptic('success')}
                                    >
                                        {t("journey.btn.start")}
                                        <ArrowRight size={20} />
                                    </Link>
                                    <span className="tap-to-change-v3">{t("journey.tapToChange")}</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx>{`
                .journey-selector-section {
                    padding: 6rem 0 10rem;
                    position: relative;
                    z-index: 10;
                    overflow: hidden;
                    transition: background 1s ease;
                }
                
                .dynamic-background-overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 50% 50%, var(--accent-color) 0%, transparent 60%);
                    opacity: 0.08;
                    filter: blur(80px);
                    pointer-events: none;
                    transition: background 1s ease;
                }

                .container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                    display: flex;
                    justify-content: center;
                }

                /* ─── Premium Trigger Button ─── */
                .journey-trigger-premium {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    padding: 1.4rem 3.5rem;
                    border-radius: 100px;
                    display: flex;
                    align-items: center;
                    gap: 1.2rem;
                    color: #fff;
                    font-size: 1.1rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    backdrop-filter: blur(10px);
                }

                .journey-trigger-premium:hover {
                    border-color: var(--gold);
                    transform: translateY(-5px);
                    background: rgba(255, 255, 255, 0.08);
                    box-shadow: 0 20px 50px -10px rgba(212, 175, 55, 0.3);
                }

                .btn-shine {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: none;
                }

                .journey-trigger-premium:hover .btn-shine {
                    left: 200%;
                    transition: 1s ease;
                }

                /* ─── Selector Content V3 ─── */
                .selector-content-v3 {
                    width: 100%;
                    max-width: 900px;
                    margin: 0 auto;
                    text-align: center;
                }

                .selector-header h2 {
                    font-family: var(--ff-display);
                    font-size: clamp(2.5rem, 7vw, 4rem);
                    font-weight: 900;
                    margin-bottom: 1rem;
                    background: linear-gradient(135deg, #fff 0%, var(--gold) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    line-height: 1.1;
                }

                .selector-header p {
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.4);
                    max-width: 500px;
                    margin: 0 auto 3rem;
                    line-height: 1.5;
                }

                .dropdown-wrapper-v4 {
                    position: relative;
                    width: 100%;
                    max-width: 380px;
                    margin: 4rem auto 10rem;
                    z-index: 100;
                }

                .dropdown-trigger-v4 {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 1.2rem 2rem;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    color: #fff;
                    cursor: pointer;
                    transition: 0.3s;
                    backdrop-filter: blur(10px);
                }

                .dropdown-trigger-v4:hover {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(255, 255, 255, 0.3);
                }

                .trigger-icon {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--accent-color);
                }

                .trigger-text {
                    flex: 1;
                    text-align: left;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 0.95rem;
                }

                .dropdown-menu-v4 {
                    position: absolute;
                    top: calc(100% + 1rem);
                    left: 0;
                    right: 0;
                    background: rgba(15, 15, 15, 0.95);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 24px;
                    padding: 0.75rem;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 30px 60px -15px rgba(0,0,0,0.5);
                    overflow: hidden;
                }

                .dropdown-item-v4 {
                    width: 100%;
                    padding: 1rem 1.25rem;
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    color: rgba(255, 255, 255, 0.6);
                    border-radius: 16px;
                    cursor: pointer;
                    transition: 0.3s;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-size: 0.85rem;
                }

                .dropdown-item-v4:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff;
                }

                .dropdown-item-v4.active {
                    background: rgba(255, 255, 255, 0.08);
                    color: #fff;
                }

                .active-dot {
                    width: 6px;
                    height: 6px;
                    background: var(--gold);
                    border-radius: 50%;
                    margin-left: auto;
                    box-shadow: 0 0 10px var(--gold);
                }

                /* ─── Suggestion Hero V3 ─── */
                .suggestion-hero-v3 {
                    position: relative;
                    padding: 4rem 1.5rem;
                    background: radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 80%);
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .label-v3 {
                    display: block;
                    font-size: 0.8rem;
                    color: var(--gold);
                    text-transform: uppercase;
                    letter-spacing: 6px;
                    font-weight: 900;
                    margin-bottom: 2.5rem;
                    opacity: 0.8;
                }

                .path-v3 {
                    font-family: var(--ff-display);
                    font-size: clamp(1.8rem, 5vw, 3.5rem);
                    font-weight: 900;
                    color: #fff;
                    margin-bottom: 2rem;
                    line-height: 1.1;
                    max-width: 800px;
                }

                .desc-v3 {
                    font-size: 1.25rem;
                    color: rgba(255, 255, 255, 0.5);
                    font-style: italic;
                    max-width: 600px;
                    margin: 0 auto 4rem;
                    line-height: 1.6;
                }

                .cta-wrapper-v3 {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2.5rem;
                    width: 100%;
                }

                .btn-gold-v3 {
                    background: linear-gradient(135deg, var(--gold) 0%, #b8860b 100%);
                    color: #000;
                    padding: 1rem 3rem;
                    border-radius: 100px;
                    font-size: 1rem;
                    font-weight: 900;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    transition: all 0.4s var(--liquid-easing);
                    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.2);
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                }

                .btn-gold-v3:hover {
                    transform: translateY(-5px) scale(1.05);
                    box-shadow: 0 25px 50px rgba(212, 175, 55, 0.5);
                    filter: brightness(1.1);
                }

                .tap-to-change-v3 {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.2);
                    text-transform: uppercase;
                    letter-spacing: 3px;
                }

                @media (max-width: 768px) {
                    .journey-selector-section { padding: 4rem 1.5rem 8rem; }
                    .selector-header h2 { font-size: 3rem; }
                    .domain-grid-premium { gap: 1.5rem; }
                    .icon-wrapper-v3 { width: 70px; height: 70px; }
                    .tab-label-v3 { font-size: 0.75rem; letter-spacing: 2px; }
                    .suggestion-hero-v3 { padding: 4rem 1rem; }
                    .path-v3 { font-size: 2.2rem; }
                    .desc-v3 { font-size: 1.1rem; }
                    .btn-gold-v3 { width: 100%; justify-content: center; }
                }
            `}</style>
        </section>
    );
}
