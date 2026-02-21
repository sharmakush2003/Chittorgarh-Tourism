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

export function LanguageProvider({ children }) {
    // Initialize directly from localStorage — no race condition on mobile
    const [lang, setLang] = useState(() => getInitialLang());
    const [translations, setTranslations] = useState(enTranslations);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
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
    }, [lang]);

    const t = (key) => {
        return translations[key] || key;
    };

    const changeLanguage = (code) => {
        setLang(code);
        localStorage.setItem("ctt_locale", code);
    };

    return (
        <LanguageContext.Provider value={{ lang, changeLanguage, t, loading }}>
            {/* Removed opacity transition wrapper to make initial render instant and solid */}
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
