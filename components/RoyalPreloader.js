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
                backgroundColor: '#0A0806',
                background: 'radial-gradient(ellipse at center, #1C140F 0%, #0A0806 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
            }}
        >
            <div className="preloader-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', textAlign: 'center' }}>
                <div className="royal-crest-glow" style={{ position: 'relative', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="royal-ring-spin"></div>
                    <div className="royal-emblem" style={{ fontSize: '2.2rem' }}>🏰</div>
                </div>
                <div className="royal-title-wrap">
                    <h2 className="preloader-brand" style={{ fontSize: '1.6rem', color: '#FFFFFF', margin: 0 }}>
                        Chittorgarh <span style={{ color: '#D4AF37' }}>Tourism</span>
                    </h2>
                    <p className="preloader-tagline" style={{ fontSize: '0.68rem', letterSpacing: '0.25em', color: 'rgba(245, 230, 171, 0.9)', textTransform: 'uppercase', marginTop: '0.25rem', fontWeight: '700' }}>
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
                    background: radial-gradient(ellipse at center, #1C140F 0%, #0A0806 100%);
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
                    width: 70px;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .royal-ring-spin {
                    position: absolute;
                    inset: 0;
                    border: 2px solid rgba(212, 175, 55, 0.2);
                    border-top-color: #D4AF37;
                    border-right-color: #F5E6AB;
                    border-radius: 50%;
                    animation: royalSpin 0.8s linear infinite;
                }

                .royal-emblem {
                    font-size: 2.2rem;
                    filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.8));
                }

                .preloader-brand {
                    font-family: var(--ff-display), serif;
                    font-size: 1.6rem;
                    color: #FFFFFF;
                    letter-spacing: 0.02em;
                    margin: 0;
                }

                .preloader-brand span {
                    color: #D4AF37;
                }

                .preloader-tagline {
                    font-size: 0.68rem;
                    letter-spacing: 0.25em;
                    color: rgba(245, 230, 171, 0.8);
                    text-transform: uppercase;
                    margin-top: 0.25rem;
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

                @keyframes royalFill {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}
