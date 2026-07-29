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
    Plane,
    Sparkles,
    CheckCircle2
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

const POPULAR_CITIES = ["Delhi", "Jaipur", "Udaipur", "Mumbai", "Ahmedabad", "Kota", "Bhopal", "Pune", "Hyderabad", "Bangalore"];
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
        <div className="visitor-page">
            {/* ═══ FIXED BACKGROUND ══════════════════════ */}
            <div className="fixed-bg"></div>
            <div className="bg-overlay"></div>

            <style jsx global>{`
                .visitor-page {
                    position: relative;
                    min-height: 100vh;
                    background: transparent;
                    color: #FFFFFF;
                    font-family: var(--ff-body), sans-serif;
                }

                .fixed-bg {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: url('/hero_bg.png') no-repeat center center / cover;
                    z-index: 0;
                    pointer-events: none;
                }

                .bg-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: linear-gradient(to bottom, 
                        rgba(15, 10, 6, 0.35) 0%, 
                        rgba(15, 10, 6, 0.25) 40%,
                        rgba(15, 10, 6, 0.65) 100%
                    );
                    z-index: 1;
                    pointer-events: none;
                }

                .main-content {
                    position: relative;
                    z-index: 10;
                    padding-top: 155px;
                    padding-bottom: 5rem;
                }

                .v-container {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 0 1.25rem;
                }

                /* HEADER SECTION */
                .header-section {
                    text-align: center;
                    margin-bottom: 2.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .royal-badge-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.7rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #F5E6AB;
                    padding: 0.4rem 1.1rem;
                    background: rgba(15, 10, 6, 0.85);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(212, 175, 55, 0.45);
                    border-radius: 999px;
                    margin-bottom: 1rem;
                    font-weight: 700;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                }

                .sparkle-gold {
                    color: #D4AF37;
                }

                .title-hero-royal {
                    font-size: clamp(2.2rem, 5vw, 3.8rem);
                    font-family: var(--ff-display), serif;
                    font-weight: 800;
                    margin-bottom: 0.6rem;
                    background: linear-gradient(135deg, #FFFFFF 0%, #F5E6AB 50%, #D4AF37 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    line-height: 1.15;
                    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.9));
                }

                .subtitle-hero-royal {
                    max-width: 640px;
                    margin: 0 auto 1.5rem;
                    color: #FFFFFF;
                    font-size: 0.98rem;
                    line-height: 1.6;
                    font-weight: 400;
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95);
                }

                /* LOCATION PILL */
                .v-loc-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: rgba(15, 10, 6, 0.85);
                    border: 1px solid rgba(212, 175, 55, 0.45);
                    padding: 0.65rem 1.4rem;
                    border-radius: 999px;
                    color: #F5E6AB;
                    font-weight: 700;
                    font-size: 0.88rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                }

                .v-loc-pill:hover {
                    background: rgba(212, 175, 55, 0.2);
                    border-color: #D4AF37;
                    transform: translateY(-2px);
                }

                /* PROMPT OVERLAY */
                .v-loc-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.88);
                    backdrop-filter: blur(20px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.5rem;
                }

                .v-loc-card {
                    background: rgba(20, 15, 10, 0.95);
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    border-radius: 28px;
                    padding: 3rem 2rem;
                    max-width: 480px;
                    width: 100%;
                    text-align: center;
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
                }

                .v-loc-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }

                .v-loc-title {
                    font-family: var(--ff-display), serif;
                    font-size: 1.8rem;
                    color: #FFF;
                    margin-bottom: 0.8rem;
                    font-weight: 800;
                }

                .v-loc-desc {
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: 2rem;
                    line-height: 1.6;
                    font-size: 0.92rem;
                }

                .v-loc-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 0.85rem;
                }

                .v-btn-gold {
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
                    color: #0A0806;
                    padding: 0.85rem 1.6rem;
                    border-radius: 12px;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    border: none;
                    cursor: pointer;
                    font-size: 0.88rem;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.35);
                }

                .v-btn-gold:hover {
                    background: #FFF;
                    color: #0A0806;
                    transform: translateY(-2px);
                }

                .v-btn-outline {
                    background: rgba(255, 255, 255, 0.05);
                    color: #F3E5AB;
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    padding: 0.85rem 1.6rem;
                    border-radius: 12px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    font-size: 0.88rem;
                }

                .v-btn-outline:hover {
                    background: rgba(212, 175, 55, 0.2);
                    border-color: #D4AF37;
                    color: #FFF;
                }

                .v-loc-skip {
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.8rem;
                    cursor: pointer;
                    margin-top: 1.25rem;
                }

                .v-loc-input {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    border-radius: 10px;
                    padding: 0.75rem 1rem;
                    color: #FFF;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                }

                .v-popular-chips {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    justify-content: center;
                    margin: 1rem 0 1.5rem;
                }

                .v-chip {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(212, 175, 55, 0.25);
                    color: #F3E5AB;
                    padding: 0.4rem 0.9rem;
                    border-radius: 999px;
                    font-size: 0.78rem;
                    cursor: pointer;
                    transition: all 0.25s ease;
                }

                .v-chip:hover {
                    background: rgba(212, 175, 55, 0.2);
                    border-color: #D4AF37;
                    color: #FFF;
                }

                /* DYNAMIC MAP SECTION */
                .v-map-section {
                    margin-top: 2rem;
                    margin-bottom: 3.5rem;
                }

                .v-map-card {
                    background: rgba(20, 15, 10, 0.88);
                    border: 1px solid rgba(212, 175, 55, 0.38);
                    border-radius: 24px;
                    padding: 2rem;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.65);
                }

                .v-map-header {
                    display: flex;
                    align-items: center;
                    gap: 1.2rem;
                    margin-bottom: 1.75rem;
                }

                .v-map-icon {
                    width: 52px;
                    height: 52px;
                    background: rgba(212, 175, 55, 0.15);
                    color: #D4AF37;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    flex-shrink: 0;
                }

                .v-map-eyebrow {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 0.14em;
                    color: #D4AF37;
                    font-weight: 700;
                    display: block;
                    margin-bottom: 0.2rem;
                }

                .v-map-title {
                    font-family: var(--ff-display), serif;
                    font-size: 1.6rem;
                    color: #FFF;
                    font-weight: 800;
                }

                .v-map-iframe-wrapper {
                    border-radius: 16px;
                    overflow: hidden;
                    border: 1px solid rgba(212, 175, 55, 0.25);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }

                /* SECTION HEADERS */
                .v-section-header {
                    text-align: center;
                    margin-bottom: 2.5rem;
                }

                .v-sec-title {
                    font-family: var(--ff-display), serif;
                    font-size: clamp(1.8rem, 4vw, 2.5rem);
                    font-weight: 800;
                    color: #FFFFFF;
                    line-height: 1.2;
                }

                /* TRANSPORT CARDS GRID */
                .v-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 1.75rem;
                    margin-bottom: 4rem;
                }

                .v-card {
                    background: rgba(20, 15, 10, 0.88);
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    border-radius: 20px;
                    overflow: hidden;
                    backdrop-filter: blur(15px);
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 12px 35px rgba(0,0,0,0.5);
                }

                .v-card:hover {
                    transform: translateY(-5px);
                    border-color: rgba(212, 175, 55, 0.7);
                    box-shadow: 0 20px 45px rgba(0,0,0,0.7);
                }

                .v-card-img {
                    height: 180px;
                    position: relative;
                }

                .v-card-content {
                    padding: 1.75rem 1.5rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .v-card-title {
                    font-size: 1.35rem;
                    font-family: var(--ff-display), serif;
                    margin-bottom: 1rem;
                    color: #FFF;
                    font-weight: 800;
                }

                .v-detail-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                    margin-bottom: 1.5rem;
                    flex: 1;
                }

                .v-detail-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.45rem;
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.85);
                    line-height: 1.45;
                }

                /* EMERGENCY SECTION */
                .emg-section {
                    margin-top: 2rem;
                }

                .emg-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 1.5rem;
                }

                .emg-card {
                    background: rgba(20, 15, 10, 0.88);
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    border-radius: 20px;
                    padding: 1.75rem 1.5rem;
                    backdrop-filter: blur(15px);
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 12px 35px rgba(0,0,0,0.5);
                }

                .emg-card:hover {
                    border-color: rgba(212, 175, 55, 0.6);
                    transform: translateY(-3px);
                }

                .sos-card-red {
                    border-color: rgba(248, 113, 113, 0.45);
                    background: rgba(30, 15, 15, 0.88);
                }

                .emg-icon-box {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    background: rgba(212, 175, 55, 0.15);
                    color: #D4AF37;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
                }

                .sos-card-red .emg-icon-box {
                    background: rgba(248, 113, 113, 0.15);
                    color: #f87171;
                }

                .emg-card h3 {
                    font-family: var(--ff-display), serif;
                    font-size: 1.3rem;
                    font-weight: 800;
                    color: #FFF;
                    margin-bottom: 0.6rem;
                }

                .emg-card p {
                    font-size: 0.84rem;
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: 1.5rem;
                    line-height: 1.5;
                }

                .sos-btns {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.6rem;
                    margin-top: auto;
                }

                .v-btn-sos {
                    background: #dc2626;
                    color: #FFF;
                    padding: 0.75rem;
                    border-radius: 10px;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.4rem;
                    border: none;
                    cursor: pointer;
                    font-size: 0.82rem;
                    text-transform: uppercase;
                }

                .emg-contact-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: auto;
                }

                .emg-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    padding-bottom: 0.6rem;
                }

                .emg-label {
                    text-align: left;
                    font-weight: 600;
                    font-size: 0.84rem;
                    color: rgba(255,255,255,0.85);
                }

                .emg-label small {
                    display: block;
                    font-size: 0.68rem;
                    color: rgba(212, 175, 55, 0.8);
                    font-weight: 400;
                    text-transform: uppercase;
                }

                .emg-val {
                    color: #D4AF37;
                    font-weight: 800;
                    font-size: 0.92rem;
                    text-decoration: none;
                }

                /* RESPONSIVE MOBILE FIXES */
                @media (max-width: 640px) {
                    .main-content {
                        padding-top: 85px;
                    }
                    .v-map-card {
                        padding: 1.25rem;
                    }
                    .v-map-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.6rem;
                    }
                    .sos-btns {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

            {showPrompt && <LocationPrompt onCityDetected={onCityDetected} t={t} />}

            <main className="main-content">
                <div className="v-container">
                    {/* ═══ HERO HEADER ═══════════════════════════ */}
                    <header className="header-section">
                        <div className="royal-badge-pill">
                            <Sparkles size={13} className="sparkle-gold" />
                            <span>{t("htr.eyebrow")}</span>
                        </div>
                        <h1 className="title-hero-royal">
                            {t("visitor.hub.title")}
                        </h1>
                        <p className="subtitle-hero-royal">
                            {t("visitor.hub.sub")}
                        </p>

                        {fromCity && (
                            <div className="v-loc-pill" onClick={handleChangeCity}>
                                <MapPin size={16} />
                                <span>
                                    {cityMatch?.local 
                                        ? t("htr.welcomeLocal").replace("{city}", fromCity) 
                                        : t("htr.travellingFrom").replace("{city}", fromCity)}
                                    {cityMatch?.km && ` · ${cityMatch.km} km`}
                                </span>
                            </div>
                        )}
                    </header>

                    {/* ═══ DYNAMIC ROUTE MAP ═════════════════════ */}
                    {fromCity && !cityMatch?.local && (
                        <section className="v-map-section">
                            <div className="v-map-card">
                                <div className="v-map-header">
                                    <div className="v-map-icon">
                                        <Navigation size={22} />
                                    </div>
                                    <div>
                                        <span className="v-map-eyebrow">{t("map.eyebrow")}</span>
                                        <h3 className="v-map-title">{t("map.title").replace("{city}", fromCity)}</h3>
                                    </div>
                                </div>
                                <div className="v-map-iframe-wrapper">
                                    <iframe
                                        width="100%"
                                        height="380"
                                        frameBorder="0"
                                        style={{ border: 0, display: 'block' }}
                                        src={`https://www.google.com/maps?q=from+${encodeURIComponent(fromCity)}+to+Chittorgarh+Fort&output=embed`}
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ═══ TRANSPORTATION MODES ═════════════════ */}
                    <section className="v-section">
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
                                        <div className="v-detail-list">
                                            {[0, 1, 2].map(i => (
                                                <div key={i} className="v-detail-item">
                                                    <CheckCircle2 size={14} style={{ color: '#D4AF37', flexShrink: 0, marginTop: '2px' }} />
                                                    <span>{t(`htr.detail.${item._key}.${i}`)}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <a href={item.bookUrl} target="_blank" rel="noopener noreferrer" className="v-btn-gold">
                                            <span>{t(`htr.btn.${item._key}`)}</span>
                                            <ArrowRight size={16} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ═══ EMERGENCY & HELPLINES ════════════════ */}
                    <section className="emg-section">
                        <div className="v-section-header">
                            <span className="royal-badge-pill" style={{ color: '#f87171', borderColor: 'rgba(248,113,113,0.4)' }}>
                                <ShieldAlert size={13} />
                                <span>{t("emg.hub.eyebrow")}</span>
                            </span>
                            <h2 className="v-sec-title">{t("emg.hub.title")}</h2>
                        </div>

                        <div className="emg-grid">
                            {/* SOS LOCATION BROADCAST CARD */}
                            <div className="emg-card sos-card-red">
                                <div className="emg-icon-box">
                                    <ShieldAlert size={26} />
                                </div>
                                <h3>{t("emg.sos.title")}</h3>
                                <p>{t("emg.sos.sub")}</p>
                                <div className="sos-btns">
                                    <button className="v-btn-sos" onClick={() => sendSOS('whatsapp')} disabled={sosState === "locating"}>
                                        <MessageSquare size={16} />
                                        <span>{sosState === "locating" ? t("emg.sos.locating") : "WhatsApp"}</span>
                                    </button>
                                    <button className="v-btn-outline" style={{ borderColor: '#f87171', color: '#f87171' }} onClick={() => sendSOS('sms')} disabled={sosState === "locating"}>
                                        <Phone size={16} />
                                        <span>SMS</span>
                                    </button>
                                </div>
                            </div>

                            {/* POLICE */}
                            <div className="emg-card">
                                <div className="emg-icon-box">
                                    <ShieldAlert size={24} />
                                </div>
                                <h3>{t("emg.group.police")}</h3>
                                <div className="emg-contact-list">
                                    <div className="emg-item">
                                        <div className="emg-label">
                                            {t("emg.contact.pcr")}
                                            <small>{t("emg.note.247")}</small>
                                        </div>
                                        <a href="tel:01472240088" className="emg-val">01472-240088</a>
                                    </div>
                                    <div className="emg-item">
                                        <div className="emg-label">
                                            {t("emg.contact.policeHelpline")}
                                            <small>{t("emg.note.emergency")}</small>
                                        </div>
                                        <a href="tel:112" className="emg-val">112</a>
                                    </div>
                                </div>
                            </div>

                            {/* MEDICAL */}
                            <div className="emg-card">
                                <div className="emg-icon-box">
                                    <Hospital size={24} />
                                </div>
                                <h3>{t("emg.group.medical")}</h3>
                                <div className="emg-contact-list">
                                    <div className="emg-item">
                                        <div className="emg-label">
                                            {t("emg.contact.ambulanceErs")}
                                            <small>{t("emg.note.emergency")}</small>
                                        </div>
                                        <a href="tel:108" className="emg-val">108</a>
                                    </div>
                                    <div className="emg-item">
                                        <div className="emg-label">
                                            {t("emg.contact.birla")}
                                            <small>{t("emg.note.247")}</small>
                                        </div>
                                        <a href="tel:09530388881" className="emg-val">09530388881</a>
                                    </div>
                                </div>
                            </div>

                            {/* TOURIST HELPLINE & PDF */}
                            <div className="emg-card">
                                <div className="emg-icon-box">
                                    <Info size={24} />
                                </div>
                                <h3>{t("emg.group.helpline")}</h3>
                                <div className="emg-contact-list">
                                    <div className="emg-item">
                                        <div className="emg-label">
                                            {t("emg.contact.trc")}
                                            <small>{t("emg.note.reception")}</small>
                                        </div>
                                        <a href="tel:01472241089" className="emg-val">01472-241089</a>
                                    </div>
                                    <button className="v-btn-gold" style={{ marginTop: '0.8rem' }} onClick={downloadPDF} disabled={isGeneratingPDF}>
                                        <Download size={16} />
                                        <span>{isGeneratingPDF ? "Generating PDF..." : t("emg.pdf.btn")}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

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
