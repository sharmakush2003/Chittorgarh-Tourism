"use client";

import { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, CloudSnow, Wind, Droplets } from 'lucide-react';

export default function WeatherWidget() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    const getWeatherIcon = (code) => {
        const iconClass = "w-6 h-6";
        if (code === 0 || code === 1) return <Sun className={`${iconClass} text-yellow-400`} />;
        if (code === 2 || code === 3) return <Cloud className={`${iconClass} text-gray-200`} />;
        if (code >= 51 && code <= 67) return <CloudRain className={`${iconClass} text-blue-300`} />;
        if (code >= 71 && code <= 77) return <CloudSnow className={`${iconClass} text-white`} />;
        if (code >= 95) return <CloudLightning className={`${iconClass} text-yellow-500`} />;
        return <Sun className={`${iconClass} text-yellow-400`} />;
    };

    const getWeatherDesc = (code) => {
        if (code === 0) return "Clear";
        if (code === 1) return "Fair";
        if (code === 2) return "Cloudy";
        if (code === 3) return "Overcast";
        if (code >= 51 && code <= 67) return "Rain";
        if (code >= 95) return "Storm";
        return "Sunny";
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Chittorgarh Coords
                const res = await fetch(
                    "https://api.open-meteo.com/v1/forecast?latitude=24.8887&longitude=74.6269&current_weather=true&hourly=relativehumidity_2m,windspeed_10m"
                );
                const data = await res.json();
                setWeather({
                    ...data.current_weather,
                    humidity: data.hourly?.relativehumidity_2m?.[0] || 45 // Fallback estimation if hourly sync is complex
                });
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch weather", error);
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    if (loading || !weather) return null;

    return (
        <a
            href="https://www.google.com/search?q=weather+chittorgarh"
            target="_blank"
            rel="noopener noreferrer"
            className="weather-card"
        >
            <div className="weather-header">
                <span className="location">Chittorgarh</span>
                <span className="live-dot"></span>
            </div>

            <div className="weather-body">
                <div className="temp-container">
                    <span className="temperature">{Math.round(weather.temperature)}°</span>
                    <div className="condition-wrapper">
                        {getWeatherIcon(weather.weathercode)}
                        <span className="condition">{getWeatherDesc(weather.weathercode)}</span>
                    </div>
                </div>
            </div>

            <div className="weather-footer">
                <div className="metric">
                    <Wind className="w-3 h-3" />
                    <span>{weather.windspeed} km/h</span>
                </div>
                <div className="metric">
                    <Droplets className="w-3 h-3" />
                    <span>{weather.humidity}%</span>
                </div>
            </div>

            <style jsx>{`
                .weather-card {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    background: rgba(28, 21, 15, 0.4); /* Darker, more premium glass */
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 1rem 1.25rem;
                    min-width: 180px;
                    color: #fff;
                    transition: all 0.4s ease;
                    text-decoration: none;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    position: relative;
                }

                .weather-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
                    pointer-events: none;
                }

                .weather-card:hover {
                    background: rgba(28, 21, 15, 0.6);
                    transform: translateY(-2px);
                    border-color: rgba(212, 175, 55, 0.3); /* Gold hint on hover */
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
                }

                .weather-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .location {
                    font-family: var(--ff-body);
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    opacity: 0.8;
                    font-weight: 600;
                    color: var(--gold);
                }

                .live-dot {
                    width: 6px;
                    height: 6px;
                    background-color: #4ADE80; /* Green active dot */
                    border-radius: 50%;
                    box-shadow: 0 0 8px #4ADE80;
                    animation: pulse 2s infinite;
                }

                .weather-body {
                    display: flex;
                    align-items: center;
                }

                .temp-container {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .temperature {
                    font-family: var(--ff-display);
                    font-size: 2.5rem;
                    font-weight: 400;
                    line-height: 0.9;
                    background: linear-gradient(to bottom, #fff, rgba(255,255,255,0.8));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .condition-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .condition {
                    font-family: var(--ff-body);
                    font-size: 0.85rem;
                    opacity: 0.9;
                    font-weight: 300;
                }

                .weather-footer {
                    display: flex;
                    gap: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding-top: 0.75rem;
                    margin-top: 0.25rem;
                }

                .metric {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.75rem;
                    opacity: 0.7;
                    font-family: var(--ff-body);
                }

                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
            `}</style>
        </a>
    );
}
