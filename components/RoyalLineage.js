"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export default function RoyalLineage() {
    const { t } = useLanguage();
    const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const rulers = [
        { id: "bappa", image: "/Linage pics/Bappa Rawal.png", link: "https://en.wikipedia.org/wiki/Bappa_Rawal" },
        { id: "ratan", image: "/Linage pics/Rawal Ratan Singh.png", link: "https://en.wikipedia.org/wiki/Ratnasimha" },
        { id: "hammir", image: "/Linage pics/Rana Hammir Sing.png", link: "https://en.wikipedia.org/wiki/Hammir_Singh" },
        { id: "kumbha", image: "/Linage pics/Rana Kumbha.png", link: "https://en.wikipedia.org/wiki/Kumbha_of_Mewar" },
        { id: "sanga", image: "/Linage pics/Rana Sanga.png", link: "https://en.wikipedia.org/wiki/Rana_Sanga" },
        { id: "udai", image: "/Linage pics/Rana Udai Singh II.png", link: "https://en.wikipedia.org/wiki/Udai_Singh_II" },
        { id: "pratap", image: "/Linage pics/Maharana Pratap.png", link: "https://en.wikipedia.org/wiki/Maharana_Pratap" }
    ];

    // Auto-scroll logic
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId;
        let lastTimestamp = 0;
        const speed = 0.5; // Pixels per frame (~30-60px per second)

        const step = (timestamp) => {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const deltaTime = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            if (!isHovered) {
                scrollContainer.scrollLeft += speed;

                // Reset to start for infinite loop feeling (if content is scrolled fully)
                if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 5) {
                    scrollContainer.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(step);
        };

        animationFrameId = requestAnimationFrame(step);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered]);

    return (
        <section className="lineage-section">
            <div className="lineage-header">
                <span className="eyebrow">{t("chron.eyebrow")}</span>
                <h2 className="section-title">{t("lineage.title")}</h2>
                <p className="section-desc">{t("lineage.sub")}</p>
            </div>

            <div className="lineage-wrapper"
                ref={scrollRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <div className="lineage-scroll">
                    {rulers.map((ruler, index) => (
                        <div key={ruler.id} className="ruler-card" style={{ transitionDelay: `${index * 0.1}s` }}>
                            <div className="card-glow"></div>

                            <div className="ruler-image-container">
                                <Image
                                    src={ruler.image}
                                    alt={t(`lineage.${ruler.id}.name`)}
                                    fill
                                    className="ruler-image"
                                    sizes="300px"
                                    priority={index < 3}
                                />
                                <div className="image-overlay"></div>
                            </div>

                            <div className="card-content">
                                <div className="card-top">
                                    <span className="ruler-period">{t(`lineage.${ruler.id}.period`)}</span>
                                </div>
                                <div className="card-body">
                                    <h3 className="ruler-name">{t(`lineage.${ruler.id}.name`)}</h3>
                                    <span className="ruler-honorific">{t(`lineage.${ruler.id}.title`)}</span>
                                    <p className="ruler-desc">{t(`lineage.${ruler.id}.desc`)}</p>
                                    <a href={ruler.link} target="_blank" rel="noopener noreferrer" className="wiki-link">
                                        {t("chron.btn.wikipedia") || "Wikipedia"} <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                            <div className="card-connector"></div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .lineage-section {
                    padding: 6rem 0;
                    background: rgba(20, 15, 10, 0.4);
                    position: relative;
                    z-index: 5;
                    border-top: 1px solid rgba(212, 175, 55, 0.1);
                    border-bottom: 1px solid rgba(212, 175, 55, 0.1);
                }

                .lineage-header {
                    text-align: center;
                    padding: 0 2rem;
                    margin-bottom: 4rem;
                }

                .section-title {
                    font-family: var(--ff-display);
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    color: #fff;
                    margin-bottom: 1rem;
                    background: linear-gradient(to bottom, #fff, #D4AF37);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .section-desc {
                    color: rgba(255, 255, 255, 0.6);
                    max-width: 600px;
                    margin: 0 auto;
                    font-size: 1.1rem;
                }

                .lineage-wrapper {
                    overflow-x: auto;
                    padding: 2rem 0;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }

                .lineage-wrapper::-webkit-scrollbar {
                    display: none;
                }

                .lineage-scroll {
                    display: flex;
                    gap: 3rem;
                    padding: 0 4rem;
                    width: max-content;
                }

                .ruler-card {
                    width: 300px;
                    background: rgba(30, 25, 20, 0.6);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    position: relative;
                    transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    border-radius: 8px;
                }

                .ruler-card:hover {
                    transform: translateY(-15px);
                    border-color: var(--gold);
                    background: rgba(40, 35, 30, 0.9);
                    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
                    cursor: pointer;
                }

                .ruler-image-container {
                    position: relative;
                    width: 100%;
                    height: 380px;
                    overflow: hidden;
                }

                .ruler-image {
                    object-fit: cover;
                    object-position: center;
                    transform: scale(1.02);
                    transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .ruler-card:hover .ruler-image {
                    transform: scale(1.1);
                }

                .image-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, 
                        rgba(30, 25, 20, 0) 0%, 
                        rgba(30, 25, 20, 0.4) 50%,
                        rgba(30, 25, 20, 0.9) 100%
                    );
                }

                .card-content {
                    padding: 1.5rem 2rem 2.5rem;
                    position: relative;
                    margin-top: -60px;
                    z-index: 2;
                }

                .card-top {
                    margin-bottom: 0.75rem;
                }

                .ruler-period {
                    font-family: var(--ff-body);
                    font-size: 0.8rem;
                    letter-spacing: 2px;
                    color: var(--gold);
                    opacity: 0.9;
                    text-transform: uppercase;
                    font-weight: 700;
                }

                .ruler-name {
                    font-family: var(--ff-display);
                    font-size: 1.75rem;
                    color: #fff;
                    margin-bottom: 0.25rem;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                }

                .ruler-honorific {
                    display: block;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: var(--gold);
                    margin-bottom: 1.25rem;
                    font-weight: 700;
                    opacity: 0.7;
                }

                .ruler-desc {
                    font-size: 0.9rem;
                    line-height: 1.6;
                    color: rgba(255, 255, 255, 0.7);
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    margin-bottom: 1.5rem;
                }

                .wiki-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                    color: var(--gold);
                    text-decoration: none;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    font-weight: 700;
                    opacity: 0.6;
                    transition: opacity 0.3s ease;
                }

                .wiki-link:hover {
                    opacity: 1;
                }

                .card-connector {
                    position: absolute;
                    top: 50%;
                    right: -3rem;
                    width: 3rem;
                    height: 1px;
                    background: linear-gradient(to right, rgba(212, 175, 55, 0.3), transparent);
                    z-index: -1;
                }

                .ruler-card:last-child .card-connector {
                    display: none;
                }

                @media (max-width: 768px) {
                    .lineage-scroll { gap: 2rem; padding: 0 2rem; }
                    .ruler-card { width: 280px; }
                    .ruler-image-container { height: 320px; }
                    .section-title { font-size: 2.5rem; }
                    .card-content { padding: 1.25rem 1.5rem 2rem; }
                }
            `}</style>
        </section>
    );
}
