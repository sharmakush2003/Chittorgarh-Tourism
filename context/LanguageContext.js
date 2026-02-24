"use client";

import { createContext, useContext, useState, useEffect } from "react";
import enTranslations from "@/public/translations/en.json";

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
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Run once on mount to get the actual saved language
    useEffect(() => {
        const savedLang = getInitialLang();
        if (savedLang !== 'en') {
            setLang(savedLang);
        }
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const loadTranslations = async () => {
            // If it's English, we already have it in state from initialization
            if (lang === 'en') {
                setTranslations(enTranslations);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                // Removed cache-busting timestamp to allow browser caching
                const res = await fetch(`/translations/${lang}.json`);

                if (!res.ok) {
                    console.warn(`Translation file not found for ${lang}. Falling back to English.`);
                    setTranslations(enTranslations);
                } else {
                    const data = await res.json();
                    setTranslations(data);
                }
            } catch (err) {
                console.error("Language load failed:", err);
                setTranslations(enTranslations);
            } finally {
                setLoading(false);
            }
        };

        loadTranslations();

        if (typeof window !== 'undefined') {
            document.documentElement.lang = lang;
        }
    }, [lang, isMounted]);

    const t = (key) => {
        if (!translations) return enTranslations[key] || key;
        if (translations[key]) return translations[key];

        // Fallback to English if key missing in current language
        return enTranslations[key] || key;
    };

    const changeLanguage = (code) => {
        setLang(code);
        localStorage.setItem("ctt_locale", code);
    };

    // We no longer return null here to avoid blank screen on init.
    // Instead, we always provide the context. SSR will use 'en'.
    return (
        <LanguageContext.Provider value={{ lang, changeLanguage, t, loading }}>
            {/* The key={lang} enforces a full component tree remount matching the requirement */}
            <div key={lang} className="lang-wrapper" style={{ display: 'contents' }}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
