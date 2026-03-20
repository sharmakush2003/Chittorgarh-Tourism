"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Camera, Cloud, CloudRain, CloudLightning, Thermometer, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function GoldenHourTracker() {
    const { t, lang } = useLanguage();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const CHITTORGARH_LAT = 24.8887;
    const CHITTORGARH_LON = 74.6269;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch weather and sun times from Open-Meteo modern endpoints
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${CHITTORGARH_LAT}&longitude=${CHITTORGARH_LON}&current=temperature_2m,weather_code&daily=sunrise,sunset&timezone=auto`
                );
                const result = await response.json();

                const sunrise = new Date(result.daily.sunrise[0]);
                const sunset = new Date(result.daily.sunset[0]);

                // Golden Hour Calculation (approx 1 hour after sunrise and 1 hour before sunset)
                const morningStart = sunrise;
                const morningEnd = new Date(sunrise.getTime() + 60 * 60 * 1000);
                
                const eveningStart = new Date(sunset.getTime() - 60 * 60 * 1000);
                const eveningEnd = sunset;

                const now = new Date();
                let status = "upcoming"; // default
                let nextSession = null;

                if (now >= morningStart && now <= morningEnd) {
                    status = "active_morning";
                } else if (now >= eveningStart && now <= eveningEnd) {
                    status = "active_evening";
                } else if (now < morningStart) {
                    nextSession = morningStart;
                } else if (now < eveningStart) {
                    nextSession = eveningStart;
                } else {
                    // Next day's sunrise would be the next session, but for simplicity of this widget 
                    // we show it's over for today
                    status = "ended";
                }

                setData({
                    temp: result.current.temperature_2m,
                    conditionCode: result.current.weather_code,
                    morning: { start: morningStart, end: morningEnd },
                    evening: { start: eveningStart, end: eveningEnd },
                    status,
                    nextSession
                });
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch weather data:", error);
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 600000); // Refresh every 10 mins
        return () => clearInterval(interval);
    }, []);

    const formatTime = (date) => {
        if (!date) return "";
        return date.toLocaleTimeString(lang === 'hi' ? 'hi-IN' : 'en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    if (loading) {
        return (
            <div className="tracker-skeleton">
                <div className="shimmer"></div>
            </div>
        );
    }

    if (!data) return null;

    const isActive = data.status.startsWith("active");

    return (
        <div className={`golden-hour-card ${isActive ? 'active-pulse' : ''}`}>
            <div className="card-glass"></div>
            
            <div className="card-header">
                <div className="header-left">
                    <Camera className={isActive ? "text-gold animate-bounce" : "text-white/40"} size={20} />
                    <h3>{t("fort.tracker.title")}</h3>
                </div>
                <div className="weather-badge">
                    <Thermometer size={14} />
                    <span>{data.temp}°C</span>
                </div>
            </div>

            <div className="status-container">
                {isActive ? (
                    <div className="status-active">
                        <span className="live-dot"></span>
                        <span className="status-text">{t("fort.tracker.activeNow")}</span>
                    </div>
                ) : (
                    <div className="status-upcoming">
                        <span className="status-text">
                            {data.status === 'ended' ? t("fort.tracker.nextOpportunity") : t("fort.tracker.upcoming")}
                        </span>
                    </div>
                )}
            </div>

            <div className="times-grid">
                <div className={`time-box ${data.status === 'active_morning' ? 'highlight' : ''}`}>
                    <div className="box-icon"><Sun size={16} /></div>
                    <div className="box-info">
                        <span className="label">{t("fort.tracker.morning")}</span>
                        <span className="val">{formatTime(data.morning.start)} - {formatTime(data.morning.end)}</span>
                    </div>
                </div>
                <div className={`time-box ${data.status === 'active_evening' ? 'highlight' : ''}`}>
                    <div className="box-icon"><Moon size={16} /></div>
                    <div className="box-info">
                        <span className="label">{t("fort.tracker.evening")}</span>
                        <span className="val">{formatTime(data.evening.start)} - {formatTime(data.evening.end)}</span>
                    </div>
                </div>
            </div>

            <div className="card-footer">
                <Info size={12} />
                <p>{t("fort.tracker.tip")}</p>
            </div>

            <style jsx>{`
                .golden-hour-card {
                    position: relative;
                    padding: 1.5rem;
                    border-radius: 20px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    background: rgba(255, 255, 255, 0.03);
                    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .card-glass {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at top right, rgba(212, 175, 55, 0.1), transparent);
                    pointer-events: none;
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    position: relative;
                }

                .header-left {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .header-left h3 {
                    font-family: var(--font-cormorant);
                    font-size: 1.25rem;
                    letter-spacing: 0.5px;
                    color: rgba(255,255,255,0.9);
                }

                .weather-badge {
                    background: rgba(212, 175, 55, 0.15);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    padding: 0.3rem 0.6rem;
                    border-radius: 100px;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.8rem;
                    color: var(--gold);
                }

                .status-container {
                    margin-bottom: 1.5rem;
                }

                .status-active {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    background: rgba(34, 197, 94, 0.1);
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    border: 1px solid rgba(34, 197, 94, 0.2);
                }

                .live-dot {
                    width: 8px;
                    height: 8px;
                    background: #22c55e;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #22c55e;
                    animation: blink 1.5s infinite;
                }

                .status-text {
                    font-size: 0.85rem;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                }

                .status-upcoming {
                    color: rgba(255,255,255,0.5);
                    font-size: 0.8rem;
                }

                .times-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .time-box {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    padding: 1rem;
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    transition: 0.3s;
                }

                .time-box.highlight {
                    background: rgba(212, 175, 55, 0.1);
                    border-color: rgba(212, 175, 55, 0.3);
                }

                .box-icon {
                    color: var(--gold);
                    opacity: 0.7;
                }

                .box-info {
                    display: flex;
                    flex-direction: column;
                }

                .label {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.4);
                    letter-spacing: 1px;
                }

                .val {
                    font-size: 0.85rem;
                    font-weight: 500;
                    color: rgba(255,255,255,0.9);
                }

                .card-footer {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.6rem;
                    background: rgba(255,255,255,0.02);
                    padding: 0.75rem;
                    border-radius: 8px;
                }

                .card-footer p {
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.5);
                    line-height: 1.4;
                }

                .active-pulse {
                    border-color: rgba(212, 175, 55, 0.4);
                    box-shadow: 0 0 30px rgba(212, 175, 55, 0.1);
                }

                @keyframes blink {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                }

                .tracker-skeleton {
                    height: 250px;
                    background: rgba(255,255,255,0.03);
                    border-radius: 20px;
                    overflow: hidden;
                    position: relative;
                }

                .shimmer {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
                    animation: shim 1.5s infinite;
                }

                @keyframes shim {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                @media (max-width: 480px) {
                    .times-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}
