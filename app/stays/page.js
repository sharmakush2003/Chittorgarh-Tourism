"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Stays() {
    const { t } = useLanguage();

    const hotels = [
        {
            id: "h1",
            imgSymbol: "🏰",
            stars: "★★★★",
            rating: "4.1/5",
            price: "₹5,500",
            distFort: "12.5 km",
            distStation: "6.0 km",
            mmtUrl: "https://www.makemytrip.com/hotels/kesarbagh_palace-details-chittorgarh.html"
        },
        {
            id: "h2",
            imgSymbol: "🌴",
            stars: "★★★★",
            rating: "3.5/5",
            price: "₹4,200",
            distFort: "12.5 km",
            distStation: "4.2 km",
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

        /* Gradient overlay for hotel images if no real images */
        .hotel-img-placeholder {
            width: 100%;
            height: 240px;
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
            color: var(--text);
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 600;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .dist-tag {
            background: rgba(0,0,0,0.05);
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-size: 0.7rem;
            margin-right: 0.5rem;
            display: inline-block;
            margin-top: 0.5rem;
        }
      `}</style>

            {/* ═══ PAGE HEADER ═══════════════════════════ */}
            <header className="hero page-header" style={{ background: 'transparent', minHeight: '50vh' }}>
                <div className="hero-content">
                    <h1>{t("stays.title")}</h1>
                    <p className="hero-sub">
                        {t("stays.sub")}
                    </p>
                </div>
            </header>

            {/* ═══ HOTELS CONTENT ════════════════════════ */}
            <section className="section-pad">
                <div className="container">
                    <div className="hotel-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>

                        {hotels.map((hotel, index) => (
                            <div key={hotel.id} className={`hotel-card reveal reveal-delay-${index}`} style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '4px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.3s' }}>
                                <div className="hotel-img-placeholder">
                                    {hotel.imgSymbol}
                                    <div className="rating-badge">MakeMyTrip: {hotel.rating}</div>
                                </div>
                                <div className="hotel-body" style={{ padding: '2rem' }}>
                                    <div className="hotel-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                                        <span className="hotel-stars" style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>{hotel.stars}</span>
                                    </div>

                                    <h3 className="hotel-name" style={{ fontFamily: 'var(--ff-display)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem' }}>
                                        {t(`hotel.${hotel.id}.name`) || "Hotel Name"}
                                    </h3>

                                    <div style={{ marginBottom: '1rem' }}>
                                        <span className="dist-tag">🏰 {hotel.distFort} from Fort</span>
                                        <span className="dist-tag">🚂 {hotel.distStation} from Station</span>
                                    </div>

                                    <p className="hotel-desc" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 300, marginBottom: '1.25rem', lineHeight: 1.7 }}>
                                        {t(`hotel.${hotel.id}.desc`)}
                                    </p>
                                    <ul className="hotel-amenities" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
                                        <li>Wifi</li>
                                        <li>Parking</li>
                                        <li>Dining</li>
                                    </ul>
                                    <div className="hotel-foot" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1rem' }}>
                                        <span className="hotel-price" style={{ fontFamily: 'var(--ff-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--terracotta)' }}>
                                            {hotel.price} <small style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 300 }}>/ night</small>
                                        </span>
                                        <a
                                            href={hotel.mmtUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-gold-sm"
                                            style={{
                                                padding: '0.6rem 1.2rem',
                                                fontSize: '0.7rem',
                                                background: 'transparent',
                                                border: '1px solid var(--gold)',
                                                color: 'var(--gold)',
                                                borderRadius: '2px',
                                                cursor: 'pointer',
                                                textDecoration: 'none',
                                                display: 'inline-block'
                                            }}
                                        >
                                            {t("btn.details")}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </div>
    );
}
