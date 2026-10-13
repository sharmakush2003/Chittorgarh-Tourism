"use client";

import { useLanguage } from "@/context/LanguageContext";
import { MessageSquareQuote, ArrowUpRight } from "lucide-react";

export default function FeedbackClient() {
    const { t } = useLanguage();
    
    const feedbackUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeBDx8SK9Rm-S0QBO6wCFV5v-pfE6uCYTYU6ubMR5jNDOkpOA/viewform";

    const getTranslation = (key, fallback) => {
        const val = t(key);
        // If translation is missing, it returns the key itself. So we use the fallback.
        return val === key ? fallback : val;
    };

    return (
        <div className="page-wrapper">
            <div className="hero-section">
                <div className="hero-content">
                    {/* Decorative top line */}
                    <div className="hero-ornament-top" aria-hidden="true">
                        <span className="ornament-line-h" />
                        <span className="ornament-diamond-sm">◆</span>
                        <span className="ornament-line-h" />
                    </div>

                    {/* Premium Icon Badge */}
                    <div className="hero-icon-badge">
                        <div className="hero-icon-ring-outer">
                            <div className="hero-icon-ring-inner">
                                <MessageSquareQuote size={32} strokeWidth={1.5} />
                            </div>
                        </div>
                    </div>
                    
                    {/* RTDC Logo */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.8rem' }}>
                        <img src="/rtdc-logo.jpeg" alt="RTDC" style={{ height: '40px', borderRadius: '4px' }} />
                    </div>

                    <p className="hero-eyebrow">{getTranslation("nav.logoPart1", "Chittorgarh")} {getTranslation("nav.logoPart2", "Tourism")}</p>
                    <h1 className="hero-title">{getTranslation("nav.feedback", "Feedback Hub")}</h1>

                    <div className="hero-divider" aria-hidden="true">
                        <span className="divider-line" />
                        <span className="divider-motif">✦</span>
                        <span className="divider-line" />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="feedback-card">
                    <p className="card-eyebrow">{getTranslation("feedback.eyebrow", "YOUR VOICE MATTERS")}</p>
                    <h2 className="card-title">{getTranslation("feedback.title", "Share Your Feedback")}</h2>
                    <p className="card-desc">
                        {getTranslation("feedback.desc", "Thank you for visiting Chittorgarh! Your feedback helps us improve the tourism experience and preserve the heritage of this historic city. Please click below to fill the feedback form directly.")}
                    </p>

                    <div className="feedback-form-area">
                        <div className="action-container">
                            <a href={feedbackUrl} target="_blank" rel="noopener noreferrer" className="primary-btn">
                                {getTranslation("feedback.button", "Open Feedback Form")}
                                <ArrowUpRight size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .page-wrapper {
                    min-height: 100vh;
                    padding-top: 120px;
                    padding-bottom: 6rem;
                    background: var(--ivory);
                }

                /* ── HERO SECTION ── */
                .hero-section {
                    position: relative;
                    text-align: center;
                    padding: 3.5rem 1.5rem 2.5rem;
                    margin-bottom: 1rem;
                }

                .hero-content {
                    max-width: 720px;
                    margin: 0 auto;
                }

                .hero-ornament-top {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    margin-bottom: 2rem;
                }
                .ornament-line-h {
                    display: block;
                    width: 60px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(166,124,0,0.5), transparent);
                }
                .ornament-diamond-sm {
                    font-size: 0.6rem;
                    color: rgba(166,124,0,0.6);
                    letter-spacing: 0.3rem;
                }

                .hero-icon-badge {
                    display: inline-flex;
                    margin-bottom: 1.5rem;
                }
                .hero-icon-ring-outer {
                    width: 88px;
                    height: 88px;
                    border-radius: 50%;
                    border: 1px solid rgba(166,124,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #FFFFFF;
                    box-shadow: 0 4px 20px rgba(166,124,0,0.08);
                }
                .hero-icon-ring-inner {
                    color: #D4AF37;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .hero-eyebrow {
                    font-size: 0.8rem;
                    font-weight: 600;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    color: rgba(166,124,0,0.7);
                    margin-bottom: 0.6rem;
                }

                .hero-title {
                    font-family: var(--ff-display), serif;
                    font-size: clamp(2.2rem, 5vw, 3.6rem);
                    line-height: 1.15;
                    margin-bottom: 1.2rem;
                    color: #B8860B; /* Replaced dark gradient with beautiful solid gold */
                    font-weight: 700;
                }

                .hero-divider {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.8rem;
                    margin-bottom: 1.2rem;
                }
                .divider-line {
                    display: block;
                    flex: 1;
                    max-width: 80px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(166,124,0,0.45));
                }
                .divider-line:last-child {
                    background: linear-gradient(90deg, rgba(166,124,0,0.45), transparent);
                }
                .divider-motif {
                    font-size: 0.65rem;
                    color: rgba(166,124,0,0.7);
                    letter-spacing: 0.15rem;
                }

                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                /* ── NEW LIGHT CARD DESIGN ── */
                .feedback-card {
                    background: #FFFFFF;
                    border: 1px solid rgba(212, 175, 55, 0.25);
                    border-radius: 24px;
                    padding: 4rem 3.5rem;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.03), 0 5px 15px rgba(212, 175, 55, 0.05);
                    text-align: center;
                    margin: 0 auto;
                }

                .card-eyebrow {
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.2em;
                    color: #B8860B;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                }

                .card-title {
                    font-family: var(--ff-display), serif;
                    font-size: 2.4rem;
                    color: #2C2C2C;
                    margin-bottom: 1.2rem;
                    font-weight: 600;
                }

                .card-desc {
                    color: #555555;
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin-bottom: 2.5rem;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .feedback-form-area {
                    text-align: center;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .action-container {
                    display: flex;
                    justify-content: center;
                }

                .primary-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.8rem;
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
                    color: #FFFFFF;
                    padding: 1.1rem 2.5rem;
                    border-radius: 50px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 8px 20px rgba(184, 134, 11, 0.25);
                    border: none;
                }

                .primary-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 25px rgba(184, 134, 11, 0.35);
                    background: linear-gradient(135deg, #E6C247 0%, #C9971C 100%);
                }

                @media (max-width: 768px) {
                    .page-wrapper { padding-top: 100px; padding-bottom: 4rem; }
                    .hero-section { padding: 2rem 1rem 1.5rem; }
                    .feedback-card {
                        padding: 2.5rem 1.5rem;
                        border-radius: 20px;
                    }
                    .card-title {
                        font-size: 2rem;
                    }
                    .card-desc {
                        font-size: 1rem;
                        margin-bottom: 2rem;
                    }
                    .primary-btn {
                        padding: 1rem 2rem;
                        font-size: 1.05rem;
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    );
}
