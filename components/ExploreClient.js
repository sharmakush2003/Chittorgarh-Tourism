"use client";
import Image from 'next/image';
import { useLanguage } from "@/context/LanguageContext";
import {
    Flower, Calendar, MapPin, ArrowRight, Ticket, Navigation, X, Send, Hotel, Search, Sparkles
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { triggerHaptic } from "@/lib/haptics";
import Link from 'next/link';

export default function ExploreClient() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const rtdcStats = {
        name: "RTDC Hotel Panna",
        walkKm: "6.3",
        driveKm: "4.0",
        mapsLink: "https://www.google.com/maps/dir/?api=1&destination=RTDC+Hotel+Panna+Chittorgarh"
    };

    const attractionsData = [
        {
            id: 'fort',
            title: t("attr.fort.name"),
            desc: t("attr.fort.desc"),
            time: t("attr.fort.time"),
            dist: t("attr.fort.dist"),
            delay: 0,
            link: "/chittorgarh-fort",
            image: "/hero_bg.png",
            bookingLink: "https://eticket.webfront.in/asi/quick/chf",
            category: "forts",
            badge: "UNESCO World Heritage"
        },
        {
            id: 'vijay',
            title: t("attr.vijay.name"),
            desc: t("attr.vijay.desc"),
            time: t("attr.vijay.time"),
            dist: t("attr.vijay.dist"),
            delay: 1,
            link: "/vijay-stambh",
            image: "/vijay_stambh.jpg",
            imgPos: "top",
            category: "forts",
            badge: "Tower of Victory"
        },
        {
            id: 'kirti',
            title: t("attr.kirti.name"),
            desc: t("attr.kirti.desc"),
            time: t("attr.kirti.time"),
            dist: t("attr.kirti.dist"),
            delay: 2,
            link: "/kirti-stambh",
            image: "/kirti_stambha.jpg",
            imgPos: "top",
            category: "forts",
            badge: "Tower of Fame"
        },
        {
            id: 'kumbha_palace',
            title: t("attr.kumbha_palace.name"),
            desc: t("attr.kumbha_palace.desc"),
            time: t("attr.kumbha_palace.time"),
            dist: t("attr.kumbha_palace.dist"),
            delay: 3,
            link: "/kumbha-palace",
            image: "/rana_kumbha_palace.jpg",
            category: "forts",
            badge: "Royal Residence"
        },
        {
            id: 'padmini',
            title: t("padmini.hero.title"),
            desc: t("padmini.hero.desc"),
            time: "10:00 AM - 5:00 PM",
            dist: "Within Fort",
            delay: 4,
            link: "/padmini-palace",
            image: "/Each page Pics/Fort pics/Padmini Palace.jpg",
            category: "forts",
            badge: "Water Palace"
        },
        {
            id: 'fateh',
            title: t("attr.fateh.name"),
            desc: t("attr.fateh.desc"),
            time: t("attr.fateh.time"),
            dist: t("attr.fateh.dist"),
            delay: 5,
            link: "/fateh-prakash",
            image: "/fateh_prakash_palace.jpg",
            bookingLink: "https://obms-tourist.rajasthan.gov.in/place-details/Government-Museum-Chittorgarh",
            category: "forts",
            badge: "Govt Museum"
        },
        {
            id: 'gaumukh',
            title: t("attr.gaumukh.name"),
            desc: t("attr.gaumukh.desc"),
            time: t("attr.gaumukh.time"),
            dist: t("attr.gaumukh.dist"),
            delay: 6,
            link: "/gaumukh",
            image: "/gaumukh_reservoir.jpg",
            category: "nature",
            badge: "Sacred Water Reservoir"
        },
        {
            id: 'kalika',
            title: t("attr.kalika.name"),
            desc: t("attr.kalika.desc"),
            time: t("attr.kalika.time"),
            dist: t("attr.kalika.dist"),
            delay: 7,
            link: "/kalika-temple",
            image: "/kalika_mata_temple.jpg",
            category: "temples",
            badge: "8th-Century Shrine"
        },
        {
            id: 'meera',
            title: t("attr.meera.name"),
            desc: t("attr.meera.desc"),
            time: t("attr.meera.time"),
            dist: t("attr.meera.dist"),
            delay: 8,
            link: "/meera-bai-temple",
            image: "/meerabai_temple.jpg",
            category: "temples",
            badge: "Devotional Heritage"
        },
        {
            id: 'kumbha_shyam',
            title: t("attr.kumbha_shyam.name"),
            desc: t("attr.kumbha_shyam.desc"),
            time: t("attr.kumbha_shyam.time"),
            dist: t("attr.kumbha_shyam.dist"),
            delay: 9,
            link: "/kumbha-shyam",
            image: "/kumbha_shyam_temple.jpg",
            category: "temples",
            badge: "Rajput Architecture"
        },
        {
            id: 'jain',
            title: t("attr.jain.name"),
            desc: t("attr.jain.desc"),
            time: t("attr.jain.time"),
            dist: t("attr.jain.dist"),
            delay: 10,
            link: "/jain-temples",
            image: "/jain_temples.jpg",
            category: "temples",
            badge: "27 Ancient Shrines"
        },
        {
            id: 'ratan',
            title: t("attr.ratan.name"),
            desc: t("attr.ratan.desc"),
            time: t("attr.ratan.time"),
            dist: t("attr.ratan.dist"),
            delay: 11,
            link: "/ratan-palace",
            image: "/ratan_singh_palace.jpg",
            category: "forts",
            badge: "Ratneshwar Lake View"
        },
        {
            id: 'light',
            title: t("attr.light.name"),
            desc: t("attr.light.desc"),
            time: t("attr.light.time"),
            dist: t("attr.light.dist"),
            delay: 12,
            link: "/light-and-sound-show",
            image: "/light_sound_show.jpg",
            bookingLink: "https://obms-tourist.rajasthan.gov.in/place-details/Chittorgarh-Fort-light-and-sound-show",
            category: "shows",
            badge: "Evening Spectacle"
        },
        {
            id: 'sanwaliya',
            title: t("attr.sanwaliya.name"),
            desc: t("attr.sanwaliya.desc"),
            time: t("attr.sanwaliya.time"),
            dist: t("attr.sanwaliya.dist"),
            delay: 13,
            link: "/sanwaliya",
            image: "/images/sanwaliya_idol.jpg",
            category: "temples",
            badge: "Mandaphiya Pilgrimage"
        },
        {
            id: 'menal',
            title: t("attr.menal.name"),
            desc: t("attr.menal.desc"),
            time: t("attr.menal.time"),
            dist: t("attr.menal.dist"),
            delay: 14,
            link: "/menal",
            image: "/menal_waterfall.jpg",
            category: "nature",
            badge: "Scenic Gorge & Falls"
        },
        {
            id: 'nagari',
            title: t("attr.nagari.name"),
            desc: t("attr.nagari.desc"),
            time: t("attr.nagari.time"),
            dist: t("attr.nagari.dist"),
            delay: 15,
            link: "/nagari",
            image: "/images/Nagari.jpg",
            category: "nature",
            badge: "Ancient Archaeological Site"
        },
        {
            id: 'bassi',
            title: t("attr.bassi.name"),
            desc: t("attr.bassi.desc"),
            time: t("attr.bassi.time"),
            dist: t("attr.bassi.dist"),
            delay: 16,
            link: "/bassi",
            image: "/images/bassi_path.jpg",
            category: "nature",
            badge: "Wildlife Sanctuary"
        },
        {
            id: 'sitamata',
            title: t("attr.sitamata.name"),
            desc: t("attr.sitamata.desc"),
            time: t("attr.sitamata.time"),
            dist: t("attr.sitamata.dist"),
            delay: 17,
            link: "/sitamata",
            image: "/images/sitamata_1.jpg",
            category: "nature",
            badge: "Flying Squirrel Haven"
        }
    ];

    const categories = [
        { id: 'all', label: 'All Landmarks', icon: Sparkles },
        { id: 'forts', label: 'Fort & Palaces', icon: Hotel },
        { id: 'temples', label: 'Sacred Temples', icon: Flower },
        { id: 'nature', label: 'Water & Nature', icon: MapPin },
        { id: 'shows', label: 'Shows & Events', icon: Ticket }
    ];

    const filteredAttractions = useMemo(() => {
        return attractionsData.filter(item => {
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            const matchesSearch = searchQuery.trim() === '' ||
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.desc.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <div className="explore-page">
            {/* ═══ FIXED BACKGROUND ══════════════════════ */}
            <div className="fixed-bg"></div>
            <div className="bg-overlay"></div>

            {/* ═══ MAIN CONTENT ═══════════════════════════ */}
            <main className="main-content">
                {/* HERO HEADER */}
                <header className="header-section text-center">
                    <div className="royal-badge-pill">
                        <Sparkles size={14} className="sparkle-gold" />
                        <span>OFFICIAL TOURISM DESTINATIONS</span>
                    </div>
                    <h1 className="title text-gold-royal">{t("exp.header")}</h1>
                    <p className="subtitle-royal">
                        Immerse yourself in the valor, sacred temples, majestic towers, and royal palaces of Rajasthan’s legendary citadel.
                    </p>
                    <div className="gold-divider-luxury"></div>

                    {/* SEARCH & FILTER DOCK */}
                    <div className="search-filter-dock">
                        <div className="search-bar-wrapper">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search Vijay Stambh, Padmini Palace, Temples..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            {searchQuery && (
                                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* CATEGORY TABS */}
                        <div className="category-tabs-row">
                            {categories.map(cat => {
                                const IconComp = cat.icon;
                                const isActive = activeCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        className={`category-tab ${isActive ? 'active' : ''}`}
                                        onClick={() => {
                                            triggerHaptic('light');
                                            setActiveCategory(cat.id);
                                        }}
                                    >
                                        <IconComp size={14} />
                                        <span>{cat.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </header>

                <div className="container">
                    {/* ATTRACTIONS GRID */}
                    {filteredAttractions.length > 0 ? (
                        <div className="attractions-grid">
                            {filteredAttractions.map((item) => (
                                <GlassCard
                                    key={item.id}
                                    title={item.title}
                                    desc={item.desc}
                                    time={item.time}
                                    dist={item.dist}
                                    delay={item.delay}
                                    link={item.link}
                                    image={item.image}
                                    imgPos={item.imgPos}
                                    bookingLink={item.bookingLink}
                                    badge={item.badge}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-search-box">
                            <Flower size={48} className="empty-icon" />
                            <h3>No Attractions Found</h3>
                            <p>We couldn&apos;t find anything matching &quot;{searchQuery}&quot;. Try searching for another landmark.</p>
                            <button className="reset-search-btn" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
                                Reset Filters
                            </button>
                        </div>
                    )}

                    {/* ═══ MERGED STAYS SECTION ══════════════════ */}
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

            {/* ═══ SINGLE UNIFIED SCOPED STYLES ════════════════════ */}
            <style jsx global>{`
                .explore-page {
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
                    z-index: 0;
                    filter: brightness(1.08) contrast(1.05);
                    pointer-events: none;
                }

                .bg-overlay {
                    position: fixed;
                    inset: 0;
                    background: linear-gradient(to bottom, 
                        rgba(20, 15, 10, 0.25) 0%, 
                        rgba(15, 10, 6, 0.35) 45%,
                        rgba(10, 8, 5, 0.65) 100%
                    );
                    z-index: 1;
                    pointer-events: none;
                }

                .main-content {
                    position: relative;
                    z-index: 10;
                    padding-top: 100px;
                    padding-bottom: 5rem;
                }

                .container {
                    max-width: 1240px;
                    margin: 0 auto;
                    padding: 0 1.25rem;
                }

                /* HEADER & SEARCH FILTER */
                .header-section {
                    text-align: center;
                    margin-bottom: 2.5rem;
                    padding: 0 1rem;
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

                .title.text-gold-royal {
                    font-size: clamp(2.2rem, 4.5vw, 3.8rem);
                    font-family: var(--ff-display), serif;
                    font-weight: 800;
                    margin-bottom: 0.6rem;
                    background: linear-gradient(135deg, #FFFFFF 0%, #F5E6AB 50%, #D4AF37 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    line-height: 1.15;
                    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.9));
                }

                .subtitle-royal {
                    max-width: 640px;
                    margin: 0 auto 1.2rem;
                    color: #FFFFFF;
                    font-size: 0.98rem;
                    line-height: 1.6;
                    font-weight: 400;
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95);
                }

                .gold-divider-luxury {
                    width: 80px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #D4AF37, transparent);
                    margin: 0 auto 1.8rem;
                    border-radius: 999px;
                }

                /* SEARCH & FILTER DOCK */
                .search-filter-dock {
                    width: 100%;
                    max-width: 780px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    align-items: center;
                }

                .search-bar-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 500px;
                }

                .search-icon {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #D4AF37;
                    pointer-events: none;
                }

                .search-input {
                    width: 100%;
                    padding: 0.75rem 2.5rem 0.75rem 2.8rem;
                    background: rgba(15, 10, 6, 0.85);
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    border-radius: 999px;
                    color: #FFF;
                    font-size: 0.88rem;
                    font-family: var(--ff-body), sans-serif;
                    backdrop-filter: blur(12px);
                    transition: all 0.3s ease;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.6);
                }

                .search-input:focus {
                    outline: none;
                    border-color: #D4AF37;
                    box-shadow: 0 0 18px rgba(212, 175, 55, 0.4);
                    background: rgba(20, 14, 8, 0.95);
                }

                .clear-search-btn {
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.6);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .category-tabs-row {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .category-tab {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.5rem 1rem;
                    background: rgba(15, 10, 6, 0.82);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 999px;
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 0.78rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
                }

                .category-tab:hover {
                    border-color: rgba(212, 175, 55, 0.7);
                    color: #FFF;
                }

                .category-tab.active {
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
                    color: #0A0806;
                    border-color: #D4AF37;
                    font-weight: 800;
                    box-shadow: 0 4px 16px rgba(212, 175, 55, 0.45);
                }

                .results-count-bar-container {
                    text-align: center;
                    margin-bottom: 1.5rem;
                }

                .results-count-bar {
                    display: inline-block;
                    font-size: 0.72rem;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #F5E6AB;
                    font-weight: 800;
                    padding: 0.35rem 1.1rem;
                    background: rgba(15, 10, 6, 0.85);
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    border-radius: 999px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(10px);
                }

                /* ATTRACTIONS GRID - DESKTOP LARGE & PROMINENT */
                .attractions-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.75rem;
                    padding: 0;
                }

                .glass-card {
                    background: rgba(24, 18, 12, 0.82) !important;
                    border: 1px solid rgba(212, 175, 55, 0.3) !important;
                    border-radius: 18px;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
                }

                .glass-card:hover {
                    background: rgba(28, 21, 14, 0.95) !important;
                    border-color: rgba(212, 175, 55, 0.7) !important;
                    transform: translateY(-6px);
                    box-shadow: 0 22px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(212, 175, 55, 0.2);
                }

                .card-image-wrapper {
                    width: 100%;
                    height: 190px;
                    overflow: hidden;
                    position: relative;
                    flex-shrink: 0;
                }

                .card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .glass-card:hover .card-image {
                    transform: scale(1.06);
                }

                .card-image-vignette {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent 30%, rgba(24, 18, 12, 0.95) 100%);
                }

                .card-floating-badge {
                    position: absolute;
                    top: 0.75rem;
                    left: 0.75rem;
                    background: rgba(10, 8, 6, 0.85);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(212, 175, 55, 0.45);
                    color: #F3E5AB;
                    padding: 0.3rem 0.7rem;
                    border-radius: 999px;
                    font-size: 0.64rem;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;
                    gap: 0.35rem;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                    z-index: 2;
                }

                .card-content {
                    padding: 1.25rem 1.4rem 1.4rem;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .card-title {
                    font-family: var(--ff-display), serif;
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: #FFF;
                    margin-bottom: 0.5rem;
                    line-height: 1.25;
                }

                .card-desc {
                    font-family: var(--ff-body), sans-serif;
                    font-size: 0.88rem;
                    color: rgba(255, 255, 255, 0.82);
                    line-height: 1.5;
                    margin-bottom: 1rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    min-height: 3.9rem;
                    flex-shrink: 0;
                }

                .card-meta {
                    border-top: 1px solid rgba(212, 175, 55, 0.2);
                    padding-top: 0.85rem;
                    margin-bottom: 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.65rem;
                }

                .meta-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.6rem;
                }

                .meta-label {
                    display: block;
                    font-size: 0.6rem;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    color: #D4AF37;
                    margin-bottom: 2px;
                    font-weight: 700;
                }

                .meta-val {
                    display: block;
                    font-size: 0.84rem;
                    color: #FFF;
                    font-weight: 600;
                    line-height: 1.3;
                    /* REMOVED NOWRAP AND OVERFLOW CUT-OFF SO FULL TIMINGS DISPLAY PERFECTLY */
                }

                .card-action-dock {
                    display: flex;
                    gap: 0.6rem;
                    align-items: center;
                    margin-top: auto;
                }

                .btn-action-direction {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.35rem;
                    padding: 0.55rem 0.85rem;
                    background: rgba(10, 8, 6, 0.7);
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    border-radius: 10px;
                    color: #F3E5AB;
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: all 0.25s ease;
                }

                .btn-action-direction:hover {
                    background: rgba(212, 175, 55, 0.2);
                    border-color: #D4AF37;
                    color: #FFF;
                }

                .btn-action-explore {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.4rem;
                    padding: 0.55rem 1rem;
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
                    border-radius: 10px;
                    color: #0A0806;
                    font-size: 0.72rem;
                    font-weight: 800;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    text-decoration: none;
                    flex: 1;
                    white-space: nowrap;
                    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.25);
                    transition: all 0.25s ease;
                }

                .btn-action-explore:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 16px rgba(212, 175, 55, 0.4);
                }

                .btn-booking-gold-ticket {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.45rem;
                    margin-top: 0.6rem;
                    padding: 0.6rem 0.9rem;
                    background: rgba(212, 175, 55, 0.12);
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    border-radius: 10px;
                    color: #F3E5AB;
                    font-size: 0.74rem;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    text-decoration: none;
                    transition: all 0.25s ease;
                }

                .btn-booking-gold-ticket:hover {
                    background: rgba(212, 175, 55, 0.25);
                    border-color: #D4AF37;
                    color: #FFF;
                }

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
                    background: rgba(24, 18, 12, 0.85);
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    border-radius: 24px;
                    overflow: hidden;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 20px 60px rgba(0,0,0,0.6);
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
                    background: rgba(10, 8, 6, 0.85);
                    color: #D4AF37;
                    padding: 0.45rem 1rem;
                    border-radius: 999px;
                    font-size: 0.65rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    backdrop-filter: blur(8px);
                }
                .featured-info {
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 1.1rem;
                }
                .tagline {
                    color: rgba(212, 175, 55, 0.9);
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
                    color: #FFFFFF;
                    line-height: 1.15;
                    font-weight: 800;
                }
                .featured-desc {
                    color: rgba(255, 255, 255, 0.82);
                    line-height: 1.6;
                    font-size: 0.88rem;
                    font-weight: 300;
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
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    color: rgba(255, 255, 255, 0.9);
                }
                .smart-pill.walk {
                    background: rgba(212, 175, 55, 0.1);
                    color: #F3E5AB;
                    border-color: rgba(212, 175, 55, 0.3);
                }
                .smart-pill.drive {
                    background: rgba(255, 255, 255, 0.08);
                    color: #FFF;
                    border-color: rgba(255, 255, 255, 0.2);
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
                    color: rgba(255, 255, 255, 0.85);
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
                    background: rgba(10, 8, 6, 0.7);
                    color: #F3E5AB;
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    box-shadow: none;
                }
                .btn-featured-booking.secondary:hover {
                    background: rgba(212, 175, 55, 0.2);
                    border-color: #D4AF37;
                    color: #FFF;
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
                    background: rgba(20, 15, 9, 0.7);
                    color: #D4AF37;
                    padding: 0.75rem 2rem;
                    border-radius: 999px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.25s ease;
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.4);
                }
                .search-other-link:hover {
                    background: rgba(212, 175, 55, 0.2);
                    color: #FFF;
                    border-color: #D4AF37;
                }

                /* RESPONSIVE MOBILE OPTIMIZATION - SLEEK & FIT */
                @media (max-width: 992px) {
                    .featured-card { grid-template-columns: 1fr; }
                    .featured-image-container { height: 200px; min-height: 200px; }
                    .featured-info { padding: 1.35rem; text-align: center; }
                    .featured-title { font-size: 1.5rem; }
                    .featured-meta { align-items: center; }
                    .smart-badges { justify-content: center; }
                    .featured-actions { flex-direction: column; }
                }

                @media (max-width: 640px) {
                    .main-content {
                        padding-top: 80px;
                    }
                    .attractions-grid {
                        grid-template-columns: 1fr;
                        gap: 1.1rem;
                    }
                    .card-image-wrapper {
                        height: 140px;
                    }
                    .card-content {
                        padding: 0.95rem 1.1rem 1.1rem;
                    }
                    .card-title {
                        font-size: 1.2rem;
                    }
                    .card-desc {
                        font-size: 0.82rem;
                        min-height: auto;
                        -webkit-line-clamp: 3;
                    }
                    .card-meta {
                        padding-top: 0.55rem;
                        margin-bottom: 0.65rem;
                        gap: 0.45rem;
                    }
                    .meta-val {
                        font-size: 0.76rem;
                    }
                }
            `}</style>
        </div>
    );
}

function GlassCard({ title, desc, time, dist, delay, link, image, imgPos = 'center', bookingLink, badge }) {
    const { t } = useLanguage();
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleDirections = () => {
        triggerHaptic('light');
        const destination = encodeURIComponent(`${title}, Chittorgarh`);
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        triggerHaptic('light');
        setSending(true);
        setStatus(null);

        try {
            const res = await fetch('/api/send-details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    placeName: title,
                    description: desc,
                    link,
                    image,
                    time,
                    dist,
                    category: 'attraction'
                }),
            });

            if (res.ok) {
                setStatus('success');
                triggerHaptic('success');
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
                {/* IMAGE CONTAINER WITH BADGE & OVERLAY */}
                {image ? (
                    <div className="card-image-wrapper">
                        <Image
                            src={image}
                            alt={title}
                            className="card-image"
                            style={{ objectFit: "cover", objectPosition: imgPos }}
                            width={800}
                            height={500}
                        />
                        <div className="card-image-vignette"></div>
                    </div>
                ) : (
                    <div className="card-icon-wrapper">
                        <Flower className="card-icon" strokeWidth={1} />
                    </div>
                )}

                {/* CARD BODY */}
                <div className="card-content">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-desc">{desc}</p>

                    {/* META DETAILS */}
                    <div className="card-meta">
                        <div className="meta-row">
                            <Calendar className="meta-icon" />
                            <div>
                                <span className="meta-label">{t("lbl.bestTime")}</span>
                                <span className="meta-val">{time}</span>
                            </div>
                        </div>
                        <div className="meta-row">
                            <MapPin className="meta-icon" />
                            <div>
                                <span className="meta-label">{t("lbl.distance")}</span>
                                <span className="meta-val">{dist}</span>
                            </div>
                        </div>
                    </div>

                    {/* ACTION BUTTONS DOCK */}
                    <div className="card-action-dock">
                        <button
                            onClick={handleDirections}
                            className="btn-action-direction"
                            title={t("btn.directions")}
                        >
                            <Navigation size={14} />
                            <span>{t("btn.directions")}</span>
                        </button>

                        {link && (link.startsWith('/') ? (
                            <Link prefetch={false} href={link} className="btn-action-explore">
                                <span>{t("btn.readMore")}</span>
                                <ArrowRight className="arrow" size={14} />
                            </Link>
                        ) : (
                            <a href={link} target="_blank" rel="noopener noreferrer" className="btn-action-explore">
                                <span>{t("btn.readMore")}</span>
                                <ArrowRight className="arrow" size={14} />
                            </a>
                        ))}
                    </div>

                    {bookingLink && (
                        <a
                            href={bookingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-booking-gold-ticket"
                        >
                            <Ticket size={15} />
                            <span>{t("btn.bookTickets")}</span>
                        </a>
                    )}
                </div>
            </div>

            {/* Email Modal */}
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
                                {sending ? t("modal.sending") : (
                                    <>{t("modal.send")} <Send size={16} /></>
                                )}
                            </button>
                        </form>

                        {status === 'success' && <p className="status-msg success">{t("modal.success")}</p>}
                        {status === 'error' && <p className="status-msg error">{t("modal.error")}</p>}
                    </div>
                </div>
            )}
        </>
    );
}
