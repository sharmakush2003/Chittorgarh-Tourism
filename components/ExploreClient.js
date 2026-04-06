"use client";
import Image from 'next/image';

import { useLanguage } from "@/context/LanguageContext";
import { Flower, Calendar, MapPin, ArrowRight, Sun, Wind, Cloud, Ticket } from 'lucide-react';
import FortMap from "@/components/FortMap";
import { useState, useEffect } from 'react';
import { Share2, Navigation, X, Send } from 'lucide-react';
import { triggerHaptic } from "@/lib/haptics";
import Link from 'next/link';

export default function ExploreClient() {
    const { t } = useLanguage();

    return (
        <div className="explore-page">
            {/* ═══ FIXED BACKGROUND ══════════════════════ */}
            <div className="fixed-bg"></div>
            <div className="bg-overlay"></div>

            {/* ═══ CONTENT ═══════════════════════════════ */}
            <main className="main-content">
                <header className="header-section text-center">
                    <span className="eyebrow">{t("exp.eyebrow")}</span>
                    <h1 className="title text-gold">{t("exp.header")}</h1>
                    <div className="divider"></div>
                </header>

                <div className="container">
                    <div className="attractions-grid">
                        <GlassCard
                            title={t("attr.fort.name")}
                            desc={t("attr.fort.desc")}
                            time={t("attr.fort.time")}
                            dist={t("attr.fort.dist")}
                            delay={0}
                            link="/chittorgarh-fort"
                            image="/hero_bg.png"
                            bookingLink="https://eticket.webfront.in/asi/quick/chf"
                        />
                        <GlassCard
                            title={t("attr.vijay.name")}
                            desc={t("attr.vijay.desc")}
                            time={t("attr.vijay.time")}
                            dist={t("attr.vijay.dist")}
                            delay={1}
                            link="/vijay-stambh"
                            image="/vijay_stambh.jpg"
                            imgPos="top"
                        />
                        <GlassCard
                            title={t("attr.kirti.name")}
                            desc={t("attr.kirti.desc")}
                            time={t("attr.kirti.time")}
                            dist={t("attr.kirti.dist")}
                            delay={2}
                            link="/kirti-stambh"
                            image="/kirti_stambha.jpg"
                            imgPos="top"
                        />
                        <GlassCard
                            title={t("attr.kumbha_palace.name")}
                            desc={t("attr.kumbha_palace.desc")}
                            time={t("attr.kumbha_palace.time")}
                            dist={t("attr.kumbha_palace.dist")}
                            delay={3}
                            link="/kumbha-palace"
                            image="/rana_kumbha_palace.jpg"
                        />
                        <GlassCard
                            title={t("padmini.hero.title")}
                            desc={t("padmini.hero.desc")}
                            time="10:00 AM - 5:00 PM"
                            dist="Within Fort"
                            delay={4}
                            link="/padmini-palace"
                            image="/Each page Pics/Fort pics/Padmini Palace.jpg"
                        />
                        <GlassCard
                            title={t("attr.fateh.name")}
                            desc={t("attr.fateh.desc")}
                            time={t("attr.fateh.time")}
                            dist={t("attr.fateh.dist")}
                            delay={5}
                            link="/fateh-prakash"
                            image="/fateh_prakash_palace.jpg"
                        />
                        <GlassCard
                            title={t("attr.gaumukh.name")}
                            desc={t("attr.gaumukh.desc")}
                            time={t("attr.gaumukh.time")}
                            dist={t("attr.gaumukh.dist")}
                            delay={6}
                            link="/gaumukh"
                            image="/gaumukh_reservoir.jpg"
                        />
                        <GlassCard
                            title={t("attr.kalika.name")}
                            desc={t("attr.kalika.desc")}
                            time={t("attr.kalika.time")}
                            dist={t("attr.kalika.dist")}
                            delay={7}
                            link="/kalika-temple"
                            image="/kalika_mata_temple.jpg"
                        />
                        <GlassCard
                            title={t("attr.meera.name")}
                            desc={t("attr.meera.desc")}
                            time={t("attr.meera.time")}
                            dist={t("attr.meera.dist")}
                            delay={8}
                            link="/meera-bai-temple"
                            image="/meerabai_temple.jpg"
                        />
                        <GlassCard
                            title={t("attr.kumbha_shyam.name")}
                            desc={t("attr.kumbha_shyam.desc")}
                            time={t("attr.kumbha_shyam.time")}
                            dist={t("attr.kumbha_shyam.dist")}
                            delay={9}
                            link="/kumbha-shyam"
                            image="/kumbha_shyam_temple.jpg"
                        />
                        <GlassCard
                            title={t("attr.jain.name")}
                            desc={t("attr.jain.desc")}
                            time={t("attr.jain.time")}
                            dist={t("attr.jain.dist")}
                            delay={10}
                            link="/jain-temples"
                            image="/jain_temples.jpg"
                        />
                        <GlassCard
                            title={t("attr.ratan.name")}
                            desc={t("attr.ratan.desc")}
                            time={t("attr.ratan.time")}
                            dist={t("attr.ratan.dist")}
                            delay={11}
                            link="/ratan-palace"
                            image="/ratan_singh_palace.jpg"
                        />
                        <GlassCard
                            title={t("attr.light.name")}
                            desc={t("attr.light.desc")}
                            time={t("attr.light.time")}
                            dist={t("attr.light.dist")}
                            delay={12}
                            link="/light-and-sound-show"
                            image="/light_sound_show.jpg"
                            bookingLink="https://obms-tourist.rajasthan.gov.in/place-details/Chittorgarh-Fort-light-and-sound-show"
                        />
                        <GlassCard
                            title={t("attr.sanwaliya.name")}
                            desc={t("attr.sanwaliya.desc")}
                            time={t("attr.sanwaliya.time")}
                            dist={t("attr.sanwaliya.dist")}
                            delay={13}
                            link="/sanwaliya"
                            image="/images/sanwaliya_idol.jpg"
                        />
                        <GlassCard
                            title={t("attr.menal.name")}
                            desc={t("attr.menal.desc")}
                            time={t("attr.menal.time")}
                            dist={t("attr.menal.dist")}
                            delay={14}
                            link="/menal"
                            image="/menal_waterfall.jpg"
                        />
                        <GlassCard
                            title={t("attr.nagari.name")}
                            desc={t("attr.nagari.desc")}
                            time={t("attr.nagari.time")}
                            dist={t("attr.nagari.dist")}
                            delay={15}
                            link="/nagari"
                            image="/images/Nagari.jpg"
                        />
                        <GlassCard
                            title={t("attr.bassi.name")}
                            desc={t("attr.bassi.desc")}
                            time={t("attr.bassi.time")}
                            dist={t("attr.bassi.dist")}
                            delay={16}
                            link="/bassi"
                            image="/images/bassi_path.jpg"
                        />
                        <GlassCard
                            title={t("attr.sitamata.name")}
                            desc={t("attr.sitamata.desc")}
                            time={t("attr.sitamata.time")}
                            dist={t("attr.sitamata.dist")}
                            delay={17}
                            link="/sitamata"
                            image="/images/sitamata_1.jpg"
                        />
                    </div>

                    <FortMap />

                </div>
            </main>

            <style jsx>{`
                /* ... other styles ... */
                
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

                .main-content {
                    padding-top: 100px; /* Space for Navbar */
                }

                .header-section {
                    margin-bottom: 4rem;
                }

                .eyebrow {
                    display: block;
                    font-family: var(--ff-body);
                    font-size: 0.75rem;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    color: rgba(255, 255, 255, 0.7);
                    margin-bottom: 1rem;
                }

                .title {
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    font-family: var(--ff-display);
                    margin-bottom: 1.5rem;
                    text-shadow: 0 4px 20px rgba(0,0,0,0.5);
                }

                .divider {
                    width: 100px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, var(--gold), transparent);
                    margin: 0 auto;
                }

                .attractions-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2rem;
                    padding: 0 1rem;
                }


                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}


function GlassCard({ title, desc, time, dist, delay, link, image, imgPos = 'center', bookingLink }) {
    const { t } = useLanguage();
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error'
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation after mount
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
                {image ? (
                    <div className="card-image-wrapper">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <Image
                            src={image}
                            alt={title}
                            className="card-image"
                            style={{ objectFit: "cover",  objectPosition: imgPos }}
                         width={1200} height={800}/>
                    </div>
                ) : (
                    <div className="card-icon-wrapper">
                        <Flower className="card-icon" strokeWidth={1} />
                    </div>
                )}

                <div className="card-content">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-desc">{desc}</p>

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

                    {/* Action Buttons Row */}
                    <div className="card-actions-row">
                        <button
                            onClick={handleDirections}
                            className="action-btn-text"
                            title={t("btn.directions")}
                        >
                            <Navigation size={16} />
                            <span>{t("btn.directions")}</span>
                        </button>
                        <div className="divider-vertical"></div>
                        <button
                            onClick={() => { setShowEmailModal(true); triggerHaptic('light'); }}
                            className="action-btn-text"
                            title={t("btn.shareInfo")}
                        >
                            <Share2 size={16} />
                            <span>{t("btn.shareInfo")}</span>
                        </button>
                    </div>

                    <div className="card-actions" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: 'auto', width: '100%' }}>
                        {link && (link.startsWith('/') ? (
                            <Link prefetch={false} href={link} className="read-more">
                                {t("btn.readMore")} <ArrowRight className="arrow" size={16} />
                            </Link>
                        ) : (
                            <a href={link} target="_blank" rel="noopener noreferrer" className="read-more">
                                {t("btn.readMore")} <ArrowRight className="arrow" size={16} />
                            </a>
                        ))}
                        {bookingLink && (
                            <a
                                href={bookingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="book-tickets-btn"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(255, 215, 0, 0.1)',
                                    border: '1px solid rgba(255, 215, 0, 0.3)',
                                    borderRadius: '8px',
                                    color: '#FFD700',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    width: '100%'
                                }}
                            >
                                <Ticket size={16} />
                                {t("btn.bookTickets")}
                            </a>
                        )}
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
                    position: relative;
                }
                
                .card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }
                
                .glass-card:hover .card-image {
                    transform: scale(1.1);
                }

                .card-content {
                    padding: 2rem 2rem 2.5rem;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .card-icon-wrapper {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 2rem;
                    padding-top: 2.5rem;
                }

                :global(.card-icon) {
                    width: 60px;
                    height: 60px;
                    color: var(--gold);
                    opacity: 0.8;
                    transition: 0.4s;
                }

                .card-title {
                    font-family: var(--ff-display);
                    font-size: 1.75rem;
                    color: var(--gold);
                    margin-bottom: 1rem;
                    line-height: 1.2;
                    text-align: center;
                }

                .card-desc {
                    font-family: var(--ff-body);
                    font-size: 0.95rem;
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
                    opacity: 0.7;
                }

                .meta-label {
                    display: block;
                    font-size: 0.6rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: rgba(255, 255, 255, 0.5);
                    margin-bottom: 2px;
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
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                
                .action-btn-text {
                    background: transparent;
                    border: none;
                    color: rgba(255, 255, 255, 0.7);
                    font-family: var(--ff-body);
                    font-size: 0.8rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: 0.3s;
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                }
                
                .action-btn-text:hover {
                    color: var(--gold);
                    background: rgba(212, 175, 55, 0.1);
                }
                
                .divider-vertical {
                    width: 1px;
                    height: 20px;
                    background: rgba(255, 255, 255, 0.1);
                }

                :global(.read-more) {
                    background: rgba(212, 175, 55, 0.05) !important;
                    border: 1px solid rgba(212, 175, 55, 0.3) !important;
                    color: var(--gold) !important;
                    font-family: var(--ff-body) !important;
                    font-size: 0.8rem !important;
                    font-weight: 700 !important;
                    letter-spacing: 1px !important;
                    text-transform: uppercase !important;
                    cursor: pointer;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 0.5rem !important;
                    padding: 0.5rem 1.2rem !important;
                    border-radius: 8px !important;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    flex: 1 !important;
                    text-decoration: none !important;
                }

                :global(.read-more:hover) {
                    background: rgba(212, 175, 55, 0.15) !important;
                    border-color: var(--gold) !important;
                    color: #fff !important;
                    transform: translateY(-2px) !important;
                    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.2) !important;
                }

                :global(.arrow) {
                    transition: 0.3s;
                }

                .read-more:hover :global(.arrow) {
                    transform: translateX(5px);
                }

                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    backdrop-filter: blur(5px);
                    animation: fadeIn 0.3s ease;
                }
                
                .modal-content {
                    background: #1a1510;
                    border: 1px solid var(--gold);
                    padding: 2rem;
                    border-radius: 12px;
                    width: 90%;
                    max-width: 400px;
                    position: relative;
                    text-align: center;
                    animation: slideUp 0.3s ease;
                }
                
                .close-btn {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    color: #fff;
                    cursor: pointer;
                    opacity: 0.7;
                    transition: 0.2s;
                }
                
                .close-btn:hover {
                    opacity: 1;
                    transform: rotate(90deg);
                }
                
                .modal-title {
                    color: var(--gold);
                    font-family: var(--ff-display);
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                }
                
                .modal-subtitle {
                    color: #ccc;
                    font-size: 0.9rem;
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
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff;
                    font-family: var(--ff-body);
                }
                
                .email-input:focus {
                    outline: none;
                    border-color: var(--gold);
                }
                
                .send-btn {
                    background: var(--gold);
                    color: #000;
                    border: none;
                    padding: 0.8rem;
                    border-radius: 4px;
                    font-weight: bold;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    transition: 0.2s;
                    width: 100%;
                }
                
                .send-btn:hover:not(:disabled) {
                    background: #fff;
                }
                
                .send-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                
                .status-msg {
                    margin-top: 1rem;
                    font-size: 0.9rem;
                    font-weight: 500;
                }
                
                .status-msg.success { color: #4ade80; }
                .status-msg.error { color: #f87171; }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </>
    );
}
