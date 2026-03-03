"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShieldOff, Home, ArrowLeft, Sparkles, MoveLeft } from 'lucide-react';
import Link from 'next/link';

function UnsubscribeContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [status, setStatus] = useState('processing'); // processing | completed

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus('completed');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="unsubscribe-page">
            {/* Cinematic Background */}
            <div className="hero-bg"></div>
            <div className="overlay-gradient"></div>

            <div className="container">
                <main className={`prestige-box ${status === 'completed' ? 'reveal' : ''}`}>
                    {/* Architectural Accents */}
                    <div className="gold-seal top"></div>

                    <div className="content">
                        {status === 'processing' ? (
                            <div className="ritual-loader">
                                <div className="loader-ring"></div>
                                <Sparkles className="loader-icon" size={24} />
                                <p className="loader-text">Updating the Archives...</p>
                            </div>
                        ) : (
                            <div className="final-state">
                                <div className="status-badge">
                                    <span className="badge-text">Succession Complete</span>
                                </div>

                                <h1 className="royal-title">The Saga <span>Concludes</span></h1>

                                <div className="ornament-divider">
                                    <div className="line"></div>
                                    <div className="diamond"></div>
                                    <div className="line"></div>
                                </div>

                                <p className="proclamation">
                                    Your email, <span className="highlight">{email || "traveller@heritage.com"}</span>, has been respectfully removed from the Heritage Chronicles.
                                    Though you leave the circle, the gates of Chittorgarh remain forever open to your return.
                                </p>

                                <div className="navigation-choices">
                                    <Link href="/" className="nav-btn primary">
                                        <Home size={18} />
                                        <span>Return to the Citadel</span>
                                    </Link>
                                    <Link href="/explore" className="nav-btn secondary">
                                        <MoveLeft size={18} />
                                        <span>Continue Your Exploration</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="gold-seal bottom"></div>
                </main>

                <footer className="page-footer">
                    <p className="copyright">&copy; {new Date().getFullYear()} Chittorgarh Tourism — The Saga of Bravery & Sacrifice</p>
                </footer>
            </div>

            <style jsx>{`
                .unsubscribe-page {
                    min-height: 100vh;
                    background: #0a0705;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    color: #fff;
                    font-family: var(--font-jost), sans-serif;
                }

                .hero-bg {
                    position: absolute;
                    inset: 0;
                    background: url('/hero_bg.jpg') center center / cover no-repeat;
                    opacity: 0.15;
                    filter: saturate(0.5) contrast(1.2);
                    z-index: 1;
                }

                .overlay-gradient {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, transparent 0%, #0a0705 100%);
                    z-index: 2;
                }

                .container {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 600px;
                    padding: 40px 20px;
                }

                .prestige-box {
                    background: rgba(20, 15, 11, 0.9);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    padding: 80px 40px;
                    text-align: center;
                    position: relative;
                    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .prestige-box.reveal {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* Ritual Loader */
                .ritual-loader {
                    padding: 40px 0;
                }

                .loader-ring {
                    width: 60px;
                    height: 60px;
                    border: 1px solid rgba(212, 175, 55, 0.1);
                    border-top: 1px solid var(--gold);
                    border-radius: 50%;
                    margin: 0 auto;
                    animation: spin 2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                }

                .loader-icon {
                    margin-top: -42px;
                    color: var(--gold);
                    animation: pulse 2s ease-in-out infinite;
                }

                .loader-text {
                    margin-top: 40px;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    color: rgba(212, 175, 55, 0.6);
                    font-weight: 600;
                }

                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }

                /* Final State Styling */
                .status-badge {
                    display: inline-block;
                    padding: 6px 20px;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 100px;
                    margin-bottom: 2rem;
                    background: rgba(212, 175, 55, 0.05);
                }

                .badge-text {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    color: var(--gold);
                    font-weight: 700;
                }

                .royal-title {
                    font-family: var(--font-cormorant), serif;
                    font-size: clamp(2.5rem, 5vw, 3.5rem);
                    line-height: 1;
                    margin-bottom: 1.5rem;
                    font-weight: 400;
                }

                .royal-title span {
                    display: block;
                    font-style: italic;
                    font-weight: 600;
                    color: var(--gold);
                }

                .ornament-divider {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                    margin-bottom: 2.5rem;
                }

                .line {
                    width: 40px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent);
                }

                .diamond {
                    width: 6px;
                    height: 6px;
                    background: var(--gold);
                    transform: rotate(45deg);
                    box-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
                }

                .proclamation {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: rgba(255, 255, 255, 0.5);
                    max-width: 480px;
                    margin: 0 auto 4rem;
                    font-weight: 300;
                }

                .highlight {
                    color: #fff;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.3);
                }

                .navigation-choices {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .nav-btn {
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                    text-decoration: none;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                }

                .nav-btn.primary {
                    background: var(--gold);
                    color: #000;
                }

                .nav-btn.primary:hover {
                    background: #fff;
                    transform: translateY(-2px);
                }

                .nav-btn.secondary {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #fff;
                }

                .nav-btn.secondary:hover {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(212, 175, 55, 0.3);
                }

                /* Royal Accents */
                .gold-seal {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 150px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, var(--gold), transparent);
                    opacity: 0.5;
                }

                .gold-seal.top { top: 40px; }
                .gold-seal.bottom { bottom: 40px; }

                .page-footer {
                    margin-top: 40px;
                    text-align: center;
                    opacity: 0.3;
                }

                .copyright {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }

                @media (max-width: 640px) {
                    .container {
                        padding: 20px 0;
                    }
                    .prestige-box {
                        padding: 60px 20px;
                        border-left: none;
                        border-right: none;
                        border-radius: 0;
                        box-shadow: none;
                    }
                    .royal-title {
                        font-size: 2rem;
                    }
                    .proclamation {
                        font-size: 1rem;
                        margin-bottom: 3rem;
                    }
                    .gold-seal {
                        width: 80px;
                    }
                }
            `}</style>
        </div>
    );
}

export default function UnsubscribePage() {
    return (
        <Suspense fallback={<div style={{ background: '#0a0705', minHeight: '100vh' }}></div>}>
            <UnsubscribeContent />
        </Suspense>
    );
}
