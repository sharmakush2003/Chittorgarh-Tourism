"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import HeritageFacts from "@/components/HeritageFacts";
import { useLanguage } from "@/context/LanguageContext";

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
        _key: "train",
        icon: "/railway_station.jpg",
        mode: "By Train",
        badge: "htr.badge.popular",
        bookUrl: "https://www.irctc.co.in/nget/train-search",
    },
    {
        _key: "air",
        icon: "/airport.jpg",
        mode: "By Air",
        badge: null,
        bookUrl: "https://www.makemytrip.com/flights/",
    },
    {
        _key: "bus",
        icon: "/bus.jpg",
        mode: "By Bus",
        badge: null,
        bookUrl: "https://rsrtconline.rajasthan.gov.in/",
    },
    {
        _key: "local",
        icon: "/nh.jpg",
        mode: "Local Transport",
        badge: "htr.badge.internal",
        bookUrl: "https://www.google.com/maps/dir/?api=1&destination=Chittorgarh+Fort,+Chittorgarh,+Rajasthan",
    },
];

// ── Location Prompt Overlay ──────────────────────────────────────────
function LocationPrompt({ onCityDetected }) {
    const { t } = useLanguage();
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
            setErrorMsg(t("htr.errNoGPS"));
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
                    setErrorMsg(t("htr.errGPSFail"));
                    setStep("manual");
                }
            },
            (err) => {
                const msg =
                    err.code === 1
                        ? t("htr.errPermission")
                        : t("htr.errLocation");
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
                        <h3 className="htr-location-title">{t("htr.locPromptTitle")}</h3>
                        <p className="htr-location-sub">
                            {t("htr.locPromptSub")}
                        </p>
                        <div className="htr-location-actions">
                            <button className="htr-loc-btn-primary" onClick={handleGPS}>
                                <span>📡</span> {t("htr.detectLoc")}
                            </button>
                            <button className="htr-loc-btn-secondary" onClick={() => { setStep("manual"); setTimeout(() => inputRef.current?.focus(), 100); }}>
                                ✏️ {t("htr.enterCity")}
                            </button>
                        </div>
                        <button className="htr-loc-skip" onClick={handleSkip}>{t("htr.skip")}</button>
                    </>
                )}

                {step === "loading" && (
                    <>
                        <h3 className="htr-location-title">{t("htr.detecting")}</h3>
                        <p className="htr-location-sub">{t("htr.allowAccess")}</p>
                        <div className="htr-loc-spinner" />
                    </>
                )}

                {step === "manual" && (
                    <>
                        <h3 className="htr-location-title">{t("htr.enterDepCity")}</h3>
                        {errorMsg && <p className="htr-loc-error">{errorMsg}</p>}
                        <div className="htr-loc-input-row">
                            <input
                                ref={inputRef}
                                type="text"
                                className="htr-loc-input"
                                placeholder={t("htr.cityPlaceholder")}
                                value={manualInput}
                                onChange={(e) => setManualInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleManualConfirm()}
                            />
                            <button
                                className="htr-loc-btn-primary"
                                onClick={handleManualConfirm}
                                disabled={!manualInput.trim()}
                            >
                                {t("htr.confirm")} →
                            </button>
                        </div>
                        <div className="htr-popular-row">
                            {POPULAR_CITIES.map((c) => (
                                <button key={c} className="htr-popular-chip" onClick={() => handlePopularCity(c)}>
                                    {c}
                                </button>
                            ))}
                        </div>
                        <button className="htr-loc-skip" onClick={handleSkip}>{t("htr.skip")}</button>
                    </>
                )}
            </div>
        </div>
    );
}

// ── Main Page ────────────────────────────────────────────────────────
export default function HowToReachPage() {
    const { t } = useLanguage();
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
                <span className="htr-eyebrow">{t("htr.eyebrow")}</span>
                <h1 className="htr-hero-title">
                    {t("htr.hero.title1")}
                    <em>{t("htr.hero.title2")}</em>
                </h1>
                <p className="htr-hero-sub">
                    {t("htr.hero.sub")}
                </p>
                <div className="htr-divider" />

                {cityMatch?.local ? (
                    <div className="htr-detected-pill-wrap">
                        <span className="htr-detected-pill">
                            📍 {t("htr.welcomeLocal").replace("{city}", fromCity)}
                        </span>
                        <button className="htr-change-city" onClick={handleChangeCity}>
                            {t("htr.changePoint")} ✎
                        </button>
                    </div>
                ) : cityMatch ? (
                    <div className="htr-detected-pill-wrap">
                        <span className="htr-detected-pill">
                            📍 {t("htr.from")}: {fromCity} ~{cityMatch.km} km &nbsp;·&nbsp; {t("htr.drive")} {cityMatch.drive} &nbsp;·&nbsp; {t("htr.train")} {cityMatch.train}
                        </span>
                        <button className="htr-change-city" onClick={handleChangeCity}>
                            {t("htr.changeCity")} ✎
                        </button>
                    </div>
                ) : fromCity ? (
                    <div className="htr-detected-pill-wrap">
                        <span className="htr-detected-pill">
                            📍 {t("htr.travellingFrom").replace("{city}", fromCity)}
                        </span>
                        <button className="htr-change-city" onClick={handleChangeCity}>
                            {t("htr.changeCity")} ✎
                        </button>
                    </div>
                ) : null}
            </div>

            {/* ── TRANSPORT CARDS ── */}
            <section className="htr-section">
                <div className="container">
                    <div className="htr-section-header">
                        <span className="htr-section-eyebrow">{t("htr.ways")}</span>
                        <h2 className="htr-section-title">
                            {cityMatch?.local ? t("htr.localGuide") : t("htr.chooseRoute")}
                        </h2>
                    </div>
                    <div className="htr-transport-grid">
                        {TRANSPORT.map((item) => {
                            // If local, prioritize the Local Transport card
                            const isLocalTransport = item.mode === "Local Transport";
                            const showCardAtTop = cityMatch?.local && isLocalTransport;

                            return (
                                <div className={`htr-card ${showCardAtTop ? "htr-card-featured" : ""}`} key={item.mode}>
                                    {item.badge && <span className="htr-badge">{t(item.badge)}</span>}
                                    <img src={item.icon} alt={t(`htr.mode.${item._key}`)} className="htr-card-img" />
                                    <div className="htr-card-body">
                                        <div className="htr-card-mode">{t(`htr.mode.${item._key}`)}</div>
                                        <h3 className="htr-card-heading">{t(`htr.head.${item._key}`)}</h3>
                                        <p className="htr-card-desc">{t(`htr.desc.${item._key}`)}</p>
                                        <ul className="htr-card-details">
                                            {[0, 1, 2].map((i) => (
                                                <li key={i}>
                                                    <span className="htr-bullet">✦</span>{t(`htr.detail.${item._key}.${i}`)}
                                                </li>
                                            ))}
                                        </ul>
                                        <a
                                            href={item.bookUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="htr-book-btn"
                                        >
                                            {t(`htr.btn.${item._key}`)} →
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
                        <span className="htr-section-eyebrow">{t("htr.distRef")}</span>
                        <h2 className="htr-section-title">{t("htr.fromMajor")}</h2>
                    </div>
                    <div className="htr-table-wrap">
                        <table className="htr-table">
                            <thead>
                                <tr>
                                    <th>{t("htr.tblCity")}</th>
                                    <th>{t("htr.tblDist")}</th>
                                    <th>{t("htr.tblRoad")}</th>
                                    <th>{t("htr.tblTrain")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DISTANCES.map((d) => {
                                    const isHighlight = fromCity && d.keywords.some(k => fromCity.toLowerCase().includes(k));
                                    return (
                                        <tr key={d.city} className={isHighlight ? "htr-row-highlight" : ""}>
                                            <td>
                                                {t(`htr.city.${d.city}`)}
                                                {isHighlight && <span className="htr-you-tag">← {t("htr.you")}</span>}
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
                        <span className="htr-section-eyebrow">{t("htr.location")}</span>
                        <h2 className="htr-section-title">
                            {fromCity ? t("htr.routeFrom").replace("{city}", fromCity) : t("htr.findUs")}
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
                    {t("htr.cta.title")}
                </h2>
                <p className="htr-cta-sub">
                    {t("htr.cta.sub")}
                </p>
                <button className="btn-gold htr-cta-btn" onClick={handleStartExploring}>
                    {t("htr.cta.btn")}
                </button>
                <p className="htr-cta-note">{t("htr.cta.note")}</p>
            </div>
            <HeritageFacts />
        </div>
    );
}
