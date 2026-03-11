"use client";

import { useAuth } from "@/context/AuthContext";
import { LogOut, Shield } from "lucide-react";
import Link from "next/link";

export default function AdminNav() {
    const { user, logout } = useAuth();

    return (
        <nav className="admin-nav">
            <style jsx>{`
                .admin-nav {
                    border-bottom: 1px solid rgba(212, 175, 55, 0.1);
                    background: rgba(15, 10, 6, 0.7);
                    backdrop-filter: blur(20px);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }

                .nav-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 1.5rem 2.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 20px;
                }

                .brand {
                    font-family: var(--font-cormorant);
                    font-size: 1.8rem;
                    color: var(--gold);
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    text-decoration: none;
                    white-space: nowrap;
                }

                .brand span {
                    font-family: var(--font-jost);
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    color: rgba(255, 255, 255, 0.3);
                    border-left: 1px solid rgba(212, 175, 55, 0.2);
                    padding-left: 1.5rem;
                }

                .user-profile {
                    display: flex;
                    align-items: center;
                    gap: 25px;
                }

                .user-info {
                    text-align: right;
                }

                .user-email {
                    display: block;
                    font-size: 0.8rem;
                    color: #888;
                }

                .role-tag {
                    display: inline-block;
                    font-size: 0.6rem;
                    color: var(--gold);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .logout-btn {
                    background: transparent;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    color: var(--gold);
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    flex-shrink: 0;
                }

                .logout-btn:hover {
                    background: #f87171;
                    border-color: #f87171;
                    color: #fff;
                }

                @media (max-width: 768px) {
                    .nav-container {
                        padding: 1rem 1.5rem;
                    }
                    .brand span {
                        display: none;
                    }
                    .user-info {
                        display: none;
                    }
                    .user-profile {
                        gap: 15px;
                    }
                }
            `}</style>
            
            <div className="nav-container">
                <Link href="/admin/dashboard" className="brand">
                    Citadel <span>Imperial Guard</span>
                </Link>
                <div className="user-profile">
                    <div className="user-info">
                        <span className="role-tag">High Sentinel</span>
                        <span className="user-email">{user?.email}</span>
                    </div>
                    <button onClick={logout} className="logout-btn" title="Leave the Gates">
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </nav>
    );
}
