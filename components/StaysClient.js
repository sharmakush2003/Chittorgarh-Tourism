"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Flower, Calendar, MapPin, ArrowRight, Share2, Navigation, X, Send, Hotel } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StaysClient() {
    const { t } = useLanguage();

    const hotels = [
        {
            id: "h1",
            imgSymbol: "🏰",
            stars: "★★★★",
            rating: "4.1/5",
            price: "₹5,500",
            distFort: "9.9 km",
            walkKm: "11.0",
            driveKm: "9.9",
            distStation: "10.5 km",
            image: "/kesarbagh.webp",
            mmtUrl: "https://www.makemytrip.com/hotels/kesarbagh_palace-details-chittorgarh.html"
        },
        {
            id: "h2",
            imgSymbol: "🌴",
            stars: "★★★★",
            rating: "3.5/5",
            price: "₹4,200",
            distFort: "2.5 km",
            walkKm: "4.2",
            driveKm: "2.5",
            distStation: "4.2 km",
            image: "/anandam.jpg",
            mmtUrl: "https://www.makemytrip.com/hotels/shree_anandam_resort-details-chittorgarh.html"
        },
        {
            id: "h3",
            imgSymbol: "🏢",
            stars: "★★★",
            rating: "3.9/5",
            price: "₹2,800",
            distFort: "2.3 km",
            walkKm: "4.6",
            driveKm: "2.3",
            distStation: "2.0 km",
            image: "/pride_of_chittor.jpg",
            mmtUrl: "https://www.makemytrip.com/hotels/hotel_pride_of_chittor-details-chittorgarh.html"
        }
    ];

    const rtdcStats = {
        name: "RTDC Hotel Panna",
        walkKm: "6.3",
        driveKm: "4.0",
        mapsLink: "https://www.google.com/maps/dir/?api=1&destination=RTDC+Hotel+Panna+Chittorgarh"
    };

    return (
        <div className="stays-page">
            {/* ═══ FIXED BACKGROUND ══════════════════════ */}
            <div className="fixed-bg"></div>
            <div className="bg-overlay"></div>

            <style jsx>{`
        .stays-page {
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
        .header-section {
            margin-bottom: 4rem;
            padding-top: 140px;
        }
        .eyebrow {
            display: block;
            font-family: var(--ff-body);
            font-size: 0.75rem;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 1rem;
            text-align: center;
        }
        .title {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-family: var(--ff-display);
            margin-bottom: 1.5rem;
            text-shadow: 0 4px 20px rgba(0,0,0,0.5);
            text-align: center;
            color: var(--gold);
        }
        .divider {
            width: 100px;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--gold), transparent);
            margin: 0 auto;
        }
        .hotel-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2.5rem;
            justify-content: center;
        }
      `}</style>

            {/* ═══ PAGE HEADER ═══════════════════════════ */}
            <header className="header-section">
                <span className="eyebrow">{t("stays.eyebrow")}</span>
                <h1 className="title">{t("stays.title")}</h1>
                <div className="divider"></div>
            </header>

            {/* ═══ HOTELS CONTENT ════════════════════════ */}
            <section className="section-pad" style={{ paddingTop: 0 }}>
                <div className="container">

                    {/* ═══ FEATURED STAY (RTDC) ═══════════════ */}
                    <div className="featured-stay-section">
                        <div className="featured-badge">
                            <Flower size={14} className="badge-icon" />
                            <span>{t("stays.featured.label")}</span>
                        </div>
                        
                        <div className="featured-card">
                            <div className="featured-image-container">
                                <img src="/panna.png" alt="Hotel Panna" className="featured-image" />
                                <div className="gov-badge">
                                    <Hotel size={14} />
                                    <span>{t("stays.featured.badge")}</span>
                                </div>
                            </div>
                            
                            <div className="featured-info">
                                <div className="info-header">
                                    <span className="tagline">{t("stays.rtdc.tagline")}</span>
                                    <h2 className="featured-title">{t("stays.rtdc.title")}</h2>
                                </div>
                                <p className="featured-desc">{t("stays.rtdc.desc")}</p>
                                
                                <div className="featured-meta">
                                    <div className="smart-badges">
                                        <div className="smart-pill walk">
                                            <Flower size={14} />
                                            <span>{rtdcStats.walkKm} km {t("lbl.walking")}</span>
                                        </div>
                                        <div className="smart-pill drive">
                                            <Navigation size={14} />
                                            <span>{rtdcStats.driveKm} km {t("lbl.driving")}</span>
                                        </div>
                                    </div>
                                    <div className="meta-item">
                                        <MapPin size={16} />
                                        <span>{t("stays.rtdc.address")}</span>
                                    </div>
                                    <div className="meta-item">
                                        <div className="gov-seal">
                                            <div className="seal-inner"></div>
                                        </div>
                                        <span>{t("lbl.government")}</span>
                                    </div>
                                </div>
                                
                                <div className="featured-actions">
                                    <a 
                                        href="https://rtdc.tourism.rajasthan.gov.in/" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="btn-featured-booking"
                                    >
                                        <span>{t("stays.featured.booking")}</span>
                                        <ArrowRight size={18} />
                                    </a>
                                    <a 
                                        href={rtdcStats.mapsLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="btn-featured-booking secondary"
                                    >
                                        <Navigation size={18} />
                                        <span>{t("btn.getDirections", { hotel: rtdcStats.name })}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hotel-grid">
                        {hotels.map((hotel, index) => (
                            <HotelGlassCard
                                key={hotel.id}
                                hotel={hotel}
                                delay={index}
                                t={t}
                            />
                        ))}
                    </div>

                </div>
            </section>

            <style jsx>{`
                 .featured-stay-section {
                    margin: 2rem 0 5rem 0;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .featured-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: var(--gold);
                    color: #000;
                    padding: 0.6rem 1.8rem;
                    border-radius: 12px 12px 0 0;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    position: relative;
                    z-index: 2;
                    box-shadow: 0 -5px 15px rgba(212, 175, 55, 0.2);
                }
                .gov-badge span { font-weight: 700; letter-spacing: 0.5px; }
                
                .smart-badges {
                    display: flex;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    flex-wrap: wrap;
                }
                .smart-pill {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    border-radius: 100px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .smart-pill.walk {
                    background: rgba(212, 175, 55, 0.15);
                    color: var(--gold);
                    border-color: rgba(212, 175, 55, 0.3);
                }
                .smart-pill.drive {
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff;
                }
                .smart-pill span { opacity: 0.9; }
                .featured-card {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    background: linear-gradient(145deg, rgba(28, 20, 15, 0.95), rgba(15, 10, 6, 0.98));
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    border-radius: 24px;
                    overflow: hidden;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 40px 100px rgba(0,0,0,0.6), inset 0 0 40px rgba(212, 175, 55, 0.05);
                    width: 100%;
                }
                .featured-image-container {
                    position: relative;
                    height: 100%;
                    min-height: 400px;
                }
                .featured-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0.9;
                }
                .gov-badge {
                    position: absolute;
                    top: 1.5rem;
                    left: 1.5rem;
                    background: rgba(0, 0, 0, 0.7);
                    color: var(--gold);
                    padding: 0.6rem 1rem;
                    border-radius: 8px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    border: 1px solid var(--gold);
                    backdrop-filter: blur(5px);
                }
                .featured-info {
                    padding: 3rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 1.5rem;
                }
                .tagline {
                    color: var(--gold);
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    display: block;
                    margin-bottom: 0.5rem;
                }
                .featured-title {
                    font-family: var(--ff-display);
                    font-size: 2.5rem;
                    color: #fff;
                    line-height: 1.2;
                }
                .featured-desc {
                    color: rgba(255, 255, 255, 0.7);
                    line-height: 1.8;
                    font-size: 1.05rem;
                }
                .featured-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin: 0.5rem 0;
                }
                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 0.9rem;
                }
                .gov-seal {
                    width: 16px;
                    height: 16px;
                    border: 2px solid var(--gold);
                    border-radius: 50%;
                    padding: 2px;
                }
                .seal-inner {
                    width: 100%;
                    height: 100%;
                    background: var(--gold);
                    border-radius: 50%;
                }
                .btn-featured-booking {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    background: linear-gradient(to right, #D4AF37, #F5E0A3);
                    color: #000;
                    padding: 1.2rem 2.5rem;
                    border-radius: 12px;
                    font-weight: 800;
                    text-decoration: none;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
                    width: fit-content;
                }
                .btn-featured-booking.secondary {
                    background: rgba(255, 255, 255, 0.05);
                    color: var(--gold);
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    backdrop-filter: blur(10px);
                }
                .btn-featured-booking:hover {
                    transform: translateY(-5px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(212, 175, 55, 0.4);
                    background: #fff;
                    color: #000;
                }
                .btn-featured-booking.secondary:hover {
                    background: rgba(212, 175, 55, 0.1);
                    border-color: var(--gold);
                    color: #fff;
                }

                @media (max-width: 992px) {
                    .header-section { padding-top: 130px; margin-bottom: 3rem; }
                    .featured-stay-section { margin-top: 1rem; align-items: center; }
                    .featured-badge { border-radius: 12px 12px 0 0; width: fit-content; text-align: center; }
                    .featured-card { display: flex; flex-direction: column; background: #0f0a06; border-radius: 24px; }
                    .featured-image-container { height: 280px; min-height: 280px; width: 100%; position: relative; }
                    .featured-image { height: 100%; width: 100%; object-fit: cover; }
                    .featured-info { padding: 2.5rem 1.5rem; gap: 1rem; background: #0f0a06; }
                    .featured-title { font-size: 1.8rem; text-align: center; }
                    .featured-desc { font-size: 0.9rem; line-height: 1.6; text-align: center; }
                    .featured-meta { align-items: center; }
                    .featured-meta .smart-badges { justify-content: center; }
                    .featured-actions { 
                        display: flex; 
                        flex-direction: column;
                        gap: 1rem;
                        width: 100%; 
                        margin-top: 1rem; 
                    }
                    .btn-featured-booking { width: 100%; padding: 1rem; }
                }
            `}</style>
        </div>
    );
}

function HotelGlassCard({ hotel, delay, t }) {
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleDirections = () => {
        if (hotel.mapsLink) {
            window.open(hotel.mapsLink, '_blank');
            return;
        }
        const destination = encodeURIComponent(`${t(`hotel.${hotel.id}.name`)}, Chittorgarh`);
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        setSending(true);
        setStatus(null);

        try {
            const res = await fetch('/api/send-details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    placeName: t(`hotel.${hotel.id}.name`),
                    description: t(`hotel.${hotel.id}.desc`),
                    link: hotel.mmtUrl,
                    image: hotel.image,
                    time: t(`hotel.${hotel.id}.rooms`),
                    dist: hotel.distStation,
                    category: 'stay'
                }),
            });

            if (res.ok) {
                setStatus('success');
                setTimeout(() => {
                    setShowEmailModal(false);
                    setStatus(null);
                    setEmail('');
                }, 2000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            <div className={`glass-card reveal reveal-delay-${delay} ${isVisible ? 'visible' : ''}`}>
                <div className="card-image-wrapper">
                    {hotel.image ? (
                        <img src={hotel.image} alt={t(`hotel.${hotel.id}.name`)} className="card-image" />
                    ) : (
                        <div className="hotel-img-placeholder">
                            {hotel.imgSymbol}
                        </div>
                    )}
                    <div className="rating-badge">{t("lbl.mmt")} {hotel.rating}</div>
                </div>

                <div className="card-content">
                    <div className="hotel-meta-top">
                        <span className="hotel-stars">{hotel.stars}</span>
                    </div>

                    <h3 className="card-title">{t(`hotel.${hotel.id}.name`)}</h3>
                    <p className="card-desc">{t(`hotel.${hotel.id}.desc`)}</p>

                    <div className="card-meta">
                        <div className="smart-badges">
                            <div className="smart-pill walk">
                                <Flower size={12} />
                                <span>{hotel.walkKm} km {t("lbl.walking")}</span>
                            </div>
                            <div className="smart-pill drive">
                                <Navigation size={12} />
                                <span>{hotel.driveKm} km {t("lbl.driving")}</span>
                            </div>
                        </div>
                        <div className="meta-row">
                            <Hotel className="meta-icon" />
                            <div>
                                <span className="meta-label">{t("lbl.rooms")}</span>
                                <span className="meta-val">{t(`hotel.${hotel.id}.rooms`)}</span>
                            </div>
                        </div>
                        <div className="meta-row">
                            <MapPin className="meta-icon" />
                            <div>
                                <span className="meta-label">{t("lbl.distance")}</span>
                                <span className="meta-val">{hotel.distStation} {t("lbl.fromStation")}</span>
                            </div>
                        </div>
                    </div>

                    <div className="card-actions-row">
                        <button onClick={handleDirections} className="action-btn-directions">
                            <Navigation size={16} />
                            <span>{t("btn.getDirections", { hotel: t(`hotel.${hotel.id}.name`) })}</span>
                        </button>
                    </div>
                    
                    <div className="card-sub-actions">
                        <button onClick={() => setShowEmailModal(true)} className="action-btn-text">
                            <Share2 size={16} />
                            <span>{t("btn.shareInfo")}</span>
                        </button>
                    </div>

                    <div className="hotel-footer">
                        <div className="price-tag">
                            <span className="price-val">{hotel.price}</span>
                            <span className="price-unit">{t("lbl.perNight")}</span>
                        </div>
                        <a href={hotel.mmtUrl} target="_blank" rel="noopener noreferrer" className="read-more">
                            {t("btn.details")} <ArrowRight className="arrow" size={16} />
                        </a>
                    </div>
                </div>
            </div>

            {showEmailModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setShowEmailModal(false)}>
                            <X size={20} />
                        </button>
                        <h3 className="modal-title">{t("modal.shareTitle")}</h3>
                        <p className="modal-subtitle">{t("modal.shareSub")}</p>

                        <form onSubmit={handleSendEmail} className="email-form">
                            <input
                                type="email"
                                placeholder={t("modal.emailPlaceholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="email-input"
                            />
                            <button type="submit" className="send-btn" disabled={sending}>
                                {sending ? t("modal.sending") : <>{t("modal.send")} <Send size={16} /></>}
                            </button>
                        </form>

                        {status === 'success' && <p className="status-msg success">{t("modal.success")}</p>}
                        {status === 'error' && <p className="status-msg error">{t("modal.error")}</p>}
                    </div>
                </div>
            )}

            <style jsx>{`
                .glass-card { background: rgba(28, 20, 15, 0.65); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 20px; display: flex; flex-direction: column; transition: all 0.4s ease; backdrop-filter: blur(12px); position: relative; overflow: hidden; opacity: 0; transform: translateY(20px); }
                .glass-card.visible { opacity: 1; transform: translateY(0); }
                .glass-card:hover { background: rgba(28, 20, 15, 0.8); border-color: rgba(212, 175, 55, 0.5); transform: translateY(-10px); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
                .card-image-wrapper { width: 100%; height: 200px; overflow: hidden; }
                .card-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
                .glass-card:hover .card-image { transform: scale(1.1); }
                .hotel-img-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, #2c1a0e, #5a2a1a); display: flex; align-items: center; justify-content: center; font-size: 3.5rem; }
                .rating-badge { position: absolute; top: 1rem; right: 1rem; background: #fff; color: var(--dark); padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; }
                .card-content { padding: 2rem; flex-grow: 1; display: flex; flex-direction: column; }
                .hotel-meta-top { display: flex; justify-content: center; margin-bottom: 0.5rem; }
                .hotel-stars { color: var(--gold); font-size: 0.9rem; letter-spacing: 2px; }
                .card-title { font-family: var(--ff-display); font-size: 1.6rem; color: var(--gold); margin-bottom: 1rem; text-align: center; }
                .card-desc { 
                    font-size: 0.9rem; 
                    color: rgba(255, 255, 255, 0.8); 
                    line-height: 1.6; 
                    text-align: center; 
                    margin-bottom: 1.5rem; 
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    height: 4.8rem; /* 3 lines * 1.6 line-height */
                    flex-shrink: 0;
                }
                
                .smart-badges {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1.2rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                .smart-pill {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.45rem 0.9rem;
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                }
                .smart-pill.walk {
                    background: rgba(212, 175, 55, 0.1);
                    color: var(--gold);
                    border-color: rgba(212, 175, 55, 0.2);
                }
                .smart-pill.drive {
                    background: rgba(255, 255, 255, 0.05);
                    color: rgba(255, 255, 255, 0.9);
                }
                .smart-pill:hover {
                    transform: translateY(-2px);
                    border-color: rgba(212, 175, 55, 0.4);
                }

                .card-meta { border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 1.5rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
                .meta-row { display: flex; align-items: center; gap: 1rem; }
                :global(.meta-icon) { width: 18px; height: 18px; color: var(--gold); }
                .meta-label { display: block; font-size: 0.6rem; text-transform: uppercase; letter-spacing: 1px; color: rgba(255, 255, 255, 0.5); }
                .meta-val { display: block; font-size: 0.85rem; color: #fff; font-weight: 500; }
                .card-actions-row { display: flex; align-items: center; justify-content: center; margin-bottom: 0.75rem; }
                .action-btn-directions { 
                    background: rgba(212, 175, 55, 0.1); 
                    border: 1px solid rgba(212, 175, 55, 0.3); 
                    color: var(--gold); 
                    padding: 0.8rem; 
                    border-radius: 8px; 
                    font-size: 0.7rem; 
                    font-weight: 700; 
                    display: flex; 
                    align-items: center; 
                    gap: 0.5rem; 
                    transition: 0.3s; 
                    width: 100%; 
                    justify-content: center;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .action-btn-directions:hover { background: var(--gold); color: #000; transform: translateY(-2px); }
                .card-sub-actions { display: flex; justify-content: center; margin-bottom: 1.5rem; }
                .action-btn-text { background: transparent; color: rgba(255, 255, 255, 0.6); font-size: 0.7rem; display: flex; align-items: center; gap: 0.5rem; transition: 0.3s; }
                .action-btn-text:hover { color: var(--gold); }
                .divider-vertical { width: 1px; height: 20px; background: rgba(255, 255, 255, 0.1); }
                .hotel-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.1); }
                .price-tag { display: flex; flex-direction: column; }
                .price-val { color: var(--gold); font-weight: 700; font-size: 1.1rem; }
                .price-unit { font-size: 0.6rem; color: rgba(255, 255, 255, 0.5); }
                .read-more { color: var(--gold); font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 0.5rem; }
                .modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(5px); }
                .modal-content { background: #1a1510; border: 1px solid var(--gold); padding: 2.5rem; border-radius: 12px; width: 90%; max-width: 400px; position: relative; text-align: center; }
                .close-btn { position: absolute; top: 15px; right: 15px; color: #fff; background: none; border: none; cursor: pointer; opacity: 0.7; transition: 0.2s; }
                .close-btn:hover { opacity: 1; transform: rotate(90deg); }
                .modal-title { color: var(--gold); font-family: var(--ff-display); font-size: 1.5rem; margin-bottom: 0.5rem; }
                .modal-subtitle { color: #ccc; font-size: 0.85rem; margin-bottom: 1.5rem; }
                .email-form { display: flex; flex-direction: column; gap: 1rem; }
                .email-input { padding: 0.8rem; border-radius: 4px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); color: #fff; }
                .email-input:focus { outline: none; border-color: var(--gold); }
                .send-btn { background: var(--gold); color: #000; border: none; padding: 0.8rem; border-radius: 4px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: 0.2s; width: 100%; }
                .send-btn:hover:not(:disabled) { background: #fff; }
                .send-btn:disabled { opacity: 0.7; cursor: not-allowed; }
                .status-msg.success { color: #4ade80; margin-top: 1rem; }
                .status-msg.error { color: #f87171; margin-top: 1rem; }

                @media (max-width: 768px) {
                    .glass-card { 
                        display: flex; 
                        flex-direction: column; 
                        background: #0f0a06; 
                        margin-bottom: 2rem;
                    }
                    .card-image-wrapper { 
                        height: 220px !important; 
                        min-height: 220px;
                        width: 100%;
                        position: relative;
                        order: 1;
                    }
                    .card-content { 
                        order: 2;
                        padding: 1.5rem !important; 
                        background: #0f0a06;
                        position: relative;
                        margin-top: 0;
                    }
                    .card-title { font-size: 1.4rem; }
                    .card-desc { font-size: 0.85rem; margin-bottom: 1rem; }
                }
            `}</style>
        </>
    );
}
