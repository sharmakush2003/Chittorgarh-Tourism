"use client";
import { useState } from "react";

const CATEGORIES = [
    { type: "hospital", label: "🏥 Nearest Hospital", query: "hospital" },
    { type: "police",   label: "🚔 Nearest Police Station", query: "police+station" },
    { type: "toilet",   label: "🚻 Nearest Public Toilet", query: "public+toilet" },
    { type: "pharmacy", label: "💊 Nearest Pharmacy", query: "pharmacy" },
];

const mapsSearch = (query, lat, lng) =>
    `https://www.google.com/maps/search/${query}/@${lat},${lng},15z`;

const emergencyData = [
    {
        category: "Police",
        icon: "🚔",
        accent: "#60a5fa",
        border: "rgba(59,130,246,0.2)",
        glow: "rgba(59,130,246,0.06)",
        contacts: [
            { name: "Police Control Room", number: "01472-240088", note: "24/7" },
            { name: "Police Helpline", number: "100", note: "Emergency" },
            { name: "Cyber Crime", number: "1930", note: "Helpline" },
        ]
    },
    {
        category: "Medical",
        icon: "🏥",
        accent: "#f87171",
        border: "rgba(239,68,68,0.2)",
        glow: "rgba(239,68,68,0.06)",
        contacts: [
            { name: "Ambulance (ERS)", number: "108", note: "Emergency" },
            { name: "Ambulance (Transport)", number: "102", note: "Medical" },
            { name: "MP Birla Hospital", number: "09530388881", note: "24/7" },
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
    const [locState, setLocState] = useState("idle");
    const [coords, setCoords] = useState(null);

    const findNearby = () => {
        if (!navigator.geolocation) { setLocState("error"); return; }
        setLocState("loading");
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => { setCoords({ lat: coords.latitude, lng: coords.longitude }); setLocState("done"); },
            () => setLocState("error")
        );
    };

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

                /* ─ Hero ─ */
                .ep-hero {
                    padding: 100px 20px 48px;
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

                /* ─ Nearby Section ─ */
                .ep-nearby {
                    max-width: 960px;
                    margin: 0 auto 32px;
                    padding: 0 16px;
                }
                .ep-nearby-head {
                    display: flex; align-items: center; justify-content: space-between;
                    margin-bottom: 16px; flex-wrap: wrap; gap: 10px;
                }
                .ep-nearby-head h3 {
                    font-family: var(--font-cormorant);
                    font-size: 1.6rem; margin: 0; color: #fff;
                }
                .ep-loc-btn {
                    display: flex; align-items: center; gap: 8px;
                    padding: 10px 20px; border-radius: 8px;
                    background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.3);
                    color: #4ade80; font-size: 0.85rem; font-weight: 600;
                    cursor: pointer; transition: all 0.2s;
                }
                .ep-loc-btn:hover { background: rgba(74,222,128,0.18); }
                .ep-loc-btn:disabled { opacity: 0.5; cursor: not-allowed; }
                .ep-nearby-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 16px;
                }
                .ep-nearby-item {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 14px;
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    text-decoration: none;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                .ep-nearby-item:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.15);
                    transform: translateY(-4px);
                    box-shadow: 0 12px 30px rgba(0,0,0,0.3);
                }
                .ep-nearby-icon {
                    font-size: 1.6rem;
                    width: 52px;
                    height: 52px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255,255,255,0.05);
                    border-radius: 12px;
                    flex-shrink: 0;
                }
                .ep-nearby-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .ep-nearby-name {
                    font-size: 0.95rem;
                    color: #fff;
                    font-weight: 600;
                }
                .ep-nearby-dist {
                    font-size: 0.72rem;
                    color: #4ade80;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .ep-nearby-arrow {
                    color: rgba(255,255,255,0.2);
                    font-size: 1.3rem;
                    transition: all 0.3s ease;
                }
                .ep-nearby-item:hover .ep-nearby-arrow {
                    color: #4ade80;
                    transform: translateX(4px);
                }
                .ep-loc-msg { color: #555; font-size: 0.9rem; text-align: center; padding: 24px; line-height: 1.6; }
                @media (max-width: 680px) {
                    .ep-nearby-grid { grid-template-columns: 1fr; }
                    .ep-nearby-item { padding: 14px; gap: 14px; }
                    .ep-nearby-icon { width: 44px; height: 44px; font-size: 1.3rem; }
                    .ep-nearby-name { font-size: 0.9rem; }
                }

                /* ─ Responsive ─ */
                @media (max-width: 680px) {
                    .ep-grid { grid-template-columns: 1fr; }
                    .ep-hero { padding: 80px 20px 36px; }
                    .ep-card { padding: 20px; }
                }
            `}</style>

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

            {/* Nearby Places */}
            <div className="ep-nearby">
                <div className="ep-nearby-head">
                    <h3>📍 Find Nearby Places</h3>
                    <button className="ep-loc-btn" onClick={findNearby} disabled={locState === "loading"}>
                        {locState === "loading" ? "Locating..." : locState === "done" ? "🔄 Refresh" : "📡 Use My Location"}
                    </button>
                </div>

                {locState === "idle" && <p className="ep-loc-msg">Allow location access to see nearest hospitals, police stations, toilets and pharmacies via Google Maps.</p>}
                {locState === "error" && <p className="ep-loc-msg" style={{ color: "#f87171" }}>⚠️ Location access denied. Please enable it in browser settings and try again.</p>}

                {locState === "done" && coords && (
                    <div className="ep-nearby-grid">
                        {CATEGORIES.map(c => {
                            const icon = c.label.split(' ')[0];
                            const text = c.label.substring(icon.length).trim();
                            return (
                                <a
                                    key={c.type}
                                    href={mapsSearch(c.query, coords.lat, coords.lng)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="ep-nearby-item"
                                >
                                    <div className="ep-nearby-icon">{icon}</div>
                                    <div className="ep-nearby-content">
                                        <span className="ep-nearby-name">{text}</span>
                                        <span className="ep-nearby-dist">Open in Google Maps</span>
                                    </div>
                                    <div className="ep-nearby-arrow">→</div>
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>

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
