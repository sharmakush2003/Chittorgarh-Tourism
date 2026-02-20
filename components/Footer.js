"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="brand-name">
                            Chittorgarh<span> Tourism</span>
                        </div>
                        <p>
                            {t("footer.desc")}
                        </p>
                    </div>
                    <div className="footer-col">
                        <h4>{t("footer.nav")}</h4>
                        <ul>
                            <li>
                                <Link href="/">
                                    {t("nav.home")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/explore">
                                    {t("nav.explore")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/chronicles">
                                    {t("nav.chronicles")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/stays">
                                    {t("nav.stays")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/plan">
                                    {t("nav.planTrip")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>{t("footer.connect")}</h4>
                        <ul>
                            <li>
                                <a href="#">Instagram</a>
                            </li>
                            <li>
                                <a href="#">Facebook</a>
                            </li>
                            <li>
                                <a href="#">YouTube</a>
                            </li>
                            <li>
                                <a href="#">Twitter / X</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>
                        {t("footer.copy")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
