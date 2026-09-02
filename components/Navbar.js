"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { triggerHaptic } from "@/lib/haptics";
import {
    Home,
    Compass,
    BedDouble,
    MapPin,
    Info,
    Award,
    ShieldAlert,
    MessageSquareQuote,
    Mail,
    X,
    ChevronRight,
    PhoneCall
} from "lucide-react";

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

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const isActive = (path) => pathname === path ? "active" : "";

    const getNavLabel = (key, fallback) => {
        const val = t(key);
        if (!val || val.toUpperCase().startsWith("NAV.") || val === key) return fallback;
        return val;
    };

    const navLinks = [
        { href: "/", label: getNavLabel("nav.home", "Home"), icon: <Home size={18} /> },
        { href: "/explore", label: getNavLabel("nav.explore", "Explore"), icon: <Compass size={18} /> },
        { href: "/stays", label: getNavLabel("nav.stays", "Stays"), icon: <BedDouble size={18} /> },
        { href: "/plan", label: getNavLabel("nav.planTrip", "Plan Trip"), icon: <MapPin size={18} /> },
        { href: "/visitor-info", label: getNavLabel("nav.visitorInfo", "Visitor Info"), icon: <Info size={18} /> },
        { href: "/panch-gaurav", label: getNavLabel("nav.panchGaurav", "Panch Gaurav"), icon: <Award size={18} /> },
        { href: "/emergency", label: getNavLabel("nav.emergency", "Emergency"), icon: <ShieldAlert size={18} /> },
        { href: "/feedback", label: getNavLabel("nav.feedback", "Feedback"), icon: <MessageSquareQuote size={18} /> },
        { href: "/contact-us", label: getNavLabel("nav.contactUs", "Contact Us"), icon: <Mail size={18} /> },
    ];

    const isContactPath = pathname === "/contact-us";

    if (isHiddenPath) return null;

    return (
        <>
            <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
                <Link prefetch={false} href="/" 
                    className="logo"
                    style={{ 
                        opacity: isContactPath ? 0 : 1, 
                        transition: 'opacity 0.3s ease',
                        pointerEvents: isContactPath ? 'none' : 'auto'
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

            {/* Mobile Navigation Drawer & Backdrop */}
            <div 
                className={`mobile-nav-backdrop ${isMenuOpen ? "open" : ""}`}
                onClick={() => setIsMenuOpen(false)}
            />

            <div className={`mobile-nav-drawer ${isMenuOpen ? "open" : ""}`}>
                {/* Header inside Drawer */}
                <div className="drawer-header">
                    <div className="drawer-logo">
                        <div className="drawer-logo-icon">🏛️</div>
                        <div className="drawer-logo-text">
                            <span className="part1">{t("nav.logoPart1") || "Chittorgarh"}</span>
                            <span className="part2"> {t("nav.logoPart2") || "Tourism"}</span>
                        </div>
                    </div>
                    <button 
                        className="drawer-close-btn"
                        onClick={() => { setIsMenuOpen(false); triggerHaptic('light'); }}
                        aria-label="Close Menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Links Area */}
                <div className="drawer-links-scroll">
                    <div className="drawer-links-list">
                        {navLinks.map((link, idx) => (
                            <Link 
                                prefetch={false} 
                                key={link.href}
                                href={link.href}
                                className={`drawer-nav-item ${isActive(link.href)}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className="item-icon-wrap">
                                    {link.icon}
                                </div>
                                <span className="item-label">{link.label}</span>
                                <ChevronRight size={16} className="item-arrow" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Drawer Footer */}
                <div className="drawer-footer">
                    {/* Language Switcher Toggle */}
                    <div className="drawer-lang-toggle">
                        <button 
                            className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                            onClick={() => { changeLanguage("en"); triggerHaptic('light'); }}
                        >
                            <span>🇺🇸</span> English
                        </button>
                        <button 
                            className={`lang-btn ${lang === 'hi' ? 'active' : ''}`}
                            onClick={() => { changeLanguage("hi"); triggerHaptic('light'); }}
                        >
                            <span>🇮🇳</span> हिंदी
                        </button>
                    </div>

                    <Link 
                        href="/emergency" 
                        className="drawer-emergency-pill"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <PhoneCall size={14} className="text-red-400" />
                        <span>Helpline: 112 / Emergency</span>
                    </Link>
                </div>
            </div>
        </>
    );
}

