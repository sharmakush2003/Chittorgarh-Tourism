"use client";

import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import './gallery.css';

export default function GalleryClient({ images }) {
    const { t } = useLanguage();

    return (
        <div className="gallery-page">
            <div className="gallery-hero">
                <h1 className="gallery-title">{t("gallery.title")}</h1>
                <p className="gallery-sub">{t("gallery.subtitle")}</p>
                <div className="gallery-divider" />
            </div>

            <section className="gallery-section">
                <div className="container">
                    <div className="gallery-grid">
                        {images.map((img, idx) => (
                            <div key={idx} className="gallery-item">
                                <img src={`/pinterest/${img}`} alt={`Chittorgarh Fort Pinterest Image ${idx + 1}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
