"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Flame, Utensils, Info, Navigation, Share2, X, Send } from 'lucide-react';
import { useState, useEffect } from "react";

export default function CuisineClient() {
    const { t } = useLanguage();

    const dishes = [
        {
            id: "c1",
            image: "/Cuisines/Dal Bati.jpg",
        },
        {
            id: "c3",
            image: "/Cuisines/Gatte Ki Sabzi.jpg",
        },
        {
            id: "c4",
            image: "/Cuisines/Ker sangri.jpg",
        },
        {
            id: "c5",
            image: "/Cuisines/Pyaaz kachori.jpg",
        },
        {
            id: "c6",
            image: "/Cuisines/Gevar.jpg",
        }
    ];

    return (
        <div className="cuisine-page">
            {/* ═══ FIXED BACKGROUND ══════════════════════ */}
            <div className="fixed-bg"></div>
            <div className="bg-overlay"></div>

            <style jsx>{`
                .cuisine-page {
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
                    padding-top: 100px;
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
                .subtitle {
                    text-align: center;
                    font-family: var(--ff-body);
                    color: rgba(255, 255, 255, 0.8);
                    max-width: 600px;
                    margin: 0 auto 2rem;
                    line-height: 1.6;
                }
                .divider {
                    width: 100px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, var(--gold), transparent);
                    margin: 0 auto;
                }
                .dishes-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2.5rem;
                    justify-content: center;
                    padding: 0 1rem;
                }
                .view-more-section {
                    text-align: center;
                    margin: 4rem auto 2rem;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    width: 100%;
                    animation: fadeIn 1s ease-out 0.5s backwards;
                }
                .view-more-text {
                    font-family: var(--ff-body);
                    color: rgba(255, 255, 255, 0.6);
                    margin-bottom: 1.5rem;
                    font-size: 0.9rem;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
                .view-more-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid var(--gold);
                    color: var(--gold);
                    padding: 1rem 2.5rem;
                    transition: 0.3s;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    border-radius: 4px;
                    text-align: center;
                }
                .view-more-btn:hover {
                    background: var(--gold);
                    color: #000;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px -5px rgba(212, 175, 55, 0.4);
                }
            `}</style>

            {/* ═══ PAGE HEADER ═══════════════════════════ */}
            <header className="header-section">
                <span className="eyebrow">{t("cui.eyebrow")}</span>
                <h1 className="title">{t("cui.title")}</h1>
                <p className="subtitle">{t("cui.desc")}</p>
                <div className="divider"></div>
            </header>

            {/* ═══ DISHES CONTENT ════════════════════════ */}
            <section className="section-pad" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="dishes-grid">
                        {dishes.map((dish, index) => (
                            <DishCard
                                key={dish.id}
                                dish={dish}
                                delay={index}
                                t={t}
                            />
                        ))}
                    </div>

                    <div className="view-more-section">
                        <p className="view-more-text">{t("cui.footerText")}</p>
                        <a href="/explore" className="view-more-btn">
                            {t("cui.footerBtn")} <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

function DishCard({ dish, delay, t }) {
    const [isVisible, setIsVisible] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

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
                    placeName: t(`cui.${dish.id}.name`),
                    description: t(`cui.${dish.id}.desc`),
                    link: "https://chittorgarhtourism.com/cuisine",
                    time: t(`cui.${dish.id}.type`),
                    dist: t(`cui.${dish.id}.spicy`)
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
                <div className="card-icon-wrapper">
                    {dish.image ? (
                        <img src={dish.image} alt={t(`cui.${dish.id}.name`)} className="card-img" />
                    ) : (
                        dish.symbol
                    )}
                </div>

                <div className="card-content">
                    <h3 className="card-title">{t(`cui.${dish.id}.name`)}</h3>
                    <p className="card-desc">{t(`cui.${dish.id}.desc`)}</p>

                    <div className="card-meta">
                        <div className="meta-row">
                            <Flame className="meta-icon" />
                            <div>
                                <span className="meta-label">{t("lbl.spicy") || "SPICE LEVEL"}</span>
                                <span className="meta-val">{t(`cui.${dish.id}.spicy`)}</span>
                            </div>
                        </div>
                        <div className="meta-row">
                            <Utensils className="meta-icon" />
                            <div>
                                <span className="meta-label">{t("lbl.type") || "CATEGORY"}</span>
                                <span className="meta-val">{t(`cui.${dish.id}.type`)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="card-actions-row">
                        <button onClick={() => setShowEmailModal(true)} className="action-btn-text" style={{ width: '100%', justifyContent: 'center' }}>
                            <Share2 size={16} />
                            <span>{t("btn.shareInfo")}</span>
                        </button>
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
                                {sending ? t("modal.sending") : <>{t("modal.send")} <Send size={16} /></>}
                            </button>
                        </form>

                        {status === 'success' && <p className="status-msg success">{t("modal.success")}</p>}
                        {status === 'error' && <p className="status-msg error">{t("modal.error")}</p>}
                    </div>
                </div>
            )}

            <style jsx>{`
                .glass-card { background: rgba(28, 20, 15, 0.65); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 20px; display: flex; flex-direction: column; transition: all 0.4s ease; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); position: relative; overflow: hidden; opacity: 0; transform: translateY(20px); }
                .glass-card.visible { opacity: 1; transform: translateY(0); }
                .glass-card:hover { background: rgba(28, 20, 15, 0.8); border-color: rgba(212, 175, 55, 0.5); transform: translateY(-10px); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
                .card-icon-wrapper { width: 100%; height: 200px; display: flex; align-items: center; justify-content: center; font-size: 5rem; background: linear-gradient(135deg, rgba(28,20,15,0.4) 0%, rgba(212,175,55,0.1) 100%); border-bottom: 1px solid rgba(255,255,255,0.05); overflow: hidden; }
                .card-img { width: 100%; height: 100%; object-fit: cover; }
                .card-content { padding: 2rem; flex-grow: 1; display: flex; flex-direction: column; }
                .card-title { font-family: var(--ff-display); font-size: 1.6rem; color: var(--gold); margin-bottom: 1rem; text-align: center; line-height: 1.2; }
                .card-desc { font-size: 0.95rem; font-family: var(--ff-body); color: rgba(255, 255, 255, 0.8); line-height: 1.6; text-align: center; margin-bottom: 1.5rem; flex-grow: 1; }
                .card-meta { border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 1.5rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
                .meta-row { display: flex; align-items: center; gap: 1rem; }
                :global(.meta-icon) { width: 18px; height: 18px; color: var(--gold); opacity: 0.8; }
                .meta-label { display: block; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1px; color: rgba(255, 255, 255, 0.5); margin-bottom: 2px;}
                .meta-val { display: block; font-size: 0.9rem; color: #fff; font-weight: 500; }
                .card-actions-row { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-top: auto; background: rgba(255, 255, 255, 0.03); padding: 0.8rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.05); }
                .action-btn-text { background: transparent; border: none; color: rgba(255, 255, 255, 0.7); font-size: 0.85rem; font-family: var(--ff-body); cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: 0.3s; padding: 0.25rem 0.5rem; border-radius: 4px;}
                .action-btn-text:hover { color: var(--gold); background: rgba(212, 175, 55, 0.1); }
                .modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(5px); }
                .modal-content { background: #1a1510; border: 1px solid var(--gold); padding: 2.5rem; border-radius: 12px; width: 90%; max-width: 400px; position: relative; text-align: center; }
                .close-btn { position: absolute; top: 15px; right: 15px; color: #fff; background: none; border: none; cursor: pointer; opacity: 0.7; transition: 0.2s;}
                .close-btn:hover { opacity: 1; transform: rotate(90deg); }
                .modal-title { color: var(--gold); font-family: var(--ff-display); font-size: 1.5rem; margin-bottom: 0.5rem; }
                .modal-subtitle { color: #ccc; font-size: 0.85rem; margin-bottom: 1.5rem; }
                .email-form { display: flex; flex-direction: column; gap: 1rem; }
                .email-input { padding: 0.8rem; border-radius: 4px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); color: #fff; }
                .email-input:focus { outline: none; border-color: var(--gold); }
                .send-btn { background: var(--gold); color: #000; padding: 0.8rem; border-radius: 4px; font-weight: bold; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: 0.2s; }
                .send-btn:hover:not(:disabled) { background: #fff; }
                .send-btn:disabled { opacity: 0.7; cursor: not-allowed; }
                .status-msg.success { color: #4ade80; margin-top: 1rem; font-size: 0.9rem; }
                .status-msg.error { color: #f87171; margin-top: 1rem; font-size: 0.9rem; }
            `}</style>
        </>
    );
}
