"use client";

import { useState } from 'react';
import { MapPin, Info, Navigation, Layers, Box } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const MONUMENTS = [
    {
        id: 'fort',
        nameKey: 'attr.fort.name',
        descKey: 'attr.fort.desc',
        coords: '24.8870,74.6450',
        zoom: 17,
        link: 'https://en.wikipedia.org/wiki/Chittor_Fort'
    },
    {
        id: 'vijay',
        nameKey: 'attr.vijay.name',
        descKey: 'attr.vijay.desc',
        coords: '24.8879,74.6455',
        zoom: 19,
        link: 'https://en.wikipedia.org/wiki/Vijaya_Stambha'
    },
    {
        id: 'padmini',
        nameKey: 'attr.padmini.name',
        descKey: 'attr.padmini.desc',
        coords: '24.8784,74.6465',
        zoom: 19,
        link: 'https://en.wikipedia.org/wiki/Chittor_Fort#Padmini_Palace'
    },
    {
        id: 'kumbha',
        nameKey: 'attr.kumbha_palace.name',
        descKey: 'attr.kumbha_palace.desc',
        coords: '24.8893,74.6433',
        zoom: 19,
        link: 'https://en.wikipedia.org/wiki/Chittor_Fort#Rana_Kumbha_Palace'
    },
    {
        id: 'gaumukh',
        nameKey: 'attr.gaumukh.name',
        descKey: 'attr.gaumukh.desc',
        coords: '24.8864,74.6453',
        zoom: 19,
        link: 'https://en.wikipedia.org/wiki/Chittor_Fort#Gaumukh_Reservoir'
    },
    {
        id: 'meera',
        nameKey: 'attr.meera.name',
        descKey: 'attr.meera.desc',
        coords: '24.8887,74.6441',
        zoom: 19,
        link: 'https://en.wikipedia.org/wiki/Meera_Temple,_Chittorgarh'
    },
    {
        id: 'fateh',
        nameKey: 'attr.fateh.name',
        descKey: 'attr.fateh.desc',
        coords: '24.8911,74.6436',
        zoom: 19,
        link: 'https://en.wikipedia.org/wiki/Chittor_Fort#Fateh_Prakash_Palace'
    },
    {
        id: 'kirti',
        nameKey: 'attr.kirti.name',
        descKey: 'attr.kirti.desc',
        coords: '24.8943,74.6468',
        zoom: 19,
        link: 'https://en.wikipedia.org/wiki/Kirti_Stambha'
    },
    {
        id: 'kalika',
        nameKey: 'attr.kalika.name',
        descKey: 'attr.kalika.desc',
        coords: '24.8851,74.6472',
        zoom: 19,
        link: 'https://en.wikipedia.org/wiki/Kalika_Mata_Temple,_Chittorgarh_Fort'
    },
    {
        id: 'jain',
        nameKey: 'attr.jain.name',
        descKey: 'attr.jain.desc',
        coords: '24.8945,74.6460',
        zoom: 19,
        link: 'https://en.wikipedia.org/wiki/Chittor_Fort#Jain_temples'
    },
    {
        id: 'ratan',
        nameKey: 'attr.ratan.name',
        descKey: 'attr.ratan.desc',
        coords: '24.8993,74.6445',
        zoom: 19,
        link: 'https://en.wikipedia.org/wiki/Chittor_Fort#Ratan_Singh_Palace'
    },
    {
        id: 'kumbha_shyam',
        nameKey: 'attr.kumbha_shyam.name',
        descKey: 'attr.kumbha_shyam.desc',
        coords: '24.8888,74.6443',
        zoom: 19,
        link: 'https://en.wikipedia.org/wiki/Chittor_Fort#Kumbha_Shyam_temple'
    },
    {
        id: 'light',
        nameKey: 'attr.light.name',
        descKey: 'attr.light.desc',
        coords: '24.8893,74.6433',
        zoom: 19,
        link: 'https://en.wikipedia.org/wiki/Chittor_Fort'
    }
];

export default function FortMap() {
    const { t } = useLanguage();
    const [selectedId, setSelectedId] = useState(MONUMENTS[0].id);

    const active = MONUMENTS.find(m => m.id === selectedId);

    const mapUrl = `https://www.google.com/maps?q=${active.coords}&z=${active.zoom}&t=k&output=embed`;

    return (
        <section className="fort-map-section">
            <div className="container">
                <div className="fort-map-header text-center">
                    <span className="fort-map-eyebrow">Interactive 3D Discovery</span>
                    <h2 className="fort-map-title">Explore the <em>Fort Citadel</em></h2>
                    <p className="fort-map-intro">Fly through the citadel in Satellite 3D view to see the legends up close.</p>
                </div>

                <div className="fm-3d-container">
                    {/* Sidebar / Selector */}
                    <div className="fm-sidebar">
                        <div className="fm-sidebar-header">
                            <Box size={18} className="text-gold" />
                            <span>Heritage Points</span>
                        </div>
                        <div className="fm-monument-list">
                            {MONUMENTS.map((mon) => (
                                <button
                                    key={mon.id}
                                    className={`fm-monument-item ${selectedId === mon.id ? 'active' : ''}`}
                                    onClick={() => setSelectedId(mon.id)}
                                >
                                    <div className="fm-monument-dot"></div>
                                    <span className="fm-monument-name">{t(mon.nameKey)}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Map & Info Panel */}
                    <div className="fm-map-main">
                        <div className="fm-map-frame-wrap">
                            <iframe
                                title="3D Fort View"
                                src={mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>

                        {/* Glassy Info Panel Overlay */}
                        <div className="fm-monument-info-panel">
                            <h3 className="fm-panel-title">{t(active.nameKey)}</h3>
                            <p className="fm-panel-desc">{t(active.descKey)}</p>
                            <div className="fm-panel-actions">
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(t(active.nameKey))},Chittorgarh+Fort`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="fm-panel-btn fm-primary"
                                >
                                    <Navigation size={14} /> {t('btn.directions')}
                                </a>
                                <a
                                    href={active.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="fm-panel-btn fm-secondary"
                                >
                                    <Info size={14} /> {t('btn.readMore')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .fort-map-section {
                    padding: 8rem 0;
                    position: relative;
                }

                .fort-map-header {
                    margin-bottom: 5rem;
                }

                .fort-map-eyebrow {
                    display: block;
                    font-family: var(--ff-body);
                    color: var(--gold);
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    margin-bottom: 1rem;
                }

                .fort-map-title {
                    font-family: var(--ff-display);
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    color: #fff;
                    margin-bottom: 1.5rem;
                    line-height: 1.1;
                }

                .fort-map-title em {
                    color: var(--gold);
                    font-style: italic;
                }

                .fort-map-intro {
                    color: rgba(255, 255, 255, 0.6);
                    font-family: var(--ff-body);
                    font-size: 1.1rem;
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .fm-3d-container {
                    display: grid;
                    grid-template-columns: 320px 1fr;
                    background: #110d0a;
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    border-radius: 24px;
                    overflow: hidden;
                    height: 850px;
                    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.9);
                    transition: all 0.3s ease;
                }

                /* Mobile First Adjustments */
                @media (max-width: 1024px) {
                    .fm-3d-container {
                         display: flex;
                         flex-direction: column;
                         height: auto;
                         border-radius: 16px;
                    }

                    .fm-sidebar {
                        width: 100%;
                        height: auto !important;
                        border-right: none !important;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                        z-index: 20;
                    }

                    .fm-sidebar-header {
                        padding: 1.5rem 1rem !important;
                        justify-content: center;
                    }

                    .fm-monument-list {
                        display: flex !important;
                        flex-direction: row !important;
                        overflow-x: auto !important;
                        overflow-y: hidden !important;
                        padding: 1rem !important;
                        gap: 0.75rem !important;
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: none; /* Hide scrollbar for cleaner mobile look */
                    }

                    .fm-monument-list::-webkit-scrollbar {
                        display: none;
                    }

                    .fm-monument-item {
                        flex: 0 0 auto !important;
                        width: auto !important;
                        padding: 0.6rem 1.25rem !important;
                        margin-bottom: 0 !important;
                        border: 1px solid rgba(212, 175, 55, 0.2) !important;
                        background: rgba(255, 255, 255, 0.03) !important;
                        border-radius: 100px !important;
                        white-space: nowrap !important;
                        font-size: 0.85rem !important;
                    }

                    .fm-monument-item.active {
                        background: var(--gold) !important;
                        border-color: var(--gold) !important;
                    }

                    .fm-monument-item.active .fm-monument-name {
                        color: #000 !important;
                    }

                    .fm-monument-dot {
                        display: none; /* Hide dot on mobile chips */
                    }

                    .fm-map-main {
                        height: auto !important;
                    }

                    .fm-map-frame-wrap {
                        height: 350px !important; /* Smaller map on mobile */
                    }

                    .fm-monument-info-panel {
                        padding: 2rem 1.5rem !important;
                    }

                    .fm-panel-title {
                        font-size: 1.75rem !important;
                    }

                    .fm-panel-desc {
                        font-size: 1rem !important;
                    }

                    .fm-panel-actions {
                        flex-direction: column; /* Stack buttons on mobile */
                        gap: 1rem !important;
                    }

                    .fm-panel-btn {
                        width: 100%;
                        justify-content: center;
                    }
                }

                /* Sidebar (Desktop) */
                .fm-sidebar {
                    border-right: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    flex-direction: column;
                    background: rgba(0, 0, 0, 0.4);
                    height: 850px;
                }

                .fm-sidebar-header {
                    padding: 2.5rem 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-family: var(--ff-body);
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: #d4af37;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .fm-monument-list {
                    padding: 1.5rem;
                    padding-bottom: 4rem;
                    overflow-y: auto;
                    flex: 1;
                }

                .fm-monument-list::-webkit-scrollbar {
                    width: 6px;
                }

                .fm-monument-list::-webkit-scrollbar-thumb {
                    background: #d4af37;
                    border-radius: 10px;
                }

                .fm-monument-item {
                    width: 100%;
                    padding: 1.25rem 1rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    background: transparent;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: left;
                    margin-bottom: 0.5rem;
                    border: 1px solid transparent;
                }

                .fm-monument-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                }

                .fm-monument-item.active {
                    background: rgba(212, 175, 55, 0.1);
                    border-color: rgba(212, 175, 55, 0.4);
                }

                .fm-monument-dot {
                    width: 10px;
                    height: 10px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    transition: all 0.3s;
                    flex-shrink: 0;
                }

                .fm-monument-item.active .fm-monument-dot {
                    background: #d4af37;
                    box-shadow: 0 0 15px #d4af37;
                }

                .fm-monument-name {
                    font-family: var(--ff-body);
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 1rem;
                    line-height: 1.4;
                    transition: color 0.3s;
                }

                .fm-monument-item.active .fm-monument-name {
                    color: #fff;
                    font-weight: 600;
                }

                .fm-map-main {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    background: #110d0a;
                    height: 850px;
                }

                .fm-map-frame-wrap {
                    height: 450px;
                    width: 100%;
                    position: relative;
                    flex-shrink: 0;
                }

                /* Info Panel */
                .fm-monument-info-panel {
                    flex: 1;
                    padding: 2.5rem 3rem;
                    background: #110d0a;
                    border-top: 3px solid rgba(212, 175, 55, 0.5);
                    position: relative;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    overflow-y: visible;
                }

                .fm-panel-title {
                    font-family: var(--ff-display);
                    font-size: 2.2rem;
                    color: #d4af37;
                    margin: 0;
                    line-height: 1.1;
                    font-weight: 700;
                }

                .fm-panel-desc {
                    font-family: var(--ff-body);
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.95);
                    line-height: 1.7;
                    margin: 0;
                    max-width: 850px;
                }

                .fm-panel-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                    margin-top: 1rem;
                    padding-bottom: 2rem;
                }

                .fm-panel-btn {
                    padding: 1rem 2.5rem;
                    border-radius: 50px;
                    font-size: 0.9rem;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.8rem;
                    text-decoration: none !important;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    white-space: nowrap;
                }

                .fm-panel-btn.fm-primary {
                    background: #d4af37;
                    color: #000 !important;
                    border: 2px solid #d4af37;
                }

                .fm-panel-btn.fm-primary:hover {
                    background: #fff;
                    border-color: #fff;
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(212, 175, 55, 0.4);
                }

                .fm-panel-btn.fm-secondary {
                    background: rgba(255, 255, 255, 0.05);
                    border: 2px solid rgba(212, 175, 55, 0.5);
                    color: #fff !important;
                }

                .fm-panel-btn.fm-secondary:hover {
                    background: rgba(212, 175, 55, 0.1);
                    border-color: #d4af37;
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
                }

                @media (max-width: 640px) {
                    .fm-panel-title { font-size: 1.4rem; }
                    .fm-panel-desc { font-size: 0.85rem; }
                    .fm-panel-actions { flex-direction: column; }
                }
            `}</style>
        </section>
    );
}
