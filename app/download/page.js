"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Smartphone, Share, MoreVertical, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { triggerHaptic } from "@/lib/haptics";

export default function DownloadPage() {
    const { t, lang } = useLanguage();
    const [isIOS, setIsIOS] = useState(false);
    const [canInstall, setCanInstall] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent;
        const ios = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
        setIsIOS(ios);

        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
            setIsInstalled(true);
        }

        const handler = (e) => {
            e.preventDefault();
            window.__pwaPrompt = e;
            setCanInstall(true);
        };

        window.addEventListener("beforeinstallprompt", handler);
        
        if (window.__pwaPrompt) {
            setCanInstall(true);
        }

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstall = async () => {
        const prompt = window.__pwaPrompt;
        if (prompt) {
            try {
                prompt.prompt();
                const { outcome } = await prompt.userChoice;
                if (outcome === "accepted") {
                    setIsInstalled(true);
                    setShowSuccess(true);
                }
                window.__pwaPrompt = null;
                setCanInstall(false);
            } catch (err) {
                console.error("Install failed:", err);
            }
        }
    };

    return (
        <div className="download-page">
            {/* ═══ FIXED BACKGROUND ══════════════════════ */}
            <div className="fixed-bg"></div>
            <div className="bg-overlay"></div>

            <div className="download-hero">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container"
                >
                    <div className="badge">
                        <Smartphone size={16} /> {t("dl.hero.official")}
                    </div>
                    <h1 className="title">{t("dl.hero.title")}</h1>
                    <p className="subtitle">
                        {t("dl.hero.subtitle")}
                    </p>
                </motion.div>
            </div>

            <main className="container main-content">
                <div className="install-grid">
                    {/* Platform Selection */}
                    <div className="platform-card premium-glass">
                        <div className="card-header">
                            <div className="icon-box android">
                                <Download size={24} />
                            </div>
                            <div>
                                <h3>{t("dl.android.title")}</h3>
                                <p>{t("dl.android.subtitle")}</p>
                            </div>
                        </div>
                        
                        <div className="steps-list">
                            <div className="step">
                                <span className="step-num">1</span>
                                <p dangerouslySetInnerHTML={{ __html: t("dl.android.step1") }}></p>
                            </div>
                            <div className="step">
                                <span className="step-num">2</span>
                                <p dangerouslySetInnerHTML={{ __html: t("dl.android.step2") }}></p>
                            </div>
                            <div className="step">
                                <span className="step-num">3</span>
                                <p dangerouslySetInnerHTML={{ __html: t("dl.android.step3") }}></p>
                            </div>
                        </div>

                        {canInstall && !isInstalled ? (
                            <button className="primary-btn" onClick={handleInstall}>
                                <Download size={20} /> {t("dl.android.installBtn")}
                            </button>
                        ) : isInstalled ? (
                            <div className="status-badge success">
                                <CheckCircle2 size={16} /> {t("dl.android.installed")}
                            </div>
                        ) : (
                            <div className="status-badge info">
                                <AlertCircle size={16} /> {t("dl.android.menuInstall")}
                            </div>
                        ) }
                    </div>

                    <div className="platform-card premium-glass">
                        <div className="card-header">
                            <div className="icon-box ios">
                                <Share size={24} />
                            </div>
                            <div>
                                <h3>{t("dl.ios.title")}</h3>
                                <p>{t("dl.ios.subtitle")}</p>
                            </div>
                        </div>
                        
                        <div className="steps-list">
                            <div className="step">
                                <span className="step-num">1</span>
                                <p dangerouslySetInnerHTML={{ __html: t("dl.ios.step1") }}></p>
                            </div>
                            <div className="step">
                                <span className="step-num">2</span>
                                <p dangerouslySetInnerHTML={{ __html: t("dl.ios.step2") }}></p>
                            </div>
                            <div className="step">
                                <span className="step-num">3</span>
                                <p dangerouslySetInnerHTML={{ __html: t("dl.ios.step3") }}></p>
                            </div>
                        </div>

                        <div className="status-badge ios-only">
                            <Smartphone size={16} /> {t("dl.ios.optimized")}
                        </div>
                    </div>
                </div>

                <section className="features-section">
                    <h2 className="section-title">{t("dl.why.title")}</h2>
                    <div className="features-grid">
                        <div className="feat-item">
                            <div className="feat-icon">⚡</div>
                            <h4>{t("dl.feat1.title")}</h4>
                            <p>{t("dl.feat1.desc")}</p>
                        </div>
                        <div className="feat-item">
                            <div className="feat-icon">📶</div>
                            <h4>{t("dl.feat2.title")}</h4>
                            <p>{t("dl.feat2.desc")}</p>
                        </div>
                        <div className="feat-item">
                            <div className="feat-icon">🧊</div>
                            <h4>{t("dl.feat3.title")}</h4>
                            <p>{t("dl.feat3.desc")}</p>
                        </div>
                    </div>
                </section>
            </main>

            <style jsx>{`
                .download-page {
                    position: relative;
                    min-height: 100vh;
                    background: transparent;
                    color: #fff;
                    padding-bottom: 5rem;
                }

                .fixed-bg {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: url('/hero_bg.png') no-repeat center center / cover;
                    z-index: 0;
                    pointer-events: none;
                }

                .bg-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: linear-gradient(to bottom, 
                        rgba(15, 10, 6, 0.35) 0%, 
                        rgba(15, 10, 6, 0.25) 40%,
                        rgba(15, 10, 6, 0.65) 100%
                    );
                    z-index: 1;
                    pointer-events: none;
                }

                :global([data-lang="hi"]) .download-page {
                    font-family: var(--font-martel), serif;
                }

                .container {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                .download-hero {
                    padding: 155px 0 3rem;
                    text-align: center;
                    position: relative;
                }

                .back-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: rgba(255,255,255,0.85);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 2rem;
                    transition: color 0.3s ease;
                }
                .back-btn:hover { color: #D4AF37; }

                .badge {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    background: rgba(15, 10, 6, 0.85);
                    color: #F5E6AB;
                    padding: 0.5rem 1.2rem;
                    border-radius: 50px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    margin: 0 auto 2rem;
                    border: 1px solid rgba(212, 175, 55, 0.45);
                    width: fit-content;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                }

                .title {
                    font-family: var(--ff-display, serif);
                    font-size: clamp(2.5rem, 8vw, 4rem);
                    margin-bottom: 1.5rem;
                    background: linear-gradient(to bottom, #fff, #D4AF37);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    padding: 0.1em 0; /* Prevents clipping of Hindi matras */
                    line-height: 1.2;
                    filter: drop-shadow(0 4px 15px rgba(0,0,0,0.9));
                }
                :global([data-lang="hi"]) .title {
                    font-family: var(--font-martel), serif;
                    line-height: 1.4;
                }

                .subtitle {
                    font-size: 1.2rem;
                    color: #FFFFFF;
                    opacity: 0.95;
                    max-width: 700px;
                    margin: 0 auto;
                    line-height: 1.6;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.9);
                }

                .install-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                    margin-top: 1rem;
                }

                @media (min-width: 768px) {
                    .install-grid { grid-template-columns: 1fr 1fr; }
                }

                .platform-card {
                    padding: 2.5rem;
                    background: rgba(20, 15, 10, 0.88);
                    border: 1px solid rgba(212, 175, 55, 0.38);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-radius: 22px;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.65);
                }
                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-bottom: 2.5rem;
                }
                .icon-box {
                    width: 56px;
                    height: 56px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .android { background: rgba(60, 186, 84, 0.1); color: #3cba54; }
                .ios { background: rgba(255, 255, 255, 0.1); color: #fff; }
                
                .steps-list {
                    margin-bottom: 2.5rem;
                    flex-grow: 1;
                }
                .step {
                    display: flex;
                    gap: 1.25rem;
                    margin-bottom: 1.5rem;
                    align-items: flex-start;
                }
                .step-num {
                    width: 28px;
                    height: 28px;
                    background: #D4AF37;
                    color: #000;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 900;
                    font-size: 0.8rem;
                    flex-shrink: 0;
                }
                .step p { font-size: 0.95rem; line-height: 1.8; color: rgba(255,255,255,0.9); }
                .step strong { color: #D4AF37; white-space: nowrap; }
                
                .primary-btn {
                    background: #D4AF37;
                    color: #000;
                    border: none;
                    padding: 1rem;
                    border-radius: 8px;
                    font-weight: 800;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .secondary-btn {
                    background: transparent;
                    border: 1px solid #D4AF37;
                    color: #D4AF37;
                    padding: 0.9rem;
                    border-radius: 8px;
                    font-weight: 700;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .divider {
                    text-align: center;
                    margin: 1.5rem 0;
                    position: relative;
                }
                .divider::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: rgba(255,255,255,0.1);
                    z-index: 1;
                }
                .divider span {
                    background: #0a0804;
                    padding: 0 1rem;
                    position: relative;
                    z-index: 2;
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.4);
                }
                .status-badge {
                    padding: 0.75rem;
                    border-radius: 8px;
                    text-align: center;
                    font-size: 0.85rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }
                .success { background: rgba(60, 186, 84, 0.1); color: #3cba54; }
                .info { background: rgba(212, 175, 55, 0.05); color: #D4AF37; border: 1px dashed rgba(212, 175, 55, 0.3); }
                .ios-only { background: rgba(255,255,255,0.05); color: #fff; }
                
                .note { font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-top: 0.75rem; text-align: center; }
                
                .features-section { margin-top: 5rem; text-align: center; }
                .section-title { font-family: var(--ff-display, serif); color: #D4AF37; margin-bottom: 2.5rem; font-size: 2.2rem; font-weight: 800; filter: drop-shadow(0 4px 15px rgba(0,0,0,0.9)); }
                .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.75rem; }
                .feat-item {
                    background: rgba(20, 15, 10, 0.88);
                    border: 1px solid rgba(212, 175, 55, 0.38);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-radius: 20px;
                    padding: 2.2rem 1.6rem;
                    box-shadow: 0 15px 45px rgba(0,0,0,0.65);
                    transition: transform 0.3s ease;
                }
                .feat-item:hover { transform: translateY(-4px); border-color: rgba(212, 175, 55, 0.7); }
                .feat-item h4 { color: #FFFFFF; margin: 1rem 0 0.6rem; font-size: 1.2rem; font-weight: 800; font-family: var(--ff-display), serif; }
                .feat-item p { font-size: 0.92rem; color: #FFFFFF; line-height: 1.65; opacity: 0.95; font-weight: 400; text-shadow: 0 1px 4px rgba(0,0,0,0.9); }
                .feat-icon { font-size: 2rem; }
            `}</style>
        </div>
    );
}
