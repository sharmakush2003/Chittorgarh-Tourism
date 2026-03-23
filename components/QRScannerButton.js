"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { triggerHaptic } from "@/lib/haptics";
import QRWebScanner from "./QRWebScanner";

export default function QRScannerButton({ 
    className = "btn-outline-gold", 
    labelKey = "hero.ctaScan",
    showIcon = true 
}) {
    const { t } = useLanguage();
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    const handleScanQR = () => {
        triggerHaptic('medium');
        setIsScannerOpen(true);
    };

    const handleScannerResult = (result) => {
        setIsScannerOpen(false);
        if (result.startsWith('http')) {
            // Local testing support: if scanned URL is for production, translate to current origin
            const productionUrl = "https://chittorgarh-tourism.in";
            let targetUrl = result;
            if (result.startsWith(productionUrl)) {
                targetUrl = result.replace(productionUrl, window.location.origin);
            }
            window.location.href = targetUrl;
        } else {
            alert("Scanned: " + result);
        }
    };

    return (
        <>
            <button className={className} onClick={handleScanQR}>
                {showIcon && <Camera size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />}
                {t(labelKey)}
            </button>

            {isScannerOpen && (
                <QRWebScanner 
                    onClose={() => setIsScannerOpen(false)} 
                    onResult={handleScannerResult} 
                />
            )}

            <style jsx>{`
                .btn-outline-gold {
                    padding: 1rem 2.5rem;
                    background: transparent;
                    border: 2px solid var(--gold);
                    color: var(--gold);
                    font-family: var(--ff-display);
                    font-weight: 700;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: all 0.3s;
                    border-radius: 4px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin: 2rem 0;
                }
                .btn-outline-gold:hover {
                    background: var(--gold);
                    color: #fff;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
                }
            `}</style>
        </>
    );
}
