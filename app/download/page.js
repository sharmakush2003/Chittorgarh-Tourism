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
            <div className="download-hero">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container"
                >
                    <Link href="/" className="back-btn" onClick={() => triggerHaptic('light')}>
                        <ArrowLeft size={18} /> {t("btn.back") || "Back"}
                    </Link>
                    
                    <div className="badge">
                        <Smartphone size={16} /> OFFICIAL APP
                    </div>
                    <h1 className="title">Chittorgarh in Your Pocket</h1>
                    <p className="subtitle">
                        Experience the citadel like never before with our official Progressive Web App (PWA). 
                        Swift, offline-ready, and lightweight.
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
                                <h3>Android / Chrome</h3>
                                <p>Standard Installation</p>
                            </div>
                        </div>
                        
                        <div className="steps-list">
                            <div className="step">
                                <span className="step-num">1</span>
                                <p>Tap the <strong>"Install App"</strong> button below if visible.</p>
                            </div>
                            <div className="step">
                                <span className="step-num">2</span>
                                <p>If not visible, tap the <strong>three dots (⋮)</strong> in Chrome.</p>
                            </div>
                            <div className="step">
                                <span className="step-num">3</span>
                                <p>Select <strong>"Install App"</strong> or <strong>"Add to Home Screen"</strong>.</p>
                            </div>
                        </div>

                        {canInstall && !isInstalled ? (
                            <button className="primary-btn" onClick={handleInstall}>
                                <Download size={20} /> Install Now
                            </button>
                        ) : isInstalled ? (
                            <div className="status-badge success">
                                <CheckCircle2 size={16} /> Already Installed
                            </div>
                        ) : (
                            <div className="status-badge info">
                                <AlertCircle size={16} /> Use Browser Menu to Install
                            </div>
                        ) }

                        <div className="divider"><span>OR</span></div>

                        <a href="/chittorgarh-tourism.apk" download className="secondary-btn">
                            <Download size={20} /> Download APK Directly
                        </a>
                        <p className="note">*For devices that don't support PWA installation.</p>
                    </div>

                    <div className="platform-card premium-glass">
                        <div className="card-header">
                            <div className="icon-box ios">
                                <Share size={24} />
                            </div>
                            <div>
                                <h3>iOS / Safari</h3>
                                <p>Apple Device Guide</p>
                            </div>
                        </div>
                        
                        <div className="steps-list">
                            <div className="step">
                                <span className="step-num">1</span>
                                <p>Tap the <strong>Share</strong> button <Share size={16} className="inline-icon" /> at the bottom of Safari.</p>
                            </div>
                            <div className="step">
                                <span className="step-num">2</span>
                                <p>Scroll down and tap <strong>"Add to Home Screen"</strong>.</p>
                            </div>
                            <div className="step">
                                <span className="step-num">3</span>
                                <p>Tap <strong>"Add"</strong> in the top right corner.</p>
                            </div>
                        </div>

                        <div className="status-badge ios-only">
                            <Smartphone size={16} /> Optimized for iPhone & iPad
                        </div>
                    </div>
                </div>

                <section className="features-section">
                    <h2 className="section-title">Why Install the App?</h2>
                    <div className="features-grid">
                        <div className="feat-item">
                            <div className="feat-icon">⚡</div>
                            <h4>Instant Access</h4>
                            <p>Launch directly from your home screen without typing URLs.</p>
                        </div>
                        <div className="feat-item">
                            <div className="feat-icon">📶</div>
                            <h4>Offline Maps</h4>
                            <p>Access heritage maps and survival guides even without internet.</p>
                        </div>
                        <div className="feat-item">
                            <div className="feat-icon">🧊</div>
                            <h4>Lightweight</h4>
                            <p>Uses less than 10MB of space — lighter than any photo.</p>
                        </div>
                    </div>
                </section>
            </main>

            <style jsx>{`
                .download-page {
                    background: #0a0804;
                    color: #fff;
                    min-height: 100vh;
                    padding-bottom: 5rem;
                }
                .container {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }
                .download-hero {
                    padding: 7rem 0 3rem;
                    text-align: center;
                    background: linear-gradient(to bottom, rgba(212, 175, 55, 0.05), transparent);
                    position: relative;
                }
                .back-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: rgba(255,255,255,0.6);
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
                    background: rgba(212, 175, 55, 0.1);
                    color: #D4AF37;
                    padding: 0.5rem 1rem;
                    border-radius: 50px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    margin: 0 auto 2rem;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    width: fit-content;
                }
                .title {
                    font-family: var(--ff-display, serif);
                    font-size: clamp(2.5rem, 8vw, 4rem);
                    margin-bottom: 1.5rem;
                    background: linear-gradient(to bottom, #fff, #D4AF37);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .subtitle {
                    font-size: 1.2rem;
                    color: rgba(255,255,255,0.7);
                    max-width: 700px;
                    margin: 0 auto;
                    line-height: 1.6;
                }
                .install-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                    margin-top: -2rem;
                }
                @media (min-width: 768px) {
                    .install-grid { grid-template-columns: 1fr 1fr; }
                }
                .platform-card {
                    padding: 2.5rem;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 20px;
                    display: flex;
                    flex-direction: column;
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
                .step p { font-size: 0.95rem; line-height: 1.5; color: rgba(255,255,255,0.9); }
                .step strong { color: #D4AF37; }
                
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
                
                .features-section { margin-top: 6rem; text-align: center; }
                .section-title { font-family: var(--ff-display, serif); color: #D4AF37; margin-bottom: 3rem; font-size: 2rem; }
                .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem; }
                .feat-item h4 { color: #fff; margin: 1rem 0 0.5rem; font-size: 1.1rem; }
                .feat-item p { font-size: 0.9rem; color: rgba(255,255,255,0.6); line-height: 1.5; }
                .feat-icon { font-size: 2rem; }
            `}</style>
        </div>
    );
}
