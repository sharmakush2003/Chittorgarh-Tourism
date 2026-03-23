"use client";

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera } from 'lucide-react';
import { triggerHaptic } from '@/lib/haptics';

export default function QRWebScanner({ onClose, onResult }) {
    const [html5QrCode, setHtml5QrCode] = useState(null);
    const [error, setError] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Initialize scanner ONLY after mounted is true and element is in DOM
        const qrCode = new Html5Qrcode("qr-reader");
        setHtml5QrCode(qrCode);

        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

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
        ).catch(err => {
            console.error("Scanner start error:", err);
            setError("Camera permission denied or camera not found.");
        });

        return () => {
            if (qrCode.isScanning) {
                qrCode.stop().catch(err => console.error("Error stopping scanner:", err));
            }
        };
    }, [mounted]);

    if (!mounted) return null;

    return createPortal(
        <div className="qr-scanner-overlay">
            <div className="qr-scanner-container">
                <div className="scanner-header">
                    <h3><Camera size={20} style={{ marginRight: '8px' }} /> Scanner</h3>
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
                
                <div id="qr-reader" style={{ width: '100%', maxWidth: '350px' }}></div>
                
                {error && <p className="scanner-error">{error}</p>}
                
                <p className="scanner-tip">Point your camera at a monument QR code</p>
            </div>

            <style jsx>{`
                .qr-scanner-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(8px);
                    z-index: 100001;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                .qr-scanner-container {
                    background: #1a1510;
                    border: 1px solid var(--gold);
                    border-radius: 12px;
                    padding: 20px;
                    width: 100%;
                    max-width: 400px;
                    text-align: center;
                }
                .scanner-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    color: var(--gold);
                }
                .close-btn {
                    background: transparent;
                    border: none;
                    color: #fff;
                    cursor: pointer;
                    padding: 5px;
                }
                .scanner-tip {
                    margin-top: 20px;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.9rem;
                }
                .scanner-error {
                    color: #ff5252;
                    margin-top: 15px;
                    font-size: 0.9rem;
                }
                #qr-reader {
                    margin: 0 auto;
                    border: 2px solid var(--gold) !important;
                    border-radius: 8px;
                    overflow: hidden;
                }
                :global(#qr-reader__video) {
                    width: 100% !important;
                    height: auto !important;
                    object-fit: cover !important;
                }
            `}</style>
        </div>,
        document.body
    );
}
