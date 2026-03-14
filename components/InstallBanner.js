"use client";

import { useState, useEffect } from "react";
import { triggerHaptic } from "@/lib/haptics";
import { Download, X, ShieldCheck, Zap, WifiOff, Share } from "lucide-react";

export default function InstallBanner() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Detect iOS
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(isIOSDevice);

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            
            // Show for Android/Chrome
            showAfterDelay();
        };

        const showAfterDelay = () => {
            const timer = setTimeout(() => {
                const isDismissed = localStorage.getItem("install_banner_dismissed");
                // Only show if not dismissed recently (1 week)
                const lastDismissed = parseInt(isDismissed || "0");
                const weekInMs = 7 * 24 * 60 * 60 * 1000;
                
                if (Date.now() - lastDismissed > weekInMs) {
                    setIsVisible(true);
                }
            }, 5000);
            return timer;
        };

        // If it's iOS, we show the manual banner since beforeinstallprompt won't fire
        let iosTimer;
        if (isIOSDevice && !window.navigator.standalone) {
            iosTimer = showAfterDelay();
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            if (iosTimer) clearTimeout(iosTimer);
        };
    }, []);

    const handleInstall = async () => {
        if (isIOS) {
            // iOS instruction alert or just keep banner open with instructions
            return;
        }

        if (!deferredPrompt) return;
        
        triggerHaptic('medium');
        setIsVisible(false);
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            localStorage.setItem("install_banner_dismissed", Date.now());
        }
        setDeferredPrompt(null);
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
                    background: rgba(15, 10, 6, 0.95);
                    backdrop-filter: blur(25px) saturate(180%);
                    border: 1px solid var(--gold);
                    padding: 1.5rem;
                    z-index: 9999;
                    box-shadow: 0 25px 60px rgba(0,0,0,0.8);
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
                    background: linear-gradient(90deg, rgba(212, 175, 55, 0.2), transparent);
                    border-left: 2px solid var(--gold);
                    color: var(--gold);
                    padding: 6px 12px;
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-weight: 700;
                }

                .close-btn {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.4);
                    cursor: pointer;
                    padding: 8px;
                    margin: -8px;
                    transition: 0.3s;
                }

                .banner-body h3 {
                    font-family: var(--ff-display);
                    font-size: 1.6rem;
                    color: #fff;
                    margin-bottom: 0.75rem;
                    background: linear-gradient(to right, #fff, var(--gold-light));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .banner-body p {
                    font-size: 0.95rem;
                    color: rgba(255,255,255,0.7);
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }

                .ios-instruction {
                    background: rgba(255,255,255,0.05);
                    border: 1px dashed rgba(212, 175, 55, 0.3);
                    padding: 1rem;
                    margin-bottom: 1.5rem;
                    border-radius: 4px;
                }

                .instruction-step {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 0.85rem;
                    color: #fff;
                    margin-bottom: 0.5rem;
                }

                .instruction-step:last-child { margin-bottom: 0; }

                .icon-circle {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: rgba(212, 175, 55, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--gold);
                    flex-shrink: 0;
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
                    padding: 1.1rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 0.85rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    transition: 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .install-btn:hover {
                    background: #fff;
                    transform: scale(1.02);
                }

                .later-btn {
                    flex: 1;
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.15);
                    color: #fff;
                    padding: 1.1rem;
                    font-weight: 600;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: 0.3s;
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
                    <ShieldCheck size={14} /> Imperial Offline Guide
                </div>
                <button className="close-btn" onClick={handleDismiss} aria-label="Dismiss">
                    <X size={20} />
                </button>
            </div>

            <div className="banner-body">
                <h3>Enter the Fortress</h3>
                <p>Download the official guide for perfect offline access and premium heritage Chronicles.</p>
                
                {isIOS ? (
                    <div className="ios-instruction">
                        <div className="instruction-step">
                            <div className="icon-circle"><Share size={14} /></div>
                            <span>Tap the <strong>Share</strong> button in Safari</span>
                        </div>
                        <div className="instruction-step">
                            <div className="icon-circle"><Download size={14} /></div>
                            <span>Scroll down and tap <strong>Add to Home Screen</strong></span>
                        </div>
                    </div>
                ) : null}

                <div className="actions">
                    {!isIOS ? (
                        <button className="install-btn" onClick={handleInstall}>
                            <Download size={18} /> Install App
                        </button>
                    ) : (
                        <button className="install-btn" onClick={handleDismiss}>
                            Got It
                        </button>
                    )}
                    <button className="later-btn" onClick={handleDismiss}>
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    );
}
