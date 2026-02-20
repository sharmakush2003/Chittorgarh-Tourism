"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (path) => pathname === path ? "active" : "";

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
            <Link href="/" className="logo">
                <div className="logo-name">
                    Chittorgarh<span> Tourism</span>
                </div>
            </Link>
            <ul className="nav-links">
                <li>
                    <Link href="/" className={isActive("/")}>
                        {t("nav.home")}
                    </Link>
                </li>
                <li>
                    <Link href="/explore" className={isActive("/explore")}>
                        {t("nav.explore")}
                    </Link>
                </li>
                <li>
                    <Link href="/stays" className={isActive("/stays")}>
                        {t("nav.stays")}
                    </Link>
                </li>
                <li>
                    <Link href="/artisans" className={isActive("/artisans")}>
                        {t("nav.artisans")}
                    </Link>
                </li>
                <li>
                    <Link href="/plan" className={isActive("/plan")}>
                        {t("nav.planTrip")}
                    </Link>
                </li>
            </ul>

            <style jsx>{`
                .navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }
                
                .logo {
                    text-decoration: none;
                }
            `}</style>
        </nav>
    );
}
