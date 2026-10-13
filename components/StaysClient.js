"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from "@/context/LanguageContext";
import { Flower, Hotel, Navigation, MapPin, ArrowRight } from 'lucide-react';

export default function StaysClient() {
    const { t } = useLanguage();

    const rtdcStats = {
        name: "RTDC Hotel Panna",
        walkKm: "6.3",
        driveKm: "4.0",
        mapsLink: "https://www.google.com/maps/dir/?api=1&destination=RTDC+Hotel+Panna+Chittorgarh"
    };

    return (
        <div className="stays-page-container explore-page">
            <div className="fixed-bg"></div>

            <main className="main-content">
                <div className="content-wrapper" style={{ paddingTop: '120px' }}>
                    <header className="page-header text-center" style={{ paddingBottom: '60px' }}>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--ff-display)', color: '#2C2C2C' }}
                        >
                            {t("stays.hero.title") || "Premium Stays & Heritage Hotels"}
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ fontSize: '1.2rem', color: '#4A4A4A', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}
                        >
                            {t("stays.hero.subtitle") || "Find the perfect accommodation near Chittorgarh Fort. Experience royal heritage, modern luxury, and breathtaking views."}
                        </motion.p>
                    </header>

                    <section className="stays-content" style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto 4rem' }}>
                        <div style={{ 
                            background: 'rgba(212, 175, 55, 0.1)', 
                            padding: '40px', 
                            borderRadius: '20px', 
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                            textAlign: 'center'
                        }}>
                            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--ff-display)', color: '#D4AF37', marginBottom: '1rem' }}>{t("stays.heritage.title") || "Heritage Properties"}</h2>
                            <p style={{ color: '#2C2C2C', lineHeight: '1.6' }}>
                                {t("stays.heritage.desc") || "Immerse yourself in the rich culture and hospitality of Mewar. Detailed hotel listings and booking integrations are currently being updated to bring you the best experience."}
                            </p>
                        </div>
                    </section>

                                        {/* â•â•â• MERGED STAYS SECTION â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
                    <section className="section-pad" style={{ padding: '6rem 0' }}>
                        <div className="header-section text-center" style={{ marginBottom: '3rem' }}>
                            <span className="royal-badge-pill">{t("stays.eyebrow")}</span>
                            <h2 className="title text-gold-royal" style={{ fontSize: '2.5rem' }}>{t("stays.title")}</h2>
                            <div className="gold-divider-luxury"></div>
                        </div>

                        <div className="featured-stay-section">
                            <div className="featured-badge">
                                <Flower size={14} className="badge-icon" />
                                <span>{t("stays.featured.label")}</span>
                            </div>

                            <div className="featured-card">
                                <div className="featured-image-container">
                                    <Image src="/panna.png" alt="Hotel Panna" className="featured-image" width={1200} height={800} style={{ objectFit: "cover" }} />
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
                                        <p className="reference-text" style={{ textAlign: 'left', marginTop: '0.25rem', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>{t("lbl.fromFortApprox")}</p>
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
            </main>
        
            <style jsx global>{`
                /* STAYS SECTION */
                .featured-stay-section {
                    margin: 2rem 0 4rem 0;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    max-width: 960px;
                    margin: 0 auto;
                    padding: 0;
                }
                .featured-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    background: linear-gradient(135deg, #D4AF37, #B8860B);
                    color: #0A0806;
                    padding: 0.5rem 1.5rem;
                    border-radius: 10px 10px 0 0;
                    font-size: 0.72rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    position: relative;
                    z-index: 2;
                    box-shadow: 0 -4px 12px rgba(212, 175, 55, 0.25);
                }
                .featured-card {
                    display: grid;
                    grid-template-columns: 1.15fr 1fr;
                    background: var(--ivory, #FAF7F2);
                    border: 1px solid var(--border-light, rgba(20, 14, 8, 0.1));
                    border-radius: var(--radius-lg, 16px);
                    overflow: hidden;
                    box-shadow: var(--shadow-md, 0 8px 24px rgba(20, 14, 8, 0.08));
                    width: 100%;
                }
                .featured-image-container {
                    position: relative;
                    height: 100%;
                    min-height: 300px;
                }
                .featured-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0.9;
                }
                .gov-badge {
                    position: absolute;
                    top: 1.2rem;
                    left: 1.2rem;
                    background: var(--sandstone, #F5F0E6);
                    color: var(--charcoal, #2C2C2C);
                    padding: 0.45rem 1rem;
                    border-radius: 999px;
                    font-size: 0.65rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    border: 1px solid var(--border-light, rgba(20, 14, 8, 0.1));
                    box-shadow: var(--shadow-sm, 0 4px 12px rgba(20, 14, 8, 0.05));
                }
                .featured-info {
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 1.1rem;
                    background: var(--ivory, #FAF7F2);
                }
                .tagline {
                    color: var(--gold, #D4AF37);
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    font-size: 0.68rem;
                    font-weight: 700;
                    display: block;
                    margin-bottom: 0.2rem;
                }
                .featured-title {
                    font-family: var(--ff-display), serif;
                    font-size: 1.95rem;
                    color: var(--charcoal, #2C2C2C);
                    line-height: 1.15;
                    font-weight: 800;
                }
                .featured-desc {
                    color: var(--text-muted, rgba(44, 44, 44, 0.7));
                    line-height: 1.6;
                    font-size: 0.88rem;
                    font-weight: 400;
                }
                .smart-badges {
                    display: flex;
                    gap: 0.75rem;
                    margin-bottom: 0.4rem;
                    flex-wrap: wrap;
                }
                .smart-pill {
                    display: flex;
                    align-items: center;
                    gap: 0.45rem;
                    padding: 0.4rem 0.85rem;
                    border-radius: 999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    background: var(--sandstone, #F5F0E6);
                    border: 1px solid var(--border-light, rgba(20, 14, 8, 0.1));
                    color: var(--charcoal, #2C2C2C);
                }
                .smart-pill.walk {
                    color: var(--gold, #D4AF37);
                }
                .smart-pill.drive {
                    color: var(--charcoal, #2C2C2C);
                }
                .featured-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.65rem;
                    color: var(--text-muted, rgba(44, 44, 44, 0.7));
                    font-size: 0.82rem;
                }
                .gov-seal {
                    width: 14px;
                    height: 14px;
                    border: 1.5px solid #D4AF37;
                    border-radius: 50%;
                    padding: 2px;
                }
                .seal-inner {
                    width: 100%;
                    height: 100%;
                    background: #D4AF37;
                    border-radius: 50%;
                }
                .featured-actions {
                    display: flex;
                    gap: 0.75rem;
                    margin-top: 0.5rem;
                }
                .btn-featured-booking {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.6rem;
                    background: linear-gradient(135deg, #D4AF37, #B8860B);
                    color: #0A0806;
                    padding: 0.7rem 1.3rem;
                    border-radius: 10px;
                    font-weight: 800;
                    text-decoration: none;
                    font-size: 0.78rem;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    transition: all 0.25s ease;
                    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
                }
                .btn-featured-booking:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 22px rgba(212, 175, 55, 0.45);
                    background: #FFF;
                    color: #0A0806;
                }
                .btn-featured-booking.secondary {
                    background: var(--sandstone, #F5F0E6);
                    color: var(--charcoal, #2C2C2C);
                    border: 1px solid var(--border-light, rgba(20, 14, 8, 0.1));
                    box-shadow: none;
                }
                .btn-featured-booking.secondary:hover {
                    background: var(--charcoal, #2C2C2C);
                    border-color: var(--charcoal, #2C2C2C);
                    color: var(--ivory, #FAF7F2);
                }
                .search-other-container {
                    display: flex;
                    justify-content: center;
                    margin-top: 2.5rem;
                }
                .search-other-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    background: var(--sandstone, #F5F0E6);
                    color: var(--charcoal, #2C2C2C);
                    padding: 0.75rem 2rem;
                    border-radius: 999px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    border: 1px solid var(--border-light, rgba(20, 14, 8, 0.1));
                    box-shadow: var(--shadow-sm, 0 4px 12px rgba(20, 14, 8, 0.05));
                }
                .search-other-link:hover {
                    background: var(--charcoal, #2C2C2C);
                    color: #FFF;
                }
                .royal-badge-pill {
                    display: inline-block;
                    background: var(--sandstone, #F5F0E6);
                    color: var(--gold, #D4AF37);
                    padding: 0.4rem 1.2rem;
                    border-radius: 999px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin-bottom: 1rem;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                }
                .text-gold-royal {
                    color: var(--charcoal, #2C2C2C);
                }
                .gold-divider-luxury {
                    height: 2px;
                    width: 60px;
                    background: #D4AF37;
                    margin: 1rem auto;
                }

                @media (max-width: 900px) {
                    .featured-card {
                        grid-template-columns: 1fr;
                    }
                    .featured-image-container {
                        min-height: 280px;
                    }
                    .featured-info {
                        padding: 1.5rem;
                    }
                    .featured-title {
                        font-size: 1.6rem;
                    }
                    .featured-actions {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                    .btn-featured-booking {
                        width: 100%;
                    }
                    .smart-badges {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.5rem;
                    }
                    .smart-pill {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}
