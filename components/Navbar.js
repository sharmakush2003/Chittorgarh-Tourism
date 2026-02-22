"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const pathname = usePathname();
    const { lang, changeLanguage, t } = useLanguage();
    const langRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) {
                setIsLangOpen(false);
            }
        };

        if (isLangOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isLangOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const isActive = (path) => pathname === path ? "active" : "";

    const navLinks = [
        { href: "/", label: t("nav.home") },
        { href: "/explore", label: t("nav.explore") },
        { href: "/chronicles", label: t("nav.chronicles") },
        { href: "/stays", label: t("nav.stays") },
        { href: "/plan", label: t("nav.planTrip") },
        { href: "/how-to-reach", label: t("nav.howToReach") },
    ];

    return (
        <>
            <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
                <Link href="/" className="logo">
                    <div className="logo-name">
                        Chittorgarh<span> Tourism</span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <ul className="nav-links">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} className={isActive(link.href)}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    {/* Premium Language Selector */}
                    <li className="nav-lang-selector" ref={langRef}>
                        <button
                            className="nav-lang-btn"
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            aria-label="Switch Language"
                        >
                            <span className="lang-icon">🌐</span>
                            <span className="lang-text">{lang.toUpperCase()}</span>
                            <span className={`lang-chevron ${isLangOpen ? 'open' : ''}`}>▾</span>
                        </button>
                        {isLangOpen && (
                            <div className="nav-lang-dropdown">
                                <div className="dropdown-inner">
                                    <div onClick={() => { changeLanguage("en"); setIsLangOpen(false); }} className={lang === 'en' ? 'active' : ''}>
                                        <span className="flag">🇺🇸</span> English
                                    </div>
                                    <div onClick={() => { changeLanguage("hi"); setIsLangOpen(false); }} className={lang === 'hi' ? 'active' : ''}>
                                        <span className="flag">🇮🇳</span> हिंदी
                                    </div>
                                    <div onClick={() => { changeLanguage("fr"); setIsLangOpen(false); }} className={lang === 'fr' ? 'active' : ''}>
                                        <span className="flag">🇫🇷</span> Français
                                    </div>
                                    <div onClick={() => { changeLanguage("de"); setIsLangOpen(false); }} className={lang === 'de' ? 'active' : ''}>
                                        <span className="flag">🇩🇪</span> Deutsch
                                    </div>
                                    <div onClick={() => { changeLanguage("ja"); setIsLangOpen(false); }} className={lang === 'ja' ? 'active' : ''}>
                                        <span className="flag">🇯🇵</span> 日本語
                                    </div>
                                </div>
                            </div>
                        )}
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className={`mobile-menu-btn ${isMenuOpen ? "open" : ""}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>

            {/* Mobile Navigation Overlay */}
            <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={isActive(link.href)}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}

                {/* Mobile-only Gallery Link */}
                <Link
                    href="/gallery"
                    className={isActive("/gallery")}
                    onClick={() => setIsMenuOpen(false)}
                >
                    {t("nav.gallery") || "Gallery"}
                </Link>

                {/* Mobile Language Selection */}
                <div className="mobile-lang-section">
                    <span className="mobile-lang-label">{t("nav.selectLanguage")}</span>
                    <div className="mobile-lang-grid">
                        <button onClick={() => { changeLanguage("en"); setIsMenuOpen(false); }}>EN</button>
                        <button onClick={() => { changeLanguage("hi"); setIsMenuOpen(false); }}>HI</button>
                        <button onClick={() => { changeLanguage("fr"); setIsMenuOpen(false); }}>FR</button>
                        <button onClick={() => { changeLanguage("de"); setIsMenuOpen(false); }}>DE</button>
                        <button onClick={() => { changeLanguage("ja"); setIsMenuOpen(false); }}>JA</button>
                    </div>
                </div>
            </div>
        </>
    );
}
