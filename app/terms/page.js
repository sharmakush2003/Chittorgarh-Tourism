export const metadata = {
    title: "Terms & Conditions | Chittorgarh Tourism",
    description: "Terms and Conditions for Chittorgarh Tourism – Rajasthan's Greatest Fort Official Guide.",
};

export default function TermsAndConditions() {
    return (
        <div className="heritage-container" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
            <div className="heritage-bg" />
            <div className="heritage-overlay" />

            <div className="heritage-content" style={{
                maxWidth: "860px",
                margin: "0 auto",
                padding: "0 1.5rem",
            }}>
                <div style={{
                    background: "rgba(15, 10, 6, 0.65)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                    borderRadius: "16px",
                    padding: "3rem 3.5rem",
                }}>
                    <h1 style={{
                        fontFamily: "var(--ff-display)",
                        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                        color: "var(--gold)",
                        marginBottom: "0.5rem",
                        lineHeight: 1.2,
                    }}>
                        Terms & Conditions
                    </h1>
                    <div style={{
                        width: "80px",
                        height: "2px",
                        background: "linear-gradient(90deg, var(--gold), transparent)",
                        marginBottom: "2.5rem",
                    }} />

                    {[
                        {
                            title: "Agreement to Terms",
                            content: (
                                <p>By accessing and using <strong style={{ color: "var(--gold)" }}>Chittorgarh Tourism</strong> (chittorgarh-tourism-five.vercel.app), you agree to be bound by these Terms & Conditions. This platform is a non-commercial, informational resource dedicated to the history and beauty of Chittorgarh.</p>
                            ),
                        },
                        {
                            title: "Informational-Only Disclaimer",
                            content: (
                                <p>The content provided on this website is for <strong>general information and educational purposes only</strong>. We aim to raise awareness about the heritage and culture of Chittorgarh. This website does not offer travel bookings, tickets, payments, or any commercial services.</p>
                            ),
                        },
                        {
                            title: "Accuracy of Information",
                            content: (
                                <p>While we strive to keep our travel guides, itineraries, and historical facts accurate and up-to-date, we cannot guarantee the complete accuracy, completeness, or reliability of all content as heritage data and accessibility details may change over time.</p>
                            ),
                        },
                        {
                            title: "External Links Disclaimer",
                            content: (
                                <p>Our website may contain links to external sites that are not operated by us. We have no control over the content and practices of these third-party sites and cannot accept responsibility or liability for their respective policies.</p>
                            ),
                        },
                        {
                            title: "Intellectual Property Rights",
                            content: (
                                <p>The 3D assets, logos, and curated textual content on this website are protected by intellectual property rights. You may access this information for private, non-commercial use only. Any reuse, reproduction, or redistribution for commercial purposes is strictly prohibited without prior permission.</p>
                            ),
                        },
                        {
                            title: "Limitation of Liability",
                            content: (
                                <p>In no event shall the website administrators be liable for any damages arising out of the use or inability to use the materials on this website, or any decisions made based on the informational content provided.</p>
                            ),
                        },
                        {
                            title: "Governing Law",
                            content: (
                                <p>These Terms & Conditions are governed by and construed in accordance with the laws of <strong style={{ color: "var(--gold)" }}>India</strong>. You irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
                            ),
                        },
                    ].map(({ title, content }) => (
                        <div key={title} style={{ marginBottom: "2.5rem" }}>
                            <h2 style={{
                                fontFamily: "var(--ff-display)",
                                fontSize: "1.5rem",
                                color: "#fff",
                                marginBottom: "0.75rem",
                            }}>
                                {title}
                            </h2>
                            <div style={{
                                fontFamily: "var(--ff-body)",
                                color: "rgba(255,255,255,0.8)",
                                lineHeight: "1.8",
                                fontSize: "0.98rem",
                            }}>
                                {content}
                            </div>
                        </div>
                    ))}

                    <div style={{
                        paddingTop: "2rem",
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        fontFamily: "var(--ff-body)",
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.4)",
                    }}>
                        Last Updated: March 2, 2026
                    </div>
                </div>
            </div>
        </div>
    );
}
