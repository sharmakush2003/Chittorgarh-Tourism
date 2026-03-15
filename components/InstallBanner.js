"use client";

import { useState, useEffect, useRef } from "react";
import { Download, X, Share, MoreVertical } from "lucide-react";

export default function InstallBanner() {
    const [show, setShow] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [canInstall, setCanInstall] = useState(false);
    const promptRef = useRef(null);

    useEffect(() => {
        // Detect iOS Safari (no beforeinstallprompt support)
        const ua = navigator.userAgent;
        const ios = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
        setIsIOS(ios);

        // Already installed? Don't show
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
            return;
        }

        // Already dismissed recently?
        const dismissed = parseInt(localStorage.getItem("pwa_dismissed") || "0");
        if (Date.now() - dismissed < 7 * 24 * 3600 * 1000) return;

        // On iOS, show manual instructions after a delay
        if (ios) {
            const hasLang = localStorage.getItem("ctt_locale");
            if (hasLang) {
                setTimeout(() => setShow(true), 4000);
            } else {
                // Poll until language is selected
                const interval = setInterval(() => {
                    if (localStorage.getItem("ctt_locale")) {
                        clearInterval(interval);
                        setTimeout(() => setShow(true), 3000);
                    }
                }, 1000);
                return () => clearInterval(interval);
            }
            return;
        }

        // On Chrome/Android — wait for the browser to fire the install prompt
        const handler = (e) => {
            // IMPORTANT: We do NOT call e.preventDefault() here.
            // This lets Chrome show "Install App" in its own menu.
            // We also keep a reference to trigger it from our button.
            promptRef.current = e;
            window.__pwaPrompt = e;
            setCanInstall(true);

            const hasLang = localStorage.getItem("ctt_locale");
            if (hasLang) {
                setTimeout(() => setShow(true), 3000);
            }
        };

        window.addEventListener("beforeinstallprompt", handler);

        // Also check if the prompt was already captured before this component mounted
        if (window.__pwaPrompt) {
            promptRef.current = window.__pwaPrompt;
            setCanInstall(true);
            if (localStorage.getItem("ctt_locale")) {
                setTimeout(() => setShow(true), 3000);
            }
        }

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstall = async () => {
        const prompt = promptRef.current || window.__pwaPrompt;
        if (prompt) {
            try {
                prompt.prompt();
                const { outcome } = await prompt.userChoice;
                if (outcome === "accepted") {
                    localStorage.setItem("pwa_dismissed", Date.now());
                    setShow(false);
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
        localStorage.setItem("pwa_dismissed", Date.now());
    };

    if (!show) return null;

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
                    gap: 0.75rem;
                }
                .pwa-install-btn {
                    flex: 1;
                    background: #D4AF37;
                    color: #000;
                    border: none;
                    padding: 0.9rem 1.5rem;
                    font-weight: 800;
                    font-size: 0.9rem;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    border-radius: 2px;
                }
                .pwa-later-btn {
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.2);
                    color: #fff;
                    padding: 0.9rem 1.25rem;
                    font-size: 0.875rem;
                    cursor: pointer;
                    border-radius: 2px;
                }
            `}</style>

            <div className="pwa-banner" role="dialog" aria-label="Install App">
                <div className="pwa-banner-inner">
                    <div className="pwa-top">
                        <span className="pwa-title">📱 Install Chittorgarh App</span>
                        <button className="pwa-close" onClick={handleDismiss} aria-label="Close">
                            <X size={20} />
                        </button>
                    </div>

                    <p className="pwa-desc">Get offline access to heritage maps, timings, and chronicles — right on your home screen.</p>

                    {isIOS ? (
                        <div className="pwa-steps">
                            1. Tap the <strong>Share</strong> button <Share size={13} style={{display:'inline', verticalAlign:'middle'}} /> at the bottom of Safari<br />
                            2. Scroll down and tap <strong>"Add to Home Screen"</strong><br />
                            3. Tap <strong>"Add"</strong> to install
                        </div>
                    ) : !canInstall ? (
                        <div className="pwa-steps">
                            1. Tap the <strong>⋮ Menu</strong> (3 dots) in Chrome<br />
                            2. Tap <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong><br />
                            3. Tap <strong>"Install"</strong> to confirm
                        </div>
                    ) : null}

                    <div className="pwa-actions">
                        {canInstall && !isIOS ? (
                            <button className="pwa-install-btn" onClick={handleInstall}>
                                <Download size={18} /> Install App
                            </button>
                        ) : (
                            <button className="pwa-install-btn" onClick={handleDismiss}>
                                Got it!
                            </button>
                        )}
                        <button className="pwa-later-btn" onClick={handleDismiss}>Later</button>
                    </div>
                </div>
            </div>
        </>
    );
}
