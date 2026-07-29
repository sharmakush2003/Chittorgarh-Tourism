"use client";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
    Hospital, 
    ShieldAlert, 
    Accessibility, 
    Pill, 
    Phone, 
    Info, 
    Globe, 
    AlertCircle, 
    MapPin,
    ArrowLeft,
    Download,
    Share2,
    MessageSquare,
    Clock
} from "lucide-react";

export default function EmergencyPage() {
    const { t } = useLanguage();
    const [locState, setLocState] = useState("idle");
    const [sosState, setSosState] = useState("idle");
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [coords, setCoords] = useState(null);
    const [currentDate, setCurrentDate] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const pdfTemplateRef = useRef(null);

    useEffect(() => {
        setIsMounted(true);
        setCurrentDate(new Date().toLocaleDateString());
    }, []);

    const mapsSearch = (query, lat, lng) =>
        `https://www.google.com/maps/search/${query}/@${lat},${lng},15z`;

    const CATEGORIES = [
        { type: "hospital", label: t('emg.cat.hospital'), query: "hospital", icon: <Hospital size={18} /> },
        { type: "police",   label: t('emg.cat.police'), query: "police+station", icon: <ShieldAlert size={18} /> },
        { type: "toilet",   label: t('emg.cat.toilet'), query: "public+toilet", icon: <Accessibility size={18} /> },
        { type: "pharmacy", label: t('emg.cat.pharmacy'), query: "pharmacy", icon: <Pill size={18} /> },
    ];

    const emergencyData = [
        {
            id: "police",
            category: t('emg.group.police'),
            icon: <ShieldAlert />,
            accent: "#60a5fa",
            border: "rgba(59,130,246,0.2)",
            glow: "rgba(59,130,246,0.06)",
            contacts: [
                { name: t('emg.contact.pcr'), number: "01472-240088", note: t('emg.note.247') },
                { name: t('emg.contact.policeHelpline'), number: "112", note: t('emg.note.emergency') },
                { name: t('emg.contact.cyber'), number: "1930", note: t('emg.note.helpline') },
            ]
        },
        {
            id: "medical",
            category: t('emg.group.medical'),
            icon: <Hospital />,
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
            id: "helpline",
            category: t('emg.group.helpline'),
            icon: <Phone />,
            accent: "#D4AF37",
            border: "rgba(212,175,55,0.2)",
            glow: "rgba(212,175,55,0.06)",
            contacts: [
                { name: t('emg.contact.trc'), number: "01472-241089", note: t('emg.note.reception') },
                { name: t('emg.contact.guides'), link: "https://www.tourism.rajasthan.gov.in/content/dam/rajasthan-tourism/english/pdf/Guides-list-and-travel-agency/TRC-Chittorgarh-Guide-List.pdf", note: t('emg.note.pdf') },
            ]
        },
        {
            id: "services",
            category: t('emg.group.services'),
            icon: <AlertCircle />,
            accent: "#fb923c",
            border: "rgba(249,115,22,0.2)",
            glow: "rgba(249,115,22,0.06)",
            contacts: [
                { name: t('emg.contact.fire'), number: "101", note: t('emg.note.fire') },
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
            {/* ═══ FIXED BACKGROUND ══════════════════════ */}
            <div className="fixed-bg"></div>
            <div className="bg-overlay"></div>
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
                    <a href="tel:112" className="ep-dial p">🚔 {t('emg.quick.police')}</a>
                    <a href="tel:108" className="ep-dial a">🚑 {t('emg.quick.ambulance')}</a>
                </div>
            </section>

            {/* Cards — show FIRST after hero */}
            <div className="ep-grid">
                {emergencyData.map((s) => (
                    <div
                        key={s.id}
                        className="ep-card"
                        style={{ "--card-glow": s.glow, "--card-border": s.border }}
                    >
                        <div className="ep-card-head">
                            <div className="ep-card-icon">{s.icon}</div>
                            <h2 style={{ color: s.accent }}>{s.category}</h2>
                        </div>
                        <div className="ep-contacts">
                            {s.contacts.map((c, i) => (
                                <div className="ep-row" key={i}>
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

            {/* SOS Location Sharing — at bottom */}
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
                        {CATEGORIES.map(c => (
                            <a key={c.type} href={mapsSearch(c.query, coords.lat, coords.lng)} target="_blank" rel="noreferrer" className="ep-nearby-item">
                                <div className="ep-nearby-icon">{c.icon}</div>
                                <div className="ep-nearby-content">
                                    <span className="ep-nearby-name">{c.label}</span>
                                    <span className="ep-nearby-dist">{t('emg.nearby.open')}</span>
                                </div>
                                <div className="ep-nearby-arrow">→</div>
                            </a>
                        ))}
                    </div>
                )}
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
                        <div key={cat.id} className="pdf-section">
                            <div className="pdf-section-title">{cat.icon} {cat.category}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {cat.contacts.map((c, i) => (
                                    <div key={i} className="pdf-contact">
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
                    <p>{t('emg.pdf.verified')} {isMounted ? currentDate : ""}</p>
                </div>
            </div>
        </div>
    );
}
