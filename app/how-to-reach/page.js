"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import HeritageFacts from "@/components/HeritageFacts";

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

const LOCAL_KEYWORDS = ["chanderiya", "chittorgarh", "senthi", "bapawar", "obri", "segwa", "kumbha nagar", "pratap nagar"];

const POPULAR_CITIES = ["Delhi", "Jaipur", "Udaipur", "Mumbai", "Ahmedabad", "Kota", "Bhopal", "Pune", "Hyderabad", "Bangalore", "Chennai", "Kolkata"];

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
        mode: "Local Transport",
        heading: "Inside Chittorgarh City",
        desc: "Since you are already in the city, the Fort is just a short hop away. E-Rickshaws and Auto Rickshaws are the best way.",
        details: ["E-Rickshaw: ₹20–40 per person", "Auto Rickshaw (Full): ₹150–200", "Bikes/Scooters on rent available"],
        badge: "Internal Directions",
        bookUrl: "https://www.google.com/maps/dir/?api=1&destination=Chittorgarh+Fort,+Chittorgarh,+Rajasthan",
        bookLabel: "Google Maps Directions",
    },
];

// ── Location Prompt Overlay ──────────────────────────────────────────
function LocationPrompt({ onCityDetected }) {
    const [step, setStep] = useState("prompt"); // "prompt" | "loading" | "manual" | "error"
    const [manualInput, setManualInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const inputRef = useRef(null);

    const reverseGeocode = async (lat, lon) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
                { headers: { "Accept-Language": "en" } }
            );
            const data = await res.json();
            const city =
                data.address?.city ||
                data.address?.town ||
                data.address?.village ||
                data.address?.county ||
                data.address?.state_district ||
                data.address?.state;
            return city || null;
        } catch {
            return null;
        }
    };

    const handleGPS = () => {
        if (!navigator.geolocation) {
            setErrorMsg("Your browser doesn't support GPS location.");
            setStep("manual");
            return;
        }
        setStep("loading");
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const city = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
                if (city) {
                    localStorage.setItem(FROM_CITY_KEY, city);
                    onCityDetected(city);
                } else {
                    setErrorMsg("Couldn't determine your city from GPS. Please enter it below.");
                    setStep("manual");
                }
            },
            (err) => {
                const msg =
                    err.code === 1
                        ? "Location permission denied. Please enter your city below."
                        : "Unable to get your location. Please enter your city below.";
                setErrorMsg(msg);
                setStep("manual");
            },
            { timeout: 10000 }
        );
    };

    const handleManualConfirm = () => {
        const city = manualInput.trim();
        if (!city) return;
        localStorage.setItem(FROM_CITY_KEY, city);
        onCityDetected(city);
    };

    const handlePopularCity = (city) => {
        localStorage.setItem(FROM_CITY_KEY, city);
        onCityDetected(city);
    };

    const handleSkip = () => {
        onCityDetected(null);
    };

    return (
        <div className="htr-location-overlay">
            <div className="htr-location-card">
                <div className="htr-location-icon">📍</div>

                {step === "prompt" && (
                    <>
                        <h3 className="htr-location-title">Where are you travelling from?</h3>
                        <p className="htr-location-sub">
                            Share your location and we&apos;ll show you the best route to Chittorgarh — distance, drive time, and transport options personalised for you.
                        </p>
                        <div className="htr-location-actions">
                            <button className="htr-loc-btn-primary" onClick={handleGPS}>
                                <span>📡</span> Detect My Location
                            </button>
                            <button className="htr-loc-btn-secondary" onClick={() => { setStep("manual"); setTimeout(() => inputRef.current?.focus(), 100); }}>
                                ✏️ Enter City Manually
                            </button>
                        </div>
                        <button className="htr-loc-skip" onClick={handleSkip}>Skip personalisation</button>
                    </>
                )}

                {step === "loading" && (
                    <>
                        <h3 className="htr-location-title">Detecting your location…</h3>
                        <p className="htr-location-sub">Please allow location access in the browser prompt above.</p>
                        <div className="htr-loc-spinner" />
                    </>
                )}

                {step === "manual" && (
                    <>
                        <h3 className="htr-location-title">Enter your departure city</h3>
                        {errorMsg && <p className="htr-loc-error">{errorMsg}</p>}
                        <div className="htr-loc-input-row">
                            <input
                                ref={inputRef}
                                type="text"
                                className="htr-loc-input"
                                placeholder="e.g. Delhi, Mumbai, Pune…"
                                value={manualInput}
                                onChange={(e) => setManualInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleManualConfirm()}
                            />
                            <button
                                className="htr-loc-btn-primary"
                                onClick={handleManualConfirm}
                                disabled={!manualInput.trim()}
                            >
                                Confirm →
                            </button>
                        </div>
                        <div className="htr-popular-row">
                            {POPULAR_CITIES.map((c) => (
                                <button key={c} className="htr-popular-chip" onClick={() => handlePopularCity(c)}>
                                    {c}
                                </button>
                            ))}
                        </div>
                        <button className="htr-loc-skip" onClick={handleSkip}>Skip personalisation</button>
                    </>
                )}
            </div>
        </div>
    );
}

// ── Main Page ────────────────────────────────────────────────────────
export default function HowToReachPage() {
    const router = useRouter();
    const [fromCity, setFromCity] = useState(null);
    const [cityMatch, setCityMatch] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(FROM_CITY_KEY);
        if (saved) {
            applyCity(saved);
        } else {
            setShowPrompt(true);
        }
    }, []);

    const applyCity = (city) => {
        if (!city) return;
        setFromCity(city);
        const lower = city.toLowerCase();

        // Check for major cities
        const match = DISTANCES.find((d) => d.keywords.some((k) => lower.includes(k)));
        // Check if local area
        const isLocal = LOCAL_KEYWORDS.some(k => lower.includes(k));

        if (isLocal) {
            setCityMatch({ local: true });
        } else {
            setCityMatch(match || null);
        }
    };

    const handleCityDetected = (city) => {
        setShowPrompt(false);
        if (city) applyCity(city);
    };

    const handleChangeCity = () => {
        localStorage.removeItem(FROM_CITY_KEY);
        setFromCity(null);
        setCityMatch(null);
        setShowPrompt(true);
    };

    const handleStartExploring = () => {
        localStorage.setItem(VISITED_KEY, "true");
        router.push("/");
    };

    return (
        <div className="htr-page">
            <div className="htr-fixed-bg" />
            <div className="htr-bg-overlay" />

            {/* ── LOCATION PROMPT ── */}
            {showPrompt && <LocationPrompt onCityDetected={handleCityDetected} />}

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

                {cityMatch?.local ? (
                    <div className="htr-detected-pill-wrap">
                        <span className="htr-detected-pill">
                            📍 Welcome {fromCity}! You are already in Chittorgarh.
                        </span>
                        <button className="htr-change-city" onClick={handleChangeCity}>
                            Change starting point ✎
                        </button>
                    </div>
                ) : cityMatch ? (
                    <div className="htr-detected-pill-wrap">
                        <span className="htr-detected-pill">
                            📍 From {fromCity}: ~{cityMatch.km} km &nbsp;·&nbsp; Drive {cityMatch.drive} &nbsp;·&nbsp; Train {cityMatch.train}
                        </span>
                        <button className="htr-change-city" onClick={handleChangeCity}>
                            Change city ✎
                        </button>
                    </div>
                ) : fromCity ? (
                    <div className="htr-detected-pill-wrap">
                        <span className="htr-detected-pill">
                            📍 Travelling from {fromCity}
                        </span>
                        <button className="htr-change-city" onClick={handleChangeCity}>
                            Change city ✎
                        </button>
                    </div>
                ) : null}
            </div>

            {/* ── TRANSPORT CARDS ── */}
            <section className="htr-section">
                <div className="container">
                    <div className="htr-section-header">
                        <span className="htr-section-eyebrow">Ways to Reach</span>
                        <h2 className="htr-section-title">
                            {cityMatch?.local ? "Your Local Guide" : "Choose Your Route"}
                        </h2>
                    </div>
                    <div className="htr-transport-grid">
                        {TRANSPORT.map((item) => {
                            // If local, prioritize the Local Transport card
                            const isLocalTransport = item.mode === "Local Transport";
                            const showCardAtTop = cityMatch?.local && isLocalTransport;

                            return (
                                <div className={`htr-card ${showCardAtTop ? "htr-card-featured" : ""}`} key={item.mode}>
                                    {item.badge && <span className="htr-badge">{item.badge}</span>}
                                    <img src={item.icon} alt={item.mode} className="htr-card-img" />
                                    <div className="htr-card-body">
                                        <div className="htr-card-mode">{item.mode}</div>
                                        <h3 className="htr-card-heading">{item.heading}</h3>
                                        <p className="htr-card-desc">{item.desc}</p>
                                        <ul className="htr-card-details">
                                            {item.details.map((d, i) => (
                                                <li key={i}>
                                                    <span className="htr-bullet">✦</span>{d}
                                                </li>
                                            ))}
                                        </ul>
                                        <a
                                            href={item.bookUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="htr-book-btn"
                                        >
                                            {item.bookLabel} →
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
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
                        <h2 className="htr-section-title">
                            {fromCity ? `Route from ${fromCity}` : "Find Us on the Map"}
                        </h2>
                    </div>
                    <div className="htr-map-wrap">
                        {fromCity ? (
                            <iframe
                                title={`Route from ${fromCity} to Chittorgarh Fort`}
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(fromCity)}+to+Chittorgarh+Fort&output=embed`}
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        ) : (
                            <iframe
                                title="Chittorgarh Fort Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3636.7427840193!2d74.6441!3d24.8794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968a95f08f2c355%3A0x4d8a18c2c0a5e2c5!2sChittorgarh%20Fort!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        )}
                    </div>
                    {fromCity && (
                        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.85rem", opacity: 0.6 }}>
                            Showing estimated road route from {fromCity}.
                        </p>
                    )}
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
            <HeritageFacts />
        </div>
    );
}
