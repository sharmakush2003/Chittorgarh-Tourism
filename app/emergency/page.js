"use client";
import { useState } from "react";

// Known places around Chittorgarh district
const PLACES = [
    { type: "hospital", icon: "🏥", name: "Govt. District Hospital", lat: 24.8858, lng: 74.6269 },
    { type: "hospital", icon: "🏥", name: "Meera Hospital", lat: 24.8793, lng: 74.6261 },
    { type: "police", icon: "🚔", name: "Chittorgarh Police Station", lat: 24.8848, lng: 74.6281 },
    { type: "police", icon: "🚔", name: "Kotwali Police Station", lat: 24.8823, lng: 74.6254 },
    { type: "toilet", icon: "🚻", name: "Tourist Toilet – Fort Entry", lat: 24.8892, lng: 74.6452 },
    { type: "toilet", icon: "🚻", name: "Public Toilet – Bus Stand", lat: 24.8821, lng: 74.6219 },
];

const haversine = (lat1, lng1, lat2, lng2) => {
    const R = 6371, dLat = (lat2-lat1)*Math.PI/180, dLng = (lng2-lng1)*Math.PI/180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

const mapsLink = (lat, lng) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

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
    const [locState, setLocState] = useState("idle"); // idle | loading | done | error
    const [nearby, setNearby] = useState([]);

    const findNearby = () => {
        if (!navigator.geolocation) { setLocState("error"); return; }
        setLocState("loading");
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const { latitude: lat, longitude: lng } = coords;
                const groups = ["hospital", "police", "toilet"];
                const results = groups.map(type => {
                    const filtered = PLACES.filter(p => p.type === type)
                        .map(p => ({ ...p, dist: haversine(lat, lng, p.lat, p.lng) }))
                        .sort((a, b) => a.dist - b.dist);
                    return { type, places: filtered.slice(0, 2) };
                });
                setNearby(results);
                setLocState("done");
            },
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
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                }
                .ep-nearby-group h4 {
                    font-size: 0.72rem; text-transform: uppercase; letter-spacing: 2px;
                    color: #555; margin: 0 0 10px 2px;
                }
                .ep-nearby-item {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 10px; padding: 12px 14px;
                    display: flex; flex-direction: column; gap: 6px;
                    transition: background 0.2s;
                }
                .ep-nearby-item:hover { background: rgba(255,255,255,0.06); }
                .ep-nearby-name { font-size: 0.82rem; color: #ccc; }
                .ep-nearby-dist { font-size: 0.75rem; color: #4ade80; font-weight: 700; }
                .ep-dir-btn {
                    display: block; padding: 8px; border-radius: 7px; text-align: center;
                    text-decoration: none; font-size: 0.78rem; font-weight: 600;
                    background: rgba(74,222,128,0.08); color: #4ade80;
                    border: 1px solid rgba(74,222,128,0.2); transition: all 0.2s;
                    margin-top: 2px;
                }
                .ep-dir-btn:hover { background: rgba(74,222,128,0.15); }
                .ep-loc-msg { color: #555; font-size: 0.85rem; text-align: center; padding: 20px; }
                @media (max-width: 680px) {
                    .ep-nearby-grid { grid-template-columns: 1fr; }
                    .ep-nearby-grid > div + div { margin-top: 4px; }
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
                    <h3>📍 Nearest Places</h3>
                    <button
                        className="ep-loc-btn"
                        onClick={findNearby}
                        disabled={locState === "loading"}
                    >
                        {locState === "loading" ? "Locating..." : locState === "done" ? "🔄 Refresh" : "📡 Find Nearby Places"}
                    </button>
                </div>

                {locState === "idle" && (
                    <p className="ep-loc-msg">Click the button to find the nearest hospital, police station, and toilet to your current location.</p>
                )}
                {locState === "error" && (
                    <p className="ep-loc-msg" style={{ color: "#f87171" }}>⚠️ Could not get your location. Please allow location access and try again.</p>
                )}

                {locState === "done" && (
                    <div className="ep-nearby-grid">
                        {nearby.map(({ type, places }) => (
                            <div key={type} className="ep-nearby-group">
                                <h4>{type === "hospital" ? "🏥 Hospital" : type === "police" ? "🚔 Police" : "🚻 Toilet"}</h4>
                                {places.map(p => (
                                    <div key={p.name} className="ep-nearby-item">
                                        <span className="ep-nearby-name">{p.name}</span>
                                        <span className="ep-nearby-dist">{p.dist < 1 ? `${(p.dist * 1000).toFixed(0)}m away` : `${p.dist.toFixed(1)}km away`}</span>
                                        <a href={mapsLink(p.lat, p.lng)} target="_blank" rel="noreferrer" className="ep-dir-btn">Get Directions →</a>
                                    </div>
                                ))}
                            </div>
                        ))}
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
