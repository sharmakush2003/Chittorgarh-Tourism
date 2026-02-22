"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Crown, Shield, Sword, Landmark, History, UserCheck, Stars } from "lucide-react";

export default function RoyalLineage() {
    const { t } = useLanguage();

    const rulers = [
        { id: "bappa", icon: <Crown size={32} /> },
        { id: "ratan", icon: <Sword size={32} /> },
        { id: "hammir", icon: <History size={32} /> },
        { id: "kumbha", icon: <Landmark size={32} /> },
        { id: "sanga", icon: <Shield size={32} /> },
        { id: "udai", icon: <Stars size={32} /> },
        { id: "pratap", icon: <Crown size={32} /> }
    ];

    return (
        <section className="lineage-section">
            <div className="lineage-header">
                <span className="eyebrow">{t("chron.eyebrow")}</span>
                <h2 className="section-title">{t("lineage.title")}</h2>
                <p className="section-desc">{t("lineage.sub")}</p>
            </div>

            <div className="lineage-wrapper">
                <div className="lineage-scroll">
                    {rulers.map((ruler, index) => (
                        <div key={ruler.id} className="ruler-card reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
                            <div className="card-glow"></div>
                            <div className="card-top">
                                <div className="ruler-icon">
                                    {ruler.icon}
                                </div>
                                <span className="ruler-period">{t(`lineage.${ruler.id}.period`)}</span>
                            </div>
                            <div className="card-body">
                                <h3 className="ruler-name">{t(`lineage.${ruler.id}.name`)}</h3>
                                <span className="ruler-honorific">{t(`lineage.${ruler.id}.title`)}</span>
                                <p className="ruler-desc">{t(`lineage.${ruler.id}.desc`)}</p>
                            </div>
                            <div className="card-connector"></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="scroll-hint reveal reveal-delay-3">
                <span className="hint-text">{t("lineage.scroll_hint")}</span>
                <div className="hint-arrow"></div>
            </div>

            <style jsx>{`
                .lineage-section {
                    padding: 6rem 0;
                    background: rgba(20, 15, 10, 0.4);
                    position: relative;
                    z-index: 5;
                    border-top: 1px solid rgba(212, 175, 55, 0.1);
                    border-bottom: 1px solid rgba(212, 175, 55, 0.1);
                }

                .lineage-header {
                    text-align: center;
                    padding: 0 2rem;
                    margin-bottom: 4rem;
                }

                .section-title {
                    font-family: var(--ff-display);
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    color: #fff;
                    margin-bottom: 1rem;
                    background: linear-gradient(to bottom, #fff, #D4AF37);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .section-desc {
                    color: rgba(255, 255, 255, 0.6);
                    max-width: 600px;
                    margin: 0 auto;
                    font-size: 1.1rem;
                }

                .lineage-wrapper {
                    overflow-x: auto;
                    padding: 2rem;
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none;  /* IE and Edge */
                }

                .lineage-wrapper::-webkit-scrollbar {
                    display: none; /* Chrome, Safari, Opera */
                }

                .lineage-scroll {
                    display: flex;
                    gap: 3rem;
                    padding: 0 4rem 0 4rem; /* Initial padding */
                    width: max-content;
                }

                /* Mobile Peek Effect */
                @media (max-width: 768px) {
                    .lineage-scroll {
                        padding-right: 80px; /* Force overflow peek */
                    }
                }

                .scroll-hint {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1.5rem;
                    margin-top: 3rem;
                    opacity: 0.6;
                }

                .hint-text {
                    font-size: 0.8rem;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    color: var(--gold);
                    font-weight: 600;
                }

                .hint-arrow {
                    width: 40px;
                    height: 1px;
                    background: linear-gradient(to right, var(--gold), transparent);
                    position: relative;
                    animation: hint-slide 2s infinite ease-in-out;
                }

                .hint-arrow::after {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%) rotate(45deg);
                    width: 6px;
                    height: 6px;
                    border-top: 1px solid var(--gold);
                    border-right: 1px solid var(--gold);
                }

                @keyframes hint-slide {
                    0% { transform: translateX(-10px); opacity: 0; }
                    50% { transform: translateX(0); opacity: 1; }
                    100% { transform: translateX(10px); opacity: 0; }
                }

                .ruler-card {
                    width: 300px;
                    background: rgba(30, 25, 20, 0.6);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    padding: 2.5rem;
                    position: relative;
                    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .ruler-card:hover {
                    transform: translateY(-15px);
                    border-color: var(--gold);
                    background: rgba(40, 35, 30, 0.8);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                }

                .card-glow {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at top right, rgba(212, 175, 55, 0.15), transparent 70%);
                    opacity: 0;
                    transition: 0.5s;
                }

                .ruler-card:hover .card-glow {
                    opacity: 1;
                }

                .card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 2rem;
                }

                .ruler-icon {
                    color: var(--gold);
                    opacity: 0.8;
                }

                .ruler-period {
                    font-family: var(--ff-body);
                    font-size: 0.75rem;
                    letter-spacing: 2px;
                    color: var(--gold);
                    opacity: 0.6;
                    text-transform: uppercase;
                }

                .ruler-name {
                    font-family: var(--ff-display);
                    font-size: 1.75rem;
                    color: #fff;
                    margin-bottom: 0.5rem;
                }

                .ruler-honorific {
                    display: block;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: var(--gold);
                    margin-bottom: 1.5rem;
                    font-weight: 600;
                    opacity: 0.9;
                }

                .ruler-desc {
                    font-size: 0.95rem;
                    line-height: 1.7;
                    color: rgba(255, 255, 255, 0.7);
                }

                .card-connector {
                    position: absolute;
                    top: 50%;
                    right: -3rem;
                    width: 3rem;
                    height: 1px;
                    background: linear-gradient(to right, rgba(212, 175, 55, 0.3), transparent);
                }

                .ruler-card:last-child .card-connector {
                    display: none;
                }

                @media (max-width: 768px) {
                    .lineage-scroll { gap: 2rem; padding: 0 2rem 0 2rem; }
                    .ruler-card { width: 280px; padding: 2rem; }
                    .section-title { font-size: 2.5rem; }
                }
            `}</style>
        </section>
    );
}
