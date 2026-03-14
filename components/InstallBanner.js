"use client";

import { useState, useEffect } from "react";
import { triggerHaptic } from "@/lib/haptics";
import { Download, X, ShieldCheck, Zap, WifiOff, Share, MoreVertical } from "lucide-react";

export default function InstallBanner() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isAndroid, setIsAndroid] = useState(false);

    useEffect(() => {
        // Platform detection
        const ua = navigator.userAgent;
        const isIOSDevice = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
        const isAndroidDevice = /Android/i.test(ua);
        
        setIsIOS(isIOSDevice);
        setIsAndroid(isAndroidDevice);

        const handleBeforeInstallPrompt = (e) => {
            console.log("PWA: beforeinstallprompt fired");
            e.preventDefault();
            setDeferredPrompt(e);
            
            checkAndShow();
        };

        const checkAndShow = () => {
            const hasSelectedLang = localStorage.getItem("ctt_locale");
            if (!hasSelectedLang) return false;

            const isDismissed = localStorage.getItem("install_banner_dismissed");
            const lastDismissed = parseInt(isDismissed || "0");
            const weekInMs = 7 * 24 * 60 * 60 * 1000;
            
            if (Date.now() - lastDismissed > weekInMs || !isDismissed) {
                const timer = setTimeout(() => {
                    setIsVisible(true);
                }, 3000);
                return true;
            }
            return true;
        };

        // If it's a mobile device or for testing, check for the banner
        let pollingInterval;
        if (!window.navigator.standalone) {
            // Try immediately
            const shown = checkAndShow();
            
            // If not shown yet (waiting for lang), poll every 1s
            if (!shown) {
                pollingInterval = setInterval(() => {
                    const nowShown = checkAndShow();
                    if (nowShown) clearInterval(pollingInterval);
                }, 1000);
            }
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("storage", () => checkAndShow());

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            if (pollingInterval) clearInterval(pollingInterval);
        };
    }, []);

    const handleInstallAction = async () => {
        triggerHaptic('medium');
        
        if (deferredPrompt) {
            setIsVisible(false);
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                localStorage.setItem("install_banner_dismissed", Date.now());
            }
            setDeferredPrompt(null);
        } else {
            // Manual mode (iOS or Android fallback)
            // Just close the banner after they've read instructions
            setIsVisible(false);
            localStorage.setItem("install_banner_dismissed", Date.now());
        }
    };

    const handleDismiss = () => {
        triggerHaptic('light');
        setIsVisible(false);
        localStorage.setItem("install_banner_dismissed", Date.now());
    };

    if (!isVisible) return null;

    return (
        <div className="install-citadel">
            <style jsx>{`
                .install-citadel {
                    position: fixed;
                    bottom: 2rem;
                    left: 50%;
                    transform: translateX(-50%);
                    width: calc(100% - 2rem);
                    max-width: 500px;
                    background: rgba(15, 10, 6, 0.98);
                    backdrop-filter: blur(25px) saturate(180%);
                    border: 2px solid var(--gold);
                    padding: 1.5rem;
                    z-index: 99999;
                    box-shadow: 0 30px 70px rgba(0,0,0,1);
                    animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1);
                }

                @keyframes slideUp {
                    from { transform: translate(-50%, 100%); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }

                .banner-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.25rem;
                }

                .badge {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: linear-gradient(90deg, rgba(212, 175, 55, 0.3), transparent);
                    border-left: 3px solid var(--gold);
                    color: var(--gold);
                    padding: 8px 14px;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 2.5px;
                    font-weight: 800;
                }

                .close-btn {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 50%;
                    color: #fff;
                    cursor: pointer;
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: 0.3s;
                }

                .banner-body h3 {
                    font-family: var(--ff-display);
                    font-size: 1.8rem;
                    color: #fff;
                    margin-bottom: 0.75rem;
                    letter-spacing: 1px;
                }

                .banner-body p {
                    font-size: 1rem;
                    color: rgba(255,255,255,0.8);
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }

                .instruction-box {
                    background: rgba(212, 175, 55, 0.05);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    padding: 1.25rem;
                    margin-bottom: 1.5rem;
                    border-radius: 8px;
                }

                .instruction-step {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                    font-size: 0.9rem;
                    color: #fff;
                    margin-bottom: 0.75rem;
                }

                .instruction-step:last-child { margin-bottom: 0; }

                .icon-circle {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: var(--gold);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #000;
                    flex-shrink: 0;
                    font-weight: bold;
                }

                .actions {
                    display: flex;
                    gap: 1rem;
                }

                .install-btn {
                    flex: 2;
                    background: var(--gold);
                    color: #000;
                    border: none;
                    padding: 1.2rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 0.9rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    transition: 0.4s;
                }

                .later-btn {
                    flex: 1;
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.2);
                    color: #fff;
                    padding: 1.2rem;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                }

                @media (max-width: 480px) {
                    .install-citadel {
                        bottom: 0;
                        width: 100%;
                        border-bottom: none;
                        border-left: none;
                        border-right: none;
                        padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
                    }
                }
            `}</style>

            <div className="banner-header">
                <div className="badge">
                    <ShieldCheck size={16} /> Official App
                </div>
                <button className="close-btn" onClick={handleDismiss} aria-label="Dismiss">
                    <X size={20} />
                </button>
            </div>

            <div className="banner-body">
                <h3>Imperial Guide</h3>
                <p>Download for perfect offline access to heritage maps and historical chronicles.</p>
                
                <div className="instruction-box">
                    {isIOS ? (
                        <>
                            <div className="instruction-step">
                                <div className="icon-circle"><Share size={12} /></div>
                                <span>Tap the <strong>Share</strong> button in Safari.</span>
                            </div>
                            <div className="instruction-step">
                                <div className="icon-circle"><Download size={12} /></div>
                                <span>Select <strong>'Add to Home Screen'</strong>.</span>
                            </div>
                        </>
                    ) : (
                        <>
                            {!deferredPrompt ? (
                                <>
                                    <div className="instruction-step">
                                        <div className="icon-circle"><MoreVertical size={12} /></div>
                                        <span>Tap the <strong>Menu (3 dots)</strong> in Chrome.</span>
                                    </div>
                                    <div className="instruction-step">
                                        <div className="icon-circle"><Download size={12} /></div>
                                        <span>Select <strong>'Install App'</strong>.</span>
                                    </div>
                                </>
                            ) : (
                                <div className="instruction-step">
                                    <div className="icon-circle"><Zap size={12} /></div>
                                    <span>Ready to install! Just tap the button below.</span>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="actions">
                    <button className="install-btn" onClick={handleInstallAction}>
                        <Download size={20} /> {deferredPrompt ? "Install Now" : "Install App"}
                    </button>
                    <button className="later-btn" onClick={handleDismiss}>
                        Later
                    </button>
                </div>
            </div>
        </div>
    );
}
