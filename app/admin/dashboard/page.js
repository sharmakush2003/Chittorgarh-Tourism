"use client";

import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/AdminNav";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { 
    Users, 
    BarChart3, 
    Edit3, 
    Image as ImageIcon, 
    Cast, 
    Shield, 
    Activity,
    LogOut,
    ExternalLink,
    ArrowUpRight
} from "lucide-react";

export default function AdminDashboard() {
    const { user, logout } = useAuth();

    return (
        <AdminGuard>
            <div className="admin-dashboard">
                <style jsx>{`
                    .admin-dashboard {
                        min-height: 100vh;
                        background: #0a0806;
                        color: #fff;
                        font-family: var(--font-jost);
                        background-image: 
                            radial-gradient(circle at 100% 0%, rgba(212, 175, 55, 0.03) 0%, transparent 40%),
                            radial-gradient(circle at 0% 100%, rgba(212, 175, 55, 0.03) 0%, transparent 40%);
                    }

                    .main-content {
                        max-width: 1400px;
                        margin: 0 auto;
                        padding: 80px 40px;
                    }

                    .welcome-header {
                        margin-bottom: 60px;
                    }

                    .welcome-badge {
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                        padding: 8px 16px;
                        background: rgba(212, 175, 55, 0.1);
                        border: 1px solid rgba(212, 175, 55, 0.2);
                        border-radius: 30px;
                        color: var(--gold);
                        font-size: 0.8rem;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        margin-bottom: 25px;
                    }

                    .welcome-header h1 {
                        font-family: var(--font-cormorant);
                        font-size: 4.5rem;
                        color: #fff;
                        margin: 0;
                        line-height: 1.1;
                    }

                    .welcome-header p {
                        color: #888;
                        font-size: 1.25rem;
                        max-width: 700px;
                        margin-top: 20px;
                        line-height: 1.6;
                    }

                    /* Grid Layout */
                    .dashboard-grid {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 25px;
                        margin-bottom: 60px;
                    }

                    .quick-card {
                        background: rgba(255, 255, 255, 0.02);
                        border: 1px solid rgba(212, 175, 55, 0.05);
                        padding: 35px;
                        border-radius: 12px;
                        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                        position: relative;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        gap: 20px;
                    }

                    .quick-card:hover {
                        background: rgba(212, 175, 55, 0.04);
                        border-color: var(--gold);
                        transform: translateY(-8px);
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                    }

                    .icon-box {
                        width: 50px;
                        height: 50px;
                        background: rgba(212, 175, 55, 0.1);
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: var(--gold);
                    }

                    .quick-card:hover .icon-box {
                        background: var(--gold);
                        color: #000;
                    }

                    .card-info h4 {
                        font-family: var(--font-cormorant);
                        font-size: 1.8rem;
                        margin: 0;
                        color: #fff;
                    }

                    .card-info p {
                        font-size: 0.95rem;
                        color: #666;
                        margin-top: 8px;
                        line-height: 1.4;
                    }

                    .card-link {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        color: var(--gold);
                        font-size: 0.8rem;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-top: auto;
                        opacity: 0;
                        transform: translateX(-10px);
                        transition: all 0.3s;
                    }

                    .quick-card:hover .card-link {
                        opacity: 1;
                        transform: translateX(0);
                    }

                    @media (max-width: 1200px) {
                        .dashboard-grid { grid-template-columns: repeat(2, 1fr); }
                    }

                    @media (max-width: 768px) {
                        .welcome-header h1 { font-size: 2.5rem; }
                        .main-content { padding: 40px 20px; }
                        .dashboard-grid { grid-template-columns: 1fr; }
                    }
                `}</style>

                <AdminNav />

                <main className="main-content">
                    <header className="welcome-header">
                        <div className="welcome-badge">
                            <Shield size={14} /> Citadel Access Verified
                        </div>
                        <h1>The Royal Archives</h1>
                        <p>
                            Welcome back, Guardian. The digital fortress of Chittorgarh is under your watch. 
                            Curate the heritage, monitor the realm's pulse, and grant passage to those worthy.
                        </p>
                    </header>

                    <div className="dashboard-grid">
                        <Link href="/admin/blogs" style={{ textDecoration: 'none' }}>
                            <div className="quick-card">
                                <div className="icon-box"><Edit3 size={24} /></div>
                                <div className="card-info">
                                    <h4>Chronicles</h4>
                                    <p>Compose and publish historical records and news.</p>
                                </div>
                                <div className="card-link">Open Library <ArrowUpRight size={14} /></div>
                            </div>
                        </Link>

                        <Link href="/admin/gallery" style={{ textDecoration: 'none' }}>
                            <div className="quick-card">
                                <div className="icon-box"><ImageIcon size={24} /></div>
                                <div className="card-info">
                                    <h4>Galleria</h4>
                                    <p>Manage the imperial visual treasury and media assets.</p>
                                </div>
                                <div className="card-link">View Assets <ArrowUpRight size={14} /></div>
                            </div>
                        </Link>

                        <Link href="/admin/users" style={{ textDecoration: 'none' }}>
                            <div className="quick-card">
                                <div className="icon-box"><Users size={24} /></div>
                                <div className="card-info">
                                    <h4>Guardians</h4>
                                    <p>Manage administrative access and user requests.</p>
                                </div>
                                <div className="card-link">Manage Sentinels <ArrowUpRight size={14} /></div>
                            </div>
                        </Link>

                        <Link href="/admin/analytics" style={{ textDecoration: 'none' }}>
                            <div className="quick-card">
                                <div className="icon-box"><Activity size={24} /></div>
                                <div className="card-info">
                                    <h4>Royal Pulse</h4>
                                    <p>Monitor visitor traffic, behavior, and global reach.</p>
                                </div>
                                <div className="card-link">View Insights <ArrowUpRight size={14} /></div>
                            </div>
                        </Link>
                    </div>

                    <div style={{ marginTop: '100px', textAlign: 'center' }}>
                        <Link href="/" style={{ color: '#555', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.9rem' }}>
                            <ExternalLink size={16} /> RETURN TO THE PUBLIC CITADEL
                        </Link>
                    </div>
                </main>
            </div>
        </AdminGuard>
    );
}
