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

    const isHiddenPath = false;
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
        { href: "/stays", label: t("nav.stays") },
        { href: "/plan", label: t("nav.planTrip") },
        { href: "/how-to-reach", label: t("nav.howToReach") },
    ];

    const isContactPath = false;

    if (isHiddenPath) return null;

    return (
        <>
            <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
                <Link prefetch={false} href="/" 
                    className="logo"
                    style={{ 
                        opacity: isMenuOpen || isContactPath ? 0 : 1, 
                        transition: 'opacity 0.3s ease',
                        pointerEvents: isMenuOpen || isContactPath ? 'none' : 'auto'
                    }}
                >
                    <div className="logo-name">
                        {t("nav.logoPart1") || "Chittorgarh"}<span> {t("nav.logoPart2") || "Tourism"}</span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <ul className="nav-links">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link prefetch={false} href={link.href} className={isActive(link.href)}>
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
                {/* Brand Header inside Menu */}
                <div className="mobile-menu-header" style={{ transitionDelay: '0.05s' }}>
                    <div className="logo-name">
                        {t("nav.logoPart1") || "Chittorgarh"}<span> {t("nav.logoPart2") || "Tourism"}</span>
                    </div>
                    <div className="mobile-menu-divider"></div>
                </div>

                {navLinks.map((link, idx) => (
                    <Link prefetch={false} key={link.href}
                        href={link.href}
                        className={`mobile-link ${isActive(link.href)}`}
                        onClick={() => setIsMenuOpen(false)}
                        style={{ transitionDelay: `${0.15 + idx * 0.08}s` }}
                    >
                        {link.label}
                    </Link>
                ))}


                <Link prefetch={false} href="/panch-gaurav"
                    className={`mobile-link ${isActive("/panch-gaurav")}`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ 
                        transitionDelay: `${0.15 + (navLinks.length) * 0.08}s`
                    }}
                >
                    {t("nav.panchGaurav") || "Panch Gaurav"}
                </Link>

                <Link prefetch={false} href="/emergency"
                    className={`mobile-link ${isActive("/emergency")} mobile-emergency-link`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ 
                        transitionDelay: `${0.15 + (navLinks.length + 1) * 0.08}s`
                    }}
                >
                    {t("nav.emergency") || "Emergency Info"}
                </Link>

                <Link prefetch={false} href="/download"
                    className={`mobile-link ${isActive("/download")} mobile-install-link`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ 
                        transitionDelay: `${0.15 + (navLinks.length + 2) * 0.08}s`
                    }}
                >
                    {t("nav.download") || "Download App"}
                </Link>

                <Link prefetch={false} href="/contact-us"
                    className={`mobile-link ${isActive("/contact-us")} mobile-contact-link`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ 
                        transitionDelay: `${0.15 + (navLinks.length + 3) * 0.08}s`
                    }}
                >
                    {t("nav.contactUs") || "Contact Us"}
                </Link>


                {/* Mobile Language Selection */}
                <div 
                    className="mobile-lang-section" 
                    style={{ transitionDelay: `${0.15 + (navLinks.length + 4) * 0.08}s` }}
                >
                    <span className="mobile-lang-label">{t("nav.selectLanguage")}</span>
                    <div className="mobile-lang-toggle" data-active={lang}>
                        <button 
                            className={lang === 'en' ? 'active' : ''}
                            onClick={() => { changeLanguage("en"); setIsMenuOpen(false); }}
                        >
                            Eng
                        </button>
                        <button 
                            className={lang === 'hi' ? 'active' : ''}
                            onClick={() => { changeLanguage("hi"); setIsMenuOpen(false); }}
                        >
                            हिंदी
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
