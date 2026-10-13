"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
    { key: "nav.home", href: "/" },
    { key: "nav.explore", href: "/explore" },
    { key: "nav.bookTickets", href: "https://eticket.webfront.in/asi/quick/chf", isExternal: true },
    { key: "nav.visitorInfo", href: "/visitor-info" },
    { key: "nav.guideList", href: "/guide-list" },
    { key: "nav.itinerary", href: "/itinerary", fallback: "Itinerary" },
    { key: "nav.feedback", href: "/feedback", fallback: "Feedback Hub" },
    { key: "nav.emergency", href: "/emergency" },
    { key: "nav.contactUs", href: "/contact-us" },
];

export default function Footer() {
    const { t } = useLanguage();
    const pathname = usePathname();

    return (
        <footer className="site-footer">
            {/* Animated top border */}
            <div className="footer-glow-bar" />

            <div className="container">
                {/* Main flex layout */}
                <div className="footer-grid" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    {/* Brand column */}
                    <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src="/rtdc-logo.jpeg" alt="RTDC Logo" style={{ height: '32px', marginRight: '8px', borderRadius: '4px' }} />
                            <div>
                                {t("nav.logoPart1") || "Chittorgarh"}<span> {t("nav.logoPart2") || "Tourism"}</span>
                            </div>
                        </div>
                        <p className="footer-tagline" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '500px', margin: '0 auto 2rem auto' }}>{t("footer.desc")}</p>
                    </div>

                    {/* Columns Wrapper */}
                    <div className="footer-cols-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        {/* Navigation column */}
                        <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h4 className="footer-col-title" style={{ textAlign: 'center' }}>{t("footer.nav")}</h4>
                            <ul className="footer-nav-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                                {navLinks.map((l) => (
                                    <li key={l.href}>
                                        {l.isExternal ? (
                                            <a href={l.href} target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                                                <span className="footer-nav-arrow">›</span>
                                                {t(l.key) || "Book Tickets"}
                                            </a>
                                        ) : (
                                            <Link prefetch={false} href={l.href} className="footer-nav-link">
                                                <span className="footer-nav-arrow">›</span>
                                                {t(l.key) || l.fallback}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Ornamental divider */}
                <div className="footer-ornament">
                    <span className="ornament-line" />
                    <span className="ornament-diamond">â—†</span>
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
                        <Link prefetch={false} href="/contact-us" className="footer-dev-link">
                            {t("nav.contactUs") || "Contact Us"}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

