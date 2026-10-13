"use client";

import { createContext, useContext, useState, useEffect } from "react";
import enTranslations from "@/public/translations/en.json";
import { triggerHaptic } from "@/lib/haptics";

const LanguageContext = createContext();

// Read localStorage safely (SSR-safe) to get the initial language
function getInitialLang() {
    if (typeof window === 'undefined') return 'en';
    
    // 1. Check URL for ?lang=hi or ?lang=en
    try {
        const search = window.location.search;
        const urlParams = new URLSearchParams(search);
        const urlLang = urlParams.get('lang');
        console.log("LanguageContext: URL lang param =", urlLang, "from search =", search);
        if (urlLang === 'hi' || urlLang === 'en') {
            localStorage.setItem("ctt_locale", urlLang);
            return urlLang;
        }
    } catch (e) {
        console.warn("LanguageContext: Error reading URL params:", e);
    }

    // 2. Check localStorage
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

    // Run on mount and periodically check URL for language changes
    useEffect(() => {
        const syncLang = () => {
            const savedLang = getInitialLang();
            if (savedLang !== lang) {
                setLang(savedLang);
            }
            setIsMounted(true);
        };

        syncLang();
        
        // Also listen for popstate (back/forward)
        window.addEventListener('popstate', syncLang);
        return () => window.removeEventListener('popstate', syncLang);
    }, [lang]);

    useEffect(() => {
        if (!isMounted) return;

        const loadTranslations = async () => {
            console.log("LanguageContext: Loading translations for", lang);
            setLoading(true);
            if (lang === 'en') {
                setTranslations(enTranslations);
                setLoading(false);
                return;
            }

            try {
                const url = `/translations/${lang}.json?v=${new Date().getTime()}`;
                const res = await fetch(url);

                if (!res.ok) {
                    console.warn(`LanguageContext: Translation file not found for ${lang} at ${url}`);
                    setTranslations({});
                } else {
                    const data = await res.json();
                    console.log("LanguageContext: Successfully loaded", Object.keys(data).length, "keys for", lang);
                    setTranslations(data);
                }
            } catch (err) {
                console.error("LanguageContext: Language load failed:", err);
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
