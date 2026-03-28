"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { triggerHaptic } from "@/lib/haptics";

export default function ComingSoonPage() {
    const { t } = useLanguage();

    return (
        <div className="coming-soon-container">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="content"
            >

                <div className="icon-wrapper">
                    <Clock size={48} className="icon" />
                </div>

                <h1 className="title">Coming Soon</h1>
                <p className="description">
                    We are currently crafting a rich, immersive experience for this landmark. 
                    Every stone here has a story, and we want to tell it perfectly. 
                    Stay tuned for a royal update!
                </p>

                <div className="gold-divider"></div>

                <Link href="/explore" className="btn-gold" onClick={() => triggerHaptic('light')}>
                    Explore Other Landmarks
                </Link>
            </motion.div>

            <style jsx>{`
                .coming-soon-container {
                    min-height: 100vh;
                    background: #0a0804;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    padding: 2rem;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }

                /* Background Effects */
                .coming-soon-container::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
                    pointer-events: none;
                }

                .content {
                    max-width: 600px;
                    width: 100%;
                    z-index: 10;
                    padding: 4rem 2rem;
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .back-link {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: rgba(255, 255, 255, 0.6);
                    text-decoration: none;
                    font-size: 0.9rem;
                    margin-bottom: 3rem;
                    transition: color 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .back-link:hover {
                    color: var(--gold, #d4af37);
                }

                .icon-wrapper {
                    margin-bottom: 2rem;
                    color: var(--gold, #d4af37);
                    filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.3));
                }

                .title {
                    font-family: var(--ff-display, 'Playfair Display', serif);
                    font-size: clamp(2.5rem, 8vw, 4rem);
                    font-weight: 800;
                    margin-bottom: 1.5rem;
                    background: linear-gradient(135deg, #fff 0%, #d4af37 50%, #b8860b 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .description {
                    font-size: 1.15rem;
                    line-height: 1.8;
                    color: rgba(255, 255, 255, 0.85);
                    margin-bottom: 3rem;
                }

                .gold-divider {
                    width: 60px;
                    height: 2px;
                    background: var(--gold, #d4af37);
                    margin-bottom: 3rem;
                }

                .btn-gold {
                    display: inline-block;
                    padding: 1rem 2rem;
                    background: var(--gold, #d4af37);
                    color: #000;
                    text-decoration: none;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
                }

                .btn-gold:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 30px rgba(212, 175, 55, 0.4);
                    background: #e5c05b;
                }
            `}</style>
        </div>
    );
}
