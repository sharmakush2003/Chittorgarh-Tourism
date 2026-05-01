"use client";
import Image from 'next/image';
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { 
    Hospital, 
    ShieldAlert, 
    Accessibility, 
    Pill, 
    Phone, 
    Info, 
    Globe, 
    MapPin,
    ArrowRight,
    Download,
    MessageSquare,
    Navigation,
    Train,
    Bus,
    Plane
} from "lucide-react";

const FROM_CITY_KEY = "user-location";

const DISTANCES = [
    { city: "Udaipur", km: 115, drive: "~2 hrs", train: "~2.5 hrs", keywords: ["udaipur"] },
    { city: "Jaipur", km: 320, drive: "~5 hrs", train: "~5 hrs", keywords: ["jaipur"] },
    { city: "Delhi", km: 660, drive: "~10 hrs", train: "~9 hrs", keywords: ["delhi", "new delhi"] },
    { city: "Mumbai", km: 950, drive: "~14 hrs", train: "~15 hrs", keywords: ["mumbai", "bombay"] },
    { city: "Ahmedabad", km: 350, drive: "~5.5 hrs", train: "~6 hrs", keywords: ["ahmedabad"] },
    { city: "Kota", km: 165, drive: "~3 hrs", train: "~3 hrs", keywords: ["kota"] },
    { city: "Bhopal", km: 471, drive: "~7.5 hrs", train: "~8 hrs", keywords: ["bhopal"] },
    { city: "Pune", km: 950, drive: "~15 hrs", train: "~16 hrs", keywords: ["pune"] },
    { city: "Hyderabad", km: 1250, drive: "~20 hrs", train: "~22 hrs", keywords: ["hyderabad"] },
    { city: "Bangalore", km: 1650, drive: "~28 hrs", train: "~30 hrs", keywords: ["bangalore", "bengaluru"] },
    { city: "Chennai", km: 1850, drive: "~32 hrs", train: "~34 hrs", keywords: ["chennai"] },
    { city: "Kolkata", km: 1650, drive: "~30 hrs", train: "~32 hrs", keywords: ["kolkata", "calcutta"] },
];

const POPULAR_CITIES = ["Delhi", "Jaipur", "Udaipur", "Mumbai", "Ahmedabad", "Kota", "Bhopal", "Pune", "Hyderabad", "Bangalore", "Chennai", "Kolkata"];
const LOCAL_KEYWORDS = ["chanderiya", "chittorgarh", "senthi", "bapawar", "obri", "segwa", "kumbha nagar", "pratap nagar"];

const TRANSPORT = [
    {
        _key: "train",
        icon: "/railway_station.jpg",
        mode: "By Train",
        Icon: Train,
        bookUrl: "https://www.irctc.co.in/nget/train-search",
        badge: "htr.badge.popular"
    },
    {
        _key: "air",
        icon: "/airport.jpg",
        mode: "By Air",
        Icon: Plane,
        bookUrl: "https://www.google.com/search?q=flight+booking+sites",
        badge: null
    },
    {
        _key: "bus",
        icon: "/bus.jpg",
        mode: "By Bus",
        Icon: Bus,
        bookUrl: "https://rsrtconline.rajasthan.gov.in/",
        badge: null
    },
    {
        _key: "local",
        icon: "/nh.jpg",
        mode: "Local Transport",
        Icon: Navigation,
        bookUrl: "https://www.google.com/maps/dir/?api=1&destination=Chittorgarh+Fort",
        badge: "htr.badge.internal"
    },
];

function LocationPrompt({ onCityDetected, t }) {
    const [step, setStep] = useState("prompt");
    const [manualInput, setManualInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const reverseGeocode = async (lat, lon) => {
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, { headers: { "Accept-Language": "en" } });
            const data = await res.json();
            return data.address?.city || data.address?.town || data.address?.village || data.address?.state || null;
        } catch { return null; }
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
                const msg = err.code === 1 ? t("htr.errPermission") : t("htr.errLocation");
                setErrorMsg(msg);
                setStep("manual");
            },
            { timeout: 10000 }
        );
    };

    const handleManualConfirm = () => {
        if (!manualInput.trim()) return;
        localStorage.setItem(FROM_CITY_KEY, manualInput.trim());
        onCityDetected(manualInput.trim());
    };

    return (
        <div className="v-loc-overlay">
            <div className="v-loc-card glass-premium">
                <div className="v-loc-icon">📍</div>
                {step === "prompt" && (
                    <>
                        <h3 className="v-loc-title">{t("htr.locPromptTitle")}</h3>
                        <p className="v-loc-desc">{t("htr.locPromptSub")}</p>
                        <div className="v-loc-actions">
                            <button className="v-btn-gold" onClick={handleGPS}>
                                <Globe size={18} /> {t("htr.detectLoc")}
                            </button>
                            <button className="v-btn-outline" onClick={() => setStep("manual")}>
                                <MapPin size={18} /> {t("htr.enterCity")}
                            </button>
                        </div>
                        <button className="v-loc-skip" onClick={() => onCityDetected(null)}>{t("htr.skip")}</button>
                    </>
                )}
                {step === "loading" && (
                    <div className="v-loc-loading">
                        <div className="spinner"></div>
                        <p>{t("htr.detecting")}</p>
                        <p className="v-small-note">{t("htr.allowAccess")}</p>
                    </div>
                )}
                {step === "manual" && (
                    <>
                        <h3 className="v-loc-title">{t("htr.enterDepCity")}</h3>
                        {errorMsg && <p className="v-error-text">{errorMsg}</p>}
                        <div className="v-manual-row">
                            <input
                                type="text"
                                className="v-loc-input"
                                placeholder={t("htr.cityPlaceholder")}
                                value={manualInput}
                                onChange={(e) => setManualInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleManualConfirm()}
                                autoFocus
                            />
                            <button className="v-btn-gold" onClick={handleManualConfirm} disabled={!manualInput.trim()}>
                                {t("htr.confirm")}
                            </button>
                        </div>
                        <div className="v-popular-chips">
                            {POPULAR_CITIES.map(c => (
                                <button key={c} className="v-chip" onClick={() => { localStorage.setItem(FROM_CITY_KEY, c); onCityDetected(c); }}>{c}</button>
                            ))}
                        </div>
                        <button className="v-loc-skip" onClick={() => onCityDetected(null)}>{t("htr.skip")}</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default function VisitorInfoClient() {
    const { t } = useLanguage();
    const router = useRouter();
    const [fromCity, setFromCity] = useState(null);
    const [cityMatch, setCityMatch] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [sosState, setSosState] = useState("idle");
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [currentDate, setCurrentDate] = useState("");
    const pdfTemplateRef = useRef(null);

    const onCityDetected = (city) => {
        if (city) {
            applyCity(city);
        } else {
            setFromCity(null);
            setCityMatch(null);
        }
        setShowPrompt(false);
    };

    const applyCity = (city) => {
        if (!city) return;
        setFromCity(city);
        const lower = city.toLowerCase();
        const match = DISTANCES.find((d) => d.keywords.some((k) => lower.includes(k)));
        const isLocal = LOCAL_KEYWORDS.some(k => lower.includes(k));
        setCityMatch(match || { city, km: null, local: isLocal });
    };

    const handleChangeCity = () => {
        localStorage.removeItem(FROM_CITY_KEY);
        setFromCity(null);
        setCityMatch(null);
        setShowPrompt(true);
    };

    useEffect(() => {
        const saved = localStorage.getItem(FROM_CITY_KEY);
        if (saved) applyCity(saved);
        else setShowPrompt(true);
        setCurrentDate(new Date().toLocaleDateString());
    }, []);

    const sendSOS = async (mode) => {
        if (sosState === "locating") return;
        setSosState("locating");

        const getCoords = () => new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej, { timeout: 8000 });
        });

        try {
            const pos = await getCoords();
            const { latitude, longitude } = pos.coords;
            const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
            const timestamp = new Date().toLocaleString();
            
            // USE TRANSLATED MESSAGE WITH PLACEHOLDERS
            let msg = t('emg.sos.msg') || "EMERGENCY SOS - I need help!";
            msg = msg.replace('{mapsUrl}', mapLink)
                     .replace('{lat}', latitude.toFixed(6))
                     .replace('{lng}', longitude.toFixed(6))
                     .replace('{timestamp}', timestamp);

            if (mode === 'whatsapp') {
                window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
            } else {
                window.location.href = `sms:?body=${encodeURIComponent(msg)}`;
            }
            setSosState("sent");
            setTimeout(() => setSosState("idle"), 5000);
        } catch (err) {
            alert(t('emg.sos.error') || "Location access failed.");
            setSosState("idle");
        }
    };

    const emergencyGroups = [
        { id: "police", category: t('emg.group.police'), icon: <ShieldAlert />, color: "#f87171", contacts: [{ name: t('emg.contact.pcr'), num: "01472-240088", note: t('emg.note.247') }, { name: t('emg.contact.policeHelpline'), num: "112", note: t('emg.note.emergency') }] },
        { id: "medical", category: t('emg.group.medical'), icon: <Hospital />, color: "#f87171", contacts: [{ name: t('emg.contact.ambulanceErs'), num: "108", note: t('emg.note.emergency') }, { name: t('emg.contact.birla'), num: "09530388881", note: t('emg.note.247') }] },
        { id: "tourist", category: t('emg.group.helpline'), icon: <Info />, color: "#D4AF37", contacts: [{ name: t('emg.contact.trc'), num: "01472-241089", note: t('emg.note.reception') }] },
    ];

    const downloadPDF = async () => {
        setIsGeneratingPDF(true);
        try {
            const { default: html2canvas } = await import("html2canvas");
            const { jsPDF } = await import("jspdf");

            const element = pdfTemplateRef.current;
            element.style.display = "block";

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false,
            });

            element.style.display = "none";
            
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("Chittorgarh-Emergency-Guide.pdf");
        } catch (err) {
            console.error("PDF generation failed:", err);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    return (
        <div className="v-hub-wrapper">
            <style jsx global>{`
                :root {
                    --accent-gold: #D4AF37;
                    --accent-red: #FF4D4D;
                    --bg-dark: #0A0A0A;
                    --glass-bg: rgba(20, 20, 20, 0.85);
                    --glass-border: rgba(255, 255, 255, 0.1);
                    --ff-display: 'Playfair Display', serif;
                    --ff-body: 'Inter', sans-serif;
                }

                .v-hub-wrapper {
                    background: var(--bg-dark);
                    color: #fff;
                    font-family: var(--ff-body);
                    min-height: 100vh;
                    animation: fadeIn 0.8s ease-out forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .v-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                /* HERO SECTION */
                .v-hero {
                    position: relative;
                    min-height: 90vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    background: url('/fort_night.jpg') no-repeat center center/cover;
                }

                .v-hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 100%);
                    z-index: 1;
                }

                .v-hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 800px;
                    padding-top: 140px; /* INCREASED TO AVOID OVERLAP */
                }

                .v-hero-eyebrow {
                    display: block;
                    font-size: 0.85rem;
                    letter-spacing: 0.4rem;
                    text-transform: uppercase;
                    color: var(--accent-gold);
                    margin-bottom: 1.5rem;
                    font-weight: 700;
                }

                .v-hero-title {
                    font-family: var(--ff-display);
                    font-size: clamp(2.5rem, 8vw, 4.5rem);
                    line-height: 1.2;
                    margin-bottom: 1.5rem;
                    color: #fff;
                }

                .v-hero-desc {
                    font-size: clamp(1rem, 3vw, 1.2rem);
                    opacity: 0.8;
                    line-height: 1.6;
                    margin-bottom: 3rem;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                }

                /* LOCATION PILL */
                .v-loc-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    padding: 0.8rem 1.5rem;
                    border-radius: 100px;
                    color: var(--accent-gold);
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.3s;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                }

                .v-loc-pill:hover {
                    background: rgba(212, 175, 55, 0.2);
                    transform: translateY(-2px);
                }

                /* PROMPT OVERLAY */
                .v-loc-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.92);
                    backdrop-filter: blur(25px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.5rem;
                }

                .v-loc-card {
                    background: #151515;
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 32px;
                    padding: 4rem 2rem;
                    max-width: 450px;
                    width: 100%;
                    text-align: center;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                .v-loc-icon {
                    font-size: 3.5rem;
                    margin-bottom: 1.5rem;
                }

                .v-loc-title {
                    font-family: var(--ff-display);
                    font-size: 2.2rem;
                    color: var(--accent-gold);
                    margin-bottom: 1rem;
                }

                .v-loc-desc {
                    opacity: 0.7;
                    margin-bottom: 2.5rem;
                    line-height: 1.6;
                    font-size: 1rem;
                }

                .v-loc-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .v-manual-row {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 2rem;
                }

                .v-loc-input {
                    flex: 1;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    padding: 1rem;
                    color: #fff;
                    font-size: 1rem;
                    width: 100%;
                }

                .v-loc-input:focus {
                    outline: none;
                    border-color: var(--accent-gold);
                }

                .v-popular-chips {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                    justify-content: center;
                    margin-bottom: 2rem;
                }

                .v-chip {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.8);
                    padding: 0.5rem 1.2rem;
                    border-radius: 50px;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: 0.3s;
                }

                .v-chip:hover {
                    border-color: var(--accent-gold);
                    color: var(--accent-gold);
                    background: rgba(212, 175, 55, 0.1);
                }

                .v-hero-info-stack {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.25rem;
                }

                .v-smart-note {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.4);
                    background: rgba(212, 175, 55, 0.05);
                    padding: 0.4rem 1rem;
                    border-radius: 50px;
                    border: 1px solid rgba(212, 175, 55, 0.1);
                    letter-spacing: 0.5px;
                }

                .v-map-section {
                    padding-top: 0;
                    margin-top: -2rem; /* PULL UP */
                }

                .v-map-card {
                    background: #111;
                    border: 1px solid var(--glass-border);
                    border-radius: 32px;
                    padding: 2.5rem;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.8);
                    transition: 0.3s;
                }

                .v-map-card:hover {
                    border-color: rgba(212, 175, 55, 0.3);
                }

                .v-map-header {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-bottom: 2.5rem;
                    text-align: left;
                }

                .v-map-icon {
                    width: 60px;
                    height: 60px;
                    background: rgba(212, 175, 55, 0.1);
                    color: var(--accent-gold);
                    border-radius: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgba(212, 175, 55, 0.2);
                }

                .v-map-text {
                    display: flex;
                    flex-direction: column;
                }

                .v-map-eyebrow {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: var(--accent-gold);
                    margin-bottom: 0.25rem;
                    font-weight: 700;
                }

                .v-map-title {
                    font-family: var(--ff-display);
                    font-size: 2rem;
                    color: #fff;
                }

                .v-map-iframe-wrapper {
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.6);
                    border: 1px solid rgba(255,255,255,0.05);
                }

                /* GRID SYSTEM */
                .v-section {
                    padding: 6rem 0;
                }

                .v-section-header {
                    margin-bottom: 4.5rem;
                    text-align: center;
                }

                .v-sec-title {
                    font-family: var(--ff-display);
                    font-size: 2.8rem;
                    color: var(--accent-gold);
                    margin-bottom: 1rem;
                }

                .v-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 3rem;
                    justify-items: center; /* CENTER CARDS */
                }

                .v-card {
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    border-radius: 28px;
                    overflow: hidden;
                    backdrop-filter: blur(15px);
                    transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    max-width: 400px; /* PREVENT OVERSTRETCH */
                    margin: 0 auto;
                }

                .v-card:hover {
                    transform: translateY(-10px);
                    border-color: rgba(212, 175, 55, 0.5);
                    box-shadow: 0 30px 60px rgba(0,0,0,0.6);
                }

                .v-card-img {
                    height: 240px;
                    position: relative;
                }

                .v-card-content {
                    padding: 2.5rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    text-align: center; /* CENTER TEXT */
                }

                .v-card-title {
                    font-size: 1.8rem;
                    font-family: var(--ff-display);
                    margin-bottom: 1.25rem;
                    color: #fff;
                }

                .v-btn-gold {
                    background: var(--accent-gold);
                    color: #000;
                    padding: 1.1rem 1.8rem;
                    border-radius: 14px;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    text-decoration: none;
                    transition: 0.3s;
                    border: none;
                    cursor: pointer;
                    font-size: 1rem;
                }

                .v-btn-outline {
                    background: transparent;
                    color: var(--accent-gold);
                    border: 1px solid rgba(212, 175, 55, 0.5);
                    padding: 1.1rem 1.8rem;
                    border-radius: 14px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    transition: 0.3s;
                    cursor: pointer;
                }

                .v-btn-outline:hover {
                    background: rgba(212, 175, 55, 0.1);
                    border-color: var(--accent-gold);
                }

                /* SOS CARDS */
                .v-sos-card {
                    padding: 4rem 2.5rem !important;
                    text-align: center;
                    border-color: rgba(255, 77, 77, 0.3) !important;
                }

                .v-sos-icon {
                    width: 90px;
                    height: 90px;
                    background: rgba(255, 77, 77, 0.1);
                    color: var(--accent-red);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 2.5rem;
                    border: 1px solid rgba(255, 77, 77, 0.2);
                }

                .v-btn-sos {
                    background: var(--accent-red);
                    color: #fff;
                    padding: 1.25rem;
                    border-radius: 16px;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    width: 100%;
                    border: none;
                    cursor: pointer;
                    font-size: 1.1rem;
                }

                /* MOBILE */
                @media (max-width: 768px) {
                    .v-hero { min-height: 80vh; }
                    .v-hero-content { padding-top: 140px; }
                    .v-grid { gap: 2.5rem; padding: 0 1rem; grid-template-columns: 1fr; }
                    .v-section-header { margin-bottom: 3.5rem; }
                    .v-sec-title { font-size: 2.4rem; }
                    .v-loc-card { padding: 3rem 1.5rem; }
                }
            `}</style>

            {showPrompt && <LocationPrompt onCityDetected={onCityDetected} t={t} />}

            {/* HERO */}
            <header className="v-hero">
                <div className="v-hero-overlay"></div>
                <div className="v-hero-content v-container">
                    <span className="v-hero-eyebrow">{t("htr.eyebrow")}</span>
                    <h1 className="v-hero-title">{t("visitor.hub.title")}</h1>
                    <p className="v-hero-desc">{t("visitor.hub.sub")}</p>
                    
                    {fromCity && (
                        <div className="v-hero-info-stack">
                            <div className="v-loc-pill" onClick={handleChangeCity}>
                                <MapPin size={18} />
                                {cityMatch?.local ? t("htr.welcomeLocal").replace("{city}", fromCity) : t("htr.travellingFrom").replace("{city}", fromCity)}
                                {cityMatch?.km && <span> · {cityMatch.km} km</span>}
                            </div>
                            <div className="v-smart-note">
                                <Info size={14} />
                                <span>{t("map.note")}</span>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* DYNAMIC ROUTE MAP */}
            {fromCity && !cityMatch?.local && (
                <section className="v-section v-map-section">
                    <div className="v-container">
                        <div className="v-map-card glass-premium">
                            <div className="v-map-header">
                                <div className="v-map-icon"><Navigation size={24} /></div>
                                <div className="v-map-text">
                                    <span className="v-map-eyebrow">{t("map.eyebrow")}</span>
                                    <h3 className="v-map-title">{t("map.title").replace("{city}", fromCity)}</h3>
                                </div>
                            </div>
                            <div className="v-map-iframe-wrapper">
                                <iframe
                                    width="100%"
                                    height="480"
                                    frameBorder="0"
                                    style={{ border: 0, borderRadius: '20px' }}
                                    src={`https://www.google.com/maps?q=from+${encodeURIComponent(fromCity)}+to+Chittorgarh+Fort&output=embed`}
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* TRANSPORTATION */}
            <section className="v-section">
                <div className="v-container">
                    <div className="v-section-header">
                        <h2 className="v-sec-title">{t("htr.chooseRoute")}</h2>
                    </div>

                    <div className="v-grid">
                        {TRANSPORT.map((item) => (
                            <div className="v-card" key={item._key}>
                                <div className="v-card-img">
                                    <Image src={item.icon} alt={item.mode} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div className="v-card-content">
                                    <h3 className="v-card-title">{t(`htr.head.${item._key}`)}</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                                        {[0,1,2].map(i => (
                                            <div key={i} style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                                                {t(`htr.detail.${item._key}.${i}`)}
                                            </div>
                                        ))}
                                    </div>
                                    <a href={item.bookUrl} target="_blank" rel="noopener noreferrer" className="v-btn-gold">
                                        {t(`htr.btn.${item._key}`)} <ArrowRight size={18} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EMERGENCY SECTION */}
            <section className="v-section emg-bg">
                <div className="v-container">
                    <div className="v-section-header">
                        <span className="v-hero-eyebrow" style={{ color: 'var(--accent-red)' }}>{t("emg.hub.eyebrow")}</span>
                        <h2 className="v-sec-title" style={{ color: '#fff' }}>{t("emg.hub.title")}</h2>
                    </div>

                    <div className="emg-grid">
                        {/* SOS SHARING CARD */}
                        <div className="emg-card sos-highlight">
                            <div className="emg-icon-box"><ShieldAlert size={32} /></div>
                            <h3>{t("emg.sos.title")}</h3>
                            <p>{t("emg.sos.sub")}</p>
                            <div className="sos-btns">
                                <button className="v-btn-sos" onClick={() => sendSOS('whatsapp')} disabled={sosState === "locating"}>
                                    <MessageSquare size={18} /> {sosState === "locating" ? t("emg.sos.locating") : "WhatsApp"}
                                </button>
                                <button className="v-btn-outline emg-btn-red" onClick={() => sendSOS('sms')} disabled={sosState === "locating"}>
                                    <Phone size={18} /> SMS
                                </button>
                            </div>
                        </div>

                        {/* POLICE */}
                        <div className="emg-card">
                            <div className="emg-icon-box" style={{ color: '#f87171' }}><ShieldAlert size={28} /></div>
                            <h3>{t("emg.group.police")}</h3>
                            <div className="emg-contact-list">
                                <div className="emg-item">
                                    <div className="emg-label">{t("emg.contact.pcr")} <small>{t("emg.note.247")}</small></div>
                                    <a href="tel:01472240088" className="emg-val">01472-240088</a>
                                </div>
                                <div className="emg-item">
                                    <div className="emg-label">{t("emg.contact.policeHelpline")} <small>{t("emg.note.emergency")}</small></div>
                                    <a href="tel:112" className="emg-val">112</a>
                                </div>
                            </div>
                        </div>

                        {/* MEDICAL */}
                        <div className="emg-card">
                            <div className="emg-icon-box" style={{ color: '#f87171' }}><Hospital size={28} /></div>
                            <h3>{t("emg.group.medical")}</h3>
                            <div className="emg-contact-list">
                                <div className="emg-item">
                                    <div className="emg-label">{t("emg.contact.ambulanceErs")} <small>{t("emg.note.emergency")}</small></div>
                                    <a href="tel:108" className="emg-val">108</a>
                                </div>
                                <div className="emg-item">
                                    <div className="emg-label">{t("emg.contact.birla")} <small>{t("emg.note.247")}</small></div>
                                    <a href="tel:09530388881" className="emg-val">09530388881</a>
                                </div>
                            </div>
                        </div>

                        {/* TOURIST */}
                        <div className="emg-card">
                            <div className="emg-icon-box" style={{ color: 'var(--accent-gold)' }}><Info size={28} /></div>
                            <h3>{t("emg.group.helpline")}</h3>
                            <div className="emg-contact-list">
                                <div className="emg-item">
                                    <div className="emg-label">{t("emg.contact.trc")} <small>{t("emg.note.reception")}</small></div>
                                    <a href="tel:01472241089" className="emg-val">01472-241089</a>
                                </div>
                                <button className="v-btn-gold emg-dl-btn" onClick={downloadPDF}>
                                    <Download size={16} /> {t("emg.pdf.btn")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .emg-bg { background: #050505; }
                .emg-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem;
                }
                .emg-card {
                    background: #111;
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 24px;
                    padding: 2rem;
                    text-align: center;
                    transition: 0.3s;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden; /* PREVENT OVERFLOW */
                    width: 100%;
                }
                .emg-card:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-5px); }
                .sos-highlight { border: 1px solid rgba(255, 77, 77, 0.2); background: rgba(255, 77, 77, 0.02); }
                .emg-icon-box { margin-bottom: 1.25rem; display: flex; justify-content: center; color: var(--accent-red); }
                .emg-card h3 { font-family: var(--ff-display); font-size: 1.5rem; margin-bottom: 1.5rem; color: #fff; letter-spacing: 1px; }
                .emg-card p { font-size: 0.85rem; opacity: 0.6; margin-bottom: 1.5rem; line-height: 1.5; }
                
                .sos-btns { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); 
                    gap: 0.75rem; 
                    margin-top: auto; 
                    width: 100%;
                }
                
                @media (max-width: 360px) {
                    .sos-btns { grid-template-columns: 1fr; }
                    .emg-card { padding: 1.5rem; }
                }
                .emg-contact-list { display: flex; flex-direction: column; gap: 1.25rem; margin-top: auto; }
                .emg-item { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 0.75rem; }
                .emg-label { text-align: left; font-weight: 600; font-size: 0.9rem; color: rgba(255,255,255,0.8); }
                .emg-label small { display: block; font-size: 0.7rem; opacity: 0.4; font-weight: 400; text-transform: uppercase; }
                .emg-val { color: var(--accent-gold); font-weight: 800; font-size: 1rem; text-decoration: none; padding-left: 10px; }
                .emg-btn-red { border-color: var(--accent-red); color: var(--accent-red); }
                .emg-dl-btn { width: 100%; margin-top: 1.5rem; font-size: 0.85rem; padding: 0.75rem; }
            `}</style>

            {/* HIDDEN PDF TEMPLATE */}
            <div ref={pdfTemplateRef} style={{ display: "none", position: "fixed", left: "-9999px", top: 0, width: "800px", background: "#fff", color: "#000", padding: "40px" }}>
                <div style={{ textAlign: "center", marginBottom: "30px", borderBottom: "2px solid #D4AF37", paddingBottom: "20px" }}>
                    <h1 style={{ color: "#D4AF37", margin: 0 }}>CHITTORGARH TOURISM</h1>
                </div>
                {emergencyGroups.map(group => (
                    <div key={group.id} style={{ marginBottom: "25px" }}>
                        <h2 style={{ color: group.color, borderBottom: "1px solid #eee", paddingBottom: "5px" }}>{group.category}</h2>
                        {group.contacts.map(contact => (
                            <div key={contact.num} style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                                <div><strong>{contact.name}</strong><br/><span style={{ fontSize: "12px", color: "#666" }}>{contact.note}</span></div>
                                <div style={{ fontSize: "18px", fontWeight: "bold" }}>{contact.num}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
