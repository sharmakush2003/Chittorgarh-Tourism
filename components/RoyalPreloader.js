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
                width: '100%',
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
                        <img 
                            src="/rtdc-logo.jpeg" 
                            alt="RTDC Logo" 
                            style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '4px' }} 
                        />
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

                .royal-spinner {
                    width: 32px;
                    height: 32px;
                    border: 2.5px solid rgba(212, 175, 55, 0.2);
                    border-top-color: #D4AF37;
                    border-radius: 50%;
                    animation: royalSpin 0.8s linear infinite;
                    margin-top: 0.6rem;
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
            `}</style>
        </div>
    );
}

