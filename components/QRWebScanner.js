"use client";

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera, Zap, ZapOff } from 'lucide-react';
import { triggerHaptic } from '@/lib/haptics';
import { motion, AnimatePresence } from 'framer-motion';

export default function QRWebScanner({ onClose, onResult }) {
    const [html5QrCode, setHtml5QrCode] = useState(null);
    const [error, setError] = useState(null);
    const [isFlashOn, setIsFlashOn] = useState(false);
    const [hasFlash, setHasFlash] = useState(false);

    useEffect(() => {
        const qrCode = new Html5Qrcode("qr-reader");
        setHtml5QrCode(qrCode);

        const config = { 
            fps: 20, 
            qrbox: (viewfinderWidth, viewfinderHeight) => {
                const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
                const qrboxSize = Math.floor(minEdge * 0.7);
                return { width: qrboxSize, height: qrboxSize };
            }
        };

        qrCode.start(
            { facingMode: "environment" },
            config,
            (decodedText) => {
                triggerHaptic('success');
                qrCode.stop().then(() => {
                    onResult(decodedText);
                });
            },
            (errorMessage) => {
                // Ignore silent errors
            }
        ).then(() => {
            // Check if flash is supported
            const cameras = qrCode.getRunningTrackCapabilities();
            if (cameras.torch) {
                setHasFlash(true);
            }
        }).catch(err => {
            console.error(err);
            setError("Camera permission denied or camera not found.");
        });

        return () => {
            if (qrCode.isScanning) {
                qrCode.stop().catch(err => console.error("Error stopping scanner:", err));
            }
        };
    }, []);

    const toggleFlash = () => {
        if (!html5QrCode || !hasFlash) return;
        const newFlashState = !isFlashOn;
        html5QrCode.applyVideoConstraints({
            advanced: [{ torch: newFlashState }]
        }).then(() => {
            setIsFlashOn(newFlashState);
            triggerHaptic('light');
        }).catch(err => console.error("Error toggling flash:", err));
    };

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="qr-scanner-full-overlay"
            >
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="scanner-content"
                >
                    <div className="scanner-header premium-glass">
                        <div className="header-left">
                            <Camera size={20} />
                            <span>Monument Scanner</span>
                        </div>
                        <button className="close-btn" onClick={() => {
                            triggerHaptic('light');
                            if (html5QrCode && html5QrCode.isScanning) {
                                html5QrCode.stop().then(() => onClose());
                            } else {
                                onClose();
                            }
                        }}>
                            <X size={24} />
                        </button>
                    </div>

                    <div className="viewfinder-container">
                        <div id="qr-reader"></div>
                        
                        {/* Custom UI Overlays */}
                        <div className="viewfinder-overlay">
                            <div className="scan-region">
                                <div className="corner tl"></div>
                                <div className="corner tr"></div>
                                <div className="corner bl"></div>
                                <div className="corner br"></div>
                                <div className="scan-line"></div>
                            </div>
                        </div>
                    </div>

                    <div className="scanner-footer premium-glass">
                        <p className="scanner-tip">Align QR code within the frame to scan</p>
                        
                        {hasFlash && (
                            <button 
                                className={`flash-toggle ${isFlashOn ? 'active' : ''}`} 
                                onClick={toggleFlash}
                            >
                                {isFlashOn ? <Zap size={24} fill="currentColor" /> : <ZapOff size={24} />}
                            </button>
                        )}
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="scanner-error-toast"
                        >
                            {error}
                        </motion.div>
                    )}
                </motion.div>

                <style jsx>{`
                    .qr-scanner-full-overlay {
                        position: fixed;
                        inset: 0;
                        background: #000;
                        z-index: 99999;
                        display: flex;
                        flex-direction: column;
                    }

                    .scanner-content {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        position: relative;
                    }

                    .scanner-header {
                        position: absolute;
                        top: 20px;
                        left: 20px;
                        right: 20px;
                        height: 60px;
                        padding: 0 20px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        border-radius: 30px;
                        z-index: 10;
                        background: rgba(255, 255, 255, 0.08);
                        backdrop-filter: blur(15px);
                        border: 1px solid rgba(212, 175, 55, 0.2);
                        color: #fff;
                    }

                    .header-left {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-weight: 600;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        font-size: 0.85rem;
                        color: var(--gold);
                    }

                    .viewfinder-container {
                        flex: 1;
                        position: relative;
                        background: #000;
                        overflow: hidden;
                    }

                    #qr-reader {
                        width: 100% !important;
                        height: 100% !important;
                        border: none !important;
                    }

                    :global(#qr-reader__video) {
                        width: 100% !important;
                        height: 100% !important;
                        object-fit: cover !important;
                    }

                    .viewfinder-overlay {
                        position: absolute;
                        inset: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        pointer-events: none;
                        background: radial-gradient(circle, transparent 150px, rgba(0,0,0,0.6) 150px);
                    }

                    .scan-region {
                        width: 250px;
                        height: 250px;
                        position: relative;
                        border: 1px solid rgba(212, 175, 55, 0.2);
                    }

                    .corner {
                        position: absolute;
                        width: 25px;
                        height: 25px;
                        border: 3px solid var(--gold);
                    }

                    .tl { top: -2px; left: -2px; border-right: 0; border-bottom: 0; border-top-left-radius: 8px; }
                    .tr { top: -2px; right: -2px; border-left: 0; border-bottom: 0; border-top-right-radius: 8px; }
                    .bl { bottom: -2px; left: -2px; border-right: 0; border-top: 0; border-bottom-left-radius: 8px; }
                    .br { bottom: -2px; right: -2px; border-left: 0; border-top: 0; border-bottom-right-radius: 8px; }

                    .scan-line {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 2px;
                        background: linear-gradient(to right, transparent, var(--gold), transparent);
                        box-shadow: 0 0 15px var(--gold);
                        animation: scan 2.5s ease-in-out infinite;
                    }

                    @keyframes scan {
                        0%, 100% { top: 0; }
                        50% { top: 100%; }
                    }

                    .scanner-footer {
                        position: absolute;
                        bottom: 40px;
                        left: 40px;
                        right: 40px;
                        padding: 20px;
                        border-radius: 20px;
                        background: rgba(0, 0, 0, 0.5);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        text-align: center;
                    }

                    .scanner-tip {
                        color: rgba(255, 255, 255, 0.8);
                        font-size: 0.95rem;
                        margin-bottom: 15px;
                    }

                    .flash-toggle {
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: #fff;
                        width: 54px;
                        height: 54px;
                        border-radius: 27px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: all 0.3s;
                    }

                    .flash-toggle.active {
                        background: var(--gold);
                        color: #000;
                        border-color: var(--gold);
                        box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
                    }

                    .close-btn {
                        background: transparent;
                        border: none;
                        color: #fff;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: opacity 0.3s;
                    }

                    .close-btn:hover { opacity: 0.7; }

                    .scanner-error-toast {
                        position: absolute;
                        top: 100px;
                        left: 40px;
                        right: 40px;
                        background: rgba(255, 82, 82, 0.9);
                        color: white;
                        padding: 15px 20px;
                        border-radius: 12px;
                        text-align: center;
                        font-weight: 600;
                        z-index: 20;
                    }
                `}</style>
            </motion.div>
        </AnimatePresence>
    );
}
