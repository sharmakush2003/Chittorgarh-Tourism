"use client";

import { useEffect, useState } from "react";
import { Users, TrendingUp, Globe } from "lucide-react";

export default function VisitorStats() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Record this visit with referrer
        const referrer = document.referrer || '';
        fetch('/api/visit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ referrer }),
        })
            .then(res => res.json())
            .then(() => {
                // Then fetch full stats
                return fetch('/api/visit');
            })
            .then(res => res.json())
            .then(stats => {
                setData(stats);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading || !data) return null;

    const topReferrers = Object.entries(data.referrers || {})
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    const total = data.total || 0;

    return (
        <div className="visitor-stats-widget">
            <div className="stats-header">
                <Users size={14} className="stats-icon" />
                <span className="stats-label">Live Visitor Stats</span>
                <span className="live-dot"></span>
            </div>

            <div className="stats-total">
                <TrendingUp size={16} />
                <span className="total-number">{total.toLocaleString()}</span>
                <span className="total-label">total visits</span>
            </div>

            {topReferrers.length > 0 && (
                <div className="referrers-section">
                    <div className="referrers-title">
                        <Globe size={12} />
                        <span>Traffic Sources</span>
                    </div>
                    <div className="referrer-bars">
                        {topReferrers.map(([source, count]) => {
                            const pct = Math.round((count / total) * 100);
                            return (
                                <div key={source} className="referrer-row">
                                    <span className="referrer-name">{source}</span>
                                    <div className="referrer-bar-track">
                                        <div
                                            className="referrer-bar-fill"
                                            style={{ width: `${pct}%` }}
                                        ></div>
                                    </div>
                                    <span className="referrer-count">{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <style jsx>{`
                .visitor-stats-widget {
                    background: rgba(15, 10, 6, 0.8);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 12px;
                    padding: 1rem 1.25rem;
                    backdrop-filter: blur(10px);
                    min-width: 200px;
                    max-width: 240px;
                    font-family: var(--ff-body);
                }

                .stats-header {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    margin-bottom: 0.75rem;
                }

                .stats-label {
                    font-size: 0.7rem;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: rgba(255, 255, 255, 0.5);
                    flex: 1;
                }

                .stats-icon {
                    color: var(--gold);
                    opacity: 0.7;
                }

                .live-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #4ade80;
                    box-shadow: 0 0 6px #4ade80;
                    animation: pulse-dot 2s infinite;
                }

                @keyframes pulse-dot {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(0.8); }
                }

                .stats-total {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--gold);
                    margin-bottom: 0.85rem;
                }

                .total-number {
                    font-size: 1.5rem;
                    font-weight: 600;
                    font-family: var(--ff-display);
                }

                .total-label {
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.4);
                    margin-top: 2px;
                }

                .referrers-title {
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    font-size: 0.65rem;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.3);
                    margin-bottom: 0.6rem;
                }

                .referrer-bars {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .referrer-row {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .referrer-name {
                    font-size: 0.7rem;
                    color: rgba(255,255,255,0.6);
                    width: 55px;
                    flex-shrink: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .referrer-bar-track {
                    flex: 1;
                    height: 3px;
                    background: rgba(255,255,255,0.08);
                    border-radius: 2px;
                    overflow: hidden;
                }

                .referrer-bar-fill {
                    height: 100%;
                    background: linear-gradient(to right, var(--gold), #f59e0b);
                    border-radius: 2px;
                    transition: width 1s ease;
                }

                .referrer-count {
                    font-size: 0.65rem;
                    color: rgba(255,255,255,0.35);
                    width: 20px;
                    text-align: right;
                }
            `}</style>
        </div>
    );
}
