"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const { lang, changeLanguage } = useLanguage();

    const handleLangChange = (code) => {
        changeLanguage(code);
        setIsOpen(false);
    };

    const getLabel = (code) => {
        switch (code) {
            case 'en': return 'EN';
            case 'hi': return 'HI';
            case 'fr': return 'FR';
            case 'de': return 'DE';
            case 'ja': return 'JA';
            default: return 'EN';
        }
    }

    return (
        <div className="lang-bar" id="lang-bar" style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 100, background: '#1A1108', padding: '0.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div id="lang-switcher" className={`lang-switcher ${isOpen ? "open" : ""}`} style={{ position: 'relative' }}>
                <button className="ls-btn" aria-label="Switch Language" onClick={() => setIsOpen(!isOpen)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🌐 <span id="lang-indicator">{getLabel(lang)}</span> ▾
                </button>
                {isOpen && (
                    <div className="ls-drop ls-drop--up" style={{ position: 'absolute', bottom: '100%', left: 0, background: '#2A1F0E', padding: '0.5rem 0', borderRadius: '4px', marginBottom: '0.5rem', minWidth: '120px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                        <div onClick={() => handleLangChange("en")} style={{ padding: '0.5rem 1rem', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem' }}>🇺🇸 English</div>
                        <div onClick={() => handleLangChange("hi")} style={{ padding: '0.5rem 1rem', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem' }}>🇮🇳 हिंदी</div>
                        <div onClick={() => handleLangChange("fr")} style={{ padding: '0.5rem 1rem', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem' }}>🇫🇷 Français</div>
                        <div onClick={() => handleLangChange("de")} style={{ padding: '0.5rem 1rem', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem' }}>🇩🇪 Deutsch</div>
                        <div onClick={() => handleLangChange("ja")} style={{ padding: '0.5rem 1rem', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem' }}>🇯🇵 日本語</div>
                    </div>
                )}
            </div>
            <span className="lang-bar-label" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Language / भाषा</span>
        </div>
    );
}
