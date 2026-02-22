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
    const [translations, setTranslations] = useState(null);
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
                console.log(`Fetching translation for: ${lang}`);
                const res = await fetch(`/translations/${lang}.json?v=${new Date().getTime()}`);

                if (!res.ok) {
                    console.warn(`Translation file not found for ${lang}. Generating strict placeholders.`);
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

    const t = (key) => {
        if (!translations) return "";
        if (translations[key]) return translations[key];

        // Strict fallback rules
        if (lang === 'en') {
            return enTranslations[key] || key;
        }

        return `[MISSING_${lang.toUpperCase()}_TRANSLATION]`;
    };

    const changeLanguage = (code) => {
        setLang(code);
        localStorage.setItem("ctt_locale", code);
    };

    // Prevent hydration mismatch by not rendering until mounted client-side.
    // Also pause render until the specific language's translations are loaded 
    // to prevent Flash of English Content and ensure full flush cache.
    if (!isMounted || loading || !translations) return null;

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
