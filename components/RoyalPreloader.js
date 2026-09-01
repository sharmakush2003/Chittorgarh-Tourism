"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RoyalPreloader() {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 550); // Smooth 550ms royal preloader

        return () => clearTimeout(timer);
    }, [pathname]);

    if (!loading) return null;

    return (
        <div 
            className="royal-preloader"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 999999,
                backgroundColor: '#080604',
                background: 'radial-gradient(ellipse at center, #1C140F 0%, #080604 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
            }}
        >
            <div className="preloader-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', textAlign: 'center' }}>
                <div className="royal-crest-glow" style={{ position: 'relative', width: '84px', height: '84px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="royal-ring-outer"></div>
                    <div className="royal-ring-spin"></div>
                    <div className="royal-emblem">
                        <svg 
                            width="48" 
                            height="48" 
                            viewBox="0 0 100 100" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="stambh-svg"
                        >
                            <defs>
                                <linearGradient id="royalGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FFF5CC" />
                                    <stop offset="30%" stopColor="#F5D77F" />
                                    <stop offset="70%" stopColor="#D4AF37" />
                                    <stop offset="100%" stopColor="#9E7D23" />
                                </linearGradient>
                                <filter id="royalGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#D4AF37" floodOpacity="0.75"/>
                                </filter>
                            </defs>

                            {/* Mewar Radiant Sun Rays */}
                            <g opacity="0.5" stroke="url(#royalGoldGrad)" strokeWidth="1.2" strokeLinecap="round">
                                <line x1="50" y1="7" x2="50" y2="13" />
                                <line x1="50" y1="87" x2="50" y2="93" />
                                <line x1="7" y1="50" x2="13" y2="50" />
                                <line x1="87" y1="50" x2="93" y2="50" />
                                <line x1="20" y1="20" x2="25" y2="25" />
                                <line x1="75" y1="75" x2="80" y2="80" />
                                <line x1="20" y1="80" x2="25" y2="75" />
                                <line x1="75" y1="25" x2="80" y2="20" />
                            </g>

                            {/* Ornate Dashed Halo Ring */}
                            <circle cx="50" cy="50" r="42" stroke="url(#royalGoldGrad)" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.55" />

                            {/* Vijay Stambh (Tower of Victory) Silhouette & Balconies */}
                            <g filter="url(#royalGlowFilter)" fill="url(#royalGoldGrad)" stroke="url(#royalGoldGrad)" strokeLinejoin="round">
                                {/* Kalash & Rajput Royal Flag */}
                                <path d="M50 13 L50 19 M50 14 L57 16.5 L50 19" strokeWidth="1.2" fill="none"/>
                                <circle cx="50" cy="19" r="1.5" />

                                {/* Top Chhatri Dome */}
                                <path d="M42 26 Q50 20 58 26 L59 28 L41 28 Z" />

                                {/* Tier 1 */}
                                <rect x="44" y="29" width="12" height="6" rx="0.5" />
                                <line x1="40" y1="35" x2="60" y2="35" strokeWidth="1.8" />

                                {/* Tier 2 */}
                                <rect x="43" y="36" width="14" height="7" rx="0.5" />
                                <line x1="39" y1="43" x2="61" y2="43" strokeWidth="1.8" />

                                {/* Tier 3 with Arch Cutout */}
                                <rect x="42" y="44" width="16" height="8" rx="0.5" />
                                <circle cx="50" cy="48" r="1.5" fill="#080604" stroke="none" />
                                <line x1="37" y1="52" x2="63" y2="52" strokeWidth="2" />

                                {/* Tier 4 */}
                                <rect x="41" y="53" width="18" height="9" rx="0.5" />
                                <line x1="36" y1="62" x2="64" y2="62" strokeWidth="2.2" />

                                {/* Tier 5 (Base Level with Entry Arch) */}
                                <rect x="39" y="63" width="22" height="11" rx="0.5" />
                                <path d="M47 74 A3 3 0 0 1 53 74 Z" fill="#080604" stroke="none" />

                                {/* Fort Stepped Plinth */}
                                <rect x="34" y="74" width="32" height="4" rx="1" />
                                <rect x="30" y="78" width="40" height="4" rx="1" />
                                <line x1="26" y1="82" x2="74" y2="82" strokeWidth="2" strokeLinecap="round" />
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="royal-title-wrap">
                    <h2 className="preloader-brand" style={{ fontSize: '1.6rem', color: '#FFFFFF', margin: 0 }}>
                        Chittorgarh <span style={{ color: '#D4AF37' }}>Tourism</span>
                    </h2>
                    <p className="preloader-tagline" style={{ fontSize: '0.68rem', letterSpacing: '0.25em', color: 'rgba(245, 230, 171, 0.9)', textTransform: 'uppercase', marginTop: '0.35rem', fontWeight: '700' }}>
                        ROYAL HERITAGE GATEWAY
                    </p>
                </div>
                <div className="royal-progress-bar" style={{ width: '140px', height: '2px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden', marginTop: '0.5rem' }}>
                    <div className="royal-progress-fill"></div>
                </div>
            </div>

            <style jsx global>{`
                .royal-preloader {
                    position: fixed;
                    inset: 0;
                    z-index: 99999;
                    background: radial-gradient(ellipse at center, #1C140F 0%, #080604 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #FFFFFF;
                    transition: opacity 0.4s ease-out;
                }

                .preloader-inner {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.25rem;
                    text-align: center;
                }

                .royal-crest-glow {
                    position: relative;
                    width: 84px;
                    height: 84px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .royal-ring-outer {
                    position: absolute;
                    inset: 0;
                    border: 1px dashed rgba(212, 175, 55, 0.25);
                    border-radius: 50%;
                    animation: royalSpinReverse 16s linear infinite;
                }

                .royal-ring-spin {
                    position: absolute;
                    inset: 4px;
                    border: 2px solid rgba(212, 175, 55, 0.15);
                    border-top-color: #D4AF37;
                    border-right-color: #F5E6AB;
                    border-radius: 50%;
                    animation: royalSpin 1.1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                    filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.4));
                }

                .royal-emblem {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: royalPulse 2s ease-in-out infinite;
                }

                .stambh-svg {
                    filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.7));
                }

                .preloader-brand {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.6rem;
                    color: #FFFFFF;
                    letter-spacing: 0.02em;
                    margin: 0;
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
                }

                .preloader-brand span {
                    color: #D4AF37;
                }

                .preloader-tagline {
                    font-size: 0.68rem;
                    letter-spacing: 0.25em;
                    color: rgba(245, 230, 171, 0.85);
                    text-transform: uppercase;
                    margin-top: 0.35rem;
                    font-weight: 700;
                }

                .royal-progress-bar {
                    width: 140px;
                    height: 2px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                    overflow: hidden;
                    margin-top: 0.5rem;
                }

                .royal-progress-fill {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, #D4AF37, #F5E6AB);
                    animation: royalFill 0.55s ease-out forwards;
                }

                @keyframes royalSpin {
                    to { transform: rotate(360deg); }
                }

                @keyframes royalSpinReverse {
                    to { transform: rotate(-360deg); }
                }

                @keyframes royalPulse {
                    0%, 100% { transform: scale(1); opacity: 0.95; }
                    50% { transform: scale(1.04); opacity: 1; }
                }

                @keyframes royalFill {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}
