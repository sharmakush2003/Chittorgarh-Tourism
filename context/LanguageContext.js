"use client";

import { createContext, useContext, useState, useEffect } from "react";
import enTranslations from "@/lib/translations.js";

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
            if (lang === 'en') {
                setTranslations(enTranslations);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                console.log(`Fetching translation for: ${lang}`);
                const res = await fetch(`/translations/${lang}.json`);

                if (!res.ok) {
                    console.warn(`Translation file not found for ${lang}, falling back to English.`);
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
        return translations[key] || key;
    };

    const changeLanguage = (code) => {
        setLang(code);
        localStorage.setItem("ctt_locale", code);
    };

    // Prevent hydration mismatch by not rendering until mounted client-side
    if (!isMounted) return null;

    return (
        <LanguageContext.Provider value={{ lang, changeLanguage, t, loading }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
