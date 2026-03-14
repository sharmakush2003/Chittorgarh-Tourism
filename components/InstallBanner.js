"use client";

import { useState, useEffect } from "react";
import { triggerHaptic } from "@/lib/haptics";
import { Download, X, ShieldCheck, Zap, WifiOff } from "lucide-react";

export default function InstallBanner() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            
            // Show the custom banner after a slight delay
            const timer = setTimeout(() => {
                const isDismissed = localStorage.getItem("install_banner_dismissed");
                if (!isDismissed) {
                    setIsVisible(true);
                }
            }, 5000);

            return () => clearTimeout(timer);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        
        triggerHaptic('medium');
        setIsVisible(false);
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        }
        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        triggerHaptic('light');
        setIsVisible(false);
        // Don't show again for 7 days
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
                    backdrop-filter: blur(20px);
                    border: 1px solid var(--gold);
                    padding: 1.5rem;
                    z-index: 1000;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                    animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1);
                }

                @keyframes slideUp {
                    from { transform: translate(-50%, 100%); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }

                .banner-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }

                .badge {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(212, 175, 55, 0.1);
                    color: var(--gold);
                    padding: 4px 10px;
                    font-size: 0.65rem;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    font-weight: 700;
                }

                .close-btn {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.4);
                    cursor: pointer;
                    padding: 4px;
                    transition: 0.3s;
                }

                .close-btn:hover {
                    color: #fff;
                }

                .banner-body h3 {
                    font-family: var(--ff-display);
                    font-size: 1.5rem;
                    color: #fff;
                    margin-bottom: 0.5rem;
                }

                .banner-body p {
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.6);
                    line-height: 1.5;
                    margin-bottom: 1.5rem;
                }

                .features {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .feature {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.75rem;
                    color: #fff;
                    font-weight: 500;
                }

                .icon-small {
                    color: var(--gold);
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
                    padding: 1rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 0.8rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: 0.3s;
                }

                .install-btn:hover {
                    background: #fff;
                }

                .later-btn {
                    flex: 1;
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                    padding: 1rem;
                    font-weight: 600;
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: 0.3s;
                }

                .later-btn:hover {
                    background: rgba(255,255,255,0.05);
                }

                @media (max-width: 480px) {
                    .install-citadel {
                        bottom: 0;
                        width: 100%;
                        border-radius: 20px 20px 0 0;
                    }
                    .features {
                        grid-template-columns: 1fr;
                        gap: 0.5rem;
                    }
                }
            `}</style>

            <div className="banner-header">
                <div className="badge">
                    <ShieldCheck size={12} /> Official Imperial Guide
                </div>
                <button className="close-btn" onClick={handleDismiss} aria-label="Dismiss">
                    <X size={18} />
                </button>
            </div>

            <div className="banner-body">
                <h3>Enter the Fortress</h3>
                <p>Install the official Chittorgarh Guide for a seamless, offline experience within the citadel.</p>
                
                <div className="features">
                    <div className="feature">
                        <WifiOff size={14} className="icon-small" /> Offline History
                    </div>
                    <div className="feature">
                        <Zap size={14} className="icon-small" /> Faster Loading
                    </div>
                </div>

                <div className="actions">
                    <button className="install-btn" onClick={handleInstall}>
                        <Download size={18} /> Install App
                    </button>
                    <button className="later-btn" onClick={handleDismiss}>
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    );
}
