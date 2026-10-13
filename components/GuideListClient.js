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
    BookOpen
} from "lucide-react";

export default function GuideListClient() {
    const { t, lang } = useLanguage();
    const isHindi = lang === "hi";
    const [isMobile, setIsMobile] = useState(false);

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
