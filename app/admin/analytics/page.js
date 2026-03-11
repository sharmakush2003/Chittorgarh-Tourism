"use client";

import { useState, useEffect } from "react";
import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/AdminNav";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { 
    BarChart3, 
    Users, 
    Globe, 
    Languages, 
    TrendingUp, 
    Calendar,
    MousePointer2,
    MapPin,
    ArrowUpRight,
    Activity
} from "lucide-react";

export default function AnalyticsDashboard() {
    const [stats, setStats] = useState([]);
    const [summary, setSummary] = useState({
        totalVisits: 0,
        topPage: "N/A",
        topLang: "N/A",
        avgDaily: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, "analytics_stats"),
            orderBy("date", "desc"),
            limit(7)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => doc.data());
            setStats(data);
            
            if (data.length > 0) {
                const total = data.reduce((acc, curr) => acc + (curr.visits || 0), 0);
                
                const pages = {};
                const langs = {};
                data.forEach(day => {
                   if (day.pages) Object.entries(day.pages).forEach(([p, v]) => pages[p] = (pages[p] || 0) + v);
                   if (day.languages) Object.entries(day.languages).forEach(([l, v]) => langs[l] = (langs[l] || 0) + v);
                });

                const topP = Object.entries(pages).sort((a,b) => b[1] - a[1])[0]?.[0] || "N/A";
                const topL = Object.entries(langs).sort((a,b) => b[1] - a[1])[0]?.[0] || "N/A";

                setSummary({
                    totalVisits: total,
                    topPage: topP.replace(/_/g, '/'),
                    topLang: topL.toUpperCase(),
                    avgDaily: Math.round(total / data.length)
                });
            }
            setLoading(false);
        }, (error) => {
            console.error("Analytics Error:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AdminGuard>
            <div className="analytics-container">
                <style jsx>{`
                    .analytics-container {
                        min-height: 100vh;
                        background: #0a0806;
                        color: #fff;
                        padding: 0;
                        font-family: var(--font-jost);
                        background-image: 
                            radial-gradient(circle at 0% 0%, rgba(212, 175, 55, 0.05) 0%, transparent 40%),
                            radial-gradient(circle at 100% 100%, rgba(212, 175, 55, 0.05) 0%, transparent 40%);
                    }

                    .main-content {
                        padding: 80px 40px;
                    }

                    .max-width-wrapper {
                        max-width: 1300px;
                        margin: 0 auto;
                    }

                    .header-section {
                        margin-bottom: 50px;
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                    }

                    .header-section h1 {
                        font-family: var(--font-cormorant);
                        font-size: 4rem;
                        color: var(--gold);
                        margin: 0;
                        line-height: 1;
                    }

                    .header-section p {
                        color: #666;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        font-size: 0.9rem;
                        margin-top: 10px;
                    }

                    .summary-grid {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 20px;
                        margin-bottom: 40px;
                    }

                    .glass-card {
                        background: rgba(255, 255, 255, 0.02);
                        border: 1px solid rgba(212, 175, 55, 0.1);
                        padding: 30px;
                        border-radius: 12px;
                        backdrop-filter: blur(10px);
                        transition: all 0.4s ease;
                    }

                    .glass-card:hover {
                        border-color: var(--gold);
                        background: rgba(212, 175, 55, 0.05);
                        transform: translateY(-5px);
                    }

                    .card-label {
                        font-size: 0.75rem;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        color: #666;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-bottom: 15px;
                    }

                    .card-value {
                        font-family: var(--font-cormorant);
                        font-size: 2.5rem;
                        color: #fff;
                        display: block;
                    }

                    .card-trend {
                        margin-top: 10px;
                        font-size: 0.8rem;
                        color: var(--gold);
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    }

                    /* Charts Layout */
                    .charts-layout {
                        display: grid;
                        grid-template-columns: 2fr 1fr;
                        gap: 30px;
                    }

                    .chart-container {
                        height: 400px;
                        display: flex;
                        flex-direction: column;
                    }

                    .chart-title {
                        font-family: var(--font-cormorant);
                        font-size: 1.8rem;
                        color: var(--gold);
                        margin-bottom: 30px;
                        display: flex;
                        align-items: center;
                        gap: 15px;
                    }

                    .bar-chart {
                        flex: 1;
                        display: flex;
                        align-items: flex-end;
                        gap: 15px;
                        padding-bottom: 40px;
                        position: relative;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    }

                    .bar-col {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        position: relative;
                    }

                    .bar {
                        width: 100%;
                        background: linear-gradient(to top, rgba(212, 175, 55, 0.1), var(--gold));
                        border-radius: 4px 4px 0 0;
                        transition: height 1s cubic-bezier(0.17, 0.67, 0.83, 0.67);
                        position: relative;
                        min-height: 5px;
                    }

                    .bar:hover {
                        filter: brightness(1.2);
                        box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
                    }

                    .bar-tooltip {
                        position: absolute;
                        top: -30px;
                        font-size: 0.75rem;
                        color: var(--gold);
                        font-weight: 700;
                    }

                    .bar-label {
                        position: absolute;
                        bottom: -30px;
                        font-size: 0.65rem;
                        color: #555;
                        transform: rotate(-45deg);
                        white-space: nowrap;
                    }

                    /* Top Lists */
                    .ranks-container {
                        display: flex;
                        flex-direction: column;
                        gap: 20px;
                    }

                    .rank-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 15px;
                        background: rgba(0, 0, 0, 0.2);
                        border-radius: 8px;
                        border-left: 2px solid var(--gold);
                        transition: all 0.3s;
                    }

                    .rank-item:hover {
                        background: rgba(212, 175, 55, 0.1);
                        transform: translateX(5px);
                    }

                    .rank-info h5 {
                        margin: 0;
                        font-size: 0.9rem;
                        color: #fff;
                    }

                    .rank-info span {
                        font-size: 0.75rem;
                        color: #666;
                    }

                    .rank-val {
                        color: var(--gold);
                        font-weight: 700;
                        font-size: 0.9rem;
                    }

                    @media (max-width: 1100px) {
                        .charts-layout { grid-template-columns: 1fr; }
                        .summary-grid { grid-template-columns: repeat(2, 1fr); }
                    }

                    @media (max-width: 768px) {
                        .main-content { padding: 40px 20px; }
                        .header-section h1 { font-size: 3rem; }
                        .summary-grid { grid-template-columns: 1fr; }
                    }
                `}</style>

                <AdminNav />
                <div className="main-content max-width-wrapper">
                    <div className="header-section">
                        <div>
                            <h1>The Imperial Scrutiny</h1>
                            <p>Behold the reach of the Citadel</p>
                        </div>
                        <div className="card-trend" style={{ fontSize: '1rem' }}>
                            <Activity size={18} /> LIVE MONITORING
                        </div>
                    </div>

                    <div className="summary-grid">
                        <div className="glass-card">
                            <span className="card-label"><Users size={16} /> Total Voyagers</span>
                            <span className="card-value">{summary.totalVisits}</span>
                            <div className="card-trend"><ArrowUpRight size={14} /> Last 7 Days</div>
                        </div>
                        <div className="glass-card">
                            <span className="card-label"><MousePointer2 size={16} /> Avg Daily Pulse</span>
                            <span className="card-value">{summary.avgDaily}</span>
                            <div className="card-trend">Unique Visits</div>
                        </div>
                        <div className="glass-card">
                            <span className="card-label"><Globe size={16} /> Primary Gate</span>
                            <span className="card-value" style={{ fontSize: '1.5rem', height: '3.5rem', display: 'flex', alignItems: 'center' }}>{summary.topPage}</span>
                            <div className="card-trend">Highest Traffic</div>
                        </div>
                        <div className="glass-card">
                            <span className="card-label"><Languages size={16} /> Royal Dialect</span>
                            <span className="card-value">{summary.topLang}</span>
                            <div className="card-trend">Most Preferred</div>
                        </div>
                    </div>

                    <div className="charts-layout">
                        <div className="glass-card chart-container">
                            <h2 className="chart-title"><TrendingUp size={24} /> Weekly Traffic Flow</h2>
                            {loading ? (
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>
                                    Consulting the royal records...
                                </div>
                            ) : stats.length === 0 ? (
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>
                                    No data recorded in the archives yet.
                                </div>
                            ) : (
                                <div className="bar-chart">
                                    {[...stats].reverse().map((day, idx) => {
                                        const max = Math.max(...stats.map(s => s.visits || 0));
                                        const h = max > 0 ? ((day.visits || 0) / max) * 100 : 0;
                                        return (
                                            <div key={day.date} className="bar-col">
                                                <span className="bar-tooltip">{day.visits}</span>
                                                <div className="bar" style={{ height: `${h}%` }}></div>
                                                <span className="bar-label">{day.date.split('-').slice(1).join('/')}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="glass-card">
                            <h2 className="chart-title" style={{ fontSize: '1.4rem' }}><MapPin size={20} /> Popular Chronicles</h2>
                            <div className="ranks-container">
                                {stats.length > 0 && stats[0].pages ? (
                                    Object.entries(stats[0].pages)
                                        .sort((a,b) => b[1] - a[1])
                                        .slice(0, 5)
                                        .map(([page, val], idx) => (
                                            <div key={page} className="rank-item">
                                                <div className="rank-info">
                                                    <h5>{page.replace(/_/g, '/')}</h5>
                                                    <span>Entry Point #{idx+1}</span>
                                                </div>
                                                <div className="rank-val">{val}</div>
                                            </div>
                                        ))
                                ) : (
                                    <div style={{ color: '#444', fontStyle: 'italic', textAlign: 'center', padding: '40px 0' }}>
                                        Awaiting first reports...
                                    </div>
                                )}
                            </div>

                            <h2 className="chart-title" style={{ fontSize: '1.4rem', marginTop: '40px' }}><Languages size={20} /> Dialects</h2>
                            <div className="ranks-container">
                                {stats.length > 0 && stats[0].languages ? (
                                    Object.entries(stats[0].languages)
                                        .sort((a,b) => b[1] - a[1])
                                        .map(([lang, val]) => (
                                            <div key={lang} className="rank-item">
                                                <div className="rank-info">
                                                    <h5>{lang.toUpperCase()}</h5>
                                                </div>
                                                <div className="rank-val">{val}</div>
                                            </div>
                                        ))
                                ) : (
                                    <div style={{ color: '#444', fontStyle: 'italic', textAlign: 'center', padding: '40px 0' }}>
                                        No dialect data.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminGuard>
    );
}
