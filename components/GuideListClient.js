"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
    FileText, 
    Download, 
    ExternalLink, 
    Phone, 
    ShieldCheck, 
    Award, 
    ChevronLeft,
    Sparkles,
    Building2,
    CheckCircle2,
    BookOpen,
    IndianRupee,
    Users,
    Clock
} from "lucide-react";

export default function GuideListClient() {
    const { t, lang } = useLanguage();
    const isHindi = lang === "hi";
    const [isMobile, setIsMobile] = useState(false);

    const guideRates = [
        {
            tourists: "1 - 4",
            touristsLabelEn: "1 – 4 Tourists",
            touristsLabelHi: "1 – 4 पर्यटक",
            stateFull: 1150,
            stateHalf: 800,
            localFull: 1000,
            localHalf: 725,
        },
        {
            tourists: "5 - 15",
            touristsLabelEn: "5 – 15 Tourists",
            touristsLabelHi: "5 – 15 पर्यटक",
            stateFull: 1550,
            stateHalf: 1150,
            localFull: 1300,
            localHalf: 875,
        },
        {
            tourists: "16 - 35",
            touristsLabelEn: "16 – 35 Tourists",
            touristsLabelHi: "16 – 35 पर्यटक",
            stateFull: 2500,
            stateHalf: 1550,
            localFull: 1600,
            localHalf: 1025,
        },
    ];

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className="guide-list-page" style={{
            minHeight: "100vh",
            background: "linear-gradient(180deg, #09090b 0%, #121217 40%, #0a0a0d 100%)",
            color: "#f1f5f9",
            paddingTop: isMobile ? "80px" : "100px",
            paddingBottom: "70px",
            fontFamily: "var(--font-inter, sans-serif)",
            boxSizing: "border-box"
        }}>
            {/* Ambient Gold Radial Background */}
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: "radial-gradient(circle at 50% 12%, rgba(212, 175, 55, 0.12) 0%, transparent 60%)",
                pointerEvents: "none",
                zIndex: 0
            }} />

            <div style={{
                maxWidth: "1000px",
                margin: "0 auto",
                padding: "0 16px",
                position: "relative",
                zIndex: 1
            }}>
                
                {/* Back Link */}
                <div style={{ marginBottom: "20px" }}>
                    <Link href="/" style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "#d4af37",
                        textDecoration: "none",
                        fontSize: "0.88rem",
                        fontWeight: "600",
                        padding: "8px 16px",
                        borderRadius: "30px",
                        background: "rgba(212, 175, 55, 0.1)",
                        border: "1px solid rgba(212, 175, 55, 0.25)",
                        backdropFilter: "blur(8px)"
                    }}>
                        <ChevronLeft size={16} />
                        {isHindi ? "मुख्य पृष्ठ पर लौटें" : "Back to Home"}
                    </Link>
                </div>

                {/* Hero Showcase Card */}
                <div style={{
                    textAlign: "center",
                    marginBottom: "32px",
                    background: "rgba(20, 20, 26, 0.85)",
                    backdropFilter: "blur(16px)",
                    borderRadius: "24px",
                    padding: isMobile ? "28px 18px" : "44px 32px",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.6)"
                }}>
                    {/* Badge */}
                    <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "rgba(212, 175, 55, 0.15)",
                        border: "1px solid rgba(212, 175, 55, 0.4)",
                        color: "#f39c12",
                        padding: "6px 16px",
                        borderRadius: "50px",
                        fontSize: "0.8rem",
                        fontWeight: "700",
                        letterSpacing: "0.5px",
                        marginBottom: "16px"
                    }}>
                        <ShieldCheck size={15} />
                        {isHindi ? "राजस्थान सरकार स्वीकृत निर्देशिका" : "RAJASTHAN GOVT. APPROVED PUBLICATION"}
                    </div>

                    {/* Main Title */}
                    <h1 style={{
                        fontSize: isMobile ? "1.75rem" : "2.8rem",
                        fontWeight: "800",
                        background: "linear-gradient(135deg, #FFFFFF 30%, #D4AF37 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: "14px",
                        lineHeight: "1.25"
                    }}>
                        {isHindi ? "चित्तौड़गढ़ टूरिस्ट गाइड लिस्ट (PDF)" : "Official Tourist Guide List"}
                    </h1>

                    {/* Description */}
                    <p style={{
                        fontSize: isMobile ? "0.95rem" : "1.1rem",
                        color: "#cbd5e1",
                        maxWidth: "760px",
                        margin: "0 auto 28px",
                        lineHeight: "1.6"
                    }}>
                        {isHindi
                            ? "चित्तौड़गढ़ किले एवं आसपास के ऐतिहासिक स्थलों के लिए पर्यटन विभाग, राजस्थान सरकार द्वारा स्वीकृत एवं पंजीकृत टूरिस्ट गाइडों की आधिकारिक सूची। यदि आप प्रामाणिक इतिहास जानना चाहते हैं, तो कृपया आधिकारिक PDF डाउनलोड करके गाइड लिस्ट देखें।"
                            : "Official list of Rajasthan Tourism Department approved tour guides for Chittorgarh Citadel. For authentic 1300-year Mewar history, architecture, and Jauhar sagas, please download or view the official PDF document below."
                        }
                    </p>

                    {/* High-Impact PDF Card Container */}
                    <div style={{
                        background: "rgba(10, 10, 15, 0.8)",
                        borderRadius: "18px",
                        padding: isMobile ? "20px 14px" : "28px 24px",
                        border: "1px solid rgba(212, 175, 55, 0.25)",
                        maxWidth: "650px",
                        margin: "0 auto",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
                    }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "12px",
                            marginBottom: "16px"
                        }}>
                            <div style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "12px",
                                background: "rgba(212, 175, 55, 0.15)",
                                border: "1px solid rgba(212, 175, 55, 0.3)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#d4af37"
                            }}>
                                <FileText size={26} />
                            </div>
                            <div style={{ textAlign: "left" }}>
                                <div style={{ fontSize: isMobile ? "0.95rem" : "1.1rem", fontWeight: "700", color: "#fff" }}>
                                    {t("guide.pdf.title") || "TRC Chittorgarh - Guide List.pdf"}
                                </div>
                                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                                    {t("guide.pdf.desc") || "Official Document • 520 KB • Department of Tourism"}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            gap: "12px",
                            justifyContent: "center"
                        }}>
                            <a
                                href="/Guides List.pdf"
                                download="Chittorgarh-Official-Guide-List.pdf"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    background: "linear-gradient(135deg, #d4af37 0%, #b8860b 100%)",
                                    color: "#000",
                                    fontWeight: "800",
                                    padding: "14px 24px",
                                    borderRadius: "12px",
                                    textDecoration: "none",
                                    fontSize: "0.95rem",
                                    boxShadow: "0 8px 20px rgba(212, 175, 55, 0.3)",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                <Download size={18} />
                                {isHindi ? "गाइड लिस्ट PDF डाउनलोड करें" : "Download Guide List (PDF)"}
                            </a>

                            <a
                                href="/Guides List.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    background: "rgba(255, 255, 255, 0.08)",
                                    color: "#fff",
                                    fontWeight: "600",
                                    padding: "14px 24px",
                                    borderRadius: "12px",
                                    textDecoration: "none",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    fontSize: "0.95rem"
                                }}
                            >
                                <ExternalLink size={18} />
                                {isHindi ? "PDF नए टैब में खोलें" : "Open PDF in New Tab"}
                            </a>
                        </div>
                    </div>

                    {/* Authorised Guide Rate List Showcase Box */}
                    <div id="guide-rate-list" style={{
                        marginTop: "28px",
                        background: "radial-gradient(120% 120% at 50% 0%, rgba(28, 26, 20, 0.95) 0%, rgba(13, 13, 18, 0.98) 100%)",
                        borderRadius: "20px",
                        padding: isMobile ? "16px 12px" : "28px 28px",
                        border: "1px solid rgba(212, 175, 55, 0.4)",
                        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 175, 55, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                        textAlign: "left",
                        position: "relative",
                        overflow: "hidden"
                    }}>
                        {/* Decorative Top Accent Glow */}
                        <div style={{
                            position: "absolute",
                            top: 0,
                            left: "15%",
                            right: "15%",
                            height: "2px",
                            background: "linear-gradient(90deg, transparent, #d4af37, #fef08a, #d4af37, transparent)",
                            boxShadow: "0 0 12px #d4af37"
                        }} />

                        {/* Rate List Header */}
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: isMobile ? "flex-start" : "center",
                            flexDirection: isMobile ? "column" : "row",
                            gap: "10px",
                            marginBottom: "18px",
                            paddingBottom: "14px",
                            borderBottom: "1px solid rgba(212, 175, 55, 0.2)"
                        }}>
                            <div>
                                <div style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    background: "linear-gradient(90deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)",
                                    border: "1px solid rgba(212, 175, 55, 0.45)",
                                    color: "#fbbf24",
                                    padding: "4px 12px",
                                    borderRadius: "50px",
                                    fontSize: "0.72rem",
                                    fontWeight: "800",
                                    letterSpacing: "0.6px",
                                    textTransform: "uppercase",
                                    marginBottom: "8px",
                                    boxShadow: "0 2px 8px rgba(212, 175, 55, 0.15)"
                                }}>
                                    <IndianRupee size={12} />
                                    {isHindi ? "राजस्थान सरकार अधिकृत शुल्क" : "Official Govt. Tariff"}
                                </div>

                                <h2 style={{
                                    fontSize: isMobile ? "1.25rem" : "1.65rem",
                                    fontWeight: "800",
                                    background: "linear-gradient(135deg, #ffffff 40%, #fde047 80%, #d4af37 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    margin: 0,
                                    letterSpacing: "-0.01em"
                                }}>
                                    {isHindi ? "अधिकृत टूरिस्ट गाइड दर सूची" : "Authorised Guide Rate List"}
                                </h2>

                                <p style={{
                                    color: "#94a3b8",
                                    fontSize: isMobile ? "0.78rem" : "0.86rem",
                                    margin: "4px 0 0 0",
                                    lineHeight: 1.4
                                }}>
                                    {isHindi
                                        ? "पर्यटन विभाग, राजस्थान सरकार द्वारा स्वीकृत आधिकारिक मानक दरें"
                                        : "Prescribed standard tariff by Department of Tourism, Govt. of Rajasthan"
                                    }
                                </p>
                            </div>

                            <div style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                fontSize: "0.72rem",
                                padding: "5px 12px",
                                borderRadius: "20px",
                                background: "rgba(212, 175, 55, 0.08)",
                                border: "1px solid rgba(212, 175, 55, 0.25)",
                                color: "#f8fafc",
                                fontWeight: "700"
                            }}>
                                <Sparkles size={12} style={{ color: "#d4af37" }} />
                                <span>{isHindi ? "सभी दरें INR (₹) में" : "All Rates in INR (₹)"}</span>
                            </div>
                        </div>

                        {/* MOBILE VIEW: Ultra-Attractive, Modern Tier Cards (Zero Broken Words, Rich Gradients) */}
                        {isMobile ? (
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px"
                            }}>
                                {guideRates.map((item) => (
                                    <div
                                        key={item.tourists}
                                        style={{
                                            background: "linear-gradient(180deg, rgba(25, 25, 34, 0.7) 0%, rgba(15, 15, 20, 0.8) 100%)",
                                            borderRadius: "14px",
                                            border: "1px solid rgba(212, 175, 55, 0.25)",
                                            padding: "12px",
                                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.35)",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "10px"
                                        }}
                                    >
                                        {/* Slab Badge Header */}
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            paddingBottom: "8px",
                                            borderBottom: "1px solid rgba(255, 255, 255, 0.07)"
                                        }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <div style={{
                                                    width: "28px",
                                                    height: "28px",
                                                    borderRadius: "8px",
                                                    background: "linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.1) 100%)",
                                                    border: "1px solid rgba(212, 175, 55, 0.4)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "#fbbf24"
                                                }}>
                                                    <Users size={14} />
                                                </div>
                                                <span style={{ fontSize: "0.98rem", fontWeight: "800", color: "#ffffff" }}>
                                                    {item.tourists} {isHindi ? "पर्यटक" : "Tourists"}
                                                </span>
                                            </div>
                                            <span style={{
                                                fontSize: "0.68rem",
                                                fontWeight: "700",
                                                padding: "2px 8px",
                                                borderRadius: "12px",
                                                background: "rgba(255, 255, 255, 0.06)",
                                                border: "1px solid rgba(255, 255, 255, 0.12)",
                                                color: "#cbd5e1"
                                            }}>
                                                {isHindi ? "समूह स्लैब" : "Group Slab"}
                                            </span>
                                        </div>

                                        {/* Tier 1: State Level Guide */}
                                        <div style={{
                                            background: "linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(25, 22, 15, 0.6) 100%)",
                                            borderRadius: "10px",
                                            border: "1px solid rgba(212, 175, 55, 0.35)",
                                            padding: "9px 11px"
                                        }}>
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                marginBottom: "8px"
                                            }}>
                                                <span style={{
                                                    fontSize: "0.78rem",
                                                    fontWeight: "800",
                                                    color: "#fbbf24",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "5px",
                                                    letterSpacing: "0.2px"
                                                }}>
                                                    ⭐ {isHindi ? "राज्य स्तरीय गाइड" : "State Level Guide"}
                                                </span>
                                                <span style={{ fontSize: "0.65rem", color: "#d4af37", fontWeight: "600" }}>
                                                    {isHindi ? "State Level" : "Apex Tier"}
                                                </span>
                                            </div>

                                            <div style={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr 1fr",
                                                gap: "8px"
                                            }}>
                                                {/* Full Day */}
                                                <div style={{
                                                    background: "rgba(0, 0, 0, 0.45)",
                                                    borderRadius: "8px",
                                                    padding: "8px 6px",
                                                    border: "1px solid rgba(212, 175, 55, 0.22)",
                                                    textAlign: "center",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    minHeight: "60px"
                                                }}>
                                                    <div style={{
                                                        fontSize: "0.72rem",
                                                        color: "#94a3b8",
                                                        fontWeight: "700",
                                                        whiteSpace: "nowrap",
                                                        height: "18px",
                                                        lineHeight: "18px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        marginBottom: "3px"
                                                    }}>
                                                        {isHindi ? "पूरा दिन (8h)" : "Full Day (8h)"}
                                                    </div>
                                                    <div style={{
                                                        fontSize: "1.08rem",
                                                        fontWeight: "900",
                                                        color: "#fef08a",
                                                        height: "24px",
                                                        lineHeight: "24px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        whiteSpace: "nowrap"
                                                    }}>
                                                        ₹{item.stateFull.toLocaleString("en-IN")}
                                                    </div>
                                                </div>

                                                {/* Half Day */}
                                                <div style={{
                                                    background: "rgba(0, 0, 0, 0.45)",
                                                    borderRadius: "8px",
                                                    padding: "8px 6px",
                                                    border: "1px solid rgba(212, 175, 55, 0.22)",
                                                    textAlign: "center",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    minHeight: "60px"
                                                }}>
                                                    <div style={{
                                                        fontSize: "0.72rem",
                                                        color: "#94a3b8",
                                                        fontWeight: "700",
                                                        whiteSpace: "nowrap",
                                                        height: "18px",
                                                        lineHeight: "18px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        marginBottom: "3px"
                                                    }}>
                                                        {isHindi ? "आधा दिन (4h)" : "Half Day (4h)"}
                                                    </div>
                                                    <div style={{
                                                        fontSize: "1.08rem",
                                                        fontWeight: "900",
                                                        color: "#fde047",
                                                        height: "24px",
                                                        lineHeight: "24px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        whiteSpace: "nowrap"
                                                    }}>
                                                        ₹{item.stateHalf.toLocaleString("en-IN")}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tier 2: Local Level Guide */}
                                        <div style={{
                                            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(15, 23, 30, 0.6) 100%)",
                                            borderRadius: "10px",
                                            border: "1px solid rgba(56, 189, 248, 0.3)",
                                            padding: "9px 11px"
                                        }}>
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                marginBottom: "8px"
                                            }}>
                                                <span style={{
                                                    fontSize: "0.78rem",
                                                    fontWeight: "800",
                                                    color: "#38bdf8",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "5px",
                                                    letterSpacing: "0.2px"
                                                }}>
                                                    🏛️ {isHindi ? "स्थानीय गाइड" : "Local Level Guide"}
                                                </span>
                                                <span style={{ fontSize: "0.65rem", color: "#7dd3fc", fontWeight: "600" }}>
                                                    {isHindi ? "Local Level" : "Citadel Expert"}
                                                </span>
                                            </div>

                                            <div style={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr 1fr",
                                                gap: "8px"
                                            }}>
                                                {/* Full Day */}
                                                <div style={{
                                                    background: "rgba(0, 0, 0, 0.45)",
                                                    borderRadius: "8px",
                                                    padding: "8px 6px",
                                                    border: "1px solid rgba(56, 189, 248, 0.22)",
                                                    textAlign: "center",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    minHeight: "60px"
                                                }}>
                                                    <div style={{
                                                        fontSize: "0.72rem",
                                                        color: "#94a3b8",
                                                        fontWeight: "700",
                                                        whiteSpace: "nowrap",
                                                        height: "18px",
                                                        lineHeight: "18px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        marginBottom: "3px"
                                                    }}>
                                                        {isHindi ? "पूरा दिन (8h)" : "Full Day (8h)"}
                                                    </div>
                                                    <div style={{
                                                        fontSize: "1.08rem",
                                                        fontWeight: "900",
                                                        color: "#bae6fd",
                                                        height: "24px",
                                                        lineHeight: "24px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        whiteSpace: "nowrap"
                                                    }}>
                                                        ₹{item.localFull.toLocaleString("en-IN")}
                                                    </div>
                                                </div>

                                                {/* Half Day */}
                                                <div style={{
                                                    background: "rgba(0, 0, 0, 0.45)",
                                                    borderRadius: "8px",
                                                    padding: "8px 6px",
                                                    border: "1px solid rgba(56, 189, 248, 0.22)",
                                                    textAlign: "center",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    minHeight: "60px"
                                                }}>
                                                    <div style={{
                                                        fontSize: "0.72rem",
                                                        color: "#94a3b8",
                                                        fontWeight: "700",
                                                        whiteSpace: "nowrap",
                                                        height: "18px",
                                                        lineHeight: "18px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        marginBottom: "3px"
                                                    }}>
                                                        {isHindi ? "आधा दिन (4h)" : "Half Day (4h)"}
                                                    </div>
                                                    <div style={{
                                                        fontSize: "1.08rem",
                                                        fontWeight: "900",
                                                        color: "#7dd3fc",
                                                        height: "24px",
                                                        lineHeight: "24px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        whiteSpace: "nowrap"
                                                    }}>
                                                        ₹{item.localHalf.toLocaleString("en-IN")}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* DESKTOP VIEW: Luxury Official Tariff Table */
                            <div style={{
                                overflowX: "auto",
                                borderRadius: "14px",
                                border: "1px solid rgba(212, 175, 55, 0.3)",
                                background: "rgba(0, 0, 0, 0.5)",
                                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)"
                            }}>
                                <table style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    textAlign: "center",
                                    fontSize: "0.92rem"
                                }}>
                                    <thead>
                                        {/* Row 1 Header */}
                                        <tr style={{ background: "rgba(212, 175, 55, 0.15)", borderBottom: "1px solid rgba(212, 175, 55, 0.3)" }}>
                                            <th rowSpan={2} style={{
                                                padding: "16px 18px",
                                                fontWeight: "800",
                                                color: "#ffffff",
                                                textAlign: "left",
                                                borderRight: "1px solid rgba(212, 175, 55, 0.25)",
                                                width: "25%"
                                            }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                    <Users size={16} style={{ color: "#d4af37" }} />
                                                    <span>{isHindi ? "पर्यटकों की संख्या" : "No. of Tourist"}</span>
                                                </div>
                                            </th>
                                            <th colSpan={2} style={{
                                                padding: "12px 16px",
                                                fontWeight: "800",
                                                color: "#fbbf24",
                                                borderRight: "1px solid rgba(212, 175, 55, 0.25)",
                                                fontSize: "0.98rem",
                                                letterSpacing: "0.3px"
                                            }}>
                                                ⭐ {isHindi ? "राज्य स्तरीय गाइड (State Level)" : "State Level Guide"}
                                            </th>
                                            <th colSpan={2} style={{
                                                padding: "12px 16px",
                                                fontWeight: "800",
                                                color: "#38bdf8",
                                                fontSize: "0.98rem",
                                                letterSpacing: "0.3px"
                                            }}>
                                                🏛️ {isHindi ? "स्थानीय गाइड (Local Level)" : "Local Level Guide"}
                                            </th>
                                        </tr>
                                        {/* Row 2 Sub-Headers */}
                                        <tr style={{ background: "rgba(255, 255, 255, 0.04)", borderBottom: "1px solid rgba(212, 175, 55, 0.2)" }}>
                                            <th style={{ padding: "10px 12px", color: "#cbd5e1", fontWeight: "700", fontSize: "0.82rem", borderRight: "1px solid rgba(255, 255, 255, 0.08)" }}>
                                                {isHindi ? "पूरा दिन (8h)" : "Full Day (8h)"}
                                            </th>
                                            <th style={{ padding: "10px 12px", color: "#cbd5e1", fontWeight: "700", fontSize: "0.82rem", borderRight: "1px solid rgba(212, 175, 55, 0.25)" }}>
                                                {isHindi ? "आधा दिन (4h)" : "Half Day (4h)"}
                                            </th>
                                            <th style={{ padding: "10px 12px", color: "#cbd5e1", fontWeight: "700", fontSize: "0.82rem", borderRight: "1px solid rgba(255, 255, 255, 0.08)" }}>
                                                {isHindi ? "पूरा दिन (8h)" : "Full Day (8h)"}
                                            </th>
                                            <th style={{ padding: "10px 12px", color: "#cbd5e1", fontWeight: "700", fontSize: "0.82rem" }}>
                                                {isHindi ? "आधा दिन (4h)" : "Half Day (4h)"}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {guideRates.map((row, idx) => (
                                            <tr 
                                                key={row.tourists}
                                                style={{
                                                    background: idx % 2 === 0 ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.05)",
                                                    borderBottom: idx < guideRates.length - 1 ? "1px solid rgba(255, 255, 255, 0.07)" : "none"
                                                }}
                                            >
                                                <td style={{
                                                    padding: "16px 18px",
                                                    textAlign: "left",
                                                    fontWeight: "800",
                                                    color: "#ffffff",
                                                    borderRight: "1px solid rgba(212, 175, 55, 0.25)"
                                                }}>
                                                    <span style={{
                                                        display: "inline-block",
                                                        background: "linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.08) 100%)",
                                                        padding: "5px 12px",
                                                        borderRadius: "8px",
                                                        border: "1px solid rgba(212, 175, 55, 0.35)",
                                                        color: "#ffffff",
                                                        fontWeight: "800"
                                                    }}>
                                                        {row.tourists}
                                                    </span>
                                                    <span style={{ fontSize: "0.8rem", color: "#94a3b8", marginLeft: "8px", fontWeight: "600" }}>
                                                        {isHindi ? "पर्यटक" : "Tourists"}
                                                    </span>
                                                </td>
                                                {/* State - Full */}
                                                <td style={{
                                                    padding: "16px 12px",
                                                    fontWeight: "800",
                                                    color: "#fef08a",
                                                    borderRight: "1px solid rgba(255, 255, 255, 0.08)",
                                                    fontSize: "1.1rem"
                                                }}>
                                                    ₹{row.stateFull.toLocaleString("en-IN")}
                                                </td>
                                                {/* State - Half */}
                                                <td style={{
                                                    padding: "16px 12px",
                                                    fontWeight: "800",
                                                    color: "#fde047",
                                                    borderRight: "1px solid rgba(212, 175, 55, 0.25)",
                                                    fontSize: "1.05rem"
                                                }}>
                                                    ₹{row.stateHalf.toLocaleString("en-IN")}
                                                </td>
                                                {/* Local - Full */}
                                                <td style={{
                                                    padding: "16px 12px",
                                                    fontWeight: "800",
                                                    color: "#bae6fd",
                                                    borderRight: "1px solid rgba(255, 255, 255, 0.08)",
                                                    fontSize: "1.1rem"
                                                }}>
                                                    ₹{row.localFull.toLocaleString("en-IN")}
                                                </td>
                                                {/* Local - Half */}
                                                <td style={{
                                                    padding: "16px 12px",
                                                    fontWeight: "800",
                                                    color: "#7dd3fc",
                                                    fontSize: "1.05rem"
                                                }}>
                                                    ₹{row.localHalf.toLocaleString("en-IN")}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Timing and Verification Footer Pills */}
                        <div style={{
                            marginTop: "16px",
                            paddingTop: "12px",
                            borderTop: "1px solid rgba(212, 175, 55, 0.2)",
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            justifyContent: "space-between",
                            alignItems: isMobile ? "flex-start" : "center",
                            gap: "10px",
                            fontSize: isMobile ? "0.74rem" : "0.82rem",
                            color: "#94a3b8"
                        }}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
                                <div style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    background: "rgba(255, 255, 255, 0.04)",
                                    padding: "4px 10px",
                                    borderRadius: "20px",
                                    border: "1px solid rgba(255, 255, 255, 0.08)"
                                }}>
                                    <Clock size={13} style={{ color: "#d4af37" }} />
                                    <span><strong style={{ color: "#fff" }}>{isHindi ? "आधा दिन:" : "Half Day:"}</strong> {isHindi ? "4 घंटे तक" : "Up to 4 Hours"}</span>
                                </div>
                                <div style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    background: "rgba(255, 255, 255, 0.04)",
                                    padding: "4px 10px",
                                    borderRadius: "20px",
                                    border: "1px solid rgba(255, 255, 255, 0.08)"
                                }}>
                                    <Clock size={13} style={{ color: "#d4af37" }} />
                                    <span><strong style={{ color: "#fff" }}>{isHindi ? "पूरा दिन:" : "Full Day:"}</strong> {isHindi ? "8 घंटे तक" : "Up to 8 Hours"}</span>
                                </div>
                            </div>
                            <div style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                color: "#cbd5e1",
                                background: "rgba(34, 197, 94, 0.08)",
                                padding: "4px 10px",
                                borderRadius: "20px",
                                border: "1px solid rgba(34, 197, 94, 0.2)"
                            }}>
                                <CheckCircle2 size={13} style={{ color: "#22c55e" }} />
                                <span>{isHindi ? "हमेशा वैध सरकारी पहचान पत्र (ID Card) देखकर ही गाइड तय करें" : "Always verify Rajasthan Tourism ID badge before hiring"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3 Core Trust Pillars */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                    gap: "16px",
                    marginBottom: "32px"
                }}>
                    <div style={{
                        background: "rgba(20, 20, 26, 0.7)",
                        padding: "20px",
                        borderRadius: "16px",
                        border: "1px solid rgba(212, 175, 55, 0.2)"
                    }}>
                        <div style={{ color: "#d4af37", marginBottom: "10px" }}>
                            <ShieldCheck size={26} />
                        </div>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: "700", marginBottom: "6px", color: "#fff" }}>
                            {isHindi ? "100% सरकारी मान्यता" : "100% Govt. Certified"}
                        </h3>
                        <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: "1.5" }}>
                            {isHindi
                                ? "सभी गाइडों के पास राजस्थान सरकार द्वारा जारी वैध लाइसेंस एवं पहचान पत्र है।"
                                : "Every guide holds valid credentials issued by Rajasthan Tourism."
                            }
                        </p>
                    </div>

                    <div style={{
                        background: "rgba(20, 20, 26, 0.7)",
                        padding: "20px",
                        borderRadius: "16px",
                        border: "1px solid rgba(212, 175, 55, 0.2)"
                    }}>
                        <div style={{ color: "#60a5fa", marginBottom: "10px" }}>
                            <Building2 size={26} />
                        </div>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: "700", marginBottom: "6px", color: "#fff" }}>
                            {isHindi ? "TRC चित्तौड़गढ़ सहायता" : "TRC Reception Office"}
                        </h3>
                        <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: "1.5", marginBottom: "6px" }}>
                            {isHindi
                                ? "पर्यटक स्वागत केंद्र (TRC) चित्तौड़गढ़ से सीधे संपर्क हेतु:"
                                : "For direct guide verification contact TRC Chittorgarh:"
                            }
                        </p>
                        <a href="tel:01472241089" style={{ fontSize: "0.9rem", color: "#60a5fa", textDecoration: "none", fontWeight: "700" }}>
                            📞 01472-241089
                        </a>
                    </div>

                    <div style={{
                        background: "rgba(20, 20, 26, 0.7)",
                        padding: "20px",
                        borderRadius: "16px",
                        border: "1px solid rgba(212, 175, 55, 0.2)"
                    }}>
                        <div style={{ color: "#d4af37", marginBottom: "10px" }}>
                            <Award size={26} />
                        </div>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: "700", marginBottom: "6px", color: "#fff" }}>
                            {isHindi ? "प्रामाणिक इतिहास ज्ञान" : "Authentic Fort Heritage"}
                        </h3>
                        <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: "1.5" }}>
                            {isHindi
                                ? "किले के 1300 वर्षों के प्रामाणिक इतिहास और वास्तुकला की सही जानकारी।"
                                : "Trained professionals offering authentic insights into 1300 yrs of Mewar."
                            }
                        </p>
                    </div>
                </div>

                {/* PDF Viewer Container */}
                <div style={{
                    background: "#121217",
                    borderRadius: "20px",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                    marginBottom: "32px"
                }}>
                    <div style={{
                        background: "rgba(25, 25, 32, 0.95)",
                        padding: "14px 20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700", fontSize: "0.9rem" }}>
                            <BookOpen size={18} style={{ color: "#d4af37" }} />
                            <span style={{ color: "#fff" }}>
                                {isHindi ? "आधिकारिक गाइड लिस्ट दस्तावेज़ (PDF)" : "Official Guide List Document (PDF)"}
                            </span>
                        </div>
                        
                        <a
                            href="/Guides List.pdf"
                            download="Chittorgarh-Official-Guide-List.pdf"
                            style={{
                                color: "#d4af37",
                                textDecoration: "none",
                                fontSize: "0.85rem",
                                fontWeight: "700",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px"
                            }}
                        >
                            <Download size={14} />
                            {isHindi ? "डाउनलोड" : "Download"}
                        </a>
                    </div>

                    {/* Responsive iFrame Preview Container */}
                    <div style={{
                        width: "100%",
                        height: isMobile ? "500px" : "750px",
                        background: "#1a1a20",
                        position: "relative"
                    }}>
                        <iframe
                            src="/Guides List.pdf#toolbar=1"
                            title="Rajasthan Tourism Official Guide List PDF"
                            width="100%"
                            height="100%"
                            style={{ border: "none" }}
                        />
                    </div>
                </div>

                {/* Footer Emergency & Help Banner */}
                <div style={{
                    textAlign: "center",
                    padding: "24px 20px",
                    background: "rgba(255, 255, 255, 0.03)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.08)"
                }}>
                    <h4 style={{ fontSize: "1rem", marginBottom: "6px", color: "#fff" }}>
                        {isHindi ? "आपातकालीन सहायता एवं संपर्क" : "Need Emergency Assistance or Police Contacts?"}
                    </h4>
                    <p style={{ color: "#94a3b8", fontSize: "0.88rem", marginBottom: "14px" }}>
                        {isHindi 
                            ? "आपातकालीन हेल्पलाइन, अस्पताल एवं पुलिस स्टेशन संपर्क के लिए आपातकालीन पृष्ठ पर जाएं।" 
                            : "Visit our Emergency Portal for 24/7 tourist police helpline, ambulance, and hospital contacts."}
                    </p>
                    <Link href="/emergency" style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "#ef4444",
                        background: "rgba(239, 68, 68, 0.12)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        padding: "10px 20px",
                        borderRadius: "30px",
                        textDecoration: "none",
                        fontWeight: "600",
                        fontSize: "0.9rem"
                    }}>
                        🚑 {isHindi ? "आपातकालीन पृष्ठ खोलें" : "Open Emergency Info"}
                    </Link>
                </div>

            </div>
        </div>
    );
}
