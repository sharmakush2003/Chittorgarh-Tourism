"use client";
import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function EmergencyPage() {
    const { t } = useLanguage();
    const [locState, setLocState] = useState("idle");
    const [sosState, setSosState] = useState("idle");
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [coords, setCoords] = useState(null);
    const pdfTemplateRef = useRef(null);

    const mapsSearch = (query, lat, lng) =>
        `https://www.google.com/maps/search/${query}/@${lat},${lng},15z`;

    const CATEGORIES = [
        { type: "hospital", label: `🏥 ${t('emg.cat.hospital')}`, query: "hospital" },
        { type: "police",   label: `🚔 ${t('emg.cat.police')}`, query: "police+station" },
        { type: "toilet",   label: `🚻 ${t('emg.cat.toilet')}`, query: "public+toilet" },
        { type: "pharmacy", label: `💊 ${t('emg.cat.pharmacy')}`, query: "pharmacy" },
    ];

    const emergencyData = [
        {
            category: t('emg.group.police'),
            icon: "🚔",
            accent: "#60a5fa",
            border: "rgba(59,130,246,0.2)",
            glow: "rgba(59,130,246,0.06)",
            contacts: [
                { name: t('emg.contact.pcr'), number: "01472-240088", note: t('emg.note.247') },
                { name: t('emg.contact.policeHelpline'), number: "100", note: t('emg.note.emergency') },
                { name: t('emg.contact.cyber'), number: "1930", note: t('emg.note.helpline') },
            ]
        },
        {
            category: t('emg.group.medical'),
            icon: "🏥",
            accent: "#f87171",
            border: "rgba(239,68,68,0.2)",
            glow: "rgba(239,68,68,0.06)",
            contacts: [
                { name: t('emg.contact.ambulanceErs'), number: "108", note: t('emg.note.emergency') },
                { name: t('emg.contact.ambulanceTransport'), number: "102", note: t('emg.note.medical') },
                { name: t('emg.contact.birla'), number: "09530388881", note: t('emg.note.247') },
            ]
        },
        {
            category: t('emg.group.helpline'),
            icon: "📞",
            accent: "#D4AF37",
            border: "rgba(212,175,55,0.2)",
            glow: "rgba(212,175,55,0.06)",
            contacts: [
                { name: t('emg.contact.rajHelpline'), number: "181", note: t('emg.note.govt') },
                { name: t('emg.contact.trc'), number: "01472-241089", note: t('emg.note.reception') },
                { name: t('emg.contact.guides'), link: "https://www.tourism.rajasthan.gov.in/content/dam/rajasthan-tourism/english/pdf/Guides-list-and-travel-agency/TRC-Chittorgarh-Guide-List.pdf", note: t('emg.note.pdf') },
            ]
        },
        {
            category: t('emg.group.services'),
            icon: "🆘",
            accent: "#fb923c",
            border: "rgba(249,115,22,0.2)",
            glow: "rgba(249,115,22,0.06)",
            contacts: [
                { name: t('emg.contact.fire'), number: "101", note: t('emg.note.fire') },
                { name: t('emg.contact.women'), number: "181", note: t('emg.note.assist') },
                { name: t('emg.contact.child'), number: "1098", note: t('emg.note.child') },
                { name: t('emg.contact.disaster'), number: "0141-2227296", note: t('emg.note.state') },
            ]
        }
    ];

    const downloadPDF = async () => {
        setIsGeneratingPDF(true);
        try {
            const { default: html2canvas } = await import("html2canvas");
            const { jsPDF } = await import("jspdf");

            // Temporary show template for capture
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

    const findNearby = () => {
        if (!navigator.geolocation) { setLocState("error"); return; }
        setLocState("loading");
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => { setCoords({ lat: coords.latitude, lng: coords.longitude }); setLocState("done"); },
            () => setLocState("error")
        );
    };

    const sendSOS = (method) => {
        if (!navigator.geolocation) { alert("Geolocation not supported"); return; }
        setSosState("locating");
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const { latitude: lat, longitude: lng } = coords;
                const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
                const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                const message = t('emg.sos.msg', {
                    mapsUrl,
                    lat: lat.toFixed(6),
                    lng: lng.toFixed(6),
                    timestamp
                });
                
                if (method === 'whatsapp') {
                    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
                } else {
                    window.location.href = `sms:?body=${encodeURIComponent(message)}`;
                }
                setSosState("sent");
                setTimeout(() => setSosState("idle"), 3000);
            },
            () => { alert("Location access denied. Please enable GPS."); setSosState("idle"); }
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
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    margin-bottom: 24px; gap: 14px; text-align: center;
                }
                .ep-nearby-head h3 {
                    font-family: var(--font-cormorant);
                    font-size: 1.8rem; margin: 0; color: #fff;
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

                /* ─ SOS Section ─ */
                .ep-sos {
                    max-width: 960px;
                    margin: 0 auto 40px;
                    padding: 0 16px;
                }
                .ep-sos-card {
                    background: linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.05) 100%);
                    border: 2px solid rgba(239,68,68,0.3);
                    border-radius: 24px;
                    padding: 32px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                .ep-sos-card::before {
                    content: ""; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
                    background: radial-gradient(circle at center, rgba(239,68,68,0.2) 0%, transparent 70%);
                    opacity: 0.5; pointer-events: none;
                }
                .ep-sos-head h3 {
                    font-family: var(--font-cormorant);
                    font-size: 1.8rem; margin: 0 0 8px; color: #fca5a5;
                }
                .ep-sos-head p {
                    color: #999; font-size: 0.9rem; margin-bottom: 24px;
                }
                .ep-sos-btns {
                    display: flex; flex-direction: column; gap: 12px;
                    max-width: 320px; margin: 0 auto;
                }
                .sos-btn {
                    display: flex; align-items: center; justify-content: center; gap: 10px;
                    padding: 16px; border-radius: 12px; font-weight: 700;
                    font-size: 1rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    border: none;
                }
                .sos-btn.wa {
                    background: #25D366; color: #fff;
                    box-shadow: 0 8px 20px rgba(37, 211, 102, 0.4);
                }
                .sos-btn.sms {
                    background: rgba(255,255,255,0.1); color: #fff;
                    border: 1px solid rgba(255,255,255,0.2);
                }
                .sos-btn:hover:not(:disabled) { transform: translateY(-4px) scale(1.02); filter: brightness(1.1); }
                .sos-btn:active { transform: translateY(0) scale(0.98); }
                .sos-btn:disabled { opacity: 0.6; cursor: not-allowed; }

                .pulse-sos {
                    animation: pulse-sos-glow 2s infinite;
                }
                @keyframes pulse-sos-glow {
                    0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.7); }
                    70% { box-shadow: 0 0 0 15px rgba(239,68,68,0); }
                    100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
                }

                @media (max-width: 680px) {
                    .ep-sos-card { padding: 24px 16px; }
                }
                @media (max-width: 680px) {
                    .ep-nearby-grid { grid-template-columns: 1fr; }
                    .ep-nearby-item { padding: 14px; gap: 14px; }
                    .ep-nearby-icon { width: 44px; height: 44px; font-size: 1.3rem; }
                    .ep-nearby-name { font-size: 0.9rem; }
                }

                /* ─ PDF Handout Styles (Specific for PDF generation) ─ */
                #emergency-pdf-template {
                    width: 794px; /* A4 width at 96 DPI */
                    padding: 40px;
                    background: white;
                    color: #1a1a1a;
                    font-family: Arial, sans-serif;
                    display: none; /* Only visible during capture */
                    position: fixed;
                    left: -9999px;
                    top: 0;
                }
                .pdf-header { border-bottom: 2px solid #D4AF37; padding-bottom: 20px; margin-bottom: 30px; text-align: center; }
                .pdf-header h1 { margin: 0; color: #D4AF37; font-size: 28px; text-transform: uppercase; letter-spacing: 2px; }
                .pdf-header p { margin: 10px 0 0; color: #666; font-size: 14px; }
                .pdf-section { margin-bottom: 25px; }
                .pdf-section-title { font-size: 18px; font-weight: bold; background: #f9f9f9; padding: 8px 12px; border-left: 4px solid #D4AF37; margin-bottom: 12px; }
                .pdf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
                .pdf-contact { padding: 10px; border: 1px solid #eee; border-radius: 6px; }
                .pdf-contact-name { font-weight: bold; font-size: 14px; display: block; margin-bottom: 4px; }
                .pdf-contact-num { color: #D4AF37; font-weight: bold; font-size: 16px; }
                .pdf-footer { border-top: 1px solid #eee; margin-top: 30px; padding-top: 15px; font-size: 11px; text-align: center; color: #888; }

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
                    <span className="ep-dot" /> {t('emg.badge')}
                </div>
                <h1>{t('emg.hero.title1')} <em>{t('emg.hero.title2')}</em><br />{t('emg.hero.title3')}</h1>
                <p>{t('emg.hero.sub')}</p>
                
                <div style={{ marginBottom: '24px' }}>
                    <button 
                        onClick={downloadPDF} 
                        disabled={isGeneratingPDF}
                        style={{
                            background: 'rgba(212,175,55,0.1)',
                            border: '1px solid rgba(212,175,55,0.4)',
                            color: '#D4AF37',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        {isGeneratingPDF ? `📄 ${t('emg.pdf.generating')}` : `📥 ${t('emg.pdf.btn')}`}
                    </button>
                </div>

                <div className="ep-quick">
                    <a href="tel:100" className="ep-dial p">🚔 {t('emg.quick.police')}</a>
                    <a href="tel:108" className="ep-dial a">🚑 {t('emg.quick.ambulance')}</a>
                    <a href="tel:181" className="ep-dial t">📞 {t('emg.quick.tourist')}</a>
                </div>
            </section>

            {/* SOS Location Sharing */}
            <div className="ep-sos">
                <div className="ep-sos-card">
                    <div className="ep-sos-head">
                        <h3>🆘 {t('emg.sos.title')}</h3>
                        <p>{t('emg.sos.sub')}</p>
                    </div>
                    <div className="ep-sos-btns">
                        <button 
                            className={`sos-btn wa ${sosState === "locating" ? "" : "pulse-sos"}`} 
                            onClick={() => sendSOS('whatsapp')}
                            disabled={sosState === "locating"}
                        >
                            {sosState === "locating" ? `📍 ${t('emg.sos.locating')}` : `📲 ${t('emg.sos.whatsapp')}`}
                        </button>
                        <button 
                            className="sos-btn sms" 
                            onClick={() => sendSOS('sms')}
                            disabled={sosState === "locating"}
                        >
                            🆘 {t('emg.sos.sms')}
                        </button>
                    </div>
                    {sosState === "sent" && (
                        <p style={{ color: "#4ade80", marginTop: "16px", fontSize: "0.85rem", fontWeight: "600" }}>
                            ✅ {t('emg.sos.sent')}
                        </p>
                    )}
                </div>
            </div>

            {/* Nearby Places */}
            <div className="ep-nearby">
                <div className="ep-nearby-head">
                    <h3>📍 {t('emg.nearby.title')}</h3>
                    <button className="ep-loc-btn" onClick={findNearby} disabled={locState === "loading"}>
                        {locState === "loading" ? t('emg.nearby.locating') : locState === "done" ? `🔄 ${t('emg.nearby.refresh')}` : `📡 ${t('emg.nearby.btn')}`}
                    </button>
                </div>

                {locState === "idle" && <p className="ep-loc-msg">{t('emg.nearby.idle')}</p>}
                {locState === "error" && <p className="ep-loc-msg" style={{ color: "#f87171" }}>⚠️ {t('emg.nearby.error')}</p>}

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
                                        <span className="ep-nearby-dist">{t('emg.nearby.open')}</span>
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
                                <div className="ep-row" key={c.name}>
                                    <div className="ep-row-top">
                                        <span className="ep-contact-name">{c.name}</span>
                                        <span className="ep-note">{c.note}</span>
                                    </div>
                                    <a
                                        href={c.link || `tel:${c.number}`}
                                        target={c.link ? "_blank" : undefined}
                                        rel={c.link ? "noreferrer" : undefined}
                                        className="ep-call"
                                        style={{
                                            background: `${s.accent}15`,
                                            color: s.accent,
                                            borderColor: `${s.accent}35`,
                                        }}
                                    >
                                        {c.link ? `🌐 ${t('emg.btn.pdf')}` : `📞 ${t('emg.btn.call', { number: c.number })}`}
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
                    <span>❤️</span>
                    <p>
                        <strong>{t('emg.disc.title')}</strong><br/>
                        {t('emg.disc.body')}
                    </p>
                </div>
            </div>

            {/* Hidden PDF Template */}
            <div id="emergency-pdf-template" ref={pdfTemplateRef}>
                <div className="pdf-header">
                    <h1>{t('emg.pdf.header')}</h1>
                    <p>{t('emg.pdf.sub')}</p>
                </div>

                <div className="pdf-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    {emergencyData.map(cat => (
                        <div key={cat.category} className="pdf-section">
                            <div className="pdf-section-title">{cat.icon} {cat.category}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {cat.contacts.map(c => (
                                    <div key={c.name} className="pdf-contact">
                                        <span className="pdf-contact-name">{c.name}</span>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span className="pdf-contact-num">{c.number || "URL Link"}</span>
                                            <span style={{ fontSize: '10px', color: '#888' }}>{c.note}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pdf-footer">
                    <p>{t('emg.pdf.footer1')}</p>
                    <p>{t('emg.pdf.footer2')}</p>
                    <p>{t('emg.pdf.verified')} {new Date().toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
}
