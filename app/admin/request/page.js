"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminRequestPage() {
    const [formData, setFormData] = useState({ name: "", email: "", purpose: "" });
    const [status, setStatus] = useState("idle"); // idle, sending, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("/api/admin-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) setStatus("success");
            else setStatus("error");
        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <div className="admin-request-container">
            <style jsx>{`
                .admin-request-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #0f0a06;
                    padding: 2rem;
                    font-family: var(--font-jost);
                    color: #fff;
                }
                .request-card {
                    max-width: 600px;
                    width: 100%;
                    text-align: center;
                    padding: 4rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    backdrop-filter: blur(10px);
                }
                h1 {
                    font-family: var(--font-cormorant);
                    font-size: 3rem;
                    margin-bottom: 1.5rem;
                    color: var(--gold);
                }
                .subtitle {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: rgba(255, 255, 255, 0.7);
                    margin-bottom: 2rem;
                }
                .request-form {
                    text-align: left;
                    margin: 2rem 0;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                label {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: var(--gold);
                }
                input, textarea {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    padding: 1rem;
                    color: #fff;
                    font-family: inherit;
                    transition: border-color 0.3s;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: var(--gold);
                }
                .submit-btn {
                    background: var(--gold);
                    color: #000;
                    padding: 1rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .submit-btn:hover:not(:disabled) {
                    background: #fff;
                }
                .submit-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .success-msg {
                    color: #4CAF50;
                    margin: 1rem 0;
                }
                .error-msg {
                    color: #f44336;
                    margin: 1rem 0;
                }
                .back-btn {
                    display: inline-block;
                    margin-top: 2rem;
                    color: rgba(255, 255, 255, 0.5);
                    text-decoration: underline;
                    font-size: 0.9rem;
                }
            `}</style>

            <div className="request-card">
                <h1>Request Access</h1>
                <p className="subtitle">
                    Administrative privileges are manually granted to ensure the sanctity 
                    of the heritage data. Submit your request below for review.
                </p>

                {status === "success" ? (
                    <div className="success-view">
                        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
                        <h2 style={{ color: "var(--gold)" }}>Request Submitted</h2>
                        <p style={{ marginTop: "1rem" }}>
                            Our team (Kush Sharma and Lav Sharma) has received your request. 
                            We will review it and get back to you soon.
                        </p>
                        <Link href="/admin/login" className="back-btn">Back to Login</Link>
                    </div>
                ) : (
                    <form className="request-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input 
                                type="text" 
                                required 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Official Email</label>
                            <input 
                                type="email" 
                                required 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label>Purpose of Access</label>
                            <textarea 
                                rows="3" 
                                required 
                                value={formData.purpose}
                                onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                                placeholder="Why do you need administrative access?"
                            />
                        </div>

                        {status === "error" && (
                            <p className="error-msg">Something went wrong. Please try again or contact our team (Kush Sharma and Lav Sharma) directly.</p>
                        )}

                        <button 
                            type="submit" 
                            className="submit-btn"
                            disabled={status === "sending"}
                        >
                            {status === "sending" ? "Sending Request..." : "Submit Request"}
                        </button>

                        <Link href="/admin/login" className="back-btn">Back to Login</Link>
                    </form>
                )}
            </div>
        </div>
    );
}
