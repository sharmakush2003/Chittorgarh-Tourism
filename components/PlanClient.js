"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { 
    Ticket, Calendar, Clock, MapPin, Sparkles, Send, CheckCircle2, 
    User, Mail, Compass, ArrowRight, ShieldCheck, Hotel, Car, Navigation, Star,
    ChevronDown, ChevronUp
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function PlanClient() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState(1);
    const [expandedSchedule, setExpandedSchedule] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: "",
        interest: "1 Day Tour"
    });
    const [status, setStatus] = useState("idle");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        triggerHaptic('light');
        setStatus("loading");

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
            setStatus("timeout");
        }, 5000);

        if (db) {
            addDoc(collection(db, "itinerary_requests"), {
                ...formData,
                createdAt: serverTimestamp(),
                itineraryType: `${activeTab} Day Itinerary`
            }).catch(err => console.warn("Background Firestore write failed:", err));
        }

        try {
            const response = await fetch('/api/send-itinerary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    date: formData.date,
                    interest: `${activeTab} Day Tour`,
                    itinerary: itineraries[activeTab]
                })
            });

            clearTimeout(timeoutId);

            if (controller.signal.aborted) return;
            if (!response.ok) throw new Error("Server error");

            setStatus("success");
            triggerHaptic('success');
            setFormData({ name: "", email: "", date: "", interest: "1 Day Tour" });
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name !== 'AbortError') {
                console.error("Submission error:", error);
                setStatus("error");
            }
        }
    };

    const itineraries = {
        1: {
            title: "1 Day: The Royal Heritage Tour (Premium)",
            desc: "A meticulously curated journey through the heart of Rajputana valor.",
            duration: "Full Day (8-10 Hours)",
            transport: "Private Cab / E-Rickshaw",
            ticket: "Single ASI Ticket Valid",
            highlights: ["7 Massive Gates (Pols)", "Vijay Stambha (Climb 157 steps)", "Rani Padmini Palace", "Gaumukh Reservoir", "UNESCO World Heritage Site"],
            landmarks: [
                { title: "Chittorgarh Fort", img: "/hero_bg.png" },
                { title: "Vijay Stambha", img: "/vijay_stambh.jpg" },
                { title: "Padmini Palace", img: "/Each page Pics/Fort pics/Padmini Palace.jpg" },
                { title: "Gaumukh Reservoir", img: "/gaumukh_reservoir.jpg" }
            ],
            schedule: [
                { time: "08:30 AM", title: "Arrival & The Seven Gates", activity: "Begin your ascent driving through the seven historic pols (gates)." },
                { time: "09:30 AM", title: "Rana Kumbha Palace & Museums", activity: "Explore the ruins of the grandest palace in the fort." },
                { time: "11:00 AM", title: "Towers of Victory & Fame", activity: "Marvel at the Vijay Stambha (Tower of Victory)." },
                { time: "12:30 PM", title: "Temples of Devotion", activity: "Visit the Kumbha Shyam Temple and the Meera Bai Temple." },
                { time: "01:30 PM", title: "Royal Rajasthani Feast", activity: "Experience authentic Rajasthani thali." },
                { time: "03:00 PM", title: "Rani Padmini's Palace", activity: "Visit the summer pavilion of Queen Padmini." },
                { time: "04:30 PM", title: "Gaumukh Reservoir & Kalika Mata", activity: "Walk down to the Gaumukh Reservoir." },
                { time: "07:00 PM", title: "Sound & Light Show", activity: "Conclude with the spectacular Sound & Light show." }
            ]
        },
        2: {
            title: "2 Days: Wildlife & Waterfalls Expedition",
            desc: "Beyond the fort lies the untamed beauty of the Aravallis.",
            duration: "2 Full Days (Fort + Wilderness)",
            transport: "Car / Safari SUV",
            ticket: "ASI Ticket + Sanctuary Permit",
            highlights: ["Full Day 1 Fort Tour", "Bassi Wildlife Sanctuary Safari", "Orai Dam", "Menal Waterfalls", "Historic Temples"],
            landmarks: [
                { title: "Bassi Wildlife", img: "/images/bassi_path.jpg" },
                { title: "Menal Waterfall", img: "/menal_waterfall.jpg" },
                { title: "Sitamata Sanctuary", img: "/images/sitamata_1.jpg" }
            ],
            schedule: [
                { time: "Day 1", title: "Complete Heritage Tour", activity: "Follow the comprehensive 1-Day Itinerary." },
                { time: "Day 2 - 06:00 AM", title: "Sunrise Drive to Bassi", activity: "Depart early for Bassi Wildlife Sanctuary (25km)." },
                { time: "Day 2 - 07:00 AM", title: "Jungle Safari", activity: "Board a Gypsy for a safari." },
                { time: "Day 2 - 10:30 AM", title: "Bassi & Orai Dams", activity: "Visit the Bassi Dam and Orai Dam." },
                { time: "Day 2 - 01:00 PM", title: "Picnic at Menal", activity: "Drive to Menal (approx 60km)." },
                { time: "Day 2 - 03:00 PM", title: "Menal: The Waterfall Complex", activity: "Explore the Mahanaleshwar Temple complex." },
                { time: "Day 2 - 05:30 PM", title: "Rural Drive Back", activity: "Return to Chittorgarh via the scenic rural route." },
                { time: "Day 2 - 08:00 PM", title: "Dinner at Castle Bijaipur", activity: "Optional: drive to Castle Bijaipur for a royal dinner." }
            ]
        },
        3: {
            title: "3 Days: The Soul of Mewar",
            desc: "A holistic journey covering History, Nature, Divinity, and Art.",
            duration: "3 Complete Days",
            transport: "Private Chauffeur / SUV",
            ticket: "All Access Pass",
            highlights: ["Fort & Wildlife", "Saawariya ji Seth Temple (Mandraphiya)", "Akola Indigo Printing", "Village Interaction", "Souvenir Shopping"],
            landmarks: [
                { title: "Sanwaliya Ji", img: "/images/sanwaliya_idol.jpg" },
                { title: "Nagari Ruins", img: "/images/Nagari.jpg" },
                { title: "Light & Sound Show", img: "/light_sound_show.jpg" }
            ],
            schedule: [
                { time: "Days 1 & 2", title: "History & Nature", activity: "Complete the 2-Day Itinerary." },
                { time: "Day 3 - 09:00 AM", title: "Pilgrimage to Mandraphiya", activity: "Drive 40km to the Saawariya ji Seth Temple." },
                { time: "Day 3 - 11:30 AM", title: "Akola: The Indigo Village", activity: "Visit Akola (Chhipon-ka-Akola)." },
                { time: "Day 3 - 01:30 PM", title: "Traditional Village Lunch", activity: "Experience hospitality in a rural home." },
                { time: "Day 3 - 03:00 PM", title: "Artisan Shopping", activity: "Purchase fabrics directly from the source." },
                { time: "Day 3 - 05:30 PM", title: "Local Market Exploration", activity: "Return to Chittorgarh city. Explore Sadar Bazaar." },
                { time: "Day 3 - 08:00 PM", title: "Royal Farewell", activity: "Conclude your trip with a rooftop dinner." }
            ]
        }
    };

    const currentPlan = itineraries[activeTab];

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
                    max-width: 640px;
                    margin: 0 auto 1.5rem;
                    color: #FFFFFF;
                    font-size: 0.98rem;
                    line-height: 1.6;
                    font-weight: 400;
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95);
                }

                .cta-dock {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                }

                .btn-gold-ticket-cta {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.6rem;
                    padding: 0.75rem 1.8rem;
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
                    border-radius: 999px;
                    color: #0A0806;
                    font-size: 0.85rem;
                    font-weight: 800;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    text-decoration: none;
                    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.35);
                    transition: all 0.3s ease;
                }

                .btn-gold-ticket-cta:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.5);
                    background: #FFF;
                    color: #0A0806;
                }

                /* TABS SECTION */
                .tabs-row {
                    display: flex;
                    justify-content: center;
                    gap: 0.75rem;
                    margin-bottom: 2.2rem;
                    flex-wrap: wrap;
                }

                .tab-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.65rem 1.4rem;
                    background: rgba(15, 10, 6, 0.82);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 999px;
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                }

                .tab-pill:hover {
                    border-color: rgba(212, 175, 55, 0.7);
                    color: #FFF;
                    transform: translateY(-2px);
                }

                .tab-pill.active {
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
                    color: #0A0806;
                    border-color: #D4AF37;
                    font-weight: 800;
                    box-shadow: 0 6px 22px rgba(212, 175, 55, 0.4);
                }

                /* LUXURY GLASS ITINERARY CARD */
                .itinerary-glass-card {
                    background: rgba(20, 15, 10, 0.88);
                    border: 1px solid rgba(212, 175, 55, 0.38);
                    border-radius: 24px;
                    overflow: hidden;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.65);
                    animation: fadeIn 0.4s ease;
                }

                .card-header-luxury {
                    background: linear-gradient(135deg, rgba(30, 22, 14, 0.95) 0%, rgba(18, 13, 8, 0.95) 100%);
                    border-bottom: 1px solid rgba(212, 175, 55, 0.25);
                    padding: 2.2rem 2rem 1.8rem;
                    text-align: center;
                }

                .card-header-luxury h2 {
                    font-family: var(--ff-display), serif;
                    font-size: clamp(1.4rem, 3.5vw, 2.1rem);
                    font-weight: 800;
                    color: #FFFFFF;
                    margin-bottom: 0.4rem;
                }

                .card-header-luxury p {
                    color: rgba(212, 175, 55, 0.9);
                    font-size: 0.9rem;
                    font-weight: 300;
                }

                /* TRIP METRICS DOCK */
                .metrics-dock {
                    display: flex;
                    justify-content: center;
                    gap: 1.25rem;
                    margin-top: 1.25rem;
                    flex-wrap: wrap;
                }

                .metric-pill {
                    display: flex;
                    align-items: center;
                    gap: 0.45rem;
                    padding: 0.35rem 0.85rem;
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 999px;
                    color: #F3E5AB;
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                }

                .card-body-luxury {
                    padding: 2.2rem 2rem;
                }

                /* LANDMARKS FEATURE PREVIEW */
                .landmarks-preview-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .preview-card {
                    position: relative;
                    height: 120px;
                    border-radius: 14px;
                    overflow: hidden;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    box-shadow: 0 6px 18px rgba(0,0,0,0.4);
                    transition: transform 0.3s ease;
                }

                .preview-card:hover {
                    transform: translateY(-3px);
                    border-color: #D4AF37;
                }

                .preview-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .preview-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(10, 8, 6, 0.9) 0%, transparent 60%);
                    display: flex;
                    align-items: flex-end;
                    padding: 0.65rem 0.85rem;
                }

                .preview-title {
                    font-size: 0.78rem;
                    font-weight: 700;
                    color: #FFF;
                    font-family: var(--ff-display), serif;
                }

                .highlights-title {
                    text-align: center;
                    color: rgba(212, 175, 55, 0.85);
                    font-size: 0.72rem;
                    text-transform: uppercase;
                    letter-spacing: 0.16em;
                    font-weight: 700;
                    margin-bottom: 1rem;
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
                        padding: 0.55rem 1rem;
                        font-size: 0.78rem;
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

                    {/* ═══ ITINERARY TABS ════════════════════════ */}
                    <div className="tabs-row">
                        {[1, 2, 3].map(day => (
                            <button
                                key={day}
                                className={`tab-pill ${activeTab === day ? 'active' : ''}`}
                                onClick={() => { 
                                    setActiveTab(day); 
                                    setExpandedSchedule(false);
                                    triggerHaptic('medium'); 
                                }}
                            >
                                <Compass size={16} />
                                <span>{day} {t("plan.tabLabel")}</span>
                            </button>
                        ))}
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
                                    <Car size={13} />
                                    <span>{currentPlan.transport}</span>
                                </div>
                                <div className="metric-pill">
                                    <Ticket size={13} />
                                    <span>{currentPlan.ticket}</span>
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
                                            : `View Full Day Schedule (${currentPlan.schedule.length} Key Stops)`
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
                                                <span>{t(`plan.${activeTab}.sch.${index}.title`)}</span>
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
                                        <h4>Official Stay: RTDC Hotel Panna</h4>
                                        <p>Govt. approved heritage stay located near Fort Road, Chittorgarh.</p>
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

                    {/* ═══ ROYAL BOOKING FORM ═════════════════════ */}
                    <section className="form-section-luxury">
                        <div className="glass-form-card">
                            <div className="form-header">
                                <h3 className="form-title">{t("plan.form.title")}</h3>
                                <p className="form-subtitle">Receive your customized Chittorgarh travel itinerary directly in your inbox.</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group-luxury">
                                    <label className="form-label-luxury">
                                        <User size={13} />
                                        <span>{t("plan.form.name")}</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <User size={16} className="input-icon" />
                                        <input
                                            type="text"
                                            name="name"
                                            className="input-field-luxury"
                                            placeholder={t("plan.form.namePlaceholder")}
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group-luxury">
                                    <label className="form-label-luxury">
                                        <Mail size={13} />
                                        <span>{t("plan.form.email")}</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <Mail size={16} className="input-icon" />
                                        <input
                                            type="email"
                                            name="email"
                                            className="input-field-luxury"
                                            placeholder={t("plan.form.emailPlaceholder")}
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

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
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <input type="hidden" name="interest" value={`${activeTab} Day Tour`} />

                                <div className="form-info-pill">
                                    <ShieldCheck size={16} />
                                    <span>{t("plan.form.sending")} <strong>{activeTab} {t("plan.tabLabel")}</strong></span>
                                </div>

                                <button
                                    type="submit"
                                    className="submit-btn-luxury"
                                    disabled={status === 'loading'}
                                    onClick={() => triggerHaptic('light')}
                                >
                                    {status === 'loading' ? t("plan.form.submitLoading") : (
                                        <>
                                            <span>{t("plan.form.submitIdle")}</span>
                                            <Send size={16} />
                                        </>
                                    )}
                                </button>

                                {status === 'success' && (
                                    <div className="status-msg-box success">
                                        {t("plan.form.success")}
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="status-msg-box error">
                                        {t("plan.form.error")}
                                    </div>
                                )}
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
