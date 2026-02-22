"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Plan() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState(1);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: "",
        interest: "1 Day Tour"
    });
    const [status, setStatus] = useState("idle"); // idle, loading, success, error

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        // 1. Send Email (PRIMARY GOAL) - Wrapped in Timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
            setStatus("timeout");
        }, 5000);

        // 2. Try to save to Firebase (NON-BLOCKING BACKGROUND TASK)
        // We do this without await so it doesn't block the email or the timeout
        addDoc(collection(db, "itinerary_requests"), {
            ...formData,
            createdAt: serverTimestamp(),
            itineraryType: `${activeTab} Day Itinerary`
        }).catch(err => console.warn("Background Firestore write failed:", err));

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
            desc: "A meticulously curated journey through 1300 years of valor. Experience the grandeur of the largest fort in India with deep historical immersion.",
            highlights: ["7 Massive Gates (Pols)", "Vijay Stambha (Climb 157 steps)", "Rani Padmini's Water Palace", "Gaumukh Sacred Reservoir", "UNESCO World Heritage Site"],
            schedule: [
                {
                    time: "08:30 AM",
                    title: "Arrival & The Seven Gates",
                    activity: "Begin your ascent driving through the seven historic pols (gates): Padan, Bhairon, Hanuman, Ganesh, Jodla, Laxman, and finally the main Ram Pol. Tip: Stop at the memorial chhatris of Jaimal and Patta between Bhairon and Hanuman Pol to pay respects to the martyrs of the 1568 siege."
                },
                {
                    time: "09:30 AM",
                    title: "Rana Kumbha Palace & Museums",
                    activity: "Explore the ruins of the oldest palace in the fort. Visit the Government Museum inside Fateh Prakash Palace to see ancient sculptures, medieval weaponry, and royal artifacts. Legend says Rani Padmini performed Jauhar in the cellars of Rana Kumbha Palace."
                },
                {
                    time: "11:00 AM",
                    title: "Towers of Victory & Fame",
                    activity: "Marvel at the Vijay Stambha (Tower of Victory), a 9-story marvel carved with thousands of Hindu deities. Pro Tip: The best view of the fort is from the top floor. Nearby, visit the Kirti Stambha (Tower of Fame), a 12th-century Jain monument dedicated to Adinath."
                },
                {
                    time: "12:30 PM",
                    title: "Temples of Devotion",
                    activity: "Visit the Kumbha Shyam Temple (Varaha avatar of Vishnu) and the Meera Bai Temple. Sit for a moment where the poet-saint Meera Bai once sang bhajans for Lord Krishna. The intricate carvings here are a photographer's delight."
                },
                {
                    time: "01:30 PM",
                    title: "Royal Rajasthani Feast",
                    activity: "Head to 'Chokhi Dhani' or 'Hotel Pratap Palace' nearby for an authentic thali featuring Dal Baati Churma, Gatte ki Sabzi, and Bajre ki Roti. Experience the hospitality of Mewar."
                },
                {
                    time: "03:00 PM",
                    title: "Rani Padmini's Palace",
                    activity: "Visit the summer pavilion of Queen Padmini, surrounded by a lotus pool. This is the legendary spot where Alauddin Khilji is said to have glimpsed her reflection. The gardens here are lush and perfect for a leisurely walk."
                },
                {
                    time: "04:30 PM",
                    title: "Gaumukh Reservoir & Kalika Mata",
                    activity: "Walk down to the Gaumukh Reservoir, fed by a perennial spring from a carved cow's mouth. It's a serene spot teeming with fish. Then, visit the 8th-century Kalika Mata Temple (originally a Sun temple) to witness the sunset prayer."
                },
                {
                    time: "07:00 PM",
                    title: "Lumiere: Sound & Light Show",
                    activity: "Conclude with the spectacular Sound & Light show (English/Hindi) at the fort complex. Watch the history of Chittorgarh come alive through lights projected on the ancient walls. (Ticket: Approx ₹100, varying by season)."
                }
            ]
        },
        2: {
            title: "2 Days: Wildlife & Waterfalls Expedition",
            desc: "Beyond the fort lies the untamed beauty of the Aravallis. Discover leopards in the wild and ancient temples hidden by waterfalls.",
            highlights: ["Full Day 1 Fort Tour", "Bassi Wildlife Sanctuary Safari", "Orai Dam", "Menal Waterfalls", "11th Century Temples"],
            schedule: [
                { time: "Day 1", title: "Complete Heritage Tour", activity: "Follow the comprehensive 1-Day Itinerary detailed above for a full immersion into the fort's history." },
                {
                    time: "Day 2 - 06:00 AM",
                    title: "Sunrise Drive to Bassi",
                    activity: "Depart early for Bassi Wildlife Sanctuary (25km). The morning mist over the Aravalli hills offers stunning photographic opportunities."
                },
                {
                    time: "Day 2 - 07:00 AM",
                    title: "Jungle Safari",
                    activity: "Board a Gypsy for a safari. Keep your eyes peeled for Panthers, Sloth Bears, Hyenas, and the Four-horned Antelope. The sanctuary is also a birdwatcher's paradise (Peacocks, Eagles, Hawkes)."
                },
                {
                    time: "Day 2 - 10:30 AM",
                    title: "Bassi & Orai Dams",
                    activity: "Visit the Bassi Dam and Orai Dam. The stillness of the water against the rugged hills is mesmerizing. Perfect for a mid-morning break and nature photography."
                },
                {
                    time: "Day 2 - 01:00 PM",
                    title: "Picnic at Menal",
                    activity: "Drive to Menal (approx 60km). Enjoy a picnic lunch near the gorge. The area is lush green, especially post-monsoon."
                },
                {
                    time: "Day 2 - 02:30 PM",
                    title: "Menal: The Mini Khajuraho",
                    activity: "Explore the Mahanaleshwar Temple complex (11th Century). The erotic sculptures and intricate stone carvings rival those of Khajuraho. Witness the Menal River plunging 150 feet into a gorge—a breathtaking sight."
                },
                {
                    time: "Day 2 - 05:30 PM",
                    title: "Rural Drive Back",
                    activity: "Return to Chittorgarh via the scenic rural route. Witness local village life, cattle herders, and traditional mud houses."
                },
                {
                    time: "Day 2 - 08:00 PM",
                    title: "Dinner at Castle Bijaipur",
                    activity: "Optional: drive to Castle Bijaipur (heritage hotel) for a royal dinner experience, or enjoy local street food (Mirchi Vada, Pyaaz Kachori) in Chittorgarh market."
                }
            ]
        },
        3: {
            title: "3 Days: The Soul of Mewar",
            desc: "A holistic journey covering History, Nature, Divinity, and Art. Meet the artisans of Akola and seek blessings at Sanwariya Seth.",
            highlights: ["Fort & Wildlife", "Sanwariya Seth Temple (Mandraphiya)", "Akola Indigo Printing", "Village Interaction", "Souvenir Shopping"],
            schedule: [
                { time: "Days 1 & 2", title: "History & Nature", activity: "Complete the 2-Day Itinerary covering the Fort, Bassi Sanctuary, and Menal Waterfalls." },
                {
                    time: "Day 3 - 09:00 AM",
                    title: "Pilgrimage to Mandraphiya",
                    activity: "Drive 40km to the Sanwariya Seth Temple. Dedicated to Lord Krishna, this temple is famous for its opulence and the belief that the Lord is a business partner to his devotees."
                },
                {
                    time: "Day 3 - 11:30 AM",
                    title: "Akola: The Indigo Village",
                    activity: "Visit Akola (Chhipon-ka-Akola). Watch the master craftsmen perform 'Dabu' printing—a unique mud-resist technique. See the indigo dyeing pits that have been used for generations."
                },
                {
                    time: "Day 3 - 01:30 PM",
                    title: "Traditional Village Lunch",
                    activity: "Experience hospitality in a rural home or a local eatery. Try 'Makki ki Raab' (Corn soup) and fresh buttermilk."
                },
                {
                    time: "Day 3 - 03:00 PM",
                    title: "Artisan Shopping",
                    activity: "Purchase fabrics directly from the source. Akola prints are famous for not bleeding color. Pick up bedsheets, sarees, and dress materials at unbeatable prices."
                },
                {
                    time: "Day 3 - 05:30 PM",
                    title: "Local Market Exploration",
                    activity: "Return to Chittorgarh city. Explore Sadar Bazaar and Station Road. Look for 'Thewa' jewelry (gold on glass), wooden toys from Bassi, and colorful Jutits (shoes)."
                },
                {
                    time: "Day 3 - 08:00 PM",
                    title: "Royal Farewell",
                    activity: "Conclude your trip with a rooftop dinner overlooking the illuminated Fort. Reflect on 1300 years of history, the roar of the wild, and the color of indigo."
                }
            ]
        }
    };

    return (
        <div className="plan-page">
            {/* ═══ FIXED BACKGROUND ══════════════════════ */}
            <div className="fixed-bg"></div>
            <div className="bg-overlay"></div>

            <style jsx>{`
        .plan-page {
            min-height: 100vh;
            position: relative;
            color: #fff;
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
                rgba(15, 10, 6, 0.7) 0%, 
                rgba(15, 10, 6, 0.5) 50%,
                rgba(15, 10, 6, 0.8) 100%
            );
            z-index: -1;
            backdrop-filter: blur(3px);
        }

        .itinerary-section {
            padding: 4rem 0;
            background: transparent;
        }
        .tabs {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
        }
        .tab-btn {
            padding: 0.8rem 2rem;
            background: transparent;
            border: 1px solid var(--gold);
            color: var(--gold);
            font-family: var(--ff-display);
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s;
            border-radius: 2px;
        }
        .tab-btn.active, .tab-btn:hover {
            background: var(--gold);
            color: #fff;
        }
        .itinerary-card {
            background: rgba(255,255,255,0.95);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: var(--shadow-md);
            max-width: 800px;
            margin: 0 auto;
            animation: fadeIn 0.5s ease;
            color: var(--dark);
        }
        .card-header {
            background: var(--dark-brown);
            color: var(--gold);
            padding: 2rem;
            text-align: center;
        }
        .card-header h2 {
            font-family: var(--ff-display);
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        .card-body {
            padding: 2rem;
        }
        .highlights {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 1.5rem 0;
            justify-content: center;
        }
        .tag {
            background: rgba(184, 134, 11, 0.1);
            color: var(--dark-brown);
            padding: 0.3rem 0.8rem;
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 600;
        }
        .timeline {
            margin-top: 2rem;
            border-left: 2px solid var(--gold);
            padding-left: 2rem;
            margin-left: 1rem;
        }
        .timeline-item {
            position: relative;
            margin-bottom: 2.5rem;
        }
        .timeline-item::before {
            content: '';
            position: absolute;
            left: -39px;
            top: 0;
            width: 16px;
            height: 16px;
            background: var(--gold);
            border: 3px solid #fff;
            border-radius: 50%;
            box-shadow: 0 0 0 2px var(--gold);
        }
        .time {
            font-family: var(--ff-display);
            font-weight: 700;
            color: var(--terracotta);
            display: block;
            margin-bottom: 0.2rem;
            font-size: 1.1rem;
        }
        .activity-title {
            font-family: var(--ff-display);
            font-size: 1.2rem;
            color: var(--dark-brown);
            margin-bottom: 0.3rem;
            display: block;
        }
        .activity-desc {
            font-family: var(--ff-body);
            color: var(--text-mid);
            line-height: 1.6;
            font-size: 0.95rem;
        }
        
        .request-form {
            background: rgba(249, 249, 249, 0.95);
            padding: 4rem 1rem;
            margin-top: 5rem;
            color: var(--dark);
        }
        .form-container {
            max-width: 500px;
            margin: 0 auto;
        }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-muted); }
        .form-group input { width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px; }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            {/* ═══ PAGE HEADER ═══════════════════════════ */}
            <header className="hero page-header" style={{ background: 'transparent', minHeight: '50vh' }}>
                <div className="hero-content">
                    <h1>
                        {t("plan.title1")} <span>{t("plan.title2")}</span>
                    </h1>
                    <p className="hero-sub" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        {t("plan.sub")}
                    </p>
                </div>
            </header>

            {/* ═══ ITINERARY TABS ════════════════════════ */}
            <section className="itinerary-section">
                <div className="container">
                    <div className="tabs">
                        {[1, 2, 3].map(day => (
                            <button
                                key={day}
                                className={`tab-btn ${activeTab === day ? 'active' : ''}`}
                                onClick={() => setActiveTab(day)}
                            >
                                {day} {t("plan.tabLabel")}
                            </button>
                        ))}
                    </div>

                    <div className="itinerary-card">
                        <div className="card-header">
                            <h2>{t(`plan.${activeTab}.title`)}</h2>
                            <p>{t(`plan.${activeTab}.desc`)}</p>
                        </div>
                        <div className="card-body">
                            <h3 style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{t("plan.highlights")}</h3>
                            <div className="highlights">
                                {itineraries[activeTab].highlights.map((_, i) => (
                                    <span key={i} className="tag">{t(`plan.${activeTab}.hlt.${i}`)}</span>
                                ))}
                            </div>

                            <div className="timeline">
                                {itineraries[activeTab].schedule.map((_, index) => (
                                    <div key={index} className="timeline-item">
                                        <span className="time">{t(`plan.${activeTab}.sch.${index}.time`)}</span>
                                        <span className="activity-title">{t(`plan.${activeTab}.sch.${index}.title`)}</span>
                                        <p className="activity-desc">{t(`plan.${activeTab}.sch.${index}.activity`)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ BOOKING FORM ══════════════════════════ */}
            <section className="request-form">
                <div className="container form-container">
                    <h3 style={{ textAlign: 'center', fontFamily: 'var(--ff-display)', fontSize: '2rem', marginBottom: '2rem', color: 'var(--dark-brown)' }}>
                        {t("plan.form.title")}
                    </h3>
                    <form className="plan-form reveal" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>{t("plan.form.name")}</label>
                            <input
                                type="text"
                                name="name"
                                placeholder={t("plan.form.namePlaceholder")}
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>{t("plan.form.email")}</label>
                            <input
                                type="email"
                                name="email"
                                placeholder={t("plan.form.emailPlaceholder")}
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>{t("plan.form.date")}</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Hidden Interest Field (Auto-selected based on tab) */}
                        <input type="hidden" name="interest" value={`${activeTab} Day Tour`} />

                        <div style={{ background: '#fdfbf7', padding: '10px', marginBottom: '20px', borderLeft: '4px solid var(--gold)', color: '#666', fontSize: '0.9rem' }}>
                            {t("plan.form.sending")} <strong>{activeTab} {t("plan.tabLabel")}</strong>
                        </div>

                        <button className="btn-gold" style={{ width: "100%" }} disabled={status === 'loading'}>
                            {status === 'loading' ? t("plan.form.submitLoading") : t("plan.form.submitIdle")}
                        </button>
                        {status === 'success' && <p style={{ color: 'green', marginTop: '1rem', textAlign: 'center' }}>{t("plan.form.success")}</p>}
                        {status === 'timeout' && <p style={{ color: '#d97706', marginTop: '1rem', textAlign: 'center', fontWeight: '600' }}>{t("plan.form.timeout")}</p>}
                        {status === 'error' && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{t("plan.form.error")}</p>}
                    </form>
                </div>
            </section>
        </div>
    );
}
