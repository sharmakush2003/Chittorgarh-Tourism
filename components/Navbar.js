"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { triggerHaptic } from "@/lib/haptics";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const pathname = usePathname();
    const { lang, changeLanguage, t } = useLanguage();

    const isHiddenPath = pathname?.startsWith("/admin") || pathname === "/chittorgarh-fort";
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
        { href: "/cuisine", label: t("nav.cuisine") || "Local Cuisines" },
        { href: "/plan", label: t("nav.planTrip") },
        { href: "/how-to-reach", label: t("nav.howToReach") },
        { href: "/blog", label: t("nav.blog") || "Blog" },
    ];

    if (isHiddenPath) return null;

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
                            onClick={() => { setIsLangOpen(!isLangOpen); triggerHaptic('light'); }}
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
                                    <div onClick={() => { changeLanguage("nl"); setIsLangOpen(false); }} className={lang === 'nl' ? 'active' : ''}>
                                        <span className="flag">🇳🇱</span> Nederlands
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
                    onClick={() => { setIsMenuOpen(!isMenuOpen); triggerHaptic('light'); }}
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

                {/* Mobile-only Links */}
                <Link
                    href="/gallery"
                    className={isActive("/gallery")}
                    onClick={() => setIsMenuOpen(false)}
                >
                    {t("nav.gallery") || "Gallery"}
                </Link>

                <Link
                    href="/emergency"
                    className={`${isActive("/emergency")} mobile-emergency-link`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ color: '#ef4444', fontWeight: '600', borderLeft: '2px solid #ef4444', paddingLeft: '15px' }}
                >
                    Emergency Info
                </Link>

                <Link
                    href="/admin/dashboard"
                    className={`${isActive("/admin/dashboard")} mobile-admin-link`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ color: 'var(--gold)', fontWeight: '600', borderLeft: '2px solid var(--gold)', paddingLeft: '15px' }}
                >
                    Admin Management
                </Link>

                {/* Mobile Language Selection */}
                <div className="mobile-lang-section">
                    <span className="mobile-lang-label">{t("nav.selectLanguage")}</span>
                    <div className="mobile-lang-grid">
                        <button onClick={() => { changeLanguage("en"); setIsMenuOpen(false); }}>EN</button>
                        <button onClick={() => { changeLanguage("hi"); setIsMenuOpen(false); }}>HI</button>
                        <button onClick={() => { changeLanguage("fr"); setIsMenuOpen(false); }}>FR</button>
                        <button onClick={() => { changeLanguage("nl"); setIsMenuOpen(false); }}>NL</button>
                        <button onClick={() => { changeLanguage("ja"); setIsMenuOpen(false); }}>JA</button>
                    </div>
                </div>
            </div>
        </>
    );
}
