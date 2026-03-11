"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Mail, CheckCircle, ArrowRight, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { triggerHaptic } from "@/lib/haptics";
import { useLanguage } from "@/context/LanguageContext";

export default function Newsletter() {
    const pathname = usePathname();
    const { t } = useLanguage();

    if (pathname?.startsWith('/admin')) return null;
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );
        const element = document.getElementById('newsletter-trigger');
        if (element) observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        triggerHaptic('light');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setStatus('success');
                triggerHaptic('success');
                setEmail('');
                setTimeout(() => setStatus('idle'), 10000);
            } else {
                setStatus('error');
                triggerHaptic('error');
            }
        } catch (error) {
            setStatus('error');
            triggerHaptic('error');
        }
    };

    return (
        <section className="newsletter-section" id="newsletter-trigger">
            <div className="newsletter-container">
                <div className={`prestige-card ${isVisible ? 'animate-in' : ''}`}>
                    {/* Background layers */}
                    <div className="prestige-bg"></div>
                    <div className="parchment-texture"></div>
                    <div className="vignette"></div>

                    <div className="content-wrapper">
                        <div className="seal-emblem">
                            <Sparkles className="seal-icon" size={32} />
                        </div>

                        <div className="lead-text">
                            <span className="premium-label">Official Invitation</span>
                            <h2 className="main-title">Join the <span>Heritage Circle</span></h2>
                            <p className="sub-description">
                                A monthly proclamation of Chittorgarh's lost legends, architectural wonders, and curated royal experiences.
                            </p>
                        </div>

                        <form onSubmit={handleSubscribe} className="subscription-flow">
                            <div className="input-canvas">
                                <div className="field-wrapper">
                                    <div className="icon-seal">
                                        <Mail className="field-glyph" size={18} strokeWidth={1.5} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Request an invitation..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={status === 'loading' || status === 'success'}
                                        className="heritage-input"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={`prestige-btn ${status}`}
                                    disabled={status === 'loading' || status === 'success'}
                                >
                                    {status === 'loading' ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : status === 'success' ? (
                                        <CheckCircle size={22} />
                                    ) : (
                                        <><span>Join Circle</span> <ArrowRight size={20} /></>
                                    )}
                                </button>
                            </div>

                            {status === 'success' && (
                                <div className="feedback-msg success">
                                    <ShieldCheck size={18} /> Credentials verified. Welcome to the circle.
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="feedback-msg error">
                                    The gate is barred. Please check your connection.
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Architectural Accents */}
                    <div className="gold-trim top"></div>
                    <div className="gold-trim bottom"></div>
                    <div className="arch-accent left"></div>
                    <div className="arch-accent right"></div>
                </div>
            </div>

            <style jsx>{`
                .newsletter-section {
                    padding: 100px 0 160px;
                    background: transparent;
                    display: flex;
                    justify-content: center;
                    overflow: hidden;
                    position: relative;
                }

                .newsletter-container {
                    width: 100%;
                    max-width: 800px;
                    padding: 0 20px;
                    z-index: 10;
                    margin-right: 40px; /* Slight offset to feel balanced with widgets */
                }

                @media (max-width: 1400px) {
                    .newsletter-container {
                        max-width: 700px;
                        margin-right: 100px; /* More space for widgets on tighter screens */
                    }
                }

                @media (max-width: 1100px) {
                    .newsletter-container {
                        margin-right: 0; /* Stack on mobile/tablet */
                    }
                }

                .prestige-card {
                    position: relative;
                    background: #0a0705;
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 4px; /* Professional, sharp look */
                    padding: 100px 60px;
                    text-align: center;
                    box-shadow: 0 60px 120px -30px rgba(0, 0, 0, 0.9);
                    opacity: 0;
                    transform: translateY(60px) scale(0.98);
                    transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .prestige-card.animate-in {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }

                .prestige-bg {
                    position: absolute;
                    inset: 0;
                    background: url('/hero_bg.jpg') center top / cover no-repeat;
                    opacity: 0.1;
                    mix-blend-mode: overlay;
                    z-index: 1;
                }

                .parchment-texture {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle, rgba(28, 20, 15, 0) 0%, rgba(10, 7, 5, 0.8) 100%);
                    z-index: 2;
                }

                .vignette {
                    position: absolute;
                    inset: 0;
                    box-shadow: inset 0 0 150px rgba(0,0,0,1);
                    z-index: 3;
                }

                .content-wrapper {
                    position: relative;
                    z-index: 10;
                }

                .seal-emblem {
                    display: inline-flex;
                    padding: 20px;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 50%;
                    margin-bottom: 2.5rem;
                    background: rgba(212, 175, 55, 0.05);
                    position: relative;
                }

                .seal-emblem::after {
                    content: '';
                    position: absolute;
                    inset: -8px;
                    border: 1px solid rgba(212, 175, 55, 0.1);
                    border-radius: 50%;
                }

                .seal-icon {
                    color: var(--gold);
                    filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.4));
                }

                .premium-label {
                    display: block;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5rem;
                    color: var(--gold);
                    margin-bottom: 1rem;
                    font-weight: 700;
                    opacity: 0.8;
                }

                .main-title {
                    font-family: var(--font-cormorant), serif;
                    font-size: clamp(2.8rem, 6vw, 4rem);
                    color: #fff;
                    margin-bottom: 1.5rem;
                    font-weight: 300;
                    line-height: 1;
                }

                .main-title span {
                    display: block;
                    font-weight: 600;
                    font-style: italic;
                    color: #fff;
                    letter-spacing: -2px;
                }

                .sub-description {
                    font-family: var(--font-jost), sans-serif;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 1.15rem;
                    line-height: 1.7;
                    max-width: 500px;
                    margin: 0 auto 4rem;
                    font-weight: 300;
                }

                .subscription-flow {
                    max-width: 560px;
                    margin: 0 auto;
                }

                .input-canvas {
                    display: flex;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    padding: 6px;
                    position: relative;
                    transition: all 0.5s ease;
                }

                .input-canvas:focus-within {
                    border-color: var(--gold);
                    background: rgba(212, 175, 55, 0.05);
                    box-shadow: 0 0 40px rgba(212, 175, 55, 0.1);
                }

                .field-wrapper {
                    position: relative;
                    flex: 1;
                    display: flex;
                    align-items: center;
                }

                .icon-seal {
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 40px;
                    height: 40px;
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10;
                }

                .field-glyph {
                    color: var(--gold);
                    filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.4));
                }

                .heritage-input {
                    flex: 1;
                    height: 60px;
                    background: transparent;
                    border: none;
                    color: #fff;
                    padding-left: 65px;
                    font-family: var(--font-jost), sans-serif;
                    font-size: 1.05rem;
                    font-weight: 300;
                }

                .heritage-input:focus {
                    outline: none;
                }

                .heritage-input::placeholder {
                    color: rgba(255, 255, 255, 0.15);
                }

                .prestige-btn {
                    height: 60px;
                    padding: 0 40px;
                    background: var(--gold);
                    color: #000;
                    border: none;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 0.85rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                }

                .prestige-btn:hover:not(:disabled) {
                    background: #fff;
                    letter-spacing: 3px;
                }

                .prestige-btn.success {
                    background: #d4af37;
                    color: #fff;
                }

                .feedback-msg {
                    margin-top: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    font-size: 0.95rem;
                    font-weight: 400;
                    font-family: var(--font-jost), sans-serif;
                }

                .feedback-msg.success { color: var(--gold); }
                .feedback-msg.error { color: #f87171; }

                /* Trim & Accents */
                .gold-trim {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 120px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, var(--gold), transparent);
                }

                .gold-trim.top { top: 40px; }
                .gold-trim.bottom { bottom: 40px; }

                .arch-accent {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 1px;
                    height: 100px;
                    background: linear-gradient(180deg, transparent, rgba(212, 175, 55, 0.3), transparent);
                }

                .arch-accent.left { left: 30px; }
                .arch-accent.right { right: 30px; }

                @media (max-width: 768px) {
                    .newsletter-section {
                        padding: 60px 0 100px;
                    }
                    .prestige-card {
                        padding: 60px 20px;
                        border-left: none;
                        border-right: none;
                        border-radius: 0;
                    }
                    .main-title {
                        font-size: 2.5rem;
                        margin-bottom: 1rem;
                    }
                    .sub-description {
                        font-size: 1rem;
                        margin-bottom: 3rem;
                    }
                    .input-canvas {
                        flex-direction: column;
                        background: transparent;
                        border: none;
                        padding: 0;
                        gap: 12px;
                    }
                    .icon-seal {
                        left: 10px;
                        z-index: 15;
                    }
                    .heritage-input {
                        width: 100%;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(212, 175, 55, 0.2);
                        padding-left: 60px;
                        border-radius: 4px;
                    }
                    .prestige-btn {
                        width: 100%;
                        justify-content: center;
                        border-radius: 4px;
                        height: 55px;
                    }
                    .arch-accent {
                        display: none;
                    }
                    .gold-trim {
                        width: 80px;
                    }
                }
            `}</style>
        </section>
    );
}
