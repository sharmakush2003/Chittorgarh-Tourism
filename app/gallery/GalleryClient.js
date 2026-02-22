"use client";

import React, { useEffect, useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import './gallery.css';

export default function GalleryClient({ images }) {
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        setMounted(true);
        const reveals = document.querySelectorAll('.gallery-item');

        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 100;

            // Handle fade-in reveal
            reveals.forEach((reveal) => {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        setTimeout(revealOnScroll, 100);

        return () => window.removeEventListener('scroll', revealOnScroll);
    }, []);

    // Handle Lightbox Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedIndex === null) return;
            if (e.key === 'Escape') setSelectedIndex(null);
            if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev + 1) % images.length);
            if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, images.length]);

    if (!mounted) return null;

    // Helper function to assign magazine-style varied grid sizing
    const getGridClass = (index) => {
        // Just some hardcoded aesthetics to break up the monotonous grid
        if (index === 0 || index === 7) return 'gallery-item-large';
        if (index === 3 || index === 14) return 'gallery-item-wide';
        if (index === 10 || index === 18) return 'gallery-item-tall';
        return '';
    };

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
                            <div
                                key={idx}
                                className={`gallery-item ${getGridClass(idx)}`}
                                style={{ transitionDelay: `${(idx % 6) * 0.1}s` }}
                                onClick={() => setSelectedIndex(idx)}
                            >
                                <div className="gallery-item-image">
                                    <img src={item.src} alt={`Heritage Visual ${idx + 1}`} loading="lazy" />
                                    <div className="expand-hint">
                                        <Maximize2 size={24} />
                                    </div>
                                </div>
                                <div className="gallery-item-content">
                                    <p>{item.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CINEMATIC LIGHTBOX ════════════════════ */}
            {selectedIndex !== null && (
                <div className="lightbox-overlay" onClick={() => setSelectedIndex(null)}>
                    <button className="lightbox-close" onClick={() => setSelectedIndex(null)}>
                        <X size={32} />
                    </button>

                    <button
                        className="lightbox-nav lightbox-prev"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
                        }}
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={images[selectedIndex].src}
                            alt={`Expanded Heritage Visual ${selectedIndex + 1}`}
                            className="lightbox-img"
                        />
                        <div className="lightbox-caption">
                            <p>{images[selectedIndex].caption}</p>
                            <span className="lightbox-counter">{selectedIndex + 1} / {images.length}</span>
                        </div>
                    </div>

                    <button
                        className="lightbox-nav lightbox-next"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndex((prev) => (prev + 1) % images.length);
                        }}
                    >
                        <ChevronRight size={48} />
                    </button>
                </div>
            )}
        </div>
    );
}
