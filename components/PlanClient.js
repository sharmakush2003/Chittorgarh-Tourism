"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, useRef } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { 
    Ticket, Calendar, Clock, MapPin, Sparkles, Send, CheckCircle2, 
    User, Mail, Compass, ArrowRight, ShieldCheck, Hotel, Car, Navigation, Star,
    ChevronDown, ChevronUp, Download, FileText, Check, AlertCircle
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function PlanClient() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("half");
    const [expandedSchedule, setExpandedSchedule] = useState(false);
    const pdfTemplateRef = useRef(null);

    // Form State (Date only, minimum today)
    const todayStr = new Date().toISOString().split('T')[0];
    const [formData, setFormData] = useState({
        date: todayStr,
    });
    const [status, setStatus] = useState("idle");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDownloadPDF = async (e) => {
        e.preventDefault();
        triggerHaptic('medium');
        setStatus("loading");

        if (db) {
            addDoc(collection(db, "itinerary_requests"), {
                ...formData,
                createdAt: serverTimestamp(),
                itineraryType: activeTab === 'half' ? 'Half Day (4-5 Hours)' : 'Full Day (8-9 Hours)'
            }).catch(err => console.warn("Background Firestore write skipped:", err));
        }

        try {
            const { default: html2canvas } = await import("html2canvas");
            const { jsPDF } = await import("jspdf");

            const element = pdfTemplateRef.current;
            if (!element) throw new Error("Template ref missing");

            // Allow images to load and paint
            await new Promise(resolve => setTimeout(resolve, 300));

            const pages = element.querySelectorAll('.pdf-a4-page');
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            for (let i = 0; i < pages.length; i++) {
                if (i > 0) pdf.addPage();
                const canvas = await html2canvas(pages[i], {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: "#FAF8F5",
                    logging: false,
                });
                const imgData = canvas.toDataURL("image/jpeg", 0.95);
                pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
            }

            // Ensure viewer starts on Page 1 by default
            pdf.setPage(1);

            const fileName = activeTab === "half" ? "Chittorgarh_Half_Day_Travel_Guide.pdf" : "Chittorgarh_Full_Day_Travel_Guide.pdf";
            pdf.save(fileName);

            setStatus("success");
            triggerHaptic('success');
            setTimeout(() => setStatus("idle"), 6000);
        } catch (error) {
            console.error("PDF generation error:", error);
            setStatus("error");
        }
    };

    const itineraries = {
        half: {
            title: "Half Day: Express Citadel Tour (4–5 Hours)",
            desc: "An optimized, fast-track circuit covering the most iconic monuments of Chittorgarh Fort for travelers with limited time.",
            duration: "4–5 Hours (Morning / Afternoon)",
            location: "Chittorgarh Fort Citadel",
            highlights: ["Vijay Stambha (Victory Tower)", "Rani Padmini Water Palace", "Gaumukh Sacred Reservoir", "Rana Kumbha Palace Ruins", "Meera Bai & Kumbha Temples"],
            landmarks: [
                { title: "Vijay Stambha", img: "/Each page Pics/Fort pics/Vijay Stambh.jpg", desc: "9-story victory tower built by Maharana Kumbha (1440–1448 AD)" },
                { title: "Rani Padmini Palace", img: "/Each page Pics/Fort pics/Padmini Palace.jpg", desc: "Historic summer pavilion surrounded by lotus water pool" },
                { title: "Gaumukh Reservoir", img: "/Each page Pics/Fort pics/Gaumukh Reservoir.jpg", desc: "Sacred perennial spring flowing through carved stone cow mouth" },
                { title: "Rana Kumbha Palace", img: "/Each page Pics/Fort pics/Rana Kumbha Palace.jpg", desc: "Grandest historic royal residence & palace ruins" }
            ],
            schedule: [
                { time: "09:00 AM", title: "Ascent & Rana Kumbha Palace", activity: "Ascend the fort through historic gates and tour the legendary palace ruins, Zenana Mahal, and museum artifacts." },
                { time: "10:15 AM", title: "Vijay Stambha & Kirti Stambh", activity: "Marvel at the 9-storey Victory Tower (1448 AD) and the 12th-century Jain Kirti Stambh dedicated to Lord Adinath." },
                { time: "11:30 AM", title: "Rani Padmini's Water Palace", activity: "Explore the picturesque summer palace surrounded by lotus waters, famous for Queen Padmini's legendary defense." },
                { time: "12:45 PM", title: "Gaumukh Sacred Reservoir & Kalika Mata", activity: "Witness the natural cliff spring flowing through a carved stone cow's mouth and visit the 8th-century Kalika Temple." },
                { time: "01:30 PM", title: "Authentic Rajasthani Lunch", activity: "Relish an authentic Dal Baati Churma feast with pure desi ghee at local heritage restaurants near Fort Road." }
            ]
        },
        full: {
            title: "Full Day: Grand Heritage & Cultural Tour (8–9 Hours)",
            desc: "A comprehensive, immersive journey through 1300 years of Rajputana valor, architecture, temples, sunset bastions, and the evening Sound & Light show.",
            duration: "Full Day (8–9 Hours)",
            location: "Chittorgarh Fort Citadel",
            highlights: ["7 Fortified Gates (Pols)", "Vijay Stambha (Climb 157 steps)", "Rani Padmini Water Palace", "Meera Bai Temple & Gaumukh Spring", "Spectacular Sound & Light Show"],
            landmarks: [
                { title: "Vijay Stambha", img: "/Each page Pics/Fort pics/Vijay Stambh.jpg", desc: "9-story victory tower built by Maharana Kumbha (1440–1448 AD)" },
                { title: "Rani Padmini Palace", img: "/Each page Pics/Fort pics/Padmini Palace.jpg", desc: "Historic summer pavilion surrounded by lotus water pool" },
                { title: "Gaumukh Reservoir", img: "/Each page Pics/Fort pics/Gaumukh Reservoir.jpg", desc: "Sacred perennial spring flowing through carved stone cow mouth" },
                { title: "Rana Kumbha Palace", img: "/Each page Pics/Fort pics/Rana Kumbha Palace.jpg", desc: "Grandest historic royal residence & palace ruins" }
            ],
            schedule: [
                { time: "08:30 AM", title: "Arrival & The Seven Gates (Pols)", activity: "Begin your ascent driving through the seven historic pols (Padan Pol to Ram Pol), honoring the memorials of Jaimal & Patta." },
                { time: "09:30 AM", title: "Rana Kumbha Palace Complex & State Museum", activity: "Explore the grandest royal residence, underground vaults, and inspect ancient weaponry at Fateh Prakash Museum." },
                { time: "11:00 AM", title: "Vijay Stambha & Kirti Stambha", activity: "Climb the 157 steps for a panoramic bird's-eye fort view and inspect thousands of intricate Hindu deity carvings." },
                { time: "12:30 PM", title: "Kumbha Shyam & Meera Bai Temple", activity: "Visit the 8th-century temple where saint-poet Meera Bai composed and sang soulful bhajans for Lord Krishna." },
                { time: "01:30 PM", title: "Traditional Mewari Royal Lunch", activity: "Enjoy an authentic Rajasthani Thali featuring Dal Baati Churma, Ker Sangri, and Gatte ki Sabzi near Fort Road." },
                { time: "03:00 PM", title: "Rani Padmini's Summer Palace & Suraj Pol", activity: "Walk through the water palace pavilion surrounded by lotus ponds and explore the eastern fortifications." },
                { time: "04:30 PM", title: "Gaumukh Spring & Sunset at Kalika Mata", activity: "Witness the sacred cliff-side spring water and capture the breathtaking golden sunset from the fort bastions." },
                { time: "07:00 PM", title: "Spectacular Sound & Light Show", activity: "Conclude your memorable day with the theatrical laser, light, and sound show narrating 1300 years of glorious Mewar history." }
            ]
        }
    };

    const currentPlan = itineraries[activeTab] || itineraries.half;

    return (
        <div className="plan-page">
            {/* ═══ FIXED BACKGROUND ══════════════════════ */}
            <div className="fixed-bg"></div>
            <div className="bg-overlay"></div>

            <style jsx global>{`
                .plan-page {
                    position: relative;
                    min-height: 100vh;
                    background: transparent;
                    color: #FFFFFF;
                    font-family: var(--ff-body), sans-serif;
                }

                .fixed-bg {
                    position: fixed;
                    inset: 0;
                    background: url('/hero_bg.png') no-repeat center center / cover;
                    z-index: -2;
                }

                .bg-overlay {
                    position: fixed;
                    inset: 0;
                    background: linear-gradient(to bottom, 
                        rgba(0, 0, 0, 0.45) 0%, 
                        rgba(0, 0, 0, 0.35) 40%,
                        rgba(0, 0, 0, 0.75) 100%
                    );
                    z-index: -1;
                    backdrop-filter: blur(1px);
                }

                .main-content {
                    padding-top: 105px;
                    padding-bottom: 5rem;
                }

                .container {
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
                    font-size: clamp(0.95rem, 2vw, 1.15rem);
                    color: rgba(255, 255, 255, 0.85);
                    max-width: 680px;
                    line-height: 1.6;
                    margin-bottom: 1.8rem;
                }

                .cta-dock {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                }

                .btn-gold-ticket-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
                    color: #0A0806;
                    padding: 0.8rem 1.8rem;
                    border-radius: 999px;
                    font-weight: 800;
                    font-size: 0.88rem;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
                    transition: all 0.3s ease;
                    text-decoration: none;
                }

                .btn-gold-ticket-cta:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 28px rgba(212, 175, 55, 0.6);
                    background: #FFFFFF;
                }

                /* TABS */
                .tabs-row {
                    display: flex;
                    justify-content: center;
                    gap: 0.85rem;
                    margin-bottom: 2.2rem;
                    flex-wrap: wrap;
                }

                .tab-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.55rem;
                    padding: 0.75rem 1.6rem;
                    background: rgba(20, 15, 10, 0.8);
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    border-radius: 999px;
                    color: #F5E6AB;
                    font-size: 0.88rem;
                    font-weight: 700;
                    letter-spacing: 0.03em;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    backdrop-filter: blur(8px);
                }

                .tab-pill:hover {
                    background: rgba(212, 175, 55, 0.2);
                    border-color: #D4AF37;
                    transform: translateY(-1px);
                }

                .tab-pill.active {
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
                    color: #0A0806;
                    border-color: #F5E6AB;
                    box-shadow: 0 4px 18px rgba(212, 175, 55, 0.45);
                }

                /* ITINERARY CARD */
                .itinerary-glass-card {
                    background: rgba(20, 15, 10, 0.82);
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    border-radius: 24px;
                    overflow: hidden;
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
                    margin-bottom: 3rem;
                }

                .card-header-luxury {
                    padding: 2.2rem 2.5rem 1.8rem;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
                    background: linear-gradient(180deg, rgba(212, 175, 55, 0.08) 0%, transparent 100%);
                }

                .card-header-luxury h2 {
                    font-family: var(--ff-display), serif;
                    font-size: clamp(1.5rem, 3.5vw, 2.2rem);
                    font-weight: 800;
                    color: #FFFFFF;
                    margin-bottom: 0.5rem;
                }

                .card-header-luxury p {
                    color: rgba(255, 255, 255, 0.82);
                    font-size: 0.95rem;
                    line-height: 1.5;
                    margin-bottom: 1.4rem;
                }

                .metrics-dock {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.6rem;
                }

                .metric-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.45rem;
                    background: rgba(255, 255, 255, 0.06);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 8px;
                    padding: 0.4rem 0.85rem;
                    font-size: 0.78rem;
                    color: #F5E6AB;
                    font-weight: 600;
                }

                .card-body-luxury {
                    padding: 2.2rem 2.5rem;
                }

                .landmarks-preview-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .preview-card {
                    position: relative;
                    height: 140px;
                    border-radius: 14px;
                    overflow: hidden;
                    border: 1px solid rgba(212, 175, 55, 0.25);
                }

                .preview-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .preview-card:hover .preview-image {
                    transform: scale(1.08);
                }

                .preview-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
                    display: flex;
                    align-items: flex-end;
                    padding: 0.75rem;
                }

                .preview-title {
                    font-size: 0.82rem;
                    font-weight: 700;
                    color: #FFFFFF;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.8);
                }

                .highlights-title {
                    font-size: 0.75rem;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #D4AF37;
                    font-weight: 800;
                    margin-bottom: 0.75rem;
                    text-align: center;
                }

                .highlights-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.65rem;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                }

                .highlight-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    color: #F3E5AB;
                    padding: 0.4rem 0.9rem;
                    border-radius: 999px;
                    font-size: 0.78rem;
                    font-weight: 600;
                }

                /* TOGGLE SCHEDULE ACCORDION BUTTON */
                .schedule-toggle-box {
                    display: flex;
                    justify-content: center;
                    margin: 1.5rem 0 1.5rem;
                }

                .btn-toggle-schedule {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.65rem;
                    padding: 0.75rem 1.6rem;
                    background: rgba(212, 175, 55, 0.12);
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    border-radius: 999px;
                    color: #F3E5AB;
                    font-size: 0.82rem;
                    font-weight: 800;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.4);
                }

                .btn-toggle-schedule:hover {
                    background: linear-gradient(135deg, #D4AF37, #B8860B);
                    color: #0A0806;
                    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
                    transform: translateY(-2px);
                }

                /* RICH TIMELINE CARDS STYLING */
                .timeline-luxury {
                    display: flex;
                    flex-direction: column;
                    gap: 1.2rem;
                    margin-top: 1.5rem;
                    animation: fadeIn 0.4s ease;
                }

                .timeline-card-item {
                    display: flex;
                    gap: 1.2rem;
                    background: rgba(26, 20, 14, 0.75);
                    border: 1px solid rgba(212, 175, 55, 0.25);
                    border-radius: 16px;
                    padding: 1.25rem 1.4rem;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }

                .timeline-card-item:hover {
                    background: rgba(32, 24, 17, 0.9);
                    border-color: rgba(212, 175, 55, 0.6);
                    transform: translateX(4px);
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
                }

                .item-time-badge {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-width: 90px;
                    padding: 0.6rem 0.8rem;
                    background: rgba(212, 175, 55, 0.12);
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    border-radius: 12px;
                    color: #F3E5AB;
                    font-size: 0.72rem;
                    font-weight: 800;
                    text-align: center;
                    height: fit-content;
                    flex-shrink: 0;
                }

                .item-content {
                    flex: 1;
                }

                .node-title {
                    font-family: var(--ff-display), serif;
                    font-size: 1.2rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin-bottom: 0.35rem;
                    line-height: 1.25;
                }

                .node-desc {
                    font-size: 0.86rem;
                    color: rgba(255, 255, 255, 0.82);
                    line-height: 1.55;
                    font-weight: 300;
                }

                /* RTDC ACCOMMODATIONS BANNER */
                .rtdc-banner-card {
                    margin-top: 2rem;
                    padding: 1.4rem 1.6rem;
                    background: linear-gradient(135deg, rgba(30, 22, 14, 0.9) 0%, rgba(20, 15, 9, 0.95) 100%);
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    border-radius: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1.25rem;
                    flex-wrap: wrap;
                }

                .rtdc-left {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .rtdc-icon-box {
                    width: 48px;
                    height: 48px;
                    background: rgba(212, 175, 55, 0.15);
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #D4AF37;
                    flex-shrink: 0;
                }

                .rtdc-info h4 {
                    font-family: var(--ff-display), serif;
                    font-size: 1.15rem;
                    font-weight: 800;
                    color: #FFF;
                    margin-bottom: 0.2rem;
                }

                .rtdc-info p {
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.75);
                }

                .btn-rtdc-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.45rem;
                    padding: 0.6rem 1.2rem;
                    background: linear-gradient(135deg, #D4AF37, #B8860B);
                    color: #0A0806;
                    border-radius: 10px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    text-decoration: none;
                    white-space: nowrap;
                    transition: all 0.25s ease;
                }

                .btn-rtdc-link:hover {
                    background: #FFF;
                    color: #0A0806;
                }

                /* FORM SECTION */
                .form-section-luxury {
                    margin-top: 4rem;
                }

                .glass-form-card {
                    background: rgba(20, 15, 10, 0.88);
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    border-radius: 24px;
                    padding: 2.5rem 2rem;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.65);
                    max-width: 620px;
                    margin: 0 auto;
                }

                .form-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .form-title {
                    font-family: var(--ff-display), serif;
                    font-size: 1.8rem;
                    font-weight: 800;
                    color: #FFF;
                    margin-bottom: 0.4rem;
                }

                .form-subtitle {
                    color: rgba(255, 255, 255, 0.75);
                    font-size: 0.88rem;
                }

                .form-group-luxury {
                    margin-bottom: 1.25rem;
                }

                .form-label-luxury {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: #D4AF37;
                    margin-bottom: 0.45rem;
                }

                .input-wrapper {
                    position: relative;
                }

                .input-icon {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: rgba(212, 175, 55, 0.8);
                    pointer-events: none;
                }

                .input-field-luxury {
                    width: 100%;
                    padding: 0.75rem 1rem 0.75rem 2.8rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 12px;
                    color: #FFF;
                    font-family: var(--ff-body), sans-serif;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                }

                .input-field-luxury:focus {
                    outline: none;
                    border-color: #D4AF37;
                    background: rgba(255, 255, 255, 0.08);
                    box-shadow: 0 0 16px rgba(212, 175, 55, 0.3);
                }

                .form-info-pill {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid rgba(212, 175, 55, 0.25);
                    border-radius: 10px;
                    padding: 0.65rem 1rem;
                    margin: 1.5rem 0 1.75rem;
                    color: #F3E5AB;
                    font-size: 0.8rem;
                }

                .submit-btn-luxury {
                    width: 100%;
                    padding: 0.85rem;
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
                    border: none;
                    border-radius: 12px;
                    color: #0A0806;
                    font-size: 0.88rem;
                    font-weight: 800;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.35);
                    transition: all 0.3s ease;
                }

                .submit-btn-luxury:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.5);
                    background: #FFF;
                }

                .submit-btn-luxury:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .status-msg-box {
                    margin-top: 1rem;
                    padding: 0.75rem;
                    border-radius: 10px;
                    font-size: 0.84rem;
                    text-align: center;
                    font-weight: 600;
                }

                .status-msg-box.success {
                    background: rgba(74, 222, 128, 0.15);
                    border: 1px solid rgba(74, 222, 128, 0.4);
                    color: #4ade80;
                }

                .status-msg-box.error {
                    background: rgba(248, 113, 113, 0.15);
                    border: 1px solid rgba(248, 113, 113, 0.4);
                    color: #f87171;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* RESPONSIVE MOBILE FIXES */
                @media (max-width: 640px) {
                    .main-content {
                        padding-top: 85px;
                    }
                    .card-header-luxury {
                        padding: 1.6rem 1.25rem 1.25rem;
                    }
                    .card-body-luxury {
                        padding: 1.5rem 1.25rem;
                    }
                    .timeline-card-item {
                        flex-direction: column;
                        gap: 0.6rem;
                    }
                    .item-time-badge {
                        width: fit-content;
                        padding: 0.35rem 0.75rem;
                    }
                    .glass-form-card {
                        padding: 1.8rem 1.25rem;
                    }
                    .tab-pill {
                        padding: 0.55rem 1.1rem;
                        font-size: 0.8rem;
                    }
                }
            `}</style>

            <main className="main-content">
                <div className="container">
                    {/* ═══ PAGE HEADER ═══════════════════════════ */}
                    <header className="header-section">
                        <div className="royal-badge-pill">
                            <Sparkles size={13} className="sparkle-gold" />
                            <span>{t("exp.eyebrow")}</span>
                        </div>
                        <h1 className="title-hero-royal">
                            {t("plan.title1")} {t("plan.title2")}
                        </h1>
                        <p className="subtitle-hero-royal">
                            {t("plan.sub")}
                        </p>
                        <div className="cta-dock">
                            <a
                                href="https://eticket.webfront.in/asi/quick/chf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-gold-ticket-cta"
                                onClick={() => triggerHaptic('light')}
                            >
                                <Ticket size={18} />
                                <span>{t("btn.bookTickets")}</span>
                            </a>
                        </div>
                    </header>

                    {/* ═══ ITINERARY TABS (HALF DAY vs FULL DAY) ════════════════════════ */}
                    <div className="tabs-row">
                        <button
                            className={`tab-pill ${activeTab === 'half' ? 'active' : ''}`}
                            onClick={() => { 
                                setActiveTab('half'); 
                                setExpandedSchedule(false);
                                triggerHaptic('medium'); 
                            }}
                        >
                            <Clock size={16} />
                            <span>{t("plan.tab.half")}</span>
                        </button>
                        <button
                            className={`tab-pill ${activeTab === 'full' ? 'active' : ''}`}
                            onClick={() => { 
                                setActiveTab('full'); 
                                setExpandedSchedule(false);
                                triggerHaptic('medium'); 
                            }}
                        >
                            <Compass size={16} />
                            <span>{t("plan.tab.full")}</span>
                        </button>
                    </div>

                    {/* ═══ LUXURY GLASS ITINERARY CARD ═══════════ */}
                    <div className="itinerary-glass-card">
                        <div className="card-header-luxury">
                            <h2>{t(`plan.${activeTab}.title`)}</h2>
                            <p>{t(`plan.${activeTab}.desc`)}</p>

                            {/* QUICK METRICS DOCK */}
                            <div className="metrics-dock">
                                <div className="metric-pill">
                                    <Clock size={13} />
                                    <span>{currentPlan.duration}</span>
                                </div>
                                <div className="metric-pill">
                                    <MapPin size={13} />
                                    <span>{currentPlan.location}</span>
                                </div>
                                <div className="metric-pill">
                                    <Sparkles size={13} />
                                    <span>UNESCO World Heritage</span>
                                </div>
                            </div>
                        </div>

                        <div className="card-body-luxury">
                            {/* LANDMARKS VISUAL PREVIEW */}
                            {currentPlan.landmarks && (
                                <div className="landmarks-preview-grid">
                                    {currentPlan.landmarks.map((lm, idx) => (
                                        <div key={idx} className="preview-card">
                                            <Image 
                                                src={lm.img} 
                                                alt={lm.title} 
                                                className="preview-image" 
                                                width={400} 
                                                height={250} 
                                            />
                                            <div className="preview-overlay">
                                                <span className="preview-title">{lm.title}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* HIGHLIGHTS CHIPS */}
                            <div className="highlights-title">{t("plan.highlights")}</div>
                            <div className="highlights-grid">
                                {currentPlan.highlights.map((_, i) => (
                                    <span key={i} className="highlight-chip">
                                        <Sparkles size={12} />
                                        <span>{t(`plan.${activeTab}.hlt.${i}`)}</span>
                                    </span>
                                ))}
                            </div>

                            {/* ACCORDION TOGGLE BUTTON FOR EXPANDING DETAILED TIMELINE SCHEDULE */}
                            <div className="schedule-toggle-box">
                                <button 
                                    className="btn-toggle-schedule"
                                    onClick={() => {
                                        setExpandedSchedule(!expandedSchedule);
                                        triggerHaptic('medium');
                                    }}
                                >
                                    <Calendar size={16} />
                                    <span>
                                        {expandedSchedule 
                                            ? "Hide Detailed Timeline Schedule" 
                                            : `View Full Schedule (${currentPlan.schedule.length} Key Stops)`
                                        }
                                    </span>
                                    {expandedSchedule ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                            </div>

                            {/* EXPANDABLE RICH TIMELINE CARDS */}
                            {expandedSchedule && (
                                <div className="timeline-luxury">
                                    {currentPlan.schedule.map((_, index) => (
                                        <div key={index} className="timeline-card-item">
                                            <div className="item-time-badge">
                                                <Clock size={14} style={{ marginBottom: '2px' }} />
                                                <span>{t(`plan.${activeTab}.sch.${index}.time`)}</span>
                                            </div>
                                            <div className="item-content">
                                                <h3 className="node-title">{t(`plan.${activeTab}.sch.${index}.title`)}</h3>
                                                <p className="node-desc">{t(`plan.${activeTab}.sch.${index}.activity`)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* RTDC ACCOMMODATIONS BANNER */}
                            <div className="rtdc-banner-card">
                                <div className="rtdc-left">
                                    <div className="rtdc-icon-box">
                                        <Hotel size={24} />
                                    </div>
                                    <div className="rtdc-info">
                                        <h4>Recommended Stay: RTDC Hotel Panna</h4>
                                        <p>Comfortable heritage stay located near Fort Road, Chittorgarh.</p>
                                    </div>
                                </div>
                                <a
                                    href="https://rtdc.tourism.rajasthan.gov.in/Client/HotelDetails.aspx?HotelID=CHITTORGARHPanna"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-rtdc-link"
                                >
                                    <span>Book RTDC Hotel</span>
                                    <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* ═══ ROYAL PDF DOWNLOAD FORM ═══════════════ */}
                    <section className="form-section-luxury">
                        <div className="glass-form-card">
                            <div className="form-header">
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#D4AF37', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                    <FileText size={14} />
                                    <span>Travel Guide & Itinerary PDF</span>
                                </div>
                                <h3 className="form-title">{t("plan.form.title")}</h3>
                                <p className="form-subtitle">Get your customized, high-definition Chittorgarh travel guide with landmark photos, timings, and insider tips saved directly to your device.</p>
                            </div>

                            <form onSubmit={handleDownloadPDF}>
                                <div className="form-group-luxury">
                                    <label className="form-label-luxury">
                                        <Calendar size={13} />
                                        <span>{t("plan.form.date")}</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <Calendar size={16} className="input-icon" />
                                        <input
                                            type="date"
                                            name="date"
                                            className="input-field-luxury"
                                            min={todayStr}
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-info-pill">
                                    <ShieldCheck size={16} />
                                    <span>{t("plan.form.sending")} <strong>{activeTab === 'half' ? 'Half Day (4–5 Hours)' : 'Full Day (8–9 Hours)'}</strong></span>
                                </div>

                                <button
                                    type="submit"
                                    className="submit-btn-luxury"
                                    disabled={status === 'loading'}
                                    onClick={() => triggerHaptic('light')}
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <span>{t("plan.form.submitLoading")}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{t("plan.form.submitIdle")}</span>
                                            <Download size={18} />
                                        </>
                                    )}
                                </button>

                                {status === 'success' && (
                                    <div className="status-msg-box success">
                                        <Check size={16} style={{ display: 'inline', marginRight: '6px' }} />
                                        {t("plan.form.success")}
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="status-msg-box error">
                                        <AlertCircle size={16} style={{ display: 'inline', marginRight: '6px' }} />
                                        {t("plan.form.error")}
                                    </div>
                                )}
                            </form>
                        </div>
                    </section>

                    {/* ══════════════════════════════════════════════════════════
                        DENSE, FULLY-FILLED 2-PAGE HIGH-RESOLUTION A4 PDF GUIDEBOOK
                        (Zero empty space, 100% in English, No Government claims)
                    ══════════════════════════════════════════════════════════ */}
                    <div 
                        ref={pdfTemplateRef}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: '-9999px',
                            width: '794px',
                            zIndex: -9999,
                            pointerEvents: 'none',
                            backgroundColor: '#FAF8F5',
                            color: '#1C1917',
                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                            boxSizing: 'border-box'
                        }}
                    >
                        {/* ──────────────────────────────────────────────────────────
                            PAGE 1: HERITAGE OVERVIEW, KEY LANDMARKS & TIMED SCHEDULE
                        ────────────────────────────────────────────────────────── */}
                        <div 
                            className="pdf-a4-page" 
                            style={{ 
                                width: '794px', 
                                height: '1122px', 
                                maxHeight: '1122px',
                                backgroundColor: '#FFFFFF', 
                                padding: '24px 28px', 
                                boxSizing: 'border-box', 
                                position: 'relative', 
                                overflow: 'hidden', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between',
                                border: '1px solid #E7D7B5' 
                            }}
                        >
                            {/* TOP GOLD ACCENT BAR */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #800000 0%, #D4AF37 50%, #800000 100%)' }} />

                            {/* BRAND HEADER */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #D4AF37', paddingBottom: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <img 
                                        src="/logo.jpg" 
                                        alt="Chittorgarh Tourism" 
                                        style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #D4AF37', objectFit: 'cover' }} 
                                        crossOrigin="anonymous"
                                    />
                                    <div>
                                        <div style={{ fontSize: '20px', fontWeight: '900', color: '#800000', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                                            Chittorgarh Tourism
                                        </div>
                                        <div style={{ fontSize: '10px', color: '#78716C', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                            Heritage Travel Guide & Itinerary • UNESCO World Heritage Site
                                        </div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ backgroundColor: '#FAF5EA', border: '1.5px solid #D4AF37', borderRadius: '20px', padding: '5px 14px', display: 'inline-block' }}>
                                        <span style={{ fontSize: '11px', fontWeight: '900', color: '#800000', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            {activeTab === 'half' ? 'Half Day Circuit (4–5 Hours)' : 'Full Day Grand Tour (8–9 Hours)'}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '9px', color: '#78716C', marginTop: '2px', fontWeight: '600' }}>
                                        www.chittorgarh-tourism.in
                                    </div>
                                </div>
                            </div>

                            {/* TRIP METRICS DOSSIER BAR */}
                            <div style={{ backgroundColor: '#1C1917', borderRadius: '10px', padding: '10px 18px', border: '1px solid rgba(212, 175, 55, 0.5)', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                                <div>
                                    <span style={{ color: '#A8A29E' }}>Planned Visit:</span>{' '}
                                    <strong style={{ color: '#F5E6AB' }}>{formData.date || 'Flexible Schedule'}</strong>
                                </div>
                                <div>
                                    <span style={{ color: '#A8A29E' }}>Tour Scope:</span>{' '}
                                    <strong style={{ color: '#FFFFFF' }}>{currentPlan.duration}</strong>
                                </div>
                                <div>
                                    <span style={{ color: '#A8A29E' }}>Citadel Area:</span>{' '}
                                    <strong style={{ color: '#FFFFFF' }}>Chittorgarh Fort Complex</strong>
                                </div>
                                <div>
                                    <span style={{ color: '#A8A29E' }}>Site Status:</span>{' '}
                                    <strong style={{ color: '#F5E6AB' }}>UNESCO World Heritage</strong>
                                </div>
                            </div>

                            {/* CITADEL LEGACY OVERVIEW BANNER */}
                            <div style={{ backgroundColor: '#FAF5EA', borderLeft: '4px solid #800000', border: '1px solid #E7D7B5', borderLeftWidth: '4px', borderRadius: '8px', padding: '10px 14px' }}>
                                <div style={{ fontSize: '11.5px', fontWeight: '800', color: '#800000', textTransform: 'uppercase', marginBottom: '3px' }}>
                                    🏰 The Greatest Citadel of Mewar Sovereignty
                                </div>
                                <div style={{ fontSize: '10px', color: '#44403C', lineHeight: '1.45' }}>
                                    Spanning over <strong>700 acres atop a 180-meter cliff</strong>, Chittorgarh Fort is Asia's grandest living fortress. Revered across 13 centuries of Rajputana valor and chivalry, it features 84 sacred water bodies, 7 fortified gateways, and magnificent medieval palaces.
                                </div>
                            </div>

                            {/* 4 KEY CITADEL MONUMENTS (2x2 GRID) */}
                            <div>
                                <div style={{ fontSize: '11.5px', fontWeight: '900', color: '#800000', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                                    🏛️ Must-Visit Architectural Highlights
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                                    {/* CARD 1: VIJAY STAMBHA */}
                                    <div style={{ border: '1px solid #E7E5E4', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#FAFAF9', display: 'flex', gap: '10px', padding: '8px' }}>
                                        <div style={{ width: '100px', height: '90px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#E7E5E4' }}>
                                            <img 
                                                src="/Each page Pics/Fort pics/Vijay Stambh.jpg" 
                                                alt="Vijay Stambha" 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                                crossOrigin="anonymous"
                                            />
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <div style={{ fontSize: '11.5px', fontWeight: '800', color: '#800000', marginBottom: '3px' }}>
                                                Vijay Stambha (Tower of Victory)
                                            </div>
                                            <div style={{ fontSize: '9.5px', color: '#57534E', lineHeight: '1.4' }}>
                                                9-storey victory tower (1440–1448 AD) built by Maharana Kumbha to commemorate triumph over Malwa & Gujarat. Adorned with intricate Hindu deity sculptures across 157 steps.
                                            </div>
                                        </div>
                                    </div>

                                    {/* CARD 2: PADMINI PALACE */}
                                    <div style={{ border: '1px solid #E7E5E4', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#FAFAF9', display: 'flex', gap: '10px', padding: '8px' }}>
                                        <div style={{ width: '100px', height: '90px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#E7E5E4' }}>
                                            <img 
                                                src="/Each page Pics/Fort pics/Padmini Palace.jpg" 
                                                alt="Rani Padmini Palace" 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                                crossOrigin="anonymous"
                                            />
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <div style={{ fontSize: '11.5px', fontWeight: '800', color: '#800000', marginBottom: '3px' }}>
                                                Rani Padmini's Water Palace
                                            </div>
                                            <div style={{ fontSize: '9.5px', color: '#57534E', lineHeight: '1.4' }}>
                                                Elegant structure surrounded by a lotus pool. Historic site of the legendary defense led by Queen Padmini during the historic 1303 AD siege.
                                            </div>
                                        </div>
                                    </div>

                                    {/* CARD 3: GAUMUKH RESERVOIR */}
                                    <div style={{ border: '1px solid #E7E5E4', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#FAFAF9', display: 'flex', gap: '10px', padding: '8px' }}>
                                        <div style={{ width: '100px', height: '90px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#E7E5E4' }}>
                                            <img 
                                                src="/Each page Pics/Fort pics/Gaumukh Reservoir.jpg" 
                                                alt="Gaumukh Reservoir" 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                                crossOrigin="anonymous"
                                            />
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <div style={{ fontSize: '11.5px', fontWeight: '800', color: '#800000', marginBottom: '3px' }}>
                                                Gaumukh Sacred Reservoir
                                            </div>
                                            <div style={{ fontSize: '9.5px', color: '#57534E', lineHeight: '1.4' }}>
                                                Sacred perennial cliff-side spring flowing from a carved stone cow's mouth. Primary water lifeline of Chittorgarh Fort for over a thousand years.
                                            </div>
                                        </div>
                                    </div>

                                    {/* CARD 4: RANA KUMBHA PALACE */}
                                    <div style={{ border: '1px solid #E7E5E4', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#FAFAF9', display: 'flex', gap: '10px', padding: '8px' }}>
                                        <div style={{ width: '100px', height: '90px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#E7E5E4' }}>
                                            <img 
                                                src="/Each page Pics/Fort pics/Rana Kumbha Palace.jpg" 
                                                alt="Rana Kumbha Palace" 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                                crossOrigin="anonymous"
                                            />
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <div style={{ fontSize: '11.5px', fontWeight: '800', color: '#800000', marginBottom: '3px' }}>
                                                Rana Kumbha Palace Ruins
                                            </div>
                                            <div style={{ fontSize: '9.5px', color: '#57534E', lineHeight: '1.4' }}>
                                                Grandest historic royal ruins where Maharana Kumbha resided. Steeped in history, featuring underground vaults, elephant stables, and royal quarters.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* TIMED SCHEDULE PART 1 (MORNING CIRCUIT) */}
                            <div>
                                <div style={{ fontSize: '11.5px', fontWeight: '900', color: '#800000', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                                    ⏱️ {activeTab === 'half' ? 'Express Half Day Itinerary (Stops 1 to 5)' : 'Morning Master Itinerary (Stops 1 to 4)'}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                    {(activeTab === 'half' 
                                        ? currentPlan.schedule 
                                        : currentPlan.schedule.slice(0, 4)
                                    ).map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '12px', padding: '9px 12px', backgroundColor: idx % 2 === 0 ? '#FAF8F5' : '#FFFFFF', border: '1px solid #E7E5E4', borderRadius: '8px', alignItems: 'center' }}>
                                            <div style={{ backgroundColor: '#800000', color: '#FFFFFF', padding: '5px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: '900', whiteSpace: 'nowrap', minWidth: '70px', textAlign: 'center' }}>
                                                {item.time}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '11px', fontWeight: '800', color: '#1C1917', marginBottom: '2px' }}>{item.title}</div>
                                                <div style={{ fontSize: '9.5px', color: '#57534E', lineHeight: '1.35' }}>{item.activity}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CITADEL FAST FACTS STRIP */}
                            <div style={{ backgroundColor: '#FAF5EA', border: '1px solid #D4AF37', borderRadius: '8px', padding: '8px 14px', fontSize: '10px', color: '#44403C', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>🏰 <strong>Fort Architecture:</strong> 700 Acres • 180m Elevation • 84 Water Reservoirs • 7 Defensive Pols • 27 Jain Temples</span>
                                <span style={{ color: '#800000', fontWeight: '800' }}>ASI Protected Site</span>
                            </div>

                            {/* PAGE 1 FOOTER */}
                            <div style={{ borderTop: '1px solid #E7E5E4', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9px', color: '#78716C' }}>
                                <div><strong>Chittorgarh Tourism Portal</strong> • Heritage Travel Guide</div>
                                <div>Page 1 of 2</div>
                            </div>
                        </div>

                        {/* ──────────────────────────────────────────────────────────
                            PAGE 2: AFTERNOON/EVENING ROUTE, MEWARI CUISINE & VISITOR DIRECTORY
                        ────────────────────────────────────────────────────────── */}
                        <div 
                            className="pdf-a4-page" 
                            style={{ 
                                width: '794px', 
                                height: '1122px', 
                                maxHeight: '1122px',
                                backgroundColor: '#FFFFFF', 
                                padding: '24px 28px', 
                                boxSizing: 'border-box', 
                                position: 'relative', 
                                overflow: 'hidden', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between',
                                border: '1px solid #E7D7B5' 
                            }}
                        >
                            {/* TOP GOLD ACCENT BAR */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #800000 0%, #D4AF37 50%, #800000 100%)' }} />

                            {/* PAGE 2 HEADER */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #800000', paddingBottom: '8px' }}>
                                <div>
                                    <div style={{ fontSize: '9.5px', color: '#D4AF37', fontWeight: '900', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                        {activeTab === 'half' ? 'PART 2 • CULTURAL IMMERSION & VISITOR HANDBOOK' : 'PART 2 • AFTERNOON ROUTE & VISITOR DIRECTORY'}
                                    </div>
                                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#800000', textTransform: 'uppercase' }}>
                                        {activeTab === 'half' ? 'Cuisines, Artisan Crafts & Guidelines' : 'Afternoon Schedule, Cuisines & Visitor Directory'}
                                    </div>
                                </div>
                                <div style={{ fontSize: '10px', color: '#78716C', fontWeight: '700' }}>Chittorgarh Tourism Guide</div>
                            </div>

                            {/* AFTERNOON TIMED SCHEDULE (FOR FULL DAY) OR EXPRESS ADVICE (FOR HALF DAY) */}
                            {activeTab === 'full' ? (
                                <div>
                                    <div style={{ fontSize: '11.5px', fontWeight: '900', color: '#800000', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                                        ⏱️ Afternoon & Evening Schedule (Stops 5 to 8)
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                        {currentPlan.schedule.slice(4).map((item, idx) => (
                                            <div key={idx} style={{ display: 'flex', gap: '12px', padding: '9px 12px', backgroundColor: idx % 2 === 0 ? '#FAF8F5' : '#FFFFFF', border: '1px solid #E7E5E4', borderRadius: '8px', alignItems: 'center' }}>
                                                <div style={{ backgroundColor: '#800000', color: '#FFFFFF', padding: '5px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: '900', whiteSpace: 'nowrap', minWidth: '70px', textAlign: 'center' }}>
                                                    {item.time}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#1C1917', marginBottom: '2px' }}>{item.title}</div>
                                                    <div style={{ fontSize: '9.5px', color: '#57534E', lineHeight: '1.35' }}>{item.activity}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div style={{ backgroundColor: '#FAF5EA', border: '1px solid #D4AF37', borderRadius: '8px', padding: '12px 16px' }}>
                                    <div style={{ fontSize: '11.5px', fontWeight: '800', color: '#800000', textTransform: 'uppercase', marginBottom: '4px' }}>
                                        ⚡ Express Half-Day Exploration Strategy
                                    </div>
                                    <div style={{ fontSize: '10px', color: '#44403C', lineHeight: '1.5' }}>
                                        • <strong>Morning Circuit (Recommended):</strong> Arrive at the fort entrance by 08:30 AM to tour Vijay Stambh and Rana Kumbha Palace during pleasant morning hours.<br />
                                        • <strong>Afternoon Circuit:</strong> Arrive by 02:00 PM to explore palace grounds and watch the golden sunset over the Aravalli hills from Gaumukh Reservoir and Kalika Mata bastions.<br />
                                        • <strong>Circuit Flow:</strong> Follow the well-marked fort route connecting Padan Pol, Rana Kumbha Palace, Victory Tower, Gaumukh Reservoir, and Padmini Palace.
                                    </div>
                                </div>
                            )}

                            {/* ROYAL MEWARI CUISINES (2x2 GRID) */}
                            <div>
                                <div style={{ fontSize: '11.5px', fontWeight: '900', color: '#800000', textTransform: 'uppercase', marginBottom: '6px' }}>
                                    🍲 Must-Try Traditional Rajasthani Delicacies
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                                    <div style={{ backgroundColor: '#FAF5EA', border: '1px solid #E7D7B5', borderRadius: '8px', padding: '8px 12px' }}>
                                        <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#800000', marginBottom: '2px' }}>• Dal Baati Churma</div>
                                        <div style={{ fontSize: '9.5px', color: '#44403C', lineHeight: '1.35' }}>Crispy baked dough balls dipped in pure desi ghee, served with 5-dal curry and sweet jaggery churma.</div>
                                    </div>
                                    <div style={{ backgroundColor: '#FAF5EA', border: '1px solid #E7D7B5', borderRadius: '8px', padding: '8px 12px' }}>
                                        <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#800000', marginBottom: '2px' }}>• Ker Sangri</div>
                                        <div style={{ fontSize: '9.5px', color: '#44403C', lineHeight: '1.35' }}>Authentic desert wild beans and dried berries cooked with traditional Mewari mustard and red spices.</div>
                                    </div>
                                    <div style={{ backgroundColor: '#FAF5EA', border: '1px solid #E7D7B5', borderRadius: '8px', padding: '8px 12px' }}>
                                        <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#800000', marginBottom: '2px' }}>• Gatte Ki Sabzi & Bajra Roti</div>
                                        <div style={{ fontSize: '9.5px', color: '#44403C', lineHeight: '1.35' }}>Soft steamed gram-flour dumplings simmered in rich spiced curd gravy with hot millet bread.</div>
                                    </div>
                                    <div style={{ backgroundColor: '#FAF5EA', border: '1px solid #E7D7B5', borderRadius: '8px', padding: '8px 12px' }}>
                                        <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#800000', marginBottom: '2px' }}>• Pyaaz Kachori & Saffron Ghevar</div>
                                        <div style={{ fontSize: '9.5px', color: '#44403C', lineHeight: '1.35' }}>Crisp morning snack paired with world-famous traditional honeycomb sweet drenched in saffron syrup.</div>
                                    </div>
                                </div>
                            </div>

                            {/* ARTISAN SHOPPING & SOUVENIRS */}
                            <div>
                                <div style={{ fontSize: '11.5px', fontWeight: '900', color: '#800000', textTransform: 'uppercase', marginBottom: '6px' }}>
                                    🛍️ Authentic Handicrafts & Artisan Souvenirs
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                    <div style={{ border: '1px solid #E7E5E4', borderRadius: '8px', padding: '8px 10px', backgroundColor: '#FAFAF9' }}>
                                        <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#800000', marginBottom: '2px' }}>1. Akola Dabu Prints</div>
                                        <div style={{ fontSize: '9px', color: '#57534E', lineHeight: '1.35' }}>500-year-old mud-resist natural indigo hand-block print fabrics from Akola artisans.</div>
                                    </div>
                                    <div style={{ border: '1px solid #E7E5E4', borderRadius: '8px', padding: '8px 10px', backgroundColor: '#FAFAF9' }}>
                                        <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#800000', marginBottom: '2px' }}>2. Wooden Toys & Shrines</div>
                                        <div style={{ fontSize: '9px', color: '#57534E', lineHeight: '1.35' }}>Handcrafted carved wooden temples, painted toy horses, and lacquered home decor.</div>
                                    </div>
                                    <div style={{ border: '1px solid #E7E5E4', borderRadius: '8px', padding: '8px 10px', backgroundColor: '#FAFAF9' }}>
                                        <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#800000', marginBottom: '2px' }}>3. Pure Leather Mojaris</div>
                                        <div style={{ fontSize: '9px', color: '#57534E', lineHeight: '1.35' }}>Hand-embroidered traditional Rajasthani footwear crafted with intricate zari threadwork.</div>
                                    </div>
                                </div>
                            </div>

                            {/* ESSENTIAL VISITOR TIMINGS & ASI TICKETING */}
                            <div style={{ backgroundColor: '#FAF8F5', border: '1px solid #D4AF37', borderRadius: '8px', padding: '9px 14px', fontSize: '10px', color: '#44403C' }}>
                                <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#800000', textTransform: 'uppercase', marginBottom: '4px' }}>
                                    🎟️ Fort Timings & Visitor Information
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                                    <div>• <strong>Fort Hours:</strong> 09:00 AM – 06:00 PM (Open all 365 days).</div>
                                    <div>• <strong>Sound & Light Show:</strong> 07:00 PM (Hindi) | 08:00 PM (English).</div>
                                    <div>• <strong>Advance E-Tickets:</strong> eticket.webfront.in/asi/quick/chf</div>
                                    <div>• <strong>Recommended Stay:</strong> RTDC Hotel Panna (Tel: 01472-241089)</div>
                                </div>
                            </div>

                            {/* 24/7 HELPLINE DIRECTORY */}
                            <div style={{ backgroundColor: '#1C1917', color: '#FFFFFF', borderRadius: '8px', padding: '10px 16px', border: '1px solid rgba(212, 175, 55, 0.4)' }}>
                                <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', borderBottom: '1px solid rgba(212, 175, 55, 0.25)', paddingBottom: '4px' }}>
                                    🚨 Emergency & Tourist Helpline Directory
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px 12px', fontSize: '9.5px' }}>
                                    <div>• <strong>Police:</strong> <span style={{ color: '#F5E6AB' }}>112</span></div>
                                    <div>• <strong>Fort Police:</strong> <span style={{ color: '#F5E6AB' }}>01472-240088</span></div>
                                    <div>• <strong>Tourist Reception:</strong> <span style={{ color: '#F5E6AB' }}>01472-241089</span></div>
                                    <div>• <strong>Ambulance:</strong> <span style={{ color: '#F5E6AB' }}>108 / 102</span></div>
                                    <div>• <strong>District Hospital:</strong> <span style={{ color: '#F5E6AB' }}>01472-250555</span></div>
                                    <div>• <strong>Fire Helpline:</strong> <span style={{ color: '#F5E6AB' }}>101</span></div>
                                </div>
                            </div>

                            {/* PAGE 2 FOOTER */}
                            <div style={{ borderTop: '1px solid #E7E5E4', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9px', color: '#78716C' }}>
                                <div>Chittorgarh Tourism Portal • Planned Date: <strong>{formData.date || 'Flexible'}</strong> • Verified Information</div>
                                <div>Page 2 of 2</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
