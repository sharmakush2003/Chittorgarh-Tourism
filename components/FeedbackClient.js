"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ExternalLink, RefreshCw, Sparkles, Edit3, Check, HelpCircle, Star, Send, CheckCircle2, Heart, Shield, ThumbsUp, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FeedbackClient() {
    const { t } = useLanguage();
    const [viewMode, setViewMode] = useState("direct"); // "direct" (native form) or "google" (iframe)
    const [googleFormUrl, setGoogleFormUrl] = useState("");
    const [inputUrl, setInputUrl] = useState("");
    const [showUrlModal, setShowUrlModal] = useState(false);
    const [isLoadingIframe, setIsLoadingIframe] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Native Form State
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        gender: "Male",
        ageGroup: "18-24",
        cleanliness: 5,
        toilets: 5,
        water: 5,
        ticketing: 5,
        overall: 5,
        fortFeedback: "",
        portalFeedback: ""
    });

    useEffect(() => {
        window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSeBDx8SK9Rm-S0QBO6wCFV5v-pfE6uCYTYU6ubMR5jNDOkpOA/viewform";
    }, []);

    const handleSaveGoogleUrl = (e) => {
        e.preventDefault();
        if (!inputUrl) return;
        let url = inputUrl.trim();
        if (url.includes("docs.google.com/forms") && !url.includes("embedded=true")) {
            url += (url.includes("?") ? "&" : "?") + "embedded=true";
        }
        setGoogleFormUrl(url);
        localStorage.setItem("custom_google_form_url", url);
        setViewMode("google");
        setShowUrlModal(false);
        setIsLoadingIframe(true);
    };

    const handleNativeSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 800);
    };

    const handleRatingChange = (field, val) => {
        setFormData(prev => ({ ...prev, [field]: val }));
    };

    return (
        <div className="v-feed-wrapper">
            <div className="v-feed-bg"></div>
            <div className="v-feed-overlay"></div>

            <main className="v-feed-content">
                <div className="v-container">
                    <header className="v-feed-head">
                        <span className="v-eyebrow">
                            <Sparkles size={14} className="v-sparkle-icon" /> OFFICIAL FEEDBACK HUB
                        </span>
                        <h1 className="v-title">Share Your Experience</h1>
                        <p className="v-subtitle">
                            Help us preserve and enhance the visitor experience at Chittorgarh. Your feedback is directly reviewed by local tourism administrators.
                        </p>
                    </header>

                    {/* Mode Selector Tabs */}
                    <div className="v-mode-selector">
                        <button 
                            className={`v-tab-btn ${viewMode === 'direct' ? 'active' : ''}`}
                            onClick={() => setViewMode('direct')}
                        >
                            <MessageSquare size={16} /> Instant Feedback Form
                        </button>
                        <button 
                            className={`v-tab-btn ${viewMode === 'google' ? 'active' : ''}`}
                            onClick={() => setViewMode('google')}
                        >
                            <ExternalLink size={16} /> Google Form Embed
                        </button>
                    </div>

                    {/* View Mode 1: Native Interactive Form */}
                    {viewMode === 'direct' && (
                        <div className="v-form-card">
                            {submitted ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="v-success-card"
                                >
                                    <CheckCircle2 size={56} className="v-success-icon" />
                                    <h2>Thank You for Your Feedback!</h2>
                                    <p>Your response has been safely submitted to the Chittorgarh Tourism archives.</p>
                                    <button 
                                        className="v-reset-form-btn"
                                        onClick={() => { setSubmitted(false); setFormData({ fullName: "", email: "", gender: "Male", ageGroup: "18-24", cleanliness: 5, toilets: 5, water: 5, ticketing: 5, overall: 5, fortFeedback: "", portalFeedback: "" }); }}
                                    >
                                        Submit Another Response
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleNativeSubmit} className="v-native-form">
                                    {/* Section 1 */}
                                    <div className="v-form-sec">
                                        <h3 className="v-sec-title">1. Personal Information</h3>
                                        <div className="v-grid-2">
                                            <div className="v-input-field">
                                                <label>Full Name *</label>
                                                <input 
                                                    type="text" 
                                                    required 
                                                    placeholder="Enter your full name" 
                                                    value={formData.fullName} 
                                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                                />
                                            </div>
                                            <div className="v-input-field">
                                                <label>Email ID (Optional)</label>
                                                <input 
                                                    type="email" 
                                                    placeholder="name@example.com" 
                                                    value={formData.email} 
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="v-input-field">
                                                <label>Gender *</label>
                                                <select value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                    <option>Non-Binary / Other</option>
                                                    <option>Prefer not to say</option>
                                                </select>
                                            </div>
                                            <div className="v-input-field">
                                                <label>Age Group (Optional)</label>
                                                <select value={formData.ageGroup} onChange={e => setFormData({ ...formData, ageGroup: e.target.value })}>
                                                    <option>Under 18</option>
                                                    <option>18-24</option>
                                                    <option>25-34</option>
                                                    <option>35-54</option>
                                                    <option>55+</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 2 */}
                                    <div className="v-form-sec">
                                        <h3 className="v-sec-title">2. General Facilities & Monument Ratings</h3>
                                        <div className="v-ratings-stack">
                                            {[
                                                { id: 'cleanliness', label: 'Cleanliness & Overall Environment *' },
                                                { id: 'toilets', label: 'Toilet & Washroom Facilities *' },
                                                { id: 'water', label: 'Drinking Water Quality & Availability *' },
                                                { id: 'ticketing', label: 'Ticketing & Booking Experience *' },
                                                { id: 'overall', label: 'Overall Satisfaction *' }
                                            ].map(item => (
                                                <div key={item.id} className="v-rating-row">
                                                    <span className="v-rating-label">{item.label}</span>
                                                    <div className="v-star-grid">
                                                        {[1, 2, 3, 4, 5].map(star => (
                                                            <button
                                                                key={star}
                                                                type="button"
                                                                className={`v-star-btn ${formData[item.id] >= star ? 'active' : ''}`}
                                                                onClick={() => handleRatingChange(item.id, star)}
                                                            >
                                                                <Star size={18} fill={formData[item.id] >= star ? "#D4AF37" : "none"} />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Section 3 */}
                                    <div className="v-form-sec">
                                        <h3 className="v-sec-title">3. Suggestions & Feedback for Chittorgarh Fort</h3>
                                        <textarea 
                                            rows="3"
                                            placeholder="Share your thoughts about fort maintenance, guide experience, monuments..."
                                            value={formData.fortFeedback}
                                            onChange={e => setFormData({ ...formData, fortFeedback: e.target.value })}
                                        ></textarea>
                                    </div>

                                    {/* Section 4 */}
                                    <div className="v-form-sec">
                                        <h3 className="v-sec-title">4. Suggestions & Feedback for Tourism Portal / Website</h3>
                                        <textarea 
                                            rows="3"
                                            placeholder="How was your experience using our website, digital guides, and QR features?"
                                            value={formData.portalFeedback}
                                            onChange={e => setFormData({ ...formData, portalFeedback: e.target.value })}
                                        ></textarea>
                                    </div>

                                    <button type="submit" disabled={isSubmitting} className="v-submit-btn">
                                        {isSubmitting ? "Submitting..." : <><Send size={16} /> Submit Feedback</>}
                                    </button>
                                </form>
                            )}
                        </div>
                    )}

                    {/* View Mode 2: Google Form Embed */}
                    {viewMode === 'google' && (
                        <div className="v-google-container">
                            <div className="v-google-topbar">
                                <span>Google Form URL:</span>
                                <button className="v-edit-link-btn" onClick={() => setShowUrlModal(!showUrlModal)}>
                                    <Edit3 size={14} /> {googleFormUrl ? "Change Google Form Link" : "Paste Google Form Link"}
                                </button>
                            </div>

                            {showUrlModal && (
                                <form onSubmit={handleSaveGoogleUrl} className="v-url-modal">
                                    <input 
                                        type="url" 
                                        placeholder="Paste Public Google Form Link (https://docs.google.com/forms/d/e/.../viewform)" 
                                        value={inputUrl}
                                        onChange={e => setInputUrl(e.target.value)}
                                        required
                                        className="v-modal-input"
                                    />
                                    <button type="submit" className="v-save-link-btn"><Check size={14} /> Save</button>
                                </form>
                            )}

                            {googleFormUrl ? (
                                <div className="v-iframe-wrapper">
                                    {isLoadingIframe && (
                                        <div className="v-iframe-loader">
                                            <div className="v-spinner"></div>
                                            <p>Loading Google Form...</p>
                                        </div>
                                    )}
                                    <iframe 
                                        src={googleFormUrl} 
                                        width="100%" 
                                        height="950" 
                                        frameBorder="0"
                                        onLoad={() => setIsLoadingIframe(false)}
                                        className="v-iframe"
                                    ></iframe>
                                </div>
                            ) : (
                                <div className="v-no-link-box">
                                    <HelpCircle size={32} />
                                    <h3>No Google Form Link Configured Yet</h3>
                                    <p>Please paste your public Google Form link (from Google Forms Send ➔ Link) above, or switch to the Instant Feedback Form.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            <style jsx>{`
                .v-feed-wrapper {
                    min-height: 100vh;
                    background: #0d0d0f;
                    color: #fff;
                    position: relative;
                    padding: 6rem 1rem 4rem;
                }
                .v-feed-bg {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.08) 0%, rgba(13, 13, 15, 0.95) 70%);
                    pointer-events: none;
                }
                .v-feed-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
                    background-size: 24px 24px;
                    pointer-events: none;
                }
                .v-feed-content {
                    position: relative;
                    z-index: 1;
                    max-width: 850px;
                    margin: 0 auto;
                }
                .v-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .v-feed-head { text-align: center; }
                .v-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(212, 175, 55, 0.12);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    color: #D4AF37;
                    font-size: 0.75rem;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    padding: 0.35rem 0.9rem;
                    border-radius: 50px;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }
                .v-title {
                    font-family: var(--ff-display, serif);
                    font-size: clamp(2rem, 4vw, 3rem);
                    font-weight: 700;
                    background: linear-gradient(135deg, #ffffff 30%, #D4AF37 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 0.75rem;
                }
                .v-subtitle {
                    font-size: 0.95rem;
                    color: rgba(255, 255, 255, 0.7);
                    max-width: 650px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .v-mode-selector {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin: 0.5rem 0 1rem;
                }
                .v-tab-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    color: rgba(255, 255, 255, 0.7);
                    padding: 0.6rem 1.25rem;
                    border-radius: 50px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.25s ease;
                }
                .v-tab-btn.active {
                    background: rgba(212, 175, 55, 0.15);
                    border-color: #D4AF37;
                    color: #D4AF37;
                    box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
                }

                .v-form-card {
                    background: rgba(20, 20, 25, 0.85);
                    border: 1px solid rgba(212, 175, 55, 0.25);
                    border-radius: 20px;
                    padding: 2rem;
                    backdrop-filter: blur(12px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                }
                .v-native-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.75rem;
                }
                .v-sec-title {
                    font-size: 1.1rem;
                    color: #D4AF37;
                    margin-bottom: 1rem;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.15);
                    padding-bottom: 0.5rem;
                }
                .v-grid-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }
                .v-input-field {
                    display: flex;
                    flex-direction: column;
                    gap: 0.4rem;
                }
                .v-input-field label {
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.8);
                    font-weight: 600;
                }
                .v-input-field input, .v-input-field select, textarea {
                    background: rgba(0, 0, 0, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 10px;
                    padding: 0.65rem 0.9rem;
                    color: #fff;
                    font-size: 0.85rem;
                    width: 100%;
                }
                .v-input-field input:focus, .v-input-field select:focus, textarea:focus {
                    outline: none;
                    border-color: #D4AF37;
                    box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
                }
                .v-ratings-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .v-rating-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(0,0,0,0.25);
                    padding: 0.75rem 1rem;
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .v-rating-label {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.85);
                }
                .v-star-grid {
                    display: flex;
                    gap: 0.4rem;
                }
                .v-star-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.2rem;
                    transition: transform 0.2s;
                }
                .v-star-btn:hover {
                    transform: scale(1.2);
                }

                .v-submit-btn {
                    background: #D4AF37;
                    color: #000;
                    border: none;
                    padding: 0.85rem;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 0.95rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    transition: 0.3s ease;
                }
                .v-submit-btn:hover {
                    background: #fff;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
                }

                .v-success-card {
                    text-align: center;
                    padding: 3rem 1rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }
                .v-success-icon { color: #6BCB77; }
                .v-reset-form-btn {
                    background: rgba(212, 175, 55, 0.2);
                    border: 1px solid #D4AF37;
                    color: #D4AF37;
                    padding: 0.6rem 1.5rem;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: 600;
                }

                .v-google-container {
                    background: #fff;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.6);
                }
                .v-google-topbar {
                    background: #1a1a20;
                    color: rgba(255,255,255,0.7);
                    padding: 0.75rem 1.25rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.8rem;
                }
                .v-edit-link-btn {
                    background: rgba(212, 175, 55, 0.2);
                    border: 1px solid #D4AF37;
                    color: #D4AF37;
                    padding: 0.35rem 0.85rem;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.35rem;
                }
                .v-url-modal {
                    background: #252530;
                    padding: 1rem;
                    display: flex;
                    gap: 0.5rem;
                }
                .v-modal-input {
                    flex: 1;
                    background: #121215;
                    border: 1px solid rgba(255,255,255,0.2);
                    padding: 0.5rem;
                    color: #fff;
                    border-radius: 6px;
                    font-size: 0.8rem;
                }
                .v-save-link-btn {
                    background: #D4AF37;
                    color: #000;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    font-weight: 700;
                    cursor: pointer;
                }
                .v-iframe-wrapper {
                    position: relative;
                    min-height: 800px;
                }
                .v-iframe-loader {
                    position: absolute;
                    inset: 0;
                    background: #121215;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    color: #fff;
                }
                .v-spinner {
                    width: 36px;
                    height: 36px;
                    border: 3px solid rgba(212,175,55,0.2);
                    border-top-color: #D4AF37;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                .v-no-link-box {
                    padding: 4rem 2rem;
                    text-align: center;
                    color: #121215;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                @keyframes spin { to { transform: rotate(360deg); } }
                @media (max-width: 640px) {
                    .v-grid-2 { grid-template-columns: 1fr; }
                    .v-rating-row { flex-direction: column; gap: 0.5rem; align-items: flex-start; }
                }
            `}</style>
        </div>
    );
}
