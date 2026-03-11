"use client";

import Link from "next/link";

const emergencyData = [
    {
        category: "Police",
        icon: "🚔",
        color: "#3b82f6",
        contacts: [
            { name: "Chittorgarh Police Control Room", number: "07472-240700", note: "24/7 Available" },
            { name: "National Police Helpline", number: "100", note: "Emergency Only" },
            { name: "Tourist Police Helpline", number: "1800-180-6127", note: "Free Toll" },
        ]
    },
    {
        category: "Medical",
        icon: "🏥",
        color: "#ef4444",
        contacts: [
            { name: "Ambulance (National)", number: "108", note: "Emergency Only" },
            { name: "Government District Hospital", number: "07472-242626", note: "Chittorgarh" },
            { name: "Medical Emergency Line", number: "102", note: "Nearby Hospitals" },
        ]
    },
    {
        category: "Tourist Helpline",
        icon: "📞",
        color: "#D4AF37",
        contacts: [
            { name: "Rajasthan Tourist Helpline", number: "1364", note: "Official Helpline" },
            { name: "India Tourism (Jaipur)", number: "0141-5110598", note: "Mon–Sat, 9AM–6PM" },
            { name: "Tourist Guide Assistance", number: "07472-241089", note: "Local Chittorgarh" },
        ]
    },
    {
        category: "Emergency Contacts",
        icon: "🆘",
        color: "#f97316",
        contacts: [
            { name: "Fire Brigade", number: "101", note: "Fire Emergency" },
            { name: "Women Helpline", number: "1091", note: "Women in Distress" },
            { name: "Child Helpline", number: "1098", note: "Child Distress" },
            { name: "National Disaster Helpline", number: "1078", note: "Natural Disasters" },
        ]
    }
];

export default function EmergencyPage() {
    return (
        <div className="emergency-page">
            <style jsx>{`
                .emergency-page {
                    min-height: 100vh;
                    background: #0a0806;
                    color: #fff;
                    font-family: var(--font-jost);
                    padding-bottom: 80px;
                }

                .hero-section {
                    padding: 120px 40px 60px;
                    max-width: 1200px;
                    margin: 0 auto;
                    text-align: center;
                }

                .sos-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 8px 24px;
                    background: rgba(239, 68, 68, 0.15);
                    border: 1px solid rgba(239, 68, 68, 0.4);
                    border-radius: 30px;
                    color: #f87171;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    margin-bottom: 30px;
                    animation: pulse-sos 2s infinite;
                }

                @keyframes pulse-sos {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.3); }
                    50% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
                }

                .hero-section h1 {
                    font-family: var(--font-cormorant);
                    font-size: 4rem;
                    color: #fff;
                    margin-bottom: 16px;
                    line-height: 1.1;
                }

                .hero-section h1 span {
                    color: #f87171;
                }

                .hero-section p {
                    color: #888;
                    font-size: 1.1rem;
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.7;
                }

                .emergency-grid {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 40px;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 30px;
                }

                .category-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    padding: 30px;
                    transition: all 0.3s ease;
                }

                .category-card:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.15);
                    transform: translateY(-4px);
                }

                .category-header {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 24px;
                    padding-bottom: 16px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }

                .category-icon {
                    font-size: 2rem;
                    width: 54px;
                    height: 54px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.05);
                }

                .category-title {
                    font-family: var(--font-cormorant);
                    font-size: 1.8rem;
                    color: #fff;
                    margin: 0;
                }

                .contact-list {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }

                .contact-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    padding: 14px 18px;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.2s;
                }

                .contact-item:hover {
                    background: rgba(255, 255, 255, 0.07);
                }

                .contact-info {
                    flex: 1;
                }

                .contact-name {
                    font-size: 0.9rem;
                    color: #ccc;
                    display: block;
                    margin-bottom: 4px;
                }

                .contact-note {
                    font-size: 0.72rem;
                    color: #555;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .call-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 18px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 0.95rem;
                    letter-spacing: 0.5px;
                    white-space: nowrap;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                }

                .call-btn:hover {
                    transform: scale(1.05);
                    filter: brightness(1.15);
                }

                .disclaimer {
                    max-width: 1200px;
                    margin: 40px auto 0;
                    padding: 0 40px;
                }

                .disclaimer-box {
                    background: rgba(212, 175, 55, 0.06);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 12px;
                    padding: 20px 28px;
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                }

                .disclaimer-box span {
                    font-size: 1.2rem;
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                .disclaimer-box p {
                    color: #888;
                    font-size: 0.88rem;
                    line-height: 1.6;
                    margin: 0;
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: #888;
                    text-decoration: none;
                    font-size: 0.9rem;
                    margin: 60px 40px 0;
                    max-width: 1200px;
                    transition: color 0.2s;
                }

                .back-link:hover { color: #D4AF37; }

                @media (max-width: 900px) {
                    .emergency-grid { grid-template-columns: 1fr; }
                    .hero-section h1 { font-size: 2.5rem; }
                    .hero-section, .emergency-grid, .disclaimer { padding-left: 20px; padding-right: 20px; }
                    .hero-section { padding-top: 80px; }
                }
            `}</style>

            {/* Hero */}
            <section className="hero-section">
                <div className="sos-badge">
                    <span>🚨</span> Emergency Assistance
                </div>
                <h1>Stay <span>Safe</span> in Chittorgarh</h1>
                <p>
                    One-tap access to all emergency contacts during your visit.
                    Save this page before exploring the fort — your safety is our priority.
                </p>
            </section>

            {/* Emergency Cards Grid */}
            <div className="emergency-grid">
                {emergencyData.map((section) => (
                    <div
                        key={section.category}
                        className="category-card"
                        style={{ borderColor: `${section.color}22` }}
                    >
                        <div className="category-header">
                            <div className="category-icon">{section.icon}</div>
                            <h2 className="category-title" style={{ color: section.color }}>
                                {section.category}
                            </h2>
                        </div>
                        <div className="contact-list">
                            {section.contacts.map((contact) => (
                                <div className="contact-item" key={contact.number}>
                                    <div className="contact-info">
                                        <span className="contact-name">{contact.name}</span>
                                        <span className="contact-note">{contact.note}</span>
                                    </div>
                                    <a
                                        href={`tel:${contact.number}`}
                                        className="call-btn"
                                        style={{
                                            background: `${section.color}1a`,
                                            color: section.color,
                                            border: `1px solid ${section.color}44`
                                        }}
                                    >
                                        📞 {contact.number}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Disclaimer */}
            <div className="disclaimer">
                <div className="disclaimer-box">
                    <span>ℹ️</span>
                    <p>
                        Numbers listed are best-effort accurate for Chittorgarh district. In any life-threatening situation,
                        always dial <strong style={{ color: '#D4AF37' }}>100 (Police)</strong> or{' '}
                        <strong style={{ color: '#D4AF37' }}>108 (Ambulance)</strong> first.
                        Contact numbers may change — always confirm from official sources.
                    </p>
                </div>
            </div>

            {/* Back Link */}
            <Link href="/" className="back-link">← Return to Homepage</Link>
        </div>
    );
}
