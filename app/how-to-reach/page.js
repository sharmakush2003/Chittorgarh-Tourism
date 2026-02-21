"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FROM_CITY_KEY = "ctt_fromCity";
const VISITED_KEY = "ctt_visited";

const DISTANCES = [
    { city: "Udaipur", km: 115, drive: "~2 hrs", train: "~2.5 hrs", keywords: ["udaipur"] },
    { city: "Jaipur", km: 320, drive: "~5 hrs", train: "~5 hrs", keywords: ["jaipur"] },
    { city: "Delhi", km: 660, drive: "~10 hrs", train: "~9 hrs", keywords: ["delhi", "new delhi"] },
    { city: "Mumbai", km: 950, drive: "~14 hrs", train: "~15 hrs", keywords: ["mumbai", "bombay"] },
    { city: "Ahmedabad", km: 350, drive: "~5.5 hrs", train: "~6 hrs", keywords: ["ahmedabad"] },
    { city: "Kota", km: 165, drive: "~3 hrs", train: "~3 hrs", keywords: ["kota"] },
    { city: "Bhopal", km: 450, drive: "~7 hrs", train: "~7.5 hrs", keywords: ["bhopal"] },
];

const TRANSPORT = [
    {
        icon: "/railway_station.jpg",
        mode: "By Train",
        heading: "Chittorgarh Railway Station",
        desc: "Direct trains from Delhi, Udaipur, Jaipur, Mumbai & Kota. The Chetak Express & Mewar Express are popular routes.",
        details: ["Chetak Express (Delhi ↔ Udaipur)", "Mewar Express (Delhi ↔ Udaipur)", "Regular trains from Kota & Jaipur"],
        badge: "Most Popular",
        bookUrl: "https://www.irctc.co.in/nget/train-search",
        bookLabel: "Book on IRCTC",
    },
    {
        icon: "/airport.jpg",
        mode: "By Air",
        heading: "Maharana Pratap Airport, Udaipur",
        desc: "Nearest airport is Udaipur (UDR), ~115 km away. Cabs and buses connect you to Chittorgarh in 2 hours.",
        details: ["Udaipur Airport (UDR) — 115 km", "Cab: ~2 hrs · ₹1,400–1,800", "Jaipur Airport (JAI) — 320 km"],
        badge: null,
        bookUrl: "https://www.makemytrip.com/flights/",
        bookLabel: "Search Flights",
    },
    {
        icon: "/bus.jpg",
        mode: "By Bus",
        heading: "RSRTC Bus Services",
        desc: "Rajasthan State buses run regularly from Udaipur, Jaipur, Kota and Ajmer. Volvo coaches available.",
        details: ["RSRTC from Udaipur & Jaipur", "Volvo coaches from Kota", "Private sleeper buses available"],
        badge: null,
        bookUrl: "https://rsrtconline.rajasthan.gov.in/",
        bookLabel: "Book on RSRTC",
    },
    {
        icon: "/nh.jpg",
        mode: "Self Drive",
        heading: "National Highway Network",
        desc: "Well-connected via NH-58 and NH-27. A scenic self-drive through Rajasthan is an experience in itself.",
        details: ["NH-58: Kota → Chittorgarh", "NH-27: Udaipur → Chittorgarh", "Ample parking near the Fort"],
        badge: null,
        bookUrl: "https://www.google.com/maps/dir/?api=1&destination=Chittorgarh+Fort,+Chittorgarh,+Rajasthan",
        bookLabel: "Get Directions",
    },
];

export default function HowToReachPage() {
    const router = useRouter();
    const [fromCity, setFromCity] = useState(null);
    const [cityMatch, setCityMatch] = useState(null);

    useEffect(() => {
        const city = localStorage.getItem(FROM_CITY_KEY);
        if (city) {
            setFromCity(city);
            const lower = city.toLowerCase();
            setCityMatch(DISTANCES.find(d => d.keywords.some(k => lower.includes(k))) || null);
        }
    }, []);

    const handleStartExploring = () => {
        localStorage.setItem(VISITED_KEY, "true");
        router.push("/");
    };

    return (
        <div className="htr-page">
            <div className="htr-fixed-bg" />
            <div className="htr-bg-overlay" />

            {/* ── HERO ── */}
            <div className="htr-hero">
                <span className="htr-eyebrow">Travel Guide · Rajasthan, India</span>
                <h1 className="htr-hero-title">
                    Getting to
                    <em>Chittorgarh</em>
                </h1>
                <p className="htr-hero-sub">
                    Plan your journey to one of India&apos;s greatest forts. Here&apos;s every way to reach this historic city.
                </p>
                <div className="htr-divider" />
                {cityMatch && (
                    <span className="htr-detected-pill">
                        📍 From {fromCity}: ~{cityMatch.km} km &nbsp;·&nbsp; Drive {cityMatch.drive} &nbsp;·&nbsp; Train {cityMatch.train}
                    </span>
                )}
            </div>

            {/* ── TRANSPORT CARDS ── */}
            <section className="htr-section">
                <div className="container">
                    <div className="htr-section-header">
                        <span className="htr-section-eyebrow">Ways to Reach</span>
                        <h2 className="htr-section-title">Choose Your Route</h2>
                    </div>
                    <div className="htr-transport-grid">
                        {TRANSPORT.map((t) => (
                            <div className="htr-card" key={t.mode}>
                                {t.badge && <span className="htr-badge">{t.badge}</span>}
                                <img src={t.icon} alt={t.mode} className="htr-card-img" />
                                <div className="htr-card-body">
                                    <div className="htr-card-mode">{t.mode}</div>
                                    <h3 className="htr-card-heading">{t.heading}</h3>
                                    <p className="htr-card-desc">{t.desc}</p>
                                    <ul className="htr-card-details">
                                        {t.details.map((d, i) => (
                                            <li key={i}>
                                                <span className="htr-bullet">✦</span>{d}
                                            </li>
                                        ))}
                                    </ul>
                                    <a
                                        href={t.bookUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="htr-book-btn"
                                    >
                                        {t.bookLabel} →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── DISTANCES TABLE ── */}
            <section className="htr-section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="htr-section-header">
                        <span className="htr-section-eyebrow">Distance Reference</span>
                        <h2 className="htr-section-title">From Major Cities</h2>
                    </div>
                    <div className="htr-table-wrap">
                        <table className="htr-table">
                            <thead>
                                <tr>
                                    <th>City</th>
                                    <th>Distance</th>
                                    <th>By Road</th>
                                    <th>By Train</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DISTANCES.map((d) => {
                                    const isHighlight = fromCity && d.keywords.some(k => fromCity.toLowerCase().includes(k));
                                    return (
                                        <tr key={d.city} className={isHighlight ? "htr-row-highlight" : ""}>
                                            <td>
                                                {d.city}
                                                {isHighlight && <span className="htr-you-tag">← You</span>}
                                            </td>
                                            <td>{d.km} km</td>
                                            <td>{d.drive}</td>
                                            <td>{d.train}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── MAP ── */}
            <section className="htr-section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="htr-section-header">
                        <span className="htr-section-eyebrow">Location</span>
                        <h2 className="htr-section-title">Find Us on the Map</h2>
                    </div>
                    <div className="htr-map-wrap">
                        <iframe
                            title="Chittorgarh Fort"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3636.7427840193!2d74.6441!3d24.8794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968a95f08f2c355%3A0x4d8a18c2c0a5e2c5!2sChittorgarh%20Fort!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <div className="htr-cta">
                <span className="htr-cta-emblem">🏰</span>
                <h2 className="htr-cta-title">
                    Ready to <em>Explore?</em>
                </h2>
                <p className="htr-cta-sub">
                    You&apos;re all set. Step into 700 acres of living history, bravery, and heritage.
                </p>
                <button className="btn-gold htr-cta-btn" onClick={handleStartExploring}>
                    Start Exploring Chittorgarh →
                </button>
                <p className="htr-cta-note">You won&apos;t see this screen again on your next visit.</p>
            </div>
        </div>
    );
}
