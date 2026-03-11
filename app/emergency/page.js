"use client";

import Link from "next/link";
import { useState } from "react";

const emergencyData = [
    {
        category: "Police",
        icon: "🚔",
        accent: "#60a5fa",
        bg: "rgba(59, 130, 246, 0.06)",
        border: "rgba(59, 130, 246, 0.2)",
        contacts: [
            { name: "Chittorgarh Police Control Room", number: "07472-240700", note: "Available 24/7" },
            { name: "National Police Helpline", number: "100", note: "Emergency Only" },
            { name: "Tourist Police Helpline", number: "1800-180-6127", note: "Toll Free" },
        ]
    },
    {
        category: "Medical",
        icon: "🏥",
        accent: "#f87171",
        bg: "rgba(239, 68, 68, 0.06)",
        border: "rgba(239, 68, 68, 0.2)",
        contacts: [
            { name: "Ambulance (National)", number: "108", note: "Emergency Only" },
            { name: "Govt. District Hospital", number: "07472-242626", note: "Chittorgarh City" },
            { name: "Medical Emergency Line", number: "102", note: "24/7 Active" },
        ]
    },
    {
        category: "Tourist Helpline",
        icon: "📞",
        accent: "#D4AF37",
        bg: "rgba(212, 175, 55, 0.06)",
        border: "rgba(212, 175, 55, 0.2)",
        contacts: [
            { name: "Rajasthan Tourist Helpline", number: "1364", note: "Official — Free" },
            { name: "India Tourism Jaipur", number: "0141-5110598", note: "Mon–Sat 9AM–6PM" },
            { name: "Local Tourist Assistance", number: "07472-241089", note: "Chittorgarh District" },
        ]
    },
    {
        category: "Emergency Services",
        icon: "🆘",
        accent: "#fb923c",
        bg: "rgba(249, 115, 22, 0.06)",
        border: "rgba(249, 115, 22, 0.2)",
        contacts: [
            { name: "Fire Brigade", number: "101", note: "Fire Emergency" },
            { name: "Women Safety Helpline", number: "1091", note: "Women in Distress" },
            { name: "Child Helpline", number: "1098", note: "Child in Distress" },
            { name: "National Disaster Helpline", number: "1078", note: "Natural Disasters" },
        ]
    }
];

export default function EmergencyPage() {
    const [calling, setCalling] = useState(null);

    const handleCall = (number) => {
        setCalling(number);
        setTimeout(() => setCalling(null), 2000);
    };

    return (
        <div className="emergency-page">
            <style jsx>{`
                .emergency-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #080503 0%, #0d0907 50%, #080503 100%);
                    color: #fff;
                    font-family: var(--font-jost);
                }

                /* ── Back Button ── */
                .back-btn {
                    position: fixed;
                    top: 24px;
                    left: 24px;
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 18px;
                    background: rgba(255,255,255,0.05);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 30px;
                    color: #aaa;
                    text-decoration: none;
                    font-size: 0.82rem;
                    letter-spacing: 0.5px;
                    transition: all 0.3s ease;
                }
                .back-btn:hover {
                    background: rgba(255,255,255,0.1);
                    color: #fff;
                    border-color: rgba(255,255,255,0.2);
                }

                /* ── Hero ── */
                .hero {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 130px 40px 70px;
                    text-align: center;
                }

                .sos-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 9px 22px;
                    background: rgba(239, 68, 68, 0.12);
                    border: 1px solid rgba(239, 68, 68, 0.35);
                    border-radius: 50px;
                    color: #fca5a5;
                    font-size: 0.72rem;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    margin-bottom: 32px;
                    animation: pulse-ring 2.5s ease-in-out infinite;
                }

                @keyframes pulse-ring {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.25); }
                    50% { box-shadow: 0 0 0 12px rgba(239, 68, 68, 0); }
                }

                .sos-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #f87171;
                    animation: blink 1s step-end infinite;
                }

                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }

                .hero h1 {
                    font-family: var(--font-cormorant);
                    font-size: clamp(3rem, 6vw, 5.5rem);
                    line-height: 1.05;
                    margin: 0 0 20px;
                    font-weight: 700;
                    letter-spacing: -1px;
                }

                .hero h1 em {
                    font-style: normal;
                    background: linear-gradient(135deg, #f87171, #fca5a5);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hero p {
                    color: #666;
                    font-size: 1.1rem;
                    line-height: 1.8;
                    max-width: 560px;
                    margin: 0 auto 40px;
                }

                .quick-dials {
                    display: flex;
                    justify-content: center;
                    gap: 14px;
                    flex-wrap: wrap;
                }

                .quick-dial {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    padding: 13px 22px;
                    border-radius: 12px;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 1rem;
                    transition: all 0.25s ease;
                    border: 1px solid transparent;
                }

                .quick-dial.police {
                    background: rgba(59, 130, 246, 0.12);
                    color: #93c5fd;
                    border-color: rgba(59, 130, 246, 0.25);
                }

                .quick-dial.ambulance {
                    background: rgba(239, 68, 68, 0.12);
                    color: #fca5a5;
                    border-color: rgba(239, 68, 68, 0.25);
                }

                .quick-dial.tourist {
                    background: rgba(212, 175, 55, 0.10);
                    color: #D4AF37;
                    border-color: rgba(212, 175, 55, 0.22);
                }

                .quick-dial:hover {
                    transform: translateY(-3px);
                    filter: brightness(1.2);
                    box-shadow: 0 12px 30px rgba(0,0,0,0.3);
                }

                /* ── Grid ── */
                .contacts-grid {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 40px 80px;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                }

                .card {
                    border-radius: 20px;
                    padding: 32px;
                    border: 1px solid;
                    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }

                .card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    opacity: 0.04;
                    background: currentColor;
                    transform: translate(30%, -30%);
                    transition: transform 0.4s ease;
                }

                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 24px 60px rgba(0,0,0,0.3);
                }

                .card:hover::before {
                    transform: translate(20%, -20%) scale(1.3);
                }

                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 26px;
                }

                .card-icon {
                    font-size: 2rem;
                    width: 56px;
                    height: 56px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 14px;
                    background: rgba(255,255,255,0.05);
                    flex-shrink: 0;
                }

                .card-title {
                    font-family: var(--font-cormorant);
                    font-size: 1.9rem;
                    font-weight: 600;
                    margin: 0;
                }

                .contact-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .contact-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    padding: 13px 16px;
                    background: rgba(0,0,0,0.25);
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.04);
                    transition: background 0.2s;
                }

                .contact-row:hover {
                    background: rgba(255,255,255,0.04);
                }

                .contact-info {
                    flex: 1;
                    min-width: 0;
                }

                .contact-name {
                    font-size: 0.87rem;
                    color: #ccc;
                    display: block;
                    margin-bottom: 3px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .contact-note {
                    font-size: 0.68rem;
                    color: #555;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                }

                .call-btn {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    padding: 9px 16px;
                    border-radius: 9px;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 0.88rem;
                    letter-spacing: 0.3px;
                    white-space: nowrap;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                    border: 1px solid;
                }

                .call-btn:hover {
                    transform: scale(1.06);
                    filter: brightness(1.2);
                }

                .call-btn.active {
                    animation: call-pulse 0.4s ease;
                }

                @keyframes call-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(0.95); }
                }

                /* ── Disclaimer ── */
                .disclaimer {
                    max-width: 1200px;
                    margin: 0 auto 60px;
                    padding: 0 40px;
                }

                .disclaimer-inner {
                    background: rgba(212, 175, 55, 0.05);
                    border: 1px solid rgba(212, 175, 55, 0.15);
                    border-radius: 14px;
                    padding: 22px 28px;
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                }

                .disclaimer-inner .icon { font-size: 1.1rem; flex-shrink: 0; margin-top: 1px; }

                .disclaimer-inner p {
                    color: #666;
                    font-size: 0.87rem;
                    line-height: 1.7;
                    margin: 0;
                }

                .disclaimer-inner strong { color: #D4AF37; }

                /* ── Responsive ── */
                @media (max-width: 900px) {
                    .contacts-grid {
                        grid-template-columns: 1fr;
                        padding: 0 20px 60px;
                    }
                    .hero {
                        padding: 100px 20px 50px;
                    }
                    .hero h1 { font-size: 2.8rem; }
                    .disclaimer { padding: 0 20px; }
                    .back-btn { top: 16px; left: 16px; }
                }
            `}</style>

            {/* Floating Back Button */}
            <Link href="/" className="back-btn">
                ← Home
            </Link>

            {/* Hero Section */}
            <section className="hero">
                <div className="sos-badge">
                    <span className="sos-dot" />
                    Emergency Assistance · Chittorgarh
                </div>
                <h1>Stay <em>Safe</em><br />in the Citadel</h1>
                <p>
                    One-tap access to all emergency services during your visit to Chittorgarh.
                    Save this page before exploring — your safety is our highest priority.
                </p>
                <div className="quick-dials">
                    <a href="tel:100" className="quick-dial police">🚔 Police — 100</a>
                    <a href="tel:108" className="quick-dial ambulance">🚑 Ambulance — 108</a>
                    <a href="tel:1364" className="quick-dial tourist">📞 Tourist — 1364</a>
                </div>
            </section>

            {/* Cards Grid */}
            <div className="contacts-grid">
                {emergencyData.map((section) => (
                    <div
                        key={section.category}
                        className="card"
                        style={{
                            background: section.bg,
                            borderColor: section.border,
                            color: section.accent,
                        }}
                    >
                        <div className="card-header">
                            <div className="card-icon">{section.icon}</div>
                            <h2 className="card-title" style={{ color: section.accent }}>
                                {section.category}
                            </h2>
                        </div>
                        <div className="contact-list">
                            {section.contacts.map((c) => (
                                <div className="contact-row" key={c.number}>
                                    <div className="contact-info">
                                        <span className="contact-name">{c.name}</span>
                                        <span className="contact-note">{c.note}</span>
                                    </div>
                                    <a
                                        href={`tel:${c.number}`}
                                        className={`call-btn ${calling === c.number ? "active" : ""}`}
                                        onClick={() => handleCall(c.number)}
                                        style={{
                                            background: `${section.accent}18`,
                                            color: section.accent,
                                            borderColor: `${section.accent}40`,
                                        }}
                                    >
                                        📞 {c.number}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Disclaimer */}
            <div className="disclaimer">
                <div className="disclaimer-inner">
                    <span className="icon">ℹ️</span>
                    <p>
                        Numbers are best-effort accurate for Chittorgarh district. In any life-threatening situation,
                        always dial <strong>100 (Police)</strong> or <strong>108 (Ambulance)</strong> first.
                        Contact numbers may change — always confirm from official sources before your visit.
                    </p>
                </div>
            </div>
        </div>
    );
}
