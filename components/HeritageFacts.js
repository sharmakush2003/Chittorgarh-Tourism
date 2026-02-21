"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Info, ChevronRight, X } from 'lucide-react';

export default function HeritageFacts() {
    const { t } = useLanguage();
    const [currentFact, setCurrentFact] = useState(1);
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    const TOTAL_FACTS = 10;

    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            handleNextFact();
        }, 15000); // Rotate every 15 seconds

        return () => clearInterval(interval);
    }, [currentFact, isVisible]);

    const handleNextFact = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentFact((prev) => (prev % TOTAL_FACTS) + 1);
            setIsAnimating(false);
        }, 500); // Sync with CSS transition
    };

    if (!isVisible) return null;

    return (
        <div className={`facts-widget ${isAnimating ? 'animating' : ''}`}>
            <div className="facts-glass">
                <div className="facts-header">
                    <div className="title-area">
                        <Info className="w-4 h-4 text-gold" />
                        <span className="fact-title">{t('fact.title')}</span>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="close-btn"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="fact-content">
                    <p className="fact-text">
                        {t(`fact.${currentFact}`)}
                    </p>
                </div>

                <div className="facts-footer">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${(currentFact / TOTAL_FACTS) * 100}%` }}
                        ></div>
                    </div>
                    <button onClick={handleNextFact} className="next-btn">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <style jsx>{`
                .facts-widget {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    width: 320px;
                    z-index: 50;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .facts-glass {
                    background: rgba(15, 12, 10, 0.7);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 16px;
                    padding: 1.25rem;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                    position: relative;
                }

                .facts-glass::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent);
                }

                .facts-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .title-area {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .fact-title {
                    font-family: var(--ff-body);
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    color: var(--gold);
                    font-weight: 600;
                }

                .close-btn {
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.5);
                    cursor: pointer;
                    padding: 4px;
                    transition: color 0.3s ease;
                }

                .close-btn:hover {
                    color: #fff;
                }

                .fact-content {
                    min-height: 80px;
                    display: flex;
                    align-items: center;
                    transition: all 0.5s ease;
                }

                .fact-text {
                    font-family: var(--ff-body);
                    font-size: 0.95rem;
                    line-height: 1.5;
                    color: rgba(255, 255, 255, 0.9);
                    font-weight: 300;
                    margin: 0;
                }

                .animating .fact-content {
                    opacity: 0;
                    transform: translateY(10px);
                }

                .facts-footer {
                    margin-top: 1.25rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .progress-bar {
                    flex: 1;
                    height: 2px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 1px;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    background: var(--gold);
                    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .next-btn {
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    color: var(--gold);
                    border-radius: 50%;
                    padding: 6px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .next-btn:hover {
                    background: rgba(212, 175, 55, 0.2);
                    transform: scale(1.1);
                }

                @media (max-width: 768px) {
                    .facts-widget {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
}
