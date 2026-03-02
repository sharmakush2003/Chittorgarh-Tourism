import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Privacy Policy | Chittorgarh Tourism",
    description: "Privacy Policy for Chittorgarh Tourism – Rajasthan's Greatest Fort Official Guide.",
};

export default function PrivacyPolicy() {
    return (
        <div className="heritage-container" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
            <div className="heritage-bg" />
            <div className="heritage-overlay" />

            <div className="heritage-content" style={{
                maxWidth: "860px",
                margin: "0 auto",
                padding: "0 1.5rem",
            }}>
                <div style={{ marginBottom: "2rem" }}>
                    <Link href="/" style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "var(--gold)",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        transition: "0.3s",
                    }} className="back-link">
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                </div>

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
                        Privacy Policy
                    </h1>
                    <div style={{
                        width: "80px",
                        height: "2px",
                        background: "linear-gradient(90deg, var(--gold), transparent)",
                        marginBottom: "2.5rem",
                    }} />

                    {[
                        {
                            title: "Introduction",
                            content: (
                                <p>Welcome to <strong style={{ color: "var(--gold)" }}>Chittorgarh Tourism</strong> (chittorgarh-tourism-five.vercel.app). We are a purely informational and awareness-driven portal dedicated to the heritage, culture, and travel guides of Chittorgarh, Rajasthan. Your privacy is of paramount importance to us.</p>
                            ),
                        },
                        {
                            title: "No Personal Data Collection",
                            content: (
                                <p>We prioritize your privacy above all else. This website <strong>does not collect any personal data</strong> from its visitors. We do not have any registration forms, newsletter sign-ups, or contact forms that require your name, email, or phone number.</p>
                            ),
                        },
                        {
                            title: "Technical Data & Analytics",
                            content: (
                                <>
                                    <p>Like most websites, we may collect basic technical information to improve your browsing experience. This includes:</p>
                                    <ul style={{ margin: "1rem 0 0 1.5rem", lineHeight: "2" }}>
                                        <li>Browser type and version</li>
                                        <li>Device information</li>
                                        <li>IP address (for server logs and security purposes only)</li>
                                        <li>Referring URLs and page interactions</li>
                                    </ul>
                                    <p style={{ marginTop: "1rem" }}>This data is used solely for functionality, security, and performance analytics to understand how our visitors interact with our heritage content.</p>
                                </>
                            ),
                        },
                        {
                            title: "Cookies Usage",
                            content: (
                                <p>We use cookies strictly for website functionality and performance. These cookies help us remember your language preferences and ensure the smooth delivery of our 3D backgrounds and interactive elements. You can choose to disable cookies through your browser settings, though some features of the site may be affected.</p>
                            ),
                        },
                        {
                            title: "Search Engine Indexing",
                            content: (
                                <p>This website is indexed by Google and other search engines to ensure that accurate information about Chittorgarh&apos;s heritage is easily discoverable by travelers worldwide.</p>
                            ),
                        },
                        {
                            title: "Safety & Reliability",
                            content: (
                                <p>We take pride in maintaining a safe environment for our users. To date, there have been <strong>no complaints, disputes, or recorded incidents of data misuse</strong> related to this platform.</p>
                            ),
                        },
                        {
                            title: "User Consent",
                            content: (
                                <p>By continuing to use this website, you hereby consent to our Privacy Policy and agree to its terms.</p>
                            ),
                        },
                        {
                            title: "Contact Information",
                            content: (
                                <>
                                    <p>If you have any questions or require more information about our Privacy Policy, please do not hesitate to contact us at:</p>
                                    <p style={{ marginTop: "0.75rem", color: "var(--gold)", fontWeight: 600 }}>Email: info@chittorgarhfortourism.in</p>
                                </>
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
