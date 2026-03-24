"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";



const LANGUAGES = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi (हिंदी)" },
];

export default function LanguagePrompt() {
    const [isVisible, setIsVisible] = useState(false);

    const [language, setLanguage] = useState("en");
    const { t, changeLanguage } = useLanguage();
    const pathname = usePathname();

    useEffect(() => {
        // Hide if we are on any route other than the homepage (/)
        if (pathname !== '/') {
            setIsVisible(false);
            return;
        }

        // Check if user has already selected a language
        const saved = localStorage.getItem("ctt_locale");
        if (!saved) {
            setIsVisible(true);
        }
    }, [pathname]);



    const handleConfirm = () => {

        changeLanguage(language);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="language-modal-overlay">
            <style jsx>{`
        .language-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85);
            backdrop-filter: blur(8px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.5s ease;
        }
        .language-modal {
            background: #fff;
            padding: 3rem;
            border-radius: 4px; /* Sharper corners for premium feel */
            text-align: center;
            max-width: 450px;
            width: 90%;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
            border: 1px solid var(--gold);
            font-family: var(--font-jost);
        }
        .modal-title {
            font-family: var(--font-cormorant);
            font-size: 2.5rem;
            color: #D4AF37;
            margin-bottom: 0.5rem;
            font-weight: 600;
            text-shadow: none;
            filter: none;
        }
        .modal-desc {
            color: #666;
            margin-bottom: 2rem;
            font-size: 0.95rem;
            line-height: 1.5;
        }
        .form-group {
            margin-bottom: 1.5rem;
            text-align: left;
        }
        .form-group label {
            display: block;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 0.5rem;
            color: #888;
            font-weight: 600;
        }
        select {
            width: 100%;
            padding: 0.8rem;
            font-size: 1rem;
            border: 1px solid #ddd;
            border-radius: 2px;
            background: #f9f9f9;
            color: #333;
            outline: none;
            transition: border-color 0.3s;
            cursor: pointer;
        }
        select:focus {
            border-color: var(--gold);
            background: #fff;
        }
        .confirm-btn {
            width: 100%;
            padding: 1rem;
            background: var(--gold); /* Assuming available var */
            color: #fff;
            border: none;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
            transition: background 0.3s;
            background-color: #D4AF37; /* Fallback */
            font-weight: 600;
            margin-top: 1rem;
        }
        .confirm-btn:hover {
            background-color: #C5A028;
        }
        .confirm-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>
            <div className="language-modal">
                <h2 className="modal-title">{t("modal.welcome")}</h2>
                <p className="modal-desc">
                    {t("modal.sub")}
                </p>



                <div className="form-group">
                    <label>{t("modal.language") || "Language"}</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                        {LANGUAGES.map(l => (
                            <option key={l.code} value={l.code}>{l.name}</option>
                        ))}
                    </select>
                </div>

                <button
                    className="confirm-btn"
                    onClick={handleConfirm}
                    disabled={false}
                >
                    {t("modal.confirm") || "Continue"}
                </button>

            </div>
        </div>
    );
}
