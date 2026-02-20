"use client";

import { createContext, useContext, useState, useEffect } from "react";
import enTranslations from "@/lib/translations.js";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState("en");
    // Initialize with English translations immediately
    const [translations, setTranslations] = useState(enTranslations);
    const [loading, setLoading] = useState(false); // No longer loading initially

    useEffect(() => {
        const loadTranslations = async () => {
            // If it's English, we already have it
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
                    // If we fall back, we might want to revert lang state too, but keeping the 'intent' is often better UI
                    // unless we want to force 'en'. Let's keep the user's choice but show EN text.
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

        // Only load if it's NOT the initial render with 'en' which is already set
        // But we need to react to lang changes
        loadTranslations();
        document.documentElement.lang = lang;
    }, [lang]);

    const t = (key) => {
        return translations[key] || key;
    };

    const changeLanguage = (code) => {
        setLang(code);
        localStorage.setItem("ctt_locale", code);
    };

    // Check localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("ctt_locale");
        if (saved && saved !== "en") {
            setLang(saved);
        }
    }, []);

    return (
        <LanguageContext.Provider value={{ lang, changeLanguage, t, loading }}>
            {/* Removed opacity transition wrapper to make initial render instant and solid */}
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
