"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            router.push("/admin/dashboard");
        } catch (err) {
            console.error(err);
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <style jsx>{`
                .admin-login-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #0f0a06; /* Heritage Dark */
                    padding: 2rem;
                    font-family: var(--font-jost);
                }
                .login-card {
                    background: #fff;
                    padding: 3rem;
                    width: 100%;
                    max-width: 450px;
                    border: 1px solid var(--gold);
                    box-shadow: 0 30px 60px rgba(0,0,0,0.5);
                }
                .login-header {
                    text-align: center;
                    margin-bottom: 2.5rem;
                }
                .login-header h1 {
                    font-family: var(--font-cormorant);
                    font-size: 2.5rem;
                    color: #2D241E;
                    margin-bottom: 0.5rem;
                }
                .login-header p {
                    color: #888;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }
                .form-group {
                    margin-bottom: 1.5rem;
                }
                .form-group label {
                    display: block;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin-bottom: 0.5rem;
                    color: #666;
                    font-weight: 600;
                }
                input {
                    width: 100%;
                    padding: 1rem;
                    border: 1px solid #ddd;
                    background: #fdfdfd;
                    font-size: 1rem;
                    outline: none;
                    transition: all 0.3s;
                }
                input:focus {
                    border-color: var(--gold);
                    background: #fff;
                }
                .error-message {
                    background: #fff5f5;
                    border-left: 3px solid #e53e3e;
                    color: #c53030;
                    padding: 1rem;
                    font-size: 0.9rem;
                    margin-bottom: 1.5rem;
                }
                .login-btn {
                    width: 100%;
                    padding: 1.2rem;
                    background: var(--gold);
                    color: #fff;
                    border: none;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    cursor: pointer;
                    transition: all 0.3s;
                    margin-top: 1rem;
                }
                .login-btn:hover:not(:disabled) {
                    background: #C5A028;
                    transform: translateY(-2px);
                }
                .login-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                .request-link {
                    text-align: center;
                    margin-top: 2rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid #eee;
                    font-size: 0.9rem;
                    color: #888;
                }
                .request-link a {
                    color: var(--gold);
                    text-decoration: none;
                    font-weight: 600;
                }
                .request-link a:hover {
                    text-decoration: underline;
                }
            `}</style>

            <div className="login-card">
                <div className="login-header">
                    <h1>Administrator</h1>
                    <p>Herald of the Citadel</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Royal Seal (Email)</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@chittorgarh.gov"
                        />
                    </div>

                    <div className="form-group">
                        <label>Secret Key (Password)</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Enter Vault"}
                    </button>
                </form>

                <div className="request-link">
                    Don't have access? <Link href="/admin/request">Request Access</Link>
                </div>
            </div>
        </div>
    );
}
