"use client";

import { useState, useEffect, useRef } from "react";
import { Download, X, Share, MoreVertical } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function InstallBanner() {
    const [show, setShow] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [canInstall, setCanInstall] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const promptRef = useRef(null);

    const { lang } = useLanguage();

    useEffect(() => {
        // Only show once per device after language selection
        if (!localStorage.getItem("ctt_locale")) {
            return;
        }
        // Detect platforms and browsers
        const ua = navigator.userAgent;
        const ios = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
        const inApp = /FBAN|FBAV|Instagram|Threads|LinkedIn|Twitter|WhatsApp/i.test(ua);
        
        setIsIOS(ios);

        // Already installed? Don't show
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
            return;
        }

        // Check if dismissed permanently
        if (localStorage.getItem("pwa_banner_hidden")) return;

        // Unified show logic
        const showWithDelay = (delay = 3000) => {
            setTimeout(() => {
                setShow(true);
                // Mark as shown immediately so it never appears again even without interaction
                localStorage.setItem("pwa_banner_hidden", "true");
            }, delay);
        };

        if (ios) {
            showWithDelay(3000);
            return;
        }

        const isMobile = /Mobi|Android/i.test(ua);

        const handler = (e) => {
            promptRef.current = e;
            window.__pwaPrompt = e;
            setCanInstall(true);
            showWithDelay(1000);
        };

        const installedHandler = () => {
            setShow(false);
            setShowSuccess(true);
            localStorage.setItem("pwa_banner_hidden", "true");
        };

        window.addEventListener("beforeinstallprompt", handler);
        window.addEventListener("appinstalled", installedHandler);

        if (window.__pwaPrompt) {
            promptRef.current = window.__pwaPrompt;
            setCanInstall(true);
            showWithDelay(1000);
        } else if (isMobile || inApp) {
            showWithDelay(4000);
        }

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
            window.removeEventListener("appinstalled", installedHandler);
        };
    }, [lang]);

    const handleInstall = async () => {
        const prompt = promptRef.current || window.__pwaPrompt;
        if (prompt) {
            try {
                prompt.prompt();
                const { outcome } = await prompt.userChoice;
                if (outcome === "accepted") {
                    // Success will be handled by 'appinstalled' event
                }
                promptRef.current = null;
                window.__pwaPrompt = null;
                setCanInstall(false);
            } catch (err) {
                console.error("Install failed:", err);
            }
        }
    };

    const handleDismiss = () => {
        setShow(false);
        localStorage.setItem("pwa_banner_hidden", "true");
    };

    if (showSuccess) {
        return (
            <>
                <style>{`
                    .pwa-success-banner {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: #0f0a06;
                        border: 2px solid #D4AF37;
                        padding: 2.5rem 2rem;
                        z-index: 100000;
                        text-align: center;
                        border-radius: 12px;
                        width: 90%;
                        max-width: 400px;
                        animation: pwaPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        box-shadow: 0 20px 60px rgba(0,0,0,0.9);
                    }
                    @keyframes pwaPop {
                        from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
                        to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    }
                    .pwa-success-title {
                        color: #D4AF37;
                        font-size: 1.5rem;
                        font-weight: 800;
                        margin-bottom: 1rem;
                    }
                    .pwa-success-text {
                        color: rgba(255,255,255,0.9);
                        line-height: 1.6;
                        margin-bottom: 1.5rem;
                        font-style: italic;
                    }
                    .pwa-success-btn {
                        background: #D4AF37;
                        border: none;
                        padding: 0.75rem 2rem;
                        border-radius: 4px;
                        font-weight: 700;
                        cursor: pointer;
                        text-transform: uppercase;
                    }
                `}</style>
                <div className="pwa-success-banner">
                    <div className="pwa-success-title">🙏 Padharo Mhare Desh!</div>
                    <p className="pwa-success-text">
                        "Chittorgarh ka gaurav ab aapke hath mein."<br /><br />
                        Thank you for bringing the legend of Rajasthan's mightiest citadel to your home screen! 🏰✨
                    </p>
                    <button className="pwa-success-btn" onClick={() => setShowSuccess(false)}>Dhanyawad</button>
                </div>
            </>
        );
    }

    if (!show) return null;

    const isInApp = /FBAN|FBAV|Instagram|Threads|LinkedIn|Twitter|WhatsApp/i.test(navigator.userAgent);

    return (
        <>
            <style>{`
                .pwa-banner {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: #0f0a06;
                    border-top: 2px solid #D4AF37;
                    padding: 1.25rem 1.5rem calc(1.25rem + env(safe-area-inset-bottom));
                    z-index: 99999;
                    animation: pwaSlide 0.4s ease;
                    box-shadow: 0 -10px 40px rgba(0,0,0,0.7);
                }
                @keyframes pwaSlide {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                .pwa-banner-inner {
                    max-width: 560px;
                    margin: 0 auto;
                }
                .pwa-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 0.75rem;
                }
                .pwa-title {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #D4AF37;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
                .pwa-close {
                    background: none;
                    border: none;
                    color: #aaa;
                    cursor: pointer;
                    padding: 4px;
                }
                .pwa-desc {
                    font-size: 0.875rem;
                    color: rgba(255,255,255,0.75);
                    margin-bottom: 1rem;
                    line-height: 1.5;
                }
                .pwa-steps {
                    background: rgba(212,175,55,0.08);
                    border: 1px solid rgba(212,175,55,0.25);
                    border-radius: 8px;
                    padding: 1rem;
                    margin-bottom: 1rem;
                    font-size: 0.875rem;
                    color: #fff;
                    line-height: 1.7;
                }
                .pwa-steps strong { color: #D4AF37; }
                .pwa-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                @media (min-width: 400px) {
                    .pwa-actions { flex-direction: row; }
                }
                .pwa-btn {
                    flex: 1;
                    padding: 0.9rem 1.25rem;
                    font-weight: 800;
                    font-size: 0.85rem;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    border-radius: 4px;
                    transition: 0.3s;
                }
                .pwa-install-btn {
                    background: #D4AF37;
                    color: #000;
                    border: none;
                }
                .pwa-apk-btn {
                    background: #2D2418;
                    color: #D4AF37;
                    border: 1px solid #D4AF37;
                }
                .pwa-later-btn {
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.2);
                    color: #fff;
                }
            `}</style>

            <div className="pwa-banner" role="dialog" aria-label="Install App">
                <div className="pwa-banner-inner">
                    <div className="pwa-top">
                        <span className="pwa-title">📱 Official Chittorgarh App</span>
                        <button className="pwa-close" onClick={handleDismiss} aria-label="Close">
                            <X size={20} />
                        </button>
                    </div>

                    <p className="pwa-desc">Download for perfect offline access to heritage maps and chronicles.</p>

                    <div className="pwa-steps">
                        {isInApp ? (
                            <div style={{color: '#FFD700'}}>
                                <strong>⚠️ In-App Browser Detected:</strong><br />
                                Tap the <strong>⋮ Menu</strong> or <strong>Share</strong> and select <strong>"Open in Chrome/Safari"</strong> to install.
                            </div>
                        ) : isIOS ? (
                            <>
                                1. Tap <strong>Share</strong> <Share size={14} style={{display:'inline'}} /><br />
                                2. Tap <strong>"Add to Home Screen"</strong>
                            </>
                        ) : !canInstall ? (
                            <>
                                1. Tap <strong>⋮ Menu</strong> in Chrome<br />
                                2. Tap <strong>"Install App"</strong> or <strong>"Add to Home Screen"</strong><br />
                                <span style={{fontSize:'0.75rem', opacity:0.8, marginTop:'4px', display:'block'}}>
                                    *If not found, please use the <strong>Download APK</strong> button below.
                                </span>
                            </>
                        ) : (
                            "Ready to install! Use the button below for instant access."
                        )}
                    </div>

                    <div className="pwa-actions">
                        {canInstall && !isIOS ? (
                            <button className="pwa-btn pwa-install-btn" onClick={handleInstall}>
                                <Download size={18} /> Install Now
                            </button>
                        ) : !isIOS && !isInApp ? (
                            <a 
                                href="/chittorgarh-tourism.apk" 
                                download 
                                className="pwa-btn pwa-apk-btn"
                                onClick={() => {
                                    setTimeout(() => {
                                        setShow(false);
                                        setShowSuccess(true);
                                    }, 2000);
                                }}
                            >
                                <Download size={18} /> Download APK
                            </a>
                        ) : (
                            <button className="pwa-btn pwa-install-btn" onClick={() => {
                                setShow(false);
                                setShowSuccess(true);
                                localStorage.setItem("pwa_banner_hidden", "true");
                            }}>
                                Got it!
                            </button>
                        )}
                        <button className="pwa-btn pwa-later-btn" onClick={handleDismiss}>Later</button>
                    </div>
                </div>
            </div>
        </>
    );
}
