"use client";
import Image from 'next/image';

import { useLanguage } from "@/context/LanguageContext";
import { Flower, ArrowRight, MapPin, Navigation, Hotel } from 'lucide-react';

export default function StaysClient() {
    const { t } = useLanguage();

    const rtdcStats = {
        name: "RTDC Hotel Panna",
        walkKm: "6.3",
        driveKm: "4.0",
        mapsLink: "https://www.google.com/maps/dir/?api=1&destination=RTDC+Hotel+Panna+Chittorgarh"
    };

    return (
        <div className="stays-page">
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
            margin-bottom: 2rem;
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
            margin-bottom: 1rem;
            text-shadow: 0 4px 20px rgba(0,0,0,0.5);
            text-align: center;
            color: var(--gold);
        }
        .sub-title {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.7);
            text-align: center;
            max-width: 600px;
            margin: 0 auto 2rem;
            font-style: italic;
        }
        .divider {
            width: 100px;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--gold), transparent);
            margin: 0 auto;
        }
        :global(.reference-text) {
            font-size: 0.65rem;
            color: rgba(255, 255, 255, 0.5);
            font-style: italic;
            margin: 0;
            line-height: 1;
        }
        
        .featured-stay-section {
            margin: 2rem 0 5rem 0;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 1rem;
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
        .featured-card {
            display: grid;
            grid-template-columns: 1.2fr 1.1fr;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 32px;
            overflow: hidden;
            backdrop-filter: blur(30px);
            box-shadow: 0 30px 80px rgba(0,0,0,0.4), inset 0 0 20px rgba(255, 255, 255, 0.02);
            width: 100%;
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .featured-card:hover {
            border-color: rgba(212, 175, 55, 0.3);
            background: rgba(255, 255, 255, 0.05);
            box-shadow: 0 40px 100px rgba(0,0,0,0.5);
        }
        .featured-image-container {
            position: relative;
            height: 100%;
            min-height: 480px;
        }
        .featured-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.85;
            transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .featured-card:hover .featured-image {
            transform: scale(1.05);
        }
        .gov-badge {
            position: absolute;
            top: 1.5rem;
            left: 1.5rem;
            background: rgba(0, 0, 0, 0.5);
            color: var(--gold);
            padding: 0.6rem 1.2rem;
            border-radius: 100px;
            font-size: 0.7rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.6rem;
            border: 1px solid rgba(212, 175, 55, 0.3);
            backdrop-filter: blur(10px);
            letter-spacing: 1px;
        }
        .featured-info {
            padding: 4rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 1.8rem;
        }
        .tagline {
            color: rgba(212, 175, 55, 0.8);
            text-transform: uppercase;
            letter-spacing: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            display: block;
            margin-bottom: 0.25rem;
        }
        .featured-title {
            font-family: var(--ff-display);
            font-size: 3rem;
            color: rgba(255, 255, 255, 0.95);
            line-height: 1.1;
        }
        .featured-desc {
            color: rgba(255, 255, 255, 0.6);
            line-height: 1.9;
            font-size: 1.1rem;
            font-weight: 300;
        }
        .smart-badges {
            display: flex;
            gap: 1rem;
            margin-bottom: 0.5rem;
            flex-wrap: wrap;
        }
        .smart-pill {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            padding: 0.6rem 1.2rem;
            border-radius: 100px;
            font-size: 0.85rem;
            font-weight: 500;
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: rgba(255, 255, 255, 0.8);
            transition: all 0.3s ease;
        }
        .smart-pill.walk {
            background: rgba(212, 175, 55, 0.05);
            color: rgba(212, 175, 55, 0.9);
            border-color: rgba(212, 175, 55, 0.15);
        }
        .featured-meta {
            display: flex;
            flex-direction: column;
            gap: 1.4rem;
            margin: 0.5rem 0;
        }
        .meta-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: rgba(255, 255, 255, 0.7);
            font-size: 1rem;
            font-weight: 300;
        }
        .gov-seal {
            width: 18px;
            height: 18px;
            border: 1.5px solid rgba(212, 175, 55, 0.5);
            border-radius: 50%;
            padding: 3px;
        }
        .seal-inner {
            width: 100%;
            height: 100%;
            background: rgba(212, 175, 55, 0.5);
            border-radius: 50%;
        }
        .featured-actions {
            display: flex;
            gap: 1.2rem;
            margin-top: 1rem;
        }
        .btn-featured-booking {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            background: linear-gradient(135deg, #D4AF37, #C5A028);
            color: #000;
            padding: 1.2rem 2.5rem;
            border-radius: 16px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);
            flex: 1.2;
            letter-spacing: 0.5px;
        }
        .btn-featured-booking.secondary {
            background: rgba(255, 255, 255, 0.03);
            color: rgba(212, 175, 55, 0.9);
            border: 1px solid rgba(212, 175, 55, 0.2);
            backdrop-filter: blur(10px);
            flex: 1;
        }
        .btn-featured-booking:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(212, 175, 55, 0.3);
            background: #fff;
            color: #000;
        }
        .btn-featured-booking.secondary:hover {
            background: rgba(212, 175, 55, 0.1);
            border-color: var(--gold);
        }

        .search-other-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            background: rgba(255, 255, 255, 0.02);
            color: rgba(212, 175, 55, 0.6);
            padding: 1.2rem 3.5rem;
            border-radius: 100px;
            font-size: 0.95rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            border: 1px solid rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            width: fit-content;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .search-other-link:hover {
            background: rgba(212, 175, 55, 0.05);
            border-color: rgba(212, 175, 55, 0.3);
            transform: translateY(-5px);
            box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            color: var(--gold);
        }

        .search-other-container {
            display: flex;
            justify-content: center;
            margin-top: 4rem;
            margin-bottom: 12rem;
            position: relative;
            z-index: 5;
            padding: 0 1rem;
        }

        @media (max-width: 992px) {
            .header-section { padding-top: 130px; }
            .featured-card { grid-template-columns: 1fr; }
            .featured-image-container { height: 300px; min-height: 300px; }
            .featured-info { padding: 2.5rem 1.5rem; text-align: center; }
            .featured-title { font-size: 2rem; }
            .featured-meta { align-items: center; }
            .smart-badges { justify-content: center; }
            .featured-actions { flex-direction: column; }
            .btn-featured-booking { width: 100%; }
        }
      `}</style>

            <header className="header-section">
                <span className="eyebrow">{t("stays.eyebrow")}</span>
                <h1 className="title">{t("stays.title")}</h1>
                <p className="sub-title">{t("stays.sub")}</p>
                <div className="divider"></div>
            </header>

            <section className="section-pad" style={{ paddingTop: 0 }}>
                <div className="featured-stay-section">
                    <div className="featured-badge">
                        <Flower size={14} className="badge-icon" />
                        <span>{t("stays.featured.label")}</span>
                    </div>
                    
                    <div className="featured-card">
                        <div className="featured-image-container">
                            <Image src="/panna.png" alt="Hotel Panna" className="featured-image"  width={1200} height={800} style={{ objectFit: "cover" }}/>
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
                                <p className="reference-text" style={{ textAlign: 'left', marginTop: '0.25rem' }}>{t("lbl.fromFortApprox")}</p>
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
                                    href="https://rtdc.tourism.rajasthan.gov.in/Client/HotelDetails.aspx?HotelID=CHITTORGARHPanna" 
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

                <div className="search-other-container">
                    <a 
                        href="https://www.google.com/search?q=Chittorgarh+Hotels" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="search-other-link"
                    >
                        <span>{t("stays.searchOther")}</span>
                        <ArrowRight size={14} />
                    </a>
                </div>
            </section>
        </div>
    );
}
