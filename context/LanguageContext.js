"use client";

import { createContext, useContext, useState, useEffect } from "react";
import enTranslations from "@/public/translations/en.json";
import { triggerHaptic } from "@/lib/haptics";

const LanguageContext = createContext();

// Read localStorage safely (SSR-safe) to get the initial language
function getInitialLang() {
    if (typeof window === 'undefined') return 'en';
    try {
        const saved = localStorage.getItem("ctt_locale");
        if (!saved) return 'en';
        if (saved.startsWith('{')) {
            const parsed = JSON.parse(saved);
            return parsed?.lang || 'en';
        }
        return saved;
    } catch (e) {
        return 'en';
    }
}

// Use 'en' as the initial state so SSR matches the first client render (Hydration fix)
export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('en');
    const [translations, setTranslations] = useState(enTranslations);
    const [loading, setLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    // Run once on mount to get the actual saved language
    useEffect(() => {
        const savedLang = getInitialLang();
        setLang(savedLang);
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const loadTranslations = async () => {
            setLoading(true);
            if (lang === 'en') {
                setTranslations(enTranslations);
                setLoading(false);
                return;
            }

            try {
                // Restore cache-busting for strict freshness if that was part of original intent
                const res = await fetch(`/translations/${lang}.json?v=${new Date().getTime()}`);

                if (!res.ok) {
                    console.warn(`Translation file not found for ${lang}. Falling back to empty.`);
                    setTranslations({});
                } else {
                    const data = await res.json();
                    setTranslations(data);
                }
            } catch (err) {
                console.error("Language load failed:", err);
                setTranslations({});
            } finally {
                setLoading(false);
            }
        };

        loadTranslations();

        if (typeof window !== 'undefined') {
            document.documentElement.lang = lang;
        }
    }, [lang, isMounted]);

    const t = (key, params = {}) => {
        let text = (translations && translations[key]) || enTranslations[key] || key;
        
        // Simple parameter replacement for {key} placeholders
        Object.keys(params).forEach(p => {
            text = text.replace(new RegExp(`{${p}}`, 'g'), params[p]);
        });
        
        return text;
    };

    const changeLanguage = (code) => {
        setLang(code);
        localStorage.setItem("ctt_locale", code);
        triggerHaptic('medium');
    };

    // Prevent hydration mismatch by still allowing isMounted check if desired,
    // but don't block the entire app if translations are still loading.
    // REMOVED 'if (!isMounted) return null;' to allow SSR to match client hydration.

    return (
        <LanguageContext.Provider value={{ lang, changeLanguage, t, loading }}>
            {/* The key={lang} enforces a full component tree remount matching the requirement */}
            <div key={lang} className="lang-wrapper" data-lang={lang} style={{ display: 'contents' }}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
