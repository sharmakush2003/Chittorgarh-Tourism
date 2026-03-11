"use client";

import Link from "next/link";

const emergencyData = [
    {
        category: "Police",
        icon: "🚔",
        accent: "#60a5fa",
        border: "rgba(59,130,246,0.2)",
        glow: "rgba(59,130,246,0.06)",
        contacts: [
            { name: "Police Control Room", number: "07472-240700", note: "24/7" },
            { name: "National Police", number: "100", note: "Emergency" },
            { name: "Tourist Police", number: "1800-180-6127", note: "Toll Free" },
        ]
    },
    {
        category: "Medical",
        icon: "🏥",
        accent: "#f87171",
        border: "rgba(239,68,68,0.2)",
        glow: "rgba(239,68,68,0.06)",
        contacts: [
            { name: "National Ambulance", number: "108", note: "Emergency" },
            { name: "District Hospital", number: "07472-242626", note: "Chittorgarh" },
            { name: "Medical Emergency", number: "102", note: "24/7" },
        ]
    },
    {
        category: "Tourist Helpline",
        icon: "📞",
        accent: "#D4AF37",
        border: "rgba(212,175,55,0.2)",
        glow: "rgba(212,175,55,0.06)",
        contacts: [
            { name: "Rajasthan Tourism", number: "1364", note: "Free Helpline" },
            { name: "India Tourism Jaipur", number: "0141-5110598", note: "9AM–6PM" },
            { name: "Local Guide Assistance", number: "07472-241089", note: "Chittorgarh" },
        ]
    },
    {
        category: "Emergency Services",
        icon: "🆘",
        accent: "#fb923c",
        border: "rgba(249,115,22,0.2)",
        glow: "rgba(249,115,22,0.06)",
        contacts: [
            { name: "Fire Brigade", number: "101", note: "Fire Emergency" },
            { name: "Women Safety", number: "1091", note: "Women in Distress" },
            { name: "Child Helpline", number: "1098", note: "Child Distress" },
            { name: "Disaster Helpline", number: "1078", note: "Nat. Disasters" },
        ]
    }
];

export default function EmergencyPage() {
    return (
        <div className="ep">
            <style jsx>{`
                * { box-sizing: border-box; }

                .ep {
                    min-height: 100vh;
                    background: #080604;
                    color: #fff;
                    font-family: var(--font-jost);
                    padding-bottom: 60px;
                }

                /* ─ Back Button ─ */
                .ep-back {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    margin: 20px 20px 0;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 50px;
                    color: #888;
                    text-decoration: none;
                    font-size: 0.82rem;
                    transition: all 0.25s;
                }
                .ep-back:hover { color: #fff; background: rgba(255,255,255,0.1); }

                /* ─ Hero ─ */
                .ep-hero {
                    padding: 40px 20px 48px;
                    text-align: center;
                    max-width: 680px;
                    margin: 0 auto;
                }

                .ep-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 7px 18px;
                    background: rgba(239,68,68,0.1);
                    border: 1px solid rgba(239,68,68,0.3);
                    border-radius: 50px;
                    color: #fca5a5;
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    margin-bottom: 28px;
                    animation: pulse-ring 2.5s ease-in-out infinite;
                }

                .ep-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #f87171;
                    animation: blink 1s step-end infinite;
                }

                @keyframes blink { 50% { opacity: 0; } }
                @keyframes pulse-ring {
                    50% { box-shadow: 0 0 0 10px rgba(239,68,68,0); }
                }

                .ep-hero h1 {
                    font-family: var(--font-cormorant);
                    font-size: clamp(2.4rem, 7vw, 4.5rem);
                    line-height: 1.08;
                    margin: 0 0 16px;
                    font-weight: 700;
                }

                .ep-hero h1 em {
                    font-style: normal;
                    color: #f87171;
                }

                .ep-hero p {
                    color: #666;
                    font-size: 0.97rem;
                    line-height: 1.8;
                    margin: 0 auto 32px;
                    max-width: 480px;
                }

                /* ─ Quick Dials ─ */
                .ep-quick {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .ep-dial {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 11px 20px;
                    border-radius: 10px;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 0.92rem;
                    border: 1px solid;
                    transition: all 0.2s;
                    white-space: nowrap;
                }
                .ep-dial:hover { transform: translateY(-2px); filter: brightness(1.2); }
                .ep-dial.p { background: rgba(59,130,246,0.1); color: #93c5fd; border-color: rgba(59,130,246,0.25); }
                .ep-dial.a { background: rgba(239,68,68,0.1); color: #fca5a5; border-color: rgba(239,68,68,0.25); }
                .ep-dial.t { background: rgba(212,175,55,0.08); color: #D4AF37; border-color: rgba(212,175,55,0.22); }

                /* ─ Cards ─ */
                .ep-grid {
                    max-width: 960px;
                    margin: 0 auto;
                    padding: 0 16px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }

                .ep-card {
                    background: var(--card-glow);
                    border: 1px solid var(--card-border);
                    border-radius: 16px;
                    padding: 24px;
                    transition: transform 0.3s, box-shadow 0.3s;
                }
                .ep-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.35);
                }

                .ep-card-head {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 18px;
                    padding-bottom: 16px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                .ep-card-icon {
                    font-size: 1.5rem;
                    width: 44px; height: 44px;
                    display: flex; align-items: center; justify-content: center;
                    border-radius: 10px;
                    background: rgba(255,255,255,0.05);
                    flex-shrink: 0;
                }

                .ep-card-head h2 {
                    font-family: var(--font-cormorant);
                    font-size: 1.5rem;
                    margin: 0;
                    font-weight: 600;
                }

                /* ─ Contact Rows ─ */
                .ep-contacts { display: flex; flex-direction: column; gap: 10px; }

                .ep-row {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    padding: 12px 14px;
                    background: rgba(0,0,0,0.28);
                    border-radius: 10px;
                    border: 1px solid rgba(255,255,255,0.04);
                    transition: background 0.2s;
                }
                .ep-row:hover { background: rgba(255,255,255,0.04); }

                .ep-row-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                }

                .ep-contact-name {
                    font-size: 0.84rem;
                    color: #ccc;
                    flex: 1;
                }

                .ep-note {
                    font-size: 0.65rem;
                    color: #555;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                }

                .ep-call {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    width: 100%;
                    padding: 10px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 0.9rem;
                    text-align: center;
                    border: 1px solid;
                    transition: all 0.2s;
                }
                .ep-call:hover { filter: brightness(1.15); transform: scale(1.02); }

                /* ─ Disclaimer ─ */
                .ep-disc {
                    max-width: 960px;
                    margin: 20px auto 0;
                    padding: 0 16px;
                }

                .ep-disc-inner {
                    background: rgba(212,175,55,0.05);
                    border: 1px solid rgba(212,175,55,0.15);
                    border-radius: 12px;
                    padding: 18px 22px;
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                }
                .ep-disc-inner p {
                    color: #666; font-size: 0.84rem; line-height: 1.7; margin: 0;
                }
                .ep-disc-inner strong { color: #D4AF37; }

                /* ─ Responsive ─ */
                @media (max-width: 680px) {
                    .ep-grid { grid-template-columns: 1fr; }
                    .ep-hero { padding: 32px 20px 36px; }
                    .ep-card { padding: 20px; }
                }
            `}</style>

            {/* Back */}
            <Link href="/" className="ep-back">← Home</Link>

            {/* Hero */}
            <section className="ep-hero">
                <div className="ep-badge">
                    <span className="ep-dot" /> Emergency Assistance · Chittorgarh
                </div>
                <h1>Stay <em>Safe</em><br />in the Citadel</h1>
                <p>One-tap access to every emergency number. Save this page before exploring the fort.</p>
                <div className="ep-quick">
                    <a href="tel:100" className="ep-dial p">🚔 Police — 100</a>
                    <a href="tel:108" className="ep-dial a">🚑 Ambulance — 108</a>
                    <a href="tel:1364" className="ep-dial t">📞 Tourist — 1364</a>
                </div>
            </section>

            {/* Cards */}
            <div className="ep-grid">
                {emergencyData.map((s) => (
                    <div
                        key={s.category}
                        className="ep-card"
                        style={{ "--card-glow": s.glow, "--card-border": s.border }}
                    >
                        <div className="ep-card-head">
                            <div className="ep-card-icon">{s.icon}</div>
                            <h2 style={{ color: s.accent }}>{s.category}</h2>
                        </div>
                        <div className="ep-contacts">
                            {s.contacts.map((c) => (
                                <div className="ep-row" key={c.number}>
                                    <div className="ep-row-top">
                                        <span className="ep-contact-name">{c.name}</span>
                                        <span className="ep-note">{c.note}</span>
                                    </div>
                                    <a
                                        href={`tel:${c.number}`}
                                        className="ep-call"
                                        style={{
                                            background: `${s.accent}15`,
                                            color: s.accent,
                                            borderColor: `${s.accent}35`,
                                        }}
                                    >
                                        📞 Call {c.number}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Disclaimer */}
            <div className="ep-disc">
                <div className="ep-disc-inner">
                    <span>ℹ️</span>
                    <p>
                        In any life-threatening situation, always dial <strong>100 (Police)</strong> or{" "}
                        <strong>108 (Ambulance)</strong> first. Numbers are best-effort accurate for Chittorgarh — verify from official sources before your visit.
                    </p>
                </div>
            </div>
        </div>
    );
}
