"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Clock, MapPin, Map, Sun, Info } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Background3D from "./Background3D";

export default function ItineraryClient() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("1-day");

    const plans = {
        "1-day": {
            title: t("itin.plan1.title") || "1-Day Plan",
            subtitle: t("itin.plan1.sub") || "Chittorgarh Highlights",
            description: t("itin.plan1.desc") || "A perfect day trip covering the most iconic monuments and temples.",
            days: [
                {
                    dayNumber: 1,
                    title: t("itin.plan1.day1.title") || "Chittorgarh Highlights",
                    items: [
                        t("itin.items.fortGates") || "Chittorgarh Fort & Seven Gates",
                        t("itin.items.kumbha") || "Rana Kumbha Palace",
                        t("itin.items.meera") || "Meera Bai Temple",
                        t("itin.items.shyam") || "Kumbha Shyam Temple",
                        t("itin.items.vijay") || "Vijay Stambh",
                        t("itin.items.gaumukh") || "Gaumukh Reservoir",
                        t("itin.items.kirti") || "Kirti Stambh",
                        t("itin.items.jain") || "Jain Temples",
                        t("itin.items.padmini") || "Padmini Palace",
                        t("itin.items.jaimal") || "Jaimal & Patta Memorial",
                        t("itin.items.kalika") || "Kalika Mata Temple",
                        t("itin.items.fatehTime") || "Fateh Prakash Palace Museum (if time permits)"
                    ]
                }
            ]
        },
        "2-day": {
            title: t("itin.plan2.title") || "2-Day Plan",
            subtitle: t("itin.plan2.sub") || "Complete Chittorgarh Fort",
            description: t("itin.plan2.desc") || "A relaxed pace to explore the entire fort in detail, including the evening show.",
            days: [
                {
                    dayNumber: 1,
                    title: t("itin.plan2.day1.title") || "Fort Highlights",
                    items: [
                        t("itin.items.fortGates") || "Chittorgarh Fort & Seven Gates",
                        t("itin.items.kumbha") || "Rana Kumbha Palace",
                        t("itin.items.meera") || "Meera Bai Temple",
                        t("itin.items.shyam") || "Kumbha Shyam Temple",
                        t("itin.items.vijay") || "Vijay Stambh",
                        t("itin.items.gaumukh") || "Gaumukh Reservoir",
                        t("itin.items.kirti") || "Kirti Stambh",
                        t("itin.items.jain") || "Jain Temples",
                        t("itin.items.padmini") || "Padmini Palace"
                    ]
                },
                {
                    dayNumber: 2,
                    title: t("itin.plan2.day2.title") || "Museums & Views",
                    items: [
                        t("itin.items.fateh") || "Fateh Prakash Palace Museum",
                        t("itin.items.ratan") || "Ratan Singh Palace",
                        t("itin.items.jaimal") || "Jaimal & Patta Memorial",
                        t("itin.items.kalika") || "Kalika Mata Temple",
                        t("itin.items.remaining") || "Remaining temples and monuments",
                        t("itin.items.viewpoints") || "Explore fort viewpoints",
                        t("itin.items.lightSound") || "Light & Sound Show (subject to availability)"
                    ]
                }
            ]
        },
        "3-day": {
            title: t("itin.plan3.title") || "3-Day Plan",
            subtitle: t("itin.plan3.sub") || "Chittorgarh + Nearby Attractions",
            description: t("itin.plan3.desc") || "The ultimate experience: the fort plus beautiful nearby destinations.",
            days: [
                {
                    dayNumber: 1,
                    title: t("itin.plan3.day1.title") || "Main Fort",
                    items: [
                        t("itin.items.fortGates") || "Seven Gates",
                        t("itin.items.kumbha") || "Rana Kumbha Palace",
                        t("itin.items.meera") || "Meera Bai Temple",
                        t("itin.items.vijay") || "Vijay Stambh",
                        t("itin.items.gaumukh") || "Gaumukh Reservoir",
                        t("itin.items.kirti") || "Kirti Stambh",
                        t("itin.items.jain") || "Jain Temples",
                        t("itin.items.padmini") || "Padmini Palace"
                    ]
                },
                {
                    dayNumber: 2,
                    title: t("itin.plan3.day2.title") || "Fort Exploration",
                    items: [
                        t("itin.items.fateh") || "Fateh Prakash Palace Museum",
                        t("itin.items.ratan") || "Ratan Singh Palace",
                        t("itin.items.jaimal") || "Jaimal & Patta Memorial",
                        t("itin.items.kalika") || "Kalika Mata Temple",
                        t("itin.items.remainingMon") || "Remaining historical monuments",
                        t("itin.items.lightSound2") || "Light & Sound Show"
                    ]
                },
                {
                    dayNumber: 3,
                    title: t("itin.plan3.day3.title") || "Beyond Chittorgarh (Choose according to your interest)",
                    items: [
                        t("itin.items.menal") || "Menal — Waterfall & Ancient Temples",
                        t("itin.items.bassi") || "Bassi Wildlife Sanctuary — Nature & Wildlife",
                        t("itin.items.sanwaliya") || "Sanwaliya Seth Temple — Religious Tourism",
                        t("itin.items.local") || "Local Chittorgarh — Markets, food, temples and shopping"
                    ]
                }
            ]
        }
    };

    return (
        <>
            <div className="page-wrapper">
                {/* Hero Section */}
                <div className="hero-section">
                    {/* Subtle Fort Silhouette Background */}
                    <div className="hero-bg-silhouette" aria-hidden="true">
                        <svg viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path d="M0,160 L0,120 L20,120 L20,100 L30,100 L30,80 L40,80 L40,70 L50,70 L50,60 L60,60 L60,80 L70,80 L70,60 L80,60 L80,50 L90,50 L90,40 L100,40 L100,50 L110,50 L110,60 L120,60 L120,80 L130,80 L130,60 L140,60 L140,70 L150,70 L150,90 L160,90 L160,80 L170,80 L170,70 L180,70 L180,60 L190,60 L190,50 L200,50 L200,40 L210,40 L210,30 L220,30 L220,40 L230,40 L230,50 L240,50 L240,60 L250,60 L250,50 L260,50 L260,60 L270,60 L270,70 L280,70 L280,80 L300,80 L300,70 L310,70 L310,60 L320,60 L320,50 L330,50 L330,40 L340,40 L340,50 L350,50 L350,60 L360,60 L360,70 L370,70 L370,60 L390,60 L390,80 L420,80 L420,70 L430,70 L430,60 L440,60 L440,50 L460,50 L460,60 L480,60 L480,70 L500,70 L500,80 L520,80 L520,70 L540,70 L540,60 L550,60 L550,50 L560,50 L560,40 L580,40 L580,50 L590,50 L590,60 L600,60 L600,70 L610,70 L610,80 L620,80 L620,70 L640,70 L640,60 L660,60 L660,50 L680,50 L680,40 L700,40 L700,50 L710,50 L710,60 L730,60 L730,70 L750,70 L750,80 L770,80 L770,70 L790,70 L790,60 L810,60 L810,50 L830,50 L830,60 L840,60 L840,70 L850,70 L850,80 L870,80 L870,70 L890,70 L890,60 L920,60 L920,70 L940,70 L940,80 L960,80 L960,70 L980,70 L980,60 L1000,60 L1000,50 L1020,50 L1020,60 L1040,60 L1040,70 L1060,70 L1060,80 L1080,80 L1080,70 L1100,70 L1100,80 L1120,80 L1120,100 L1140,100 L1140,120 L1160,120 L1160,140 L1200,140 L1200,160 Z" fill="rgba(166, 124, 0, 0.06)" />
                        </svg>
                    </div>

                    <div className="hero-content">
                        {/* Decorative top line */}
                        <div className="hero-ornament-top" aria-hidden="true">
                            <span className="ornament-line-h" />
                            <span className="ornament-diamond-sm">◆</span>
                            <span className="ornament-line-h" />
                        </div>

                        {/* Premium Icon Badge */}
                        <div className="hero-icon-badge">
                            <div className="hero-icon-ring-outer">
                                <div className="hero-icon-ring-inner">
                                    <Map size={32} strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>

                        {/* Label above heading */}
                        <p className="hero-eyebrow">Chittorgarh Tourism</p>

                        <h1 className="hero-title">{t("itin.heroTitle") || "Suggested Itineraries"}</h1>

                        {/* Ornamental divider below heading */}
                        <div className="hero-divider" aria-hidden="true">
                            <span className="divider-line" />
                            <span className="divider-motif">✦</span>
                            <span className="divider-line" />
                        </div>

                        <p className="hero-subtitle">{t("itin.heroSub") || "Plan your perfect trip to Chittorgarh"}</p>
                    </div>
                </div>

                {/* Content Container */}
                <div className="container">
                    <div className="itinerary-card">
                        
                        {/* Tabs */}
                        <div className="tabs-container">
                            {Object.entries(plans).map(([key, plan]) => (
                                <button
                                    key={key}
                                    className={`tab-button ${activeTab === key ? "active" : ""}`}
                                    onClick={() => setActiveTab(key)}
                                >
                                    {plan.title}
                                </button>
                            ))}
                        </div>

                        {/* Active Plan Content */}
                        <div className="plan-content">
                            <div className="plan-header">
                                <h2>{plans[activeTab].title} — {plans[activeTab].subtitle}</h2>
                                <p className="plan-desc">{plans[activeTab].description}</p>
                            </div>

                            <div className="days-container">
                                {plans[activeTab].days.map((day, idx) => (
                                    <div key={idx} className="day-card">
                                        <div className="day-header">
                                            <div className="day-badge">
                                                <Sun size={18} />
                                                <span>{t("itin.day") || "Day"} {day.dayNumber}</span>
                                            </div>
                                            <h3 className="day-title">{day.title}</h3>
                                        </div>
                                        <div className="timeline">
                                            {day.items.map((item, itemIdx) => (
                                                <div key={itemIdx} className="timeline-item">
                                                    <div className="timeline-marker">
                                                        <MapPin size={16} />
                                                    </div>
                                                    <div className="timeline-content">
                                                        {item}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Note Section */}
                        <div className="itinerary-note">
                            <Info size={24} className="note-icon" />
                            <div className="note-text">
                                <strong>{t("itin.websiteNote") || "Website note"}:</strong> {t("itin.noteText") || "These are suggested itineraries. You can customize the places according to your interests, travel pace, season and available time. Monument access and special attractions such as the Light & Sound Show may vary."}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <style jsx>{`
                .page-wrapper {
                    min-height: 100vh;
                    padding-top: 80px;
                    padding-bottom: 4rem;
                }

                /* ── HERO SECTION ── */
                .hero-section {
                    position: relative;
                    text-align: center;
                    padding: 3.5rem 1.5rem 2.5rem;
                    margin-bottom: 2rem;
                    overflow: hidden;
                }

                /* Fort silhouette background */
                .hero-bg-silhouette {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    display: flex;
                    align-items: flex-end;
                }
                .hero-bg-silhouette svg {
                    width: 100%;
                    height: auto;
                    min-height: 120px;
                }

                /* Content sits above silhouette */
                .hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 720px;
                    margin: 0 auto;
                }

                /* Top ornament */
                .hero-ornament-top {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    margin-bottom: 2rem;
                }
                .ornament-line-h {
                    display: block;
                    width: 60px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(166,124,0,0.5), transparent);
                }
                .ornament-diamond-sm {
                    font-size: 0.6rem;
                    color: rgba(166,124,0,0.6);
                    letter-spacing: 0.3rem;
                }

                /* Icon badge */
                .hero-icon-badge {
                    display: inline-flex;
                    margin-bottom: 1.5rem;
                }
                .hero-icon-ring-outer {
                    width: 88px;
                    height: 88px;
                    border-radius: 50%;
                    border: 1.5px solid rgba(166,124,0,0.35);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(145deg, rgba(255,252,240,0.9), rgba(255,248,225,0.6));
                    box-shadow: 0 4px 20px rgba(166,124,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8);
                    position: relative;
                }
                .hero-icon-ring-outer::before {
                    content: '';
                    position: absolute;
                    inset: -6px;
                    border-radius: 50%;
                    border: 1px dashed rgba(166,124,0,0.2);
                }
                .hero-icon-ring-inner {
                    color: #A67C00;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* Eyebrow label */
                .hero-eyebrow {
                    font-size: 0.8rem;
                    font-weight: 600;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    color: rgba(166,124,0,0.7);
                    margin-bottom: 0.6rem;
                }

                /* Main heading */
                .hero-title {
                    font-family: var(--ff-display), serif;
                    font-size: clamp(2.2rem, 5vw, 3.6rem);
                    line-height: 1.15;
                    margin-bottom: 1.2rem;
                    background: linear-gradient(135deg, #6B4E00 0%, #A67C00 35%, #D4AF37 65%, #8A682F 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-shadow: none;
                    font-weight: 700;
                }

                /* Ornamental divider below title */
                .hero-divider {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.8rem;
                    margin-bottom: 1.2rem;
                }
                .divider-line {
                    display: block;
                    flex: 1;
                    max-width: 80px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(166,124,0,0.45));
                }
                .divider-line:last-child {
                    background: linear-gradient(90deg, rgba(166,124,0,0.45), transparent);
                }
                .divider-motif {
                    font-size: 0.65rem;
                    color: rgba(166,124,0,0.7);
                    letter-spacing: 0.15rem;
                }

                /* Subtitle */
                .hero-subtitle {
                    color: #5a4a3a;
                    font-size: clamp(1rem, 2.5vw, 1.2rem);
                    max-width: 520px;
                    margin: 0 auto;
                    font-weight: 500;
                    letter-spacing: 0.02em;
                    line-height: 1.6;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .hero-section { padding: 2.5rem 1rem 1.5rem; }
                    .hero-icon-ring-outer { width: 72px; height: 72px; }
                    .ornament-line-h { width: 40px; }
                    .hero-ornament-top { margin-bottom: 1.4rem; }
                    .hero-icon-badge { margin-bottom: 1.2rem; }
                    .divider-line { max-width: 50px; }
                }

                .container {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .itinerary-card {
                    background: var(--charcoal-mid);
                    border: 1px solid var(--border-light);
                    border-radius: 24px;
                    padding: 2rem;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                    backdrop-filter: blur(10px);
                }

                .tabs-container {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 3rem;
                    border-bottom: 1px solid var(--border-mid);
                    padding-bottom: 1rem;
                }

                .tab-button {
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.2);
                    color: rgba(255,255,255,0.7);
                    padding: 0.8rem 2rem;
                    border-radius: 50px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    flex: 1;
                    text-align: center;
                }

                .tab-button:hover {
                    color: #fff;
                    background: rgba(255,255,255,0.1);
                    border-color: rgba(255,255,255,0.4);
                }

                .tab-button.active {
                    background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%);
                    border-color: var(--gold);
                    color: var(--gold);
                    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.15);
                }

                .plan-header {
                    margin-bottom: 3rem;
                    text-align: center;
                }

                .plan-header h2 {
                    font-family: var(--ff-display), serif;
                    font-size: clamp(1.8rem, 4vw, 2.5rem);
                    color: #fff;
                    margin-bottom: 0.8rem;
                    line-height: 1.2;
                }

                .plan-desc {
                    color: rgba(255,255,255,0.85);
                    font-size: 1.1rem;
                    line-height: 1.5;
                }

                .days-container {
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                }

                .day-card {
                    background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
                    border-radius: 20px;
                    padding: 2.5rem;
                    border: 1px solid rgba(255,255,255,0.08);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
                }

                .day-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
                }

                .day-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: var(--gold);
                    color: #000;
                    padding: 0.5rem 1.2rem;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 0.95rem;
                    box-shadow: 0 4px 10px rgba(212, 175, 55, 0.3);
                }

                .day-title {
                    font-size: 1.4rem;
                    color: #fff;
                    font-weight: 600;
                    margin: 0;
                }

                .timeline {
                    display: flex;
                    flex-direction: column;
                    gap: 1.8rem;
                    padding-left: 1.2rem;
                    border-left: 2px dashed rgba(212, 175, 55, 0.35);
                }

                .timeline-item {
                    position: relative;
                    display: flex;
                    align-items: center;
                    padding-left: 2.5rem;
                }

                .timeline-marker {
                    position: absolute;
                    left: -20px;
                    width: 38px;
                    height: 38px;
                    background: var(--charcoal-mid);
                    border: 2px solid var(--gold);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--gold);
                    box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
                }

                .timeline-content {
                    color: #fff;
                    font-size: 1.15rem;
                    font-weight: 500;
                    line-height: 1.4;
                    background: rgba(255,255,255,0.03);
                    padding: 0.8rem 1.2rem;
                    border-radius: 12px;
                    width: 100%;
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .itinerary-note {
                    margin-top: 4rem;
                    padding: 1.8rem;
                    background: #fff8eb;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 16px;
                    display: flex;
                    gap: 1.5rem;
                    align-items: flex-start;
                }

                .note-icon {
                    color: var(--gold);
                    flex-shrink: 0;
                    margin-top: 0.2rem;
                }

                .note-text {
                    color: #444;
                    font-size: 1.05rem;
                    line-height: 1.6;
                }

                .note-text strong {
                    color: #8A682F;
                    font-weight: 700;
                    display: block;
                    margin-bottom: 0.4rem;
                    font-size: 1.1rem;
                }

                @media (max-width: 768px) {
                    .itinerary-card {
                        padding: 1.5rem 1rem;
                        border-radius: 16px;
                    }
                    .tabs-container {
                        flex-direction: column;
                        gap: 0.8rem;
                        border-bottom: none;
                        padding-bottom: 0;
                        margin-bottom: 2rem;
                    }
                    .tab-button {
                        padding: 1rem;
                        font-size: 1.1rem;
                        border-radius: 12px;
                    }
                    .day-card {
                        padding: 1.5rem 1rem;
                        border-radius: 16px;
                    }
                    .day-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.8rem;
                    }
                    .timeline {
                        gap: 1.2rem;
                    }
                    .timeline-content {
                        font-size: 1.05rem;
                        padding: 0.8rem 1rem;
                    }
                    .itinerary-note {
                        flex-direction: column;
                        gap: 1rem;
                        padding: 1.2rem;
                    }
                }
            `}</style>
        </>
    );
}
