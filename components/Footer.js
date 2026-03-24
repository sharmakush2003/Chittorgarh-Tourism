"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";


const navLinks = [
    { key: "nav.home", href: "/" },
    { key: "nav.explore", href: "/explore" },
    { key: "nav.stays", href: "/stays" },
    { key: "nav.planTrip", href: "/plan" },
    { key: "footer.download", href: "/download" },
];

export default function Footer() {
    const { t } = useLanguage();
    const pathname = usePathname();


    return (
        <footer className="site-footer">
            {/* Animated top border */}
            <div className="footer-glow-bar" />

            <div className="container">
                {/* Main grid */}
                <div className="footer-grid">
                    {/* Brand column */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            {t("nav.logoPart1") || "Chittorgarh"}<span> {t("nav.logoPart2") || "Tourism"}</span>
                        </div>
                        <p className="footer-tagline">{t("footer.desc")}</p>

                    </div>

                    {/* Navigation column */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">{t("footer.nav")}</h4>
                        <ul className="footer-nav-list">
                            {navLinks.map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} className="footer-nav-link">
                                        <span className="footer-nav-arrow">›</span>
                                        {t(l.key) || l.fallback}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact / Info column */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">{t("footer.connect")}</h4>
                        <ul className="footer-nav-list">
                            <li className="footer-info-item">
                                <span>{t("footer.locationFull") || "Chittorgarh, Rajasthan, India"}</span>
                            </li>
                            <li className="footer-info-item">
                                <span className="footer-info-icon">🌐</span>
                                <span>{t("footer.unesco") || "UNESCO Heritage Site"}</span>
                            </li>
                            <li className="footer-info-item">
                                <span className="footer-info-icon">✉️</span>
                                <a href="mailto:chittorgarh.rj09.tourism@gmail.com" className="footer-email-link">
                                    chittorgarh.rj09.tourism@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Ornamental divider */}
                <div className="footer-ornament">
                    <span className="ornament-line" />
                    <span className="ornament-diamond">◆</span>
                    <span className="ornament-line" />
                </div>

                {/* Bottom bar */}
                <div className="footer-bottom">
                    <div className="footer-bottom-divider" />
                    <div className="footer-copyright-info">
                        <span className="footer-copy">{t("footer.copy")}</span>
                        <span className="footer-separator">|</span>
                        <span className="footer-rights">{t("footer.rights") || "All Rights Reserved"}</span>
                        <span className="footer-separator">|</span>
                        <Link href="/contact-us" className="footer-dev-link">
                            {t("nav.contactUs") || "Contact Us"}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
