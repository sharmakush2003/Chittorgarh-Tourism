"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Flower, Calendar, MapPin, ArrowRight, Share2, Navigation, X, Send, Hotel } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Stays() {
    const { t } = useLanguage();

    const hotels = [
        {
            id: "h1",
            imgSymbol: "🏰",
            stars: "★★★★",
            rating: "4.1/5",
            price: "₹5,500",
            distFort: "1.5 km",
            distStation: "6.0 km",
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
            distStation: "4.2 km",
            image: "/anandam.jpg",
            mmtUrl: "https://www.makemytrip.com/hotels/shree_anandam_resort-details-chittorgarh.html"
        },
        {
            id: "h3",
            imgSymbol: "💎",
            stars: "★★★",
            rating: "4.2/5",
            price: "₹3,800",
            distFort: "2.0 km",
            distStation: "2.8 km",
            image: "/pride_of_chittor.jpg",
            mmtUrl: "https://www.makemytrip.com/hotels/hotel_pride_of_chittor-details-chittorgarh.html"
        },
        {
            id: "h4",
            imgSymbol: "✨",
            stars: "★★★",
            rating: "3.9/5",
            price: "₹3,200",
            distFort: "1.7 km",
            distStation: "1.5 km",
            image: "/grand_chittor.webp",
            mmtUrl: "https://www.makemytrip.com/hotels/hotel_the_grand_chittor-details-chittorgarh.html"
        }
    ];

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
            padding-top: 120px;
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
                <span className="eyebrow">{t("stays.eyebrow") || "Royal Hospitality"}</span>
                <h1 className="title">{t("stays.title")}</h1>
                <div className="divider"></div>
            </header>

            {/* ═══ HOTELS CONTENT ════════════════════════ */}
            <section className="section-pad" style={{ paddingTop: 0 }}>
                <div className="container">
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
                    time: t(`hotel.${hotel.id}.rooms`), // Using time field for rooms
                    dist: hotel.distStation
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
                    <div className="rating-badge">MakeMyTrip: {hotel.rating}</div>
                </div>

                <div className="card-content">
                    <div className="hotel-meta-top">
                        <span className="hotel-stars">{hotel.stars}</span>
                    </div>

                    <h3 className="card-title">{t(`hotel.${hotel.id}.name`)}</h3>
                    <p className="card-desc">{t(`hotel.${hotel.id}.desc`)}</p>

                    <div className="card-meta">
                        <div className="meta-row">
                            <Hotel className="meta-icon" />
                            <div>
                                <span className="meta-label">{t("lbl.rooms") || "ROOM TYPES"}</span>
                                <span className="meta-val">{t(`hotel.${hotel.id}.rooms`)}</span>
                            </div>
                        </div>
                        <div className="meta-row">
                            <MapPin className="meta-icon" />
                            <div>
                                <span className="meta-label">{t("lbl.distance")}</span>
                                <span className="meta-val">{hotel.distStation} from Station</span>
                            </div>
                        </div>
                    </div>

                    <div className="card-actions-row">
                        <button onClick={handleDirections} className="action-btn-text">
                            <Navigation size={16} />
                            <span>Directions</span>
                        </button>
                        <div className="divider-vertical"></div>
                        <button onClick={() => setShowEmailModal(true)} className="action-btn-text">
                            <Share2 size={16} />
                            <span>Share Info</span>
                        </button>
                    </div>

                    <div className="hotel-footer">
                        <div className="price-tag">
                            <span className="price-val">{hotel.price}</span>
                            <span className="price-unit">/ night</span>
                        </div>
                        <a href={hotel.mmtUrl} target="_blank" rel="noopener noreferrer" className="read-more">
                            Details <ArrowRight className="arrow" size={16} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Email Modal */}
            {showEmailModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setShowEmailModal(false)}>
                            <X size={20} />
                        </button>
                        <h3 className="modal-title">Share Hotel Details</h3>
                        <p className="modal-subtitle">Send details for <strong>{t(`hotel.${hotel.id}.name`)}</strong> to your email.</p>

                        <form onSubmit={handleSendEmail} className="email-form">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="email-input"
                            />
                            <button type="submit" className="send-btn" disabled={sending}>
                                {sending ? 'Sending...' : <>Send <Send size={16} /></>}
                            </button>
                        </form>

                        {status === 'success' && <p className="status-msg success">Sent successfully!</p>}
                        {status === 'error' && <p className="status-msg error">Failed to send.</p>}
                    </div>
                </div>
            )}

            <style jsx>{`
                .glass-card {
                    background: rgba(28, 20, 15, 0.65);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 20px;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.4s ease;
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    position: relative;
                    overflow: hidden;
                    opacity: 0;
                    transform: translateY(20px);
                }

                .glass-card.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                .glass-card:hover {
                    background: rgba(28, 20, 15, 0.8);
                    border-color: rgba(212, 175, 55, 0.5);
                    transform: translateY(-10px);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
                }

                .card-image-wrapper {
                    width: 100%;
                    height: 200px;
                    overflow: hidden;
                }

                .card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .glass-card:hover .card-image {
                    transform: scale(1.1);
                }

                .hotel-img-placeholder {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #2c1a0e, #5a2a1a);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(255, 255, 255, 0.2);
                    font-size: 3.5rem;
                    position: relative;
                }

                .rating-badge {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: #fff;
                    color: var(--dark);
                    padding: 0.25rem 0.75rem;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                }

                .card-content {
                    padding: 2rem;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .hotel-meta-top {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 0.5rem;
                }

                .hotel-stars {
                    color: var(--gold);
                    font-size: 0.9rem;
                    letter-spacing: 2px;
                }

                .card-title {
                    font-family: var(--ff-display);
                    font-size: 1.6rem;
                    color: var(--gold);
                    margin-bottom: 1rem;
                    text-align: center;
                }

                .card-desc {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.6;
                    text-align: center;
                    margin-bottom: 1.5rem;
                    flex-grow: 1;
                }

                .card-meta {
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding-top: 1.5rem;
                    margin-bottom: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .meta-row {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                :global(.meta-icon) {
                    width: 18px;
                    height: 18px;
                    color: var(--gold);
                }

                .meta-label {
                    display: block;
                    font-size: 0.6rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: rgba(255, 255, 255, 0.5);
                }

                .meta-val {
                    display: block;
                    font-size: 0.85rem;
                    color: #fff;
                    font-weight: 500;
                }

                .card-actions-row {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                    background: rgba(255, 255, 255, 0.03);
                    padding: 0.8rem;
                    border-radius: 8px;
                }

                .action-btn-text {
                    background: transparent;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: 0.3s;
                }

                .action-btn-text:hover {
                    color: var(--gold);
                }

                .divider-vertical {
                    width: 1px;
                    height: 20px;
                    background: rgba(255, 255, 255, 0.1);
                }

                .hotel-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: auto;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                .price-tag {
                    display: flex;
                    flex-direction: column;
                }

                .price-val {
                    color: var(--gold);
                    font-weight: 700;
                    font-size: 1.1rem;
                }

                .price-unit {
                    font-size: 0.6rem;
                    color: rgba(255, 255, 255, 0.5);
                }

                .read-more {
                    color: var(--gold);
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                /* Reuse Modal Styles from Explore Page */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    backdrop-filter: blur(5px);
                }
                .modal-content {
                    background: #1a1510;
                    border: 1px solid var(--gold);
                    padding: 2.5rem;
                    border-radius: 12px;
                    width: 90%;
                    max-width: 400px;
                    position: relative;
                    text-align: center;
                }
                .close-btn {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    color: #fff;
                }
                .modal-title {
                    color: var(--gold);
                    font-family: var(--ff-display);
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                }
                .modal-subtitle {
                    color: #ccc;
                    font-size: 0.85rem;
                    margin-bottom: 1.5rem;
                }
                .email-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .email-input {
                    padding: 0.8rem;
                    border-radius: 4px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: #fff;
                }
                .send-btn {
                    background: var(--gold);
                    padding: 0.8rem;
                    border-radius: 4px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }
                .status-msg.success { color: #4ade80; margin-top: 1rem; }
                .status-msg.error { color: #f87171; margin-top: 1rem; }
            `}</style>
        </>
    );
}
