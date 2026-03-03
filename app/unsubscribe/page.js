"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShieldOff, Home, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

function UnsubscribeContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        // Simulate a brief processing delay for a "premium" feel
        const timer = setTimeout(() => {
            setIsProcessing(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="unsubscribe-wrapper">
            <div className="glass-card">
                <div className="ornament top"></div>

                {isProcessing ? (
                    <div className="processing">
                        <div className="spinner"></div>
                        <p>Updating the Heritage Records...</p>
                    </div>
                ) : (
                    <div className="success-state">
                        <div className="icon-circle">
                            <ShieldOff size={40} className="icon" />
                        </div>
                        <h1 className="title">Departure Confirmed</h1>
                        <p className="description">
                            The chronicles will no longer reach <strong>{email || 'your inbox'}</strong>.
                            Your place in the Heritage Circle has been preserved in our archives should you wish to return.
                        </p>

                        <div className="action-grid">
                            <Link href="/" className="btn-primary">
                                <Home size={18} /> Return to Citadel
                            </Link>
                            <Link href="/explore" className="btn-secondary">
                                <ArrowLeft size={18} /> Continue Exploring
                            </Link>
                        </div>
                    </div>
                )}

                <div className="ornament bottom"></div>
            </div>

            <style jsx>{`
                .unsubscribe-wrapper {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #050302;
                    padding: 20px;
                    font-family: var(--font-jost), sans-serif;
                }

                .glass-card {
                    width: 100%;
                    max-width: 500px;
                    background: rgba(20, 15, 11, 0.8);
                    border: 1px solid rgba(212, 175, 55, 0.15);
                    padding: 60px 40px;
                    text-align: center;
                    position: relative;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.8);
                    overflow: hidden;
                }

                .ornament {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #d4af37, transparent);
                }
                .ornament.top { top: 30px; }
                .ornament.bottom { bottom: 30px; }

                .processing {
                    padding: 40px 0;
                }

                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 2px solid rgba(212, 175, 55, 0.1);
                    border-top-color: #d4af37;
                    border-radius: 50%;
                    margin: 0 auto 20px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .icon-circle {
                    width: 80px;
                    height: 80px;
                    background: rgba(212, 175, 55, 0.05);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 30px;
                }

                .icon { color: #d4af37; }

                .title {
                    font-family: var(--font-cormorant), serif;
                    font-size: 2.5rem;
                    color: #fff;
                    margin-bottom: 1rem;
                }

                .description {
                    color: rgba(255,255,255,0.5);
                    line-height: 1.7;
                    margin-bottom: 40px;
                }

                .description strong { color: #fff; font-weight: 400; }

                .action-grid {
                    display: grid;
                    gap: 15px;
                }

                .btn-primary, .btn-secondary {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    height: 55px;
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: 0.3s;
                }

                .btn-primary {
                    background: #d4af37;
                    color: #000;
                }

                .btn-primary:hover {
                    background: #fff;
                }

                .btn-secondary {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                }

                .btn-secondary:hover {
                    background: rgba(255,255,255,0.08);
                }
            `}</style>
        </div>
    );
}

export default function UnsubscribePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UnsubscribeContent />
        </Suspense>
    );
}
