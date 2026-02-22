"use client";

import React, { useEffect, useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import './gallery.css';

export default function GalleryClient({ images }) {
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Simple scroll reveal logic
        const reveals = document.querySelectorAll('.gallery-item');

        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 100;

            reveals.forEach((reveal) => {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        // Trigger once on mount
        setTimeout(revealOnScroll, 100);

        return () => window.removeEventListener('scroll', revealOnScroll);
    }, []);

    if (!mounted) return null;

    return (
        <div className="gallery-page">
            {/* ═══ FIXED BACKGROUND ══════════════════════ */}
            <div className="fixed-bg"></div>
            <div className="bg-overlay"></div>

            <div className="gallery-hero">
                <h1 className="gallery-title">{t("gallery.title")}</h1>
                <p className="gallery-sub">{t("gallery.subtitle")}</p>
                <div className="gallery-divider" />
            </div>

            <section className="gallery-section">
                <div className="container">
                    <div className="gallery-masonry">
                        {images.map((item, idx) => (
                            <div key={idx} className="gallery-item" style={{ transitionDelay: `${(idx % 6) * 0.1}s` }}>
                                <div className="gallery-item-image">
                                    <img src={item.src} alt={`Heritage Visual ${idx + 1}`} loading="lazy" />
                                </div>
                                <div className="gallery-item-content">
                                    <p>{item.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
