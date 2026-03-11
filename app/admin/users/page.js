"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/AdminNav";
import { 
    Shield, 
    UserCheck, 
    UserX, 
    Clock, 
    Mail, 
    MessageSquare, 
    Trash2, 
    Users, 
    UserPlus,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

export default function AdminManagement() {
    const [requests, setRequests] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("requests");

    useEffect(() => {
        // Fetch Requests
        const qReq = query(collection(db, "admin_requests"), orderBy("createdAt", "desc"));
        const unsubReq = onSnapshot(qReq, (snapshot) => {
            setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }, (error) => console.error("Requests Error:", error));

        // Fetch Active Admins
        const qAdm = query(collection(db, "users"), orderBy("joinedAt", "desc"));
        const unsubAdm = onSnapshot(qAdm, (snapshot) => {
            setAdmins(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, (error) => {
            console.error("Admins Error:", error);
            setLoading(false);
        });

        return () => { unsubReq(); unsubAdm(); };
    }, []);

    const handleAction = async (id, status) => {
        triggerHaptic("medium");
        try {
            const requestRef = doc(db, "admin_requests", id);
            if (status === "deleted") {
                if (confirm("Are you sure you want to remove this record from the archives?")) {
                    await deleteDoc(requestRef);
                }
            } else {
                await updateDoc(requestRef, { status });
            }
        } catch (error) {
            console.error("Error updating request:", error);
            alert("The scrolls could not be updated.");
        }
    };

    return (
        <AdminGuard>
            <div className="admin-container">
                <style jsx>{`
                    .admin-container {
                        min-height: 100vh;
                        background: #0a0806;
                        color: #fff;
                        padding: 0;
                        font-family: var(--font-jost);
                        background-image: 
                            radial-gradient(circle at 100% 0%, rgba(212, 175, 55, 0.05) 0%, transparent 40%),
                            radial-gradient(circle at 0% 100%, rgba(212, 175, 55, 0.05) 0%, transparent 40%);
                    }

                    .main-content {
                        padding: 80px 40px;
                    }

                    .max-width-wrapper {
                        max-width: 1200px;
                        margin: 0 auto;
                    }

                    .header-section {
                        margin-bottom: 50px;
                        position: relative;
                    }

                    .header-section h1 {
                        font-family: var(--font-cormorant);
                        font-size: 4rem;
                        color: var(--gold);
                        margin: 0;
                        line-height: 1;
                        letter-spacing: -1px;
                    }

                    .header-section p {
                        color: #888;
                        font-size: 1.1rem;
                        margin-top: 10px;
                        letter-spacing: 1px;
						text-transform: uppercase;
                    }

                    /* Stats Overview */
                    .stats-overview {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 20px;
                        margin-bottom: 40px;
                    }

                    .mini-stat {
                        background: rgba(255, 255, 255, 0.02);
                        border: 1px solid rgba(212, 175, 55, 0.1);
                        padding: 20px;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        gap: 15px;
                    }

                    .stat-icon {
                        width: 45px;
                        height: 45px;
                        background: rgba(212, 175, 55, 0.1);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: var(--gold);
                    }

                    .stat-info h4 {
                        margin: 0;
                        font-size: 0.75rem;
                        color: #666;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }

                    .stat-info span {
                        font-family: var(--font-cormorant);
                        font-size: 1.8rem;
                        color: #fff;
                    }

                    /* Tabs */
                    .tabs {
                        display: flex;
                        gap: 30px;
                        margin-bottom: 30px;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                        padding-bottom: 1px;
                    }

                    .tab-btn {
                        background: transparent;
                        border: none;
                        color: #666;
                        font-size: 1rem;
                        padding: 10px 0;
                        cursor: pointer;
                        position: relative;
                        transition: all 0.3s;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .tab-btn:hover { color: #fff; }

                    .tab-btn.active {
                        color: var(--gold);
                    }

                    .tab-btn.active::after {
                        content: "";
                        position: absolute;
                        bottom: -1px;
                        left: 0;
                        width: 100%;
                        height: 2px;
                        background: var(--gold);
                        box-shadow: 0 0 10px var(--gold);
                    }

                    .badge-count {
                        background: rgba(212, 175, 55, 0.2);
                        color: var(--gold);
                        padding: 2px 8px;
                        border-radius: 10px;
                        font-size: 0.7rem;
                        font-weight: 700;
                    }

                    /* Grid/Cards */
                    .management-content {
                        animation: fadeIn 0.5s ease-out;
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .card-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                        gap: 25px;
                    }

                    .royal-card {
                        background: rgba(255, 255, 255, 0.03);
                        border: 1px solid rgba(212, 175, 55, 0.1);
                        padding: 30px;
                        border-radius: 12px;
                        position: relative;
                        overflow: hidden;
                        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                        backdrop-filter: blur(10px);
                    }

                    .royal-card:hover {
                        border-color: var(--gold);
                        background: rgba(212, 175, 55, 0.05);
                        transform: translateY(-5px);
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                    }

                    .card-top {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-bottom: 20px;
                    }

                    .user-avatar {
                        width: 50px;
                        height: 50px;
                        background: linear-gradient(135deg, #1a1510, #0a0806);
                        border: 1px solid rgba(212, 175, 55, 0.3);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: var(--gold);
                        font-family: var(--font-cormorant);
                        font-size: 1.5rem;
                        box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
                    }

                    .user-meta h3 {
                        font-family: var(--font-cormorant);
                        font-size: 1.6rem;
                        margin: 0;
                        color: #fff;
                    }

                    .user-meta p {
                        margin: 5px 0 0 0;
                        color: #888;
                        font-size: 0.85rem;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .card-body {
                        margin: 20px 0;
                        padding: 15px;
                        background: rgba(0, 0, 0, 0.2);
                        border-radius: 8px;
                        border-left: 2px solid var(--gold);
                    }

                    .purpose-text {
                        color: #aaa;
                        font-size: 0.9rem;
                        line-height: 1.6;
                        font-style: italic;
                    }

                    .card-footer {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .time-stamp {
                        color: #555;
                        font-size: 0.75rem;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    }

                    .action-group {
                        display: flex;
                        gap: 12px;
                    }

                    .btn-circle {
                        width: 38px;
                        height: 38px;
                        border-radius: 50%;
                        border: 1px solid rgba(212, 175, 55, 0.2);
                        background: transparent;
                        color: #fff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: all 0.3s;
                    }

                    .btn-circle:hover {
                        background: var(--gold);
                        color: #000;
                        border-color: var(--gold);
                        box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
                    }

                    .btn-circle.danger:hover {
                        background: #f87171;
                        border-color: #f87171;
                        color: #fff;
                        box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
                    }

                    .status-ribbon {
                        position: absolute;
                        top: 20px;
                        right: -30px;
                        padding: 5px 40px;
                        transform: rotate(45deg);
                        font-size: 0.6rem;
                        text-transform: uppercase;
                        font-weight: 800;
                        letter-spacing: 1px;
                    }

                    .ribbon-pending { background: #8b6e2a; color: #fff; }
                    .ribbon-approved { background: #15803d; color: #fff; }
                    .ribbon-rejected { background: #b91c1c; color: #fff; }

                    .empty-palace {
                        text-align: center;
                        padding: 100px 0;
                        color: #444;
                        font-style: italic;
                    }

                    @media (max-width: 768px) {
                        .main-content { padding: 40px 20px; }
                        .header-section h1 { font-size: 3rem; }
                        .stats-overview { grid-template-columns: 1fr; }
                        .card-grid { grid-template-columns: 1fr; }
                    }
                `}</style>

                <AdminNav />
                <div className="main-content max-width-wrapper">
                    <div className="header-section">
                        <h1>Guardian Management</h1>
                        <p>The Registry of the Royal Citadel</p>
                    </div>

                    <div className="stats-overview">
                        <div className="mini-stat">
                            <div className="stat-icon"><UserPlus size={20} /></div>
                            <div className="stat-info">
                                <h4>New Proclamations</h4>
                                <span>{requests.filter(r => r.status === 'pending').length}</span>
                            </div>
                        </div>
                        <div className="mini-stat">
                            <div className="stat-icon"><Shield size={20} /></div>
                            <div className="stat-info">
                                <h4>Active Guardians</h4>
                                <span>{admins.length}</span>
                            </div>
                        </div>
                        <div className="mini-stat">
                            <div className="stat-icon"><Trash2 size={20} /></div>
                            <div className="stat-info">
                                <h4>Archives Clean</h4>
                                <span>Verified</span>
                            </div>
                        </div>
                    </div>

                    <div className="tabs">
                        <button 
                            className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
                            onClick={() => setActiveTab("requests")}
                        >
                            <MessageSquare size={18} /> Access Requests 
                            <span className="badge-count">{requests.length}</span>
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === "admins" ? "active" : ""}`}
                            onClick={() => setActiveTab("admins")}
                        >
                            <Users size={18} /> Active Guardians
                            <span className="badge-count">{admins.length}</span>
                        </button>
                    </div>

                    <div className="management-content">
                        {loading ? (
                            <div className="empty-palace">Consulting the royal records...</div>
                        ) : activeTab === "requests" ? (
                            requests.length === 0 ? (
                                <div className="empty-palace">The archives are silent. No requests found.</div>
                            ) : (
                                <div className="card-grid">
                                    {requests.map((req) => (
                                        <div key={req.id} className="royal-card">
                                            <div className={`status-ribbon ribbon-${req.status}`}>
                                                {req.status}
                                            </div>
                                            <div className="card-top">
                                                <div className="user-avatar">
                                                    {req.name[0]}
                                                </div>
                                                <div className="user-meta">
                                                    <h3>{req.name}</h3>
                                                    <p><Mail size={14} /> {req.email}</p>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="purpose-text">
                                                    "{req.purpose || 'No purpose recorded in the scrolls.'}"
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className="time-stamp">
                                                    <Clock size={12} /> {req.createdAt?.toDate().toLocaleDateString()}
                                                </div>
                                                <div className="action-group">
                                                    {req.status === 'pending' && (
                                                        <>
                                                            <button 
                                                                className="btn-circle" 
                                                                onClick={() => handleAction(req.id, 'approved')}
                                                                title="Grant Access"
                                                            >
                                                                <CheckCircle2 size={18} />
                                                            </button>
                                                            <button 
                                                                className="btn-circle danger" 
                                                                onClick={() => handleAction(req.id, 'rejected')}
                                                                title="Deny Access"
                                                            >
                                                                <XCircle size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                    <button 
                                                        className="btn-circle danger" 
                                                        onClick={() => handleAction(req.id, 'deleted')}
                                                        title="Banish Record"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        ) : (
                            admins.length === 0 ? (
                                <div className="empty-palace">No guardians are currently standing watch.</div>
                            ) : (
                                <div className="card-grid">
                                    {admins.map((adm) => (
                                        <div key={adm.id} className="royal-card">
                                            <div className="status-ribbon ribbon-approved">
                                                GUARDIAN
                                            </div>
                                            <div className="card-top" style={{ marginBottom: 0 }}>
                                                <div className="user-avatar" style={{ background: 'linear-gradient(135deg, var(--gold), #8b6e2a)', color: '#000', borderColor: 'transparent' }}>
                                                    {adm.displayName?.[0] || adm.email[0]}
                                                </div>
                                                <div className="user-meta" style={{ flex: 1, marginLeft: '20px' }}>
                                                    <h3>{adm.displayName || adm.email.split('@')[0]}</h3>
                                                    <p><Mail size={14} /> {adm.email}</p>
                                                </div>
                                            </div>
                                            <div className="card-footer" style={{ marginTop: '20px', borderTop: '1px solid rgba(212,175,55,0.1)', paddingTop: '15px' }}>
                                                <div className="time-stamp">
                                                    <Shield size={12} /> Active Sentinel
                                                </div>
                                                <div className="badge-gold" style={{ 
                                                    background: 'rgba(212,175,55,0.2)', 
                                                    color: 'var(--gold)', 
                                                    padding: '4px 12px', 
                                                    borderRadius: '20px', 
                                                    fontSize: '0.7rem',
                                                    fontWeight: '800'
                                                }}>
                                                    MASTER ADMIN
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </AdminGuard>
    );
}
