"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { triggerHaptic } from "@/lib/haptics";
import QRWebScanner from "./QRWebScanner";

export default function QRScannerButton({ 
    className = "btn-outline-luxury", 
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
                {showIcon && <Camera size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />}
                {t(labelKey)}
            </button>

            {isScannerOpen && (
                <QRWebScanner 
                    onClose={() => setIsScannerOpen(false)} 
                    onResult={handleScannerResult} 
                />
            )}

            <style jsx>{`
                .btn-outline-gold, .btn-outline-luxury {
                    margin: 0;
                }
            `}</style>
        </>
    );
}
